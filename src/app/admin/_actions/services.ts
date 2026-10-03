"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { SERVICES_TAG } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { fieldErrors, serviceSchema } from "@/lib/validation";
import { FIX_FIELDS, readForm } from "./_helpers";
import type { ActionState } from "./types";

const KEYS = ["nameKa", "nameUk", "nameEn", "descriptionKa", "descriptionUk", "descriptionEn", "category", "price", "durationMin", "image", "sortOrder"];

function parse(formData: FormData) {
  const raw = readForm(formData, KEYS, ["isVisible"]);
  if (raw.sortOrder === "") raw.sortOrder = 0;
  return serviceSchema.safeParse(raw);
}

function refresh() {
  revalidateTag(SERVICES_TAG);
  revalidatePath("/admin", "layout");
}

async function uniqueSlug(name: string) {
  const base = slugify(name) || "service";
  for (let i = 0; i < 5; i++) {
    const slug = i === 0 ? base : `${base}-${Math.random().toString(36).slice(2, 6)}`;
    if (!(await prisma.service.findUnique({ where: { slug }, select: { id: true } }))) return slug;
  }
  return `${base}-${Date.now().toString(36)}`;
}

export async function createServiceAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { errors: fieldErrors(parsed.error), message: FIX_FIELDS };
  await prisma.service.create({ data: { ...parsed.data, slug: await uniqueSlug(parsed.data.nameEn) } });
  refresh();
  redirect("/admin/services?saved=1");
}

export async function updateServiceAction(id: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { errors: fieldErrors(parsed.error), message: FIX_FIELDS };
  await prisma.service.update({ where: { id }, data: parsed.data });
  refresh();
  return { ok: true, message: "Service saved" };
}

export async function toggleServiceVisibilityAction(id: string) {
  await requireAdmin();
  const row = await prisma.service.findUnique({ where: { id }, select: { isVisible: true } });
  if (!row) return;
  await prisma.service.update({ where: { id }, data: { isVisible: !row.isVisible } });
  refresh();
}

/** Inline price/duration edit from the services list (quick price management). */
export async function updateServicePriceAction(id: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = serviceSchema.pick({ price: true, durationMin: true }).safeParse({ price: formData.get("price"), durationMin: formData.get("durationMin") });
  if (!parsed.success) return { errors: fieldErrors(parsed.error), message: "Invalid value" };
  await prisma.service.update({ where: { id }, data: parsed.data });
  refresh();
  return { ok: true, message: "Saved" };
}

export async function deleteServiceAction(id: string) {
  await requireAdmin();
  // Bookings keep their snapshot `serviceName`; the relation is set to NULL by the FK rule.
  await prisma.service.delete({ where: { id } });
  refresh();
  redirect("/admin/services");
}

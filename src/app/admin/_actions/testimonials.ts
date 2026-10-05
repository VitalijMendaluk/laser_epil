"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { TESTIMONIALS_TAG } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { fieldErrors, testimonialSchema } from "@/lib/validation";
import { FIX_FIELDS, readForm } from "./_helpers";
import type { ActionState } from "./types";

const KEYS = ["name", "photo", "textKa", "textRu", "textEn", "rating", "sortOrder"];

function parse(formData: FormData) {
  const raw = readForm(formData, KEYS, ["isVisible"]);
  if (raw.sortOrder === "") raw.sortOrder = 0;
  return testimonialSchema.safeParse(raw);
}

function refresh() {
  revalidateTag(TESTIMONIALS_TAG);
  revalidatePath("/admin", "layout");
}

export async function createTestimonialAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { errors: fieldErrors(parsed.error), message: FIX_FIELDS };
  await prisma.testimonial.create({ data: parsed.data });
  refresh();
  redirect("/admin/testimonials?saved=1");
}

export async function updateTestimonialAction(id: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { errors: fieldErrors(parsed.error), message: FIX_FIELDS };
  await prisma.testimonial.update({ where: { id }, data: parsed.data });
  refresh();
  return { ok: true, message: "Testimonial saved" };
}

export async function toggleTestimonialVisibilityAction(id: string) {
  await requireAdmin();
  const row = await prisma.testimonial.findUnique({ where: { id }, select: { isVisible: true } });
  if (!row) return;
  await prisma.testimonial.update({ where: { id }, data: { isVisible: !row.isVisible } });
  refresh();
}

export async function deleteTestimonialAction(id: string) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  refresh();
  redirect("/admin/testimonials");
}

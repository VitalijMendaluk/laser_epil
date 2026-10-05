"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { RESULTS_TAG } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { beforeAfterSchema, fieldErrors } from "@/lib/validation";
import { FIX_FIELDS, readForm } from "./_helpers";
import type { ActionState } from "./types";

const KEYS = ["beforeImage", "afterImage", "captionKa", "captionRu", "captionEn", "sortOrder"];

function parse(formData: FormData) {
  const raw = readForm(formData, KEYS, ["isVisible"]);
  if (raw.sortOrder === "") raw.sortOrder = 0;
  return beforeAfterSchema.safeParse(raw);
}

function refresh() {
  revalidateTag(RESULTS_TAG);
  revalidatePath("/admin", "layout");
}

export async function createResultAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { errors: fieldErrors(parsed.error), message: FIX_FIELDS };
  await prisma.beforeAfter.create({ data: parsed.data });
  refresh();
  redirect("/admin/results?saved=1");
}

export async function updateResultAction(id: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { errors: fieldErrors(parsed.error), message: FIX_FIELDS };
  await prisma.beforeAfter.update({ where: { id }, data: parsed.data });
  refresh();
  return { ok: true, message: "Saved" };
}

export async function toggleResultVisibilityAction(id: string) {
  await requireAdmin();
  const row = await prisma.beforeAfter.findUnique({ where: { id }, select: { isVisible: true } });
  if (!row) return;
  await prisma.beforeAfter.update({ where: { id }, data: { isVisible: !row.isVisible } });
  refresh();
}

export async function deleteResultAction(id: string) {
  await requireAdmin();
  await prisma.beforeAfter.delete({ where: { id } });
  refresh();
  redirect("/admin/results");
}

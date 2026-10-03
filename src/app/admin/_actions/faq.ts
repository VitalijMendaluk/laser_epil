"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { FAQ_TAG } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { faqSchema, fieldErrors } from "@/lib/validation";
import { FIX_FIELDS, readForm } from "./_helpers";
import type { ActionState } from "./types";

const KEYS = ["questionKa", "questionUk", "questionEn", "answerKa", "answerUk", "answerEn", "sortOrder"];

function parse(formData: FormData) {
  const raw = readForm(formData, KEYS, ["isVisible"]);
  if (raw.sortOrder === "") raw.sortOrder = 0;
  return faqSchema.safeParse(raw);
}

function refresh() {
  revalidateTag(FAQ_TAG);
  revalidatePath("/admin", "layout");
}

export async function createFaqAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { errors: fieldErrors(parsed.error), message: FIX_FIELDS };
  await prisma.faqItem.create({ data: parsed.data });
  refresh();
  redirect("/admin/faq?saved=1");
}

export async function updateFaqAction(id: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) return { errors: fieldErrors(parsed.error), message: FIX_FIELDS };
  await prisma.faqItem.update({ where: { id }, data: parsed.data });
  refresh();
  return { ok: true, message: "Question saved" };
}

export async function toggleFaqVisibilityAction(id: string) {
  await requireAdmin();
  const row = await prisma.faqItem.findUnique({ where: { id }, select: { isVisible: true } });
  if (!row) return;
  await prisma.faqItem.update({ where: { id }, data: { isVisible: !row.isVisible } });
  refresh();
}

export async function deleteFaqAction(id: string) {
  await requireAdmin();
  await prisma.faqItem.delete({ where: { id } });
  refresh();
  redirect("/admin/faq");
}

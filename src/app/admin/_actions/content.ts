"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { CONTENT_TAG } from "@/lib/content";
import { SETTING_FIELDS, TEXT_SECTIONS } from "@/lib/content-schema";
import { prisma } from "@/lib/prisma";
import { settingValueSchema } from "@/lib/validation";
import type { ActionState } from "./types";

const MAX_TEXT = 5000;

function refresh() {
  revalidateTag(CONTENT_TAG);
  revalidatePath("/admin", "layout");
}

export async function saveTextSectionAction(sectionId: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const section = TEXT_SECTIONS.find((s) => s.id === sectionId);
  if (!section) return { message: "Unknown section" };

  const errors: Record<string, string> = {};
  const rows = section.fields.map((field) => {
    const row = { key: field.key, ka: "", uk: "", en: "" };
    for (const l of ["ka", "uk", "en"] as const) {
      row[l] = String(formData.get(`${field.key}:${l}`) ?? "").trim();
      if (row[l].length > MAX_TEXT) errors[`${field.key}:${l}`] = "Too long";
    }
    return row;
  });
  if (Object.keys(errors).length) return { errors, message: "Please fix the highlighted fields" };

  await prisma.$transaction(
    rows.map((r) => prisma.siteText.upsert({ where: { key: r.key }, create: r, update: { ka: r.ka, uk: r.uk, en: r.en } })),
  );
  refresh();
  return { ok: true, message: `${section.title} saved` };
}

export async function saveSettingsAction(keys: string[], _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const fields = SETTING_FIELDS.filter((f) => keys.includes(f.key));

  const errors: Record<string, string> = {};
  const rows: { key: string; value: string }[] = [];
  for (const field of fields) {
    const result = settingValueSchema[field.kind].safeParse(String(formData.get(field.key) ?? ""));
    if (!result.success) errors[field.key] = result.error.issues[0]?.message ?? "Invalid value";
    else rows.push({ key: field.key, value: result.data });
  }
  if (Object.keys(errors).length) return { errors, message: "Please fix the highlighted fields" };

  await prisma.$transaction(
    rows.map((r) => prisma.setting.upsert({ where: { key: r.key }, create: r, update: { value: r.value } })),
  );
  refresh();
  return { ok: true, message: "Settings saved" };
}

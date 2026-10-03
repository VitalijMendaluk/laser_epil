"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { bookingStatusSchema } from "@/lib/validation";

export async function updateBookingStatusAction(id: string, status: string) {
  await requireAdmin();
  const parsed = bookingStatusSchema.safeParse(status);
  if (!parsed.success) return { ok: false };
  await prisma.booking.update({ where: { id }, data: { status: parsed.data } });
  revalidatePath("/admin", "layout");
  return { ok: true };
}

export async function deleteBookingAction(id: string) {
  await requireAdmin();
  await prisma.booking.delete({ where: { id } });
  revalidatePath("/admin", "layout");
}

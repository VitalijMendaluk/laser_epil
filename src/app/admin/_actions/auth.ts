"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { clearSessionCookie, createSessionCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { fieldErrors, loginSchema } from "@/lib/validation";
import type { ActionState } from "./types";

// Compared against when the email is unknown, so response time does not reveal which emails exist.
const DUMMY_HASH = "$2b$12$IbwJl8rpXgjdO2uM2uttPu.BRQVV6kJJyp31kMU709PqFKiqVtFkm";

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const ip = await getClientIp();
  const parsed = loginSchema.safeParse({ login: formData.get("login"), password: formData.get("password") });
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };

  const email = parsed.data.login.toLowerCase();
  const byIp = rateLimit(`login-ip:${ip}`, 10, 15 * 60_000);
  const byEmail = rateLimit(`login-email:${email}`, 5, 15 * 60_000);
  if (!byIp.ok || !byEmail.ok) {
    return { message: `Too many attempts. Try again in ${Math.ceil(Math.max(byIp.retryAfter, byEmail.retryAfter) / 60)} min.` };
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  const valid = await bcrypt.compare(parsed.data.password, admin?.passwordHash ?? DUMMY_HASH);
  if (!admin || !valid) return { message: "Invalid login or password" };

  await createSessionCookie(admin);
  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

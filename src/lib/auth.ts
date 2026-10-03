import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { SESSION_COOKIE, SESSION_TTL_SECONDS, signSession, verifySession } from "./session";

export async function getSession() {
  const store = await cookies();
  const session = await verifySession(store.get(SESSION_COOKIE)?.value);
  if (!session) return null;
  // Make sure the admin still exists (e.g. was not deleted after the token was issued).
  const admin = await prisma.admin.findUnique({ where: { id: session.sub }, select: { id: true, email: true, name: true } });
  return admin;
}

/** Call at the top of every admin page and server action. */
export async function requireAdmin() {
  const admin = await getSession();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function createSessionCookie(admin: { id: string; email: string }) {
  const token = await signSession({ sub: admin.id, email: admin.email });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

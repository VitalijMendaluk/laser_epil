import { SignJWT, jwtVerify } from "jose";

/** Edge-safe session helpers (used by middleware and server code). */

export const SESSION_COOKIE = "admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export type SessionPayload = { sub: string; email: string };

let derived: Promise<Uint8Array> | null = null;

/**
 * AUTH_SECRET if set; otherwise a key derived from DATABASE_URL (which is itself
 * a secret on the host), so a fresh Vercel deploy works without extra env vars.
 */
function getSecret(): Promise<Uint8Array> {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 32) return Promise.resolve(new TextEncoder().encode(secret));
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error("Set AUTH_SECRET (32+ characters) or DATABASE_URL");
  derived ??= crypto.subtle.digest("SHA-256", new TextEncoder().encode(`admin-session:${dbUrl}`)).then((b) => new Uint8Array(b));
  return derived;
}

export async function signSession(payload: SessionPayload) {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(await getSecret());
}

export async function verifySession(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, await getSecret(), { algorithms: ["HS256"] });
    if (typeof payload.sub !== "string" || typeof payload.email !== "string") return null;
    return { sub: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}

import "server-only";

/**
 * Both keys are read at runtime on the server (no NEXT_PUBLIC_ prefix, which
 * would be inlined at build time). The site key reaches the browser via props.
 */
export function turnstileSiteKey() {
  const site = process.env.TURNSTILE_SITE_KEY;
  return site && process.env.TURNSTILE_SECRET_KEY ? site : undefined;
}

/** Verifies a Cloudflare Turnstile token. Returns true when the captcha is not configured. */
export async function verifyTurnstile(token: string | undefined, ip: string) {
  if (!turnstileSiteKey()) return true;
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY!, response: token });
    if (ip && ip !== "unknown") body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body, signal: AbortSignal.timeout(8000) });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error("[turnstile]", error);
    return false;
  }
}

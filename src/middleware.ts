import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { SESSION_COOKIE, verifySession } from "./lib/session";

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const session = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
    const isLogin = pathname === "/admin/login";

    if (!session && !isLogin) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    if (session && isLogin) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  return intlMiddleware(req);
}

export const config = {
  // Everything except API routes, Next internals and static files.
  matcher: ["/((?!api|_next|_vercel|uploads|media|.*\\..*).*)"],
};

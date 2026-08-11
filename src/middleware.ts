import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME } from "@/lib/auth-constants";
import { verifySession } from "@/lib/auth";
import { applySecurityHeaders } from "@/lib/security";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const authenticated = token ? await verifySession(token) : false;

  const isLoginPage = pathname === "/painel/login";
  const isPainel = pathname.startsWith("/painel");
  const isProtectedApi = pathname.startsWith("/api/os");

  if (isPainel && !isLoginPage && !authenticated) {
    const loginUrl = new URL("/painel/login", request.url);
    return applySecurityHeaders(NextResponse.redirect(loginUrl), request);
  }

  if (isLoginPage && authenticated) {
    return applySecurityHeaders(NextResponse.redirect(new URL("/painel", request.url)), request);
  }

  if (isProtectedApi && !authenticated) {
    return applySecurityHeaders(NextResponse.json({ error: "Não autorizado" }, { status: 401 }), request);
  }

  return applySecurityHeaders(NextResponse.next(), request);
}

export const config = {
  matcher: ["/painel/:path*", "/api/os/:path*"],
};

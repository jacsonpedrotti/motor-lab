import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/lib/auth-constants";
import { createSession, sessionCookieOptions } from "@/lib/auth";
import { validatePassword } from "@/lib/credentials";
import { checkRateLimit, clearAttempts, recordFailedAttempt } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const rate = checkRateLimit(ip);

  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde e tente novamente." },
      { status: 429 }
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida" }, { status: 400 });
  }

  const password = body.password ?? "";
  if (!password || password.length > 128) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  if (!(await validatePassword(password))) {
    recordFailedAttempt(ip);
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  clearAttempts(ip);
  const token = await createSession();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, sessionCookieOptions());

  return NextResponse.json({ ok: true });
}

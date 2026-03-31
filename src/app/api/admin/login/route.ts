import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createAdminSessionValue, getAdminCookieName, isValidAdminLogin } from "@/lib/adminAuth";

export async function POST(req: Request) {
  const body = (await req.json()) as { email?: string; password?: string };
  const email = body.email?.trim() || "";
  const password = body.password || "";

  if (!isValidAdminLogin(email, password)) {
    return NextResponse.json({ error: "Neplatné přihlášení." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(getAdminCookieName(), createAdminSessionValue(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return NextResponse.json({ ok: true });
}


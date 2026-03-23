import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createAdminSessionValue, getAdminCookieName, isValidMagicToken } from "@/lib/adminAuth";

export async function POST(req: Request) {
  const body = (await req.json()) as { token?: string };
  const token = body.token?.trim() || "";
  if (!isValidMagicToken(token)) {
    return NextResponse.json({ error: "Neplatný magic token." }, { status: 401 });
  }

  const adminEmail = process.env.ADMIN_EMAIL || "admin@neurea.cz";
  const cookieStore = await cookies();
  cookieStore.set(getAdminCookieName(), createAdminSessionValue(adminEmail), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return NextResponse.json({ ok: true });
}


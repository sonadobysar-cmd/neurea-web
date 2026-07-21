import { NextResponse } from "next/server";
import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthenticated,
  verifyPassword,
} from "@/lib/cms/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: await isAdminAuthenticated() });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  }

  const password =
    typeof body === "object" && body && "password" in body
      ? String((body as { password?: unknown }).password ?? "")
      : "";

  if (!(await verifyPassword(password))) {
    return NextResponse.json({ ok: false, error: "Špatné heslo." }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthenticated,
  verifyPassword,
} from "@/lib/cms/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RateEntry = { count: number; resetAt: number };
const loginAttempts = new Map<string, RateEntry>();
const LOGIN_MAX = 8;
const LOGIN_WINDOW_MS = 15 * 60_000;

function clientIp(request: Request): string {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ||
    "unknown"
  );
}

function isLoginLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return false;
  }
  if (entry.count >= LOGIN_MAX) return true;
  entry.count += 1;
  return false;
}

export async function GET() {
  return NextResponse.json({ ok: await isAdminAuthenticated() });
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (isLoginLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Příliš mnoho pokusů. Zkuste to za chvíli." },
      { status: 429 },
    );
  }

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

  try {
    await createAdminSession();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Admin není správně nakonfigurovaný (ADMIN_SECRET)." },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}

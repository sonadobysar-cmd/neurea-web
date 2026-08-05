import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { recordVisit } from "@/lib/analytics/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RateEntry = { count: number; resetAt: number };
const rateLimits = new Map<string, RateEntry>();
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_BODY_BYTES = 800;

function clientIp(request: Request): string {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ||
    "unknown"
  );
}

function isRateLimited(request: Request): boolean {
  const key = createHash("sha256").update(clientIp(request)).digest("hex");
  const now = Date.now();
  const current = rateLimits.get(key);
  if (!current || now > current.resetAt) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (current.count >= RATE_LIMIT_MAX) return true;
  current.count += 1;
  return false;
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function isBot(userAgent: string): boolean {
  return /bot|crawler|spider|headless|lighthouse|pagespeed|uptime|monitor/i.test(userAgent);
}

function deviceFrom(userAgent: string): "desktop" | "mobile" | "tablet" {
  if (/ipad|tablet|kindle|silk/i.test(userAgent)) return "tablet";
  if (/mobile|iphone|ipod|android/i.test(userAgent)) return "mobile";
  return "desktop";
}

function browserFrom(userAgent: string): "chrome" | "safari" | "firefox" | "edge" | "other" {
  if (/edg(a|ios)?\//i.test(userAgent)) return "edge";
  if (/(firefox|fxios)\//i.test(userAgent)) return "firefox";
  if (/(chrome|crios)\//i.test(userAgent) && !/chromium/i.test(userAgent)) return "chrome";
  if (/safari\//i.test(userAgent) && !/chrome|crios|chromium|android/i.test(userAgent)) return "safari";
  return "other";
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  const route = "/api/analytics/visit";

  if (!sameOrigin(request)) {
    return new NextResponse(null, { status: 403 });
  }
  if (isRateLimited(request)) {
    return new NextResponse(null, { status: 429 });
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  if (!userAgent || isBot(userAgent)) return new NextResponse(null, { status: 204 });

  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    return new NextResponse(null, { status: 413 });
  }

  let body: { sessionId?: unknown; path?: unknown; source?: unknown };
  try {
    body = JSON.parse(raw) as typeof body;
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  try {
    await recordVisit({
      sessionId: String(body.sessionId ?? ""),
      path: String(body.path ?? ""),
      source: String(body.source ?? "direct"),
      country: request.headers.get("x-vercel-ip-country") ?? "--",
      device: deviceFrom(userAgent),
      browser: browserFrom(userAgent),
    });
    console.log(
      JSON.stringify({
        level: "info",
        msg: "visit recorded",
        route,
        ms: Date.now() - startedAt,
        requestId: request.headers.get("x-vercel-id"),
      }),
    );
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(
      JSON.stringify({
        level: "error",
        msg: "visit record failed",
        route,
        ms: Date.now() - startedAt,
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}

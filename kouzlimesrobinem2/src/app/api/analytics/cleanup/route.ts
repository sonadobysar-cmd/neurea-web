import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { deleteExpiredVisits } from "@/lib/analytics/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  const startedAt = Date.now();
  const secret = process.env.CRON_SECRET?.trim();
  const authorization = request.headers.get("authorization") ?? "";

  if (!secret) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
  if (!safeEqual(authorization, `Bearer ${secret}`)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const deleted = await deleteExpiredVisits(90);
    console.log(
      JSON.stringify({
        level: "info",
        msg: "analytics retention cleanup done",
        route: "/api/analytics/cleanup",
        deleted,
        ms: Date.now() - startedAt,
      }),
    );
    return NextResponse.json({ ok: true, deleted });
  } catch (error) {
    console.error(
      JSON.stringify({
        level: "error",
        msg: "analytics retention cleanup failed",
        route: "/api/analytics/cleanup",
        error: error instanceof Error ? error.message : String(error),
        ms: Date.now() - startedAt,
      }),
    );
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}

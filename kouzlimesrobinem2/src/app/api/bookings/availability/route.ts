import { NextResponse } from "next/server";
import { isBookingDatabaseConfigured, readBusyIntervals } from "@/lib/bookings/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isBookingDatabaseConfigured()) {
    return NextResponse.json({ configured: false, busy: [] }, { status: 503 });
  }
  const params = new URL(request.url).searchParams;
  const from = new Date(params.get("from") ?? "");
  const to = new Date(params.get("to") ?? "");
  if (
    Number.isNaN(from.getTime()) ||
    Number.isNaN(to.getTime()) ||
    to <= from ||
    to.getTime() - from.getTime() > 32 * 24 * 60 * 60_000
  ) {
    return NextResponse.json({ ok: false, error: "Neplatný rozsah." }, { status: 400 });
  }
  try {
    return NextResponse.json({ configured: true, busy: await readBusyIntervals(from, to) });
  } catch (error) {
    console.error("[robin/bookings] availability failed", error);
    return NextResponse.json({ configured: true, busy: [] }, { status: 503 });
  }
}

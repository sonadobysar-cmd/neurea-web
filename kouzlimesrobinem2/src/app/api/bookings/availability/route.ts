import { NextResponse } from "next/server";
import { workingDayForDateKey } from "@/lib/bookings/schedule";
import {
  isBookingDatabaseConfigured,
  readBookingWorkingHours,
  readBusyIntervals,
} from "@/lib/bookings/store";
import {
  GoogleCalendarUnavailableError,
  readGoogleBusyIntervals,
} from "@/lib/google-calendar/store";

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
    const [localBusy, googleBusy, workingHours] = await Promise.all([
      readBusyIntervals(from, to),
      readGoogleBusyIntervals(from, to),
      readBookingWorkingHours(),
    ]);
    const busy = [...localBusy, ...googleBusy].sort((a, b) => a.startAt.localeCompare(b.startAt));
    const dayKey = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Prague",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(from);
    return NextResponse.json({
      configured: true,
      busy,
      workingHours: workingDayForDateKey(workingHours, dayKey),
    });
  } catch (error) {
    console.error("[robin/bookings] availability failed", error);
    return NextResponse.json(
      {
        configured: true,
        busy: [],
        error: error instanceof GoogleCalendarUnavailableError
          ? "Obsazenost z Google Kalendáře se právě nepodařilo ověřit."
          : "Obsazenost se právě nepodařilo ověřit.",
      },
      { status: 503 },
    );
  }
}

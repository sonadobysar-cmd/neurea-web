import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import {
  disconnectGoogleCalendar,
  saveGoogleCalendarSettings,
} from "@/lib/google-calendar/store";
import { isSameOrigin } from "@/lib/request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function authorized(request: Request) {
  return isSameOrigin(request) && (await isAdminAuthenticated());
}

export async function PATCH(request: Request) {
  if (!(await authorized(request))) return NextResponse.json({ ok: false }, { status: 401 });
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const selectedCalendarIds = Array.isArray(body?.selectedCalendarIds)
    ? body.selectedCalendarIds
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.slice(0, 1024))
        .slice(0, 50)
    : [];
  const destinationCalendarId = String(body?.destinationCalendarId ?? "").slice(0, 1024);
  if (!selectedCalendarIds.length || !destinationCalendarId) {
    return NextResponse.json(
      { ok: false, error: "Vyberte alespoň jeden kalendář a cílový kalendář pro rezervace." },
      { status: 400 },
    );
  }
  try {
    await saveGoogleCalendarSettings(selectedCalendarIds, destinationCalendarId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[robin/google-calendar] settings update failed", error);
    return NextResponse.json(
      { ok: false, error: "Nastavení Google Kalendáře se nepodařilo uložit." },
      { status: 503 },
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await authorized(request))) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    await disconnectGoogleCalendar();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[robin/google-calendar] disconnect failed", error);
    return NextResponse.json(
      { ok: false, error: "Google účet se nepodařilo odpojit." },
      { status: 503 },
    );
  }
}

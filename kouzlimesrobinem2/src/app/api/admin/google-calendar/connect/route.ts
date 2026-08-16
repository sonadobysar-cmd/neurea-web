import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import {
  googleOAuthUrl,
  isGoogleCalendarConfigured,
} from "@/lib/google-calendar/store";
import { getSiteUrl } from "@/lib/siteUrl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATE_COOKIE = "robin_google_oauth_state";

function adminRedirect(status: string) {
  const url = new URL("/admin/google-kalendar", getSiteUrl());
  url.searchParams.set("google", status);
  return NextResponse.redirect(url);
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(new URL("/admin/login", getSiteUrl()));
  }
  if (!isGoogleCalendarConfigured()) return adminRedirect("not-configured");

  const state = randomBytes(32).toString("base64url");
  const jar = await cookies();
  jar.set(STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/api/admin/google-calendar/callback",
    maxAge: 10 * 60,
  });
  return NextResponse.redirect(googleOAuthUrl(state));
}

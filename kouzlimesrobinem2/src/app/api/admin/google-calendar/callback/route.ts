import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/cms/auth";
import { exchangeGoogleAuthorizationCode } from "@/lib/google-calendar/store";
import { getSiteUrl } from "@/lib/siteUrl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATE_COOKIE = "robin_google_oauth_state";

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function adminRedirect(status: string) {
  const url = new URL("/admin/google-kalendar", getSiteUrl());
  url.searchParams.set("google", status);
  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const jar = await cookies();
  const expectedState = jar.get(STATE_COOKIE)?.value ?? "";
  const receivedState = params.get("state") ?? "";
  jar.set(STATE_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/api/admin/google-calendar/callback",
    maxAge: 0,
  });

  if (!expectedState || !receivedState || !safeEqual(expectedState, receivedState)) {
    return adminRedirect("invalid-state");
  }
  if (params.get("error")) return adminRedirect("cancelled");
  const code = params.get("code") ?? "";
  if (!code || code.length > 4096) return adminRedirect("error");

  try {
    await exchangeGoogleAuthorizationCode(code);
    await createAdminSession();
    return adminRedirect("connected");
  } catch (error) {
    console.error("[robin/google-calendar] OAuth callback failed", error);
    return adminRedirect("error");
  }
}

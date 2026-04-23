import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { isRezervaceLandingHost } from "@/lib/landingHost";
import { getRezervaceMetaPixelBootstrap } from "@/lib/rezervaceMetaPixel";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Samostatný JS soubor = klasické načtení mimo React (Pixel Helper uvidí PageView). */
export async function GET() {
  const h = await headers();
  if (!isRezervaceLandingHost(h)) {
    return new NextResponse("//", {
      status: 404,
      headers: { "Content-Type": "text/javascript; charset=utf-8" },
    });
  }

  const body = getRezervaceMetaPixelBootstrap();
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "private, no-store, max-age=0",
    },
  });
}

import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { readSiteContent, writeSiteContent } from "@/lib/cms/store";
import { mergeContent, type SiteContent } from "@/lib/cms/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const content = await readSiteContent();
  return NextResponse.json(content, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Nejste přihlášeni." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný JSON." }, { status: 400 });
  }

  const content = mergeContent(body) as SiteContent;
  const result = await writeSiteContent(content);
  return NextResponse.json({ ...result, content });
}

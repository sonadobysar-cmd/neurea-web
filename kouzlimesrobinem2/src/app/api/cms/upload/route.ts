import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { uploadCmsImage } from "@/lib/cms/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Nejste přihlášeni." }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ ok: false, error: "Chybí soubor." }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { ok: false, error: "Povolené formáty: JPG, PNG, WebP, GIF." },
      { status: 400 },
    );
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "Max. velikost je 8 MB." }, { status: 400 });
  }

  try {
    const url = await uploadCmsImage(file);
    return NextResponse.json({ ok: true, url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Nahrání selhalo.";
    return NextResponse.json({ ok: false, error: message }, { status: 503 });
  }
}

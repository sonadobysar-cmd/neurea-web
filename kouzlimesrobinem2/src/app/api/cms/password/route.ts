import { NextResponse } from "next/server";
import { changeAdminPassword, createAdminSession, isAdminAuthenticated } from "@/lib/cms/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Nejste přihlášeni." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  }

  const currentPassword =
    typeof body === "object" && body && "currentPassword" in body
      ? String((body as { currentPassword?: unknown }).currentPassword ?? "")
      : "";
  const newPassword =
    typeof body === "object" && body && "newPassword" in body
      ? String((body as { newPassword?: unknown }).newPassword ?? "")
      : "";
  const confirmPassword =
    typeof body === "object" && body && "confirmPassword" in body
      ? String((body as { confirmPassword?: unknown }).confirmPassword ?? "")
      : "";

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ ok: false, error: "Vyplňte všechna pole." }, { status: 400 });
  }
  if (newPassword !== confirmPassword) {
    return NextResponse.json({ ok: false, error: "Nová hesla se neshodují." }, { status: 400 });
  }

  const result = await changeAdminPassword(currentPassword, newPassword);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  await createAdminSession(result.version);
  return NextResponse.json({ ok: true });
}

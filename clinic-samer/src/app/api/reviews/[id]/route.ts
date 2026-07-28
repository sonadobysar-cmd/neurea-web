import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { updateReviewStatus, type ReviewStatus } from "@/lib/store";

export const runtime = "nodejs";

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const body = await req.json();
  const status = body.status as ReviewStatus;
  if (!["pending", "approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const updated = await updateReviewStatus(id, status);
  if (!updated) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

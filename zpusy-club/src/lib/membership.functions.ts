import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const planSchema = z.object({
  plan: z.enum(["month", "year", "founder"]),
});

export const activateMembership = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => planSchema.parse(d))
  .handler(async ({ data, context }) => {
    const expires =
      data.plan === "month"
        ? new Date(Date.now() + 31 * 24 * 60 * 60 * 1000)
        : data.plan === "year"
          ? new Date(Date.now() + 366 * 24 * 60 * 60 * 1000)
          : null; // founder = lifetime

    const { error } = await context.supabase
      .from("memberships")
      .upsert(
        {
          user_id: context.userId,
          plan: data.plan,
          status: "active",
          started_at: new Date().toISOString(),
          expires_at: expires?.toISOString() ?? null,
        },
        { onConflict: "user_id" },
      );
    if (error) throw new Error(error.message);
    return { ok: true };
  });

import "server-only";

const TEST_SITE_KEYS = new Set([
  "1x00000000000000000000AA",
  "2x00000000000000000000AB",
  "3x00000000000000000000FF",
]);

type TurnstileResponse = {
  success?: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
};

export type TurnstileResult =
  | { ok: true }
  | { ok: false; reason: "configuration" | "invalid" | "unavailable" };

export function isTurnstileConfigured(): boolean {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  if (!secret || !siteKey) return false;
  const productionTarget =
    process.env.VERCEL_ENV === "production" ||
    (process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV);
  if (productionTarget && TEST_SITE_KEYS.has(siteKey)) return false;
  return true;
}

export async function verifyTurnstile({
  token,
  ip,
  expectedAction,
  expectedHostname,
}: {
  token: string;
  ip: string;
  expectedAction: "contact" | "booking";
  expectedHostname: string;
}): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  if (!secret || !isTurnstileConfigured()) {
    return process.env.NODE_ENV === "production"
      ? { ok: false, reason: "configuration" }
      : { ok: true };
  }
  if (!token) return { ok: false, reason: "invalid" };

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token, remoteip: ip }),
        signal: AbortSignal.timeout(8_000),
        cache: "no-store",
      },
    );
    if (!response.ok) return { ok: false, reason: "unavailable" };

    const result = (await response.json()) as TurnstileResponse;
    if (!result.success) {
      console.warn("[robin/turnstile] rejected", result["error-codes"] ?? []);
      return { ok: false, reason: "invalid" };
    }

    const hostname = result.hostname?.toLowerCase();
    const local = expectedHostname === "localhost" || expectedHostname === "127.0.0.1";
    const officialPreviewTest =
      process.env.VERCEL_ENV === "preview" &&
      Boolean(siteKey && TEST_SITE_KEYS.has(siteKey));
    if (!local && !officialPreviewTest && hostname !== expectedHostname.toLowerCase()) {
      console.warn("[robin/turnstile] hostname mismatch", { hostname, expectedHostname });
      return { ok: false, reason: "invalid" };
    }
    if (!officialPreviewTest && result.action !== expectedAction) {
      console.warn("[robin/turnstile] action mismatch", {
        action: result.action,
        expectedAction,
      });
      return { ok: false, reason: "invalid" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[robin/turnstile] verification unavailable", error);
    return { ok: false, reason: "unavailable" };
  }
}

export function turnstileError(result: Exclude<TurnstileResult, { ok: true }>) {
  if (result.reason === "configuration") {
    return {
      status: 503,
      message: "Formulář je dočasně nedostupný. Zkuste to prosím později.",
    };
  }
  if (result.reason === "unavailable") {
    return {
      status: 503,
      message: "Ověření proti robotům je dočasně nedostupné. Zkuste to prosím znovu.",
    };
  }
  return {
    status: 403,
    message: "Ověření proti robotům se nepovedlo. Zkuste to prosím znovu.",
  };
}

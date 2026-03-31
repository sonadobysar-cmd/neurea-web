import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "neurea_admin_session";

function getSecret() {
  return process.env.ADMIN_COOKIE_SECRET || "change-me-admin-cookie-secret";
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function createAdminSessionValue(email: string) {
  const payload = JSON.stringify({
    email,
    exp: Date.now() + 1000 * 60 * 60 * 12,
  });
  const token = Buffer.from(payload).toString("base64url");
  const sig = createHmac("sha256", getSecret()).update(token).digest("hex");
  return `${token}.${sig}`;
}

export function verifyAdminSessionValue(value?: string | null) {
  if (!value) return null;
  const [token, sig] = value.split(".");
  if (!token || !sig) return null;

  const expectedSig = createHmac("sha256", getSecret()).update(token).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(token, "base64url").toString("utf-8")) as {
      email: string;
      exp: number;
    };
    if (!payload.email || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function isValidAdminLogin(email: string, password: string) {
  const allowedEmail = process.env.ADMIN_EMAIL || "";
  const allowedPassword = process.env.ADMIN_PASSWORD || "";
  return Boolean(allowedEmail && allowedPassword && email === allowedEmail && password === allowedPassword);
}

export function isValidMagicToken(token: string) {
  const expected = process.env.ADMIN_MAGIC_TOKEN || "";
  return Boolean(expected && token === expected);
}


import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "clinic_admin_session";

function secret() {
  return process.env.ADMIN_PASSWORD || "samer-admin-2026";
}

export function signToken(password: string) {
  return createHmac("sha256", secret()).update(password).digest("hex");
}

export function verifyPassword(password: string) {
  return password === secret();
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  const expected = signToken(secret());
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

export { COOKIE as ADMIN_COOKIE };

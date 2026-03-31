/**
 * Samostatná landing na subdoméně (Meta).
 * 1) Middleware na Vercelu nastaví `x-neurea-landing: 1` (spolehlivější než jen Host v RSC).
 * 2) Fallback podle Host / x-forwarded-host.
 */
export function isRezervaceLandingHost(h: Headers): boolean {
  if (h.get("x-neurea-landing") === "1") {
    return true;
  }
  const raw =
    h.get("x-forwarded-host") || h.get("x-vercel-forwarded-host") || h.get("host") || "";
  const host = raw.split(",")[0]?.trim().split(":")[0]?.toLowerCase() ?? "";
  return host === "rezervace.neurea.cz" || host === "www.rezervace.neurea.cz";
}

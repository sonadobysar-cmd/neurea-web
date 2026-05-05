const REZERVACE_HOSTS = new Set(["rezervace.neurea.cz", "www.rezervace.neurea.cz"]);
const TEST_HOSTS = new Set(["adhd.neurea.cz", "www.adhd.neurea.cz"]);

function getHostFromHeaders(h: Headers): string {
  const raw =
    h.get("x-forwarded-host") || h.get("x-vercel-forwarded-host") || h.get("host") || "";
  return raw.split(",")[0]?.trim().split(":")[0]?.toLowerCase() ?? "";
}

/**
 * Samostatné landingy na subdoménách.
 * 1) Middleware na Vercelu nastaví `x-neurea-landing` (spolehlivější než jen Host v RSC).
 * 2) Fallback podle Host / x-forwarded-host.
 */
export function isRezervaceLandingHost(h: Headers): boolean {
  const marker = h.get("x-neurea-landing");
  if (marker === "rezervace" || marker === "1") return true;
  return REZERVACE_HOSTS.has(getHostFromHeaders(h));
}

export function isTestLandingHost(h: Headers): boolean {
  if (h.get("x-neurea-landing") === "test") return true;
  return TEST_HOSTS.has(getHostFromHeaders(h));
}

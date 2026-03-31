/** Samostatná landing na subdoméně (Meta) — stejný kód jako hlavní web, jiný výstup podle Host. */
export function isRezervaceLandingHost(h: Headers): boolean {
  const raw = h.get("x-forwarded-host") || h.get("host") || "";
  const host = raw.split(",")[0]?.trim().split(":")[0]?.toLowerCase() ?? "";
  return host === "rezervace.neurea.cz" || host === "www.rezervace.neurea.cz";
}

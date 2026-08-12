const FALLBACK_SITE_URL = "https://kouzlimesrobinem2.vercel.app";

export function getSiteUrl(): string {
  const candidate =
    process.env.SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    FALLBACK_SITE_URL;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" && url.hostname !== "localhost") {
      return FALLBACK_SITE_URL;
    }
    return url.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

/**
 * Canonical site URL used for metadataBase, canonical links, sitemap and
 * robots.txt. Override with the SITE_URL env var once the real domain
 * (chatkynakolech.cz) is live and pointed at this deployment — until then
 * it falls back to the current production Vercel URL.
 */
export const SITE_URL =
  process.env.SITE_URL ?? "https://flax-tiny-houses.vercel.app";

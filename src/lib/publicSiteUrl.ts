/**
 * Veřejná adresa webu pro Stripe redirecty (success/cancel).
 *
 * Na produkci musí být přesně **https://** a **stejná doména** jako v certifikátu
 * (např. pokud web běží na www, použij https://www.domena.cz — jinak Safari po návratu
 * ze Stripe může hlásit „Toto připojení není soukromé“).
 */
export function getCheckoutBaseUrl(): string {
  let raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "";

  if (!raw && process.env.VERCEL === "1" && process.env.VERCEL_URL) {
    raw = `https://${process.env.VERCEL_URL}`;
  }

  if (!raw) {
    return "http://localhost:3000";
  }

  if (!/^https?:\/\//i.test(raw)) {
    raw = `https://${raw}`;
  }

  const isLocal = raw.includes("localhost") || raw.includes("127.0.0.1");

  if (!isLocal && raw.toLowerCase().startsWith("http://")) {
    raw = `https://${raw.slice("http://".length)}`;
  }

  return raw.replace(/\/+$/, "");
}

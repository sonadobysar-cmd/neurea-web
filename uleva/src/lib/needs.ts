import { Provider } from "@/data/providers";
import { NeedId } from "@/data/locations";
import { ServiceType } from "@/data/pricing";

export function parseNeeds(raw?: string | string[]): NeedId[] {
  const value = Array.isArray(raw) ? raw.join(",") : raw || "";
  const allowed: NeedId[] = [
    "uklid",
    "pohlidat",
    "vareni",
    "dula",
    "laktace",
    "multi",
  ];
  return value
    .split(",")
    .map((n) => n.trim() as NeedId)
    .filter((n) => allowed.includes(n));
}

export function needsToPreferredService(needs: NeedId[]): ServiceType | undefined {
  if (needs.includes("laktace") && !needs.includes("dula") && !needs.includes("uklid")) {
    return "laktace";
  }
  if (needs.includes("dula") && !needs.includes("laktace") && needs.length === 1) {
    return "dula";
  }
  if (
    needs.some((n) => n === "uklid" || n === "pohlidat" || n === "vareni" || n === "multi")
  ) {
    return "uleva";
  }
  if (needs.includes("dula")) return "dula";
  if (needs.includes("laktace")) return "laktace";
  return undefined;
}

export function providerMatchesNeeds(provider: Provider, needs: NeedId[]): boolean {
  if (!needs.length) return true;

  const exp = provider.experiences.map((e) => e.toLowerCase());
  const has = (part: string) => exp.some((e) => e.includes(part));

  const checks: Record<NeedId, boolean> = {
    uklid: has("úklid") || has("uklid") || provider.services.includes("uleva"),
    pohlidat:
      has("souroz") ||
      has("mimink") ||
      has("hlíd") ||
      provider.services.includes("uleva"),
    vareni: has("vař") || has("var") || provider.services.includes("uleva"),
    dula: provider.services.includes("dula"),
    laktace: provider.services.includes("laktace"),
    multi: provider.services.length >= 2 || provider.experiences.length >= 3,
  };

  // multi alone = anyone who can combine; with others = must match all selected
  const core = needs.filter((n) => n !== "multi");
  if (!core.length && needs.includes("multi")) return checks.multi;

  const allCore = core.every((n) => checks[n]);
  if (needs.includes("multi")) return allCore && checks.multi;
  return allCore;
}

export function scoreProviderNeeds(provider: Provider, needs: NeedId[]): number {
  if (!needs.length) return 0;
  let score = 0;
  for (const n of needs) {
    if (providerMatchesNeeds(provider, [n])) score += 12;
  }
  if (needs.includes("multi") && provider.services.length >= 2) score += 10;
  return score;
}

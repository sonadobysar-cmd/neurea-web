import {
  CITIES,
  PROVIDERS,
  Provider,
  getBookableSlots,
  haversineKm,
} from "@/data/providers";
import { SERVICE_PRICING, ServiceType } from "@/data/pricing";

export type RecommendInput = {
  cityKey?: string;
  service?: ServiceType | "all";
  needs?: string[];
  night?: boolean;
  babyAgeMonths?: number;
  lactationPaOnly?: boolean;
  maxDistanceKm?: number;
};

export type RankedProvider = {
  provider: Provider;
  score: number;
  distanceKm: number;
  reasons: string[];
  nextSlot?: { date: string; start: string };
};

const NEED_ALIASES: Record<string, string[]> = {
  vareni: ["Vaření"],
  uklid: ["Úklid"],
  sourozenci: ["Sourozenci"],
  miminka: ["Miminka 0–3 m", "Miminka"],
  noc: ["Noční směna"],
  kojeni: ["Kojení"],
  dula: [],
};

export function normalizeNeeds(raw: string[]): string[] {
  return raw
    .map((n) => n.trim().toLowerCase())
    .filter(Boolean)
    .flatMap((n) => {
      if (NEED_ALIASES[n]) return [n];
      if (n.includes("vař") || n.includes("obed") || n.includes("jíd")) return ["vareni"];
      if (n.includes("úkl") || n.includes("ukl")) return ["uklid"];
      if (n.includes("souroz") || n.includes("starší") || n.includes("dvoulet"))
        return ["sourozenci"];
      if (n.includes("mimink") || n.includes("novorozen") || n.includes("šestin"))
        return ["miminka"];
      if (n.includes("noc") || n.includes("spánek") || n.includes("vyspat")) return ["noc"];
      if (n.includes("koj") || n.includes("lakt")) return ["kojeni"];
      return [n];
    });
}

export function recommendProviders(input: RecommendInput): RankedProvider[] {
  const city =
    (input.cityKey && CITIES[input.cityKey]) ||
    CITIES.praha;
  const maxDistance = input.maxDistanceKm ?? 80;
  const needs = normalizeNeeds(input.needs ?? []);
  const service = input.service && input.service !== "all" ? input.service : undefined;

  const ranked: RankedProvider[] = [];

  for (const provider of PROVIDERS) {
    const distanceKm = haversineKm(city.lat, city.lng, provider.lat, provider.lng);
    if (distanceKm > maxDistance) continue;
    if (service && !provider.services.includes(service)) continue;
    if (input.lactationPaOnly && provider.lactationLevel !== "pa") continue;

    const slots = getBookableSlots(provider);
    if (!slots.length) continue;

    let score = 40;
    const reasons: string[] = [];

    score += Math.max(0, 25 - distanceKm);
    reasons.push(`${distanceKm.toFixed(1)} km od tebe`);

    if (service) {
      score += 18;
      reasons.push(SERVICE_PRICING[service].label);
    }

    for (const need of needs) {
      const targets = NEED_ALIASES[need] ?? [];
      const hit = targets.some((t) =>
        provider.experiences.some((e) => e.toLowerCase().includes(t.toLowerCase()))
      );
      if (hit || provider.experiences.some((e) => e.toLowerCase().includes(need))) {
        score += 10;
        reasons.push(`umí: ${need === "vareni" ? "vaření" : need === "uklid" ? "úklid" : need === "sourozenci" ? "sourozence" : need === "miminka" ? "miminka" : need === "noc" ? "noční směnu" : need === "kojeni" ? "kojení" : need}`);
      }
    }

    if (input.night || needs.includes("noc")) {
      const nightOk = provider.experiences.some((e) =>
        e.toLowerCase().includes("noč")
      );
      if (nightOk) {
        score += 12;
        reasons.push("noční směna");
      } else {
        score -= 8;
      }
    }

    if (
      typeof input.babyAgeMonths === "number" &&
      input.babyAgeMonths <= 3 &&
      provider.experiences.some((e) => e.includes("0–3") || e.toLowerCase().includes("mimink"))
    ) {
      score += 10;
      reasons.push("zkušenost s novorozenci");
    }

    score += provider.rating * 4;
    score += Math.min(12, provider.completedVisits / 8);
    reasons.push(`★ ${provider.rating.toFixed(1)} · ${provider.completedVisits} návštěv`);

    if (provider.badges.includes("Kurz duly") && (service === "dula" || !service)) {
      score += 6;
      reasons.push("kurz duly");
    }

    if (provider.lactationLevel === "pa") {
      reasons.push("laktace: porodní asistentka");
      if (service === "laktace") score += 10;
    }

    ranked.push({
      provider,
      score,
      distanceKm,
      reasons: [...new Set(reasons)].slice(0, 5),
      nextSlot: slots[0]
        ? { date: slots[0].date, start: slots[0].start }
        : undefined,
    });
  }

  return ranked.sort((a, b) => b.score - a.score).slice(0, 6);
}

export function extractRecommendFromText(text: string): RecommendInput {
  const lower = text.toLowerCase();
  let cityKey: string | undefined;
  for (const [key, c] of Object.entries(CITIES)) {
    if (lower.includes(c.label.toLowerCase()) || lower.includes(key.replace("-", " "))) {
      cityKey = key;
      break;
    }
  }

  let service: ServiceType | "all" | undefined;
  if (lower.includes("dul")) service = "dula";
  else if (lower.includes("lakt") || lower.includes("koj")) service = "laktace";
  else if (
    lower.includes("úlev") ||
    lower.includes("uklid") ||
    lower.includes("úklid") ||
    lower.includes("vař") ||
    lower.includes("hlíd")
  )
    service = "uleva";

  const needs = normalizeNeeds([text]);
  const night = lower.includes("noc") || lower.includes("vyspat") || lower.includes("spát");
  const lactationPaOnly =
    lower.includes("porodní asistent") || lower.includes(" pa ") || lower.includes("zdravot");

  const ageMatch = lower.match(/(\d+)\s*(měsíc|mesic|měs)/);
  const babyAgeMonths = ageMatch ? Number(ageMatch[1]) : undefined;

  return { cityKey, service, needs, night, babyAgeMonths, lactationPaOnly };
}

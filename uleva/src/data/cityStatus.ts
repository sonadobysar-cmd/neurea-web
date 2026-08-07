import { PROVIDERS, getBookableSlots } from "@/data/providers";
import { LOCATIONS } from "@/data/locations";

export type CityStatus =
  | "collecting_supply"
  | "coming_soon"
  | "active"
  | "limited";

export type CityMetrics = {
  cityKey: string;
  label: string;
  registered: number;
  verified: number;
  withCalendar: number;
  openSlots14d: number;
  waitingClients: number;
  status: CityStatus;
};

/** In-memory waitlist counter for demo (also mirrored in localStorage client-side). */
export const WAITLIST_SEED: Record<string, number> = {
  praha: 4,
  brno: 3,
  ostrava: 2,
  plzen: 1,
};

export function statusLabel(status: CityStatus) {
  switch (status) {
    case "active":
      return "Aktivní — lze rezervovat";
    case "limited":
      return "Omezená dostupnost";
    case "coming_soon":
      return "Síť se připravuje";
    default:
      return "Nabíráme pečující";
  }
}

export function computeCityStatus(metrics: {
  verified: number;
  withCalendar: number;
  openSlots14d: number;
  waitingClients: number;
}): CityStatus {
  if (metrics.verified >= 3 && metrics.withCalendar >= 2 && metrics.openSlots14d >= 6) {
    return "active";
  }
  if (metrics.verified >= 1 && metrics.openSlots14d >= 1) {
    return "limited";
  }
  if (metrics.waitingClients >= 3 || metrics.verified >= 1) {
    return "coming_soon";
  }
  return "collecting_supply";
}

export function getCityMetrics(): CityMetrics[] {
  const keys = [
    ...new Set(Object.values(LOCATIONS).map((l) => l.cityKey)),
  ];

  return keys
    .map((cityKey) => {
      const label =
        Object.values(LOCATIONS).find((l) => l.cityKey === cityKey)?.label ||
        cityKey;
      const inCity = PROVIDERS.filter(
        (p) =>
          p.city.toLowerCase().includes(label.split("—")[0].trim().toLowerCase()) ||
          // map common names
          (cityKey === "praha" && p.city === "Praha") ||
          (cityKey === "brno" && p.city === "Brno") ||
          (cityKey === "ostrava" && p.city === "Ostrava") ||
          (cityKey === "plzen" && p.city === "Plzeň") ||
          (cityKey === "liberec" && p.city === "Liberec") ||
          (cityKey === "olomouc" && p.city === "Olomouc")
      );
      const verified = inCity.filter((p) => p.verified).length;
      const withCalendar = inCity.filter((p) => getBookableSlots(p).length > 0).length;
      const openSlots14d = inCity.reduce(
        (sum, p) => sum + getBookableSlots(p, 14).length,
        0
      );
      const waitingClients = WAITLIST_SEED[cityKey] ?? 0;
      const status = computeCityStatus({
        verified,
        withCalendar,
        openSlots14d,
        waitingClients,
      });
      return {
        cityKey,
        label: label.split("—")[0].trim(),
        registered: inCity.length,
        verified,
        withCalendar,
        openSlots14d,
        waitingClients,
        status,
      };
    })
    .sort((a, b) => b.openSlots14d - a.openSlots14d || a.label.localeCompare(b.label, "cs"));
}

export function getCityStatus(cityKey: string): CityStatus {
  return (
    getCityMetrics().find((c) => c.cityKey === cityKey)?.status ??
    "collecting_supply"
  );
}

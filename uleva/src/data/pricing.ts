export type ServiceType = "uleva" | "dula" | "laktace";

/**
 * Model A (tržiště): klientka vidí `pricePerHour` = cenu služby pečující.
 * `payoutPerHour` = odměna pečující po zúčtování zprostředkování.
 *
 * LEGAL/TAX BLOCKER: dokud advokát + daňový poradce nezvolí jeden fakturační
 * tok (viz /admin/pravni · BILLING_HYPOTHESES), nepouštět ostré platby.
 */
export const SERVICE_PRICING: Record<
  ServiceType,
  {
    label: string;
    shortLabel: string;
    pricePerHour: number;
    payoutPerHour: number;
    minHours: number;
    description: string;
    marketNote: string;
  }
> = {
  uleva: {
    label: "Úleva doma",
    shortLabel: "Úleva",
    pricePerHour: 449,
    payoutPerHour: 250,
    minHours: 3,
    description:
      "Uklidit, pohlídat sourozence, uvařit, být s miminkem zatímco si odpočineš.",
    marketNote: "Chůvy/úklid běžně 180–300 Kč/h. Výplata 250 Kč/h + přísun rezervací.",
  },
  dula: {
    label: "Poporodní dula",
    shortLabel: "Dula",
    // Trh poporodních návštěv typicky ~750–1 200 Kč/h
    pricePerHour: 899,
    payoutPerHour: 490,
    minHours: 2,
    description:
      "Přítomnost, rutina, emoční opora. Nezdravotní podpora v šestinedělí.",
    marketNote: "Soukromé duly často 750–1 200 Kč/h. Výplata 490 Kč/h za hotové termíny.",
  },
  laktace: {
    label: "Laktační poradkyně",
    shortLabel: "Laktace",
    // Trh ~750–1 200 Kč/h, první návštěvy často 1 100–1 700 Kč
    pricePerHour: 1090,
    payoutPerHour: 620,
    minHours: 1,
    description: "Podpora kojení na objednání. Podle kvalifikace jasně označená.",
    marketNote: "LP běžně 750–1 200+ Kč/h. Výplata 620 Kč/h + stabilní poptávka.",
  },
};

export function calcBooking(service: ServiceType, hours: number) {
  const pricing = SERVICE_PRICING[service];
  const h = Math.max(hours, pricing.minHours);
  const total = pricing.pricePerHour * h;
  const provider = pricing.payoutPerHour * h;
  const platform = total - provider;
  const marginPct = total > 0 ? platform / total : 0;
  return {
    hours: h,
    total,
    provider,
    platform,
    marginPct,
    pricePerHour: pricing.pricePerHour,
    payoutPerHour: pricing.payoutPerHour,
  };
}

/** Jen pro interní / pečující pohled — ne do UI maminky. */
export function formatMarginLabel(service: ServiceType) {
  const q = calcBooking(service, 1);
  return `${Math.round(q.marginPct * 100)} % provozní marže`;
}

export function formatCzk(amount: number) {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(amount);
}

export type ServiceType = "uleva" | "dula" | "laktace";

export const PLATFORM_FEE = 0.18;

export const SERVICE_PRICING: Record<
  ServiceType,
  {
    label: string;
    shortLabel: string;
    pricePerHour: number;
    minHours: number;
    description: string;
  }
> = {
  uleva: {
    label: "Úleva doma",
    shortLabel: "Úleva",
    pricePerHour: 449,
    minHours: 3,
    description: "Uvařit, uklidit, pohlídat sourozence, být s miminkem zatímco si odpočineš.",
  },
  dula: {
    label: "Poporodní dula",
    shortLabel: "Dula",
    pricePerHour: 699,
    minHours: 2,
    description: "Přítomnost, rutina, emoční opora. Nezdravotní podpora v šestinedělí.",
  },
  laktace: {
    label: "Laktační poradkyně",
    shortLabel: "Laktace",
    pricePerHour: 899,
    minHours: 1,
    description: "Podpora kojení na objednání. Podle kvalifikace jasně označená.",
  },
};

export function calcBooking(service: ServiceType, hours: number) {
  const pricing = SERVICE_PRICING[service];
  const h = Math.max(hours, pricing.minHours);
  const total = pricing.pricePerHour * h;
  const fee = Math.round(total * PLATFORM_FEE);
  const provider = total - fee;
  return { hours: h, total, fee, provider, pricePerHour: pricing.pricePerHour };
}

export function formatCzk(amount: number) {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(amount);
}

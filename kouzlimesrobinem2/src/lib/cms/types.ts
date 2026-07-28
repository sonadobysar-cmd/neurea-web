import defaultContent from "@/data/default-content.json";

export type GalleryImage = {
  src: string;
  alt: string;
  wide?: boolean;
};

export type DisciplineCard = {
  letter: string;
  suit: "h" | "d" | "s" | "c";
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  back: string[];
};

export type SiteContent = {
  brand: { name: string; tagline: string };
  hero: {
    eyebrow: string;
    line1: string;
    line2Before: string;
    line2Em: string;
    line2After: string;
    line3: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
    imageAlt: string;
    seal: string;
  };
  marquee: string[];
  disciplines: {
    eyebrow: string;
    titleBefore: string;
    titleEm: string;
    lead: string;
    cards: DisciplineCard[];
  };
  program: {
    eyebrow: string;
    titleBefore: string;
    titleEm: string;
    lead: string;
    steps: { title: string; text: string }[];
  };
  gallery: {
    eyebrow: string;
    titleBefore: string;
    titleEm: string;
    images: GalleryImage[];
  };
  quote: { eyebrow: string; text: string; caption: string };
  pricing: {
    eyebrow: string;
    titleBefore: string;
    titleEm: string;
    lead: string;
    priceLabel: string;
    priceAmount: string;
    priceCurrency: string;
    pricePer: string;
    priceNote: string;
    travelLabel: string;
    travelAmount: string;
    travelUnit: string;
    travelPer: string;
    travelNote: string;
  };
  about: {
    eyebrow: string;
    titleBefore: string;
    titleEm: string;
    lead1: string;
    lead2: string;
    signature: string;
    image: string;
    imageAlt: string;
  };
  contact: {
    eyebrow: string;
    titleBefore: string;
    titleEm: string;
    phoneDisplay: string;
    phoneHref: string;
    email: string;
    thanks: string;
  };
  footer: { copy: string };
};

export const DEFAULT_CONTENT = defaultContent as SiteContent;

export function mergeContent(partial: unknown): SiteContent {
  if (!partial || typeof partial !== "object") return structuredClone(DEFAULT_CONTENT);
  return deepMerge(structuredClone(DEFAULT_CONTENT), partial as Partial<SiteContent>);
}

function deepMerge<T>(base: T, patch: unknown): T {
  if (!patch || typeof patch !== "object" || Array.isArray(patch)) {
    return (patch as T) ?? base;
  }
  if (Array.isArray(base)) {
    return (Array.isArray(patch) ? patch : base) as T;
  }
  const out = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(patch as Record<string, unknown>)) {
    if (value === undefined) continue;
    const current = out[key];
    if (
      current &&
      typeof current === "object" &&
      !Array.isArray(current) &&
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      out[key] = deepMerge(current, value);
    } else {
      out[key] = value;
    }
  }
  return out as T;
}

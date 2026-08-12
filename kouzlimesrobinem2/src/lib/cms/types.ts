import defaultContent from "@/data/default-content.json";
import { ANALYTICS_PRIVACY_NOTICE, LEGAL_DEFAULTS } from "@/data/legal-defaults";

export type LegalSection = {
  heading: string;
  body: string;
};

export type LegalPageContent = {
  title: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
};

export type LegalPagesContent = {
  terms: LegalPageContent;
  privacy: LegalPageContent;
};

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

export type PricingTicket = {
  audienceLabel: string;
  audience: string;
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
  moments: {
    titleBefore: string;
    titleEm: string;
    lead: string;
    images: GalleryImage[];
  };
  quote: { eyebrow: string; text: string; caption: string };
  pricing: {
    eyebrow: string;
    titleBefore: string;
    titleEm: string;
    lead: string;
    tickets: PricingTicket[];
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
    bookingUrl: string;
  };
  footer: { copy: string };
  legal: LegalPagesContent;
};

export const DEFAULT_CONTENT = {
  ...(defaultContent as Omit<SiteContent, "legal">),
  legal: LEGAL_DEFAULTS,
} as SiteContent;

export function mergeContent(partial: unknown): SiteContent {
  if (!partial || typeof partial !== "object") return structuredClone(DEFAULT_CONTENT);
  const merged = deepMerge(structuredClone(DEFAULT_CONTENT), partial as Partial<SiteContent>);
  migrateRobinAugustBrief(merged);
  const measurement = merged.legal.privacy.sections.find((section) =>
    section.heading.toLowerCase().includes("cookies"),
  );
  if (measurement && !measurement.body.includes("30minutové návštěvní relace")) {
    measurement.body = `${measurement.body}\n\n${ANALYTICS_PRIVACY_NOTICE}`;
  }
  return merged;
}

function migrateRobinAugustBrief(content: SiteContent) {
  const updatedCardBacks = [
    [
      "Interaktivní vystoupení — každý účastník se zapojí",
      "Hromada humoru a překvapení",
      "Vše zakončené tvarováním balónků",
    ],
    [
      "Stálé balónkové stanoviště",
      "Interaktivní chůze areálem",
      "Výběr z balónkového menu",
    ],
    [
      "Myslíte si, že máte své myšlenky pod kontrolou?",
      "Iluze svobodné vůle",
      "Odhalení neverbálních signálů",
    ],
  ];
  const legacyCardBacks = [
    ["Oslavy · školky · 1. stupeň ZŠ", "Děti asistují na jevišti", "Humor pro celou rodinu"],
    ["Pejsci, meče i květiny", "Tvorba přímo před očima", "Výtvor pro každé dítě i dospěláka domů :-)"],
    ["Firemní večírky a svatby", "Mikromagie u stolu", "Čtení myšlenek naživo"],
  ];

  content.disciplines.cards.forEach((card, index) => {
    const legacy = legacyCardBacks[index];
    if (legacy && card.back.length === legacy.length && card.back.every((line, i) => line === legacy[i])) {
      card.back = updatedCardBacks[index];
    }
  });

  if (
    content.moments.images.length > 0 &&
    content.moments.images.every((image) => image.src.startsWith("/luxury/moments/ph-"))
  ) {
    content.moments.images = structuredClone(DEFAULT_CONTENT.moments.images);
  }
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

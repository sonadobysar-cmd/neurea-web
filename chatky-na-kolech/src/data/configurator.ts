/** Tiny House FLAX — konfigurátor: ceny a katalog možností.
 *  Ceny jsou orientační placeholdery — snadno upravitelné na jednom místě.
 */

export const WALL_HEIGHT_DEFAULT = 2.5;
export const WALL_HEIGHT_LOFT = 3.5;
export const AREA_THRESHOLD = 30; // m²

export const DIMENSIONS = {
  length: { min: 6, max: 12, step: 0.5, fine: 0.1, default: 8 },
  width: { min: 2.5, max: 4, step: 0.5, fine: 0.1, default: 2.5 },
} as const;

/** Základní cena za m² podlahové plochy */
export const BASE_PRICE = {
  under30: 48_000, // Cena A
  over30: 44_000, // Cena B
} as const;

export const ROOF_TYPES = [
  {
    id: "ackova",
    label: "Áčková",
    desc: "Klasický tvar, bez příplatku",
    surchargePerM2: 0,
    requiresWidth: null as number | null,
  },
  {
    id: "plocha",
    label: "Plochá",
    desc: "Moderní silueta, bez příplatku",
    surchargePerM2: 0,
    requiresWidth: null as number | null,
  },
  {
    id: "kulata",
    label: "Kulatá",
    desc: "Jen při šířce 2,5 m · příplatek dle plochy",
    surchargePerM2: 3_200,
    requiresWidth: 2.5,
  },
] as const;

export type RoofId = (typeof ROOF_TYPES)[number]["id"];

export const FACADES = [
  {
    id: "smrk",
    label: "Smrk",
    desc: "Včetně nátěru",
    pricePerM2: 1_850,
    includesPaint: true,
    woodShare: 1,
    metalShare: 0,
    sample: "/media/fasady/smrk.jpg",
    swatch: "#C4A882",
  },
  {
    id: "thermo",
    label: "Thermoborovice",
    desc: "Tepelně upravené dřevo",
    pricePerM2: 2_450,
    includesPaint: false,
    woodShare: 1,
    metalShare: 0,
    sample: "/media/fasady/thermo-look.jpg",
    swatch: "#5C4033",
  },
  {
    id: "modrin",
    label: "Modřín",
    desc: "Přirozeně odolný",
    pricePerM2: 2_750,
    includesPaint: false,
    woodShare: 1,
    metalShare: 0,
    sample: "/media/fasady/modrin-look.jpg",
    swatch: "#B8956A",
  },
  {
    id: "plech",
    label: "Plech",
    desc: "Falcový / trapéz",
    pricePerM2: 2_150,
    includesPaint: false,
    woodShare: 0,
    metalShare: 1,
    sample: "/media/fasady/thermo-look.jpg",
    swatch: "#6B7280",
  },
  {
    id: "half",
    label: "50 % dřevo / 50 % plech",
    desc: "Kombinovaná fasáda",
    /** u half se použijí WOOD_HALF + METAL_HALF */
    pricePerM2: 0,
    includesPaint: false,
    woodShare: 0.5,
    metalShare: 0.5,
    sample: "/media/fasady/smrk.jpg",
    swatch: "#8B7355",
  },
] as const;

export type FacadeId = (typeof FACADES)[number]["id"];

/** Ceny pro variantu 50/50 */
export const HALF_FACADE = {
  woodPerM2: 2_450, // thermoborovice jako výchozí dřevo v kombinaci
  metalPerM2: 2_150,
} as const;

export const PAINT = {
  none: { id: "none" as const, label: "Bez nátěru", pricePerM2: 0 },
  yes: { id: "yes" as const, label: "S nátěrem", pricePerM2: 380 },
};

export const BATHROOM = {
  none: { id: "none" as const, label: "Ne", price: 0 },
  yes: { id: "yes" as const, label: "Ano", price: 0 },
} as const;

export const BATHROOM_VARIANTS = [
  {
    id: "sprcha",
    label: "Sprcha nebo vana",
    desc: "S obkladem Rocko",
    price: 95_000,
  },
  {
    id: "komplet",
    label: "Kompletní koupelna",
    desc: "Celý obklad Rocko",
    price: 165_000,
  },
] as const;

export type BathVariantId = (typeof BATHROOM_VARIANTS)[number]["id"];

export const FLOOR_HEATING = {
  none: { id: "none" as const, label: "Ne", price: 0 },
  under30: { id: "yes" as const, label: "Ano", priceUnder30: 58_000, priceOver30: 82_000 },
};

export const INSULATION = {
  none: { id: "none" as const, label: "Ne", pricePerM2: 0 },
  yes: { id: "yes" as const, label: "Ano", pricePerM2: 520 },
};

export const LOFTS = [
  { id: "none", label: "Bez loftu", price: 0, count: 0 },
  { id: "one", label: "1 loft", price: 48_000, count: 1 },
  { id: "two", label: "2 samostatné lofty", price: 88_000, count: 2 },
] as const;

export type LoftId = (typeof LOFTS)[number]["id"];

export const KITCHEN = {
  none: { id: "none" as const, label: "Ne" },
  yes: { id: "yes" as const, label: "Ano" },
};

export const KITCHEN_VARIANTS = [
  {
    id: "m3",
    label: "3 moduly",
    desc: "Dřez, malá lednice, dvouplotýnková varná deska",
    price: 72_000,
  },
  {
    id: "m4",
    label: "4 moduly",
    desc: "Stejná výbava + větší pracovní plocha / větší lednice / trouba",
    price: 105_000,
  },
  {
    id: "m56",
    label: "5–6 modulů",
    desc: "Dřez, velká lednice, 4 plotýnky, vestavná trouba, více úložného prostoru",
    price: 148_000,
  },
] as const;

export type KitchenVariantId = (typeof KITCHEN_VARIANTS)[number]["id"];

export const ROOM = {
  none: { id: "none" as const, label: "Ne", price: 0 },
  yes: { id: "yes" as const, label: "Ano", price: 62_000 },
};

export const INCLUDED = [
  "Mobilní podvozek",
  "Nosná konstrukce z KVH hranolů",
  "Difuzně uzavřená skladba stěn",
  "Provětrávaná fasáda",
  "Zateplení stěn, podlahy a střechy (stříkaná izolace nebo dle dohody)",
  "Střešní krytina",
  "Plastová okna v dekoru",
  "Vchodové dveře v dekoru",
  "Interiérový smrkový obklad",
  "Podlahová krytina",
  "Kompletní elektroinstalace",
  "Instalační předstěna z KVH 40 × 40 mm pro vedení rozvodů",
  "Příprava vody a odpadů",
  "Osvětlení",
  "Certifikovaný prostup pro komín",
  "Manuál k Tiny House",
];

export const WALL_LAYERS = [
  "Fasádní obklad dle výběru",
  "Provětrávaný rošt",
  "Folie Jutadach AP",
  "OSB deska",
  "Nosná konstrukce z KVH se zateplením",
  "Hliníková parotěsná fólie",
  "Instalační předstěna z KVH 40 × 40 mm s rozvody",
  "Vnitřní smrkový obklad",
];

export const SUPPLIERS = [
  "FenStar",
  "Dřevo Smutný",
  "DEK",
  "SECA Borohrádek",
  "Maslen",
  "Jutadach",
  "Přírodní stavba cz",
  "Rocko — Titanmultiplast.cz",
  "Neumann",
  "Osmo",
  "Sonepar",
  "Biodesky Matili",
];

export function round1(n: number) {
  return Math.round(n * 10) / 10;
}

export function clampDim(n: number, min: number, max: number, fine: number) {
  const stepped = Math.round(n / fine) * fine;
  return Math.min(max, Math.max(min, round1(stepped)));
}

export type ConfigState = {
  length: number;
  width: number;
  roof: RoofId;
  facade: FacadeId;
  paint: "none" | "yes";
  bathroom: "none" | "yes";
  bathVariant: BathVariantId;
  floorHeating: "none" | "yes";
  insulation: "none" | "yes";
  loft: LoftId;
  kitchen: "none" | "yes";
  kitchenVariant: KitchenVariantId;
  room: "none" | "yes";
};

export type PriceBreakdown = {
  floorArea: number;
  roofArea: number;
  wallArea: number;
  wallHeight: number;
  base: number;
  roofSurcharge: number;
  facade: number;
  paint: number;
  bathroom: number;
  floorHeating: number;
  insulation: number;
  loft: number;
  kitchen: number;
  room: number;
  total: number;
};

export function calcGeometry(state: ConfigState) {
  const loftCount = LOFTS.find((l) => l.id === state.loft)?.count ?? 0;
  const wallHeight = loftCount > 0 ? WALL_HEIGHT_LOFT : WALL_HEIGHT_DEFAULT;
  const floorArea = round1(state.length * state.width);
  const roofArea = floorArea;
  const wallArea = round1(2 * (state.length + state.width) * wallHeight);
  return { floorArea, roofArea, wallArea, wallHeight, loftCount };
}

export function calcPrices(state: ConfigState): PriceBreakdown {
  const geo = calcGeometry(state);
  const { floorArea, roofArea, wallArea, wallHeight } = geo;

  const baseRate =
    floorArea <= AREA_THRESHOLD ? BASE_PRICE.under30 : BASE_PRICE.over30;
  const base = Math.round(floorArea * baseRate);

  const roofOpt = ROOF_TYPES.find((r) => r.id === state.roof)!;
  const roofSurcharge = Math.round(floorArea * roofOpt.surchargePerM2);

  const facadeOpt = FACADES.find((f) => f.id === state.facade)!;
  let facade = 0;
  if (facadeOpt.id === "half") {
    facade = Math.round(
      (wallArea / 2) * HALF_FACADE.woodPerM2 +
        (wallArea / 2) * HALF_FACADE.metalPerM2
    );
  } else {
    facade = Math.round(wallArea * facadeOpt.pricePerM2);
  }

  const showPaint = !facadeOpt.includesPaint;
  const paint =
    showPaint && state.paint === "yes"
      ? Math.round(wallArea * PAINT.yes.pricePerM2)
      : 0;

  let bathroom = 0;
  if (state.bathroom === "yes") {
    bathroom =
      BATHROOM_VARIANTS.find((b) => b.id === state.bathVariant)?.price ?? 0;
  }

  let floorHeating = 0;
  if (state.floorHeating === "yes") {
    floorHeating =
      floorArea <= AREA_THRESHOLD
        ? FLOOR_HEATING.under30.priceUnder30
        : FLOOR_HEATING.under30.priceOver30;
  }

  const insulation =
    state.insulation === "yes"
      ? Math.round((wallArea + roofArea) * INSULATION.yes.pricePerM2)
      : 0;

  const loft =
    state.roof === "kulata"
      ? 0
      : LOFTS.find((l) => l.id === state.loft)?.price ?? 0;

  let kitchen = 0;
  if (state.kitchen === "yes") {
    kitchen =
      KITCHEN_VARIANTS.find((k) => k.id === state.kitchenVariant)?.price ?? 0;
  }

  const room = state.room === "yes" ? ROOM.yes.price : 0;

  const total =
    base +
    roofSurcharge +
    facade +
    paint +
    bathroom +
    floorHeating +
    insulation +
    loft +
    kitchen +
    room;

  return {
    floorArea,
    roofArea,
    wallArea,
    wallHeight,
    base,
    roofSurcharge,
    facade,
    paint,
    bathroom,
    floorHeating,
    insulation,
    loft,
    kitchen,
    room,
    total,
  };
}

export const DEFAULT_CONFIG: ConfigState = {
  length: DIMENSIONS.length.default,
  width: DIMENSIONS.width.default,
  roof: "ackova",
  facade: "smrk",
  paint: "none",
  bathroom: "none",
  bathVariant: "sprcha",
  floorHeating: "none",
  insulation: "none",
  loft: "none",
  kitchen: "none",
  kitchenVariant: "m3",
  room: "none",
};

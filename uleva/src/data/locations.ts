export type GeoPoint = {
  lat: number;
  lng: number;
  label: string;
  cityKey: string;
};

/** Major CZ cities + districts for search / map. */
export const LOCATIONS: Record<string, GeoPoint> = {
  praha: { lat: 50.0755, lng: 14.4378, label: "Praha", cityKey: "praha" },
  "praha-vinohrady": {
    lat: 50.0755,
    lng: 14.4378,
    label: "Praha — Vinohrady",
    cityKey: "praha",
  },
  "praha-smichov": {
    lat: 50.0752,
    lng: 14.405,
    label: "Praha — Smíchov",
    cityKey: "praha",
  },
  brno: { lat: 49.1951, lng: 16.6068, label: "Brno", cityKey: "brno" },
  ostrava: { lat: 49.8209, lng: 18.2625, label: "Ostrava", cityKey: "ostrava" },
  plzen: { lat: 49.7475, lng: 13.3776, label: "Plzeň", cityKey: "plzen" },
  liberec: { lat: 50.7663, lng: 15.0543, label: "Liberec", cityKey: "liberec" },
  olomouc: { lat: 49.5938, lng: 17.2509, label: "Olomouc", cityKey: "olomouc" },
  "hradec-kralove": {
    lat: 50.2103,
    lng: 15.8252,
    label: "Hradec Králové",
    cityKey: "hradec-kralove",
  },
  "ceske-budejovice": {
    lat: 48.9745,
    lng: 14.4743,
    label: "České Budějovice",
    cityKey: "ceske-budejovice",
  },
  pardubice: {
    lat: 50.0343,
    lng: 15.7812,
    label: "Pardubice",
    cityKey: "pardubice",
  },
  zlin: { lat: 49.2265, lng: 17.6687, label: "Zlín", cityKey: "zlin" },
  jihlava: { lat: 49.3961, lng: 15.5903, label: "Jihlava", cityKey: "jihlava" },
  usti: {
    lat: 50.6607,
    lng: 14.0323,
    label: "Ústí nad Labem",
    cityKey: "usti",
  },
  "karlovy-vary": {
    lat: 50.2327,
    lng: 12.871,
    label: "Karlovy Vary",
    cityKey: "karlovy-vary",
  },
};

/** Exact / prefix PSČ → approximate center. */
const PSC_POINTS: { match: RegExp; point: GeoPoint }[] = [
  { match: /^110/, point: { ...LOCATIONS.praha, label: "Praha 1 (110 00)" } },
  { match: /^120/, point: { ...LOCATIONS["praha-vinohrady"], label: "Praha 2 (120 00)" } },
  { match: /^150/, point: { ...LOCATIONS["praha-smichov"], label: "Praha 5 (150 00)" } },
  { match: /^1\d{2}/, point: { ...LOCATIONS.praha, label: "Praha" } },
  { match: /^602/, point: { ...LOCATIONS.brno, label: "Brno (602 00)" } },
  { match: /^6\d{2}/, point: { ...LOCATIONS.brno, label: "Brno a okolí" } },
  { match: /^70[0-2]/, point: { ...LOCATIONS.ostrava, label: "Ostrava" } },
  { match: /^30[1-3]/, point: { ...LOCATIONS.plzen, label: "Plzeň" } },
  { match: /^46[0-1]/, point: { ...LOCATIONS.liberec, label: "Liberec" } },
  { match: /^77[0-1]/, point: { ...LOCATIONS.olomouc, label: "Olomouc" } },
  { match: /^50[0-1]/, point: { ...LOCATIONS["hradec-kralove"], label: "Hradec Králové" } },
  { match: /^37[0-1]/, point: { ...LOCATIONS["ceske-budejovice"], label: "České Budějovice" } },
  { match: /^53[0-1]/, point: { ...LOCATIONS.pardubice, label: "Pardubice" } },
  { match: /^76[0-1]/, point: { ...LOCATIONS.zlin, label: "Zlín" } },
  { match: /^58[6-7]/, point: { ...LOCATIONS.jihlava, label: "Jihlava" } },
  { match: /^40[0-1]/, point: { ...LOCATIONS.usti, label: "Ústí nad Labem" } },
  { match: /^36[0-1]/, point: { ...LOCATIONS["karlovy-vary"], label: "Karlovy Vary" } },
];

export function normalizePsc(raw: string) {
  return raw.replace(/\s+/g, "").replace(/\D/g, "").slice(0, 5);
}

export function resolvePsc(raw: string): GeoPoint | null {
  const psc = normalizePsc(raw);
  if (psc.length < 3) return null;
  for (const row of PSC_POINTS) {
    if (row.match.test(psc)) {
      return { ...row.point, label: `${row.point.label} · PSČ ${psc}` };
    }
  }
  return null;
}

export function resolveLocationQuery(raw: string): GeoPoint | null {
  const q = raw.trim().toLowerCase();
  if (!q) return null;

  const psc = resolvePsc(q);
  if (psc && /^\d/.test(q.replace(/\s/g, ""))) return psc;

  const exact = Object.values(LOCATIONS).find(
    (l) =>
      l.label.toLowerCase() === q ||
      l.cityKey === q ||
      l.label.toLowerCase().includes(q)
  );
  if (exact) return exact;

  return resolvePsc(q);
}

export function nearestLocation(lat: number, lng: number): GeoPoint {
  let best = LOCATIONS.praha;
  let bestD = Infinity;
  for (const loc of Object.values(LOCATIONS)) {
    const d = (loc.lat - lat) ** 2 + (loc.lng - lng) ** 2;
    if (d < bestD) {
      bestD = d;
      best = loc;
    }
  }
  return {
    ...best,
    lat,
    lng,
    label: `Moje poloha · blízko ${best.label}`,
  };
}

export function osmEmbedUrl(lat: number, lng: number, delta = 0.045) {
  const minLon = lng - delta;
  const minLat = lat - delta * 0.7;
  const maxLon = lng + delta;
  const maxLat = lat + delta * 0.7;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}&layer=mapnik&marker=${lat}%2C${lng}`;
}

export type NeedId =
  | "uklid"
  | "pohlidat"
  | "vareni"
  | "dula"
  | "laktace"
  | "multi";

export const NEED_OPTIONS: {
  id: NeedId;
  label: string;
  hint: string;
}[] = [
  { id: "uklid", label: "Úklid", hint: "Domácnost, prádlo, pořádek" },
  { id: "pohlidat", label: "Pohlídat", hint: "Sourozenci / přítomnost u miminka" },
  { id: "vareni", label: "Vaření", hint: "Oběd, večeře, nákup" },
  { id: "dula", label: "Dula", hint: "Poporodní přítomnost a rutina" },
  { id: "laktace", label: "Laktace", hint: "Podpora kojení" },
  {
    id: "multi",
    label: "Kombinovaná úleva",
    hint: "Úklid, vaření a pohlídání v jedné návštěvě Úlevy doma",
  },
];

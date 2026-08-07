import { ServiceType } from "./pricing";

export type DayKey = 0 | 1 | 2 | 3 | 4 | 5 | 6; // Sun-Sat

export type Provider = {
  id: string;
  name: string;
  city: string;
  district: string;
  lat: number;
  lng: number;
  services: ServiceType[];
  bio: string;
  experienceYears: number;
  experiences: string[];
  badges: string[];
  rating: number;
  reviewCount: number;
  completedVisits: number;
  verified: true;
  lactationLevel?: "pa" | "laicka";
  radiusKm: number;
  /** Hours available each weekday, e.g. ["09:00","13:00"] start times */
  weeklySlots: Partial<Record<DayKey, string[]>>;
  slotHours: number;
  reviews: { author: string; text: string; stars: number; date: string }[];
};

export const PROVIDERS: Provider[] = [
  {
    id: "anna-praha",
    name: "Anna K.",
    city: "Praha",
    district: "Vinohrady",
    lat: 50.0755,
    lng: 14.4378,
    services: ["uleva", "dula"],
    bio: "Dvě vlastní děti, kurz poporodní duly. Přijedu, uvařím, pohlídám staršího a nechám tě vyspat.",
    experienceYears: 4,
    experiences: ["Miminka 0–3 m", "Sourozenci", "Vaření", "Úklid", "Noční směna"],
    badges: ["Ověřená totožnost", "RT OK", "Pohovor OK", "Pojištěná", "Kurz duly"],
    rating: 4.9,
    reviewCount: 28,
    completedVisits: 64,
    verified: true,
    radiusKm: 12,
    weeklySlots: {
      1: ["09:00", "14:00"],
      2: ["09:00", "14:00"],
      3: ["10:00"],
      4: ["09:00", "14:00"],
      5: ["09:00"],
      6: ["10:00"],
    },
    slotHours: 3,
    reviews: [
      {
        author: "Tereza",
        text: "Přijela včas, uvařila oběd a pohlídala dvouletého, zatímco jsem spala s miminkem. Poprvé za týdny jsem si opravdu odpočinula.",
        stars: 5,
        date: "2026-07-12",
      },
      {
        author: "Klára",
        text: "Klidná, praktická, bez zbytečných rad. Přesně to, co jsem potřebovala.",
        stars: 5,
        date: "2026-06-28",
      },
    ],
  },
  {
    id: "eliska-brno",
    name: "Eliška M.",
    city: "Brno",
    district: "Žabovřesky",
    lat: 49.2105,
    lng: 16.582,
    services: ["uleva"],
    bio: "Na rodičovské, ráda pomůžu jiné mámě. Úklid, vaření, sourozenci — bez dramatu.",
    experienceYears: 2,
    experiences: ["Batolata", "Vaření", "Úklid", "Sourozenci"],
    badges: ["Ověřená totožnost", "RT OK", "Pohovor OK", "Pojištěná"],
    rating: 4.8,
    reviewCount: 15,
    completedVisits: 31,
    verified: true,
    radiusKm: 10,
    weeklySlots: {
      1: ["08:00", "13:00"],
      2: ["08:00", "13:00"],
      3: ["08:00", "13:00"],
      4: ["08:00"],
      5: ["09:00", "14:00"],
    },
    slotHours: 3,
    reviews: [
      {
        author: "Marta",
        text: "Kuchyně leskla, děti spokojené, já konečně v klidu. Domluvíme se znovu.",
        stars: 5,
        date: "2026-07-20",
      },
    ],
  },
  {
    id: "petra-praha-laktace",
    name: "Petra Š.",
    city: "Praha",
    district: "Smíchov",
    lat: 50.069,
    lng: 14.4,
    services: ["laktace", "dula"],
    bio: "Porodní asistentka a laktační poradkyně. Pomůžu s přisátím, bolestí i jistotou.",
    experienceYears: 8,
    experiences: ["Kojení", "PA", "Šestinedělí", "Dvojčata"],
    badges: ["Ověřená totožnost", "RT OK", "Pohovor OK", "Pojištěná", "Porodní asistentka"],
    rating: 5,
    reviewCount: 41,
    completedVisits: 112,
    verified: true,
    lactationLevel: "pa",
    radiusKm: 15,
    weeklySlots: {
      1: ["09:00", "11:00", "16:00"],
      2: ["09:00", "11:00"],
      3: ["10:00", "15:00"],
      4: ["09:00", "11:00", "16:00"],
      5: ["09:00"],
    },
    slotHours: 1.5,
    reviews: [
      {
        author: "Lucie",
        text: "Za hodinu a půl jsme vyřešily to, co jsem googilla tři noci. Empatie i odbornost.",
        stars: 5,
        date: "2026-07-02",
      },
    ],
  },
  {
    id: "jana-ostrava",
    name: "Jana R.",
    city: "Ostrava",
    district: "Poruba",
    lat: 49.826,
    lng: 18.17,
    services: ["uleva", "dula"],
    bio: "Poporodní dula. Přijdu, když je chaos — uklidím, pohlídám, poslechnu.",
    experienceYears: 3,
    experiences: ["Miminka 0–3 m", "Úklid", "Vaření", "Kurz duly"],
    badges: ["Ověřená totožnost", "RT OK", "Pohovor OK", "Pojištěná", "Kurz duly"],
    rating: 4.7,
    reviewCount: 12,
    completedVisits: 27,
    verified: true,
    radiusKm: 12,
    weeklySlots: {
      2: ["09:00", "14:00"],
      3: ["09:00", "14:00"],
      4: ["10:00"],
      5: ["09:00", "14:00"],
      6: ["10:00"],
    },
    slotHours: 3,
    reviews: [
      {
        author: "Simona",
        text: "Po císaři jsem nestála na nohou. Jana převzala domácnost a já mohla jen být s dcerou.",
        stars: 5,
        date: "2026-05-18",
      },
    ],
  },
  {
    id: "monika-plzen",
    name: "Monika H.",
    city: "Plzeň",
    district: "Lochotín",
    lat: 49.766,
    lng: 13.38,
    services: ["uleva"],
    bio: "Ráda vařím a mám trpělivost s batolaty. Ideální na dopolední úlevu.",
    experienceYears: 5,
    experiences: ["Batolata", "Vaření", "Úklid", "Procházky"],
    badges: ["Ověřená totožnost", "RT OK", "Pohovor OK", "Pojištěná"],
    rating: 4.8,
    reviewCount: 19,
    completedVisits: 44,
    verified: true,
    radiusKm: 10,
    weeklySlots: {
      1: ["08:00", "13:00"],
      2: ["08:00"],
      3: ["08:00", "13:00"],
      4: ["08:00", "13:00"],
      5: ["08:00"],
    },
    slotHours: 3,
    reviews: [
      {
        author: "Veronika",
        text: "Oběd hotový, byt v klidu, syn nadšený. Bez psaní sem a tam — prostě termín v kalendáři.",
        stars: 5,
        date: "2026-07-08",
      },
    ],
  },
  {
    id: "karolina-hradec",
    name: "Karolína T.",
    city: "Hradec Králové",
    district: "centrum",
    lat: 50.2103,
    lng: 15.825,
    services: ["laktace"],
    bio: "Laická laktační podpora (MAMILA). Hands-off přístup, klid a jistota.",
    experienceYears: 3,
    experiences: ["Kojení", "Šestinedělí"],
    badges: ["Ověřená totožnost", "RT OK", "Pohovor OK", "Pojištěná", "Laktační podpora"],
    rating: 4.9,
    reviewCount: 22,
    completedVisits: 48,
    verified: true,
    lactationLevel: "laicka",
    radiusKm: 15,
    weeklySlots: {
      1: ["10:00", "15:00"],
      3: ["10:00", "15:00"],
      5: ["09:00", "14:00"],
      6: ["10:00"],
    },
    slotHours: 1.5,
    reviews: [
      {
        author: "Eva",
        text: "Konečně jsem pochopila, že to nemusím „umět“. Spokojenější já i syn.",
        stars: 5,
        date: "2026-06-14",
      },
    ],
  },
  {
    id: "bara-liberec",
    name: "Bára N.",
    city: "Liberec",
    district: "Rochlice",
    lat: 50.76,
    lng: 15.07,
    services: ["uleva", "dula"],
    bio: "Pomoc, která přijede. Úklid, vaření, přítomnost u miminka. Ověřená, s kalendářem.",
    experienceYears: 2,
    experiences: ["Miminka 0–3 m", "Úklid", "Vaření", "Sourozenci"],
    badges: ["Ověřená totožnost", "RT OK", "Pohovor OK", "Pojištěná", "Kurz duly"],
    rating: 4.6,
    reviewCount: 9,
    completedVisits: 18,
    verified: true,
    radiusKm: 12,
    weeklySlots: {
      1: ["09:00"],
      2: ["09:00", "14:00"],
      4: ["09:00", "14:00"],
      5: ["10:00"],
      0: ["10:00"],
    },
    slotHours: 3,
    reviews: [
      {
        author: "Nikola",
        text: "Rezervace za dvě kliknutí. Žádné „máš čas ve středu?“. Tohle potřebuju.",
        stars: 5,
        date: "2026-07-22",
      },
    ],
  },
  {
    id: "zuzana-cb",
    name: "Zuzana L.",
    city: "České Budějovice",
    district: "centrum",
    lat: 48.9745,
    lng: 14.474,
    services: ["uleva"],
    bio: "Praktická pomoc pro mámy, které už nestíhají. Ráda přijedu odpoledne.",
    experienceYears: 6,
    experiences: ["Batolata", "Úklid", "Vaření", "Procházky"],
    badges: ["Ověřená totožnost", "RT OK", "Pohovor OK", "Pojištěná"],
    rating: 4.8,
    reviewCount: 17,
    completedVisits: 39,
    verified: true,
    radiusKm: 12,
    weeklySlots: {
      1: ["13:00"],
      2: ["09:00", "13:00"],
      3: ["13:00"],
      4: ["09:00", "13:00"],
      5: ["09:00"],
    },
    slotHours: 3,
    reviews: [],
  },
  {
    id: "adela-olomouc",
    name: "Adéla V.",
    city: "Olomouc",
    district: "Nová Ulice",
    lat: 49.5938,
    lng: 17.2509,
    services: ["dula", "laktace"],
    bio: "Dula a laktační podpora. Jemná, jasná, bez tlaku na dokonalost.",
    experienceYears: 4,
    experiences: ["Kojení", "Šestinedělí", "Kurz duly"],
    badges: ["Ověřená totožnost", "RT OK", "Pohovor OK", "Pojištěná", "Kurz duly", "Laktační podpora"],
    rating: 4.9,
    reviewCount: 24,
    completedVisits: 55,
    verified: true,
    lactationLevel: "laicka",
    radiusKm: 14,
    weeklySlots: {
      2: ["09:00", "14:00"],
      3: ["09:00", "11:00"],
      4: ["10:00", "15:00"],
      6: ["09:00"],
    },
    slotHours: 2,
    reviews: [
      {
        author: "Hana",
        text: "Po porodu jsem byla sama. Adéla mi vrátila pocit, že to zvládnu.",
        stars: 5,
        date: "2026-06-30",
      },
    ],
  },
];

export type BookableSlot = {
  date: string; // YYYY-MM-DD
  start: string; // HH:mm
  end: string;
  hours: number;
};

function addHours(start: string, hours: number) {
  const [h, m] = start.split(":").map(Number);
  const total = h * 60 + m + hours * 60;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function getBookableSlots(provider: Provider, daysAhead = 14): BookableSlot[] {
  const slots: BookableSlot[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 1; i <= daysAhead; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const day = d.getDay() as DayKey;
    const starts = provider.weeklySlots[day] ?? [];
    const date = d.toISOString().slice(0, 10);
    for (const start of starts) {
      slots.push({
        date,
        start,
        end: addHours(start, provider.slotHours),
        hours: provider.slotHours,
      });
    }
  }
  return slots;
}

export function getProvider(id: string) {
  return PROVIDERS.find((p) => p.id === id);
}

export function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export const CITIES: Record<string, { lat: number; lng: number; label: string }> = {
  praha: { lat: 50.0755, lng: 14.4378, label: "Praha" },
  brno: { lat: 49.1951, lng: 16.6068, label: "Brno" },
  ostrava: { lat: 49.8209, lng: 18.2625, label: "Ostrava" },
  plzen: { lat: 49.7475, lng: 13.3776, label: "Plzeň" },
  liberec: { lat: 50.7663, lng: 15.0543, label: "Liberec" },
  olomouc: { lat: 49.5938, lng: 17.2509, label: "Olomouc" },
  "hradec-kralove": { lat: 50.2103, lng: 15.8252, label: "Hradec Králové" },
  "ceske-budejovice": { lat: 48.9745, lng: 14.4743, label: "České Budějovice" },
};

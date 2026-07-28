export const brand = {
  name: "Chatky na kolech",
  short: "CNK",
  legal: "Chatky na kolech",
  domain: "chatkynakolech.cz",
  tagline: "Moderní tiny house. Teplé dřevo. Kola, která dávají svobodu.",
  phone: "+420 777 000 000",
  email: "ahoj@chatkynakolech.cz",
  address: "Dílna · Česká republika",
};

export const nav = [
  { href: "/#cesty", label: "Cesty" },
  { href: "/#kola", label: "Proč kola" },
  { href: "/konfigurator", label: "Konfigurátor" },
  { href: "/realizace", label: "Realizace" },
  { href: "/#kontakt", label: "Kontakt" },
];

/** Tři systematické cesty — ne typové domy */
export const paths = [
  {
    id: "novy",
    eyebrow: "01 · Nový tiny house",
    title: "Chci nový dům na kolech",
    text: "Od rozměrů po výbavu — sestavíte si jednotku v konfigurátoru a uvidíte orientační cenu. Ideál pro pozemek, bydlení i první Airbnb.",
    points: [
      "Rozměry a materiály na míru",
      "Homologovaný podvozek",
      "Orientační cena hned",
    ],
    image: "/media/realizace/tiny-12x4.jpg",
    cta: "Spustit konfigurátor",
    href: "/konfigurator",
    secondary: "Domluvit hovor",
    secondaryHref: "/#kontakt",
  },
  {
    id: "renovace",
    eyebrow: "02 · Opravy & renovace",
    title: "Už mám chatku nebo maringotku",
    text: "Oprava, modernizace interiéru, výměna fasády, zateplení, koupelna. Vdechneme život tomu, co už stojí — bez zbytečné demolice.",
    points: [
      "Diagnostika stavu",
      "Fasáda, izolace, interiér",
      "Krok za krokem s rozpočtem",
    ],
    image: "/media/atelier/obklad.jpg",
    cta: "Poptat renovaci",
    href: "/?zamer=renovace#kontakt",
    secondary: "Napsat e-mail",
    secondaryHref: "mailto:ahoj@chatkynakolech.cz?subject=Opravy%20%26%20renovace",
  },
  {
    id: "byznys",
    eyebrow: "03 · Pro byznys",
    title: "Airbnb, kemp, investice",
    text: "Jednotky i flotily. Výměna starých chatek v kempu. Short-stay, který hosté fotí — a který přesunete, když lokalita přestane dávat smysl.",
    points: [
      "Airbnb & glamping jednotky",
      "Rekonstrukce / výměna kempů",
      "Počítáme s provozem, ne jen půdorysem",
    ],
    image: "/media/realizace/sirek.jpg",
    cta: "Poptat byznys řešení",
    href: "/?zamer=byznys#kontakt",
    secondary: "Sestavit jednotku",
    secondaryHref: "/konfigurator",
  },
];

export const process = [
  {
    n: "01",
    title: "Záměr",
    text: "Nový dům, renovace, nebo byznys? Upřesníme pozemek, rozpočet a termín.",
  },
  {
    n: "02",
    title: "Návrh / konfigurace",
    text: "U nového domu konfigurátor. U renovace a byznysu konkrétní plán prací a kapacity.",
  },
  {
    n: "03",
    title: "Výroba nebo zásah",
    text: "Dílna, materiály, detaily. Hotová jednotka — nebo renovace na místě podle dohody.",
  },
  {
    n: "04",
    title: "Předání",
    text: "Převoz, zaučení, dokumentace. Bydlíte, hostíte, nebo otvíráte sezónu.",
  },
];

export const wheelPoints = [
  {
    title: "Přemístíte, když potřebujete",
    text: "Změna pozemku, nová lokalita pro Airbnb, sezónní kemp. Dům jede s vámi.",
  },
  {
    title: "Bez stavebního maratonu",
    text: "Homologovaný podvozek = přívěs. Řešíte umístění a dispozici — ne roky na úřadě.",
  },
  {
    title: "Investice, která není přibitá",
    text: "Když lokalita přestane vydělávat, jednotku přesunete. Beton tohle neumí.",
  },
];

export const realizations = [
  {
    id: "tiny-12x4",
    title: "Tiny 12×4",
    place: "Moderní flat",
    year: "2025",
    tag: "Nový dům",
    image: "/media/realizace/tiny-12x4.jpg",
  },
  {
    id: "sirek",
    title: "Sirek 8×3",
    place: "Převoz na louku",
    year: "2025",
    tag: "Byznys",
    image: "/media/realizace/sirek.jpg",
  },
  {
    id: "gajan",
    title: "Gajan",
    place: "Kulatá střecha",
    year: "2024",
    tag: "Nový dům",
    image: "/media/realizace/gajan.jpg",
  },
  {
    id: "vagonek",
    title: "Vagonek",
    place: "Glamping",
    year: "2024",
    tag: "Byznys",
    image: "/media/realizace/vagonek.jpg",
  },
  {
    id: "tiny-8x4",
    title: "Tiny 8×4",
    place: "Interiér · loft",
    year: "2025",
    tag: "Nový dům",
    image: "/media/realizace/tiny-8x4-interior.jpg",
  },
  {
    id: "tiny-9",
    title: "Tiny 9×3,4",
    place: "Smrk & loft",
    year: "2025",
    tag: "Nový dům",
    image: "/media/realizace/tiny-9x34-interior.jpg",
  },
  {
    id: "tiny-27",
    title: "Tiny 2,7×8",
    place: "Kompakt",
    year: "2024",
    tag: "Nový dům",
    image: "/media/realizace/tiny-27x8.jpg",
  },
  {
    id: "gajan-in",
    title: "Gajan · uvnitř",
    place: "Kulatá střecha",
    year: "2024",
    tag: "Nový dům",
    image: "/media/realizace/gajan-interior.jpg",
  },
];

export const values = [
  {
    title: "Teplé dřevo, čistý střih",
    text: "Materiály s charakterem — a moderní dispozice. Žádný rustikální kostým.",
  },
  {
    title: "Kola jsou výhoda",
    text: "Homologace a převoz jsou součást produktu. Ne poznámka pod čarou.",
  },
  {
    title: "Tři cesty, jedna dílna",
    text: "Nový dům, renovace i byznys. Stejná kvalita, jiný brief.",
  },
];

export const faq = [
  {
    q: "Stavíte jen nové tiny houses?",
    a: "Ne. Nové jednotky na míru, renovace stávajících chatek/maringotek i byznys projekty (Airbnb, kempy). Vyberete cestu — my navrhneme postup.",
  },
  {
    q: "Opravdu nepotřebuju stavební povolení?",
    a: "U homologovaného podvozku jde legislativně o přívěs. Obvykle řešíte umístění na pozemku, ne klasické stavební řízení. Projdeme to konkrétně.",
  },
  {
    q: "Proč jsou kola tak důležitá?",
    a: "Protože život i byznys se hýbou. Změna pozemku nebo lokality = přesun jednotky, ne nová stavba.",
  },
  {
    q: "Jak začít?",
    a: "Nový dům → konfigurátor. Renovace nebo byznys → krátká poptávka s fotkami/záměrem. Ozveme se s dalším krokem.",
  },
];

export const media = {
  hero: "/media/realizace/sirek.jpg",
  craft: "/media/atelier/obklad.jpg",
  chassis: "/media/atelier/podvozek.jpg",
  structure: "/media/atelier/konstrukce.jpg",
  loft: "/media/atelier/loft-view.jpg",
  wellness: "/media/wellness/virivka.jpg",
};

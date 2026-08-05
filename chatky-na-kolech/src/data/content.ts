export const brand = {
  name: "Chatky na kolech",
  short: "CNK",
  legal: "Chatky na kolech",
  domain: "chatkynakolech.cz",
  tagline: "Moderní tiny house. Přírodní dřevo. Kola, která dávají svobodu.",
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

/** Čtyři systematické cesty — ne typové domy */
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
    secondary: "Poptat konzultaci",
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
    title: "Airbnb a investice",
    text: "Nové jednotky pro krátkodobý pronájem a glamping — hosté je fotí, vy je přesunete, když lokalita přestane dávat smysl. Flotily i jednotlivé investice.",
    points: [
      "Airbnb & glamping jednotky",
      "Opakované jednotky pro investory",
      "Počítáme s provozem, ne jen půdorysem",
    ],
    image: "/media/realizace/vagonek.jpg",
    cta: "Poptat byznys řešení",
    href: "/?zamer=byznys#kontakt",
    secondary: "Sestavit jednotku",
    secondaryHref: "/konfigurator",
  },
  {
    id: "kempy",
    eyebrow: "04 · Rekonstrukce kempů",
    title: "Výměna chatek v kempu",
    text: "Rekonstrukce areálu a postupná výměna starých chatek za moderní jednotky. Koordinace se sezónou — kemp jede dál, vy obnovujete po etapách.",
    points: [
      "Diagnostika stávajícího kempu",
      "Výměna chatek po etapách",
      "Plán prací mimo hlavní sezónu",
    ],
    image: "/media/realizace/sirek.jpg",
    cta: "Poptat rekonstrukci kempu",
    href: "/?zamer=kempy#kontakt",
    secondary: "Poptat konzultaci",
    secondaryHref: "/#kontakt",
  },
];

export const process = [
  {
    n: "01",
    title: "Záměr",
    text: "Nový dům, renovace, byznys nebo rekonstrukce kempu? Upřesníme pozemek, rozpočet a termín.",
  },
  {
    n: "02",
    title: "Návrh / konfigurace",
    text: "U nového domu konfigurátor. U renovace, byznysu i kempů konkrétní plán prací a kapacity.",
  },
  {
    n: "03",
    title: "Výroba nebo zásah",
    text: "Dílna, materiály, detaily. Hotová jednotka — nebo renovace na místě podle dohody.",
  },
  {
    n: "04",
    title: "Předání",
    text: "Převoz, zaučení, dokumentace. Bydlíte, hostíte nebo otevíráte sezónu.",
  },
];

export const wheelPoints = [
  {
    title: "Přemístíte, když potřebujete",
    text: "Změna pozemku, nová lokalita pro Airbnb, sezónní kemp. Dům jede s vámi.",
  },
  {
    title: "Přesun bez nové stavby",
    text: "Homologovaný podvozek usnadňuje převoz. Podmínky umístění se vždy odvíjejí od účelu, pozemku a konkrétní situace.",
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
    alt: "Tiny house 12×4 m s plochou střechou — exteriér moderní jednotky na kolech",
  },
  {
    id: "sirek",
    title: "Sirek 8×3",
    place: "Převoz na louku",
    year: "2025",
    tag: "Byznys",
    image: "/media/realizace/sirek.jpg",
    alt: "Tiny house Sirek 8×3 při převozu na louku na homologovaném podvozku",
  },
  {
    id: "gajan",
    title: "Gajan",
    place: "Kulatá střecha",
    year: "2024",
    tag: "Nový dům",
    image: "/media/realizace/gajan.jpg",
    alt: "Tiny house Gajan s kulatou střechou — exteriér dřevostavby na kolech",
  },
  {
    id: "vagonek",
    title: "Vagonek",
    place: "Glamping",
    year: "2024",
    tag: "Byznys",
    image: "/media/realizace/vagonek.jpg",
    alt: "Tiny house Vagonek pro glamping — dřevěná jednotka na kolech pro krátkodobý pronájem",
  },
  {
    id: "tiny-8x4",
    title: "Tiny 8×4",
    place: "Interiér · loft",
    year: "2025",
    tag: "Nový dům",
    image: "/media/realizace/tiny-8x4-interior.jpg",
    alt: "Interiér tiny house 8×4 m se spacím loftem a smrkovým obkladem",
  },
  {
    id: "tiny-9",
    title: "Tiny 9×3,4",
    place: "Smrk & loft",
    year: "2025",
    tag: "Nový dům",
    image: "/media/realizace/tiny-9x34-interior.jpg",
    alt: "Interiér tiny house 9×3,4 m se smrkovým obkladem a loftem",
  },
  {
    id: "tiny-27",
    title: "Tiny 2,7×8",
    place: "Kompakt",
    year: "2024",
    tag: "Nový dům",
    image: "/media/realizace/tiny-27x8.jpg",
    alt: "Kompaktní tiny house 2,7×8 m — exteriér mobilní jednotky na kolech",
  },
  {
    id: "gajan-in",
    title: "Gajan · uvnitř",
    place: "Kulatá střecha",
    year: "2024",
    tag: "Nový dům",
    image: "/media/realizace/gajan-interior.jpg",
    alt: "Interiér tiny house Gajan s kulatou střechou",
  },
];

export const values = [
  {
    title: "Dřevo s charakterem, čistý střih",
    text: "Materiály s charakterem — a moderní dispozice. Žádný rustikální kostým.",
  },
  {
    title: "Kola jsou výhoda",
    text: "Homologace a převoz jsou součást produktu. Ne poznámka pod čarou.",
  },
  {
    title: "Čtyři cesty, jedna dílna",
    text: "Nový dům, renovace, Airbnb i rekonstrukce kempů. Stejná kvalita, jiný záměr.",
  },
];

export const faq = [
  {
    q: "Stavíte jen nové tiny houses?",
    a: "Ne. Nové jednotky na míru, renovace stávajících chatek/maringotek, Airbnb investice i rekonstrukce kempů. Vyberete cestu — my navrhneme postup.",
  },
  {
    q: "Co budu řešit s úřady?",
    a: "Záleží na účelu, délce umístění a konkrétním pozemku. Homologovaný podvozek usnadňuje převoz, ale automaticky neznamená, že není potřeba povolení. Doporučíme vám ověřit záměr s příslušným stavebním úřadem.",
  },
  {
    q: "Proč jsou kola tak důležitá?",
    a: "Protože život i byznys se hýbou. Změna pozemku nebo lokality = přesun jednotky, ne nová stavba.",
  },
  {
    q: "Jak začít?",
    a: "Nový dům → konfigurátor. Renovace, byznys nebo kemp → krátká poptávka se záměrem. Ozveme se s doporučením dalšího kroku.",
  },
  {
    q: "Kolik tiny house stojí?",
    a: "Cena se odvíjí hlavně od rozměrů, dispozice, fasády a výbavy. V konfigurátoru si sestavíte vlastní variantu a hned uvidíte orientační cenu.",
  },
];

export const media = {
  hero: "/media/hero/hero-forest-dusk.jpg",
  craft: "/media/atelier/obklad.jpg",
  chassis: "/media/atelier/podvozek.jpg",
  mobility: "/media/atelier/tiny-house-podvozek-premium.jpg",
  structure: "/media/atelier/konstrukce.jpg",
  loft: "/media/atelier/loft-view.jpg",
  wellness: "/media/wellness/virivka.jpg",
};

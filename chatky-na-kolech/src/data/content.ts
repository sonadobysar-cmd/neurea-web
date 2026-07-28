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
  { href: "/#pro-koho", label: "Pro koho" },
  { href: "/#kola", label: "Proč kola" },
  { href: "/konfigurator", label: "Konfigurátor" },
  { href: "/#byznys", label: "Investice" },
  { href: "/#kontakt", label: "Kontakt" },
];

/** Funnel audiences */
export const audiences = [
  {
    id: "bydleni",
    title: "Vlastní útočiště",
    text: "Chcete dům, ne projekt na pět let. Zaparkujete na pozemku a žijete — s teplem dřeva a bez stavebního kolečka.",
    cta: "Chci svůj dům",
    href: "/konfigurator",
  },
  {
    id: "airbnb",
    title: "Airbnb & výnos",
    text: "Hosté fotí, rezervují, vracejí se. Mobilní jednotka, kterou přesunete tam, kde dává smysl byznys — ne kde vás drží beton.",
    cta: "Spočítat jednotku",
    href: "/konfigurator",
  },
  {
    id: "kemp",
    title: "Kemp & rekonstrukce",
    text: "Staré chatky ven. Nové tiny houses dovnitř. Obnovíte areál bez demolice celého světa — a hosté to okamžitě poznají.",
    cta: "Poptat výměnu",
    href: "/#kontakt",
  },
];

export const models = [
  {
    id: "zahrada",
    name: "Weekend",
    subtitle: "Pozemek & klid",
    size: "od 15 m²",
    from: 890_000,
    desc: "Kompaktní únik na víkend i delší pobyt. Dostatek tepla, málo kompromisů — ideál pro zahradu nebo okraj lesa.",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3abfb3887?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "celorocni",
    name: "Live",
    subtitle: "Celoroční bydlení",
    size: "od 20 m²",
    from: 1_490_000,
    desc: "Plnohodnotný domov na kolech. Koupelna, kuchyň, izolace na českou zimu. Homologace součástí.",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "glamping",
    name: "Stay",
    subtitle: "Airbnb & glamping",
    size: "od 18 m²",
    from: 1_290_000,
    desc: "Jednotka, která se prodává sama. Design, který hosté sdílejí — a provozovatel přesune podle sezóny.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
  },
];

export const process = [
  {
    n: "01",
    title: "Řeknete záměr",
    text: "Bydlení, výnos, nebo obnova kempu? My ptáme na pozemek, rozpočet a termín — ne na katalogové sny.",
  },
  {
    n: "02",
    title: "Složíte dům",
    text: "V konfigurátoru nastavíte rozměry a výbavu. Vidíte orientační cenu dřív, než padne první hřebík.",
  },
  {
    n: "03",
    title: "Postavíme v dílně",
    text: "Moderní dřevostavba, teplé materiály, česká zima v hlavě. Hotový dům, ne staveniště u vás na louce.",
  },
  {
    n: "04",
    title: "Přijede na kolech",
    text: "Homologace, převoz, zaučení. Zaparkujete — a rovnou bydlíte, hostíte, nebo otvíráte sezónu.",
  },
];

export const wheelPoints = [
  {
    title: "Přemístíte, když potřebujete",
    text: "Změna pozemku, nová lokalita pro Airbnb, sezónní kemp. Dům jede s vámi — ne naopak.",
  },
  {
    title: "Bez stavebního maratonu",
    text: "Homologovaný podvozek = přívěs. Místo let na úřadě řešíte souhlas s pozemkem a chytrou dispozici.",
  },
  {
    title: "Investice, která není přibitá",
    text: "Když lokalita přestane vydělávat, jednotku přesunete. Beton vám tohle nedovolí.",
  },
];

export const businessPoints = [
  {
    title: "Airbnb & short-stay",
    text: "Jedna silná jednotka, nebo flotila. Počítáme s fotogenickým interiérem a provozem, ne jen s půdorysem.",
  },
  {
    title: "Lidé s pozemkem",
    text: "Máte místo, chybí dům. My dodáme hotové bydlení, které nezabije územní plán ani cashflow.",
  },
  {
    title: "Rekonstrukce kempů",
    text: "Výměna zastaralých chatek za moderní tiny houses. Areál omládne, kapacita zůstane — hosté to pocítí hned.",
  },
];

export const realizations = [
  {
    id: "borovice",
    title: "Borovice 24",
    place: "Šumava",
    year: "2025",
    tag: "Live",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "louka",
    title: "Louka 14",
    place: "Jižní Morava",
    year: "2025",
    tag: "Weekend",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "hvezda",
    title: "Hvězda 18",
    place: "Beskydy",
    year: "2024",
    tag: "Stay",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "mlha",
    title: "Mlha 22",
    place: "Vysočina",
    year: "2024",
    tag: "Live",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d36708?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "dub",
    title: "Dub 16",
    place: "Kokořínsko",
    year: "2024",
    tag: "Weekend",
    image:
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "rosa",
    title: "Rosa 20",
    place: "Orlické hory",
    year: "2023",
    tag: "Stay",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80",
  },
];

export const values = [
  {
    title: "Teplé dřevo, čistý střih",
    text: "Materiály, které voní po lese — a dispozice, které sedí dnešku. Žádný rustikální kostým, žádný studený showroom.",
  },
  {
    title: "Kola jsou výhoda, ne detail",
    text: "Homologace, SPZ, převoz. Svoboda přemístit dům je součástí produktu — ne marketingová poznámka pod čarou.",
  },
  {
    title: "Od jedné jednotky po kemp",
    text: "Stavíme pro majitele pozemku i pro provozovatele. Stejná dílna, jiný byznys plán — vždy s jasnou cenou z konfigurátoru.",
  },
];

export const faq = [
  {
    q: "Opravdu nepotřebuju stavební povolení?",
    a: "Tiny house na homologovaném podvozku je legislativně přívěs. Klasické stavební povolení obvykle neřešíte — potřebujete souhlas k umístění na pozemku a respekt k místním pravidlům. Projdeme to s vámi konkrétně.",
  },
  {
    q: "Proč jsou kola tak důležitá?",
    a: "Protože život i byznys se hýbou. Změna pozemku, nová Airbnb lokalita, sezónní kemp — dům přesunete místo abyste stavěli znovu.",
  },
  {
    q: "Dává to smysl jako investice?",
    a: "Ano, pokud počítáte výnos, obsazenost a provoz — ne jen „hezký domek“. Pomůžeme nastavit jednotku pro short-stay i výměnu chatek v kempu.",
  },
  {
    q: "Jak rychle můžu začít?",
    a: "Nejdřív konfigurátor (minuty), pak krátká konzultace. Výroba obvykle řádově měsíce podle rozsahu — termín potvrdíme po odsouhlasení specifikace.",
  },
];

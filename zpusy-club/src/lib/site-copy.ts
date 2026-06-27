/** Texty a tón značky — podle zpusyclub.cz */

export const BRAND = {
  name: "ZpusyClub",
  namePlus: "Zpussy+",
  tagline: "S námi v tom nejste samy.",
  signoff: "Sharing is caring, kněžničky!",
} as const;

export const HERO = {
  pill: "Nový díl každý týden",
  headline: ["Místo,", "kde můžeš", "být opravdová."],
  sub:
    "ZpusyClub — mámy, kamarádky, holky. Bez servítek, bez pózy: smích, bolístky, občas průšvih — a péče, která drží.",
  ctaPlay: "Pustit nejnovější",
  ctaClub: "Vstup do klubu",
} as const;

export const MARQUEE = [
  "mámy",
  "♥",
  "kamarádky",
  "✦",
  "holky",
  "♥",
  "sharing is caring",
  "✦",
  "kněžničky",
] as const;

export const ABOUT = {
  label: "/ o klubíku",
  title: ["Bezpečný kruh", "kde můžeš", "být", "opravdová."],
  body: [
    "ZpusyClub je místo, kde sdílíme všechno, co je v životě skutečně důležité — a taky to, co nás někdy pěkně štve.",
    "Smějeme se, zpovídáme chyby, odhalujeme bolístky. Někdy jsme v ráži, někdy v objetí. Nemusíme být dokonalé — stačí být opravdové.",
  ],
  pillars: [
    { k: "Humor", v: "Stupidní vtipy, kterými občas zakrýváme bolístky — a pak je stejně vybalíme." },
    { k: "Péče", v: "Když je těžko, držíme se. Žádná levná rada, žádná póza." },
    { k: "Sdílení", v: "Sdílená zkušenost = poloviční trápení a dvojnásobná radost." },
    { k: "Komunita", v: "Přidej se, směj se s námi, plač s námi — nejsi na svoje emoce sama." },
  ],
} as const;

export const HOSTS = {
  label: "/ kdo jsme",
  title: ["Mámy,", "kamarádky,", "holky."],
  ivana: {
    name: "Ivana",
    surname: "Heroutová",
    bio:
      "Jsem Ivana. Moje terapeutka mi říká, že jsem „smutnej klaun“. Miluju humor a miluju se svěřovat lidem, kteří to mají podobně. Moje děti mě učí každej den, že se na mateřství nejde připravit. ZpusyClub je místo, kde se cejtim bezpečně.",
    signoff: "Love You, bitches! Teda Love You, kněžny.",
  },
  katerina: {
    name: "Kateřina",
    surname: "Kundosaki",
    bio:
      "Moje role tady má několik úrovní — stupidní humor, kterým občas zakrývám bolístky, a zároveň deník, očistu duše. Nic neosvobozuje víc než upřímnost sám k sobě. A všechno se strasně dobře řeší, když na to člověk není sám.",
    signoff: "Sharing is caring kněžničky",
  },
} as const;

export const FAQ = [
  {
    q: "Kde nás můžeš sledovat?",
    a: "Na YouTube a HeroHero, brzy i na podcastových platformách. A taky na Instáči a Facebooku.",
  },
  {
    q: "Jak často vychází podcasty?",
    a: "Můžeš se na nás těšit každý týden. A když se objeví něco zajímavého, tak možná i častěji.",
  },
  {
    q: "Proč jsme vůbec začaly podcast?",
    a: "Protože jsme měly pocit, že svět nepotřebuje další perfektní mamky z Instagramu. Potřebuje opravdovost, smích, občas pláč a hlavně pocit, že v tom nejsme samy.",
  },
  {
    q: "O čem vlastně ZpusyClub je?",
    a: "O životě, tak jak je. O chybách, který bolí, ale posouvají. O radostech, který se zdají malý, ale dělají den velkým.",
  },
  {
    q: "Jak se můžeš zapojit?",
    a: "Poslouchej, sdílej svoje příběhy, směj se s námi nebo napiš, co tě trápí. V ZpusyClubu je místo pro každou duši, která nechce být na svoje emoce sama.",
  },
] as const;

export const CONTACT = {
  label: "/ napiš nám",
  title: ["Máš tip,", "otázku", "nebo chceš", "spolupracovat?"],
  body: "Máš tip na zajímavé téma, chceš navázat spolupráci nebo se jen na něco zeptat? Napiš nám — rády si přečteme.",
  email: "info@zpusyclub.cz",
  company: "Crumlin s.r.o.",
} as const;

export const CTA_PLUS = {
  label: "/ klub",
  title: ["Chceš víc", "než YouTube?"],
  body:
    "Delší verze epizod, bonusy, zápisky, hlasovky a komunita jen pro členky. Naše digitální svatyně — Zpussy+.",
  button: "Otevřít Zpussy+",
} as const;

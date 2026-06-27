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
    "ZpusyClub — podcast dvou maminek, které si neberou servítky. Smějeme se chybám, přiznáváme bolístky a hledáme sílu v tom, že v tom nejsme samy.",
  ctaPlay: "Pustit nejnovější",
  ctaClub: "Vstup do klubu",
} as const;

export const MARQUEE = [
  "sharing is caring",
  "♥",
  "kněžničky",
  "✦",
  "v tom nejste samy",
  "♥",
  "bez dokonalosti",
  "✦",
  "naše digitální svatyně",
] as const;

export const ABOUT = {
  label: "/ o klubíku",
  title: ["Bezpečný kruh", "pro maminky,", "které chtějí", "být sebou."],
  body: [
    "ZpusyClub je místo, kde dvě maminky sdílí všechno, co je v životě skutečně důležité — a taky to, co nás někdy pěkně štve.",
    "Smějeme se, zpovídáme svoje chyby, odhalujeme bolístky a vyplavujeme emoce, které by jinak zůstaly skryté. Nemusíme být dokonalé. Můžeme být opravdové.",
  ],
  pillars: [
    { k: "Opravdovost", v: "Svět nepotřebuje další perfektní mamky z Instagramu." },
    { k: "Smích i pláč", v: "Záchvaty smíchu i husí kůže u smutnýho songu — obojí patří sem." },
    { k: "Sdílení", v: "Sdílená zkušenost = poloviční trápení a dvojnásobná radost." },
    { k: "Komunita", v: "Přidej se, směj se s námi, plač s námi — nejsi na svoje emoce sama." },
  ],
} as const;

export const HOSTS = {
  label: "/ kdo jsme",
  title: ["Dvě maminky,", "jeden", "ZpusyClub."],
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

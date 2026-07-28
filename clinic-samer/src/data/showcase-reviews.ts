export type ShowcaseReview = {
  name: string;
  text: string;
  date: string;
  source: "znamylekar";
};

/** Ukázkové recenze ze Známy lékař — https://www.znamylekar.cz/profil/samer-asad */
export const showcaseReviews: ShowcaseReview[] = [
  {
    name: "Maryam Romero",
    text: "Pan doktor je super. Vysvětlí vše. A je moc positivní.",
    date: "22. 7. 2026",
    source: "znamylekar",
  },
  {
    name: "Monika",
    text: "Pan doktor je úžasný, ochotný a vstřícný. Nejlepší gynekolog v Praze.",
    date: "15. 7. 2026",
    source: "znamylekar",
  },
  {
    name: "Blanka Frohlichová",
    text: "Super ordinace a přístup! Všem vřele doporučuji..!",
    date: "14. 7. 2026",
    source: "znamylekar",
  },
  {
    name: "Jana",
    text: "Pan doktor je velice milý a nic nezanedbá. Příjemné nestresující prostředí.",
    date: "13. 7. 2026",
    source: "znamylekar",
  },
  {
    name: "Nikol",
    text: "Pan doktor i sestřička jsou naprosto úžasní! Nikdy jsem se s podobným přístupem nesetkala. Jsem nadšená!",
    date: "8. 7. 2026",
    source: "znamylekar",
  },
  {
    name: "Lidiia",
    text: "Byla jsem tam poprvé. MUDr. Samer Asad je určitě odborník, věřím mu. Sestřička Natálka je příjemná a krev vezme na analýzu, že si to i nevšimnete.",
    date: "2. 7. 2026",
    source: "znamylekar",
  },
];

export const ZNAMYLEKAR_URL =
  "https://www.znamylekar.cz/profil/samer-asad#profile-reviews";

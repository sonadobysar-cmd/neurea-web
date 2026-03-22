/**
 * Obsah stránky /technologie — zdroj pravdy pro karty technologií.
 */
export type TechnologieEntry = {
  name: string;
  /** Hlavní popis */
  description: string;
  studies?: string;
  institutions?: string;
  /** Klinické výsledky / čísla */
  successRate?: string;
  /** FDA / regulace */
  approval?: string;
  /** Krátký seznam indikací, oddělené · */
  helpsWith: string;
};

export const technologieItems: TechnologieEntry[] = [
  {
    name: "HRV Diagnostika",
    description:
      "Měří variabilitu srdečního rytmu – objektivní biomarker stavu nervové soustavy. Snímač na uchu zobrazí v reálném čase koherenci srdce, mozku a nervové soustavy.",
    studies: "300+ nezávislých publikací",
    institutions: "HeartMath Institute, armáda USA, nemocnice po celém světě",
    helpsWith: "Vyhoření · Stres · Úzkosti · Spánek · Diagnostika výchozího stavu",
  },
  {
    name: "tDCS – Transkraniální stimulace",
    description:
      "Velmi slabý elektrický proud přes elektrody na hlavě cíleně moduluje aktivitu neuronů v konkrétní oblasti mozku. Neinvazivní, bez vedlejších účinků.",
    studies: "23 randomizovaných klinických studií (RCT)",
    institutions: "Harvard Medical School, Columbia University, Nature Medicine",
    successRate:
      "94,6 % klinicky významné zlepšení u deprese (462 pacientů), 54,9 % kompletní remise",
    approval: "FDA cleared",
    helpsWith: "Deprese · ADHD · Chronická bolest · Kognitivní výkon · Vyhoření",
  },
  {
    name: "CES – Kranální elektrostimulace",
    description:
      "Mikrocurrent přes ušní klipy moduluje mozkové vlny – zvyšuje alfa aktivitu (klid) a snižuje nadměrnou beta aktivitu (úzkost, nespavost).",
    studies: "Meta-analýza 8 RCT, 337 pacientů",
    institutions: "Harvard School of Public Health, US Department of Veterans Affairs",
    successRate:
      "48 % remise insomnie po 21 dnech · Effect size -0,96 pro úzkosti · -1,02 pro insomnii",
    approval: "FDA cleared pro úzkosti, insomnii a chronickou bolest",
    helpsWith: "Úzkosti · Nespavost · Chronická bolest · Stres · Vyhoření",
  },
  {
    name: "Fotobiomodulace mozku (PBM)",
    description:
      "Nízkoenergetické červené a infračervené světlo proniká tkání do mozku a stimuluje mitochondrie k produkci buněčné energie. Headset na hlavě + nosní aplikátor. Dva protokoly: alfa 10 Hz (relaxace, spánek) a gamma 40 Hz (soustředění, kognice).",
    studies: "35+ publikovaných klinických studií",
    institutions: "Harvard Medical School · Boston University · UCSF · Mount Sinai Hospital",
    successRate:
      "82,9 % studií potvrdilo zlepšení kognitivních funkcí · Prokázáno u dětí s ADHD a autismem",
    helpsWith: "Deprese · Únava · Spánek · ADHD · Autismus (podpora) · Kognitivní výkon",
  },
  {
    name: "Myofasciální terapie",
    description:
      "Ruční uvolňování fascií – pojivové tkáně která při chronickém stresu svírá nervové dráhy. Fyzická dekomprese vagového nervu přímo aktivuje parasympatický systém a přepíná tělo do regenerace.",
    studies: "Klinicky ověřeno v oblasti chronické bolesti a regulace ANS",
    helpsWith: "Chronická bolest · Tenzní bolesti · Vyhoření · Úzkosti · Stres uložený v těle",
  },
];

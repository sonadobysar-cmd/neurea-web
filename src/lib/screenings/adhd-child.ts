import type { ScreeningDefinition } from "./types";

/**
 * Zjednodušený rodičovský checklist (inspirovaný běžnými ADHD screenery).
 * Není oficiálním diagnostickým nástrojem — pouze orientace.
 */
const options = [
  { value: 0, label: "Nikdy" },
  { value: 1, label: "Zřídka" },
  { value: 2, label: "Někdy" },
  { value: 3, label: "Často" },
  { value: 4, label: "Velmi často" },
];

export const adhdChildParent: ScreeningDefinition = {
  slug: "adhd-deti",
  title: "ADHD — děti",
  subtitle: "Rodičovský orientační screening",
  scaleNote:
    "Vyplňuje rodič nebo zákonný zástupce. Otázky vycházejí z běžně sledovaných příznaků nepozornosti a hyperaktivity — nejsou náhradou klinického vyšetření.",
  questions: [
    { id: "c1", text: "Dítě má potíže soustředit se na úkoly nebo hry." },
    { id: "c2", text: "Dítě se často lehce rozptyluje podněty z okolí." },
    { id: "c3", text: "Dítě často zapomíná na každodenní věci nebo ztrácí věci." },
    { id: "c4", text: "Dítě se často hýbe v situacích, kdy se očekává klid (např. ve škole)." },
    { id: "c5", text: "Dítě často mluví nadměrně nebo vyrušuje." },
    { id: "c6", text: "Dítě má potíže vyčkat na řadu ve hrách nebo ve skupině." },
    { id: "c7", text: "Dítě často jedná, jako by bylo „nastartované“ nebo najížděné na vysoké obrátky." },
    { id: "c8", text: "Dítě často nedodělá domácí úkoly nebo domácí práce (ne z vzdoru)." },
    { id: "c9", text: "Dítě má kvůli chování nebo výkonu potíže ve škole nebo v kolektivu." },
    { id: "c10", text: "Příznaky výrazně ovlivňují každodenní fungování dítěte (škola, rodina)." },
  ],
  options,
  interpret: (answers) => {
    const raw = answers.reduce((a, b) => a + b, 0);
    const max = answers.length * 4;
    const pct = Math.round((raw / max) * 100);
    const highs = answers.filter((v) => v >= 3).length;
    let label = "";
    let detail = "";
    if (pct < 35) {
      label = "Nízké skóre (orientačně)";
      detail = "Méně výrazné odpovědi v tomto checklistu. Přetrvávající obtíže přesto stojí za konzultaci.";
    } else if (pct < 55) {
      label = "Střední skóre (orientačně)";
      detail = "Část příznaků je výraznějších — vhodná konzultace s odborníkem (pediatr, psycholog, psychiatr).";
    } else {
      label = "Vyšší skóre (orientačně)";
      detail = `Více výrazných odpovědí (${highs}/10 velmi často/často). Doporučujeme odborné vyšetření — ADHD a související obtíže mají mnoho příčin.`;
    }
    return { raw, label, detail: `${detail} Součet: ${raw}/${max} bodů.` };
  },
};

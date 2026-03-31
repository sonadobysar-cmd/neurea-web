import type { ScreeningDefinition } from "./types";

/** ASRS v1.1 — část A (6 otázek), orientační screening dospělých */
const options = [
  { value: 0, label: "Nikdy" },
  { value: 1, label: "Zřídka" },
  { value: 2, label: "Někdy" },
  { value: 3, label: "Často" },
  { value: 4, label: "Velmi často" },
];

export const asrsPartA: ScreeningDefinition = {
  slug: "adhd",
  title: "ADHD — dospělí",
  subtitle: "Orientační screening — ASRS (část A)",
  scaleNote:
    "Adult ADHD Self-Report Scale (ASRS v1.1), část A — orientační screening. Nenahrazuje klinické vyšetření.",
  questions: [
    {
      id: "a1",
      text: "Jak často máte potíže dokončit poslední detaily projektu, jakmile jsou již hotové náročnější části?",
    },
    {
      id: "a2",
      text: "Jak často máte potíže seřadit věci, když musíte udělat úkol, který vyžaduje organizaci?",
    },
    {
      id: "a3",
      text: "Jak často máte potíže pamatovat si schůzky nebo povinnosti?",
    },
    {
      id: "a4",
      text: "Když máte úkol, který vyžaduje hodně myšlení, jak často odkládáte začátek nebo se mu vyhýbáte?",
    },
    {
      id: "a5",
      text: "Jak často se při dlouhém sezení hýbete rukama nebo nohama nebo cítíte vnitřní neklid?",
    },
    {
      id: "a6",
      text: "Jak často pociťujete přemíru aktivity nebo nutnost dělat věci, jako by vás „hnal motor“?",
    },
  ],
  options,
  interpret: (answers) => {
    const raw = answers.reduce((a, b) => a + b, 0);
    /** Zjednodušené pravidlo: „často problém“ = odpověď 2+ (někdy a výš) u ≥ 4 otázek — orientační */
    const positives = answers.filter((v) => v >= 2).length;
    const screenPositive = positives >= 4;
    const label = screenPositive
      ? "Výsledky naznačují možné příznaky ADHD (orientačně)"
      : "Skóre neodpovídá typickému pozitivnímu screeningu (orientačně)";
    const detail = screenPositive
      ? `Počet „výraznějších“ odpovědí: ${positives}/6. Doporučujeme klinické vyšetření — ADHD má mnoho příčin i spřízněných obtíží.`
      : `Počet „výraznějších“ odpovědí: ${positives}/6. Přesto můžete mít obtíže s pozorností z jiných důvodů — při přetrvávajících potížích zvažte konzultaci. Součet bodů: ${raw}/24.`;
    return { raw, label, detail };
  },
};

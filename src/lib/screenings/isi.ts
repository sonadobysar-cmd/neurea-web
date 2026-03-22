import type { ScreeningDefinition } from "./types";

const options = [
  { value: 0, label: "Žádný" },
  { value: 1, label: "Mírný" },
  { value: 2, label: "Střední" },
  { value: 3, label: "Závažný" },
  { value: 4, label: "Velmi závažný" },
];

export const isi: ScreeningDefinition = {
  slug: "insomnie",
  title: "Insomnie",
  subtitle: "Orientační screening — ISI",
  scaleNote:
    "Insomnia Severity Index (ISI) — zjednodušená česká adaptace pro orientační účely. Hodnotí obtíže se spánkem za poslední 2 týdny.",
  questions: [
    { id: "i1", text: "Jak obtížné je pro vás usnout večer?" },
    { id: "i2", text: "Jak obtížné je pro vás zůstat spát v noci?" },
    { id: "i3", text: "Jak často se probouzíte příliš brzy ráno?" },
    {
      id: "i4",
      text: "Jak velká je vaše nespokojenost s průběhem a kvalitou spánku celkově?",
    },
    { id: "i5", text: "Jak moc obtíže se spánkem ovlivňují váš každodenní život?" },
    { id: "i6", text: "Jak moc si ostatní všimli, že máte se spánkem problém?" },
    { id: "i7", text: "Jak moc vás trápí váš současný spánek?" },
  ],
  options,
  interpret: (answers) => {
    const raw = answers.reduce((a, b) => a + b, 0);
    let label = "";
    let detail = "";
    if (raw <= 7) {
      label = "Bez klinické insomnie";
      detail = "Skóre obvykle neodpovídá významné poruše spánku — přesto můžete řešit spánek preventivně.";
    } else if (raw <= 14) {
      label = "Subpráhová / mírná insomnie";
      detail = "Lehké až střední obtíže — vhodné spánkové hygieně a případně konzultaci.";
    } else if (raw <= 21) {
      label = "Středně závažná insomnie";
      detail = "Výrazné obtíže — doporučujeme odborné posouzení (lékař spánkové medicíny, psycholog).";
    } else {
      label = "Závažná insomnie";
      detail = "Velmi vysoké skóre — vyhledejte odbornou pomoc.";
    }
    return { raw, label, detail };
  },
};

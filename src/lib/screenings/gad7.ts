import type { ScreeningDefinition } from "./types";

const options = [
  { value: 0, label: "Vůbec ne" },
  { value: 1, label: "Několik dní" },
  { value: 2, label: "Více než polovinu dnů" },
  { value: 3, label: "Téměř každý den" },
];

export const gad7: ScreeningDefinition = {
  slug: "uzkost",
  title: "Úzkost",
  subtitle: "Orientační screening — GAD-7",
  scaleNote:
    "Generalized Anxiety Disorder 7-item (GAD-7). Orientační sebehodnocení za poslední 2 týdny — není diagnózou.",
  questions: [
    { id: "g1", text: "Cítíte nervozitu, úzkost nebo napětí." },
    { id: "g2", text: "Nedaří se vám přestat se o něčem starat nebo ovládnout starosti." },
    { id: "g3", text: "Příliš se staráte o různé věci." },
    { id: "g4", text: "Těžko relaxujete." },
    { id: "g5", text: "Jste tak neklidní, že je těžké v klidu sedět." },
    { id: "g6", text: "Snadno se rozčilíte nebo podráždíte." },
    { id: "g7", text: "Máte pocit, jako by se něco hrozilo — jako by se mohlo stát něco špatného." },
  ],
  options,
  interpret: (answers) => {
    const raw = answers.reduce((a, b) => a + b, 0);
    let label = "";
    let detail = "";
    if (raw <= 4) {
      label = "Minimální úzkost";
      detail = "Skóre v rozmezí běžné variability.";
    } else if (raw <= 9) {
      label = "Lehká úzkost";
      detail = "Mírné příznaky — sledujte trend; při přetrvávání zvažte konzultaci.";
    } else if (raw <= 14) {
      label = "Střední úzkost";
      detail = "Středně závažné příznaky — doporučujeme odborné vyšetření.";
    } else {
      label = "Závažná úzkost";
      detail = "Výrazné příznaky — vyhledejte odbornou pomoc (psycholog, psychiatr, praktický lékař).";
    }
    return { raw, label, detail };
  },
};

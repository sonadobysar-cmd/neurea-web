import type { ScreeningDefinition } from "./types";

const options = [
  { value: 0, label: "Vůbec ne" },
  { value: 1, label: "Několik dní" },
  { value: 2, label: "Více než polovinu dnů" },
  { value: 3, label: "Téměř každý den" },
];

export const phq9: ScreeningDefinition = {
  slug: "deprese",
  title: "Deprese",
  subtitle: "Orientační screening — PHQ-9",
  scaleNote:
    "Patient Health Questionnaire-9 (PHQ-9). Orientační sebehodnocení za poslední 2 týdny — není diagnózou.",
  questions: [
    { id: "q1", text: "Malý zájem nebo potěšení z aktivit, které vám obvykle přinášejí radost." },
    { id: "q2", text: "Depresivní nálada, sklíčenost, beznaděj nebo pocit, že nic nedává smysl." },
    { id: "q3", text: "Problémy se spánkem (usínáním, probouzením) nebo naopak nadměrná spavost." },
    { id: "q4", text: "Únava nebo nedostatek energie." },
    { id: "q5", text: "Špatná chuť k jídlu nebo přejídání." },
    {
      id: "q6",
      text: "Špatné vnímání sebe sama — pocit selhání nebo zklamání vůči sobě nebo rodině.",
    },
    { id: "q7", text: "Problémy se soustředěním (např. při čtení nebo práci)." },
    { id: "q8", text: "Pohyb nebo řeč zpomalená, nebo naopak vnitřní neklid — víc než obvykle." },
    {
      id: "q9",
      text: "Myšlenky, že by bylo lepší umřít, nebo si ublížit — nějakým způsobem.",
    },
  ],
  options,
  interpret: (answers) => {
    const raw = answers.reduce((a, b) => a + b, 0);
    let label = "";
    let detail = "";
    if (raw <= 4) {
      label = "Minimální obtíže";
      detail = "Skóre v rozmezí běžné variability. Přesto může být vhodné sledovat stav nebo probrat obtíže s odborníkem.";
    } else if (raw <= 9) {
      label = "Lehké obtíže";
      detail = "Mírné příznaky — může pomoci konzultace nebo sledování trendu v čase.";
    } else if (raw <= 14) {
      label = "Střední obtíže";
      detail = "Středně závažné příznaky — doporučujeme odbornou konzultaci (praktický lékař, psycholog, psychiatr).";
    } else if (raw <= 19) {
      label = "Závažnější obtíže";
      detail = "Výraznější příznaky — vyhledejte odbornou pomoc. Při myšlenkách na sebepoškození volejte 122 nebo 155.";
    } else {
      label = "Velmi závažné obtíže";
      detail = "Vysoké skóre — vyhledejte neprodleně odbornou pomoc. V akutní krizi kontaktujte linku důvěry nebo záchrannou službu.";
    }
    return { raw, label, detail };
  },
};

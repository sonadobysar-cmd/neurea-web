import Link from "next/link";
import { BadgeCheck } from "lucide-react";

const CHECKS = [
  {
    t: "Ověření totožnosti",
    d: "Kontrola dokladu totožnosti před zveřejněním profilu.",
  },
  {
    t: "Kontrola IČO",
    d: "Pečující podniká pod vlastním IČO. MamaSOS je zprostředkovatel, ne zaměstnavatel.",
  },
  {
    t: "Výpis z rejstříku trestů",
    d: "Vyžadujeme aktuální výpis před schválením profilu.",
  },
  {
    t: "Osobní nebo video pohovor",
    d: "Krátký pohovor ověří motivaci, zkušenosti a srozumění s pravidly platformy.",
  },
  {
    t: "Kontrola kvalifikace u odborných služeb",
    d: "U duly a laktační poradkyně kontrolujeme kurz / kvalifikaci. Na profilu je typ vzdělání.",
  },
  {
    t: "Reference",
    d: "Kde je to možné, ověřujeme zkušenosti a předchozí spolupráci.",
  },
  {
    t: "Aktivní pojištění",
    d: "Pečující musí mít platné pojištění odpovědnosti (skupinové nebo vlastní).",
  },
  {
    t: "Pravidelné potvrzování údajů",
    d: "Doklady a dostupnost kalendáře se periodicky obnovují. Neaktuální profil se nezobrazuje.",
  },
  {
    t: "Hodnocení jen z uskutečněných návštěv",
    d: "Recenze lze napsat pouze k dokončené a zaplacené rezervaci.",
  },
];

export default function SafetyPage() {
  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="max-w-2xl">
        <p className="eyebrow">
          <BadgeCheck className="h-3.5 w-3.5" />
          Bezpečnost a ověřování
        </p>
        <h1 className="display mt-2 text-4xl md:text-6xl">Co znamená Ověřená MamaSOS</h1>
        <p className="mt-4 text-ink-soft md:text-lg">
          Badge „Ověřená MamaSOS“ znamená, že pečující prošla povinným procesem
          ověření. Neznamená absolutní bezrizikovost — MamaSOS pečlivě prověřuje,
          ale službu poskytuje samostatná podnikatelka.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {CHECKS.map((item, i) => (
          <article key={item.t} className="panel-solid p-5">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-moss">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 text-lg font-bold">{item.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.d}</p>
          </article>
        ))}
      </div>

      <div className="panel-solid mt-10 p-6 md:p-8">
        <h2 className="display text-2xl">Důležité hranice</h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-soft">
          <li>• MamaSOS nezajišťuje zdravotní péči ani diagnózu.</li>
          <li>• Dula ≠ porodní asistentka. Laktační podpora má jasný badge kvalifikace.</li>
          <li>• Smlouva o službě vzniká mezi klientkou a pečující; MamaSOS zprostředkuje rezervaci a platbu.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/hledat" className="btn btn-rose">
            Najít ověřenou pečující
          </Link>
          <Link href="/storno" className="btn btn-ghost">
            Storno a náhrada
          </Link>
        </div>
      </div>
    </div>
  );
}

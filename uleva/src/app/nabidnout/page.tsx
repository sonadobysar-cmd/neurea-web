import Link from "next/link";
import { Check } from "lucide-react";
import { CaregiverRegistrationForm } from "@/components/CaregiverRegistrationForm";
import { SERVICE_PRICING, formatCzk } from "@/data/pricing";

const HIGHLIGHTS = [
  "Registrace zdarma",
  "Vlastní kalendář",
  "Vlastní oblast dojezdu",
  "Platby přes MamaSOS",
  "Žádné shánění klientek",
  "Právní a pojistná ochrana",
];

const WHY = [
  "Sama si určujete, kdy máte čas.",
  "Sama si nastavíte město a maximální vzdálenost dojezdu.",
  "Nemusíte platit za profil ani za kontakt na klientku.",
  "Nemusíte odpovídat na desítky zpráv.",
  "Klientka rezervuje konkrétní volný termín.",
  "Platba probíhá předem přes platformu.",
  "Před přijetím objednávky znáte místo, rozsah služby a svou odměnu.",
  "MamaSOS řeší systém rezervací, platby, pravidla a podporu.",
];

const STEPS = [
  "Vyplníte základní údaje.",
  "Zvolíte služby a oblast dojezdu.",
  "Nastavíte dostupnost v kalendáři.",
  "Nahrajete požadované doklady.",
  "Absolvujete ověření a krátký pohovor.",
];

const FAQ = [
  ["Musím mít IČO?", "Ano. Pečující podniká samostatně. MamaSOS je zprostředkovatel."],
  ["Platím za registraci nebo profil?", "Ne. Registrace i vedení profilu jsou zdarma."],
  ["Musím přijmout každou objednávku?", "Ne. Přijímáte jen termíny, které máte volné v kalendáři."],
  ["Jak si nastavuji dostupnost?", "V týdenní šabloně kalendáře. Bez aktivního kalendáře nejste ve výsledcích."],
  ["Jak daleko musím dojíždět?", "Maximální dojezd si nastavíte sama."],
  ["Kdy dostanu zaplaceno?", "Po dokončení návštěvy podle výplatního cyklu platformy."],
  ["Co když klientka objednávku zruší?", "Platí storno podmínky — detail na stránce Storno."],
  ["Co když se v mém městě zatím neobjednává?", "Profil zůstane připravený zdarma. Upozorníme vás na poptávku."],
  ["Jaké doklady musím dodat?", "Totožnost, IČO, výpis z RT, pojištění; u duly/LP kvalifikace."],
  ["Jak funguje pojištění?", "Vyžadujeme aktivní pojištění odpovědnosti (vlastní nebo skupinové)."],
  ["Mohu poskytovat více druhů služeb?", "Ano — pokud projdete ověřením pro dané segmenty."],
  ["Jak mohu profil pozastavit?", "V účtu pečující jedním kliknutím — přestanete se zobrazovat ve výsledcích."],
];

export default function OfferLandingPage() {
  return (
    <div>
      <section className="shell pb-12 pt-28 md:pb-16 md:pt-32">
        <div className="max-w-3xl">
          <p className="eyebrow">Nábor pečujících · celá ČR</p>
          <h1 className="display mt-2 text-4xl md:text-6xl">
            Pomáhejte maminkám ve svém okolí
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            Přidejte se do celorepublikové sítě ověřených pečujících MamaSOS.
            Termíny a oblast působnosti si určujete sama. Registrace ani vedení
            profilu vás nic nestojí.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#registrace" className="btn btn-rose">
              Chci se přidat
            </a>
            <Link href="/jak-spoluprace" className="btn btn-ghost">
              Jak spolupráce funguje
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {HIGHLIGHTS.map((h) => (
              <span
                key={h}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-[var(--line)]"
              >
                <Check className="h-3.5 w-3.5 text-moss" />
                {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-snow py-16 md:py-20">
        <div className="shell">
          <h2 className="display text-3xl md:text-4xl">Proč se přidat</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {WHY.map((t) => (
              <p key={t} className="flex gap-3 text-sm text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
                {t}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <h2 className="display text-3xl md:text-4xl">Koho hledáme</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="panel-solid p-6">
            <h3 className="display text-2xl">Úleva doma</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Pro zkušené a spolehlivé ženy, které zvládnou podle objednávky
              kombinaci běžné pomoci: jednoduché vaření, běžný úklid, pomoc s
              prádlem, přítomnost u miminka, hlídání sourozence, drobné pochůzky.
            </p>
          </article>
          <article className="panel-solid p-6">
            <h3 className="display text-2xl">Poporodní duly</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Požadujeme odpovídající kurz, praxi nebo uznávanou kvalifikaci. Jde
              o nezdravotní podporu — ne o zdravotní péči ani porodní asistenci.
            </p>
          </article>
          <article className="panel-solid p-6">
            <h3 className="display text-2xl">Laktační poradkyně</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Vyžadujeme doložení konkrétní kvalifikace. Na profilu zobrazíme typ
              vzdělání / kvalifikační úroveň (např. PA vs laická podpora).
            </p>
          </article>
        </div>
      </section>

      <section className="bg-ink py-16 text-white md:py-20">
        <div className="shell">
          <h2 className="display text-3xl md:text-4xl">Kolik si vydělám</h2>
          <p className="mt-3 max-w-2xl text-sm text-white/75">
            Níže je <strong className="text-white">výplata pečující za hodinu</strong> —
            částka po zprostředkování. Klientka na webu vidí vyšší cenu služby.
            Fakturu za službu vystavuje pečující klientce / MamaSOS zúčtuje dle
            smlouvy o zprostředkování.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {(Object.keys(SERVICE_PRICING) as Array<keyof typeof SERVICE_PRICING>).map(
              (k) => {
                const s = SERVICE_PRICING[k];
                return (
                  <div key={k} className="rounded-2xl border border-white/12 bg-white/8 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">
                      {s.shortLabel}
                    </p>
                    <p className="display mt-2 text-4xl">
                      {formatCzk(s.payoutPerHour)}
                    </p>
                    <p className="text-sm text-white/70">/ hodina výplata pečující</p>
                    <p className="mt-2 text-xs text-white/55">
                      Klientka platí {formatCzk(s.pricePerHour)}/h · min. {s.minHours} h
                    </p>
                  </div>
                );
              }
            )}
          </div>
          <ul className="mt-8 space-y-2 text-sm text-white/75">
            <li>• Výplata po dokončení návštěvy (cyklus dle smlouvy).</li>
            <li>• Doprava: TODO — sjednotit pravidlo cestovného před spuštěním.</li>
            <li>• Storno klientkou: dle storno podmínek platformy.</li>
            <li>• Večerní / víkendové / urgentní příplatky: TODO — zatím bez příplatků.</li>
          </ul>
          <p className="mt-4 rounded-2xl border border-dashed border-white/25 px-4 py-3 text-xs text-white/70">
            TODO: Doplnit závazné znění fakturace, výplatního cyklu, dopravy a
            příplatků před produkcí.
          </p>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <h2 className="display text-3xl md:text-4xl">Jak registrace probíhá</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {STEPS.map((s, i) => (
            <div key={s} className="border-t border-ink/10 pt-4">
              <p className="display text-3xl text-rose">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 text-sm font-semibold">{s}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm text-ink-soft">
          Profil zveřejníme až po dokončení ověření. Bez aktivního a pravidelně
          potvrzovaného kalendáře se profil nezobrazuje ve výsledcích.
        </p>
      </section>

      <section className="bg-snow py-16 md:py-20">
        <div className="shell max-w-3xl">
          <h2 className="display text-3xl md:text-4xl">
            Nabíráme pečující ve všech městech České republiky
          </h2>
          <p className="mt-4 text-ink-soft">
            Nemusíte být z Prahy ani z velkého města. Síť MamaSOS budujeme po
            celé ČR. Pokud ve vašem okolí zatím není dost objednávek, váš
            ověřený profil zůstane připravený a upozorníme vás, jakmile se
            objeví vhodná poptávka.
          </p>
          <p className="mt-4 font-bold text-ink">
            Registrace ani čekání na první objednávku vás nic nestojí.
          </p>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <h2 className="display text-3xl md:text-4xl">FAQ pro pečující</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {FAQ.map(([q, a]) => (
            <article key={q} className="panel-solid p-5">
              <h3 className="font-bold">{q}</h3>
              <p className="mt-2 text-sm text-ink-soft">{a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell pb-20">
        <CaregiverRegistrationForm />
      </section>
    </div>
  );
}

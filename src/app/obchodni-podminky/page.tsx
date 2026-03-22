import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Obchodní podmínky",
};

export default function ObchodniPodminkyPage() {
  return (
    <PageShell>
      <p className="eyebrow">Právní</p>
      <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
        Obchodní podmínky
      </h1>
      <p className="mt-2 text-sm text-ink/50">Platnost od 1. 6. 2025</p>

      <article className="mt-10 max-w-none space-y-4 text-sm leading-relaxed text-ink/80 md:text-base">
        <h2 className="font-display text-2xl text-ink">1. Základní ustanovení</h2>
        <p>
          Tyto obchodní podmínky upravují vztah mezi poskytovatelem služeb{" "}
          <strong>Nia Dobyšar</strong>, IČO: 00736813, provozující pracoviště NEUREA (dále jen „NEUREA“
          nebo „poskytovatel“) a klientem, který využívá služby NEUREA (dále jen „klient“).
        </p>
        <p>
          NEUREA je poradenské a podpůrné pracoviště zaměřené na neuro-somatickou diagnostiku a
          terapii. NEUREA <strong>neposkytuje zdravotní péči</strong> ve smyslu zákona č. 372/2011 Sb.,
          o zdravotních službách, a není zdravotnickým zařízením.
        </p>
        <p>
          Služby NEUREA jsou určeny osobám starším 18 let. Pro nezletilé klienty je nutný písemný
          souhlas zákonného zástupce.
        </p>
        <p>
          Uzavřením rezervace klient potvrzuje, že se seznámil s těmito obchodními podmínkami a
          souhlasí s jejich zněním.
        </p>

        <h2 className="mt-10 font-display text-2xl text-ink">2. Poskytované služby</h2>
        <ul className="list-disc pl-5">
          <li>
            Vstupní diagnostika — měření variability srdečního rytmu (HRV), analýza koherence
            autonomního nervového systému, anamnéza a návrh individuálního protokolu.
          </li>
          <li>
            Terapeutické protokoly — série sezení kombinující klinicky ověřené technologie dle
            individuálního protokolu klienta.
          </li>
          <li>À la carte sezení — jednotlivá sezení zaměřená na konkrétní technologii dle výběru klienta.</li>
          <li>Dětské protokoly — sezení pro klienty do 18 let se zaměřením na ADHD a poruchy pozornosti.</li>
        </ul>
        <p>
          Služby NEUREA jsou podpůrné povahy a nejsou náhradou lékařské péče, psychoterapie ani
          psychiatrické léčby. Klientům s diagnostikovanými zdravotními stavy doporučujeme souběžnou
          spolupráci s příslušným odborníkem.
        </p>
        <p>
          NEUREA si vyhrazuje právo odmítnout poskytnutí služby klientovi, u kterého by mohlo dojít k
          ohrožení jeho zdraví nebo bezpečnosti.
        </p>

        <h2 className="mt-10 font-display text-2xl text-ink">3. Rezervace a objednávka</h2>
        <p>
          Rezervaci lze provést online prostřednictvím rezervačního systému na webu neurea.cz nebo
          telefonicky / e-mailem na kontaktních údajích NEUREA.
        </p>
        <p>
          Rezervace je závazná po uhrazení zálohy ve výši <strong>1 000 Kč</strong> prostřednictvím
          platební brány Stripe.
        </p>
        <p>
          Každý nový klient je povinen absolvovat vstupní diagnostiku před zahájením jakéhokoli
          terapeutického protokolu.
        </p>
        <p>Potvrzení rezervace je zasláno e-mailem na adresu klienta po úspěšném zaplacení zálohy.</p>

        <h2 className="mt-10 font-display text-2xl text-ink">4. Ceny a platební podmínky</h2>
        <p>Aktuální ceník služeb je zveřejněn na webu neurea.cz.</p>
        <p>
          Záloha ve výši 1 000 Kč je splatná při rezervaci a odečítá se od celkové ceny sezení.
          Doplatek do plné výše ceny sezení je splatný na místě v den návštěvy — hotově nebo kartou.
        </p>
        <p>Služby NEUREA nejsou hrazeny zdravotními pojišťovnami.</p>
        <p>Na vyžádání vystaví NEUREA potvrzení o zaplacení pro účely daňového odpočtu nebo refundace od zaměstnavatele.</p>

        <h2 className="mt-10 font-display text-2xl text-ink">5. Storno podmínky</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-ink/15 text-left">
                <th className="py-2 pr-4 font-medium">Situace</th>
                <th className="py-2 font-medium">Podmínky</th>
              </tr>
            </thead>
            <tbody className="align-top text-ink/85">
              <tr className="border-b border-ink/10">
                <td className="py-3 pr-4">Zrušení více než 48 h před sezením</td>
                <td className="py-3">Záloha bude vrácena nebo přesunuta na jiný termín.</td>
              </tr>
              <tr className="border-b border-ink/10">
                <td className="py-3 pr-4">Zrušení 24–48 h před sezením</td>
                <td className="py-3">Záloha propadá. Jednorázový přesun termínu zdarma.</td>
              </tr>
              <tr className="border-b border-ink/10">
                <td className="py-3 pr-4">Zrušení méně než 24 h před sezením nebo nedostavení se</td>
                <td className="py-3">Záloha propadá. Přesun termínu není možný.</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Vážná událost s doložením (hospitalizace, úmrtí v rodině, závažná nehoda)</td>
                <td className="py-3">Záloha bude vrácena nebo přesunuta. Žádost nutno zaslat do 48 h od zmeškání.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          Žádost o vrácení zálohy z důvodu vážné události musí být zaslána e-mailem na kontaktní
          adresu NEUREA spolu s příslušným dokladem (lékařská zpráva, úmrtní list apod.).
        </p>
        <p>
          NEUREA si vyhrazuje právo zrušit nebo přesunout sezení z provozních důvodů — klient bude
          informován nejpozději 24 h předem a záloha bude vrácena nebo přesunuta dle přání klienta.
        </p>

        <h2 className="mt-10 font-display text-2xl text-ink">6.–8. Práva klienta, odpovědnost, závěr</h2>
        <p>
          Klient poskytuje pravdivé informace; bere na vědomí podpůrnou povahu služeb; zákaz vstupu
          pod vlivem alkoholu či návykových látek; souhlas s anonymním využitím dat pro statistiky,
          pokud neurčí jinak.
        </p>
        <p>
          NEUREA nenese odpovědnost za zdravotní stav klienta ani za výsledky terapie; doporučuje
          konzultaci s ošetřujícím lékařem u závažných stavů.
        </p>
        <p>Spory řešeny přednostně dohodou; jinak soudy ČR; právo české republiky.</p>
      </article>

      <p className="mt-12 text-sm text-ink/50">
        Oficiální finální znění máte v PDF od právníka — tato verze je pro web přepsána z vašich
        podkladů.{" "}
        <Link href="/kontakt" className="text-gold hover:underline">
          Kontakt
        </Link>
      </p>
    </PageShell>
  );
}

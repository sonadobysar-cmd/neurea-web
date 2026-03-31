import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů",
};

export default function GdprPage() {
  return (
    <PageShell>
      <p className="eyebrow">Právní</p>
      <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
        Zásady ochrany osobních údajů
      </h1>
      <p className="mt-2 text-sm text-ink/50">Platnost od 1. 6. 2025</p>
      <p className="mt-6 text-sm text-ink/75">
        NEUREA, provozovatel Nia Dobyšar, IČO: 00736813, zpracovává osobní údaje v souladu s Nařízením
        Evropského parlamentu a Rady (EU) 2016/679 (GDPR) a zákonem č. 110/2019 Sb., o zpracování
        osobních údajů.
      </p>

      <section className="mt-10 space-y-4 text-sm leading-relaxed text-ink/80 md:text-base">
        <h2 className="font-display text-2xl text-ink">1. Správce osobních údajů</h2>
        <p>
          <strong>Nia Dobyšar</strong> · NEUREA · IČO: 00736813 · neurea.cz
          <br />
          Kontakt pro GDPR záležitosti:{" "}
          <a href="mailto:info@neurea.cz" className="text-gold hover:underline">
            info@neurea.cz
          </a>
        </p>

        <h2 className="mt-10 font-display text-2xl text-ink">2. Jaké údaje zpracováváme</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Identifikační a kontaktní údaje: jméno, příjmení, datum narození, e-mail, telefon.</li>
          <li>
            Zdravotní a anamnestické údaje poskytnuté při konzultaci a v průběhu sezení (na základě
            souhlasu dle čl. 9 GDPR).
          </li>
          <li>Diagnostická data: výsledky HRV měření, koherenční záznamy a další objektivní data.</li>
          <li>
            Platební údaje: záznamy o platbách (čísla karet zpracovává výhradně platební brána Stripe).
          </li>
          <li>E-mailová komunikace a zprávy v rezervačním systému.</li>
        </ul>

        <h2 className="mt-10 font-display text-2xl text-ink">3. Účel a právní základ</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Poskytování služeb a klientské záznamy — plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR).</li>
          <li>Rezervace a platby — plnění smlouvy.</li>
          <li>Zdravotní záznamy — souhlas subjektu (čl. 9 odst. 2 písm. a) GDPR).</li>
          <li>Informace o službách — souhlas (newsletter; pokud zapnete).</li>
          <li>Právní povinnosti — právní základ dle zákona.</li>
        </ul>

        <h2 className="mt-10 font-display text-2xl text-ink">4. Doba uchovávání</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Klientské záznamy: po dobu smluvního vztahu a 3 roky po jeho ukončení.</li>
          <li>Účetní a platební doklady: 10 let dle zákona o účetnictví.</li>
          <li>E-mailová komunikace: 3 roky od poslední komunikace.</li>
        </ul>

        <h2 className="mt-10 font-display text-2xl text-ink">5. Příjemci a předání do třetích zemí</h2>
        <p>Osobní údaje neprodáváme ani nesdílíme pro nežádoucí marketing.</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Stripe Inc.</strong> — zpracovatel plateb (USA), certifikace EU–US Data Privacy
            Framework.
          </li>
          <li>Provozovatel online rezervačního systému (doplní se název po nasazení).</li>
          <li>Orgány veřejné moci — pokud to vyžaduje zákon.</li>
        </ul>

        <h2 className="mt-10 font-display text-2xl text-ink">6. Vaše práva</h2>
        <p>
          Přístup, oprava, výmaz, omezení zpracování, přenositelnost, námitka, odvolání souhlasu,
          podání stížnosti u Úřadu pro ochranu osobních údajů (uoou.cz). Žádosti:{" "}
          <a href="mailto:info@neurea.cz" className="text-gold hover:underline">
            info@neurea.cz
          </a>
          .
        </p>

        <h2 className="mt-10 font-display text-2xl text-ink">7. Zabezpečení</h2>
        <p>
          Technická a organizační opatření, přístup jen oprávněným osobám s mlčenlivostí, web šifrován
          SSL/TLS.
        </p>

        <h2 className="mt-10 font-display text-2xl text-ink">8. Cookies a analytika</h2>
        <p>
          Web může používat cookies pro funkčnost a anonymizovanou analytiku (např. Google Analytics).
          Podrobnosti v{" "}
          <Link href="/cookies" className="text-gold hover:underline">
            cookie politice
          </Link>
          .
        </p>

        <h2 className="mt-10 font-display text-2xl text-ink">9. Změny zásad</h2>
        <p>Aktuální verze je vždy na neurea.cz. O podstatných změnách mohou být klienti informováni e-mailem.</p>
      </section>

      <p className="mt-12 text-sm text-ink/50">
        Finální právní review doporučujeme provést s vaším právníkem.{" "}
        <Link href="/kontakt" className="text-gold hover:underline">
          Kontakt
        </Link>
      </p>
    </PageShell>
  );
}

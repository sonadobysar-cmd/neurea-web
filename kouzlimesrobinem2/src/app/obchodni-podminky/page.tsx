import type { Metadata } from "next";
import Link from "next/link";
import "../ochrana-udaju/privacy.css";

export const metadata: Metadata = {
  title: "Obchodní podmínky | Kouzlíme s Robinem",
  description:
    "Obchodní podmínky pro objednání vystoupení Kouzlíme s Robinem — Robin Panuš.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="privacy-page">
      <div className="privacy-wrap">
        <p className="privacy-back">
          <Link href="/#kontakt">← Zpět na web</Link>
        </p>
        <h1>Obchodní podmínky</h1>
        <p className="privacy-lead">
          Tyto obchodní podmínky upravují objednání a poskytnutí kouzelnického
          vystoupení, balónkové tvorby a souvisejících služeb pod značkou
          Kouzlíme s Robinem (Robin Panuš). Jde o klientskou šablonu — konkrétní
          detaily zakázky mohou být upřesněny v potvrzení objednávky.
        </p>

        <section>
          <h2>1. Poskytovatel</h2>
          <p>
            Poskytovatelem služeb je <strong>Robin Panuš</strong> (Kouzlíme s
            Robinem).
          </p>
          <p>
            Kontakt:{" "}
            <a href="mailto:kouzlimesrobinem@email.cz">
              kouzlimesrobinem@email.cz
            </a>
            , telefon <a href="tel:+420775950328">775 950 328</a>.
          </p>
        </section>

        <section>
          <h2>2. Předmět služeb</h2>
          <p>
            Předmětem je živé vystoupení (kouzla, balónková zvířátka, mentalismus
            nebo jejich kombinace) v rozsahu a na místě dohodnutém při rezervaci.
            Orientační délka vystoupení a cena jsou uvedeny na webu; finální
            podoba se potvrzuje písemně (e-mail / zpráva).
          </p>
        </section>

        <section>
          <h2>3. Objednávka a uzavření smlouvy</h2>
          <p>
            Poptávka přes webový formulář není ještě závaznou objednávkou.
            Smlouva vzniká potvrzením termínu a podmínek ze strany poskytovatele
            (typicky e-mailem) a odsouhlasením klientem.
          </p>
          <p>
            Pro závaznou rezervaci může být vyžadována záloha — výše a splatnost
            budou uvedeny v potvrzení.
          </p>
        </section>

        <section>
          <h2>4. Cena a platební podmínky</h2>
          <p>
            Cena vystoupení a dopravy vychází z aktuální nabídky na webu, pokud
            není dohodnuto jinak. Doprava se obvykle účtuje podle skutečně
            ujeté vzdálenosti z Mladé Boleslavi.
          </p>
          <p>
            Doplatek je splatný nejpozději v den vystoupení, není-li dohodnuto
            jinak. Preferovaný způsob platby: převod na účet nebo hotovost dle
            dohody.
          </p>
        </section>

        <section>
          <h2>5. Povinnosti klienta</h2>
          <p>Klient zajistí zejména:</p>
          <ul>
            <li>včasné potvrzení místa, času a kontaktní osoby na místě</li>
            <li>prostor vhodný pro vystoupení (dostatek místa, bezpečný přístup)</li>
            <li>přiměřené podmínky pro děti / publikum dle typu akce</li>
            <li>informaci o případných omezeních (hluk, venkovní akce, počet dětí)</li>
          </ul>
        </section>

        <section>
          <h2>6. Zrušení a změna termínu</h2>
          <p>
            Zrušení nebo přesun termínu klientem je třeba oznámit co nejdříve
            e-mailem nebo telefonicky. Není-li dohodnuto jinak:
          </p>
          <ul>
            <li>
              zrušení více než 14 dní před akcí — záloha může být převedena na
              náhradní termín nebo vrácena dle dohody
            </li>
            <li>
              zrušení 7–14 dní před akcí — záloha se zpravidla nevrací
            </li>
            <li>
              zrušení méně než 7 dní před akcí — může být účtována celá
              dohodnutá cena vystoupení
            </li>
          </ul>
          <p>
            Pokud vystoupení zruší poskytovatel (např. nemoc, vyšší moc), nabídne
            náhradní termín nebo vrátí již uhrazenou zálohu.
          </p>
        </section>

        <section>
          <h2>7. Průběh vystoupení</h2>
          <p>
            Poskytovatel vystoupí v dohodnutém čase a rozsahu. Menší odchylky v
            programu (např. výběr triků podle věku dětí) jsou běžné a slouží
            kvalitě zážitku. Fotografie a nahrávky z akce může klient pořizovat
            pro soukromé účely; komerční použití vyžaduje souhlas.
          </p>
        </section>

        <section>
          <h2>8. Odpovědnost</h2>
          <p>
            Poskytovatel odpovídá za řádné provedení služby. Neodpovídá za škody
            vzniklé okolnostmi mimo jeho kontrolu (výpadek elektřiny, nevhodný
            prostor, chování třetích osob) ani za ztrátu věcí hostů na akci.
          </p>
        </section>

        <section>
          <h2>9. Ochrana osobních údajů</h2>
          <p>
            Zpracování osobních údajů popisuje samostatný dokument{" "}
            <Link href="/ochrana-udaju">Ochrana osobních údajů</Link>.
          </p>
        </section>

        <section>
          <h2>10. Závěrečná ustanovení</h2>
          <p>
            Vztahy se řídí právním řádem České republiky. Odchylná ujednání v
            potvrzení objednávky mají přednost před těmito podmínkami. Tyto
            podmínky mohou být aktualizovány; pro konkrétní zakázku platí verze
            platná v den potvrzení rezervace.
          </p>
        </section>

        <p className="privacy-updated">
          Šablonová verze — aktualizováno: srpen 2026
        </p>
      </div>
    </main>
  );
}

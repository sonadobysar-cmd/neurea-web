import type { Metadata } from "next";
import Link from "next/link";
import "./privacy.css";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů | Kouzlíme s Robinem",
  description:
    "Informace o zpracování osobních údajů při poptávce přes web Kouzlíme s Robinem.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="privacy-wrap">
        <p className="privacy-back">
          <Link href="/#kontakt">← Zpět na web</Link>
        </p>
        <h1>Ochrana osobních údajů</h1>
        <p className="privacy-lead">
          Tyto informace popisují, jak zpracováváme osobní údaje, které nám
          dobrovolně poskytnete přes kontaktní formulář na webu Kouzlíme s
          Robinem.
        </p>

        <section>
          <h2>1. Správce údajů</h2>
          <p>
            Správcem osobních údajů je <strong>Robin Panuš</strong> (Kouzlíme s
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
          <h2>2. Jaké údaje zpracováváme</h2>
          <p>Z kontaktního formuláře můžeme zpracovat:</p>
          <ul>
            <li>jméno</li>
            <li>e-mailovou adresu</li>
            <li>telefonní číslo</li>
            <li>obsah zprávy / poznámky</li>
            <li>technické údaje nezbytné pro ochranu formuláře (např. IP při limitech a anti-spam)</li>
          </ul>
        </section>

        <section>
          <h2>3. Účel a právní důvod</h2>
          <p>
            Údaje zpracováváme za účelem vyřízení vaší poptávky a odpovědi na
            ni. Právním důvodem je váš souhlas (čl. 6 odst. 1 písm. a GDPR) a
            také oprávněný zájem na komunikaci s potenciálním klientem (čl. 6
            odst. 1 písm. f GDPR), pokud je to vhodné.
          </p>
        </section>

        <section>
          <h2>4. Komu údaje předáváme</h2>
          <p>
            Údaje používáme primárně my. Pro provoz webu a odesílání e-mailů
            můžeme využívat zpracovatele (hosting a e-mailová služba), kteří
            údaje zpracovávají pouze podle našich pokynů a pro uvedené účely.
          </p>
        </section>

        <section>
          <h2>5. Doba uložení</h2>
          <p>
            Údaje uchováváme po dobu nezbytnou k vyřízení poptávky a případné
            navazující komunikace, nejdéle však obvykle 12 měsíců od posledního
            kontaktu, pokud není delší uchování nutné z právních důvodů.
          </p>
        </section>

        <section>
          <h2>6. Vaše práva</h2>
          <p>Máte právo:</p>
          <ul>
            <li>požadovat přístup ke svým údajům</li>
            <li>požadovat opravu nebo výmaz</li>
            <li>omezení zpracování</li>
            <li>námitku proti zpracování</li>
            <li>odvolat souhlas (pokud je zpracování na souhlasu založeno)</li>
            <li>podat stížnost u Úřadu pro ochranu osobních údajů</li>
          </ul>
          <p>
            Pro uplatnění práv napište na{" "}
            <a href="mailto:kouzlimesrobinem@email.cz">
              kouzlimesrobinem@email.cz
            </a>
            .
          </p>
        </section>

        <section>
          <h2>7. Cookies a měření</h2>
          <p>
            Web nepoužívá reklamní cookies. Pro návštěvnost můžeme využívat
            privátní měření hostingu (Vercel Analytics) bez reklamních profilů.
            Pro ochranu formuláře může být použito bezpečnostní ověření (např.
            Cloudflare Turnstile).
          </p>
          <p>
            Pokud využijete online rezervaci termínu, údaje o rezervaci
            zpracovává také Google Calendar (Appointment Schedules) nebo jiný
            zvolený rezervační nástroj podle svých podmínek — typicky jméno,
            e-mail a zvolený termín.
          </p>
        </section>

        <p className="privacy-updated">Aktualizováno: červenec 2026</p>
      </div>
    </main>
  );
}

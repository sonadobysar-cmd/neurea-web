import type { Metadata } from "next";
import Link from "next/link";
import { DepositButton } from "@/components/DepositButton";
import { PageShell } from "@/components/PageShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rezervace",
};

export default function RezervacePage() {
  const bookingCta =
    site.bookingUrl?.includes("calendly.com") || site.bookingUrl?.includes("calendly.")
      ? "Otevřít Calendly"
      : "Otevřít kalendář";

  return (
    <PageShell>
      <p className="eyebrow">Rezervace</p>
      <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
        Rezervace
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink/60">
        Rezervace je závazná po uhrazení zálohy {site.depositCzk} Kč prostřednictvím platební brány
        Stripe. Po zaplacení obdržíte potvrzení e-mailem (nastaví se odesílání ve Stripe / backendu).
      </p>

      {site.bookingUrl && (
        <div className="mt-10 glass-panel-strong p-7 md:p-8">
          <h2 className="font-display text-xl font-normal text-ink">Vybrat termín</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/62">
            Otevře se online rezervace — vyberte termín; zálohu {site.depositCzk} Kč můžete
            uhradit tlačítkem níže (dle vašeho postupu).
          </p>
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6"
          >
            <span>{bookingCta}</span>
          </a>
        </div>
      )}

      <div className="mt-10 glass-panel p-7 text-sm leading-relaxed text-ink/72 md:p-8">
        <h2 className="font-display text-lg text-ink">Google Kalendář — jde to?</h2>
        <p className="mt-3">
          <strong>Ano, částečně.</strong> Samotný Google Kalendář umí sdílet dostupnost nebo v Google
          Workspace vytvořit stránku typu „rezervační rozvrh“, ale{" "}
          <strong>nepřipojí automaticky platbu zálohy přes Stripe</strong>. Typické řešení:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>Cal.com / Calendly</strong> napojené na váš Google Kalendář + odděleně platba zálohy
            (jak máte teď na webu), nebo
          </li>
          <li>
            odkaz na <strong>rezervační rozvrh</strong> z Kalendáře + zákazník zaplatí zálohu zvlášť
            tlačítkem níže,
          </li>
          <li>
            nebo vlastní rezervační systém s napojením na Google Calendar API (náročnější vývoj).
          </li>
        </ul>
        <p className="mt-3 text-ink/60">
          Veřejná adresa kalendáře je nastavena v{" "}
          <code className="rounded bg-ink/5 px-1">src/lib/site.ts</code> jako{" "}
          <code className="rounded bg-ink/5 px-1">bookingUrl</code> — při změně Calendly odkazu ji
          tam upravte.
        </p>
      </div>

      <div className="mt-10 glass-panel-strong p-8 md:p-10">
        <h2 className="font-display text-xl font-normal text-ink">Online záloha ({site.depositCzk} Kč)</h2>
        <p className="mt-3 text-sm text-ink/65">
          Tlačítko vytvoří bezpečnou platbu u Stripe (záloha dle obchodních podmínek).
        </p>
        <div className="mt-8">
          <DepositButton />
        </div>
        <p className="mt-6 text-xs text-ink/45">
          Pokud Stripe klíče ještě nemáte, nastavte <code className="rounded bg-ink/5 px-1">.env.local</code>{" "}
          podle <code className="rounded bg-ink/5 px-1">.env.example</code>.
        </p>
      </div>

      <div className="mt-10 glass-panel p-6 text-sm text-ink/68 md:p-8">
        <p className="font-medium text-ink">Před první terapií</p>
        <p className="mt-2">
          Každý nový klient musí absolvovat vstupní diagnostiku před zahájením terapeutického
          protokolu.
        </p>
      </div>

      <p className="mt-12 text-center text-sm text-ink/50">
        Máte dotaz?{" "}
        <Link href="/faq" className="font-medium text-gold transition hover:underline">
          Nejčastější otázky (FAQ)
        </Link>
      </p>
    </PageShell>
  );
}

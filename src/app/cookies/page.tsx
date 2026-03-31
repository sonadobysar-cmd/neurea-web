import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Cookie politika",
  description: "Jak web NEUREA používá cookies a podobné technologie.",
};

export default function CookiesPage() {
  return (
    <PageShell>
      <p className="eyebrow">Právní</p>
      <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
        Cookie politika
      </h1>
      <p className="mt-3 text-sm text-ink/45">Poslední aktualizace: březen 2026</p>

      <article className="mt-12 space-y-10 text-sm leading-relaxed text-ink/78 md:text-[15px]">
        <section>
          <h2 className="font-display text-2xl font-normal text-ink">1. Co jsou cookies</h2>
          <p className="mt-3">
            Cookies jsou malé textové soubory ukládané do vašeho prohlížeče. Umožňují webu zapamatovat si
            např. váš souhlas nebo technická nastavení.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal text-ink">2. Jaké cookies používáme</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Nezbytné (technické)</strong> — zajištění základní funkčnosti webu, bezpečnosti a
              uložení volby v cookie liště (např. souhlas s analytikou).
            </li>
            <li>
              <strong>Analytické (volitelné)</strong> — pokud zapneme nástroj typu Google Analytics, slouží k
              anonymizovanému měření návštěvnosti. Spouští se až po vašem souhlasu, pokud tak nastavíme.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal text-ink">3. Správce a vaše práva</h2>
          <p className="mt-3">
            Správce: NEUREA / Nia Dobyšar. Podrobnosti o zpracování osobních údajů najdete v{" "}
            <Link href="/zasady-ochrany-udaju" className="text-gold hover:underline">
              zásadách ochrany osobních údajů
            </Link>
            . V prohlížeči můžete cookies mazat nebo blokovat — může to ale ovlivnit funkčnost webu.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal text-ink">4. Kontakt</h2>
          <p className="mt-3">
            Dotazy k cookies:{" "}
            <a href="mailto:info@neurea.cz" className="text-gold hover:underline">
              info@neurea.cz
            </a>
          </p>
        </section>
      </article>
    </PageShell>
  );
}

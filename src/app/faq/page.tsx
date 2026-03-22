import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PageShell } from "@/components/PageShell";
import { faqSections } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Časté dotazy (FAQ)",
  description:
    "Odpovědi na nejčastější otázky o NEUREA — rozdíl oproti psychologovi/psychiatrovi, bezpečnost technologií, průběh sezení a rezervace.",
};

export default function FaqPage() {
  return (
    <PageShell>
      <p className="eyebrow">FAQ</p>
      <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
        Nejčastější otázky
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink/60">
        Stručné odpovědi podle vašich podkladů. Finální tón a doplnění můžete kdykoli upravit.
      </p>
      <p className="mt-3 text-sm text-ink/45">
        NEUREA · neurea.cz ·{" "}
        <a href="mailto:info@neurea.cz" className="text-gold transition hover:underline">
          info@neurea.cz
        </a>
      </p>

      <div className="mt-14">
        <FaqAccordion sections={faqSections} />
      </div>

      <div className="mt-16 glass-panel-strong p-10 text-center">
        <p className="text-[15px] text-ink/65">Nenašli jste odpověď?</p>
        <Link href="/kontakt" className="btn-primary mt-6">
          <span>Kontakt</span>
        </Link>
      </div>
    </PageShell>
  );
}

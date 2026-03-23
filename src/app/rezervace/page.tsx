import type { Metadata } from "next";
import Link from "next/link";
import { BookingFlow } from "@/components/BookingFlow";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Rezervace",
};

export default function RezervacePage() {
  return (
    <PageShell>
      <p className="eyebrow">Rezervace</p>
      <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
        Rezervace
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink/60">
        Kompletní rezervační flow probíhá přímo na webu: výběr termínu, kontaktní údaje, platba a
        potvrzení rezervace.
      </p>

      <BookingFlow />

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

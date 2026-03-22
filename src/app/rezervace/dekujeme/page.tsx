import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Děkujeme za platbu",
};

export default function DekujemePage() {
  return (
    <PageShell className="max-w-xl text-center">
      <p className="eyebrow">Platba</p>
      <h1 className="mt-4 font-display text-3xl font-normal tracking-tight text-ink md:text-4xl">
        Děkujeme
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink/60">
        Platba zálohy byla přijata. Potvrzení vám přijde na e-mail (po nastavení e-mailů ve Stripe).
      </p>
      <Link href="/kontakt" className="btn-secondary mt-8 inline-flex">
        Kontakt a ordinační hodiny
      </Link>
    </PageShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Screening testy",
};

const tests = [
  { href: "/testy/deprese", label: "Deprese (PHQ-9)", time: "cca 3 min" },
  { href: "/testy/uzkost", label: "Úzkost (GAD-7)", time: "cca 2 min" },
  { href: "/testy/insomnie", label: "Insomnie (ISI)", time: "cca 2 min" },
  { href: "/testy/adhd", label: "ADHD — dospělí (ASRS)", time: "cca 5 min" },
  { href: "/testy/adhd-deti", label: "ADHD — děti (rodič)", time: "cca 5 min" },
];

export default function TestyPage() {
  return (
    <PageShell>
      <p className="eyebrow">Orientace</p>
      <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
        Screening testy
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink/60">
        Orientační dotazníky — nejedná se o diagnózu. Výsledky slouží k lepší orientaci a doporučení
        dalšího kroku (např. konzultace v NEUREA).
      </p>
      <div className="mt-12 space-y-4">
        {tests.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="card-luxury flex items-center justify-between gap-4 px-7 py-6 !transition-transform"
          >
            <span className="font-medium text-ink">{t.label}</span>
            <span className="text-xs uppercase tracking-wider text-ink/40">{t.time}</span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}

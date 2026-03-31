import type { Metadata } from "next";
import { CtaButtons } from "@/components/CtaButtons";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Jak to funguje",
};

const steps = [
  {
    title: "Rezervace",
    body: "Online přes web nebo kontakt. Rezervace je závazná po uhrazení zálohy 1 000 Kč (Stripe).",
  },
  {
    title: "Vstupní diagnostika",
    body: "75 minut — anamnéza, HRV měření, analýza koherence ANS, návrh individuálního protokolu. Povinné před terapeutickým protokolem pro nové klienty.",
  },
  {
    title: "Terapeutický protokol",
    body: "Série sezení (5 nebo 10) nebo dětský protokol — kombinace technologií dle plánu.",
  },
  {
    title: "Kontrola a úprava",
    body: "Kontrolní sezení s HRV a vyhodnocením pokroku; úprava postupu podle potřeby.",
  },
];

export default function JakToFungujePage() {
  return (
    <PageShell>
      <p className="eyebrow">Proces</p>
      <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
        Jak to funguje
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink/60">
        Stručný popis toku klienta — finální copy doplníte. Každá stránka má dvě CTA: rezervace a
        další informace.
      </p>
      <ol className="mt-14 space-y-8">
        {steps.map((s, i) => (
          <li key={s.title} className="glass-panel-strong p-7 md:p-9">
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Krok {i + 1}
            </span>
            <h2 className="mt-3 font-display text-2xl font-normal text-ink">{s.title}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/68">{s.body}</p>
          </li>
        ))}
      </ol>
      <CtaButtons className="mt-14" />
    </PageShell>
  );
}

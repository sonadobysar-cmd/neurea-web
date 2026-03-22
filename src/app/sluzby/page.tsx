import type { Metadata } from "next";
import { CtaButtons } from "@/components/CtaButtons";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Služby",
};

export default function SluzbyPage() {
  return (
    <PageShell variant="wide">
      <p className="eyebrow">Nabídka</p>
      <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
        Služby
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/60">
        Přehled podle vašich podkladů — ceny viz ceník.
      </p>

      <div className="mt-14 grid gap-7 md:grid-cols-2">
        <section className="glass-panel-strong p-9">
          <h2 className="font-display text-2xl font-normal text-ink">Vstupní diagnostika</h2>
          <p className="mt-2 text-sm font-medium uppercase tracking-wider text-ink/45">75 min</p>
          <p className="mt-5 text-[15px] leading-relaxed text-ink/68">
            Anamnéza · HRV měření · analýza koherence autonomního nervového systému · návrh protokolu.
            Povinná před zahájením terapie pro nové klienty.
          </p>
        </section>
        <section className="glass-panel-strong p-9">
          <h2 className="font-display text-2xl font-normal text-ink">Terapeutické protokoly</h2>
          <ul className="mt-5 space-y-3 text-[15px] text-ink/68">
            <li>Série 5 sezení (60–90 min)</li>
            <li>Série 10 sezení (60–90 min)</li>
            <li>Dětský protokol série 5 (45–60 min) — ADHD, autismus; Vielight Gamma + emWave</li>
            <li>Kontrolní sezení (45 min)</li>
          </ul>
        </section>
        <section className="glass-panel-strong p-9 md:col-span-2">
          <h2 className="font-display text-2xl font-normal text-ink">À la carte — jednotlivé technologie</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["HRV biofeedback", "45 min — diagnostika a trénink nervové soustavy"],
              ["Transkraniální stimulace (tDCS)", "45 min — deprese, ADHD, bolest, kognitivní výkon"],
              ["Kranální elektrostimulace (CES)", "45 min — úzkosti, nespavost, chronická bolest"],
              ["Fotobiomodulace mozku", "45 min — deprese, únava, spánek, ADHD"],
              ["Myofasciální práce", "60 min — chronická bolest, napětí"],
            ].map(([t, d]) => (
              <div
                key={t}
                className="rounded-xl border border-white/60 bg-white/50 p-5 shadow-luxury backdrop-blur-sm"
              >
                <h3 className="font-medium text-ink">{t}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/58">{d}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <p className="mt-10 text-sm leading-relaxed text-ink/52">
        Zaměření: vyhoření, deprese, úzkosti, nespavost, ADHD (dospělí i děti), autismus (podpora),
        chronická bolest, kognitivní výkon, OCD/PTSD.
      </p>

      <CtaButtons className="mt-12" />
    </PageShell>
  );
}

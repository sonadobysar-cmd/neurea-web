import type { Metadata } from "next";
import Link from "next/link";
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

      <div className="mt-14 space-y-7">
        {/* Vstupní diagnostika */}
        <section className="glass-panel-strong p-9">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-normal text-ink">Vstupní diagnostika</h2>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-ink/45">75 min</p>
            </div>

            <Link
              href="/rezervace?serviceId=vstupni-diagnostika"
              className="btn-gold inline-flex min-h-[44px] items-center justify-center px-8"
            >
              <span>Rezervovat diagnostiku</span>
            </Link>
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-ink/68">
            Anamnéza · HRV měření · analýza koherence autonomního nervového systému · návrh protokolu.
            Povinná před zahájením terapie pro nové klienty.
          </p>
        </section>

        {/* Terapeutické protokoly */}
        <section className="glass-panel-strong p-9">
          <h2 className="font-display text-2xl font-normal text-ink">Terapeutické protokoly</h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <p className="eyebrow !text-[10px]">Dospělí</p>
              <ul className="mt-5 space-y-4 text-[15px] text-ink/68">
                <li className="flex flex-wrap items-center justify-between gap-3">
                  <span>Jedno sezení (45 min) — kontrolní měření & nastavení</span>
                  <Link href="/rezervace?serviceId=hrv-biofeedback" className="text-gold underline decoration-gold/40 hover:decoration-gold">
                    Rezervovat
                  </Link>
                </li>
                <li className="flex flex-wrap items-center justify-between gap-3">
                  <span>Série 5 sezení (60–90 min)</span>
                  <Link href="/rezervace?serviceId=serie-5" className="text-gold underline decoration-gold/40 hover:decoration-gold">
                    Rezervovat
                  </Link>
                </li>
                <li className="flex flex-wrap items-center justify-between gap-3">
                  <span>Série 10 sezení (60–90 min)</span>
                  <Link href="/rezervace?serviceId=serie-10" className="text-gold underline decoration-gold/40 hover:decoration-gold">
                    Rezervovat
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="eyebrow !text-[10px]">Děti</p>
              <ul className="mt-5 space-y-4 text-[15px] text-ink/68">
                <li className="flex flex-wrap items-center justify-between gap-3">
                  <span>Jedno sezení (45 min) — vstupní kontrola & nastavení</span>
                  <Link href="/rezervace?serviceId=hrv-biofeedback" className="text-gold underline decoration-gold/40 hover:decoration-gold">
                    Rezervovat
                  </Link>
                </li>
                <li className="flex flex-wrap items-center justify-between gap-3">
                  <span>Dětský protokol série 5 (45–60 min) — ADHD, autismus; Vielight Gamma + emWave</span>
                  <Link href="/rezervace?serviceId=detsky-program" className="text-gold underline decoration-gold/40 hover:decoration-gold">
                    Rezervovat
                  </Link>
                </li>
                <li className="flex flex-wrap items-center justify-between gap-3">
                  <span>Dětský protokol série 10 (60–90 min / sezení)</span>
                  <Link href="/rezervace?serviceId=serie-10" className="text-gold underline decoration-gold/40 hover:decoration-gold">
                    Rezervovat
                  </Link>
                </li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-ink/52">
                U dětských variant řešíme konkrétní nastavení protokolu individuálně v první diagnostice.
              </p>
            </div>
          </div>
        </section>

        {/* Jednotlivé procedury (dříve à la carte) */}
        <section className="glass-panel-strong p-9">
          <h2 className="font-display text-2xl font-normal text-ink">Jednotlivé procedury</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink/62">
            Vyberte si konkrétní technologii nebo modul bez kompletního protokolu. Doporučujeme nejdřív vstupní diagnostiku.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "HRV biofeedback",
                desc: "45 min — diagnostika a trénink nervové soustavy",
                serviceId: "hrv-biofeedback",
              },
              {
                title: "Transkraniální stimulace (tDCS)",
                desc: "45 min — deprese, ADHD, bolest, kognitivní výkon",
                serviceId: "tdcs",
              },
              {
                title: "Kranální elektrostimulace (CES)",
                desc: "45 min — úzkosti, nespavost, chronická bolest",
                serviceId: "ces",
              },
              {
                title: "Fotobiomodulace mozku",
                desc: "45 min — deprese, únava, spánek, ADHD",
                serviceId: "fotobiomodulace",
              },
              {
                title: "Myofasciální práce",
                desc: "60 min — chronická bolest, napětí",
                serviceId: "myofasialni-prace",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/60 bg-white/50 p-6 shadow-luxury backdrop-blur-sm"
              >
                <h3 className="font-medium text-ink">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/58">{item.desc}</p>
                <Link
                  href={`/rezervace?serviceId=${item.serviceId}`}
                  className="mt-5 inline-flex items-center text-sm text-gold underline decoration-gold/40 hover:decoration-gold"
                >
                  Rezervovat službu →
                </Link>
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

import Link from "next/link";
import { BadgeCheck, CalendarDays, MapPinned, Sparkles } from "lucide-react";
import { SearchPanel } from "@/components/SearchPanel";
import { SERVICE_PRICING, formatCzk } from "@/data/pricing";
import { PROVIDERS } from "@/data/providers";

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[var(--glow)] blur-3xl soft-pulse" />
        <div className="pointer-events-none absolute -right-16 top-40 h-64 w-64 rounded-full bg-[rgba(197,106,74,0.18)] blur-3xl" />

        <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16">
          <div className="fade-up max-w-3xl">
            <p className="chip mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              Celá ČR · ověřené ženy · kalendář místo chatu
            </p>
            <h1 className="display text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.02] text-[var(--ink)]">
              Úleva
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)] md:text-xl">
              Vše pro mámu, která už nestíhá — uvařit, uklidit, pohlídat sourozence,
              dula nebo laktační poradkyně. Blízko tebe. S volným termínem.
            </p>
          </div>

          <div className="fade-up mt-8 max-w-4xl" style={{ animationDelay: "0.12s" }}>
            <SearchPanel />
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--ink-soft)]">
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-[var(--sage)]" />
              Každá žena povinně ověřená
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-[var(--sage)]" />
              Rezervace bez dopisování
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPinned className="h-4 w-4 text-[var(--sage)]" />
              Stejná služba = stejná cena
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--sage)]">
              Jednotný ceník
            </p>
            <h2 className="display mt-1 text-3xl md:text-4xl">Žádné dražší profily</h2>
          </div>
          <Link href="/cenik" className="btn-ghost !py-2.5 !text-sm">
            Celý ceník
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {(
            [
              ["uleva", "Uvařit, uklidit, sourozenci, přítomnost"],
              ["dula", "Poporodní podpora — ne zdravotní péče"],
              ["laktace", "Podpora kojení na objednání"],
            ] as const
          ).map(([key, tip], i) => {
            const s = SERVICE_PRICING[key];
            return (
              <div
                key={key}
                className="card p-6 transition hover:-translate-y-0.5"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--sage)]">
                  {s.shortLabel}
                </p>
                <p className="display mt-2 text-4xl">{formatCzk(s.pricePerHour)}</p>
                <p className="text-sm text-[var(--ink-soft)]">za hodinu · min. {s.minHours} h</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">{tip}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[rgba(26,46,40,0.06)] bg-[rgba(255,255,255,0.35)] py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--sage)]">
              Jak to funguje
            </p>
            <h2 className="display mt-1 text-3xl md:text-4xl">Tři kroky k úlevě</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Řekni kde a co",
                d: "Lokalita + typ pomoci. Ukážeme jen ověřené ženy s volnými sloty blízko tebe.",
              },
              {
                n: "02",
                t: "Vyber termín v kalendáři",
                d: "Žádné „máš čas ve středu?“. Vidíš volno a rezervuješ na klik.",
              },
              {
                n: "03",
                t: "Zaplať na platformě",
                d: "Bez předplatného. Platíš jen objednané hodiny. My si vezmeme fee, pečující zbytek.",
              },
            ].map((step) => (
              <div key={step.n} className="card p-6">
                <p className="display text-4xl text-[var(--leaf)]">{step.n}</p>
                <h3 className="mt-3 text-lg font-bold">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--sage)]">
              Po celé ČR
            </p>
            <h2 className="display mt-1 text-3xl md:text-4xl">
              {PROVIDERS.length} ověřených žen připraveno
            </h2>
          </div>
          <Link href="/hledat" className="btn-primary !py-2.5 !text-sm">
            Prohlédnout termíny
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROVIDERS.slice(0, 6).map((p) => (
            <Link
              key={p.id}
              href={`/pece/${p.id}`}
              className="card flex items-center justify-between gap-3 p-4 transition hover:-translate-y-0.5"
            >
              <div>
                <p className="font-bold">{p.name}</p>
                <p className="text-sm text-[var(--ink-soft)]">
                  {p.city} · {p.services.map((s) => SERVICE_PRICING[s].shortLabel).join(", ")}
                </p>
              </div>
              <span className="chip shrink-0">★ {p.rating.toFixed(1)}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

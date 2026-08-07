import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, ShieldCheck } from "lucide-react";
import { SearchPanel } from "@/components/SearchPanel";
import { SERVICE_PRICING, formatCzk } from "@/data/pricing";
import { PROVIDERS } from "@/data/providers";

const SERVICES = [
  {
    key: "uleva" as const,
    tip: "Uvařit, uklidit, sourozenci, přítomnost — ať si konečně odpočineš.",
    image: "/media/service-uleva.jpg",
  },
  {
    key: "dula" as const,
    tip: "Poporodní přítomnost a rutina. Nezdravotní podpora v šestinedělí.",
    image: "/media/service-dula.jpg",
  },
  {
    key: "laktace" as const,
    tip: "Podpora kojení na objednání. Jasně označená kvalifikace.",
    image: "/media/service-laktace.jpg",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative min-h-[100svh] overflow-hidden">
        <Image
          src="/media/hero-mama.jpg"
          alt="Maminka s miminkem v klidném ranním světle"
          fill
          priority
          className="object-cover object-[center_28%]"
          sizes="100vw"
        />
        <div className="hero-scrim absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,91,74,0.18),transparent_45%)]" />

        <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-10 pt-28 md:pb-14 md:pt-32">
          <div className="fade-in max-w-3xl text-white">
            <p className="mb-4 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/75">
              <span className="trust-dot !bg-white !shadow-[0_0_0_4px_rgba(255,255,255,0.18)]" />
              Celá ČR · ověřené ženy · kalendář místo chatu
            </p>
            <h1 className="display text-[clamp(3.4rem,10vw,7rem)] leading-[0.92] text-white">
              MamaSOS
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/88 md:text-xl">
              Když už nestíháš — přijede ověřená žena. Uvaří, uklidí, pohlídá
              sourozence, nebo přijde dula či laktační poradkyně. S volným termínem.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/hledat" className="btn btn-rose">
                Potřebuju úlevu
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/jak-to-funguje"
                className="btn btn-ghost !bg-white/10 !text-white !border-white/25"
              >
                Jak to funguje
              </Link>
            </div>
          </div>

          <div className="fade-in-delay mt-10 max-w-4xl">
            <SearchPanel tone="dark" />
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-snow">
        <div className="shell grid gap-6 py-6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[var(--line)] md:py-7">
          {[
            {
              icon: BadgeCheck,
              t: "Každá žena povinně ověřená",
              d: "IČO, totožnost, RT, pohovor, pojištění",
            },
            {
              icon: CalendarDays,
              t: "Rezervace bez dopisování",
              d: "Vidíš volno a rezervuješ na klik",
            },
            {
              icon: ShieldCheck,
              t: "Stejná služba = stejná cena",
              d: "Žádné dražší profily ani předplatné",
            },
          ].map((item) => (
            <div key={item.t} className="flex items-start gap-3 md:px-6 first:md:pl-0 last:md:pr-0">
              <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-moss" />
              <div>
                <p className="font-bold text-ink">{item.t}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="eyebrow">Tři způsoby úlevy</p>
            <h2 className="display mt-2 text-4xl md:text-5xl">
              Víš přesně, co dostaneš
            </h2>
          </div>
          <Link href="/cenik" className="btn btn-ghost !py-2.5 !text-sm">
            Celý ceník
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {SERVICES.map((item, i) => {
            const s = SERVICE_PRICING[item.key];
            return (
              <Link
                key={item.key}
                href={`/hledat?sluzba=${item.key}`}
                className="group relative overflow-hidden rounded-[1.8rem] bg-ink text-white shadow-[var(--shadow-soft)]"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={s.label}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                      {s.shortLabel}
                    </p>
                    <p className="display mt-1 text-3xl">{formatCzk(s.pricePerHour)}</p>
                    <p className="text-sm text-white/75">za hodinu · min. {s.minHours} h</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/85">{item.tip}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/media/trust-home.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/55" />
        </div>
        <div className="shell relative grid items-center gap-10 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
          <div>
            <p className="eyebrow !text-moss-soft">Proč MamaSOS</p>
            <h2 className="display mt-2 text-4xl md:text-5xl">
              Trust first.
              <br />
              Potom úleva.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/78">
              Nejsme bazar inzerátů. Každá pečující musí projít ověřením a mít
              aktivní kalendář — jinak ji ve výsledcích neuvidíš.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "Povinné ověření totožnosti, RT a pojištění",
                "Reálné termíny místo „napiš mi, jestli máš čas“",
                "Jednotné ceny — žádné dražší profily",
              ].map((line) => (
                <p key={line} className="flex items-start gap-3 text-sm text-white/88">
                  <span className="mt-1.5 trust-dot" />
                  {line}
                </p>
              ))}
            </div>
          </div>
          <div className="floaty rounded-[1.8rem] border border-white/12 bg-white/8 p-6 backdrop-blur-md md:p-8">
            <p className="display text-5xl text-white">{PROVIDERS.length}+</p>
            <p className="mt-2 text-lg font-semibold">ověřených žen v demo síti</p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Praha, Brno, Ostrava a další města. Každá s fotkou, badgeemi a
              volnými sloty k rezervaci.
            </p>
            <Link href="/hledat" className="btn btn-rose mt-7">
              Prohlédnout termíny
            </Link>
          </div>
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow">Jak to funguje</p>
          <h2 className="display mt-2 text-4xl md:text-5xl">Tři kroky k úlevě</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
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
            <div key={step.n} className="relative border-t border-ink/10 pt-6">
              <p className="display text-5xl text-rose/80">{step.n}</p>
              <h3 className="mt-4 text-xl font-bold">{step.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-snow py-20 md:py-28">
        <div className="shell">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Po celé ČR</p>
              <h2 className="display mt-2 text-4xl md:text-5xl">
                Ověřené ženy připravené přijet
              </h2>
            </div>
            <Link href="/hledat" className="btn btn-ink !py-2.5 !text-sm">
              Prohlédnout termíny
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROVIDERS.slice(0, 6).map((p) => (
              <Link
                key={p.id}
                href={`/pece/${p.id}`}
                className="group flex items-center gap-4 rounded-[1.4rem] border border-[var(--line)] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-sand">
                  <Image
                    src={p.photo}
                    alt={p.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{p.name}</p>
                  <p className="truncate text-sm text-ink-soft">
                    {p.city} · {p.services.map((s) => SERVICE_PRICING[s].shortLabel).join(", ")}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-fog px-2.5 py-1 text-xs font-bold">
                  ★ {p.rating.toFixed(1)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

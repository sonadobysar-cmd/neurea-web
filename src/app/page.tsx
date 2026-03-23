import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CtaButtons } from "@/components/CtaButtons";

const steps = [
  { title: "Přijdeš", desc: "Rezervace termínu online — přehledně, bez zbytečných kroků." },
  { title: "Změříme", desc: "Vstupní diagnostika — HRV, koherence ANS, anamnéza." },
  { title: "Protokol", desc: "Individuální plán sezení a technologií." },
  { title: "Výsledky", desc: "Kontrolní měření a úprava postupu." },
];

const serviceCards = [
  {
    title: "Vstupní diagnostika",
    desc: "75 min — HRV, koherence ANS, návrh protokolu. Povinná před terapií pro nové klienty.",
    href: "/sluzby",
  },
  {
    title: "Terapeutické série",
    desc: "5 nebo 10 sezení podle plánu; dětské protokoly pro ADHD a související obtíže.",
    href: "/sluzby",
  },
  {
    title: "À la carte technologie",
    desc: "HRV biofeedback, tDCS, CES, fotobiomodulace, myofasciální práce — jednotlivě.",
    href: "/sluzby",
  },
];

const techTeaser = [
  "HRV a koherence autonomního nervového systému",
  "Transkraniální a kranální stimulace",
  "Fotobiomodulace mozku",
  "Myofasciální přístup k chronické bolesti",
];

const stats = [
  { value: "Brno", sub: "centrum", hint: "Lokace" },
  { value: "Praha", sub: "připravujeme", hint: "Expanze" },
  { value: "Online", sub: "přehledná rezervace", hint: "Rezervace" },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Sekce pod hero: věta + plovoucí bubliny diagnóz */}
      <section className="border-t border-gray-100/60 bg-[#fafbfc] pt-14 pb-12 md:pt-16 md:pb-16">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
          <p className="uppercase font-display text-[1.25rem] font-light tracking-[-0.02em] text-ink/90 md:text-[1.6rem] lg:text-[1.8rem]">
            Pomáháme tam, kde klinická cesta nestačila.
          </p>
          <div className="divider-gold mx-auto mt-7 h-px w-20" aria-hidden />

          <div className="mx-auto mt-12 max-w-5xl">
            {/* SR-only heading for accessibility */}
            <h2 className="sr-only">Diagnózy a orientační testy</h2>

            {/* Hezky seskupené bubliny (flex-wrap), různé velikosti, všechny VELKÝMI PÍSMENY */}
            <div className="mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-4 md:gap-x-5 md:gap-y-5">
              {[
                { label: "Deprese", size: "sm" },
                { label: "Úzkosti", size: "lg" },
                { label: "Vyhoření", size: "md" },
                { label: "Nespavost", size: "md" },
                { label: "ADHD", size: "lg" },
                { label: "Chronická bolest", size: "sm" },
                { label: "Panické ataky", size: "md" },
                { label: "Burnout", size: "lg" },
                { label: "Poruchy pozornosti", size: "sm" },
              ].map((b) => (
                <span
                  key={b.label}
                  className={[
                    "rounded-full border border-gold/65 bg-white/55 text-ink/70 backdrop-blur-md font-light uppercase tracking-[0.04em]",
                    b.size === "sm" ? "px-4 py-2 text-[13px]" : "",
                    b.size === "md" ? "px-5 py-2.5 text-[14px]" : "",
                    b.size === "lg" ? "px-6 py-2.5 text-[15px]" : "",
                  ].join(" ")}
                >
                  {b.label}
                </span>
              ))}

              {/* Poslední bublina: zlatá, plná */}
              <Link
                href="/testy"
                className="btn-gold !min-h-0 rounded-full !px-7 !py-2.5 !text-[15px] !font-light uppercase tracking-[0.02em]"
              >
                <span>+ Orientační testy &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tenká zlatá linka mezi bublinami a Lokace/Expanze/Rezervace */}
      <div className="divider-gold w-full" aria-hidden />

      {/* Klinický pruh — světlé sklo, kovové akcenty */}
      <section className="section-clinical-strip section-spacious">
        <div className="relative z-[1] mx-auto grid max-w-6xl grid-cols-1 divide-y divide-gray-200/50 px-4 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-8">
          {stats.map((s) => (
            <div
              key={s.hint}
              className="flex flex-col items-center justify-center px-6 py-10 text-center md:py-12 md:px-10"
            >
              <p className="mb-3 font-heading text-[10px] font-normal uppercase tracking-[0.38em] text-gold opacity-80">
                {s.hint}
              </p>
              <p className="font-display text-3xl font-light text-ink md:text-[2.35rem]">{s.value}</p>
              <p className="mt-2 text-[11px] font-normal uppercase tracking-[0.3em] text-ink/45">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-gold w-full" aria-hidden />

      <section className="bg-white section-spacious">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
          <p className="eyebrow">Filosofie</p>
          <blockquote className="pull-quote mt-8 text-balance text-ink/90">
            Klid není doplněk. Je to podmínka, aby se nervová soustava mohla znovu naučit regulovat
            zátěž — měřitelně a s respektem k tempu vašeho těla.
          </blockquote>
          <div className="divider-gold mx-auto mt-10 w-24" />
        </div>
      </section>

      <div className="divider-gold w-full" aria-hidden />

      <section className="border-y border-gray-100/60 bg-[#fafbfc] section-spacious">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="text-center">
            <p className="eyebrow">Proč NEUREA</p>
            <h2 className="mt-5 font-display text-[1.7rem] font-light tracking-[-0.03em] text-ink md:text-[2rem] lg:text-[2.3rem] lg:leading-[1.08]">
              Neuro - stimulační klinika s měřitelnými daty a podloženými výsledky stovkami výzkumů
            </h2>
          </div>

          <div className="mt-5 grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
            {/* Vlevo: text + tlačítka */}
            <div className="text-left lg:pt-1">
              <p className="text-base font-normal leading-relaxed text-ink/65 md:text-[17px]">
                Kombinujeme vstupní měření (HRV, koherence ANS), individuální protokol a klinicky
                používané technologie — v klidném, diskrétním prostředí.
              </p>
              <CtaButtons className="mt-10" />
            </div>

            {/* Vpravo: rámeček */}
            <div className="glass-panel-strong p-9 md:p-10">
              <ul className="space-y-5 text-[15px] font-normal leading-relaxed text-ink/70">
                <li className="flex gap-4">
                  <span className="mt-0.5 shrink-0 text-gold" aria-hidden>
                    ✓
                  </span>
                  Vstupní diagnostika před terapeutickým protokolem
                </li>
                <li className="flex gap-4">
                  <span className="mt-0.5 shrink-0 text-gold" aria-hidden>
                    ✓
                  </span>
                  Série sezení a à la carte technologie
                </li>
                <li className="flex gap-4">
                  <span className="mt-0.5 shrink-0 text-gold" aria-hidden>
                    ✓
                  </span>
                  Dětské protokoly (ADHD, autismus — podpora)
                </li>
                <li className="flex gap-4">
                  <span className="mt-0.5 shrink-0 text-gold" aria-hidden>
                    ✓
                  </span>
                  Online screening testy (orientační)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gold w-full" aria-hidden />

      <section className="bg-white section-spacious">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Služby</p>
              <h2 className="mt-4 font-display text-[2rem] font-light tracking-[-0.03em] text-ink md:text-[2.5rem]">
                Co u nás můžete absolvovat
              </h2>
            </div>
            <Link
              href="/sluzby"
              className="group inline-flex items-center gap-2 text-sm font-normal text-ink/55 transition hover:text-gold"
            >
              <span className="border-b border-current pb-0.5">Přehled služeb</span>
              <span aria-hidden className="transition group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-7">
            {serviceCards.map((c) => (
              <Link key={c.title} href={c.href} className="card-luxury group flex flex-col p-9">
                <h3 className="font-display text-[1.35rem] font-light text-ink transition duration-300 group-hover:text-gold md:text-[1.45rem]">
                  {c.title}
                </h3>
                <p className="mt-5 flex-1 text-[15px] font-normal leading-relaxed text-ink/55">{c.desc}</p>
                <span className="mt-8 text-[11px] font-normal uppercase tracking-[0.32em] text-gold transition group-hover:text-gold-bright">
                  Objevit →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100/60 bg-[#fafbfc] section-spacious">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <div className="glass-panel-strong p-9 md:p-11">
              <p className="eyebrow">Technologie</p>
              <h2 className="mt-4 font-display text-3xl font-light tracking-tight text-ink md:text-[2rem]">
                Podpora mozku a nervové soustavy
              </h2>
              <p className="mt-4 text-sm font-normal leading-relaxed text-ink/60">
                Popisy bez nutnosti uvádět interní názvy přístrojů — upravíte podle komunikace značky.
              </p>
              <ul className="mt-8 space-y-4 text-[15px] font-normal leading-relaxed text-ink/70">
                {techTeaser.map((t) => (
                  <li key={t} className="flex gap-3 border-l-[0.5px] border-gold/40 pl-4">
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                href="/technologie"
                className="mt-10 inline-flex text-sm font-normal text-gold transition hover:underline"
              >
                Technologie podrobněji →
              </Link>
            </div>
            <div>
              <p className="eyebrow">Jak to funguje</p>
              <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-ink md:text-4xl">
                Čtyři kroky
              </h2>
              <p className="mt-4 font-normal text-ink/58">
                Od online rezervace přes vstupní měření až po kontrolní sezení.
              </p>
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {steps.map((s, i) => (
                  <div
                    key={s.title}
                    className="rounded-[1.25rem] border border-gold/15 bg-white p-6 shadow-luxury transition hover:border-gold/25 hover:shadow-card-hover"
                  >
                    <span className="font-heading text-[11px] font-normal uppercase tracking-[0.2em] text-ink/35">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-light text-ink">{s.title}</h3>
                    <p className="mt-2 text-xs font-normal leading-relaxed text-ink/50">{s.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/jak-to-funguje"
                className="mt-8 inline-flex text-sm font-normal text-ink/55 transition hover:text-gold"
              >
                Celý proces →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gold w-full" aria-hidden />

      <section className="bg-white section-spacious">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="glass-panel-strong relative flex flex-col items-start justify-between gap-10 overflow-hidden p-10 md:flex-row md:items-center md:p-14">
            <div
              className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(200,175,100,0.1)_0%,transparent_70%)] blur-2xl"
              aria-hidden
            />
            <div className="relative">
              <p className="eyebrow">Orientace</p>
              <h2 className="mt-4 font-display text-2xl font-light text-ink md:text-[2.15rem]">
                Screening testy
              </h2>
              <p className="mt-3 max-w-lg text-[15px] font-normal leading-relaxed text-ink/58">
                PHQ-9, GAD-7, ISI, ASRS (dospělí) a rodičovský checklist — výsledky jsou orientační,
                ne diagnóza.
              </p>
            </div>
            <Link href="/testy" className="btn-gold shrink-0 px-10">
              <span>Spustit testy</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100/60 bg-[#fafbfc] section-spacious">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="glass-panel-strong px-8 py-12 text-center md:px-16 md:py-14">
            <p className="eyebrow">Podpora</p>
            <h2 className="mt-3 font-display text-2xl font-light text-ink md:text-3xl">Časté dotazy</h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] font-normal leading-relaxed text-ink/55">
              Rozdíl oproti psychologovi, bezpečnost technologií, první návštěva, platby a storno…
            </p>
            <Link href="/faq" className="btn-outline-gold mt-8">
              <span>Otevřít FAQ</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

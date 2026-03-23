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
    title: "Klinické sezení",
    desc: "1, 5 nebo 10 sezení podle plánu. Každý krok navazujeme na měření a individuální protokol.",
    href: "/sluzby",
  },
  {
    title: "Samostatné úkony",
    desc: "HRV biofeedback, tDCS, CES, fotobiomodulace, myofasciální práce — samostatně.",
    href: "/sluzby",
  },
  {
    title: "Dětský program",
    desc: "Podpora pro děti s ADHD a souvisejícími obtížemi — dětské protokoly včetně vybraných technologií.",
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

const diagnosisStats = [
  {
    title: "Deprese",
    value: "94 % lidí se zlepšilo do 10 týdnů",
    quote:
      "Zastavte přemítání, zvedněte se z postele a začněte zase žít. Ne za rok. Za týdny.",
    source: "Zdroj: 462 pacientů · Nature Medicine · transkraniální stimulace mozku",
  },
  {
    title: "Úzkosti",
    value: "100 % studií prokázalo zlepšení",
    quote:
      "Zatáhnout ruční brzdu nervového systému jde. Nemusíte žít v permanentní pohotovosti.",
    source: "Zdroj: 8 randomizovaných studií · 337 pacientů · Harvard School of Public Health · CES",
  },
  {
    title: "Nespavost",
    value: "48 % – úplná remise insomnie za 21 dní",
    quote: "Konečně spát celou noc. Vstát odpočatý. Bez prášků a bez závislosti.",
    source: "Zdroj: Objektivně měřeno actigrafií · reálné podmínky · CES terapie",
  },
  {
    title: "ADHD – Dospělí",
    value: "4 týdny do měřitelného zlepšení pozornosti",
    quote:
      "Konečně dokončovat to, co začnete. Soustředit se bez boje. Bez stimulantů a vedlejších účinků.",
    source: "Zdroj: 64 dospělých s ADHD · randomizovaná studie TUNED · tDCS",
  },
  {
    title: "ADHD – Děti",
    value: "6 z 7 dětí zaznamenalo zlepšení příznaků",
    quote: "Vaše dítě se umí soustředit. Jen jeho mozek potřebuje správný impuls, ne chemii.",
    source: "Zdroj: Fotobiomodulace mozku · klinické case studies · Harvard & Boston University",
  },
  {
    title: "Chronická bolest",
    value: "99 % veteránů hodnotilo léčbu jako účinnou",
    quote: "Bolest bez příčiny je vždy bolest s příčinou. Najdeme ji. A zaměříme se přímo na ni.",
    source: "Zdroj: 152 účastníků · US Department of Veterans Affairs · CES",
  },
  {
    title: "Vyhoření",
    value: "77 % – klinické zlepšení do 3 týdnů",
    quote:
      "Dovolená nepomohla. Protože problém není únava – je to dysregulovaný nervový systém. Ten umíme změřit a změnit.",
    source: "Zdroj: 50 000+ uživatelů · reálná data · transkraniální stimulace",
  },
  {
    title: "Fotobiomodulace / Kognitivní výkon",
    value: "82 % studií potvrdilo zlepšení kognitivních funkcí",
    quote: "Světlo které mění mozek. Bez léků. Bez elektrod. 35+ klinických studií za sebou.",
    source:
      "Zdroj: 35+ klinických studií · Harvard · Boston University · UCSF · Mount Sinai",
  },
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

      {/* Prodejní sekce: statistiky pro jednotlivé diagnózy */}
      <section className="bg-white section-spacious">
        <div className="mx-auto max-w-[82rem] px-4 md:px-10">
          <div className="text-center">
            <p className="eyebrow">Statistiky úspěšnosti</p>
            <h2 className="mt-5 font-display text-[2rem] font-light tracking-[-0.03em] text-ink md:text-[2.5rem] lg:text-[2.9rem] lg:leading-[1.12]">
              PROKAZATELNÉ VÝSLEDKY
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-[15px] font-normal leading-relaxed text-ink/60">
              Hodnoty vycházejí ze studií a měření významných zdrojů i kliniky.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {diagnosisStats.map((s) => (
              <div
                key={s.title}
                className="glass-panel-strong flex h-full flex-col border border-gold/35 p-7 shadow-glow-gold md:p-8"
              >
                <p className="font-heading text-[13px] font-normal uppercase tracking-[0.26em] text-gold">
                  {s.title}
                </p>
                <p className="mt-5 font-display text-[1.9rem] font-light tracking-[-0.03em] text-ink">
                  {s.value}
                </p>
                <p className="mt-5 text-[15px] font-normal leading-relaxed text-ink/70 italic">
                  {s.quote}
                </p>
                <p className="mt-auto pt-6 text-[13px] font-normal leading-relaxed text-ink/45">
                  {s.source}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/rezervace" className="btn-gold">
              <span>Chci stejné výsledky</span>
            </Link>
          </div>
        </div>
      </section>

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

          <div className="mt-8 grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-20 md:mt-10">
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
        <div className="mx-auto max-w-[82rem] px-4 md:px-10">
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
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4 md:gap-7">
            {serviceCards.map((c) => (
              <Link key={c.title} href={c.href} className="card-luxury group flex flex-col p-9">
                <h3 className="font-display text-[1.55rem] font-light tracking-[-0.03em] text-gold md:text-[1.7rem]">
                  {c.title === "Klinické sezení" ? (
                    <>
                      Klinické
                      <br />
                      sezení
                    </>
                  ) : (
                    c.title
                  )}
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

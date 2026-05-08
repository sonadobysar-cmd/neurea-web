"use client";

import Script from "next/script";
import { DM_Sans, Sora } from "next/font/google";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const headingFont = Sora({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  display: "swap",
});

const textFont = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const QUESTIONS = [
  "Mám problém dokončit úkoly i když jsem je začal/a s nadšením.",
  "Zapomínám na důležité věci i když si je zapíšu.",
  "Moje mysl přeskakuje z tématu na téma i když se chci soustředit.",
  "Odkládám věci na poslední chvíli i když vím že to způsobí problémy.",
  "V rozhovoru mi unikají detaily i když se snažím poslouchat.",
  "Mám pocit vnitřního neklidu i když jsem fyzicky v klidu.",
  "Začínám mnoho projektů ale málokterý dokončím.",
  "V nudných situacích nedokážu udržet pozornost ani krátce.",
  "Mám problém odhadnout kolik času mi věci zaberou.",
  "Impulzivně říkám nebo dělám věci které pak lituji.",
] as const;

const ANSWERS = [
  { label: "Nikdy", value: 0 },
  { label: "Občas", value: 1 },
  { label: "Často", value: 2 },
  { label: "Téměř vždy", value: 3 },
] as const;

const PAIN_POINTS = [
  "Začnete s energií, ale během dne ji ztratíte a úkoly zůstanou nedokončené.",
  "V hlavě je chaos, který okolí nevidí - jen výsledky, které nepřichází.",
  "Dostáváte rady typu \"víc disciplíny\", ale problém je biologický, ne charakterový.",
] as const;

const BENEFITS = [
  "10 otázek, výsledek ihned - bez čekání týdny až měsíce.",
  "Objektivní směr: ADHD / úzkost / dysregulace nervové soustavy.",
  "Následný jasný krok: e-book protokol nebo měřená diagnostika.",
] as const;

const FAQS = [
  {
    q: "Je test opravdu zdarma?",
    a: "Ano. Test je orientační, bez registrace a bez platební karty.",
  },
  {
    q: "Nahradí test lékařskou diagnózu?",
    a: "Ne. Výsledek není diagnóza. Je to rychlý screening, který pomůže rozhodnout další postup.",
  },
  {
    q: "Co když mi vyjde nízká pravděpodobnost ADHD?",
    a: "Často jde o úzkost, vyhoření nebo dysregulaci nervové soustavy. I to umíme objektivně změřit.",
  },
  {
    q: "Jak rychle se dostanu na diagnostiku?",
    a: "Typicky v řádu dnů podle kapacity v Brně nebo Praze. Rezervace je online během pár minut.",
  },
] as const;

const MICRO_PROOFS = ["Bez registrace", "Výsledek ihned", "2 minuty", "10 otázek"] as const;

const EBOOK_URL = process.env.NEXT_PUBLIC_ADHD_EBOOK_STRIPE_URL || "https://buy.stripe.com/";
const RESERVATION_URL = "https://rezervace.neurea.cz";
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "";
const EBOOK_COUNTDOWN_SECONDS = 15 * 60;
const EBOOK_DEADLINE_KEY = "adhd-ebook-deadline-v1";

type ResultBucket = "A" | "B" | "C";

function trackEvent(name: string, params: Record<string, string | number> = {}) {
  const payload = { ...params, page: "adhd_test" };
  const w = window as Window & {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };
  if (typeof w.gtag === "function") {
    w.gtag("event", name, payload);
  }
  if (typeof w.fbq === "function") {
    w.fbq("trackCustom", name, payload);
  }
}

function getResult(score: number): ResultBucket {
  if (score >= 21) return "A";
  if (score >= 11) return "B";
  return "C";
}

function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function AdhdTestLanding() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [loadingResult, setLoadingResult] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(EBOOK_COUNTDOWN_SECONDS);

  const progress = useMemo(() => (started ? (step / QUESTIONS.length) * 100 : 0), [started, step]);
  const result = getResult(score);

  useEffect(() => {
    const now = Date.now();
    const existing = Number(window.localStorage.getItem(EBOOK_DEADLINE_KEY));
    const deadline = Number.isFinite(existing) && existing > now ? existing : now + EBOOK_COUNTDOWN_SECONDS * 1000;
    window.localStorage.setItem(EBOOK_DEADLINE_KEY, String(deadline));

    const tick = () => {
      const diff = Math.ceil((deadline - Date.now()) / 1000);
      setSecondsLeft(Math.max(0, diff));
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const startTest = () => {
    if (!started) {
      setStarted(true);
      trackEvent("test_started");
    }
    const test = document.getElementById("test-flow");
    test?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const answer = (value: number) => {
    const nextScore = score + value;
    const nextStep = step + 1;
    setScore(nextScore);
    setStep(nextStep);
    if (nextStep < QUESTIONS.length) return;
    setLoadingResult(true);
    trackEvent("test_completed", { score: nextScore });
    window.setTimeout(() => {
      setLoadingResult(false);
      setShowResult(true);
      const bucket = getResult(nextScore);
      trackEvent("result_viewed", { bucket, score: nextScore });
      document.getElementById("result")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 2000);
  };

  const urgency = Math.max(1, Math.floor(secondsLeft / 60));

  return (
    <div className={`${textFont.className} funnel-page bg-[#0A0A0A] text-white`}>
      {GA_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
              gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      ) : null}

      {META_PIXEL_ID ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      ) : null}

      <section className="section-hero relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-12 md:py-16">
        <div className="gold-orb gold-orb-top" />
        <div className="gold-grid" />
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#4c3b1b] bg-[#221a0d] px-4 py-2 text-xs text-[#f2deb0]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#d6b15c]" />
            Dnes volno už jen {urgency} slotů diagnostiky
          </div>
          <p className="inline-block rounded-full border border-[#FFB347]/55 bg-[#ffb3471a] px-4 py-2 text-xs tracking-[0.15em] text-[#FFE7BE]">
            PRVNÍ NEURO-SOMATICKÉ PRACOVIŠTĚ V ČR
          </p>
          <h1 className={`${headingFont.className} hero-title mt-8 max-w-4xl text-5xl leading-[0.9] text-white md:text-7xl`}>
            Váš mozek vysílá signály.
            <br />
            Umíte je číst?
          </h1>
          <p className="mt-5 max-w-2xl text-xl text-[#f1d48b]">
            2 minuty · 10 otázek · Výsledek ihned
          </p>
          <p className="mt-3 max-w-3xl text-base text-white/82 md:text-lg">
            Každý měsíc odkládání znamená víc stresu, víc chaosu a horší výkon. Udělejte první krok teď.
          </p>
          <button
            onClick={startTest}
            className="funnel-btn-primary pulse mt-10 rounded-full px-10 py-4 text-sm font-bold tracking-[0.08em] text-[#0A0A0A] transition"
          >
            ZJISTIT VÝSLEDEK →
          </button>
          <p className="mt-4 text-sm text-white/75">
            Bezplatný orientační test · Bez registrace · Okamžitý výsledek
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {MICRO_PROOFS.map((proof) => (
              <span key={proof} className="proof-chip">
                {proof}
              </span>
            ))}
          </div>
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            <div className="funnel-stat pl-4">
              <p className="text-2xl font-bold text-[#FFB347] md:text-3xl">94,6 %</p>
              <p className="text-sm text-white/72">Klinické zlepšení ADHD</p>
            </div>
            <div className="funnel-stat pl-4">
              <p className="text-2xl font-bold text-[#FFB347] md:text-3xl">462</p>
              <p className="text-sm text-white/72">Pacientů ve studiích</p>
            </div>
            <div className="funnel-stat pl-4">
              <p className="text-2xl font-bold text-[#FFB347] md:text-3xl">Harvard</p>
              <p className="text-sm text-white/72">Nature Medicine</p>
            </div>
          </div>
          <div className="urgency-strip mt-6 rounded-xl px-4 py-3 text-sm md:text-base">
            <strong>Pozor:</strong> největší chyba je čekat, až se to „zlepší samo“. U většiny lidí se to bez
            cíleného postupu zhoršuje.
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-5">
        <div className="grid gap-4 md:grid-cols-3">
          <article className="image-card relative overflow-hidden rounded-2xl">
            <Image
              src="/visuals/neuro-1.svg"
              alt="Modern neuro clinic environment"
              width={1200}
              height={800}
              className="h-52 w-full object-cover md:h-64"
            />
            <div className="image-overlay">
              <p>Moderní neuro-klinický přístup</p>
            </div>
          </article>
          <article className="image-card relative overflow-hidden rounded-2xl">
            <Image
              src="/visuals/neuro-2.svg"
              alt="Brain scan and analysis visuals"
              width={1200}
              height={800}
              className="h-52 w-full object-cover md:h-64"
            />
            <div className="image-overlay">
              <p>Objektivní data místo odhadů</p>
            </div>
          </article>
          <article className="image-card relative overflow-hidden rounded-2xl">
            <Image
              src="/visuals/neuro-3.svg"
              alt="Focused patient and clinician consultation"
              width={1200}
              height={800}
              className="h-52 w-full object-cover md:h-64"
            />
            <div className="image-overlay">
              <p>Jasný plán dalšího postupu</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-problem mx-auto w-full max-w-6xl px-6 py-5">
        <div className="funnel-panel rounded-3xl p-7 md:p-10">
          <div className="mb-4 inline-flex rounded-full border border-[#5d4a24] bg-[#1b160c] px-4 py-1.5 text-xs tracking-[0.14em] text-[#ddc273]">
            KROK 1: POCHOPIT, CO SE DĚJE
          </div>
          <p className="text-sm uppercase tracking-[0.14em] text-[#FFB347]">Proč tenhle test vznikl</p>
          <h2 className={`${headingFont.className} mt-3 text-3xl md:text-5xl`}>
            ADHD není nedostatek vůle.
            <br />
            Je to jiná neurobiologie.
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {PAIN_POINTS.map((item) => (
              <article key={item} className="pain-card rounded-2xl p-5 text-white/85">
                {item}
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {BENEFITS.map((item) => (
              <article key={item} className="benefit-card rounded-2xl p-5 text-[#E9DFC4]">
                ✓ {item}
              </article>
            ))}
          </div>
          <button
            onClick={startTest}
            className="funnel-btn-primary mt-9 rounded-full px-8 py-3 text-sm font-bold tracking-[0.08em] text-[#0A0A0A]"
          >
            CHCI PROJÍT TEST TEĎ →
          </button>
        </div>
      </section>

      <section className="section-screening mx-auto w-full max-w-6xl px-6 py-5">
        <div className="funnel-panel rounded-3xl p-7 md:p-10">
          <div className="mb-4 inline-flex rounded-full border border-[#5d4a24] bg-[#1b160c] px-4 py-1.5 text-xs tracking-[0.14em] text-[#ddc273]">
            KROK 2: RYCHLÝ SCREENING
          </div>
          <h3 className={`${headingFont.className} text-3xl md:text-5xl`}>
            Za 2 minuty víte,
            <br />
            jestli je čas řešit ADHD do hloubky.
          </h3>
          <p className="mt-4 max-w-3xl text-white/80">
            Tohle není „další blogový kvíz“. Je to krátký orientační filtr, který vám okamžitě ukáže
            pravděpodobnost a navrhne další praktický krok.
          </p>
          <button
            onClick={startTest}
            className="funnel-btn-primary mt-7 rounded-full px-8 py-3 text-sm font-bold tracking-[0.08em] text-[#0A0A0A]"
          >
            SPOUSTÍM TEST →
          </button>
        </div>
      </section>

      <section id="test-flow" className="section-test mx-auto min-h-screen w-full max-w-4xl px-6 py-12 md:py-16">
        <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-[#1A1A1A]">
          <div
            className="h-full bg-gradient-to-r from-[#FF7A1A] to-[#FFD166] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {!started ? null : loadingResult ? (
          <div className="funnel-panel flex min-h-[55vh] flex-col items-center justify-center gap-6 rounded-3xl">
            <div className="loader h-16 w-16 rounded-full border-2 border-[#3A3A3A] border-t-[#FFB347]" />
            <p className="text-lg text-[#E9DFC4]">Analyzujeme váš výsledek...</p>
          </div>
        ) : !showResult ? (
          <div className="funnel-panel animate-fade rounded-3xl p-8 md:p-10">
            <p className="text-sm text-[#E9DFC4]/80">Otázka {step + 1} z 10</p>
            <h2 className={`${headingFont.className} mt-5 text-3xl leading-tight md:text-5xl`}>
              {QUESTIONS[step]}
            </h2>
            <div className="mt-10 grid gap-4">
              {ANSWERS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => answer(opt.value)}
                  className="answer-card rounded-2xl border px-6 py-5 text-left text-lg text-white transition"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {showResult ? (
        <section id="result" className="section-result mx-auto w-full max-w-6xl px-6 py-12 md:py-14">
          <div className="funnel-panel rounded-3xl p-8 md:p-10">
            {result === "A" ? (
              <>
                <p className="text-center text-6xl font-bold text-[#FFB347]">{score}/30</p>
                <p className="mx-auto mt-5 w-fit rounded-full border border-[#FFB347]/60 px-4 py-2 text-xs tracking-[0.12em] text-[#FFE7BE]">
                  VYSOKÁ PRAVDĚPODOBNOST ADHD
                </p>
                <h3 className={`${headingFont.className} mt-6 text-center text-4xl`}>
                  Váš mozek funguje jinak než 85 % populace.
                </h3>
                <p className="mt-5 text-center text-white/70">
                  Toto není diagnóza. Je to měřitelný biologický vzorec – narušené gama vlny a nižší
                  produkce dopaminu. Není to slabost. Je to neurologie.
                </p>
                <hr className="my-7 border-[#FFB347]/45" />
                <p className="font-bold text-white">
                  Tradiční cesta: psychiatr · 3-6 měsíců čekání · možná Ritalin · nejistý výsledek.
                </p>
                <p className="mt-3 text-[#FFB347]">
                  Naše cesta: změříme přesně co se děje. Do 75 minut víte víc než po roce u psychiatra.
                </p>
              </>
            ) : result === "B" ? (
              <>
                <p className="mx-auto w-fit rounded-full border border-[#FFB347]/60 px-4 py-2 text-xs tracking-[0.12em] text-[#FFE7BE]">
                  STŘEDNÍ PRAVDĚPODOBNOST ADHD
                </p>
                <h3 className={`${headingFont.className} mt-6 text-4xl`}>
                  Některé příznaky jsou přítomné. Příčina může být ADHD nebo úzkost.
                </h3>
                <p className="mt-5 text-white/70">
                  Online test vám příčinu neřekne. HRV diagnostika ano – změříme nervovou soustavu a
                  uvidíme přesně kde je problém.
                </p>
              </>
            ) : (
              <>
                <p className="mx-auto w-fit rounded-full border border-[#FFB347]/60 px-4 py-2 text-xs tracking-[0.12em] text-[#FFE7BE]">
                  NÍZKÁ PRAVDĚPODOBNOST ADHD
                </p>
                <h3 className={`${headingFont.className} mt-6 text-4xl`}>
                  ADHD pravděpodobně není příčina. Ale něco se děje.
                </h3>
                <p className="mt-5 text-white/70">
                  Příznaky které popisujete mohou ukazovat na úzkost, vyhoření nebo dysregulaci nervové
                  soustavy. To je stejně měřitelné a řešitelné.
                </p>
              </>
            )}
          </div>

          <div className="next-step-bar mt-8 rounded-2xl px-5 py-4 text-center">
            <p className="text-xs tracking-[0.14em] text-[#ddc273]">DALŠÍ KROK</p>
            <p className="mt-1 text-sm text-white/85">
              Vyberte si cestu: okamžitý PDF protokol za 199 Kč nebo rezervace diagnostiky.
            </p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <article className="funnel-card-gold rounded-3xl p-7">
              <p className="text-sm text-[#FFB347]">⚡ NEJPOPULÁRNĚJŠÍ</p>
              <h4 className={`${headingFont.className} mt-3 text-3xl`}>ADHD Mozek</h4>
              <p className="mt-1 text-[#FFE7BE]">Jak fungovat naplno bez léků</p>
              <ul className="mt-5 space-y-2 text-sm text-white/85">
                <li>✓ 47 stran · okamžitý download</li>
                <li>✓ Proč Ritalin nefunguje pro každého</li>
                <li>✓ Jak regulovat dopamin přirozeně</li>
                <li>✓ Praktické protokoly pro každý den</li>
                <li>✓ Kdy a jak vyhledat profesionální pomoc</li>
              </ul>
              <p className="mt-5 text-sm text-white/50 line-through">499 Kč</p>
              <p className="text-4xl font-bold text-[#FFB347]">199 Kč</p>
              <p className="mt-2 text-sm text-red-400">⏰ Nabídka vyprší za {formatClock(secondsLeft)}</p>
              <a
                href={EBOOK_URL}
                onClick={() => trackEvent("ebook_clicked")}
                className="funnel-btn-primary mt-6 inline-block rounded-full px-7 py-3 text-sm font-bold tracking-[0.08em] text-[#0A0A0A]"
              >
                CHCI E-BOOK →
              </a>
            </article>

            <article className="funnel-card-dark rounded-3xl p-7">
              <p className="text-sm text-[#FFB347]">🧠 NEJRYCHLEJŠÍ VÝSLEDEK</p>
              <h4 className={`${headingFont.className} mt-3 text-3xl`}>Vstupní Diagnostika</h4>
              <p className="mt-1 text-[#FFE7BE]">Změříme přesně co se děje ve vaší nervové soustavě</p>
              <ul className="mt-5 space-y-2 text-sm text-white/85">
                <li>✓ 75 minut · HRV měření</li>
                <li>✓ Objektivní data nervové soustavy</li>
                <li>✓ Individuální protokol</li>
                <li>✓ Výsledky které vidíte v číslech</li>
              </ul>
              <p className="mt-5 text-sm text-white/50 line-through">3 500 Kč</p>
              <p className="text-4xl font-bold text-white">2 900 Kč</p>
              <p className="mt-2 text-sm text-[#FFB347]">Pro první klienty · Brno nebo Praha</p>
              <a
                href={RESERVATION_URL}
                onClick={() => trackEvent("reservation_clicked")}
                className="funnel-btn-secondary mt-6 inline-block rounded-full px-7 py-3 text-sm font-bold tracking-[0.08em] text-white"
              >
                REZERVOVAT DIAGNOSTIKU →
              </a>
              <p className="mt-3 text-xs text-[#FFB347]">
                Garance: měřitelné zlepšení nebo vracíme 50 % ceny
              </p>
            </article>
          </div>
        </section>
      ) : null}

      <section className="section-proof mx-auto w-full max-w-6xl px-6 py-14">
        <h3 className={`${headingFont.className} text-center text-4xl text-[#FFB347]`}>Co říkají naši klienti</h3>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            "Čekala jsem 4 měsíce na psychiatra. U Neurea jsem měla výsledky do týdne. – Jana, 34 let",
            "Konečně jsem viděl data. Ne jen pocity. Změnilo to všechno. – Martin, 41 let",
            "Dcera má ADHD. Odmítala jsem léky. Neurea nám ukázala jinou cestu. – Petra, 38 let",
          ].map((quote) => (
            <article key={quote} className="funnel-card-dark rounded-2xl border-t-2 border-[#FF7A1A] p-6 text-white/85">
              {quote}
            </article>
          ))}
        </div>
      </section>

      <section className="section-steps mx-auto w-full max-w-6xl px-6 py-14">
        <h3 className={`${headingFont.className} text-center text-4xl text-[#FFB347]`}>
          3 kroky k měřitelnému výsledku
        </h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Vstupní diagnostika 75 min",
              text: "Změříme přesný stav vaší nervové soustavy. HRV data před prvním sezením. Vidíme co jiní jen odhadují.",
            },
            {
              title: "Individuální protokol",
              text: "Klinicky ověřené neurotechnologie přesně pro váš problém. Bez léků. Bez univerzálních řešení.",
            },
            {
              title: "Měřitelný výsledek",
              text: "Vidíte přesnou změnu v číslech. Garantujeme zlepšení nebo vracíme 50 % ceny.",
            },
          ].map((item, i) => (
            <article key={item.title} className="funnel-card-dark relative rounded-2xl p-6">
              <span className="text-3xl text-[#FFB347]">{["①", "②", "③"][i]}</span>
              <h4 className={`${headingFont.className} mt-3 text-2xl text-white`}>{item.title}</h4>
              <p className="mt-3 text-white/75">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {showResult ? (
        <section className="section-action mx-auto w-full max-w-6xl px-6 py-6">
          <div className="funnel-panel rounded-3xl p-7 text-center md:p-10">
            <div className="mx-auto mb-4 inline-flex rounded-full border border-[#6a4a1b] bg-[#261707] px-4 py-1.5 text-xs tracking-[0.14em] text-[#ffcc78]">
              KROK 3: AKCE
            </div>
            <h3 className={`${headingFont.className} text-3xl md:text-5xl`}>
              Nečekejte další měsíce.
              <br />
              Udělejte první krok dnes.
            </h3>
            <p className="mx-auto mt-4 max-w-3xl text-white/80">
              Největší chyba je odkládání. Buď si vezměte e-book protokol, nebo si rovnou rezervujte
              objektivní diagnostiku.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={EBOOK_URL}
                onClick={() => trackEvent("ebook_clicked")}
                className="funnel-btn-primary rounded-full px-8 py-3 text-sm font-bold tracking-[0.08em] text-[#0A0A0A]"
              >
                CHCI E-BOOK →
              </a>
              <a
                href={RESERVATION_URL}
                onClick={() => trackEvent("reservation_clicked")}
                className="funnel-btn-secondary rounded-full px-8 py-3 text-sm font-bold tracking-[0.08em] text-white"
              >
                REZERVOVAT DIAGNOSTIKU →
              </a>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-faq mx-auto w-full max-w-5xl px-6 py-14">
        <h3 className={`${headingFont.className} text-center text-4xl text-[#FFB347]`}>
          Často kladené otázky
        </h3>
        <div className="mt-8 space-y-4">
          {FAQS.map((item) => (
            <article key={item.q} className="funnel-panel rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-white">{item.q}</h4>
              <p className="mt-2 text-white/75">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      {showResult ? (
        <section className="section-final relative flex min-h-screen items-center overflow-hidden px-6 py-14">
          <div className="gold-orb gold-orb-bottom" />
          <div className="relative mx-auto w-full max-w-5xl text-center">
            <h3 className={`${headingFont.className} text-5xl text-white md:text-7xl`}>Terapie mluví.</h3>
            <h3 className={`${headingFont.className} mt-2 text-5xl text-[#FFB347] md:text-7xl`}>Neurea měří.</h3>
            <p className="mx-auto mt-5 max-w-2xl text-white/80">
              První neuro-somatické pracoviště svého druhu v České republice.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                href={RESERVATION_URL}
                onClick={() => trackEvent("reservation_clicked", { city: "brno" })}
                className="funnel-btn-primary rounded-full px-8 py-4 text-sm font-bold tracking-[0.08em] text-[#0A0A0A]"
              >
                REZERVOVAT – BRNO →
              </a>
              <a
                href={RESERVATION_URL}
                onClick={() => trackEvent("reservation_clicked", { city: "praha" })}
                className="funnel-btn-secondary rounded-full px-8 py-4 text-sm font-bold tracking-[0.08em] text-white"
              >
                REZERVOVAT – PRAHA →
              </a>
            </div>
            <p className="mt-6 text-sm text-[#FFB347]">neurea.cz · info@neurea.cz</p>
          </div>
        </section>
      ) : null}

      <div className="mobile-sticky-cta md:hidden">
        <button
          onClick={startTest}
          className="funnel-btn-primary w-full rounded-full px-7 py-3 text-sm font-bold tracking-[0.08em] text-[#0A0A0A]"
        >
          ZJISTIT VÝSLEDEK →
        </button>
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        .pulse {
          animation: pulse 2s infinite;
        }
        .funnel-page {
          background:
            radial-gradient(circle at 85% 10%, rgba(255, 179, 71, 0.22), transparent 42%),
            radial-gradient(circle at 75% 80%, rgba(255, 122, 26, 0.14), transparent 40%),
            radial-gradient(circle at 12% 70%, rgba(255, 210, 102, 0.14), transparent 45%),
            linear-gradient(180deg, #0a0b0f, #10141a 45%, #0b0d12);
        }
        .section-hero {
          background: linear-gradient(180deg, rgba(6, 8, 12, 0.94), rgba(8, 10, 14, 0.98));
        }
        .section-problem {
          background: linear-gradient(180deg, rgba(19, 15, 10, 0.82), rgba(10, 10, 10, 0));
        }
        .section-screening {
          background: linear-gradient(180deg, rgba(20, 16, 10, 0.55), rgba(10, 10, 10, 0));
        }
        .section-test {
          background: linear-gradient(180deg, rgba(10, 10, 10, 0), rgba(19, 14, 9, 0.5), rgba(10, 10, 10, 0));
        }
        .section-result {
          background: linear-gradient(180deg, rgba(18, 13, 7, 0.72), rgba(10, 10, 10, 0));
        }
        .section-proof,
        .section-steps,
        .section-faq {
          background: rgba(15, 12, 9, 0.58);
        }
        .section-action {
          background: linear-gradient(180deg, rgba(24, 17, 8, 0.62), rgba(10, 10, 10, 0.25));
        }
        .section-final {
          background: linear-gradient(180deg, rgba(10, 10, 10, 0.35), rgba(22, 15, 9, 0.78));
        }
        .hero-title {
          text-shadow: 0 0 36px rgba(255, 214, 137, 0.2);
        }
        .funnel-panel {
          border: 1px solid #2d2d2d;
          background: linear-gradient(180deg, rgba(23, 20, 16, 0.94), rgba(13, 11, 9, 0.98));
          box-shadow:
            0 20px 42px rgba(0, 0, 0, 0.35),
            0 0 0 1px rgba(255, 210, 128, 0.08) inset;
          backdrop-filter: blur(8px);
        }
        .funnel-card-gold {
          border: 1px solid rgba(255, 179, 71, 0.72);
          background: linear-gradient(180deg, rgba(35, 25, 14, 0.95), rgba(22, 16, 10, 0.97));
          box-shadow:
            inset 0 1px 0 rgba(255, 242, 214, 0.12),
            0 14px 38px rgba(255, 122, 26, 0.18);
        }
        .image-card {
          border: 1px solid rgba(255, 179, 71, 0.35);
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28);
        }
        .image-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border: 1px solid rgba(255, 122, 26, 0.28);
          border-radius: inherit;
          pointer-events: none;
        }
        .image-overlay {
          position: absolute;
          inset: auto 0 0 0;
          padding: 0.85rem 1rem;
          background: linear-gradient(180deg, transparent, rgba(18, 13, 9, 0.95));
          color: #fff1d8;
          font-size: 0.86rem;
          letter-spacing: 0.02em;
        }
        .funnel-card-dark {
          border: 1px solid rgba(255, 255, 255, 0.26);
          background: linear-gradient(180deg, rgba(22, 18, 13, 0.98), rgba(11, 10, 9, 0.98));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
        }
        .funnel-btn-primary {
          background: linear-gradient(120deg, #ff7a1a, #ffd166);
          box-shadow: 0 12px 34px rgba(255, 122, 26, 0.34);
          position: relative;
          overflow: hidden;
        }
        .urgency-strip {
          border: 1px solid rgba(255, 182, 80, 0.52);
          background: linear-gradient(90deg, rgba(84, 54, 18, 0.52), rgba(34, 20, 8, 0.28));
          color: #ffe1b3;
        }
        .funnel-btn-primary::after {
          content: "";
          position: absolute;
          top: -120%;
          left: -30%;
          width: 22%;
          height: 320%;
          transform: rotate(25deg);
          background: rgba(255, 255, 255, 0.32);
          animation: shine 3.2s ease-in-out infinite;
        }
        .funnel-btn-primary:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
        }
        .funnel-btn-secondary {
          border: 1px solid rgba(255, 179, 71, 0.9);
          background: rgba(18, 14, 10, 0.92);
          box-shadow: 0 8px 20px rgba(120, 70, 20, 0.24);
        }
        .funnel-btn-secondary:hover {
          border-color: #ffd166;
          color: #ffe9c1;
          transform: translateY(-2px);
        }
        .funnel-stat {
          border-left: 2px solid #ffb347;
          background: linear-gradient(90deg, rgba(255, 179, 71, 0.2), rgba(255, 179, 71, 0));
          padding-top: 0.35rem;
          padding-bottom: 0.35rem;
        }
        .answer-card {
          border-color: #343434;
          background: linear-gradient(180deg, rgba(28, 22, 16, 0.95), rgba(18, 14, 10, 0.95));
        }
        .answer-card:hover {
          border-color: #ffb347;
          color: #ffe7be;
          transform: translateX(4px);
          box-shadow: 0 10px 26px rgba(255, 122, 26, 0.2);
        }
        .mobile-sticky-cta {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 50;
          padding: 0.85rem 1rem max(0.85rem, env(safe-area-inset-bottom));
          border-top: 1px solid #2a2a2a;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(8px);
        }
        .proof-chip {
          border: 1px solid rgba(255, 179, 71, 0.64);
          border-radius: 999px;
          padding: 0.35rem 0.7rem;
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          color: #ffe7be;
          background: rgba(255, 179, 71, 0.14);
        }
        .pain-card {
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: linear-gradient(180deg, rgba(26, 26, 26, 0.98), rgba(17, 17, 17, 0.98));
        }
        .benefit-card {
          border: 1px solid rgba(255, 179, 71, 0.48);
          background: linear-gradient(180deg, rgba(39, 27, 13, 0.95), rgba(28, 20, 10, 0.95));
        }
        .next-step-bar {
          border: 1px solid rgba(255, 184, 79, 0.5);
          background: linear-gradient(180deg, rgba(54, 36, 14, 0.9), rgba(28, 20, 9, 0.92));
        }
        .gold-grid {
          pointer-events: none;
          position: absolute;
          inset: 0;
          opacity: 0.16;
          background-image:
            linear-gradient(rgba(255, 179, 71, 0.16) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 179, 71, 0.16) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(circle at 50% 45%, black 28%, transparent 82%);
        }
        .gold-orb {
          pointer-events: none;
          position: absolute;
          height: 36rem;
          width: 36rem;
          border-radius: 999px;
          filter: blur(58px);
          background: radial-gradient(circle, rgba(184, 150, 62, 0.25), transparent 62%);
        }
        .gold-orb-top {
          right: -20%;
          top: -20%;
        }
        .gold-orb-bottom {
          left: -20%;
          bottom: -25%;
        }
        .loader {
          animation: spin 1s linear infinite;
        }
        .animate-fade {
          animation: fadeIn 260ms ease-out;
        }
        @keyframes pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(184, 150, 62, 0.45);
          }
          70% {
            box-shadow: 0 0 0 18px rgba(184, 150, 62, 0);
          }
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shine {
          0% {
            left: -35%;
          }
          40%,
          100% {
            left: 120%;
          }
        }
      `}</style>
    </div>
  );
}

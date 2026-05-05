"use client";

import Script from "next/script";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { useEffect, useMemo, useState } from "react";

const headingFont = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
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

const EBOOK_URL = process.env.NEXT_PUBLIC_ADHD_EBOOK_STRIPE_URL || "https://buy.stripe.com/";
const RESERVATION_URL = "https://rezervace.neurea.cz";
const ANXIETY_TEST_URL = "https://neurea.cz/testy/uzkost";
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

  return (
    <div className={`${textFont.className} bg-[#0A0A0A] text-white`}>
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

      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-12">
        <div className="pointer-events-none absolute right-[-20%] top-[-20%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,_rgba(184,150,62,0.28),_transparent_62%)] blur-3xl" />
        <div className="relative mx-auto w-full max-w-6xl">
          <p className="inline-block rounded-full border border-[#B8963E]/60 bg-[#B8963E]/15 px-4 py-2 text-xs tracking-[0.14em] text-[#E9DFC4]">
            PRVNÍ NEURO-SOMATICKÉ PRACOVIŠTĚ V ČR
          </p>
          <h1 className={`${headingFont.className} mt-7 text-5xl leading-[0.98] text-white md:text-7xl`}>
            Váš mozek vysílá signály.
            <br />
            Umíte je číst?
          </h1>
          <p className="mt-5 text-xl text-[#B8963E]">2 minuty · 10 otázek · Výsledek ihned</p>
          <button
            onClick={startTest}
            className="pulse mt-9 rounded-full bg-[#B8963E] px-10 py-4 text-sm font-bold tracking-[0.08em] text-[#0A0A0A] transition hover:-translate-y-0.5 hover:brightness-110"
          >
            ZJISTIT VÝSLEDEK →
          </button>
          <p className="mt-4 text-sm text-white/75">
            Bezplatný orientační test · Bez registrace · Okamžitý výsledek
          </p>
          <div className="mt-14 grid gap-3 md:grid-cols-3">
            <div className="border-l-2 border-[#B8963E] pl-4">
              <p className="text-2xl font-bold text-[#B8963E]">94,6 %</p>
              <p className="text-sm text-white/70">Klinické zlepšení ADHD</p>
            </div>
            <div className="border-l-2 border-[#B8963E] pl-4">
              <p className="text-2xl font-bold text-[#B8963E]">462</p>
              <p className="text-sm text-white/70">Pacientů ve studiích</p>
            </div>
            <div className="border-l-2 border-[#B8963E] pl-4">
              <p className="text-2xl font-bold text-[#B8963E]">Harvard</p>
              <p className="text-sm text-white/70">Nature Medicine</p>
            </div>
          </div>
        </div>
      </section>

      <section id="test-flow" className="mx-auto min-h-screen w-full max-w-4xl px-6 py-14">
        <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-[#1A1A1A]">
          <div
            className="h-full bg-gradient-to-r from-[#B8963E] to-[#E9DFC4] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {!started ? (
          <div className="rounded-3xl border border-[#2A2A2A] bg-[#111111] p-8 text-center">
            <p className="text-white/75">Klikněte na tlačítko výše a začněte test.</p>
          </div>
        ) : loadingResult ? (
          <div className="flex min-h-[55vh] flex-col items-center justify-center gap-6">
            <div className="loader h-16 w-16 rounded-full border-2 border-[#3A3A3A] border-t-[#B8963E]" />
            <p className="text-lg text-[#E9DFC4]">Analyzujeme váš výsledek...</p>
          </div>
        ) : !showResult ? (
          <div className="animate-fade">
            <p className="text-sm text-[#E9DFC4]/80">Otázka {step + 1} z 10</p>
            <h2 className={`${headingFont.className} mt-5 text-3xl leading-tight md:text-5xl`}>
              {QUESTIONS[step]}
            </h2>
            <div className="mt-10 grid gap-4">
              {ANSWERS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => answer(opt.value)}
                  className="rounded-2xl border border-transparent bg-[#1A1A1A] px-6 py-5 text-left text-lg text-white transition hover:border-[#B8963E] hover:text-[#E9DFC4]"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {showResult ? (
        <section id="result" className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="rounded-3xl border border-[#2C2C2C] bg-[#111111] p-8 md:p-10">
            {result === "A" ? (
              <>
                <p className="text-center text-6xl font-bold text-[#B8963E]">{score}/30</p>
                <p className="mx-auto mt-5 w-fit rounded-full border border-[#B8963E]/60 px-4 py-2 text-xs tracking-[0.12em] text-[#E9DFC4]">
                  VYSOKÁ PRAVDĚPODOBNOST ADHD
                </p>
                <h3 className={`${headingFont.className} mt-6 text-center text-4xl`}>
                  Váš mozek funguje jinak než 85 % populace.
                </h3>
                <p className="mt-5 text-center text-white/70">
                  Toto není diagnóza. Je to měřitelný biologický vzorec – narušené gama vlny a nižší
                  produkce dopaminu. Není to slabost. Je to neurologie.
                </p>
                <hr className="my-7 border-[#B8963E]/45" />
                <p className="font-bold text-white">
                  Tradiční cesta: psychiatr · 3-6 měsíců čekání · možná Ritalin · nejistý výsledek.
                </p>
                <p className="mt-3 text-[#B8963E]">
                  Naše cesta: změříme přesně co se děje. Do 75 minut víte víc než po roce u psychiatra.
                </p>
              </>
            ) : result === "B" ? (
              <>
                <p className="mx-auto w-fit rounded-full border border-[#B8963E]/60 px-4 py-2 text-xs tracking-[0.12em] text-[#E9DFC4]">
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
                <p className="mx-auto w-fit rounded-full border border-[#B8963E]/60 px-4 py-2 text-xs tracking-[0.12em] text-[#E9DFC4]">
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

          {result !== "C" ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-[#B8963E] bg-[#121212] p-7">
                <p className="text-sm text-[#B8963E]">⚡ NEJPOPULÁRNĚJŠÍ</p>
                <h4 className={`${headingFont.className} mt-3 text-3xl`}>ADHD Mozek</h4>
                <p className="mt-1 text-[#E9DFC4]">Jak fungovat naplno bez léků</p>
                <ul className="mt-5 space-y-2 text-sm text-white/85">
                  <li>✓ 47 stran · okamžitý download</li>
                  <li>✓ Proč Ritalin nefunguje pro každého</li>
                  <li>✓ Jak regulovat dopamin přirozeně</li>
                  <li>✓ Praktické protokoly pro každý den</li>
                  <li>✓ Kdy a jak vyhledat profesionální pomoc</li>
                </ul>
                <p className="mt-5 text-sm text-white/50 line-through">499 Kč</p>
                <p className="text-4xl font-bold text-[#B8963E]">199 Kč</p>
                <p className="mt-2 text-sm text-red-400">⏰ Nabídka vyprší za {formatClock(secondsLeft)}</p>
                <a
                  href={EBOOK_URL}
                  onClick={() => trackEvent("ebook_clicked")}
                  className="mt-6 inline-block rounded-full bg-[#B8963E] px-7 py-3 text-sm font-bold tracking-[0.08em] text-[#0A0A0A] transition hover:brightness-110"
                >
                  CHCI E-BOOK →
                </a>
              </article>

              <article className="rounded-3xl border border-white/80 bg-[#0F0F0F] p-7">
                <p className="text-sm text-[#B8963E]">🧠 NEJRYCHLEJŠÍ VÝSLEDEK</p>
                <h4 className={`${headingFont.className} mt-3 text-3xl`}>Vstupní Diagnostika</h4>
                <p className="mt-1 text-[#E9DFC4]">Změříme přesně co se děje ve vaší nervové soustavě</p>
                <ul className="mt-5 space-y-2 text-sm text-white/85">
                  <li>✓ 75 minut · HRV měření</li>
                  <li>✓ Objektivní data nervové soustavy</li>
                  <li>✓ Individuální protokol</li>
                  <li>✓ Výsledky které vidíte v číslech</li>
                </ul>
                <p className="mt-5 text-sm text-white/50 line-through">3 500 Kč</p>
                <p className="text-4xl font-bold text-white">2 900 Kč</p>
                <p className="mt-2 text-sm text-[#B8963E]">Pro první klienty · Brno nebo Praha</p>
                <a
                  href={RESERVATION_URL}
                  onClick={() => trackEvent("reservation_clicked")}
                  className="mt-6 inline-block rounded-full border border-white bg-[#0A0A0A] px-7 py-3 text-sm font-bold tracking-[0.08em] text-white transition hover:border-[#B8963E]"
                >
                  REZERVOVAT DIAGNOSTIKU →
                </a>
                <p className="mt-3 text-xs text-[#B8963E]">
                  Garance: měřitelné zlepšení nebo vracíme 50 % ceny
                </p>
              </article>
            </div>
          ) : (
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={ANXIETY_TEST_URL}
                className="rounded-full bg-[#B8963E] px-8 py-3 text-sm font-bold tracking-[0.08em] text-[#0A0A0A]"
              >
                ZKUSIT TEST ÚZKOSTI →
              </a>
              <a
                href={RESERVATION_URL}
                onClick={() => trackEvent("reservation_clicked")}
                className="rounded-full border border-white px-8 py-3 text-sm font-bold tracking-[0.08em] text-white"
              >
                REZERVOVAT DIAGNOSTIKU →
              </a>
            </div>
          )}
        </section>
      ) : null}

      <section className="mx-auto w-full max-w-6xl px-6 py-14">
        <h3 className={`${headingFont.className} text-center text-4xl text-[#B8963E]`}>Co říkají naši klienti</h3>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            "Čekala jsem 4 měsíce na psychiatra. U Neurea jsem měla výsledky do týdne. – Jana, 34 let",
            "Konečně jsem viděl data. Ne jen pocity. Změnilo to všechno. – Martin, 41 let",
            "Dcera má ADHD. Odmítala jsem léky. Neurea nám ukázala jinou cestu. – Petra, 38 let",
          ].map((quote) => (
            <article key={quote} className="rounded-2xl border-t-2 border-[#B8963E] bg-[#1A1A1A] p-6 text-white/85">
              {quote}
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-14">
        <h3 className={`${headingFont.className} text-center text-4xl text-[#B8963E]`}>
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
            <article key={item.title} className="relative rounded-2xl border border-[#2F2F2F] bg-[#121212] p-6">
              <span className="text-3xl text-[#B8963E]">{["①", "②", "③"][i]}</span>
              <h4 className={`${headingFont.className} mt-3 text-2xl text-white`}>{item.title}</h4>
              <p className="mt-3 text-white/75">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-14">
        <div className="pointer-events-none absolute left-[-20%] bottom-[-25%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,_rgba(184,150,62,0.26),_transparent_64%)] blur-3xl" />
        <div className="relative mx-auto w-full max-w-5xl text-center">
          <h3 className={`${headingFont.className} text-5xl text-white md:text-7xl`}>Terapie mluví.</h3>
          <h3 className={`${headingFont.className} mt-2 text-5xl text-[#B8963E] md:text-7xl`}>Neurea měří.</h3>
          <p className="mx-auto mt-5 max-w-2xl text-white/80">
            První neuro-somatické pracoviště svého druhu v České republice.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href={RESERVATION_URL}
              onClick={() => trackEvent("reservation_clicked", { city: "brno" })}
              className="rounded-full bg-gradient-to-r from-[#B8963E] to-[#D3B66A] px-8 py-4 text-sm font-bold tracking-[0.08em] text-[#0A0A0A]"
            >
              REZERVOVAT – BRNO →
            </a>
            <a
              href={RESERVATION_URL}
              onClick={() => trackEvent("reservation_clicked", { city: "praha" })}
              className="rounded-full border border-white px-8 py-4 text-sm font-bold tracking-[0.08em] text-white"
            >
              REZERVOVAT – PRAHA →
            </a>
          </div>
          <p className="mt-6 text-sm text-[#B8963E]">neurea.cz · info@neurea.cz</p>
        </div>
      </section>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        .pulse {
          animation: pulse 2s infinite;
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
      `}</style>
    </div>
  );
}

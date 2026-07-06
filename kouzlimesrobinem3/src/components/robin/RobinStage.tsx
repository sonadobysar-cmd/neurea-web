"use client";

import Image from "next/image";
import { useState } from "react";
import { BoothTicker } from "./BoothTicker";
import { BubbleField, StageSpotlights, StageStars } from "./BubbleField";
import { HatShuffleGame } from "./HatShuffleGame";
import { robinSite } from "@/lib/robinSite";

const NAV = [
  { href: "#hra", label: "Hra" },
  { href: "#sluzby", label: "Služby" },
  { href: "#predstaveni", label: "Program" },
  { href: "#galerie", label: "Foto" },
  { href: "#cenik", label: "Ceník" },
  { href: "#kontakt", label: "Kontakt" },
];

const PHOTOS = [
  { src: "/robin/IMG_0872.jpg", alt: "Kouzelník Robin Panuš", rot: "-3deg" },
  { src: "/robin/IMG_0722.jpg", alt: "Robin — balonkové tvoření", rot: "2deg" },
  { src: "/robin/IMG_0890.jpg", alt: "Představení pro děti", rot: "-2deg" },
  { src: "/robin/IMG_0750.jpg", alt: "Kouzelnické vystoupení", rot: "3deg" },
  { src: "/robin/IMG_0584.jpg", alt: "Interaktivní show", rot: "-1deg" },
  { src: "/robin/IMG_0628.jpg", alt: "Close-up kouzla", rot: "2deg" },
];

export function RobinStage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [program, setProgram] = useState<"deti" | "dospeli">("deti");

  return (
    <div className="robin-stage">
      <BubbleField />
      <StageStars />

      <div className="robin-content">
        {/* ── NAV ── */}
        <header className="sticky top-0 z-50 border-b-4 border-[var(--robin-ink)] bg-[var(--robin-gold)]/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
            <a href="#" className="robin-booth-title text-base md:text-lg">
              Kouzlíme s Robinem
            </a>
            <nav className="hidden gap-6 md:flex">
              {NAV.map((l) => (
                <a key={l.href} href={l.href} className="robin-nav-link">
                  {l.label}
                </a>
              ))}
              <a href="#kontakt" className="robin-btn robin-btn--dark py-2 text-xs">
                Objednat
              </a>
            </nav>
            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span className={`h-0.5 w-6 bg-black transition ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`h-0.5 w-6 bg-black transition ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-6 bg-black transition ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </button>
          </div>
          {menuOpen && (
            <nav className="flex flex-col gap-3 border-t-2 border-black/20 px-5 py-4 md:hidden">
              {NAV.map((l) => (
                <a key={l.href} href={l.href} className="robin-nav-link text-base" onClick={() => setMenuOpen(false)}>
                  {l.label}
                </a>
              ))}
              <a href="#kontakt" className="robin-btn robin-btn--dark mt-2" onClick={() => setMenuOpen(false)}>
                Objednat představení
              </a>
            </nav>
          )}
        </header>

        {/* ── HERO (photo-op stánek) ── */}
        <section className="relative overflow-hidden pb-16 pt-8 md:pb-24 md:pt-12">
          <StageSpotlights />
          <div className="relative mx-auto grid max-w-6xl items-end gap-8 px-5 md:grid-cols-2 md:gap-10 md:px-8">
            <div>
              <p className="robin-booth-sub mb-3">www.kouzlimesrobinem.cz</p>
              <h1 className="robin-booth-title text-[clamp(2.5rem,10vw,5rem)]">
                Kouzlíme
                <br />
                s Robinem
              </h1>
              <p className="robin-booth-sub mt-5 tracking-[0.22em]">
                Kouzelník · Balonkář · Mentalista
              </p>
              <p className="mt-6 max-w-md text-lg font-semibold leading-relaxed text-black/80">
                Interaktivní kouzelnické představení pro děti i dospělé. Praha a celá ČR — narozeniny,
                školy, firemní akce i svatby.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#hra" className="robin-btn robin-btn--dark">
                  🎩 Zkus kouzlo
                </a>
                <a href="#kontakt" className="robin-btn robin-btn--light">
                  Objednat show
                </a>
              </div>
              {/* Modrý balonek ze stánku */}
              <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border-4 border-black bg-[var(--robin-blue)] px-5 py-3 shadow-[4px_4px_0_#000]">
                <span className="text-3xl">🐕</span>
                <span className="text-sm font-bold uppercase tracking-wide text-white">
                  + balonkové zvířátka pro děti
                </span>
              </div>
            </div>

            <div className="robin-hero-scene">
              <div className="robin-hero-glow" aria-hidden />
              <div className="robin-hero-shadow" aria-hidden />
              <span className="robin-float-icon -left-2 top-6 md:-left-6" style={{ animationDelay: "0s" }} aria-hidden>
                🎩
              </span>
              <span className="robin-float-icon -right-1 top-1/4 md:-right-4" style={{ animationDelay: "0.8s" }} aria-hidden>
                ✨
              </span>
              <span className="robin-float-icon right-2 bottom-1/3" style={{ animationDelay: "1.4s" }} aria-hidden>
                🪄
              </span>
              <Image
                src="/robin/robin-hero.png"
                alt="Kouzelník Robin Panuš"
                width={800}
                height={900}
                priority
                className="robin-hero-cutout"
                sizes="(max-width:768px) 96vw, 480px"
              />
              <span className="robin-hero-badge">Kouzelník Robin</span>
            </div>
          </div>
        </section>

        <BoothTicker />

        <HatShuffleGame />

        {/* ── SLUŽBY ── */}
        <section id="sluzby" className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <h2 className="robin-booth-title text-center text-4xl md:text-5xl">Co nabízím</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <article className="service-card service-card--magic">
                <span className="text-4xl">🎩</span>
                <h3 className="robin-booth-title mt-4 text-2xl">Kouzelník</h3>
                <p className="mt-3 font-medium leading-relaxed">
                  Karty, míče, šátky a triky, kde jsou diváci přímo v ději. Humor pro každý věk.
                </p>
              </article>
              <article className="service-card service-card--balloon">
                <span className="text-4xl">🎈</span>
                <h3 className="robin-booth-title mt-4 text-2xl">Balonkář</h3>
                <p className="mt-3 font-medium leading-relaxed">
                  Balloon twisting — zvířátka, klobouky, meče. Každé dítě dostane vlastní výtvor.
                </p>
              </article>
              <article className="service-card service-card--mind">
                <span className="text-4xl">🧠</span>
                <h3 className="robin-booth-title mt-4 text-2xl">Mentalista</h3>
                <p className="mt-3 font-medium leading-relaxed">
                  Čtení myšlenek a predikce. Elegantní show pro firemní večírky a dospělé.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ── O ROBINOVI ── */}
        <section id="o-robinovi" className="robin-section-dark py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:px-8">
            <div className="relative mx-auto max-w-md">
              <Image
                src="/robin/IMG_0584.jpg"
                alt="Robin Panuš na pódiu"
                width={600}
                height={600}
                className="rounded-2xl border-4 border-[var(--robin-gold)] object-cover shadow-[8px_8px_0_var(--robin-gold)]"
              />
            </div>
            <div>
              <h2 className="robin-booth-title text-4xl md:text-5xl">Robin Panuš</h2>
              <p className="mt-6 text-lg leading-relaxed">
                Profesionální kouzelník, balonkář a mentalista. Vystupuji na narozeninových oslavách,
                ve školách, na firemních akcích i svatbách. Moje představení jsou interaktivní — diváci
                nejsou pozorovatelé, ale spolutvůrci kouzel.
              </p>
              <p className="mt-4 text-lg leading-relaxed">
                Program vždy přizpůsobím věku publika, prostoru i charakteru akce.
              </p>
            </div>
          </div>
        </section>

        {/* ── PROGRAM ── */}
        <section id="predstaveni" className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <h2 className="robin-booth-title text-center text-4xl md:text-5xl">Program na míru</h2>
            <div className="mt-8 flex justify-center gap-2">
              {(["deti", "dospeli"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProgram(p)}
                  className={`robin-btn ${program === p ? "robin-btn--dark" : "robin-btn--light"}`}
                >
                  {p === "deti" ? "Pro děti" : "Pro dospělé"}
                </button>
              ))}
            </div>
            <div className="robin-panel mt-10 grid items-center gap-8 p-6 md:grid-cols-2 md:p-10">
              <div className="overflow-hidden rounded-xl border-4 border-black">
                <Image
                  src={program === "deti" ? "/robin/IMG_0890.jpg" : "/robin/IMG_0750.jpg"}
                  alt={program === "deti" ? "Představení pro děti" : "Mikromagie pro dospělé"}
                  width={600}
                  height={750}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div>
                <h3 className="robin-booth-title text-2xl md:text-3xl">
                  {program === "deti" ? "Dětské kouzelnické show" : "Mikromagie & mentalismus"}
                </h3>
                <p className="mt-4 font-medium leading-relaxed">
                  {program === "deti"
                    ? "Interaktivní program plný her, kouzel a smíchu. Ideální na narozeniny a školní akce. 30–60 minut."
                    : "Elegantní mikromagie a čtení myšlenek pro firemní večírky, svatby a galavečery. 45–90 minut."}
                </p>
                <ul className="mt-6 space-y-2 font-semibold">
                  {(program === "deti"
                    ? ["Účast dětí v triku", "Balonky jako bonus", "Humor podle věku"]
                    : ["Mikromagie u stolů", "Mentalismus", "Profesionální vystupování"]
                  ).map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-[var(--robin-red)]">★</span> {item}
                    </li>
                  ))}
                </ul>
                <a href="#kontakt" className="robin-btn robin-btn--red mt-8">
                  Nezávazná poptávka
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── GALERIE ── */}
        <section id="galerie" className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <h2 className="robin-booth-title text-center text-4xl md:text-5xl">Fotogalerie</h2>
            <div className="mt-12 columns-2 gap-4 md:columns-3">
              {PHOTOS.map((p) => (
                <div
                  key={p.src}
                  className="robin-polaroid mb-4 break-inside-avoid"
                  style={{ "--rot": p.rot } as React.CSSProperties}
                >
                  <Image src={p.src} alt={p.alt} width={400} height={500} className="w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CENÍK ── */}
        <section id="cenik" className="robin-section-dark py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <h2 className="robin-booth-title text-center text-4xl md:text-5xl">Ceník</h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed">
              Cenu řešíme se zákazníkem <strong>individuálně</strong> podle typu akce a místa — počtu
              osob, doby trvání představení a dalších požadavků.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed">
              <strong>Dopravné</strong> účtujeme dle aktuálních cen pohonných hmot a vzdálenosti z Prahy
              do místa konání. Jsme fér — účtujeme si pouze tolik, kolik opravdu projedeme.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-center font-semibold">
              Pro konkrétní cenu nás neváhejte kontaktovat — nezávazná poptávka níže.
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="robin-panel p-6 text-[var(--robin-ink)] md:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--robin-red)]">
                  Co ovlivňuje cenu
                </p>
                <ul className="mt-4 space-y-3 font-semibold">
                  <li className="flex gap-2">
                    <span className="text-[var(--robin-red)]">★</span>
                    Typ akce (narozeniny, škola, firemní večírek, svatba…)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--robin-red)]">★</span>
                    Počet diváků a délka vystoupení
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--robin-red)]">★</span>
                    Věk publika a rozsah programu
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--robin-red)]">★</span>
                    Vzdálenost místa konání od Prahy
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--robin-red)]">★</span>
                    Kombinace kouzel, balonkování nebo mentalismu
                  </li>
                </ul>
                <a href="#kontakt" className="robin-btn robin-btn--red mt-8 w-full">
                  Nezávazná poptávka
                </a>
              </div>

              <div className="robin-panel p-6 text-[var(--robin-ink)] md:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--robin-red)]">
                  Příklad nacenění vystoupení
                </p>

                <div className="mt-4 rounded-xl border-2 border-black/10 bg-[#fff9e6] p-4">
                  <p className="text-xs font-bold uppercase tracking-wider opacity-50">Poptávka</p>
                  <p className="mt-2 text-sm leading-relaxed">
                    {`„Dobrý den, poptávám kouzelníka na narozeninovou oslavu pro dceru. Bydlíme v Praze, bude tam 15–20 kamarádů ve věku 11–14 let. Vystoupení cca 30 min až 1 hod."`}
                  </p>
                </div>

                <div className="mt-4 rounded-xl border-2 border-black/10 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wider opacity-50">Naše odpověď</p>
                  <p className="mt-2 text-sm leading-relaxed">
                    Na akci rád přijedu! Vystoupení navrhuji na pevných <strong>45 min</strong> — pokud
                    se bude líbit, necháme si prostor i na přídavek.
                  </p>
                  <div className="mt-4 space-y-2 border-t border-black/10 pt-3 text-sm font-bold">
                    <div className="flex justify-between">
                      <span>Vystoupení 45 min (15–20 dětí)</span>
                      <span>3 500 Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Doprava v Praze</span>
                      <span>200 Kč</span>
                    </div>
                    <div className="flex justify-between border-t-2 border-black pt-2 text-lg">
                      <span>Celkem</span>
                      <span className="text-[var(--robin-red)]">3 700 Kč</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── KONTAKT ── */}
        <section id="kontakt" className="py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <div className="robin-panel p-8 md:p-12">
              <h2 className="robin-booth-title text-center text-4xl md:text-5xl">
                Máte zájem o vystoupení?
              </h2>
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <div className="space-y-5">
                  <div>
                    <p className="robin-booth-sub opacity-60">Kouzelník</p>
                    <p className="text-xl font-black">{robinSite.magician}</p>
                  </div>
                  <div>
                    <p className="robin-booth-sub opacity-60">Telefon</p>
                    <a href={`tel:${robinSite.phone.replace(/\s/g, "")}`} className="text-2xl font-black text-[var(--robin-red)]">
                      {robinSite.phoneDisplay}
                    </a>
                    <p className="text-sm font-semibold opacity-60">Po–Pá 8:00–15:00</p>
                  </div>
                  <div>
                    <p className="robin-booth-sub opacity-60">E-mail</p>
                    <a href={`mailto:${robinSite.email}`} className="font-bold underline">
                      {robinSite.email}
                    </a>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <footer className="robin-footer border-t-4 border-[var(--robin-gold)] bg-black py-10 text-center">
          <p className="robin-booth-title text-lg">Kouzlíme s Robinem</p>
          <p className="robin-booth-sub mt-2">Kouzelník · Balonkář · Mentalista</p>
          <p className="mt-4 text-sm text-white/50">© {new Date().getFullYear()} {robinSite.magician}</p>
        </footer>
      </div>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Poptávka — ${data.get("name")}`);
    const body = encodeURIComponent(
      `Jméno: ${data.get("name")}\nE-mail: ${data.get("email")}\nTelefon: ${data.get("phone")}\n\n${data.get("message")}`,
    );
    window.location.href = `mailto:${robinSite.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-4 border-black bg-[var(--robin-gold)] p-8 text-center">
        <span className="text-4xl">✨</span>
        <p className="robin-booth-title mt-3 text-xl">Děkujeme!</p>
        <p className="mt-2 font-medium">E-mail se otevřel — pošlete zprávu a brzy se ozveme.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        required
        placeholder="Jméno *"
        className="w-full rounded-xl border-4 border-black px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-[var(--robin-gold)]"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="E-mail *"
        className="w-full rounded-xl border-4 border-black px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-[var(--robin-gold)]"
      />
      <input
        name="phone"
        type="tel"
        placeholder="Telefon"
        className="w-full rounded-xl border-4 border-black px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-[var(--robin-gold)]"
      />
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Typ akce, datum, počet diváků…"
        className="w-full resize-none rounded-xl border-4 border-black px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-[var(--robin-gold)]"
      />
      <button type="submit" className="robin-btn robin-btn--dark w-full">
        Odeslat poptávku
      </button>
    </form>
  );
}

"use client";

import { ScrollReveal } from "./ScrollReveal";

export function RobinPricing() {
  return (
    <section id="cenik" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-robin-gold">Ceník</p>
          <h2 className="mt-3 font-robin-display text-4xl font-black uppercase text-white md:text-5xl">
            Férové ceny
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-white/60">
            Cenu řešíme individuálně podle typu akce, počtu diváků a místa konání. Dopravné
            účtujeme dle skutečné vzdálenosti z Prahy — bez skrytých poplatků.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <ScrollReveal delay={0.1}>
            <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-robin-orange/10 to-transparent p-8 md:p-10">
              <h3 className="font-robin-display text-2xl font-bold uppercase text-white">
                Individuální kalkulace
              </h3>
              <ul className="mt-6 space-y-4 text-white/65">
                <li className="flex gap-3">
                  <span className="text-robin-gold">✦</span>
                  Typ akce (narozeniny, škola, firemní večírek…)
                </li>
                <li className="flex gap-3">
                  <span className="text-robin-gold">✦</span>
                  Počet diváků a délka představení
                </li>
                <li className="flex gap-3">
                  <span className="text-robin-gold">✦</span>
                  Doprava dle vzdálenosti z Prahy
                </li>
                <li className="flex gap-3">
                  <span className="text-robin-gold">✦</span>
                  Možnost kombinace kouzel + balonkování
                </li>
              </ul>
              <a
                href="#kontakt"
                className="mt-8 inline-flex rounded-full border border-robin-gold/40 px-6 py-3 text-sm font-bold uppercase tracking-wider text-robin-gold transition hover:bg-robin-gold/10"
              >
                Nezávazná poptávka →
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="h-full rounded-3xl border border-robin-gold/20 bg-black/40 p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-robin-gold">
                Příklad nacenění
              </p>
              <h3 className="mt-3 font-robin-display text-xl font-bold text-white">
                Narozeninová oslava v Praze
              </h3>

              <div className="mt-6 space-y-4 rounded-2xl bg-white/5 p-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40">Poptávka</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {`„Narozeninová oslava pro dceru, 15–20 dětí ve věku 11–14 let, Praha, cca 45 minut programu."`}
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs uppercase tracking-wider text-white/40">Naše nabídka</p>
                  <div className="mt-3 space-y-2 text-sm text-white/70">
                    <div className="flex justify-between">
                      <span>Vystoupení 45 min</span>
                      <span className="font-semibold text-white">3 500 Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Doprava v Praze</span>
                      <span className="font-semibold text-white">200 Kč</span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2 text-base">
                      <span className="font-bold text-white">Celkem</span>
                      <span className="font-robin-display text-xl font-bold text-robin-gold">3 700 Kč</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

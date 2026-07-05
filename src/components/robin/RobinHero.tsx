"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { MagneticButton } from "./MagneticButton";

export function RobinHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.92]);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24">
      {/* Spotlight cones */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-20 left-[15%] h-[500px] w-32 rotate-[-12deg] bg-gradient-to-b from-white/8 to-transparent blur-2xl" />
        <div className="absolute -top-20 left-[45%] h-[600px] w-40 rotate-[-2deg] bg-gradient-to-b from-robin-gold/15 to-transparent blur-2xl" />
        <div className="absolute -top-20 right-[15%] h-[500px] w-32 rotate-[12deg] bg-gradient-to-b from-white/8 to-transparent blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <motion.div style={{ opacity }} className="order-2 md:order-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-robin-gold/30 bg-robin-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-robin-gold"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-robin-gold" />
            Kouzelník · Balonkář · Mentalista
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="font-robin-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-white via-robin-cream to-robin-gold bg-clip-text text-transparent">
              Kouzlíme
            </span>
            <br />
            <span className="text-white">s Robinem</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-white/65 md:text-xl"
          >
            Interaktivní kouzelnické představení, které okouzlí malé i velké diváky. Praha a
            okolí — narozeniny, školy, firemní večírky i svatby.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton>
              <a
                href="#kontakt"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-robin-orange via-robin-amber to-robin-gold px-8 py-4 text-base font-bold uppercase tracking-wider text-black shadow-xl shadow-robin-orange/30 transition hover:shadow-robin-gold/50"
              >
                <span className="relative z-10">Objednat představení</span>
                <span className="relative z-10 transition group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 -translate-x-full bg-white/30 transition group-hover:translate-x-full duration-500" />
              </a>
            </MagneticButton>
            <a
              href="#predstaveni"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold uppercase tracking-wider text-white/80 transition hover:border-robin-gold/50 hover:text-robin-gold"
            >
              Prohlédnout program
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-8"
          >
            {[
              { n: "500+", l: "Vystoupení" },
              { n: "3", l: "Programy" },
              { n: "100%", l: "Zábava" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-robin-display text-3xl font-bold text-robin-gold">{s.n}</p>
                <p className="text-sm uppercase tracking-wider text-white/50">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div style={{ y, scale }} className="relative order-1 md:order-2">
          <div className="relative mx-auto aspect-[3/4] max-w-md md:max-w-none">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-robin-orange/40 via-robin-gold/20 to-transparent blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/50">
              <Image
                src="/robin/IMG_0872.jpg"
                alt="Kouzelník Robin Panuš — profesionální kouzelnické představení"
                width={800}
                height={1067}
                priority
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating magic cards */}
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-1/4 rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-xl md:-left-8"
            >
              <span className="text-2xl">🎩</span>
              <p className="mt-1 text-xs font-bold uppercase text-robin-gold">Kouzla</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [2, -2, 2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -right-2 bottom-1/3 rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-xl md:-right-6"
            >
              <span className="text-2xl">🎈</span>
              <p className="mt-1 text-xs font-bold uppercase text-robin-gold">Balonky</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#sluzby" className="flex flex-col items-center gap-2 text-white/40 transition hover:text-robin-gold">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <span className="text-xl">↓</span>
        </a>
      </motion.div>
    </section>
  );
}

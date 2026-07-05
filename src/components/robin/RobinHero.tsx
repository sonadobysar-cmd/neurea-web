"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FloatingCards } from "./FloatingCards";
import { MagneticButton } from "./MagneticButton";

export function RobinHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 100]);
  const rotate = useTransform(scrollY, [0, 600], [0, 8]);

  return (
    <section className="robin-hero relative flex min-h-[100dvh] items-center overflow-hidden pt-20">
      <FloatingCards />

      {/* Color blobs */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-robin-orange/40 blur-[100px]" aria-hidden />
      <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-robin-blue/30 blur-[90px]" aria-hidden />
      <div className="pointer-events-none absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-robin-gold/25 blur-[80px]" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-12 md:px-8 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 flex flex-wrap gap-2">
              {["Kouzelník", "Balonkář", "Mentalista"].map((tag, i) => (
                <span
                  key={tag}
                  className="robin-tag rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider text-black"
                  style={{
                    background: ["#FFD700", "#FF6B00", "#3B82F6"][i],
                    transform: `rotate(${[-2, 1, -1][i]}deg)`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-robin-display text-[clamp(2.8rem,8vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight">
              <span className="block text-white drop-shadow-[0_4px_20px_rgba(255,107,0,0.5)]">
                Kouzlíme
              </span>
              <span className="block bg-gradient-to-r from-robin-gold via-yellow-200 to-robin-orange bg-clip-text text-transparent">
                s Robinem
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-white/90 md:text-xl">
              Magie, která tě vtáhne do děje. Interaktivní show pro děti i dospělé — a rovnou si
              můžeš zahrát kouzelnickou hru.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton>
                <a
                  href="#hra"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-robin-gold via-yellow-300 to-robin-orange px-8 py-5 font-robin-display text-lg font-black uppercase text-black shadow-[0_10px_40px_rgba(255,107,0,0.45)]"
                >
                  <span className="text-2xl transition group-hover:rotate-12">🎴</span>
                  Zahraj si kouzlo
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#kontakt"
                  className="inline-flex items-center gap-2 rounded-2xl border-4 border-white bg-white/10 px-8 py-5 font-bold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Objednat show
                </a>
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div style={{ y, rotate }} className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-robin-orange via-robin-gold to-robin-blue opacity-60 blur-2xl" />
              <div className="relative rotate-2 overflow-hidden rounded-[2rem] border-4 border-black shadow-[12px_12px_0_#000]">
                <Image
                  src="/robin/IMG_0890.jpg"
                  alt="Kouzelník Robin Panuš — interaktivní představení"
                  width={800}
                  height={1000}
                  priority
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <motion.a
                href="#hra"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 rotate-[-6deg] rounded-2xl border-4 border-black bg-robin-red px-5 py-3 font-robin-display text-sm font-black uppercase text-white shadow-[6px_6px_0_#000] md:-left-8"
              >
                🎩 Vyzkoušej hru!
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#hra"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1"
      >
        <span className="rounded-full bg-robin-gold px-3 py-1 text-xs font-black uppercase text-black">
          Hra ↓
        </span>
      </motion.a>
    </section>
  );
}

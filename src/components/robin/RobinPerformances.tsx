"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

const TABS = [
  {
    id: "deti",
    label: "Pro děti",
    title: "Kouzelnické představení pro děti",
    image: "/robin/IMG_0890.jpg",
    imageAlt: "Kouzelník Robin na dětském představení s barevnými kostkami",
    desc: "Udělejte dětem radost a nechte je proniknout do světa magie. Interaktivní program plný her, kouzel a smíchu — pro děti každého věku.",
    points: [
      "Interaktivní triky s účastí dětí",
      "Humor a tempo přizpůsobené věku",
      "Balonkové tvary jako bonus",
      "Ideální na narozeniny a školní akce",
    ],
    duration: "30–60 minut",
  },
  {
    id: "dospeli",
    label: "Pro dospělé",
    title: "Mikromagie a mentalismus",
    image: "/robin/IMG_0750.jpg",
    imageAlt: "Kouzelník Robin při vystoupení pro dospělé",
    desc: "Sháníte program na firemní večírek, svatbu nebo soukromou akci? Elegantní mikromagie a mentalismus, který okouzlí i ty nejnáročnější diváky.",
    points: [
      "Mikromagie u stolů i na pódiu",
      "Mentalismus a čtení myšlenek",
      "Profesionální vystupování",
      "Firemní večírky, svatby, galavečery",
    ],
    duration: "45–90 minut",
  },
] as const;

export function RobinPerformances() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("deti");
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <section id="predstaveni" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-robin-gold">Programy</p>
          <h2 className="mt-3 font-robin-display text-4xl font-black uppercase text-white md:text-5xl">
            Představení na míru
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                className={`relative rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition ${
                  active === t.id ? "text-black" : "text-white/60 hover:text-white"
                }`}
              >
                {active === t.id && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-robin-orange to-robin-gold"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="mt-12 grid items-center gap-10 lg:grid-cols-2"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
              <Image
                src={tab.image}
                alt={tab.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-robin-gold backdrop-blur-sm">
                ⏱ {tab.duration}
              </div>
            </div>

            <div>
              <h3 className="font-robin-display text-3xl font-bold uppercase text-white md:text-4xl">
                {tab.title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-white/65">{tab.desc}</p>
              <ul className="mt-8 space-y-3">
                {tab.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-white/70">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-robin-gold/20 text-xs text-robin-gold">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="#kontakt"
                className="mt-10 inline-flex rounded-full bg-gradient-to-r from-robin-orange to-robin-gold px-8 py-4 font-bold uppercase tracking-wider text-black transition hover:shadow-lg hover:shadow-robin-orange/30"
              >
                Nezávazná poptávka
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

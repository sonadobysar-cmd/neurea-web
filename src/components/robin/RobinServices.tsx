"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const SERVICES = [
  {
    icon: "🎩",
    title: "Kouzelník",
    slug: "kouzelnik",
    desc: "Karty, míče, šátky — diváci jsou součástí triku, ne jen publikum.",
    color: "#FF6B00",
    shadow: "#cc5500",
    span: "lg:col-span-2 lg:row-span-2",
    big: true,
  },
  {
    icon: "🎈",
    title: "Balonkář",
    slug: "balonkar",
    desc: "Zvířátka, klobouky, meče — každé dítě dostane výtvor.",
    color: "#3B82F6",
    shadow: "#1d4ed8",
    span: "lg:col-span-1",
    big: false,
  },
  {
    icon: "🧠",
    title: "Mentalista",
    slug: "mentalista",
    desc: "Čtení myšlenek a predikce — wow efekt pro dospělé.",
    color: "#A855F7",
    shadow: "#7e22ce",
    span: "lg:col-span-1",
    big: false,
  },
] as const;

export function RobinServices() {
  return (
    <section id="sluzby" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <h2 className="font-robin-display text-5xl font-black uppercase text-white md:text-7xl">
            Co umím
            <span className="text-robin-gold">?</span>
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={s.slug} delay={i * 0.1} className={s.span}>
              <motion.article
                whileHover={{ y: -6, boxShadow: `10px 10px 0 ${s.shadow}` }}
                className={`relative h-full overflow-hidden rounded-3xl border-4 border-black p-6 md:p-8 ${s.big ? "min-h-[320px]" : "min-h-[180px]"}`}
                style={{
                  background: s.color,
                  boxShadow: `6px 6px 0 ${s.shadow}`,
                }}
              >
                <span className={`absolute -right-4 -top-4 opacity-20 ${s.big ? "text-[10rem]" : "text-7xl"}`}>
                  {s.icon}
                </span>
                <span className="text-4xl">{s.icon}</span>
                <h3
                  className={`mt-4 font-robin-display font-black uppercase text-black ${s.big ? "text-4xl md:text-5xl" : "text-2xl"}`}
                >
                  {s.title}
                </h3>
                <p className={`mt-3 font-medium text-black/80 ${s.big ? "max-w-md text-lg" : "text-sm"}`}>
                  {s.desc}
                </p>
                {s.big && (
                  <a
                    href="#hra"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl border-4 border-black bg-black px-5 py-2.5 text-sm font-black uppercase text-robin-gold"
                  >
                    Vyzkoušej hru →
                  </a>
                )}
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

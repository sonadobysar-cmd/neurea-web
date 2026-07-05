"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const SERVICES = [
  {
    icon: "🎩",
    title: "Kouzelník",
    slug: "kouzelnik",
    desc: "Klasická i moderní kouzla — karty, míče, hedvábné šátky a interaktivní triky, kde jsou diváci součástí představení.",
    features: ["Interaktivní triky", "Humor pro každý věk", "Profesionální rekvizity"],
    gradient: "from-violet-600/20 to-robin-orange/20",
  },
  {
    icon: "🎈",
    title: "Balonkář",
    slug: "balonkar",
    desc: "Tvoření balonkových zvířátek, klobouků a postav. Děti odcházejí s vlastním kouzelným výtvorem v ruce.",
    features: ["Balloon twisting", "Pro děti i dospělé", "Tematické tvary"],
    gradient: "from-blue-600/20 to-cyan-400/20",
  },
  {
    icon: "🧠",
    title: "Mentalista",
    slug: "mentalista",
    desc: "Čtení myšlenek, predikce a psychologické iluze. Ideální pro firemní večírky a dospělé publikum.",
    features: ["Mind reading", "Firemní akce", "Elegantní show"],
    gradient: "from-purple-600/20 to-pink-500/20",
  },
] as const;

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 4, rotateX: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RobinServices() {
  return (
    <section id="sluzby" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-robin-gold">Co nabízím</p>
          <h2 className="mt-3 font-robin-display text-4xl font-black uppercase text-white md:text-5xl">
            Tři světy magie
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-white/60">
            Jsem kouzelník, balonkář a mentalista v jednom. Program přizpůsobím typu akce, věku
            diváků i vašim přáním.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={s.slug} delay={i * 0.12}>
              <TiltCard>
                <article
                  className={`group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${s.gradient} p-8 backdrop-blur-sm transition hover:border-robin-gold/30`}
                >
                  <div className="absolute -right-8 -top-8 text-8xl opacity-10 transition group-hover:opacity-20">
                    {s.icon}
                  </div>
                  <span className="text-4xl">{s.icon}</span>
                  <h3 className="mt-6 font-robin-display text-2xl font-bold uppercase text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-white/65">{s.desc}</p>
                  <ul className="mt-6 space-y-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/50">
                        <span className="text-robin-gold">✦</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

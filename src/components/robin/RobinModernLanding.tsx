"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Sparkles,
  Wand2,
  PartyPopper,
  Brain,
  Phone,
  Mail,
  Globe,
  ArrowRight,
  Star,
  ChevronDown,
  Rabbit,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  robinGalleryImages,
  robinHeroCutout,
  robinHeroImage,
  robinServiceImages,
  robinStanekImage,
} from "@/lib/robinPhotos";
import { robinSite } from "@/lib/robinSite";

/* ── Shared ── */

function FloatingOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="rm-animate-float-slow absolute -left-20 -top-20 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "oklch(0.75 0.17 55 / 0.3)" }}
      />
      <div
        className="rm-animate-float-med absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "oklch(0.68 0.19 40 / 0.25)" }}
      />
      <div
        className="rm-animate-float-slow absolute bottom-0 left-1/3 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "oklch(0.38 0.14 20 / 0.3)" }}
      />
    </div>
  );
}

function Bubble({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <div
      aria-hidden
      className="rm-animate-float-slow absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        animationDelay: `${delay}s`,
        background:
          "radial-gradient(circle at 30% 30%, oklch(0.98 0.05 85 / 0.85), oklch(0.75 0.17 55 / 0.15) 60%, transparent 70%)",
        boxShadow:
          "inset 0 0 20px oklch(0.98 0.05 85 / 0.4), 0 0 30px oklch(0.75 0.17 55 / 0.25)",
      }}
    />
  );
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Navigation ── */

const NAV_LINKS = [
  { href: "#vystoupeni", label: "Vystoupení" },
  { href: "#o-robinovi", label: "O Robinovi" },
  { href: "#galerie", label: "Galerie" },
  { href: "#reference", label: "Reference" },
  { href: "#kontakt", label: "Kontakt" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b rm-border backdrop-blur-xl rm-bg-background/70" : "bg-transparent"
      }`}
      style={scrolled ? { background: "oklch(0.12 0.02 40 / 0.7)" } : undefined}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center gap-2">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full rm-bg-sunset rm-shadow-glow">
            <Wand2 className="h-4 w-4 rm-text-ink" />
          </span>
          <span className="rm-font-display text-lg tracking-tight">
            Kouzlíme <span className="rm-text-gradient-gold">s Robinem</span>
          </span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rm-link-muted text-sm">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#kontakt" className="rm-btn-magic hidden text-sm md:inline-flex">
          Rezervovat <ArrowRight className="h-4 w-4" />
        </a>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="border-t rm-border px-6 py-4 md:hidden" style={{ background: "oklch(0.12 0.02 40 / 0.95)" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rm-link-muted block py-2 text-sm"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#kontakt" className="rm-btn-magic mt-4 w-full justify-center" onClick={() => setOpen(false)}>
            Rezervovat
          </a>
        </div>
      )}
    </motion.header>
  );
}

/* ── Hero ── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 15 });
  const sy = useSpring(my, { stiffness: 60, damping: 15 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 30);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 30);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-[100svh] w-full overflow-hidden rm-bg-background"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={robinHeroImage}
          alt="Kouzelník Robin Panuš"
          className="h-full w-full object-cover object-[65%_center] opacity-50"
          width={1600}
          height={1808}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--rm-background), oklch(0.12 0.02 40 / 0.85) 50%, oklch(0.12 0.02 40 / 0.2))",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--rm-background), transparent 40%, oklch(0.12 0.02 40 / 0.5))",
          }}
        />
      </motion.div>

      <FloatingOrbs />
      <motion.div style={{ x: sx, y: sy }} className="pointer-events-none absolute inset-0">
        <Bubble x="12%" y="20%" size={90} delay={0} />
        <Bubble x="20%" y="70%" size={50} delay={2} />
        <Bubble x="85%" y="30%" size={120} delay={1} />
        <Bubble x="75%" y="75%" size={70} delay={3} />
        <Bubble x="45%" y="15%" size={40} delay={4} />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pt-24 md:grid md:grid-cols-2 md:items-center md:gap-8"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] rm-text-gold backdrop-blur-md"
            style={{ borderColor: "oklch(0.82 0.16 82 / 0.3)", background: "oklch(0.82 0.16 82 / 0.05)" }}
          >
            <Sparkles className="h-3.5 w-3.5" /> Kouzelník · Mentalista · Balonkář
          </motion.div>

          <h1 className="max-w-4xl rm-font-display text-[clamp(3rem,9vw,7rem)] leading-[0.9] tracking-tighter">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="block"
            >
              Kouzlíme
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="block italic rm-shimmer-text"
            >
              s&nbsp;Robinem.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 max-w-xl text-lg md:text-xl"
            style={{ color: "oklch(0.96 0.03 85 / 0.8)" }}
          >
            Interaktivní kouzelnická vystoupení, mikromagie a balonková zvířátka pro dětské oslavy,
            svatby a firemní akce. Zážitek, který si diváci pamatují ještě roky.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#kontakt" className="rm-btn-magic">
              Rezervovat představení <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#vystoupeni" className="rm-btn-ghost">
              Prohlédnout vystoupení
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="mt-16 grid max-w-2xl grid-cols-3 gap-8 border-t pt-8 rm-border"
          >
            {[
              { n: "500+", l: "odkouzlených akcí" },
              { n: "15", l: "let na jevišti" },
              { n: "100%", l: "spokojených dětí" },
            ].map((s) => (
              <div key={s.l}>
                <div className="rm-font-display text-3xl rm-text-gradient-gold md:text-4xl">{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-widest rm-text-muted">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative mx-auto hidden max-w-md md:block"
        >
          <div className="absolute -inset-8 rounded-full blur-3xl rm-bg-sunset opacity-30" />
          <Image
            src={robinHeroCutout}
            alt="Kouzelník Robin Panuš"
            width={682}
            height={842}
            priority
            className="relative z-10 w-full drop-shadow-2xl"
            sizes="(max-width:768px) 90vw, 460px"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        style={{ color: "oklch(0.96 0.03 85 / 0.6)" }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}

/* ── Services ── */

const services = [
  {
    id: "deti",
    title: "Pro děti",
    tagline: "Kouzla, smích, balonky",
    body: "Interaktivní představení pro oslavy, školky a školy. Děti se stanou součástí kouzel a odnesou si vlastní balonkové zvířátko.",
    img: robinServiceImages.deti,
    icon: PartyPopper,
    accentClass: "rm-accent-from-amber",
  },
  {
    id: "dospeli",
    title: "Pro dospělé & firmy",
    tagline: "Mikromagie u stolu",
    body: "Elegantní close-up magie na svatby, večírky a firemní akce. Chodím mezi hosty a kouzlím jim přímo pod rukama.",
    img: robinServiceImages.dospeli,
    icon: Wand2,
    accentClass: "rm-accent-from-ember",
  },
  {
    id: "mentalismus",
    title: "Mentalismus",
    tagline: "Čtení myšlenek",
    body: "Show, kde čísla, slova a myšlenky přestanou být tajemstvím. Ideální jako wow-moment programu vaší akce.",
    img: robinServiceImages.mentalismus,
    icon: Brain,
    accentClass: "rm-accent-from-burgundy",
  },
  {
    id: "balonky",
    title: "Balonková zvířátka",
    tagline: "Barevný stánek plný fantazie",
    body: "Můj balonkový stánek proměním v obchod s fantazií — pejsci, žirafy, meče i květiny přímo pro každé dítě.",
    img: robinServiceImages.balonky,
    icon: Rabbit,
    accentClass: "rm-accent-from-gold",
  },
];

function ServiceCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -y * 8, ry: x * 10 });
  };
  const onLeave = () => setT({ rx: 0, ry: 0 });
  const Icon = s.icon;

  return (
    <Reveal delay={i * 0.1}>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`rm-card-tilt group relative overflow-hidden rounded-3xl border p-8 rm-border rm-bg-card ${s.accentClass}`}
        style={{ transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
      >
        <div className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-70">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.img} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div
            className="absolute inset-0 mix-blend-overlay opacity-30"
            style={{ background: "var(--rm-accent)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--rm-card), oklch(0.17 0.025 40 / 0.7) 50%, transparent)",
            }}
          />
        </div>
        <div className="relative z-10 flex h-full min-h-[380px] flex-col">
          <span
            className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl rm-text-gold"
            style={{
              background: "oklch(0.82 0.16 82 / 0.1)",
              boxShadow: "inset 0 0 0 1px oklch(0.82 0.16 82 / 0.3)",
            }}
          >
            <Icon className="h-5 w-5" />
          </span>
          <div className="text-xs uppercase tracking-[0.2em]" style={{ color: "oklch(0.82 0.16 82 / 0.8)" }}>
            {s.tagline}
          </div>
          <h3 className="mt-2 rm-font-display text-4xl">{s.title}</h3>
          <p className="mt-4" style={{ color: "oklch(0.96 0.03 85 / 0.7)" }}>
            {s.body}
          </p>
          <div className="mt-auto pt-6">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 text-sm font-semibold rm-text-gold transition-transform hover:translate-x-1"
            >
              Poptat toto vystoupení <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Services() {
  return (
    <section id="vystoupeni" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0 rm-bg-magic" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div
                className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-widest rm-text-gold"
                style={{ borderColor: "oklch(0.82 0.16 82 / 0.2)" }}
              >
                <Sparkles className="h-3 w-3" /> Čtyři světy magie
              </div>
              <h2 className="max-w-3xl rm-font-display text-5xl leading-[0.95] md:text-7xl">
                Vyberte si <span className="rm-text-gradient-gold italic">vystoupení</span> na míru vaší
                akci.
              </h2>
            </div>
            <p className="max-w-md rm-text-muted">
              Každý program upravím podle věku diváků, prostoru i vaší představy — od komorní mikromagie
              po velké jevištní show.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── About ── */

function About() {
  return (
    <section id="o-robinovi" className="relative overflow-hidden rm-bg-ink py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl rm-bg-sunset opacity-30 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border rm-border rm-shadow-ember">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={robinStanekImage}
                alt="Kouzelnický stánek Robina — kouzelník, balonkář a mentalista"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -right-8 -top-8 hidden h-32 w-32 md:block"
            >
              <svg viewBox="0 0 100 100" className="h-full w-full rm-text-gold">
                <defs>
                  <path
                    id="circle-text"
                    d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                    fill="none"
                  />
                </defs>
                <text fontSize="9" letterSpacing="4" fill="currentColor" fontFamily="Fraunces">
                  <textPath href="#circle-text">· KOUZLA · MENTALISMUS · BALONKY · MIKROMAGIE</textPath>
                </text>
              </svg>
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.3em] rm-text-gold">Robin Panuš</div>
            <h2 className="rm-font-display text-5xl leading-tight md:text-6xl">
              Patnáct let přesvědčuji lidi, že{" "}
              <span className="italic rm-text-gradient-gold">nemožné existuje</span>.
            </h2>
            <div className="mt-8 space-y-5 text-lg" style={{ color: "oklch(0.96 0.03 85 / 0.8)" }}>
              <p>
                Jmenuji se Robin Panuš a kouzlím od dětství — z koníčku se stala vášeň a z vášně řemeslo.
                Dnes cestuji po celé republice s programy pro nejmenší diváky i pro dospělé publikum
                firemních akcí.
              </p>
              <p>
                Věřím, že dobrá magie není o triku — je o okamžiku, kdy se v očích diváka rozsvítí to samé
                překvapení, jaké kdysi rozsvítilo mě.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { icon: Wand2, k: "Kouzelník" },
                { icon: Brain, k: "Mentalista" },
                { icon: Rabbit, k: "Balonkář" },
              ].map(({ icon: I, k }) => (
                <div
                  key={k}
                  className="rounded-2xl border px-4 py-5 text-center backdrop-blur-sm rm-border rm-bg-card"
                  style={{ background: "oklch(0.17 0.025 40 / 0.6)" }}
                >
                  <I className="mx-auto mb-2 h-5 w-5 rm-text-gold" />
                  <div className="text-sm" style={{ color: "oklch(0.96 0.03 85 / 0.8)" }}>
                    {k}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Gallery ── */

function Gallery() {
  const images = robinGalleryImages;
  return (
    <section id="galerie" className="relative overflow-hidden py-32">
      <Reveal>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="max-w-2xl rm-font-display text-5xl md:text-6xl">
              Momenty z <span className="italic rm-text-gradient-gold">akcí</span>
            </h2>
            <div className="hidden text-sm rm-text-muted md:block">{images.length} fotek z reálných vystoupení</div>
          </div>
        </div>
      </Reveal>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
          style={{ background: "linear-gradient(to right, var(--rm-background), transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
          style={{ background: "linear-gradient(to left, var(--rm-background), transparent)" }}
        />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex w-max gap-6"
        >
          {[...images, ...images].map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-[380px] w-[520px] shrink-0 overflow-hidden rounded-3xl border rm-border rm-shadow-card"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.12 0.02 40 / 0.6), transparent)",
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Testimonials ── */

const testimonials = [
  {
    q: "Robin naprosto uchvátil děti i dospělé. Nikdo se ani nehnul, když kouzlil.",
    a: "Kateřina · maminka oslavence",
  },
  {
    q: "Perfektně načasovaný program na firemní večírek. Mikromagie u stolu byla hitem.",
    a: "Tomáš · event manager",
  },
  {
    q: "Balonková zvířátka nesly děti domů jako ten největší poklad. Doporučuji všema deseti.",
    a: "Lucie · ředitelka MŠ",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="reference" className="relative overflow-hidden rm-bg-ink py-32">
      <div className="pointer-events-none absolute inset-0 rm-bg-magic opacity-60" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <div className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] rm-text-gold">
            <Star className="h-3 w-3 fill-current" /> Reference
          </div>
          <h2 className="rm-font-display text-5xl md:text-6xl">Co říkají hosté</h2>
        </Reveal>

        <div className="relative mt-16 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl"
            >
              <p
                className="rm-font-display text-2xl italic md:text-4xl"
                style={{ color: "oklch(0.96 0.03 85 / 0.9)" }}
              >
                {`„${testimonials[i].q}"`}
              </p>
              <footer className="mt-6 text-sm uppercase tracking-widest rm-text-gold">
                {testimonials[i].a}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((_, j) => (
            <button
              key={j}
              type="button"
              onClick={() => setI(j)}
              aria-label={`Reference ${j + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                j === i ? "w-10 rm-bg-sunset" : "w-4 rm-border"
              }`}
              style={j === i ? undefined : { background: "var(--rm-border)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */

const faqs = [
  {
    q: "Kam všude jezdíte?",
    a: "Jezdím po celé České republice. Cesta v rámci Prahy je zdarma, jinde připočítávám náklady na dopravu.",
  },
  {
    q: "Jak dlouhé je vystoupení?",
    a: "Standardní program pro děti trvá 45–60 minut, mikromagie u stolu i celý večer. Vždy se přizpůsobím vašemu harmonogramu.",
  },
  {
    q: "Co potřebujete k představení?",
    a: "Stačí obyčejný prostor cca 3×3 metry a přístup do elektrické zásuvky. Vše ostatní si vozím s sebou.",
  },
  {
    q: "Jak funguje rezervace?",
    a: `Zavolejte na ${robinSite.phoneDisplay} nebo napište přes formulář. Domluvíme si detaily a zašlu vám orientační cenu.`,
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <h2 className="mb-16 rm-font-display text-5xl md:text-6xl">
            Časté <span className="italic rm-text-gradient-gold">dotazy</span>
          </h2>
        </Reveal>
        <div className="divide-y rm-border">
          {faqs.map((f, idx) => (
            <Reveal key={f.q} delay={idx * 0.05}>
              <button
                type="button"
                onClick={() => setOpen(open === idx ? null : idx)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="rm-faq-q rm-font-display text-2xl">
                  {f.q}
                </span>
                <span
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all rm-border ${
                    open === idx ? "rotate-45 rm-bg-sunset rm-text-ink" : ""
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-16" style={{ color: "oklch(0.96 0.03 85 / 0.7)" }}>
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ── */

function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Poptávka — ${data.get("jmeno")}`);
    const body = encodeURIComponent(
      `Jméno: ${data.get("jmeno")}\nTelefon: ${data.get("telefon")}\nTyp akce: ${data.get("typ")}\n\n${data.get("zprava")}`,
    );
    window.location.href = `mailto:${robinSite.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border p-8 text-center rm-border rm-bg-card">
        <Sparkles className="h-8 w-8 rm-text-gold" />
        <p className="mt-3 rm-font-display text-xl">Děkujeme!</p>
        <p className="mt-2 rm-text-muted">E-mail se otevřel — pošlete zprávu a brzy se ozveme.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border p-8 md:col-span-3 rm-border rm-bg-card">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-widest rm-text-muted">Jméno</span>
          <input required name="jmeno" className="rm-input mt-2" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-widest rm-text-muted">Telefon</span>
          <input required name="telefon" type="tel" className="rm-input mt-2" />
        </label>
        <label className="block md:col-span-2">
          <span className="text-xs uppercase tracking-widest rm-text-muted">Typ akce</span>
          <select name="typ" className="rm-input mt-2">
            <option>Dětská oslava</option>
            <option>Svatba</option>
            <option>Firemní akce</option>
            <option>Mateřská / základní škola</option>
            <option>Jiné</option>
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className="text-xs uppercase tracking-widest rm-text-muted">Zpráva</span>
          <textarea
            name="zprava"
            rows={4}
            placeholder="Datum, místo, počet hostů..."
            className="rm-input mt-2 resize-none"
          />
        </label>
      </div>
      <button type="submit" className="rm-btn-magic mt-6 w-full justify-center md:w-auto">
        Odeslat poptávku <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

function Contact() {
  const tel = robinSite.phone.replace(/\s/g, "");
  return (
    <section id="kontakt" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0 rm-bg-magic" />
      <FloatingOrbs />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] rm-text-gold">
              <Sparkles className="h-3 w-3" /> Poptávka
            </div>
            <h2 className="mx-auto max-w-3xl rm-font-display text-5xl leading-[1.05] md:text-7xl">
              Pojďme <span className="italic rm-text-gradient-gold">vykouzlit</span> vaši akci.
            </h2>
            <p className="mx-auto mt-6 max-w-xl" style={{ color: "oklch(0.96 0.03 85 / 0.7)" }}>
              Napište nebo zavolejte — obvykle odpovídám do 24 hodin a rád vám navrhnu program přesně
              podle vaší představy.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-5">
          <Reveal>
            <div className="space-y-4 md:col-span-2">
              <a
                href={`tel:${tel}`}
                className="rm-contact-card group flex items-center gap-4 rounded-2xl p-6 backdrop-blur-sm"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl rm-bg-sunset rm-text-ink">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest rm-text-muted">Telefon</div>
                  <div className="rm-contact-value mt-1 rm-font-display text-xl">
                    {robinSite.phoneDisplay}
                  </div>
                  <div className="text-xs rm-text-muted">{robinSite.phoneHours}</div>
                </div>
              </a>
              <a
                href={`mailto:${robinSite.email}`}
                className="rm-contact-card group flex items-center gap-4 rounded-2xl p-6 backdrop-blur-sm"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl rm-bg-sunset rm-text-ink">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest rm-text-muted">E-mail</div>
                  <div className="rm-contact-value mt-1 rm-font-display text-lg">{robinSite.email}</div>
                </div>
              </a>
              <div className="rm-contact-card flex items-center gap-4 rounded-2xl p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl rm-bg-sunset rm-text-ink">
                  <Globe className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest rm-text-muted">Působnost</div>
                  <div className="mt-1 rm-font-display text-lg">Celá Česká republika</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */

function Footer() {
  return (
    <footer className="border-t rm-border rm-bg-ink py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full rm-bg-sunset">
            <Wand2 className="h-3.5 w-3.5 rm-text-ink" />
          </span>
          <span className="rm-font-display">Kouzlíme s Robinem</span>
        </div>
        <div className="text-xs rm-text-muted">
          © {new Date().getFullYear()} {robinSite.magician} · Kouzelník, mentalista, balonkář
        </div>
      </div>
    </footer>
  );
}

/* ── Page ── */

export function RobinModernLanding() {
  return (
    <div className="robin-modern relative overflow-hidden">
      <Nav />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

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
import {
  robinGalleryImages,
  robinModernAssets,
  robinStanekImage,
} from "@/lib/robinPhotos";
import { robinSite } from "@/lib/robinSite";

function FloatingOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="orb-amber absolute -left-20 -top-20 h-96 w-96 rounded-full blur-3xl animate-float-slow" />
      <div className="orb-ember absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl animate-float-med" />
      <div className="orb-burgundy absolute bottom-0 left-1/3 h-80 w-80 rounded-full blur-3xl animate-float-slow" />
    </div>
  );
}

function Bubble({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <div
      aria-hidden
      className="animate-float-slow absolute rounded-full"
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
        scrolled ? "border-b border-border bg-background-70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center gap-2">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-sunset shadow-glow">
            <Wand2 className="h-4 w-4 text-ink" />
          </span>
          <span className="font-display text-lg tracking-tight">
            Kouzlíme <span className="text-gradient-gold">s Robinem</span>
          </span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link text-sm">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#kontakt" className="btn-magic hidden text-sm md:inline-flex">
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
        <div className="border-t border-border bg-background-70 px-6 py-4 md:hidden">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link block py-2 text-sm" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#kontakt" className="btn-magic mt-4 w-full justify-center" onClick={() => setOpen(false)}>
            Rezervovat
          </a>
        </div>
      )}
    </motion.header>
  );
}

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
      className="relative min-h-[100svh] w-full overflow-hidden bg-background"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={robinModernAssets.hero}
          alt="Kouzelník Robin s cylindrem, karty ve vzduchu"
          className="h-full w-full object-cover object-[65%_center] opacity-70"
          width={1600}
          height={1808}
        />
        <div className="hero-overlay-r absolute inset-0" />
        <div className="hero-overlay-t absolute inset-0" />
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
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold-30 bg-gold-5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5" /> Kouzelník · Mentalista · Balonkář
        </motion.div>

        <h1 className="max-w-4xl font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.9] tracking-tighter">
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
            className="block italic shimmer-text"
          >
            s&nbsp;Robinem.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 max-w-xl text-lg text-cream-80 md:text-xl"
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
          <a href="#kontakt" className="btn-magic">
            Rezervovat představení <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#vystoupeni" className="btn-ghost">
            Prohlédnout vystoupení
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mt-16 grid max-w-2xl grid-cols-3 gap-8 border-t border-border-60 pt-8"
        >
          {[
            { n: "500+", l: "odkouzlených akcí" },
            { n: "15", l: "let na jevišti" },
            { n: "100%", l: "spokojených dětí" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-3xl text-gradient-gold md:text-4xl">{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream-60"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}

const services = [
  {
    id: "deti",
    title: "Pro děti",
    tagline: "Kouzla, smích, balonky",
    body: "Interaktivní představení pro oslavy, školky a školy. Děti se stanou součástí kouzel a odnesou si vlastní balonkové zvířátko.",
    img: robinModernAssets.kids,
    icon: PartyPopper,
    accent: "accent-amber",
  },
  {
    id: "dospeli",
    title: "Pro dospělé & firmy",
    tagline: "Mikromagie u stolu",
    body: "Elegantní close-up magie na svatby, večírky a firemní akce. Chodím mezi hosty a kouzlím jim přímo pod rukama.",
    img: robinModernAssets.cards,
    icon: Wand2,
    accent: "accent-ember",
  },
  {
    id: "mentalismus",
    title: "Mentalismus",
    tagline: "Čtení myšlenek",
    body: "Show, kde čísla, slova a myšlenky přestanou být tajemstvím. Ideální jako wow-moment programu vaší akce.",
    img: robinModernAssets.mentalism,
    icon: Brain,
    accent: "accent-burgundy",
  },
  {
    id: "balonky",
    title: "Balonková zvířátka",
    tagline: "Barevný stánek plný fantazie",
    body: "Můj balonkový stánek proměním v obchod s fantazií — pejsci, žirafy, meče i květiny přímo pro každé dítě.",
    img: robinModernAssets.balloons,
    icon: Rabbit,
    accent: "accent-gold",
  },
];

function ServiceCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });
  const Icon = s.icon;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setT({
      rx: -((e.clientY - r.top) / r.height - 0.5) * 8,
      ry: ((e.clientX - r.left) / r.width - 0.5) * 10,
    });
  };

  return (
    <Reveal delay={i * 0.1}>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={() => setT({ rx: 0, ry: 0 })}
        className="card-tilt group relative overflow-hidden rounded-3xl border border-border bg-card p-8"
        style={{ transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
      >
        <div className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-70">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.img} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className={`absolute inset-0 ${s.accent} opacity-30 mix-blend-overlay`} />
          <div className="card-img-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 flex h-full min-h-[380px] flex-col">
          <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-10 text-gold ring-1 ring-inset ring-gold-30">
            <Icon className="h-5 w-5" />
          </span>
          <div className="text-xs uppercase tracking-[0.2em] text-gold-80">{s.tagline}</div>
          <h3 className="mt-2 font-display text-4xl">{s.title}</h3>
          <p className="mt-4 text-cream-70">{s.body}</p>
          <div className="mt-auto pt-6">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-transform hover:translate-x-1"
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
      <div className="pointer-events-none absolute inset-0 bg-magic" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-30 px-3 py-1 text-xs uppercase tracking-widest text-gold">
                <Sparkles className="h-3 w-3" /> Čtyři světy magie
              </div>
              <h2 className="max-w-3xl font-display text-5xl leading-[0.95] md:text-7xl">
                Vyberte si <span className="text-gradient-gold italic">vystoupení</span> na míru vaší akci.
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
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

function About() {
  return (
    <section id="o-robinovi" className="relative overflow-hidden bg-ink py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-sunset opacity-30 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-ember">
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
              <svg viewBox="0 0 100 100" className="h-full w-full text-gold">
                <defs>
                  <path id="circle-text" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" fill="none" />
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
            <div className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Robin Panuš</div>
            <h2 className="font-display text-5xl leading-tight md:text-6xl">
              Patnáct let přesvědčuji lidi, že{" "}
              <span className="italic text-gradient-gold">nemožné existuje</span>.
            </h2>
            <div className="mt-8 space-y-5 text-lg text-cream-80">
              <p>
                Jmenuji se Robin Panuš a kouzlím od dětství — z koníčku se stala vášeň a z vášně řemeslo.
                Dnes cestuji po celé republice s programy pro nejmenší diváky i pro dospělé publikum firemních akcí.
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
                  className="rounded-2xl border border-border bg-card-60 px-4 py-5 text-center backdrop-blur-sm"
                >
                  <I className="mx-auto mb-2 h-5 w-5 text-gold" />
                  <div className="text-sm text-cream-80">{k}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Gallery() {
  const images = robinGalleryImages;
  return (
    <section id="galerie" className="relative overflow-hidden py-32">
      <Reveal>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="max-w-2xl font-display text-5xl md:text-6xl">
              Momenty z <span className="italic text-gradient-gold">akcí</span>
            </h2>
            <div className="hidden text-sm text-muted-foreground md:block">
              {images.length} fotek z reálných vystoupení
            </div>
          </div>
        </div>
      </Reveal>

      <div className="relative">
        <div className="gallery-fade-l pointer-events-none absolute inset-y-0 left-0 z-10 w-32" />
        <div className="gallery-fade-r pointer-events-none absolute inset-y-0 right-0 z-10 w-32" />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex w-max gap-6"
        >
          {[...images, ...images].map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-[380px] w-[520px] shrink-0 overflow-hidden rounded-3xl border border-border shadow-card"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
              <div className="gallery-img-overlay absolute inset-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

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
    <section id="reference" className="relative overflow-hidden bg-ink py-32">
      <div className="pointer-events-none absolute inset-0 bg-magic opacity-60" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <div className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold">
            <Star className="h-3 w-3 fill-current" /> Reference
          </div>
          <h2 className="font-display text-5xl md:text-6xl">Co říkají hosté</h2>
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
              <p className="font-display text-2xl italic text-cream-80 md:text-4xl">
                {`„${testimonials[i].q}"`}
              </p>
              <footer className="mt-6 text-sm uppercase tracking-widest text-gold">{testimonials[i].a}</footer>
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
              className={`h-1.5 rounded-full transition-all ${j === i ? "w-10 bg-sunset" : "w-4 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

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
          <h2 className="mb-16 font-display text-5xl md:text-6xl">
            Časté <span className="italic text-gradient-gold">dotazy</span>
          </h2>
        </Reveal>
        <div className="divide-y divide-border">
          {faqs.map((f, idx) => (
            <Reveal key={f.q} delay={idx * 0.05}>
              <button
                type="button"
                onClick={() => setOpen(open === idx ? null : idx)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="faq-q font-display text-2xl">{f.q}</span>
                <span
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-all ${
                    open === idx ? "rotate-45 bg-sunset text-ink" : ""
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
                    <p className="pb-6 pr-16 text-cream-70">{f.a}</p>
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
      <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-8 text-center">
        <Sparkles className="h-8 w-8 text-gold" />
        <p className="mt-3 font-display text-xl">Děkujeme!</p>
        <p className="mt-2 text-muted-foreground">E-mail se otevřel — pošlete zprávu a brzy se ozveme.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Jméno</span>
          <input required name="jmeno" className="rm-input mt-2" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Telefon</span>
          <input required name="telefon" type="tel" className="rm-input mt-2" />
        </label>
        <label className="block md:col-span-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Typ akce</span>
          <select name="typ" className="rm-select mt-2">
            <option>Dětská oslava</option>
            <option>Svatba</option>
            <option>Firemní akce</option>
            <option>Mateřská / základní škola</option>
            <option>Jiné</option>
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Zpráva</span>
          <textarea
            name="zprava"
            rows={4}
            placeholder="Datum, místo, počet hostů..."
            className="rm-textarea mt-2"
          />
        </label>
      </div>
      <button type="submit" className="btn-magic mt-6 w-full justify-center md:w-auto">
        Odeslat poptávku <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

function Contact() {
  const tel = robinSite.phone.replace(/\s/g, "");
  return (
    <section id="kontakt" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0 bg-magic" />
      <FloatingOrbs />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold">
              <Sparkles className="h-3 w-3" /> Poptávka
            </div>
            <h2 className="mx-auto max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
              Pojďme <span className="italic text-gradient-gold">vykouzlit</span> vaši akci.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-cream-70">
              Napište nebo zavolejte — obvykle odpovídám do 24 hodin a rád vám navrhnu program přesně podle
              vaší představy.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-5">
          <div className="space-y-4 md:col-span-2">
            <Reveal>
              <a href={`tel:${tel}`} className="contact-card flex items-center gap-4 rounded-2xl p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sunset text-ink">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Telefon</div>
                  <div className="contact-value mt-1 font-display text-xl">{robinSite.phoneDisplay}</div>
                  <div className="text-xs text-muted-foreground">{robinSite.phoneHours}</div>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.05}>
              <a href={`mailto:${robinSite.email}`} className="contact-card flex items-center gap-4 rounded-2xl p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sunset text-ink">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">E-mail</div>
                  <div className="contact-value mt-1 font-display text-lg">{robinSite.email}</div>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="contact-card flex items-center gap-4 rounded-2xl p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sunset text-ink">
                  <Globe className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Působnost</div>
                  <div className="mt-1 font-display text-lg">Celá Česká republika</div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-3">
            <Reveal delay={0.15}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-ink py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sunset">
            <Wand2 className="h-3.5 w-3.5 text-ink" />
          </span>
          <span className="font-display">Kouzlíme s Robinem</span>
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {robinSite.magician} · Kouzelník, mentalista, balonkář
        </div>
      </div>
    </footer>
  );
}

export function RobinModernLanding() {
  return (
    <div className="robin-modern">
      <Nav />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

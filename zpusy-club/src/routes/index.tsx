import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import ivanaImg from "../assets/zpusy/ivana-solo.jpg";
import kundosakiImg from "../assets/zpusy/kundosaki.jpg";
import duoIllustration from "../assets/zpusy/duo-illustration-cutout.png";

import heroDuo from "../assets/zpusy/merch/hero-duo.jpg.asset.json";
import { SiteHeader, SiteFooter } from "../components/SiteChrome";
import { getLatestEpisode, getRecentEpisodes } from "../lib/youtube.functions";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

// Fallback YouTube video id, pokud se RSS feed nepodaří načíst
const FALLBACK_YT_ID = "uLrhXf0JKgU";

const latestEpisodeQuery = queryOptions({
  queryKey: ["latest-episode"],
  queryFn: () => getLatestEpisode(),
  staleTime: 5 * 60_000,
});

const recentEpisodesQuery = queryOptions({
  queryKey: ["recent-episodes"],
  queryFn: () => getRecentEpisodes(),
  staleTime: 5 * 60_000,
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zpussy Club — Mluvíme o všem. Podcast Ivany & Kundosaki" },
      { name: "description", content: "Český podcast bez filtru. Nové epizody každou středu 19:45 a komunita Zpussy+." },
      { property: "og:title", content: "Zpussy Club" },
      { property: "og:description", content: "Mluvíme o všem. Bez filtru." },
      { property: "og:image", content: heroDuo.url },
    ],
  }),
  loader: ({ context }) => Promise.all([
    context.queryClient.ensureQueryData(latestEpisodeQuery),
    context.queryClient.ensureQueryData(recentEpisodesQuery),
  ]),
  component: Index,
});

// "Byly u nás" — hosté, co už proběhli. Iniciály jako monogram, jméno PŘÍMO POD kartou.
const PAST_GUESTS = [
  { i: "AŠ", name: "Anna Šulcová", ep: "#112", grad: "linear-gradient(135deg,#ff2d87,#a855f7)" },
  { i: "DP", name: "Dr. Pánková", ep: "#110", grad: "linear-gradient(135deg,#2dd4cf,#6366f1)" },
  { i: "VL", name: "Veronika L.", ep: "#108", grad: "linear-gradient(135deg,#a855f7,#ff2d87)" },
  { i: "MK", name: "Marie K.", ep: "#105", grad: "linear-gradient(135deg,#6366f1,#2dd4cf)" },
];


function Index() {
  const [scroll, setScroll] = useState(0);
  const [form, setForm] = useState({ agree: false, name: "", email: "", tip: "", extra: false });
  const [submitted, setSubmitted] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const { data: latestEpisode } = useSuspenseQuery(latestEpisodeQuery);
  const { data: recentEpisodes } = useSuspenseQuery(recentEpisodesQuery);
  const episodeList = (recentEpisodes && recentEpisodes.length > 0
    ? recentEpisodes
    : latestEpisode
      ? [latestEpisode]
      : []
  ).slice(0, 6);
  const dateFmt = new Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "short", year: "numeric" });
  const latestYtId = latestEpisode?.id ?? FALLBACK_YT_ID;
  const latestUrl = latestEpisode?.url ?? `https://www.youtube.com/watch?v=${FALLBACK_YT_ID}`;
  const latestTitle = latestEpisode?.title ?? "Nejnovější epizoda Zpussy Club";
  const latestDesc = latestEpisode?.description
    ? latestEpisode.description.split("\n").find((l) => l.trim().length > 40) ?? latestEpisode.description.slice(0, 220)
    : "S Annou Šulcovou jsme se pustily do toho, co se děje, když pár překročí práh terapeuta.";
  const latestViews = latestEpisode?.views
    ? `${new Intl.NumberFormat("cs-CZ").format(Math.round(latestEpisode.views / 1000))} tis. zhlédnutí`
    : null;
  const latestDateLabel = latestEpisode?.published
    ? new Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "long", year: "numeric" }).format(new Date(latestEpisode.published))
    : null;

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const formValid = useMemo(
    () => form.agree && form.email.includes("@") && form.tip.trim().length > 1,
    [form],
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid) return;
    setSubmitted(true);
  };

  useEffect(() => {
    fetchProducts(8)
      .then((p) => setProducts(p))
      .catch((e) => {
        console.error(e);
        toast.error("Nepodařilo se načíst produkty.");
      })
      .finally(() => setProductsLoading(false));
  }, []);

  const heroParallax = Math.min(scroll * 0.15, 120);

  return (
    <div className="min-h-screen bg-[var(--ink)] text-white font-body overflow-x-hidden selection:bg-[var(--pink)] selection:text-white">
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.05] mix-blend-overlay grain" />
      <SiteHeader />

      {/* ============= HERO — ilustrace vlevo, obsah vpravo ============= */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-[var(--ink)] flex items-center">
        {/* Atmosférické pozadí */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f2a] via-[var(--ink)] to-[#0a0612]" />
          {/* Color washes */}
          <div className="absolute inset-0 opacity-80" style={{
            background: "radial-gradient(55% 60% at 20% 70%, rgba(255,45,135,0.35), transparent 65%), radial-gradient(45% 55% at 85% 25%, rgba(45,212,207,0.18), transparent 70%)",
          }} />
          {/* Subtle dots */}
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }} />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 w-full pt-28 pb-20">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Ilustrace vlevo */}
            <div className="md:col-span-5 lg:col-span-5 relative order-2 md:order-1">
              {/* Neonová aura — vrstvený blur */}
              <div aria-hidden className="absolute inset-0 -m-10 rounded-[3rem] animate-pulse" style={{
                background: "radial-gradient(closest-side, rgba(255,45,135,0.55), rgba(168,85,247,0.25) 45%, transparent 75%)",
                filter: "blur(40px)",
              }} />
              <div aria-hidden className="absolute inset-0 -m-6 rounded-[3rem]" style={{
                background: "radial-gradient(closest-side, rgba(45,212,207,0.35), transparent 65%)",
                filter: "blur(60px)",
                mixBlendMode: "screen",
              }} />
              {/* Conic neon ring */}
              <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square rounded-full opacity-60 animate-spin" style={{
                background: "conic-gradient(from 0deg, rgba(255,45,135,0), rgba(255,45,135,0.6), rgba(45,212,207,0.5), rgba(168,85,247,0.55), rgba(255,45,135,0))",
                filter: "blur(50px)",
                animationDuration: "18s",
              }} />
              {/* Spotlight u "země" */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[4%] w-[85%] h-28 rounded-full bg-[var(--pink)]/50 blur-3xl" />
              {/* Decor stuha */}
              <div className="absolute -top-4 -left-2 md:-left-4 z-20 rotate-[-8deg] bg-[var(--pink)] text-white font-display font-black uppercase text-xs md:text-sm px-4 py-2 rounded-md shadow-[0_10px_30px_rgba(255,45,135,0.45)]">
                Ivana × Kundosaki
              </div>
              <img
                src={duoIllustration}
                alt="Ivana Heroutová a Kateřina Kundosaki — ilustrace"
                className="relative z-10 w-full h-auto max-w-[520px] mx-auto"
                style={{
                  transform: `translateY(${heroParallax * 0.2}px)`,
                  WebkitMaskImage: "radial-gradient(ellipse 78% 88% at 50% 42%, black 55%, transparent 100%)",
                  maskImage: "radial-gradient(ellipse 78% 88% at 50% 42%, black 55%, transparent 100%)",
                  filter: "drop-shadow(0 0 35px rgba(255,45,135,0.55)) drop-shadow(0 30px 50px rgba(0,0,0,0.55))",
                }}
              />
              {/* Floating sparkles */}
              <span className="absolute top-10 right-6 text-[var(--pink)] text-2xl select-none animate-pulse z-20">✦</span>
              <span className="absolute bottom-24 left-2 text-white/80 text-xl select-none animate-pulse z-20" style={{ animationDelay: "0.7s" }}>♥</span>
              <span className="absolute top-1/3 -right-2 text-[var(--teal)] text-lg select-none animate-pulse z-20" style={{ animationDelay: "1.3s" }}>✦</span>
            </div>

            {/* Obsah vpravo */}
            <div className="md:col-span-7 lg:col-span-7 order-1 md:order-2">
              {/* Status pill */}
              <div className="inline-flex items-center gap-3 bg-white/[0.07] backdrop-blur-xl border border-white/15 rounded-xl pl-2 pr-5 py-1.5 text-[11px] font-semibold mb-8">
                <span className="bg-[var(--pink)] text-white px-2.5 py-0.5 rounded-xl font-black tracking-wider">LIVE</span>
                <span className="opacity-85">Nový díl #112 — středa 19:45</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] animate-pulse" />
              </div>

              {/* Headline */}
              <h1 className="font-display font-black uppercase leading-[0.85] tracking-tighter">
                <span className="block text-[13vw] md:text-[7.5vw] lg:text-[6.5vw]">Mluvíme</span>
                <span className="block text-[13vw] md:text-[7.5vw] lg:text-[6.5vw]">
                  o{" "}
                  <span className="italic font-normal text-[var(--pink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>všem.</span>
                </span>
                <span className="block text-[13vw] md:text-[7.5vw] lg:text-[6.5vw] text-white/20">Bez filtru.</span>
              </h1>

              <p className="mt-8 text-base md:text-lg text-white/80 leading-relaxed max-w-xl">
                Týdenní podcast <strong className="text-white">Ivany Heroutové</strong> a <strong className="text-white">Kateřiny Kundosaki</strong>. O vztazích, sexu, mateřství, prachách i prdelích — jak to fakt je.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={latestUrl} target="_top" rel="noopener noreferrer" className="group inline-flex items-center gap-3 bg-white text-[var(--ink)] pl-2 pr-6 py-2 rounded-xl font-bold text-sm md:text-base hover:scale-[1.03] transition shadow-[0_10px_40px_rgba(255,45,135,0.4)]">
                  <span className="w-10 h-10 rounded-full bg-[var(--pink)] grid place-items-center text-white group-hover:rotate-12 transition">
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><path d="M0 0L12 7L0 14V0Z" fill="currentColor" /></svg>
                  </span>
                  Pustit nejnovější
                </a>
                <Link to="/plus" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/25 hover:border-[var(--pink)] hover:bg-[var(--pink)] font-bold text-sm md:text-base transition">
                  Zpussy+
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 max-w-md border-t border-white/10 pt-6">
                {[["112", "EPIZOD"], ["2.4M", "POSLECHŮ"], ["#1", "ŽEN."]].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-display font-black text-2xl md:text-3xl">{n}</div>
                    <div className="text-[9px] tracking-[0.2em] text-white/50 mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 inset-x-0 flex justify-center">
          <div className="flex items-center gap-2 text-white/50 text-[10px] tracking-[0.3em] font-bold">
            <span className="w-8 h-px bg-white/30" /> SCROLL <span className="w-8 h-px bg-white/30" />
          </div>
        </div>
      </section>


      {/* MARQUEE — viditelný pás */}
      <div className="relative bg-[var(--pink)] text-white py-5 md:py-6 overflow-hidden border-y-2 border-white/10 shadow-[0_10px_40px_-10px_rgba(255,45,135,0.6)]">
        <div className="flex gap-12 animate-marquee whitespace-nowrap font-display font-black text-2xl md:text-4xl uppercase tracking-tight">
          {Array.from({ length: 3 }).flatMap((_, i) =>
            ["mluvíme o všem", "✦", "bez filtru", "♥", "seš fakt dobrá", "✦", "zpussy+ je tady", "♥"].map((t, j) => (
              <span key={`${i}-${j}`} className={j % 2 === 0 ? "" : "text-[var(--teal)]"}>{t}</span>
            )),
          )}
        </div>
      </div>


      {/* ============= MANIFESTO ============= */}
      <section id="about" className="relative py-24 md:py-36 overflow-hidden bg-[var(--ink)]">

        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)] via-[#1a0f2a] to-[var(--ink)]" />
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-12 gap-10 items-end mb-16">
            <div className="md:col-span-7">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--teal)] mb-5">/ 01 — manifesto</div>
              <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tighter">
                Klub, kam si chodíš<br/>
                pro <span className="italic font-normal text-[var(--pink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>pravdu</span>,<br/>
                ne pro <span className="line-through opacity-40">rady.</span>
              </h2>
            </div>
            <div className="md:col-span-5 space-y-5 text-base md:text-lg leading-relaxed text-white/75">
              <p>Začaly jsme u kafe a otázek, na které nám nikdo neuměl odpovědět. Dnes nás posloucháte vy — v autě, na procházce, při kojení, nad žehlením.</p>
              <p className="text-white/55">Bez pózy. Bez „měla bys". S hostkami, co mají co říct, a se sebou navzájem v ráži.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              { k: "Žádné tabu", v: "Mluvíme o věcech, co se mluvit nemají.", c: "bg-[var(--pink)] text-white" },
              { k: "Žádný skript", v: "Co padne, padne. Žádné PR věty.", c: "bg-white text-[var(--ink)]" },
              { k: "Žádná pomsta", v: "Hosté odcházejí celí. Většinou.", c: "bg-[var(--teal)] text-[var(--ink)]" },
              { k: "Žádný filtr", v: "Někdy hloubka, někdy průser.", c: "bg-white/[0.04] text-white border border-white/15" },
            ].map((p) => (
              <div key={p.k} className={`${p.c} rounded-3xl p-8 md:p-10 min-h-[220px] flex flex-col justify-between hover:-translate-y-2 transition duration-500`}>
                <div className="font-display font-black text-2xl md:text-[28px] leading-[1.05] tracking-tight">{p.k}</div>
                <div className="mt-6 text-sm md:text-[15px] opacity-85 leading-relaxed">{p.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= HOSTÉ / DUO ============= */}
      <section id="hosts" className="relative py-24 md:py-36 bg-gradient-to-b from-[var(--ink)] via-[#160c25] to-[var(--ink)] text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="mb-16 md:mb-20 max-w-3xl">
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--pink)] mb-4">/ 02 — duo</div>
            <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tighter">
              Dvě holky,<br/>
              jeden <span className="italic font-normal text-[var(--pink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>Zpussy Club</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {[
              { img: ivanaImg, name: "Ivana", surname: "Heroutová", handle: "@ivana_fancy", bio: "Moderátorka, máma, holka, co řekne, co si myslí. V klubu si hraje s otázkami, na které si jiní netroufnou." },
              { img: kundosakiImg, name: "Kateřina", surname: "Kundosaki", handle: "@kundosaki_", bio: "Producentka, vizuálka, ironie v devadesáti procentech vět. Drží mikrofony i tempo." },
            ].map((h, i) => (
              <article key={h.handle} className={`group ${i === 1 ? "md:translate-y-12" : ""}`}>
                <div className="relative overflow-hidden rounded-[18px] bg-black/40 aspect-[4/5] border border-white/10">
                  <img src={h.img} alt={`${h.name} ${h.surname}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-[1200ms] ease-out" />
                </div>
                <div className="mt-6 md:mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display font-black text-4xl md:text-5xl leading-[0.9] tracking-tighter">
                    {h.name} <span className="text-[var(--pink)]">{h.surname}</span>
                  </h3>
                  <span className="text-white/50 text-sm font-bold">{h.handle}</span>
                </div>
                <p className="mt-4 text-white/65 leading-relaxed text-base md:text-lg max-w-md">{h.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ============= YOUTUBE NEJNOVĚJŠÍ EPIZODA ============= */}
      <section className="relative py-24 md:py-32 bg-[var(--ink)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{
          background: "radial-gradient(60% 50% at 30% 50%, rgba(255,45,135,0.35), transparent 70%), radial-gradient(50% 50% at 80% 50%, rgba(45,212,207,0.25), transparent 70%)",
        }} />
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--teal)] mb-4">/ na YouTube</div>
            <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter">
              Nejnovější <span className="italic font-normal text-[var(--pink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>epizoda</span>.
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Info k epizodě */}
            <div className="lg:col-span-4 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur border border-white/10 rounded-xl px-4 py-1.5 text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink)] animate-pulse" />
                Novinka{latestDateLabel ? ` · ${latestDateLabel}` : ""}
              </div>
              <h3 className="font-display font-black text-2xl md:text-3xl leading-tight tracking-tight">
                {latestTitle}
              </h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                {latestDesc}
              </p>
              {latestViews && (
                <div className="flex flex-wrap items-center gap-4 text-xs text-white/50 font-bold">
                  <span>{latestViews}</span>
                </div>
              )}
              <div className="flex flex-wrap gap-3 pt-2">
                <a href={latestUrl} target="_top" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[var(--pink)] hover:bg-white hover:text-[var(--pink)] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition">
                  Přehrát na YouTube →
                </a>
                <a href="https://www.youtube.com/@ZpusyClub" target="_top" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 px-5 py-2.5 rounded-xl text-sm font-bold transition">
                  Všechny epizody
                </a>
              </div>
            </div>

            {/* Video embed */}
            <div className="lg:col-span-8">
              <div className="relative max-w-3xl mx-auto">
                {/* Dekorativní glow */}
                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[var(--pink)]/40 to-[var(--teal)]/20 blur-2xl opacity-60" />
                {/* Dekorativní rám */}
                <div className="relative rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_-15px_rgba(255,45,135,0.45)] bg-[var(--ink)]">
                  <div className="aspect-video relative">
                    <iframe
                      key={latestYtId}
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${latestYtId}?rel=0&modestbranding=1`}
                      title={latestTitle}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-2 md:-right-4 z-10 rotate-[-6deg] bg-white text-[var(--ink)] font-display font-black text-xs md:text-sm px-4 py-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                  Nová epizoda
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============= GUEST SUGGESTION FORM + "BYLY U NÁS" ============= */}
      <section id="guest-tip" className="relative py-24 md:py-40 bg-[var(--ink)] text-white overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[var(--pink)]/25 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[var(--teal)]/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* LEFT: copy */}
            <div className="lg:col-span-5">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--teal)] mb-5">/ 03 — tip na hosta</div>
              <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[0.88] tracking-tighter">
                Koho bychom měly<br/>
                <span className="italic font-normal text-[var(--pink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>pozvat?</span>
              </h2>
              <p className="mt-6 text-white/75 text-base md:text-lg leading-relaxed max-w-md">
                Milé kněžny, Zpussy Club je hlavně o vás. Pošlete nám tip, koho byste chtěly slyšet jako prvního hosta. Odměna vás nemine 💋
              </p>

              <div className="mt-10 flex items-start gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10 max-w-md">
                <div className="w-10 h-10 rounded-full bg-[var(--pink)] grid place-items-center shrink-0 text-lg">💋</div>
                <div className="text-sm text-white/80 leading-relaxed">
                  Vylosujeme jednu z vás a pošleme balíček.<br/>
                  <span className="text-white/50">Soutěž běží do 31. 12. 2025.</span>
                </div>
              </div>
            </div>

            {/* RIGHT: form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="bg-white text-[var(--ink)] rounded-[2rem] p-8 md:p-12 text-center shadow-[0_30px_80px_-20px_rgba(255,45,135,0.5)]">
                  <div className="w-16 h-16 rounded-full bg-[var(--pink)] text-white mx-auto grid place-items-center text-3xl mb-6">♥</div>
                  <h3 className="font-display font-black text-3xl md:text-4xl tracking-tight">Děkujeme, kněžno!</h3>
                  <p className="mt-3 text-black/65 max-w-md mx-auto">Tvůj tip přistál v naší schránce. Kdyby vyhrál dáreček, ozveme se na <strong>{form.email}</strong>.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ agree: false, name: "", email: "", tip: "", extra: false }); }} className="mt-8 inline-flex items-center gap-2 bg-[var(--ink)] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[var(--pink)] transition">
                    Pošlu další tip →
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="bg-white text-[var(--ink)] rounded-[2rem] p-6 md:p-10 shadow-[0_30px_80px_-20px_rgba(255,45,135,0.5)] space-y-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--pink)] mb-2">Soutěž</div>
                    <h3 className="font-display font-black text-2xl md:text-3xl tracking-tight">Pošli nám svůj <span className="italic font-normal text-[var(--pink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>tip</span></h3>
                  </div>

                  {/* Agree */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={form.agree}
                      onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                      className="mt-1 w-5 h-5 rounded accent-[var(--pink)] cursor-pointer"
                      required
                    />
                    <span className="text-sm leading-relaxed">
                      Souhlasím s <a href="#" className="underline decoration-[var(--pink)] underline-offset-4">podmínkami soutěže</a>. <span className="text-[var(--pink)]">*</span>
                    </span>
                  </label>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-2">Křestní jméno</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Eliška"
                        className="w-full bg-black/[0.04] rounded-xl px-4 py-3 text-sm font-semibold placeholder:text-black/30 outline-none focus:ring-2 focus:ring-[var(--pink)] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-2">E-mail <span className="text-[var(--pink)]">*</span></label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="eliska@email.cz"
                        required
                        className="w-full bg-black/[0.04] rounded-xl px-4 py-3 text-sm font-semibold placeholder:text-black/30 outline-none focus:ring-2 focus:ring-[var(--pink)] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
                      💋 Soutěžní otázka: Kdo by se měl stát naším prvním hostem? <span className="text-[var(--pink)]">*</span>
                    </label>
                    <textarea
                      value={form.tip}
                      onChange={(e) => setForm({ ...form, tip: e.target.value })}
                      placeholder="Napiš jméno a proč právě ona/on…"
                      rows={4}
                      required
                      className="w-full bg-black/[0.04] rounded-xl px-4 py-3 text-sm font-semibold placeholder:text-black/30 outline-none focus:ring-2 focus:ring-[var(--pink)] transition resize-none"
                    />
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.extra}
                      onChange={(e) => setForm({ ...form, extra: e.target.checked })}
                      className="w-5 h-5 rounded accent-[var(--pink)] cursor-pointer"
                    />
                    <span className="text-sm leading-relaxed">Chci extra dáreček :))</span>
                  </label>

                  <button
                    type="submit"
                    disabled={!formValid}
                    className="w-full bg-[var(--ink)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl hover:bg-[var(--pink)] transition flex items-center justify-center gap-2 group"
                  >
                    Odeslat tip
                    <span className="group-hover:translate-x-1 transition">→</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* "BYLY U NÁS" — hosté, co už proběhli */}
          <div className="mt-28 md:mt-40">
            <div className="mb-12 md:mb-16">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--teal)] mb-3">/ archiv</div>
              <h3 className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.9]">
                Byly <span className="italic font-normal text-[var(--pink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>u nás</span>.
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {PAST_GUESTS.map((g) => (
                <article key={g.name} className="group">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group-hover:-translate-y-1 transition duration-500">
                    <div className="absolute inset-0" style={{ background: g.grad }} />
                    <div className="absolute inset-0 grain opacity-25" />
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="font-display font-black text-6xl md:text-7xl text-white/95 tracking-tighter">{g.i}</span>
                    </div>
                    <div className="absolute top-3 right-3 text-[10px] tracking-wider font-black bg-[var(--ink)]/80 backdrop-blur text-white px-2.5 py-1 rounded-xl">
                      EP {g.ep}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="font-display font-bold text-lg md:text-xl leading-tight text-white">{g.name}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============= EPISODES ============= */}
      <section id="episodes" className="relative py-24 md:py-36 bg-gradient-to-b from-[var(--ink)] via-[#160c25] to-[var(--ink)] text-white overflow-hidden border-t border-white/10">
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between flex-wrap gap-8 mb-14">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--pink)] mb-4">/ 04 — epizody</div>
              <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tighter">
                Pusť <span className="italic font-normal text-[var(--pink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>si.</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 self-end">
              {[
                { label: "Spotify", href: "#" },
                { label: "Apple", href: "#" },
                { label: "YouTube", href: "https://www.youtube.com/@ZpusyClub" },
                { label: "Zpussy+", href: "/plus" },
              ].map((item) => (
                item.label === "Zpussy+" ? (
                  <Link key={item.label} to="/plus" className="border border-white/15 px-4 py-3 rounded-[10px] text-xs font-bold hover:bg-[var(--pink)] hover:text-white hover:border-[var(--pink)] hover:-translate-y-0.5 transition text-center">{item.label}</Link>
                ) : (
                  <a key={item.label} href={item.href} target={item.label === "YouTube" ? "_top" : undefined} rel={item.label === "YouTube" ? "noopener noreferrer" : undefined} className="border border-white/15 px-4 py-3 rounded-[10px] text-xs font-bold hover:bg-[var(--pink)] hover:text-white hover:border-[var(--pink)] hover:-translate-y-0.5 transition text-center">{item.label}</a>
                )
              ))}
            </div>
          </div>

          {episodeList.length === 0 ? (
            <div className="border-t border-white/10 py-16 text-center text-white/60 text-sm">
              Epizody se zrovna načítají. Mrkni na{" "}
              <a href="https://www.youtube.com/@ZpusyClub" target="_top" rel="noopener noreferrer" className="text-[var(--pink)] underline">
                YouTube kanál Zpussy Club
              </a>
              .
            </div>
          ) : (
            <ul className="border-t border-white/10">
              {episodeList.map((e, idx) => {
                const date = e.published ? dateFmt.format(new Date(e.published)) : "";
                const views = e.views ? `${new Intl.NumberFormat("cs-CZ").format(Math.round(e.views / 1000))} tis. zhlédnutí` : null;
                return (
                  <li key={e.id} className="group border-b border-white/10 hover:bg-white/[0.03] transition">
                    <a
                      href={e.url}
                      target="_top"
                      rel="noopener noreferrer"
                      className="grid grid-cols-[auto_auto_1fr_auto] gap-4 md:gap-8 items-center py-6 md:py-8 px-2 md:px-4"
                    >
                      <span
                        aria-hidden
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full grid place-items-center shrink-0 bg-white text-[var(--ink)] group-hover:bg-[var(--pink)] group-hover:text-white group-hover:scale-110 transition"
                      >
                        <svg width="16" height="18" viewBox="0 0 14 16"><path d="M0 0L14 8L0 16V0Z" fill="currentColor" /></svg>
                      </span>
                      <div className="hidden md:block font-display font-black text-5xl text-white/15 tabular-nums w-20">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 text-[11px] text-white/55 mb-1.5 font-bold tracking-wider uppercase flex-wrap">
                          {date && <span>{date}</span>}
                          {views && (
                            <>
                              <span>·</span>
                              <span>{views}</span>
                            </>
                          )}
                          <span className="text-[var(--pink)]">#youtube</span>
                          {idx === 0 && <span className="bg-[var(--teal)] text-[var(--ink)] px-2 py-0.5 rounded-[6px] text-[10px] font-black">NEW</span>}
                        </div>
                        <div className="font-display font-bold text-lg md:text-2xl lg:text-3xl leading-snug group-hover:text-[var(--pink)] transition">
                          {e.title}
                        </div>
                      </div>
                      <div className="hidden md:flex items-center gap-2 text-sm text-white/40 group-hover:text-[var(--pink)] transition font-bold">
                        <span className="opacity-0 group-hover:opacity-100 transition">YouTube</span>
                        <span className="text-2xl">→</span>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

      </section>


      {/* ============= MERCH TEASER -> /shop ============= */}
      <section id="merch" className="relative py-24 md:py-36 bg-[#0a0612] text-white overflow-hidden border-t border-white/10">
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] bg-[var(--pink)]/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between flex-wrap gap-8 mb-12">
            <div className="max-w-2xl">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--pink)] mb-4">/ 05 — shop</div>
              <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tighter">
                Nos to <span className="italic font-normal text-[var(--pink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>na sobě</span>.
              </h2>
              <p className="mt-6 text-white/70 text-base md:text-lg max-w-md">Limitovaná kapsle. Heavyweight střihy, kvalitní bavlna, žádný „rychlý merch".</p>
            </div>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-[var(--pink)] text-white px-6 py-3.5 rounded-[10px] font-bold text-sm hover:bg-white hover:text-[var(--ink)] transition">
              Otevřít celý shop →
            </Link>
          </div>

          {productsLoading ? (
            <div className="py-16 grid place-items-center">
              <Loader2 className="w-6 h-6 animate-spin text-white/50" />
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
              {products.slice(0, 4).map((p, i) => {
                const node = p.node;
                const image = node.images.edges[0]?.node;
                const price = node.priceRange.minVariantPrice;
                return (
                  <Link key={node.id} to="/product/$handle" params={{ handle: node.handle }} className="group block">
                    <div className="relative rounded-[14px] aspect-square overflow-hidden bg-black/40 grid place-items-center transition duration-500 group-hover:-translate-y-1 border border-white/10">
                      <div className="absolute inset-0 grain opacity-20 pointer-events-none" />
                      {image ? (
                        <img src={image.url} alt={image.altText ?? node.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-display font-black text-5xl md:text-6xl tracking-tighter opacity-25 select-none">©</span>
                      )}
                      <span className="absolute bottom-3 right-4 text-[10px] font-mono opacity-60 text-white">0{i + 1}</span>
                    </div>
                    <div className="mt-3 flex items-baseline justify-between gap-3">
                      <div className="font-display font-bold text-sm md:text-base leading-tight text-white">{node.title}</div>
                      <div className="text-xs md:text-sm font-black tabular-nums shrink-0 text-[var(--pink)]">{parseFloat(price.amount).toFixed(0)} {price.currencyCode}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>


      {/* ============= CTA -> /plus ============= */}
      <section className="relative py-32 md:py-40 bg-[var(--pink)] text-white overflow-hidden">
        {/* plynulý přechod z ink do pink */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-32 md:h-40 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, var(--ink) 0%, transparent 100%)" }} />
        <div className="absolute inset-0 opacity-40" style={{
          background: "radial-gradient(circle at 20% 30%, rgba(45,212,207,0.6), transparent 50%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.6), transparent 50%)",
        }} />
        <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--ink)] mb-5">/ premium</div>
          <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.88] mb-6">
            Chceš <span className="italic font-normal text-[var(--ink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>víc</span>?<br/>
            Hodně víc.
          </h2>
          <p className="max-w-xl mx-auto text-base md:text-lg opacity-95 mb-10">
            <strong>Delší a necenzurované verze</strong> všech podcastů z YouTube — plus bonusy, hlasovky, blog jen pro členky a komunita. Všechno na <strong>Zpussy+</strong>.
          </p>
          <Link to="/plus" className="inline-flex items-center gap-3 bg-[var(--ink)] text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white hover:text-[var(--pink)] transition hover:scale-105">
            Otevřít Zpussy+
            <span>→</span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

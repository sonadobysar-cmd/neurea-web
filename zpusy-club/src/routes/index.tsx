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
import { ABOUT, BRAND, CONTACT, CTA_PLUS, FAQ, HERO, HOSTS, MARQUEE } from "@/lib/site-copy";

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
      { title: "ZpusyClub — mámy, kamarádky, holky" },
      { name: "description", content: "Podcast pro holky, co si neberou servítky. Humor, péče, žádná póza." },
      { property: "og:title", content: "ZpusyClub" },
      { property: "og:description", content: BRAND.tagline },
      { property: "og:image", content: heroDuo.url },
    ],
  }),
  loader: ({ context }) => Promise.all([
    context.queryClient.ensureQueryData(latestEpisodeQuery),
    context.queryClient.ensureQueryData(recentEpisodesQuery),
  ]),
  component: Index,
});

// Odstraněno — archiv hostů doplníme z reálných epizod

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

      {/* Hero + marquee — ilustrace sedí na růžovém pásu */}
      <div className="relative">
      <section ref={heroRef} className="relative overflow-visible bg-[var(--ink)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f2a] via-[var(--ink)] to-[#0a0612]" />
          <div className="absolute inset-0 opacity-80" style={{
            background: "radial-gradient(55% 60% at 20% 70%, rgba(255,45,135,0.35), transparent 65%), radial-gradient(45% 55% at 85% 25%, rgba(45,212,207,0.18), transparent 70%)",
          }} />
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }} />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 w-full pt-24 pb-0 md:pt-28">
          <div className="grid md:grid-cols-12 gap-6 md:gap-8 lg:gap-6 items-start md:items-center">
            {/* Ilustrace — větší, stažená dolů na marquee */}
            <div className="md:col-span-4 lg:col-span-4 relative order-2 md:order-1 -mx-6 sm:-mx-4 md:mx-0 md:self-end z-20">
              <div aria-hidden className="absolute inset-0 -m-8 md:-m-10 opacity-50 md:opacity-70" style={{
                background: "radial-gradient(closest-side, rgba(255,45,135,0.4), transparent 70%)",
                filter: "blur(50px)",
              }} />
              {/* Růžové heslo — Lovable text, mezi ilustrací a headline (výška kurzoru) */}
              <div className="absolute top-[18%] sm:top-[19%] md:top-[20%] right-[-0.25rem] sm:right-[-1rem] md:right-[-2rem] lg:right-[-3rem] xl:right-[-4rem] z-40 rotate-[-8deg] bg-[var(--pink)] text-white font-display font-black uppercase text-xs sm:text-sm md:text-sm lg:text-base px-4 py-2 rounded-md shadow-[0_10px_30px_rgba(255,45,135,0.45)] whitespace-nowrap pointer-events-none">
                {HERO.badge}
              </div>
              <div
                className="hero-illus-wrap relative mx-auto w-full max-w-[min(100%,32rem)] sm:max-w-[36rem] md:max-w-[40rem] lg:max-w-[44rem] mb-[-2.5rem] sm:mb-[-3.5rem] md:mb-[-5.5rem] lg:mb-[-7rem]"
                style={{ transform: `translateY(${12 + heroParallax * 0.05}px)` }}
              >
                <div className="hero-illus-scale">
                  <img
                    src={duoIllustration}
                    alt="ZpusyClub — mámy, kamarádky, holky"
                    className="hero-illus-img"
                  />
                </div>
              </div>
            </div>

            {/* Obsah — posunutý víc doprava */}
            <div className="md:col-span-8 lg:col-span-8 md:col-start-5 order-1 md:order-2 text-center md:text-left pb-6 md:pb-16 md:pl-4 lg:pl-10 xl:pl-16">
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/[0.07] backdrop-blur-xl border border-white/15 rounded-xl pl-2 pr-4 sm:pr-5 py-1.5 text-[10px] sm:text-[11px] font-semibold mb-6 md:mb-8">
                <span className="bg-[var(--pink)] text-white px-2 py-0.5 rounded-xl font-black tracking-wider">LIVE</span>
                <span className="opacity-85">{HERO.pill}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] animate-pulse shrink-0" />
              </div>

              <h1 className="font-display font-black leading-[0.92] md:leading-[0.88] tracking-tighter">
                {HERO.headline.map((line, i) => (
                  <span
                    key={line}
                    className={`block text-[10.5vw] sm:text-[9vw] md:text-[7vw] lg:text-[5.5rem] ${i === 1 ? "italic font-normal text-[var(--pink)]" : ""}`}
                    style={i === 1 ? { fontFamily: '"Instrument Serif", serif' } : undefined}
                  >
                    {line}
                  </span>
                ))}
              </h1>

              <p className="mt-6 md:mt-8 text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-xl mx-auto md:mx-0">
                {HERO.sub}
              </p>

              <div className="mt-6 md:mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
                <a href={latestUrl} target="_top" rel="noopener noreferrer" className="group inline-flex items-center gap-3 bg-white text-[var(--ink)] pl-2 pr-5 sm:pr-6 py-2 rounded-xl font-bold text-sm md:text-base hover:scale-[1.03] transition shadow-[0_10px_40px_rgba(255,45,135,0.4)]">
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--pink)] grid place-items-center text-white group-hover:rotate-12 transition shrink-0">
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><path d="M0 0L12 7L0 14V0Z" fill="currentColor" /></svg>
                  </span>
                  {HERO.ctaPlay}
                </a>
                <Link to="/plus" className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-white/25 hover:border-[var(--pink)] hover:bg-[var(--pink)] font-bold text-sm md:text-base transition">
                  {HERO.ctaClub}
                </Link>
              </div>

              <div className="mt-8 md:mt-10 grid grid-cols-3 gap-2 sm:gap-3 max-w-xl mx-auto md:mx-0 border-t border-white/10 pt-5 md:pt-6">
                {HERO.stats.map(([n, l]) => (
                  <div key={l} className="bg-white/[0.05] backdrop-blur border border-white/10 rounded-xl px-2 sm:px-3 py-3 sm:py-4 text-center min-w-0">
                    <div className="font-display font-black text-sm sm:text-base md:text-lg leading-tight">{n}</div>
                    <div className="text-[7px] sm:text-[8px] tracking-[0.15em] text-white/50 mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE — pod nohama ilustrace */}
      <div className="relative z-10 bg-[var(--pink)] text-white py-4 md:py-6 overflow-hidden border-y-2 border-white/10 shadow-[0_10px_40px_-10px_rgba(255,45,135,0.6)]">
        <div className="flex gap-8 md:gap-12 animate-marquee whitespace-nowrap font-display font-black text-xl sm:text-2xl md:text-4xl uppercase tracking-tight">
          {Array.from({ length: 3 }).flatMap((_, i) =>
            MARQUEE.map((t, j) => (
              <span key={`${i}-${j}`} className={j % 2 === 0 ? "" : "text-[var(--teal)]"}>{t}</span>
            )),
          )}
        </div>
      </div>
      </div>


      {/* ============= MANIFESTO ============= */}
      <section id="about" className="relative py-16 md:py-36 overflow-hidden bg-[var(--ink)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)] via-[#1a0f2a] to-[var(--ink)]" />
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-end mb-12 md:mb-16">
            <div className="md:col-span-7">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--teal)] mb-4 md:mb-5">{ABOUT.label}</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.92] md:leading-[0.88] tracking-tighter">
                {ABOUT.title.map((line, i) => (
                  <span key={line} className="block">
                    {i === 2 ? (
                      <span className="italic font-normal text-[var(--pink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </h2>
            </div>
            <div className="md:col-span-5 space-y-4 md:space-y-5 text-sm sm:text-base md:text-lg leading-relaxed text-white/75">
              {ABOUT.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {ABOUT.pillars.map((p, idx) => {
              const styles = [
                "bg-[var(--pink)] text-white",
                "bg-white text-[var(--ink)]",
                "bg-[var(--teal)] text-[var(--ink)]",
                "bg-white/[0.04] text-white border border-white/15",
              ];
              return (
                <div key={p.k} className={`${styles[idx]} rounded-3xl p-6 sm:p-8 md:p-10 min-h-[180px] md:min-h-[220px] flex flex-col justify-between hover:-translate-y-2 transition duration-500`}>
                  <div className="font-display font-black text-xl sm:text-2xl md:text-[28px] leading-[1.05] tracking-tight">{p.k}</div>
                  <div className="mt-4 md:mt-6 text-sm md:text-[15px] opacity-85 leading-relaxed">{p.v}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============= HOSTÉ / DUO ============= */}
      <section id="hosts" className="relative py-16 md:py-36 bg-gradient-to-b from-[var(--ink)] via-[#160c25] to-[var(--ink)] text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="mb-12 md:mb-20 max-w-3xl">
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--pink)] mb-4">{HOSTS.label}</div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.92] md:leading-[0.88] tracking-tighter">
              {HOSTS.title.map((line, i) => (
                <span key={line} className="block">
                  {i === 2 ? (
                    <span className="italic font-normal text-[var(--pink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {[
              { img: ivanaImg, ...HOSTS.ivana },
              { img: kundosakiImg, ...HOSTS.katerina },
            ].map((h, i) => (
              <article key={h.name} className={`group ${i === 1 ? "md:translate-y-8 lg:translate-y-12" : ""}`}>
                <div className="relative overflow-hidden rounded-[18px] bg-black/40 aspect-[4/5] max-h-[28rem] md:max-h-none border border-white/10">
                  <img src={h.img} alt={`${h.name} ${h.surname}`} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-[1200ms] ease-out" />
                </div>
                <div className="mt-5 md:mt-8">
                  <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl leading-[0.9] tracking-tighter">
                    {h.name} <span className="text-[var(--pink)]">{h.surname}</span>
                  </h3>
                  <p className="mt-4 text-white/70 leading-relaxed text-sm sm:text-base md:text-lg">{h.bio}</p>
                  <p className="mt-4 text-[var(--pink)] font-bold text-sm md:text-base italic">{h.signoff}</p>
                </div>
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
      <section id="guest-tip" className="relative py-16 md:py-32 bg-[var(--ink)] text-white overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[var(--pink)]/25 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--teal)] mb-4 md:mb-5">{CONTACT.label}</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.92] md:leading-[0.88] tracking-tighter">
                {CONTACT.title.map((line, i) => (
                  <span key={line} className="block">
                    {i === 0 || i === 2 ? (
                      <span className="italic font-normal text-[var(--pink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </h2>
              <p className="mt-5 md:mt-6 text-white/75 text-sm sm:text-base md:text-lg leading-relaxed max-w-md">{CONTACT.body}</p>
              <a href={`mailto:${CONTACT.email}`} className="inline-block mt-6 font-display font-bold text-xl md:text-2xl text-[var(--pink)] hover:text-white transition break-all">
                {CONTACT.email}
              </a>
            </div>

            <div className="lg:col-span-7">
              {submitted ? (
                <div className="bg-white text-[var(--ink)] rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-12 text-center shadow-[0_30px_80px_-20px_rgba(255,45,135,0.5)]">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[var(--pink)] text-white mx-auto grid place-items-center text-2xl md:text-3xl mb-5 md:mb-6">♥</div>
                  <h3 className="font-display font-black text-2xl md:text-4xl tracking-tight">Díky, kněžno!</h3>
                  <p className="mt-3 text-black/65 max-w-md mx-auto text-sm md:text-base">Zpráva přistála v naší schránce. Ozveme se na <strong>{form.email}</strong>.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ agree: false, name: "", email: "", tip: "", extra: false }); }} className="mt-8 inline-flex items-center gap-2 bg-[var(--ink)] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[var(--pink)] transition">
                    Napsat znovu →
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="bg-white text-[var(--ink)] rounded-[1.5rem] md:rounded-[2rem] p-5 sm:p-6 md:p-10 shadow-[0_30px_80px_-20px_rgba(255,45,135,0.5)] space-y-5 md:space-y-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--pink)] mb-2">Kontakt</div>
                    <h3 className="font-display font-black text-2xl md:text-3xl tracking-tight">Napiš nám</h3>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={form.agree}
                      onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                      className="mt-1 w-5 h-5 rounded accent-[var(--pink)] cursor-pointer shrink-0"
                      required
                    />
                    <span className="text-sm leading-relaxed">
                      Souhlasím se zpracováním osobních údajů. <span className="text-[var(--pink)]">*</span>
                    </span>
                  </label>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-2">Jméno</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Tvoje jméno"
                        className="w-full bg-black/[0.04] rounded-xl px-4 py-3 text-sm font-semibold placeholder:text-black/30 outline-none focus:ring-2 focus:ring-[var(--pink)] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-2">E-mail <span className="text-[var(--pink)]">*</span></label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="tvuj@email.cz"
                        required
                        className="w-full bg-black/[0.04] rounded-xl px-4 py-3 text-sm font-semibold placeholder:text-black/30 outline-none focus:ring-2 focus:ring-[var(--pink)] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
                      Zpráva <span className="text-[var(--pink)]">*</span>
                    </label>
                    <textarea
                      value={form.tip}
                      onChange={(e) => setForm({ ...form, tip: e.target.value })}
                      placeholder="Tip na téma, spolupráci nebo cokoliv, co tě trápí…"
                      rows={4}
                      required
                      className="w-full bg-black/[0.04] rounded-xl px-4 py-3 text-sm font-semibold placeholder:text-black/30 outline-none focus:ring-2 focus:ring-[var(--pink)] transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!formValid}
                    className="w-full bg-[var(--ink)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 md:py-4 rounded-xl hover:bg-[var(--pink)] transition flex items-center justify-center gap-2 group"
                  >
                    Odeslat zprávu
                    <span className="group-hover:translate-x-1 transition">→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-16 md:py-28 bg-gradient-to-b from-[var(--ink)] via-[#160c25] to-[var(--ink)] text-white border-t border-white/10">
        <div className="max-w-[900px] mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-14">
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--teal)] mb-4">/ často se ptáte</div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-6xl tracking-tighter">Máme odpovědi.</h2>
          </div>
          <div className="grid gap-3">
            {FAQ.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-white/10 bg-white/[0.03] open:bg-white/[0.06] transition">
                <summary className="cursor-pointer list-none px-5 py-4 md:px-6 md:py-5 font-display font-bold text-base md:text-lg flex items-center justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="text-[var(--pink)] text-xl shrink-0 group-open:rotate-45 transition">+</span>
                </summary>
                <div className="px-5 pb-4 md:px-6 md:pb-5 text-sm md:text-base text-white/70 leading-relaxed border-t border-white/5 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
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
                      className="flex flex-col sm:grid sm:grid-cols-[auto_1fr] md:grid-cols-[auto_auto_1fr_auto] gap-3 sm:gap-4 md:gap-8 items-start sm:items-center py-5 sm:py-6 md:py-8 px-2 md:px-4"
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
              <p className="mt-4 md:mt-6 text-white/70 text-sm sm:text-base md:text-lg max-w-md">Merch ZpusyClub — pro kněžny, co chtějí nosit svou komunitu na sobě.</p>
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
      <section className="relative py-20 md:py-40 bg-[var(--pink)] text-white overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-0 h-24 md:h-40 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, var(--ink) 0%, transparent 100%)" }} />
        <div className="absolute inset-0 opacity-40" style={{
          background: "radial-gradient(circle at 20% 30%, rgba(45,212,207,0.6), transparent 50%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.6), transparent 50%)",
        }} />
        <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--ink)] mb-4 md:mb-5">{CTA_PLUS.label}</div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.92] md:leading-[0.88] mb-5 md:mb-6">
            {CTA_PLUS.title.map((line, i) => (
              <span key={line} className="block">{i === 0 ? <span className="italic font-normal text-[var(--ink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>{line}</span> : line}</span>
            ))}
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg opacity-95 mb-8 md:mb-10 px-2">
            {CTA_PLUS.body}
          </p>
          <Link to="/plus" className="inline-flex items-center gap-3 bg-[var(--ink)] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-white hover:text-[var(--pink)] transition hover:scale-105">
            {CTA_PLUS.button}
            <span>→</span>
          </Link>
          <p className="mt-6 text-sm font-bold opacity-90">{BRAND.signoff}</p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import logo from "../assets/zpusy/logo-transparent.png";

const NAV = [
  { l: "Domů", to: "/" as const, hash: undefined },
  { l: "Manifest", to: "/" as const, hash: "about" },
  { l: "Hosté", to: "/" as const, hash: "hosts" },
  { l: "Epizody", to: "/" as const, hash: "episodes" },
  { l: "Shop", to: "/shop" as const, hash: undefined },
  { l: "Zpussy+", to: "/plus" as const, hash: undefined },
];

export function SiteHeader() {
  const [scroll, setScroll] = useState(0);
  const [signedIn, setSignedIn] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSignedIn(!!s));
    return () => {
      window.removeEventListener("scroll", onScroll);
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scroll > 40 ? "backdrop-blur-xl bg-black/55 border-b border-white/10" : "bg-transparent"}`}>
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img src={logo} alt="Zpussy Club" className="h-10 md:h-11 w-auto drop-shadow-[0_4px_20px_rgba(255,45,135,0.6)] group-hover:rotate-12 transition duration-500" />
          <span className="hidden sm:inline font-display font-black text-sm tracking-tight">ZPUSSY<span className="text-[var(--pink)]">©</span></span>
        </Link>
        <nav className="hidden md:flex gap-1 text-[13px] font-semibold bg-white/[0.04] backdrop-blur rounded-xl p-1 border border-white/10">
          {NAV.map((n) => {
            const active = n.to === pathname && !n.hash;
            if (n.hash && pathname === "/") {
              return (
                <a key={n.l} href={`#${n.hash}`} className="px-4 py-2 rounded-xl hover:bg-[var(--pink)] hover:text-white transition">{n.l}</a>
              );
            }
            return (
              <Link
                key={n.l}
                to={n.to}
                hash={n.hash}
                className={`px-4 py-2 rounded-xl transition ${active ? "bg-[var(--pink)] text-white" : "hover:bg-[var(--pink)] hover:text-white"}`}
              >
                {n.l}
              </Link>
            );
          })}
        </nav>
        <Link to={signedIn ? "/plus/dashboard" : "/plus"} className="relative inline-flex items-center gap-2 bg-[var(--pink)] hover:bg-white hover:text-[var(--pink)] text-white px-4 md:px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-[0_8px_30px_-5px_rgba(255,45,135,0.6)] shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="hidden sm:inline">{signedIn ? "Můj klub" : "Vstup do klubu"}</span>
          <span className="sm:hidden">Klub</span>
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-[var(--ink)] py-20 text-white relative overflow-hidden border-t border-white/10">
      <div className="absolute bottom-0 inset-x-0 font-display font-black text-[28vw] leading-[0.75] text-white/[0.04] text-center pointer-events-none select-none tracking-tighter">
        ZPUSSY
      </div>
      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          <div>
            <img src={logo} alt="Zpussy Club" className="h-16 w-auto mb-4 drop-shadow-[0_4px_20px_rgba(255,45,135,0.5)]" />
            <p className="text-sm text-white/70 max-w-xs">Podcast Ivany &amp; Kundosaki. Nový díl každou středu v 19:45. Bonusy v klubu Zpussy+.</p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Napiš nám</div>
            <a href="mailto:ahoj@zpusyclub.cz" className="font-display font-bold text-2xl md:text-3xl hover:text-[var(--pink)] transition block break-all">ahoj@zpusyclub.cz</a>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Sleduj</div>
            <div className="flex flex-col gap-2">
              {[
                ["Instagram", "@zpusyclub", "https://instagram.com/zpusyclub"],
                ["YouTube", "@ZpusyClub", "https://www.youtube.com/@ZpusyClub"],
                ["Spotify", "Zpussy Club", "#"],
                ["Zpussy+", "plus.zpusyclub.cz", "/plus"],
              ].map(([s, h, url]) => {
                const isExternal = url.startsWith("http");
                const isYouTube = url.includes("youtube.com");
                return (
                  <a key={s} href={url} target={isExternal ? (isYouTube ? "_top" : "_blank") : undefined} rel={isExternal ? "noopener noreferrer" : undefined} className="group flex items-baseline justify-between gap-4 border-b border-white/15 pb-2 hover:border-[var(--pink)]">
                    <span className="font-display font-bold text-lg group-hover:text-[var(--pink)] transition">{s}</span>
                    <span className="text-xs text-white/50 truncate">{h}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-white/15 flex flex-wrap gap-3 justify-between text-xs text-white/50 font-mono">
          <span>© {new Date().getFullYear()} Zpussy Club ®</span>
          <span>Mluvíme o všem. Made with ♥ in Praha.</span>
        </div>
      </div>
    </footer>
  );
}

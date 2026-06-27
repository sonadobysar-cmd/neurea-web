import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import logo from "../assets/zpusy/logo-transparent.png";

const NAV = [
  { l: "ZPUSYCLUB", to: "/" as const, hash: "about" },
  { l: "Kdo jsme", to: "/" as const, hash: "hosts" },
  { l: "Epizody", to: "/" as const, hash: "episodes" },
  { l: "Shop", to: "/shop" as const, hash: undefined },
  { l: "Zpussy+", to: "/plus" as const, hash: undefined },
];

function NavLinks({
  pathname,
  onNavigate,
  className = "",
}: {
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <>
      {NAV.map((n) => {
        const active = n.to === pathname && !n.hash;
        if (n.hash) {
          return (
            <Link
              key={n.l}
              to="/"
              hash={n.hash}
              onClick={onNavigate}
              className={`px-4 py-2.5 rounded-xl text-white/85 hover:bg-[var(--pink)] hover:text-white transition ${className}`}
            >
              {n.l}
            </Link>
          );
        }
        return (
          <Link
            key={n.l}
            to={n.to}
            hash={n.hash}
            onClick={onNavigate}
            className={`px-4 py-2.5 rounded-xl transition ${active ? "bg-[var(--pink)] text-white" : `text-white/85 hover:bg-[var(--pink)] hover:text-white ${className}`}`}
          >
            {n.l}
          </Link>
        );
      })}
    </>
  );
}

export function SiteHeader() {
  const [scroll, setScroll] = useState(0);
  const [signedIn, setSignedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 text-white transition-all duration-500 ${scroll > 40 || menuOpen ? "backdrop-blur-xl bg-black/55 border-b border-white/10" : "bg-transparent"}`}>
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3 group shrink-0 min-w-0">
            <img src={logo} alt="ZpusyClub" className="h-9 sm:h-10 md:h-11 w-auto drop-shadow-[0_4px_20px_rgba(255,45,135,0.6)] group-hover:rotate-12 transition duration-500" />
            <span className="hidden sm:inline font-display font-black text-sm tracking-tight truncate text-white">ZPUSY<span className="text-[var(--pink)]">CLUB</span></span>
          </Link>

          <nav className="hidden md:flex gap-1 text-[13px] font-semibold bg-white/[0.04] backdrop-blur rounded-xl p-1 border border-white/10">
            <NavLinks pathname={pathname} />
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to={signedIn ? "/plus/dashboard" : "/plus"}
              className="relative inline-flex items-center gap-2 bg-[var(--pink)] hover:bg-white hover:text-[var(--pink)] text-white px-3.5 sm:px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-[0_8px_30px_-5px_rgba(255,45,135,0.6)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="hidden sm:inline">{signedIn ? "Můj klub" : "Vstup do klubu"}</span>
              <span className="sm:hidden">Klub</span>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-2.5 rounded-xl bg-white/10 border border-white/10"
              aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={menuOpen}
            >
              <div className={`w-5 h-0.5 bg-white mb-1 transition ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <div className={`w-5 h-0.5 bg-white mb-1 transition ${menuOpen ? "opacity-0" : ""}`} />
              <div className={`w-5 h-0.5 bg-white transition ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button type="button" className="absolute inset-0 bg-black/60" aria-label="Zavřít menu" onClick={() => setMenuOpen(false)} />
          <nav className="absolute top-16 inset-x-0 bottom-0 bg-[var(--ink)]/98 backdrop-blur-xl border-t border-white/10 p-4 flex flex-col gap-1 text-base font-semibold overflow-y-auto">
            <NavLinks pathname={pathname} onNavigate={() => setMenuOpen(false)} className="block w-full text-left" />
            <a href="#contact" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-xl hover:bg-[var(--pink)] hover:text-white transition">
              Kontakt
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-[var(--ink)] py-16 md:py-20 text-white relative overflow-hidden border-t border-white/10">
      <div className="absolute bottom-0 inset-x-0 font-display font-black text-[28vw] leading-[0.75] text-white/[0.04] text-center pointer-events-none select-none tracking-tighter">
        ZPUSY
      </div>
      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12 md:mb-16">
          <div>
            <img src={logo} alt="ZpusyClub" className="h-14 md:h-16 w-auto mb-4 drop-shadow-[0_4px_20px_rgba(255,45,135,0.5)]" />
            <p className="text-sm text-white/70 max-w-xs leading-relaxed">
              Mámy, kamarádky, holky — humor, péče, žádná póza. Sdílená zkušenost dokáže léčit.
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Napiš nám</div>
            <a href="mailto:info@zpusyclub.cz" className="font-display font-bold text-xl sm:text-2xl md:text-3xl hover:text-[var(--pink)] transition block break-all">
              info@zpusyclub.cz
            </a>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Sleduj</div>
            <div className="flex flex-col gap-2">
              {[
                ["Instagram", "@zpusyclub", "https://instagram.com/zpusyclub"],
                ["YouTube", "@ZpusyClub", "https://www.youtube.com/@ZpusyClub"],
                ["HeroHero", "ZpusyClub", "#"],
                ["Zpussy+", "členská sekce", "/plus"],
              ].map(([s, h, url]) => {
                const isExternal = url.startsWith("http");
                const isYouTube = url.includes("youtube.com");
                return (
                  <a
                    key={s}
                    href={url}
                    target={isExternal ? (isYouTube ? "_top" : "_blank") : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group flex items-baseline justify-between gap-4 border-b border-white/15 pb-2 hover:border-[var(--pink)]"
                  >
                    <span className="font-display font-bold text-base sm:text-lg group-hover:text-[var(--pink)] transition">{s}</span>
                    <span className="text-xs text-white/50 truncate">{h}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-white/15 flex flex-wrap gap-x-4 gap-y-2 justify-between items-center text-xs text-white/50 font-mono">
          <span>© {new Date().getFullYear()} ZpusyClub</span>
          <span className="text-white/40">Webdesign Nia Dobyšar</span>
          <span>S námi v tom nejste samy. ♥</span>
        </div>
      </div>
    </footer>
  );
}

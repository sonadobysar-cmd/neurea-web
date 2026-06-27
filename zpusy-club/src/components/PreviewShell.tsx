import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import logo from "../assets/zpusy/logo-transparent.png";

type NavItem = { to: "/plus/nahled" | "/plus/nahled/videa" | "/plus/nahled/zapisky" | "/plus/nahled/hlasovky" | "/plus/nahled/chat"; label: string; icon: string; exact?: boolean };
const NAV: NavItem[] = [
  { to: "/plus/nahled", label: "Domů", icon: "◉", exact: true },
  { to: "/plus/nahled/videa", label: "Videa", icon: "▶" },
  { to: "/plus/nahled/zapisky", label: "Zápisky", icon: "✎" },
  { to: "/plus/nahled/hlasovky", label: "Hlasovky", icon: "♪" },
  { to: "/plus/nahled/chat", label: "Chat", icon: "✦" },
];

export function PreviewShell({ children, title }: { children: ReactNode; title?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="min-h-screen bg-[var(--ink)] text-white font-body selection:bg-[var(--pink)] selection:text-white">
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.05] mix-blend-overlay grain" />
      <div
        className="pointer-events-none fixed inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 40% at 10% 10%, rgba(168,85,247,0.25), transparent 60%), radial-gradient(50% 40% at 90% 90%, rgba(255,45,135,0.25), transparent 60%)",
        }}
      />

      {/* Topbar mobile */}
      <header className="md:hidden sticky top-0 z-40 bg-[var(--ink)]/90 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/plus/nahled" className="flex items-center gap-2">
            <img src={logo} alt="" className="h-8 w-auto" />
            <span className="font-display font-black text-sm">
              ZPUSSY<span className="text-[var(--pink)]">+</span>
            </span>
            <span className="text-[9px] font-black tracking-wider bg-[var(--pink)] text-white px-1.5 py-0.5 rounded ml-1">NÁHLED</span>
          </Link>
          <button onClick={() => setOpen((o) => !o)} className="p-2 rounded-lg bg-white/10" aria-label="Menu">
            <div className="w-5 h-0.5 bg-white mb-1" />
            <div className="w-5 h-0.5 bg-white mb-1" />
            <div className="w-5 h-0.5 bg-white" />
          </button>
        </div>
        {open && (
          <nav className="px-3 pb-3 grid gap-1">
            {NAV.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link key={n.to} to={n.to} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold ${active ? "bg-[var(--pink)] text-white" : "bg-white/5"}`}>
                  <span>{n.icon}</span> {n.label}
                </Link>
              );
            })}
            <Link to="/plus/checkout" className="px-4 py-3 rounded-xl text-sm font-black bg-white text-[var(--ink)] text-center">Chci dovnitř →</Link>
          </nav>
        )}
      </header>

      <div className="relative flex">
        {/* Sidebar desktop */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 min-h-screen sticky top-0 border-r border-white/10 bg-black/30 backdrop-blur-xl p-5">
          <Link to="/plus/nahled" className="flex items-center gap-3 mb-8 group">
            <img src={logo} alt="" className="h-10 w-auto drop-shadow-[0_4px_20px_rgba(255,45,135,0.6)] group-hover:rotate-12 transition" />
            <div>
              <div className="font-display font-black text-lg leading-none">
                ZPUSSY<span className="text-[var(--pink)]">+</span>
              </div>
              <div className="text-[9px] text-[var(--pink)] uppercase tracking-wider mt-1 font-black">Náhled klubu</div>
            </div>
          </Link>

          <nav className="grid gap-1 text-sm font-semibold">
            {NAV.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition ${active ? "bg-[var(--pink)] text-white shadow-[0_8px_30px_-10px_rgba(255,45,135,0.7)]" : "text-white/70 hover:bg-white/5 hover:text-white"}`}
                >
                  <span className="w-5 text-center">{n.icon}</span> {n.label}
                  <span className="ml-auto text-[9px] opacity-60">🔒</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 rounded-2xl border border-[var(--pink)]/40 bg-gradient-to-br from-[var(--pink)]/20 to-purple-500/10 p-4">
            <div className="text-[10px] uppercase tracking-wider font-black text-[var(--pink)] mb-2">Vidíš jen náhled</div>
            <div className="text-xs text-white/80 leading-snug mb-3">Pro plný přístup ke všem epizodám, zápiskům a chatu se přidej do klubu.</div>
            <Link to="/plus/checkout" className="block text-center bg-white text-[var(--ink)] text-xs font-black py-2.5 rounded-full hover:bg-[var(--pink)] hover:text-white transition">
              Chci dovnitř →
            </Link>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10 grid gap-2">
            <Link to="/" className="text-xs text-white/40 hover:text-white transition px-2">← Zpět na web</Link>
            <Link to="/plus" className="text-xs text-white/40 hover:text-[var(--pink)] transition px-2">O klubu</Link>
          </div>
        </aside>

        <main className="flex-1 min-w-0 p-4 md:p-10">
          {/* Persistent paywall ribbon */}
          <div className="mb-6 rounded-2xl border border-[var(--pink)]/40 bg-[var(--pink)]/10 px-5 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div className="text-sm">
              <span className="font-black text-[var(--pink)]">NÁHLED · </span>
              <span className="text-white/70">Takhle vypadá klub uvnitř. Obsah je reálný, ale zamčený.</span>
            </div>
            <Link to="/plus/checkout" className="text-xs font-bold bg-[var(--pink)] text-white px-4 py-2 rounded-full hover:bg-white hover:text-[var(--pink)] transition whitespace-nowrap">
              Chci dovnitř →
            </Link>
          </div>

          {title && (
            <div className="mb-8">
              <h1 className="font-display font-black text-3xl md:text-5xl tracking-tighter">{title}</h1>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

export function LockBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[9px] font-black tracking-wider bg-[var(--ink)]/80 backdrop-blur text-white px-2 py-1 rounded ${className}`}>
      🔒 ZAMČENO
    </span>
  );
}

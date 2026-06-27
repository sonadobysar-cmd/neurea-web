import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import logo from "../assets/zpusy/logo-transparent.png";

const NAV = [
  { to: "/plus/dashboard", label: "Domů", icon: "◉" },
  { to: "/plus/videa", label: "Videa", icon: "▶" },
  { to: "/plus/zapisky", label: "Zápisky", icon: "✎" },
  { to: "/plus/hlasovky", label: "Hlasovky", icon: "♪" },
  { to: "/plus/chat", label: "Chat", icon: "✦" },
  { to: "/plus/ucet", label: "Účet", icon: "☺" },
] as const;

export function PlusShell({ children, title }: { children: ReactNode; title?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setOpen(false), [pathname]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-[var(--ink)] text-white font-body selection:bg-[var(--pink)] selection:text-white">
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.05] mix-blend-overlay grain" />
      {/* glow */}
      <div className="pointer-events-none fixed inset-0 opacity-50" style={{
        background:
          "radial-gradient(60% 40% at 10% 10%, rgba(168,85,247,0.25), transparent 60%), radial-gradient(50% 40% at 90% 90%, rgba(255,45,135,0.25), transparent 60%)",
      }} />

      {/* Topbar mobile */}
      <header className="md:hidden sticky top-0 z-40 bg-[var(--ink)]/90 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/plus/dashboard" className="flex items-center gap-2">
            <img src={logo} alt="" className="h-8 w-auto" />
            <span className="font-display font-black text-sm">ZPUSSY<span className="text-[var(--pink)]">+</span></span>
          </Link>
          <button onClick={() => setOpen((o) => !o)} className="p-2 rounded-lg bg-white/10" aria-label="Menu">
            <div className="w-5 h-0.5 bg-white mb-1" />
            <div className="w-5 h-0.5 bg-white mb-1" />
            <div className="w-5 h-0.5 bg-white" />
          </button>
        </div>
        {open && (
          <nav className="px-3 pb-3 grid gap-1">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold ${pathname.startsWith(n.to) ? "bg-[var(--pink)] text-white" : "bg-white/5"}`}>
                <span>{n.icon}</span> {n.label}
              </Link>
            ))}
            <button onClick={signOut} className="text-left px-4 py-3 rounded-xl text-sm font-bold bg-white/5 text-white/70">Odhlásit</button>
          </nav>
        )}
      </header>

      <div className="relative flex">
        {/* Sidebar desktop */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 min-h-screen sticky top-0 border-r border-white/10 bg-black/30 backdrop-blur-xl p-5">
          <Link to="/plus/dashboard" className="flex items-center gap-3 mb-10 group">
            <img src={logo} alt="" className="h-10 w-auto drop-shadow-[0_4px_20px_rgba(255,45,135,0.6)] group-hover:rotate-12 transition" />
            <div>
              <div className="font-display font-black text-lg leading-none">ZPUSSY<span className="text-[var(--pink)]">+</span></div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Členská sekce</div>
            </div>
          </Link>

          <nav className="grid gap-1 text-sm font-semibold">
            {NAV.map((n) => {
              const active = pathname === n.to || (n.to !== "/plus/dashboard" && pathname.startsWith(n.to));
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition ${active ? "bg-[var(--pink)] text-white shadow-[0_8px_30px_-10px_rgba(255,45,135,0.7)]" : "text-white/70 hover:bg-white/5 hover:text-white"}`}
                >
                  <span className="w-5 text-center">{n.icon}</span> {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/10 grid gap-2">
            <Link to="/" className="text-xs text-white/40 hover:text-white transition px-2">← Zpět na web</Link>
            <button onClick={signOut} className="text-left text-xs text-white/40 hover:text-[var(--pink)] transition px-2">Odhlásit</button>
          </div>
        </aside>

        <main className="flex-1 min-w-0 p-4 md:p-10">
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

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PreviewShell, LockBadge } from "@/components/PreviewShell";
import { getRecentEpisodes } from "@/lib/youtube.functions";
import { getPreviewNotes, getPreviewVoicenotes } from "@/lib/preview.functions";
import heroDuo from "../assets/zpusy/merch/hero-duo.jpg.asset.json";

export const Route = createFileRoute("/plus/nahled/")({
  head: () => ({ meta: [{ title: "Náhled klubu — Zpussy+" }] }),
  component: PreviewDashboard,
});

function PreviewDashboard() {
  const { data: episodes } = useQuery({ queryKey: ["recent-episodes"], queryFn: () => getRecentEpisodes(), staleTime: 5 * 60_000 });
  const { data: notes } = useQuery({ queryKey: ["preview-notes"], queryFn: () => getPreviewNotes(), staleTime: 5 * 60_000 });
  const { data: voicenotes } = useQuery({ queryKey: ["preview-voicenotes"], queryFn: () => getPreviewVoicenotes(), staleTime: 5 * 60_000 });

  const ep = (episodes ?? [])[0];

  return (
    <PreviewShell>
      {/* Greeting */}
      <div className="mb-8">
        <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--teal)] mb-3">/ klub · domů</div>
        <h1 className="font-display font-black text-4xl md:text-6xl tracking-tighter leading-[0.9]">
          Ahoj <span className="text-[var(--pink)]">Aneto</span>.<br />
          Co dneska?
        </h1>
        <p className="text-sm text-white/50 mt-3 italic">(po přihlášení uvidíš svoje jméno)</p>
        <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold text-white/70 bg-white/[0.05] border border-white/10 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] animate-pulse" />
          Nová epizoda každý týden · občas bonus navíc
        </div>
      </div>

      {/* Featured episode */}
      <Link
        to="/plus/checkout"
        className="block relative rounded-3xl overflow-hidden aspect-[16/8] md:aspect-[21/9] bg-[var(--ink)] group mb-10 border border-white/10"
      >
        <img src={ep?.thumbnail ?? heroDuo.url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/40 to-transparent" />
        <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
          <div className="flex gap-2 flex-wrap">
            <span className="bg-[var(--pink)] text-white text-[10px] font-black tracking-wider px-2.5 py-1 rounded-full">NEJNOVĚJŠÍ</span>
            <span className="bg-white/10 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full">DELŠÍ VERZE · BEZ CENZURY</span>
            <LockBadge />
          </div>
          <div>
            <div className="text-[11px] text-[var(--teal)] font-bold tracking-wider uppercase mb-2">Členská verze</div>
            <h2 className="font-display font-black text-2xl md:text-4xl tracking-tight max-w-3xl line-clamp-2">{ep?.title ?? "Ep. 47 — necenzurovaná verze"}</h2>
            <div className="mt-4 inline-flex items-center gap-2 bg-white text-[var(--ink)] px-5 py-2.5 rounded-full text-sm font-bold group-hover:bg-[var(--pink)] group-hover:text-white transition">
              🔒 Odemknout v klubu
            </div>
          </div>
        </div>
      </Link>

      {/* Quick tiles */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {[
          { to: "/plus/nahled/videa" as const, t: "Video knihovna", d: `${episodes?.length ?? "—"} epizod bez cenzury`, c: "var(--pink)" },
          { to: "/plus/nahled/zapisky" as const, t: "Zápisky & blog", d: `${notes?.length ?? "—"} esejí a deníků`, c: "var(--teal)" },
          { to: "/plus/nahled/hlasovky" as const, t: "Hlasovky", d: `${voicenotes?.length ?? "—"} krátkých audií`, c: "#a855f7" },
          { to: "/plus/nahled/chat" as const, t: "Chat", d: "Komunita členek", c: "var(--pink)" },
        ].map((t) => (
          <Link key={t.to} to={t.to} className="group rounded-2xl bg-white/[0.05] border border-white/10 p-5 hover:bg-white/[0.08] hover:-translate-y-1 transition">
            <div className="w-10 h-10 rounded-full grid place-items-center text-white font-black mb-3" style={{ background: t.c }}>→</div>
            <div className="font-display font-bold text-lg leading-snug">{t.t}</div>
            <div className="text-xs text-white/60 mt-1">{t.d}</div>
          </Link>
        ))}
      </div>

      {/* Recent zapisky + hlasovky */}
      <div className="grid lg:grid-cols-2 gap-6">
        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="font-display font-black text-2xl">Nové zápisky</h3>
            <Link to="/plus/nahled/zapisky" className="text-xs text-[var(--teal)] hover:text-[var(--pink)] transition">Vše →</Link>
          </div>
          <div className="grid gap-3">
            {(notes ?? []).slice(0, 3).map((n) => (
              <Link key={n.id} to="/plus/checkout" className="block rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:bg-white/[0.07] transition">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--pink)] font-bold">{n.author}</div>
                  {n.members_only && <LockBadge />}
                </div>
                <div className="font-display font-bold text-lg leading-snug">{n.title}</div>
                {n.excerpt && <div className="text-xs text-white/60 mt-2 line-clamp-2">{n.excerpt}</div>}
              </Link>
            ))}
            {(notes ?? []).length === 0 && <div className="text-sm text-white/40 italic">Načítám…</div>}
          </div>
        </section>

        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="font-display font-black text-2xl">Nové hlasovky</h3>
            <Link to="/plus/nahled/hlasovky" className="text-xs text-[var(--teal)] hover:text-[var(--pink)] transition">Vše →</Link>
          </div>
          <div className="grid gap-3">
            {(voicenotes ?? []).slice(0, 3).map((v) => (
              <Link key={v.id} to="/plus/checkout" className="block rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:bg-white/[0.07] transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--pink)] grid place-items-center text-white shrink-0">♪</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-base leading-snug truncate">{v.title}</div>
                    <div className="text-xs text-white/50">{Math.round((v.duration_sec ?? 0) / 60)} min</div>
                  </div>
                  {v.members_only && <LockBadge />}
                </div>
              </Link>
            ))}
            {(voicenotes ?? []).length === 0 && <div className="text-sm text-white/40 italic">Načítám…</div>}
          </div>
        </section>
      </div>
    </PreviewShell>
  );
}

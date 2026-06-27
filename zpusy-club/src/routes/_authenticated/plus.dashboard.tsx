import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MemberGate } from "@/components/PaywallRedirect";
import { PlusShell } from "@/components/PlusShell";
import { getRecentEpisodes } from "@/lib/youtube.functions";
import heroDuo from "../../assets/zpusy/merch/hero-duo.jpg.asset.json";

export const Route = createFileRoute("/_authenticated/plus/dashboard")({
  head: () => ({ meta: [{ title: "Klub — Zpussy+" }] }),
  component: () => (
    <MemberGate>
      <Dashboard />
    </MemberGate>
  ),
});

function Dashboard() {
  const { data: episodes } = useQuery({
    queryKey: ["recent-episodes"],
    queryFn: () => getRecentEpisodes(),
    staleTime: 5 * 60_000,
  });
  const { data: notes } = useQuery({
    queryKey: ["notes-recent"],
    queryFn: async () => {
      const { data } = await supabase
        .from("notes")
        .select("id, slug, title, excerpt, author, published_at")
        .order("published_at", { ascending: false })
        .limit(3);
      return data ?? [];
    },
  });
  const { data: voicenotes } = useQuery({
    queryKey: ["voicenotes-recent"],
    queryFn: async () => {
      const { data } = await supabase
        .from("voicenotes")
        .select("id, title, description, duration_sec, published_at")
        .order("published_at", { ascending: false })
        .limit(3);
      return data ?? [];
    },
  });
  const { data: profile } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("profiles")
        .select("display_name, avatar_url")
        .eq("id", u.user.id)
        .maybeSingle();
      return data;
    },
  });

  const ep = (episodes ?? [])[0];
  const greet = profile?.display_name?.split(" ")[0] ?? "vítej";

  return (
    <PlusShell>
      {/* Greeting */}
      <div className="mb-8">
        <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--teal)] mb-3">/ klub · domů</div>
        <h1 className="font-display font-black text-4xl md:text-6xl tracking-tighter leading-[0.9]">
          Ahoj <span className="text-[var(--pink)]">{greet}</span>.<br />
          Co dneska?
        </h1>
      </div>

      {/* Featured episode */}
      {ep && (
        <a
          href={ep.url}
          target="_top"
          rel="noopener noreferrer"
          className="block relative rounded-3xl overflow-hidden aspect-[16/8] md:aspect-[21/9] bg-[var(--ink)] group mb-10 border border-white/10"
        >
          <img src={ep.thumbnail ?? heroDuo.url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/40 to-transparent" />
          <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
            <div className="flex gap-2 flex-wrap">
              <span className="bg-[var(--pink)] text-white text-[10px] font-black tracking-wider px-2.5 py-1 rounded-full">NEJNOVĚJŠÍ</span>
              <span className="bg-white/10 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full">DELŠÍ VERZE</span>
            </div>
            <div>
              <div className="text-[11px] text-[var(--teal)] font-bold tracking-wider uppercase mb-2">Bez cenzury · členská verze</div>
              <h2 className="font-display font-black text-2xl md:text-4xl tracking-tight max-w-3xl line-clamp-2">{ep.title}</h2>
              <div className="mt-4 inline-flex items-center gap-2 bg-white text-[var(--ink)] px-5 py-2.5 rounded-full text-sm font-bold group-hover:bg-[var(--pink)] group-hover:text-white transition">
                ▶ Pustit nyní
              </div>
            </div>
          </div>
        </a>
      )}

      {/* Quick tiles */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {[
          { to: "/plus/videa" as const, t: "Video knihovna", d: "Plné epizody bez cenzury", c: "var(--pink)" },
          { to: "/plus/zapisky" as const, t: "Zápisky & blog", d: "Eseje a deníky holek", c: "var(--teal)" },
          { to: "/plus/hlasovky" as const, t: "Hlasovky", d: "Krátká audia z cest", c: "#a855f7" },
          { to: "/plus/chat" as const, t: "Chat", d: "Komunita členek", c: "var(--pink)" },
        ].map((t) => (
          <Link key={t.to} to={t.to} className="group rounded-2xl bg-white/[0.05] border border-white/10 p-5 hover:bg-white/[0.08] hover:-translate-y-1 transition">
            <div className="w-10 h-10 rounded-full grid place-items-center text-white font-black mb-3" style={{ background: t.c as string }}>→</div>
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
            <Link to="/plus/zapisky" className="text-xs text-[var(--teal)] hover:text-[var(--pink)] transition">Vše →</Link>
          </div>
          <div className="grid gap-3">
            {(notes ?? []).map((n) => (
              <Link key={n.id} to="/plus/zapisky/$slug" params={{ slug: n.slug }} className="block rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:bg-white/[0.07] transition">
                <div className="text-[10px] uppercase tracking-wider text-[var(--pink)] font-bold mb-1">{n.author}</div>
                <div className="font-display font-bold text-lg leading-snug">{n.title}</div>
                {n.excerpt && <div className="text-xs text-white/60 mt-2 line-clamp-2">{n.excerpt}</div>}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="font-display font-black text-2xl">Nové hlasovky</h3>
            <Link to="/plus/hlasovky" className="text-xs text-[var(--teal)] hover:text-[var(--pink)] transition">Vše →</Link>
          </div>
          <div className="grid gap-3">
            {(voicenotes ?? []).map((v) => (
              <div key={v.id} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--pink)] grid place-items-center text-white">♪</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-base leading-snug truncate">{v.title}</div>
                    <div className="text-xs text-white/50">{Math.round((v.duration_sec ?? 0) / 60)} min</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PlusShell>
  );
}

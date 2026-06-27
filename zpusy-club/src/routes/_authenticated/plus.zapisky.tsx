import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MemberGate } from "@/components/PaywallRedirect";
import { PlusShell } from "@/components/PlusShell";

export const Route = createFileRoute("/_authenticated/plus/zapisky")({
  head: () => ({ meta: [{ title: "Zápisky — Zpussy+" }] }),
  component: () => (
    <MemberGate>
      <Page />
    </MemberGate>
  ),
});

function Page() {
  const { data } = useQuery({
    queryKey: ["notes-all"],
    queryFn: async () => {
      const { data } = await supabase
        .from("notes")
        .select("id, slug, title, excerpt, author, published_at")
        .order("published_at", { ascending: false });
      return data ?? [];
    },
  });

  return (
    <PlusShell title="Zápisky & blog">
      <p className="text-sm text-white/60 mb-8 max-w-2xl">Eseje, deníky a otevřené dopisy holek. Některé jen pro členky.</p>
      <div className="grid md:grid-cols-2 gap-5">
        {(data ?? []).map((n) => (
          <Link
            key={n.id}
            to="/plus/zapisky/$slug"
            params={{ slug: n.slug }}
            className="group rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-7 hover:bg-white/[0.07] hover:-translate-y-1 transition"
          >
            <div className="flex items-center gap-3 mb-3 text-[10px] uppercase tracking-wider font-bold">
              <span className="text-[var(--pink)]">{n.author}</span>
              <span className="text-white/30">·</span>
              <span className="text-white/40">{new Date(n.published_at).toLocaleDateString("cs-CZ", { day: "numeric", month: "long" })}</span>
            </div>
            <div className="font-display font-black text-2xl tracking-tight leading-tight mb-2 group-hover:text-[var(--pink)] transition">{n.title}</div>
            {n.excerpt && <div className="text-sm text-white/65 leading-relaxed line-clamp-3">{n.excerpt}</div>}
            <div className="mt-4 text-xs text-[var(--teal)] font-bold">Číst dál →</div>
          </Link>
        ))}
      </div>
    </PlusShell>
  );
}

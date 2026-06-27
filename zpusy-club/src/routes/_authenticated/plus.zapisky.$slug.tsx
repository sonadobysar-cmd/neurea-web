import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MemberGate } from "@/components/PaywallRedirect";
import { PlusShell } from "@/components/PlusShell";

export const Route = createFileRoute("/_authenticated/plus/zapisky/$slug")({
  head: () => ({ meta: [{ title: "Zápisek — Zpussy+" }] }),
  component: () => (
    <MemberGate>
      <Page />
    </MemberGate>
  ),
});

function Page() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["note", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("title, body, author, published_at, cover_url")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data;
    },
  });

  if (isLoading) return <PlusShell><div className="text-white/60 text-sm">Načítám…</div></PlusShell>;
  if (!data) return <PlusShell><div>Nenalezeno</div></PlusShell>;

  return (
    <PlusShell>
      <Link to="/plus/zapisky" className="text-xs text-white/50 hover:text-[var(--pink)] mb-6 inline-block">← Zpět na zápisky</Link>
      <article className="max-w-2xl">
        <div className="flex items-center gap-3 mb-4 text-[10px] uppercase tracking-wider font-bold">
          <span className="text-[var(--pink)]">{data.author}</span>
          <span className="text-white/30">·</span>
          <span className="text-white/40">{new Date(data.published_at).toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" })}</span>
        </div>
        <h1 className="font-display font-black text-4xl md:text-6xl tracking-tighter leading-[0.95] mb-8">{data.title}</h1>
        <div className="prose prose-invert text-white/85 text-lg leading-relaxed whitespace-pre-wrap">
          {data.body}
        </div>
      </article>
    </PlusShell>
  );
}

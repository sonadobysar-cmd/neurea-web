import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PreviewShell, LockBadge } from "@/components/PreviewShell";
import { getPreviewNotes } from "@/lib/preview.functions";

export const Route = createFileRoute("/plus/nahled/zapisky")({
  head: () => ({ meta: [{ title: "Zápisky — Náhled" }] }),
  component: Page,
});

function Page() {
  const { data } = useQuery({ queryKey: ["preview-notes"], queryFn: () => getPreviewNotes(), staleTime: 5 * 60_000 });

  return (
    <PreviewShell title="Zápisky & blog">
      <p className="text-sm text-white/60 mb-8 max-w-2xl">Eseje, deníky a otevřené dopisy holek. Některé jen pro členky.</p>
      <div className="grid md:grid-cols-2 gap-5">
        {(data ?? []).map((n) => (
          <Link
            key={n.id}
            to="/plus/checkout"
            className="group rounded-2xl bg-white/[0.04] border border-white/10 p-6 md:p-7 hover:bg-white/[0.07] hover:-translate-y-1 transition block"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider font-bold">
                <span className="text-[var(--pink)]">{n.author}</span>
                <span className="text-white/30">·</span>
                <span className="text-white/40">{new Date(n.published_at).toLocaleDateString("cs-CZ", { day: "numeric", month: "long" })}</span>
              </div>
              {n.members_only && <LockBadge />}
            </div>
            <div className="font-display font-black text-2xl tracking-tight leading-tight mb-2 group-hover:text-[var(--pink)] transition">{n.title}</div>
            {n.excerpt && <div className="text-sm text-white/65 leading-relaxed line-clamp-3">{n.excerpt}</div>}
            <div className="mt-4 text-xs text-[var(--pink)] font-bold">🔒 Odemknout v klubu →</div>
          </Link>
        ))}
        {(data ?? []).length === 0 && <div className="col-span-full text-sm text-white/40 italic">Načítám…</div>}
      </div>
    </PreviewShell>
  );
}

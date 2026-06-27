import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PreviewShell, LockBadge } from "@/components/PreviewShell";
import { getPreviewVoicenotes } from "@/lib/preview.functions";

export const Route = createFileRoute("/plus/nahled/hlasovky")({
  head: () => ({ meta: [{ title: "Hlasovky — Náhled" }] }),
  component: Page,
});

function Page() {
  const { data } = useQuery({ queryKey: ["preview-voicenotes"], queryFn: () => getPreviewVoicenotes(), staleTime: 5 * 60_000 });

  return (
    <PreviewShell title="Hlasovky">
      <p className="text-sm text-white/60 mb-8 max-w-2xl">Krátké zvukové zápisky bez střihu. Pondělky, cesty, ranní myšlenky.</p>
      <div className="grid gap-3 max-w-3xl">
        {(data ?? []).map((v) => (
          <Link
            key={v.id}
            to="/plus/checkout"
            className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 flex items-center gap-4 hover:bg-white/[0.07] transition"
          >
            <div className="w-14 h-14 rounded-full bg-[var(--pink)]/30 border border-[var(--pink)]/60 grid place-items-center shrink-0 text-white text-xl">
              🔒
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display font-bold text-lg leading-snug">{v.title}</div>
              {v.description && <div className="text-xs text-white/55 mt-1 line-clamp-2">{v.description}</div>}
              <div className="text-[10px] text-white/40 uppercase tracking-wider mt-2 font-bold">
                {Math.round((v.duration_sec ?? 0) / 60)} min · {new Date(v.published_at).toLocaleDateString("cs-CZ", { day: "numeric", month: "long" })}
              </div>
            </div>
            {v.members_only && <LockBadge />}
          </Link>
        ))}
        {(data ?? []).length === 0 && <div className="text-sm text-white/40 italic">Načítám…</div>}
      </div>
    </PreviewShell>
  );
}

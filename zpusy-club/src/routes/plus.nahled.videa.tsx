import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PreviewShell, LockBadge } from "@/components/PreviewShell";
import { getRecentEpisodes } from "@/lib/youtube.functions";

export const Route = createFileRoute("/plus/nahled/videa")({
  head: () => ({ meta: [{ title: "Video knihovna — Náhled" }] }),
  component: Page,
});

function Page() {
  const [q, setQ] = useState("");
  const { data } = useQuery({ queryKey: ["recent-episodes"], queryFn: () => getRecentEpisodes(), staleTime: 5 * 60_000 });
  const list = (data ?? []).filter((e) => e.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <PreviewShell title="Video knihovna">
      <p className="text-sm text-white/60 mb-6 max-w-2xl">
        Plné, necenzurované verze podcastů. Co se do veřejného YouTube střihu nevešlo.
      </p>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Hledat epizodu…"
        className="w-full max-w-md bg-white/[0.05] border border-white/10 rounded-full px-5 py-3 text-sm outline-none focus:border-[var(--pink)] mb-8"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((e, i) => (
          <Link
            key={e.id}
            to="/plus/checkout"
            className="group rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 hover:border-[var(--pink)]/50 transition block"
          >
            <div className="aspect-video relative overflow-hidden bg-[var(--ink)]">
              <img src={e.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-2 left-2 text-[10px] font-black bg-[var(--ink)]/80 backdrop-blur text-white px-2 py-0.5 rounded">
                {i === 0 ? "NEW" : `#${i + 1}`}
              </div>
              <LockBadge className="absolute top-2 right-2" />
              <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition">
                <div className="bg-[var(--pink)] text-white text-xs font-black px-4 py-2 rounded-full">🔒 Odemknout</div>
              </div>
            </div>
            <div className="p-4">
              <div className="text-[10px] text-[var(--teal)] font-bold tracking-wider uppercase mb-1">členská verze · bez cenzury</div>
              <div className="text-sm font-semibold leading-snug line-clamp-2">{e.title}</div>
            </div>
          </Link>
        ))}
        {list.length === 0 && <div className="col-span-full text-sm text-white/50 italic py-10 text-center">Žádné epizody.</div>}
      </div>
    </PreviewShell>
  );
}

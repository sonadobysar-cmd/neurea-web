import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MemberGate } from "@/components/PaywallRedirect";
import { PlusShell } from "@/components/PlusShell";
import { getRecentEpisodes } from "@/lib/youtube.functions";

export const Route = createFileRoute("/_authenticated/plus/videa")({
  head: () => ({ meta: [{ title: "Video knihovna — Zpussy+" }] }),
  component: () => (
    <MemberGate>
      <Page />
    </MemberGate>
  ),
});

function Page() {
  const [q, setQ] = useState("");
  const { data } = useQuery({
    queryKey: ["recent-episodes"],
    queryFn: () => getRecentEpisodes(),
    staleTime: 5 * 60_000,
  });
  const list = (data ?? []).filter((e) => e.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <PlusShell title="Video knihovna">
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
          <a
            key={e.id}
            href={e.url}
            target="_top"
            rel="noopener noreferrer"
            className="group rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 hover:border-[var(--pink)]/50 transition block"
          >
            <div className="aspect-video relative overflow-hidden bg-[var(--ink)]">
              <img src={e.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-2 left-2 text-[10px] font-black bg-[var(--ink)]/80 backdrop-blur text-white px-2 py-0.5 rounded">
                {i === 0 ? "NEW" : `#${i + 1}`}
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] font-black bg-[var(--pink)]/90 text-white px-2 py-0.5 rounded">
                BEZ CENZURY
              </div>
            </div>
            <div className="p-4">
              <div className="text-[10px] text-[var(--teal)] font-bold tracking-wider uppercase mb-1">členská verze</div>
              <div className="text-sm font-semibold leading-snug line-clamp-2">{e.title}</div>
            </div>
          </a>
        ))}
        {list.length === 0 && (
          <div className="col-span-full text-sm text-white/50 italic py-10 text-center">Žádné epizody.</div>
        )}
      </div>
    </PlusShell>
  );
}

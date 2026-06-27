import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MemberGate } from "@/components/PaywallRedirect";
import { PlusShell } from "@/components/PlusShell";

export const Route = createFileRoute("/_authenticated/plus/hlasovky")({
  head: () => ({ meta: [{ title: "Hlasovky — Zpussy+" }] }),
  component: () => (
    <MemberGate>
      <Page />
    </MemberGate>
  ),
});

function Page() {
  const { data } = useQuery({
    queryKey: ["voicenotes-all"],
    queryFn: async () => {
      const { data } = await supabase
        .from("voicenotes")
        .select("id, title, description, audio_url, duration_sec, published_at")
        .order("published_at", { ascending: false });
      return data ?? [];
    },
  });
  const [playing, setPlaying] = useState<string | null>(null);
  const audios = useRef<Record<string, HTMLAudioElement | null>>({});

  const toggle = (id: string) => {
    const a = audios.current[id];
    if (!a) return;
    if (playing === id) {
      a.pause();
      setPlaying(null);
    } else {
      Object.values(audios.current).forEach((x) => x?.pause());
      a.play();
      setPlaying(id);
    }
  };

  return (
    <PlusShell title="Hlasovky">
      <p className="text-sm text-white/60 mb-8 max-w-2xl">Krátké zvukové zápisky bez střihu. Pondělky, cesty, ranní myšlenky.</p>
      <div className="grid gap-3 max-w-3xl">
        {(data ?? []).map((v) => (
          <div key={v.id} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 flex items-center gap-4">
            <button
              onClick={() => toggle(v.id)}
              className={`w-14 h-14 rounded-full grid place-items-center shrink-0 transition ${playing === v.id ? "bg-[var(--teal)] text-[var(--ink)]" : "bg-[var(--pink)] text-white hover:scale-105"}`}
              aria-label="Přehrát"
            >
              {playing === v.id ? "▮▮" : "▶"}
            </button>
            <div className="flex-1 min-w-0">
              <div className="font-display font-bold text-lg leading-snug">{v.title}</div>
              {v.description && <div className="text-xs text-white/55 mt-1 line-clamp-2">{v.description}</div>}
              <div className="text-[10px] text-white/40 uppercase tracking-wider mt-2 font-bold">
                {Math.round((v.duration_sec ?? 0) / 60)} min · {new Date(v.published_at).toLocaleDateString("cs-CZ", { day: "numeric", month: "long" })}
              </div>
            </div>
            <audio
              ref={(el) => { audios.current[v.id] = el; }}
              src={v.audio_url}
              onEnded={() => setPlaying(null)}
              preload="none"
            />
          </div>
        ))}
      </div>
    </PlusShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MemberGate } from "@/components/PaywallRedirect";
import { PlusShell } from "@/components/PlusShell";

type Msg = {
  id: string;
  user_id: string;
  body: string;
  created_at: string;
  profile?: { display_name: string | null; avatar_url: string | null };
};

export const Route = createFileRoute("/_authenticated/plus/chat")({
  head: () => ({ meta: [{ title: "Chat — Zpussy+" }] }),
  component: () => (
    <MemberGate>
      <Page />
    </MemberGate>
  ),
});

function Page() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [body, setBody] = useState("");
  const [me, setMe] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<Record<string, { display_name: string | null; avatar_url: string | null }>>({});
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setMe(data.user?.id ?? null));
  }, []);

  // Initial fetch + realtime
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("chat_messages")
        .select("id, user_id, body, created_at")
        .order("created_at", { ascending: true })
        .limit(200);
      const msgs = (data ?? []) as Msg[];
      setMessages(msgs);
      await loadProfiles(msgs.map((m) => m.user_id));
    })();

    const channel = supabase
      .channel("chat-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        async (payload) => {
          const m = payload.new as Msg;
          setMessages((prev) => [...prev, m]);
          await loadProfiles([m.user_id]);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const loadProfiles = async (ids: string[]) => {
    const unique = [...new Set(ids)].filter((id) => !profiles[id]);
    if (unique.length === 0) return;
    const { data } = await supabase
      .from("profiles")
      .select("id, display_name, avatar_url")
      .in("id", unique);
    if (data) {
      setProfiles((prev) => {
        const next = { ...prev };
        data.forEach((p: any) => { next[p.id] = { display_name: p.display_name, avatar_url: p.avatar_url }; });
        return next;
      });
    }
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim() || !me) return;
    const text = body.trim().slice(0, 2000);
    setBody("");
    await supabase.from("chat_messages").insert({ user_id: me, body: text });
  };

  return (
    <PlusShell title="Chat klubu">
      <p className="text-sm text-white/60 mb-6 max-w-2xl">Komunita členek. Buď konkrétní, buď fér. AMA &amp; live diskuze jednou měsíčně.</p>
      <div className="flex flex-col h-[65vh] max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.length === 0 && (
            <div className="text-sm text-white/40 italic text-center py-10">Zatím prázdno. Napiš první zprávu.</div>
          )}
          {messages.map((m) => {
            const p = profiles[m.user_id];
            const mine = m.user_id === me;
            const name = p?.display_name ?? "Členka";
            return (
              <div key={m.id} className={`flex gap-3 ${mine ? "flex-row-reverse" : ""}`}>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--pink)] to-purple-500 grid place-items-center text-xs font-black shrink-0">
                  {name.slice(0, 1).toUpperCase()}
                </div>
                <div className={`max-w-[75%] ${mine ? "items-end text-right" : ""} flex flex-col gap-1`}>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-white/40">{name} · {new Date(m.created_at).toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })}</div>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${mine ? "bg-[var(--pink)] text-white rounded-br-sm" : "bg-white/10 rounded-bl-sm"}`}>
                    {m.body}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>
        <form onSubmit={send} className="border-t border-white/10 p-3 flex gap-2 bg-black/30">
          <input
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Napiš zprávu…"
            maxLength={2000}
            className="flex-1 bg-white/[0.06] rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--pink)]"
          />
          <button className="bg-[var(--pink)] text-white font-bold px-6 rounded-full hover:bg-white hover:text-[var(--pink)] transition">Pošli</button>
        </form>
      </div>
    </PlusShell>
  );
}

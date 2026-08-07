"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { ASSISTANT_STARTERS, askAssistant, type AssistantReply } from "@/lib/assistant";

type ChatItem = {
  id: string;
  role: "user" | "assistant";
  text: string;
  reply?: AssistantReply;
};

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [items, setItems] = useState<ChatItem[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Ahoj, jsem MamaSOS asistentka. Zeptej se na cokoli — ceny, ověření, platby — nebo mi řekni co potřebuješ a doporučím kandidátku.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [items, open]);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  function send(text: string) {
    const cleaned = text.trim();
    if (!cleaned) return;
    const reply = askAssistant(cleaned);
    setItems((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", text: cleaned },
      {
        id: `a-${Date.now() + 1}`,
        role: "assistant",
        text: reply.answer,
        reply,
      },
    ]);
    setInput("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-bold text-white shadow-[0_18px_40px_rgba(22,19,17,0.28)] transition hover:-translate-y-0.5 md:bottom-7 md:right-7"
        aria-label="Otevřít AI asistentku"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">AI asistentka</span>
        <Sparkles className="h-4 w-4 text-rose" />
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 z-[60] flex h-[min(640px,78svh)] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-snow shadow-[var(--shadow)] md:bottom-24 md:right-7">
          <div className="flex items-center justify-between border-b border-[var(--line)] bg-ink px-4 py-3 text-white">
            <div>
              <p className="text-sm font-bold">MamaSOS asistentka</p>
              <p className="text-xs text-white/65">Otázky · doporučení · navigace</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 hover:bg-white/10"
              aria-label="Zavřít"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {items.map((item) => (
              <div
                key={item.id}
                className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  item.role === "user"
                    ? "ml-auto bg-ink text-white"
                    : "bg-white text-ink ring-1 ring-[var(--line)]"
                }`}
              >
                {item.text}
                {item.reply?.recommendations && item.reply.recommendations.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {item.reply.recommendations.slice(0, 3).map((r) => (
                      <Link
                        key={r.provider.id}
                        href={`/pece/${r.provider.id}`}
                        className="flex items-center gap-2 rounded-xl bg-fog px-2 py-2 transition hover:bg-sand"
                      >
                        <span className="relative h-9 w-9 overflow-hidden rounded-lg bg-sand">
                          <Image
                            src={r.provider.photo}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="36px"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-bold">
                            {r.provider.name}
                          </span>
                          <span className="block truncate text-xs text-ink-soft">
                            {r.distanceKm.toFixed(1)} km · ★ {r.provider.rating.toFixed(1)}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
                {item.reply?.links && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.reply.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="border-t border-[var(--line)] bg-white p-3">
            <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
              {ASSISTANT_STARTERS.slice(0, 3).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="shrink-0 rounded-full bg-fog px-3 py-1.5 text-[0.7rem] font-semibold text-ink-soft"
                >
                  {s.length > 42 ? `${s.slice(0, 42)}…` : s}
                </button>
              ))}
            </div>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Napiš otázku nebo požadavky…"
                className="input !rounded-full !py-2.5"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="btn btn-rose !rounded-full !px-3.5"
                aria-label="Odeslat"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

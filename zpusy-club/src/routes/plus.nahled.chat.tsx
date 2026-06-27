import { createFileRoute, Link } from "@tanstack/react-router";
import { PreviewShell } from "@/components/PreviewShell";

export const Route = createFileRoute("/plus/nahled/chat")({
  head: () => ({ meta: [{ title: "Chat — Náhled" }] }),
  component: Page,
});

const MOCK = [
  { id: "1", name: "Aneta", body: "Holky, právě přistávám v Bangkoku. Kdo už tady někdy byl, kam na noční trhy?", mine: false, time: "9:42" },
  { id: "2", name: "Bára", body: "Chatuchak je klasika, ale jdi spíš na Rot Fai Ratchada — lepší vibe a míň turistů.", mine: false, time: "9:44" },
  { id: "3", name: "Aneta", body: "Díky! A co street food, kde nedostanu salmonelu?", mine: false, time: "9:45" },
  { id: "4", name: "Markéta", body: "Sleduj kde jedí místní v oblecích — to je nejlepší filtr 😂", mine: false, time: "9:47" },
  { id: "5", name: "Bára", body: "Zítra postnu hlasovku z taxíku, mám pro tebe story z minulé cesty.", mine: false, time: "9:48" },
] as const;

function Page() {
  return (
    <PreviewShell title="Chat klubu">
      <p className="text-sm text-white/60 mb-6 max-w-2xl">Komunita členek. Buď konkrétní, buď fér. AMA &amp; live diskuze jednou měsíčně.</p>
      <div className="relative flex flex-col h-[65vh] max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {MOCK.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.mine ? "flex-row-reverse" : ""}`}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--pink)] to-purple-500 grid place-items-center text-xs font-black shrink-0">
                {m.name.slice(0, 1).toUpperCase()}
              </div>
              <div className={`max-w-[75%] ${m.mine ? "items-end text-right" : ""} flex flex-col gap-1`}>
                <div className="text-[10px] uppercase tracking-wider font-bold text-white/40">{m.name} · {m.time}</div>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.mine ? "bg-[var(--pink)] text-white rounded-br-sm" : "bg-white/10 rounded-bl-sm"}`}>
                  {m.body}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 p-3 flex gap-2 bg-black/30">
          <input disabled placeholder="Napiš zprávu… (jen pro členky)" className="flex-1 bg-white/[0.06] rounded-full px-5 py-3 text-sm outline-none cursor-not-allowed" />
          <Link to="/plus/checkout" className="bg-[var(--pink)] text-white font-bold px-6 rounded-full grid place-items-center hover:bg-white hover:text-[var(--pink)] transition">🔒 Odemknout</Link>
        </div>

        {/* Paywall overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--ink)]/60 to-[var(--ink)]/95 grid place-items-end p-6 pointer-events-none">
          <div className="text-center max-w-sm pointer-events-auto">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--pink)] font-black mb-2">Chat jen pro členky</div>
            <h3 className="font-display font-black text-2xl mb-3">Připoj se k diskuzi</h3>
            <p className="text-sm text-white/70 mb-4">1 248 členek online. Reálné konverzace, AMA s holkama, doporučení z cest.</p>
            <Link to="/plus/checkout" className="inline-block bg-[var(--pink)] text-white px-6 py-3 rounded-full text-sm font-black hover:bg-white hover:text-[var(--pink)] transition">
              Chci dovnitř →
            </Link>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

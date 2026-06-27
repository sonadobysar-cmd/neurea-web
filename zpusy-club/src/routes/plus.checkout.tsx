import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { activateMembership } from "@/lib/membership.functions";
import logo from "../assets/zpusy/logo-transparent.png";

const PLANS = [
  { id: "month" as const, n: "Měsíčně", price: 199, sub: "Kč / měsíc", yearlyTotal: 2388 },
  { id: "year" as const, n: "Ročně", price: 1990, sub: "Kč / rok", popular: true, save: 398 },
];

export const Route = createFileRoute("/plus/checkout")({
  head: () => ({ meta: [{ title: "Dokončení vstupu — Zpussy+" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<"month" | "year">("year");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const activate = useServerFn(activateMembership);
  const sel = useMemo(() => PLANS.find((p) => p.id === plan)!, [plan]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate({ to: "/auth", search: { redirect: "/plus/checkout" } });
      else setEmail(data.user.email ?? "");
    });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      await activate({ data: { plan } });
      navigate({ to: "/plus/dashboard" });
    } catch (e: any) {
      setErr(e.message ?? "Něco se pokazilo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--ink)] text-white font-body py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-50" style={{
        background:
          "radial-gradient(60% 40% at 80% 20%, rgba(168,85,247,0.4), transparent 60%), radial-gradient(50% 40% at 20% 80%, rgba(255,45,135,0.4), transparent 60%)",
      }} />
      <div className="relative max-w-5xl mx-auto">
        <Link to="/" className="flex items-center gap-3 mb-10">
          <img src={logo} alt="" className="h-10 w-auto" />
          <span className="font-display font-black text-lg">ZPUSSY<span className="text-[var(--pink)]">+</span></span>
        </Link>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 grid gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--teal)] mb-3">/ vyber plán</div>
              <h1 className="font-display font-black text-4xl md:text-5xl tracking-tighter">Poslední krok do klubu.</h1>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlan(p.id)}
                  className={`relative text-left rounded-2xl p-5 border-2 transition ${plan === p.id ? "border-[var(--pink)] bg-[var(--pink)]/10 -translate-y-1" : "border-white/10 bg-white/[0.03] hover:border-white/30"}`}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-4 bg-[var(--teal)] text-[var(--ink)] text-[10px] font-black tracking-wider uppercase px-2 py-1 rounded-full">Nejvýhodnější</span>
                  )}
                  <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 mb-2">{p.n}</div>
                  <div className="font-display font-black text-3xl">{p.price}</div>
                  <div className="text-xs text-white/60">{p.sub}</div>
                  {p.save ? (
                    <div className="mt-2 text-[10px] font-black tracking-wider text-[var(--teal)] uppercase">Ušetříš {p.save} Kč</div>
                  ) : p.yearlyTotal ? (
                    <div className="mt-2 text-[10px] font-black tracking-wider text-white/40 uppercase">Rok = {p.yearlyTotal} Kč</div>
                  ) : null}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="bg-white text-[var(--ink)] rounded-3xl p-6 md:p-8 grid gap-4 shadow-[0_30px_80px_-20px_rgba(255,45,135,0.5)]">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--pink)]">Vlastní brána · MOCK</div>
              <h2 className="font-display font-black text-2xl">Údaje karty</h2>
              <div className="grid gap-3">
                <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Jméno na kartě" className="bg-black/[0.04] rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--pink)]" />
                <input value={email} readOnly placeholder="Email" className="bg-black/[0.04] rounded-full px-5 py-3 text-sm outline-none text-black/60" />
                <input value={card} onChange={(e) => setCard(e.target.value)} required placeholder="4242 4242 4242 4242" className="bg-black/[0.04] rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--pink)] font-mono" />
                <div className="grid grid-cols-2 gap-3">
                  <input value={exp} onChange={(e) => setExp(e.target.value)} required placeholder="MM / RR" className="bg-black/[0.04] rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--pink)] font-mono" />
                  <input value={cvc} onChange={(e) => setCvc(e.target.value)} required placeholder="CVC" className="bg-black/[0.04] rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--pink)] font-mono" />
                </div>
              </div>
              {err && <div className="text-xs text-[var(--pink)]">{err}</div>}
              <button disabled={loading} className="w-full bg-[var(--ink)] text-white font-bold py-4 rounded-full hover:bg-[var(--pink)] transition disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? "Aktivuji členství…" : `Zaplatit ${sel.price} Kč`}
                <span>→</span>
              </button>
              <div className="text-[10px] text-black/40 text-center uppercase tracking-wider">
                Demo platba — žádné peníze se neúčtují. Po odeslání získáš okamžitě přístup.
              </div>
            </form>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-6 self-start bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-6 grid gap-4 h-fit">
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--teal)]">Shrnutí</div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">{sel.n}</span>
              <span className="font-bold">{sel.price} Kč</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex items-center justify-between">
              <span className="font-bold">Celkem</span>
              <span className="font-display font-black text-3xl">{sel.price} Kč</span>
            </div>
            <ul className="grid gap-2 text-xs text-white/70 mt-4">
              <li>✓ Nová epizoda každý týden (+ občas bonus navíc)</li>
              <li>✓ Všechny epizody bez cenzury</li>
              <li>✓ Členské zápisky &amp; hlasovky</li>
              <li>✓ Komunitní chat</li>
              <li>✓ Měsíční live AMA</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

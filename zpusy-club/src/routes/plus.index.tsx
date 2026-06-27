import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import heroDuo from "../assets/zpusy/merch/hero-duo.jpg.asset.json";
import { SiteHeader, SiteFooter } from "../components/SiteChrome";
import { getRecentEpisodes } from "../lib/youtube.functions";

export const Route = createFileRoute("/plus/")({
  head: () => ({
    meta: [
      { title: "Zpussy+ — Komunitní platforma Zpussy Clubu" },
      { name: "description", content: "Vlastní komunita Zpussy Clubu. Video knihovna, zápisky, hlasovky a slevové kódy. Bez provize třetím stranám." },
      { property: "og:title", content: "Zpussy+ — komunita bez provize" },
      { property: "og:description", content: "Všechny epizody, bonusy a zápisky na jednom místě. Vstup přes vlastní bránu." },
      { property: "og:image", content: heroDuo.url },
    ],
  }),
  component: PlusPage,
});

const PLANS = [
  { id: "month", n: "Měsíčně", price: 199, sub: "Kč / měsíc", note: "Zruš kdykoliv. Bez závazku." },
  { id: "year", n: "Ročně", price: 1990, sub: "Kč / rok", note: "Ušetříš 398 Kč proti měsíčnímu.", popular: true },
  { id: "founder", n: "Founder", price: 4990, sub: "Kč jednorázově", note: "Doživotní přístup + tvé jméno v titulcích." },
];

const FEATURES = [
  { i: "▶", k: "Nová epizoda každý týden", v: "Pravidelně každý týden nová epizoda — delší a bez cenzury. A když je co řešit, přidáme bonus navíc." },
  { i: "✎", k: "Zápisky & blog", v: "Eseje, deníky a hlasovky — některé jen pro členky." },
  { i: "♥", k: "Komunita", v: "Privátní chat, dotazy do epizod, měsíční live AMA." },
  { i: "%", k: "Slevové kódy", v: "Členský přístup k merchi a partnerům klubu." },
];

function PlusPage() {
  const [plan, setPlan] = useState("year");
  const [code, setCode] = useState("");
  const [codeApplied, setCodeApplied] = useState(false);
  const { data: ytEpisodes } = useQuery({
    queryKey: ["recent-episodes"],
    queryFn: () => getRecentEpisodes(),
    staleTime: 5 * 60_000,
  });
  const episodes = (ytEpisodes ?? []).slice(0, 3);
  const featured = episodes[0];

  const selectedPlan = useMemo(() => PLANS.find((p) => p.id === plan)!, [plan]);
  const discount = codeApplied ? Math.round(selectedPlan.price * 0.15) : 0;
  const finalPrice = selectedPlan.price - discount;

  return (
    <div className="min-h-screen bg-[var(--ink)] text-white font-body overflow-x-hidden selection:bg-[var(--pink)] selection:text-white">
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.05] mix-blend-overlay grain" />
      <SiteHeader />

      {/* ============= HERO ============= */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-70" style={{
          background: "radial-gradient(60% 50% at 20% 30%, rgba(168,85,247,0.5), transparent 60%), radial-gradient(50% 50% at 80% 70%, rgba(255,45,135,0.5), transparent 60%), radial-gradient(40% 40% at 50% 100%, rgba(45,212,207,0.35), transparent 60%)",
        }} />
        <div className="relative max-w-[1300px] mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/[0.06] backdrop-blur-xl border border-white/15 rounded-full pl-2 pr-5 py-1.5 text-[11px] font-semibold mb-8">
            <span className="bg-[var(--teal)] text-[var(--ink)] px-2.5 py-0.5 rounded-full font-black tracking-wider">NEW</span>
            <span className="opacity-85">Komunitní platforma — bez provize třetím stranám</span>
          </div>

          <h1 className="font-display font-black tracking-tighter leading-[0.82] mb-8">
            <span className="block text-[20vw] md:text-[14vw] lg:text-[12rem]">
              Zpussy<span className="text-[var(--pink)]">+</span>
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-base md:text-lg text-white/80 leading-relaxed">
            <strong className="text-white">Delší a necenzurované verze</strong> všech podcastů z YouTube. Plus bonusy, zápisky, hlasovky a komunita.
            Žádné Herohero, žádné provize — co zaplatíš, jde k holkám.
          </p>

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link to="/plus/nahled" className="inline-flex items-center gap-3 bg-[var(--pink)] text-white px-6 py-3.5 rounded-full font-bold text-sm md:text-base hover:scale-[1.03] hover:bg-white hover:text-[var(--pink)] transition shadow-[0_10px_40px_rgba(255,45,135,0.4)]">
              Mrknout dovnitř
              <span>→</span>
            </Link>
            <a href="#plans" className="inline-flex items-center gap-3 bg-white text-[var(--ink)] px-6 py-3.5 rounded-full font-bold text-sm md:text-base hover:scale-[1.03] transition shadow-[0_10px_40px_rgba(255,45,135,0.4)]">
              Vybrat členství
            </a>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/25 hover:border-[var(--pink)] hover:bg-[var(--pink)] font-bold text-sm md:text-base transition">
              ← Zpět na podcast
            </Link>
          </div>

          {/* Inline stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {[
              { k: "0 %", v: "provize platformě" },
              { k: "24/7", v: "přístup ke všemu" },
              { k: "100 %", v: "interní komunita" },
              { k: "1×", v: "měsíčně live AMA" },
            ].map((s) => (
              <div key={s.v} className="bg-white/[0.05] backdrop-blur border border-white/10 rounded-2xl p-5 text-left">
                <div className="font-display font-black text-3xl md:text-4xl text-[var(--teal)]">{s.k}</div>
                <div className="mt-1 text-xs text-white/65">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= MOCK DASHBOARD ============= */}
      <section className="relative pb-24 md:pb-32">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--pink)]/40 bg-[var(--pink)]/10 px-5 py-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] font-black text-[var(--pink)]">Klikni sem pro náhled</div>
              <div className="text-sm text-white/70 mt-1">Tohle dole je jen ukázka na landing page — celý vnitřek je na samostatné stránce.</div>
            </div>
            <Link to="/plus/nahled" className="inline-flex items-center gap-2 bg-white text-[var(--ink)] px-5 py-2.5 rounded-full text-sm font-black hover:bg-[var(--pink)] hover:text-white transition">
              Otevřít členskou sekci →
            </Link>
          </div>
          <div className="rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-3 md:p-6 shadow-[0_50px_120px_-20px_rgba(255,45,135,0.35)]">
            {/* window chrome */}
            <div className="flex items-center justify-between mb-4 md:mb-6 px-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[var(--pink)]" />
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[var(--teal)]" />
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white/30" />
                <span className="ml-3 md:ml-4 text-[10px] md:text-xs text-white/50 font-mono truncate">plus.zpusyclub.cz / dashboard</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-white/60 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[var(--teal)] animate-pulse" /> Eliška
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-3 md:gap-4">
              {/* Sidebar */}
              <aside className="md:col-span-3 bg-[var(--ink)]/60 rounded-2xl p-4 border border-white/10">
                <div className="text-[10px] tracking-[0.2em] font-bold text-white/40 uppercase mb-3">Menu</div>
                <ul className="space-y-1 text-sm">
                  {[
                    { l: "Video knihovna", a: true, c: "112" },
                    { l: "Zápisky", c: "47" },
                    { l: "Hlasovky", c: "9" },
                    { l: "Live chat", c: "·" },
                    { l: "Slevové kódy", c: "3" },
                    { l: "Účet", c: "" },
                  ].map((m) => (
                    <li key={m.l} className={`flex items-center justify-between px-3 py-2 rounded-lg ${m.a ? "bg-[var(--pink)] text-white font-bold" : "text-white/70 hover:bg-white/5"} transition cursor-pointer`}>
                      <span>{m.l}</span>
                      <span className={`text-[10px] ${m.a ? "text-white" : "text-white/40"}`}>{m.c}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-[var(--pink)]/30 to-[var(--teal)]/20 border border-white/10">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--teal)] font-bold">Tip</div>
                  <div className="text-xs mt-1 text-white/80 leading-snug">Pondělní hlasovka už je tu. Pusť si ji v autě.</div>
                </div>
              </aside>

              {/* Right */}
              <div className="md:col-span-9 space-y-3 md:space-y-4">
                {/* Featured player */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[16/8] bg-[var(--ink)]">
                  <img
                    src={featured?.thumbnail ?? heroDuo.url}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/50 to-transparent" />
                  <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-[var(--pink)] text-white text-[10px] font-black tracking-wider px-2.5 py-1 rounded-full">PRÁVĚ HRAJEME</span>
                      <span className="bg-white/10 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full">DELŠÍ VERZE</span>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--teal)] font-bold tracking-wider uppercase mb-1">
                        Nejnovější · bez cenzury
                      </div>
                      <h3 className="font-display font-black text-xl md:text-3xl lg:text-4xl leading-tight tracking-tight line-clamp-2">
                        {featured?.title ?? "Načítám nejnovější epizodu…"}
                      </h3>
                      <div className="mt-4 flex items-center gap-3">
                        <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-[var(--ink)] grid place-items-center hover:bg-[var(--pink)] hover:text-white transition shrink-0">
                          <svg width="12" height="14" viewBox="0 0 14 16"><path d="M0 0L14 8L0 16V0Z" fill="currentColor" /></svg>
                        </button>
                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden min-w-0">
                          <div className="h-full w-2/5 bg-[var(--pink)]" />
                        </div>
                        <span className="text-[11px] md:text-xs text-white/70 tabular-nums font-bold shrink-0">členská verze</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                  {episodes.map((e, i) => (
                    <a
                      key={e.id}
                      href={e.url}
                      target="_top"
                      rel="noopener noreferrer"
                      className="group rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[var(--pink)]/50 transition cursor-pointer block"
                    >
                      <div className="aspect-video relative overflow-hidden bg-[var(--ink)]">
                        <img src={e.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 grain opacity-20" />
                        <div className="absolute top-2 left-2 text-[10px] font-black bg-[var(--ink)]/80 backdrop-blur text-white px-2 py-0.5 rounded">
                          {i === 0 ? "NEW" : `0${i + 1}`}
                        </div>
                        <div className="absolute bottom-2 right-2 text-[10px] font-black bg-[var(--pink)]/90 text-white px-2 py-0.5 rounded">
                          BEZ CENZURY
                        </div>
                      </div>
                      <div className="p-3 md:p-4">
                        <div className="text-[10px] text-[var(--teal)] font-bold tracking-wider uppercase mb-1.5">#youtube +</div>
                        <div className="text-sm font-semibold leading-snug line-clamp-2">{e.title}</div>
                      </div>
                    </a>
                  ))}
                  {episodes.length === 0 && (
                    <div className="sm:col-span-3 text-sm text-white/50 italic py-6">
                      Načítám epizody z YouTube…
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============= FEATURES ============= */}
      <section className="relative py-24 md:py-32 bg-[var(--cream)] text-[var(--ink)]">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-12 gap-10 items-end mb-16">
            <div className="md:col-span-7">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--pink)] mb-4">/ co v klubu najdeš</div>
              <h2 className="font-display font-black text-5xl md:text-7xl tracking-tighter leading-[0.88]">
                Všechno na <span className="italic font-normal text-[var(--pink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>jednom místě.</span>
              </h2>
            </div>
            <p className="md:col-span-5 text-base md:text-lg text-black/70 leading-relaxed">
              Místo deseti záložek a tří aplikací jedno přihlášení. Video, audio, text, komunita, slevy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {FEATURES.map((f) => (
              <div key={f.k} className="rounded-2xl bg-white border border-black/5 p-6 md:p-8 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(255,45,135,0.4)] transition duration-500">
                <div className="w-12 h-12 rounded-full bg-[var(--pink)] grid place-items-center text-2xl font-black text-white mb-5">{f.i}</div>
                <div className="font-display font-bold text-lg md:text-xl mb-2">{f.k}</div>
                <div className="text-sm text-black/65 leading-relaxed">{f.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= PLANS + CHECKOUT ============= */}
      <section id="plans" className="relative py-24 md:py-32 bg-[var(--ink)] overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          background: "radial-gradient(circle at 20% 30%, rgba(168,85,247,0.5), transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,45,135,0.5), transparent 50%)",
        }} />
        <div className="relative max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--teal)] mb-4">/ členství</div>
            <h2 className="font-display font-black text-5xl md:text-7xl tracking-tighter leading-[0.88]">
              Vyber si <span className="italic font-normal text-[var(--pink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>vstup.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Plans */}
            <div className="lg:col-span-7 grid sm:grid-cols-3 gap-3 md:gap-4">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlan(p.id)}
                  className={`relative text-left rounded-2xl p-6 md:p-7 border-2 transition group ${plan === p.id ? "border-[var(--pink)] bg-[var(--pink)]/10 -translate-y-1" : "border-white/10 bg-white/[0.03] hover:border-white/30"}`}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-6 bg-[var(--teal)] text-[var(--ink)] text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full">Nejoblíbenější</span>
                  )}
                  <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 mb-4">{p.n}</div>
                  <div className="font-display font-black text-4xl md:text-5xl mb-1">{p.price}</div>
                  <div className="text-xs text-white/60 mb-5">{p.sub}</div>
                  <div className="text-xs text-white/70 leading-relaxed min-h-[2.5rem]">{p.note}</div>
                  <div className={`mt-6 w-6 h-6 rounded-full border-2 grid place-items-center transition ${plan === p.id ? "border-[var(--pink)] bg-[var(--pink)]" : "border-white/30"}`}>
                    {plan === p.id && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>

            {/* Checkout */}
            <div className="lg:col-span-5 rounded-2xl bg-white text-[var(--ink)] p-6 md:p-8 shadow-[0_30px_80px_-20px_rgba(255,45,135,0.5)]">
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--pink)] mb-3">Vlastní platební brána</div>
              <h3 className="font-display font-black text-3xl tracking-tight mb-6">Vstup do <span className="italic font-normal text-[var(--pink)]" style={{ fontFamily: '"Instrument Serif", serif' }}>klubu</span></h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-black/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black/60">{selectedPlan.n}</span>
                  <span className="font-bold">{selectedPlan.price} Kč</span>
                </div>
                {codeApplied && (
                  <div className="flex items-center justify-between text-sm text-[var(--pink)]">
                    <span>Sleva (KLUB15)</span>
                    <span className="font-bold">−{discount} Kč</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-2">
                  <span className="font-bold">Celkem</span>
                  <span className="font-display font-black text-2xl">{finalPrice} Kč</span>
                </div>
              </div>

              <div className="flex gap-2 mb-3">
                <input
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setCodeApplied(false); }}
                  placeholder="Slevový kód"
                  className="flex-1 min-w-0 bg-black/[0.04] rounded-full px-4 py-2.5 text-sm font-semibold placeholder:text-black/40 outline-none focus:ring-2 focus:ring-[var(--pink)]"
                />
                <button
                  type="button"
                  onClick={() => setCodeApplied(code.toUpperCase() === "KLUB15")}
                  className="shrink-0 px-4 py-2.5 rounded-full bg-[var(--ink)] text-white text-sm font-bold hover:bg-[var(--pink)] transition"
                >
                  Použít
                </button>
              </div>
              {code && !codeApplied && code.toUpperCase() !== "KLUB15" && (
                <div className="text-xs text-black/50 mb-4">Tip: zkus <strong>KLUB15</strong></div>
              )}
              {codeApplied && (
                <div className="text-xs text-[var(--pink)] font-bold mb-4">✓ Kód aplikován — 15 % dolů</div>
              )}

              <Link to="/plus/checkout" className="w-full bg-[var(--ink)] text-white font-bold py-4 rounded-full hover:bg-[var(--pink)] transition flex items-center justify-center gap-2 group">
                Zaplatit {finalPrice} Kč
                <span className="group-hover:translate-x-1 transition">→</span>
              </Link>
              <div className="mt-3 flex items-center justify-center gap-3 text-[10px] text-black/40 uppercase tracking-wider font-bold">
                <span>Card</span><span>·</span><span>Apple Pay</span><span>·</span><span>Google Pay</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

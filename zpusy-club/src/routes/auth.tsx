import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import logo from "../assets/zpusy/logo-transparent.png";

const searchSchema = z.object({
  redirect: z.string().optional(),
  mode: z.enum(["signin", "signup"]).optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Přihlášení — Zpussy+" },
      { name: "description", content: "Přihlas se nebo si vytvoř účet v Zpussy Clubu." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const search = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">(search.mode ?? "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Already signed in → bounce
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: search.redirect ?? "/plus/dashboard" });
    });
  }, []);

  const goNext = () => {
    const dest = search.redirect ?? "/plus/checkout";
    window.location.href = dest;
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: window.location.origin + "/plus/checkout",
          },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      goNext();
    } catch (e: any) {
      setErr(e.message ?? "Něco se pokazilo");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "apple") => {
    setErr(null);
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin + "/auth",
    });
    if (result.error) {
      setErr(result.error.message ?? "OAuth selhal");
      return;
    }
    if (result.redirected) return;
    goNext();
  };

  const handleReset = async () => {
    if (!email) {
      setErr("Zadej email pro reset hesla");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });
    if (error) setErr(error.message);
    else setErr("Pokud email existuje, odeslali jsme ti odkaz na reset.");
  };

  return (
    <div className="min-h-screen bg-[var(--ink)] text-white font-body grid place-items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-60" style={{
        background:
          "radial-gradient(60% 50% at 20% 20%, rgba(168,85,247,0.4), transparent 60%), radial-gradient(50% 50% at 80% 80%, rgba(255,45,135,0.4), transparent 60%)",
      }} />
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.05]" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <img src={logo} alt="Zpussy" className="h-12 w-auto drop-shadow-[0_4px_20px_rgba(255,45,135,0.6)]" />
          <span className="font-display font-black text-xl">ZPUSSY<span className="text-[var(--pink)]">+</span></span>
        </Link>

        <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_30px_100px_-20px_rgba(255,45,135,0.5)]">
          <h1 className="font-display font-black text-3xl mb-2 tracking-tight">
            {mode === "signup" ? "Vítej v klubu" : "Vítej zpátky"}
          </h1>
          <p className="text-sm text-white/60 mb-6">
            {mode === "signup" ? "Vytvoř si účet a vstup do členské sekce." : "Přihlas se ke svému členství."}
          </p>

          <div className="grid gap-2 mb-5">
            <button
              type="button"
              onClick={() => handleOAuth("google")}
              className="w-full bg-white text-[var(--ink)] font-bold py-3 rounded-full hover:scale-[1.02] transition flex items-center justify-center gap-2"
            >
              <span className="text-base">G</span> Pokračovat s Google
            </button>
            <button
              type="button"
              onClick={() => handleOAuth("apple")}
              className="w-full bg-black border border-white/20 text-white font-bold py-3 rounded-full hover:bg-white/5 transition flex items-center justify-center gap-2"
            >
               Pokračovat s Apple
            </button>
          </div>

          <div className="flex items-center gap-3 my-5 text-[10px] uppercase tracking-[0.3em] text-white/40">
            <div className="flex-1 h-px bg-white/10" /> nebo email <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleEmail} className="grid gap-3">
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Jméno"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/[0.06] border border-white/10 rounded-full px-5 py-3 text-sm outline-none focus:border-[var(--pink)] transition"
              />
            )}
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/[0.06] border border-white/10 rounded-full px-5 py-3 text-sm outline-none focus:border-[var(--pink)] transition"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="Heslo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/[0.06] border border-white/10 rounded-full px-5 py-3 text-sm outline-none focus:border-[var(--pink)] transition"
            />
            {err && <div className="text-xs text-[var(--pink)] bg-[var(--pink)]/10 px-4 py-2 rounded-xl border border-[var(--pink)]/30">{err}</div>}
            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--pink)] text-white font-bold py-3 rounded-full hover:bg-white hover:text-[var(--pink)] transition disabled:opacity-50"
            >
              {loading ? "..." : mode === "signup" ? "Registrovat" : "Přihlásit"}
            </button>
          </form>

          <div className="mt-5 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
              className="text-white/60 hover:text-[var(--pink)] transition"
            >
              {mode === "signup" ? "Mám už účet" : "Nemám účet — registrovat"}
            </button>
            {mode === "signin" && (
              <button type="button" onClick={handleReset} className="text-white/60 hover:text-[var(--pink)] transition">
                Zapomenuté heslo?
              </button>
            )}
          </div>
        </div>

        <Link to="/" className="block text-center mt-6 text-xs text-white/40 hover:text-white transition">← Zpět na web</Link>
      </div>
    </div>
  );
}

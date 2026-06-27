import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Nové heslo — Zpussy+" }] }),
  component: ResetPage,
});

function ResetPage() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setErr(error.message);
      return;
    }
    setMsg("Heslo změněno. Přesměrovávám…");
    setTimeout(() => navigate({ to: "/plus/dashboard" }), 1200);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-[var(--ink)] text-white px-4">
      <form onSubmit={submit} className="w-full max-w-md bg-white/[0.05] border border-white/10 rounded-3xl p-8 grid gap-4">
        <h1 className="font-display font-black text-2xl">Nastav nové heslo</h1>
        <input
          type="password"
          required
          minLength={6}
          placeholder="Nové heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white/[0.06] border border-white/10 rounded-full px-5 py-3 text-sm outline-none focus:border-[var(--pink)]"
        />
        {err && <div className="text-xs text-[var(--pink)]">{err}</div>}
        {msg && <div className="text-xs text-[var(--teal)]">{msg}</div>}
        <button className="bg-[var(--pink)] font-bold py-3 rounded-full hover:bg-white hover:text-[var(--pink)] transition">Uložit</button>
        <Link to="/auth" className="text-center text-xs text-white/40 hover:text-white">← Zpět</Link>
      </form>
    </div>
  );
}

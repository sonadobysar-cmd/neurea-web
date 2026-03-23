"use client";

import { useState } from "react";

export function AdminLoginPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [magicToken, setMagicToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function loginWithPassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Přihlášení selhalo.");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Přihlášení selhalo.");
    } finally {
      setLoading(false);
    }
  }

  async function loginWithMagic(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/magic", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: magicToken }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Magic login selhal.");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Magic login selhal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-panel-strong mt-8 p-8 md:p-10">
      <h2 className="font-display text-xl font-normal text-ink">Admin přihlášení</h2>

      <form onSubmit={loginWithPassword} className="mt-6 grid gap-4">
        <label className="text-sm text-ink/70">
          E-mail
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="mt-2 w-full rounded-xl border border-gold/25 bg-white/80 px-3 py-3 text-sm text-ink outline-none focus:border-gold"
          />
        </label>
        <label className="text-sm text-ink/70">
          Heslo
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="mt-2 w-full rounded-xl border border-gold/25 bg-white/80 px-3 py-3 text-sm text-ink outline-none focus:border-gold"
          />
        </label>
        <button type="submit" disabled={loading} className="btn-primary mt-2">
          <span>{loading ? "Přihlašuji…" : "Přihlásit se"}</span>
        </button>
      </form>

      <form onSubmit={loginWithMagic} className="mt-8 border-t border-gold/15 pt-6">
        <label className="text-sm text-ink/70">
          Magic token
          <input
            value={magicToken}
            onChange={(e) => setMagicToken(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gold/25 bg-white/80 px-3 py-3 text-sm text-ink outline-none focus:border-gold"
          />
        </label>
        <button type="submit" disabled={loading} className="btn-outline-gold mt-4">
          <span>Přihlásit magic linkem</span>
        </button>
      </form>

      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}


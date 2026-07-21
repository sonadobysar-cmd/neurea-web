"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/cms/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Přihlášení selhalo.");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Přihlášení selhalo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-card" onSubmit={onSubmit}>
      <h1>Admin · Kouzlíme s Robinem</h1>
      <p className="admin-muted">Zadejte heslo pro úpravy textů a fotek na webu.</p>
      <label>
        Heslo
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {error ? <p className="admin-error">{error}</p> : null}
      <button type="submit" disabled={loading}>
        {loading ? "Přihlašuji…" : "Přihlásit"}
      </button>
    </form>
  );
}

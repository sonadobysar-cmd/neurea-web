"use client";

import { FormEvent, useState } from "react";

export function AdminPasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus("");
    setError("");
    try {
      const res = await fetch("/api/cms/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Změna hesla selhala.");
      setStatus("Heslo je změněné. Příště se přihlaste novým heslem.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Změna hesla selhala.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="admin-section">
      <h2>Změna hesla</h2>
      <p className="admin-muted">
        Heslo si můžete kdykoli změnit sami. Po změně platí hned pro další přihlášení.
      </p>
      <form className="admin-password-form" onSubmit={onSubmit}>
        <label className="admin-field">
          <span>Současné heslo</span>
          <input
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>
        <label className="admin-field">
          <span>Nové heslo (min. 8 znaků)</span>
          <input
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={8}
            required
          />
        </label>
        <label className="admin-field">
          <span>Nové heslo znovu</span>
          <input
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={8}
            required
          />
        </label>
        {error ? <p className="admin-error">{error}</p> : null}
        {status ? <p className="admin-status">{status}</p> : null}
        <button type="submit" disabled={saving}>
          {saving ? "Ukládám…" : "Změnit heslo"}
        </button>
      </form>
    </section>
  );
}

"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import type { Booking, Review } from "@/lib/store";

type AdminData = { reviews: Review[]; bookings: Booking[] };

export function AdminPanel() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/data");
    if (res.status === 401) {
      setAuthed(false);
      setData(null);
      return;
    }
    if (!res.ok) {
      setError("Nepodařilo se načíst data.");
      return;
    }
    setAuthed(true);
    setData(await res.json());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function login(e: FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Špatné heslo.");
      return;
    }
    setPassword("");
    await load();
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
    setData(null);
  }

  async function setReviewStatus(id: string, status: Review["status"]) {
    const res = await fetch(`/api/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) await load();
  }

  async function setBookingStatus(id: string, status: Booking["status"]) {
    const res = await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) await load();
  }

  if (authed === null) {
    return (
      <div className="admin-shell">
        <div className="container admin-card">Načítám…</div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="admin-shell">
        <div className="container admin-card" style={{ maxWidth: 420 }}>
          <h1 className="display" style={{ fontSize: "2rem", marginTop: 0 }}>
            Admin
          </h1>
          <p className="lead">Interní správa recenzí a rezervací.</p>
          <form onSubmit={login} style={{ display: "grid", gap: "1rem" }}>
            <div className="field">
              <label htmlFor="password">Heslo</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Přihlásit
            </button>
            {error && <p style={{ color: "var(--rose-deep)" }}>{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <div className="container" style={{ display: "grid", gap: "1.25rem" }}>
        <div
          className="admin-card"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div>
            <h1 className="display" style={{ fontSize: "2rem", margin: 0 }}>
              Clinic Samer · Admin
            </h1>
            <p className="lead" style={{ margin: "0.4rem 0 0" }}>
              Schvalování recenzí je skryté před pacientkami.
            </p>
          </div>
          <button className="btn btn-ghost" type="button" onClick={logout}>
            Odhlásit
          </button>
        </div>

        <div className="admin-card">
          <h2 style={{ marginTop: 0 }}>Recenze ke schválení</h2>
          {data?.reviews.length === 0 && <p>Žádné recenze.</p>}
          {data?.reviews.map((r) => (
            <div key={r.id} className="admin-row">
              <div
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <strong>{r.name}</strong>
                <span className="stars">{"★".repeat(r.rating)}</span>
                <span className={`badge badge-${r.status}`}>{r.status}</span>
                <span style={{ color: "var(--stone)", fontSize: "0.85rem" }}>
                  {new Date(r.createdAt).toLocaleString("cs-CZ")} · {r.locale}
                </span>
              </div>
              <p style={{ margin: 0 }}>{r.text}</p>
              <div className="admin-actions">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => setReviewStatus(r.id, "approved")}
                >
                  Schválit
                </button>
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => setReviewStatus(r.id, "rejected")}
                >
                  Zamítnout
                </button>
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => setReviewStatus(r.id, "pending")}
                >
                  Vrátit do fronty
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-card">
          <h2 style={{ marginTop: 0 }}>Rezervace</h2>
          {data?.bookings.length === 0 && <p>Žádné rezervace.</p>}
          {data?.bookings.map((b) => (
            <div key={b.id} className="admin-row">
              <div
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <strong>{b.name}</strong>
                <span className={`badge badge-${b.status}`}>{b.status}</span>
                <span style={{ color: "var(--stone)", fontSize: "0.85rem" }}>
                  {b.preferredDate} {b.preferredTime} · {b.service} · {b.locale}
                </span>
              </div>
              <p style={{ margin: 0 }}>
                {b.email} · {b.phone}
              </p>
              {b.note && <p style={{ margin: 0, color: "var(--stone)" }}>{b.note}</p>}
              <div className="admin-actions">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => setBookingStatus(b.id, "confirmed")}
                >
                  Potvrdit
                </button>
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => setBookingStatus(b.id, "cancelled")}
                >
                  Zrušit
                </button>
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => setBookingStatus(b.id, "new")}
                >
                  Nová
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

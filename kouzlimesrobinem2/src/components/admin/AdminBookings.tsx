"use client";

import { FormEvent, useMemo, useState } from "react";
import type { BookingDashboard, CalendarEntry } from "@/lib/bookings/types";

const PRAGUE_DATE = new Intl.DateTimeFormat("cs-CZ", {
  timeZone: "Europe/Prague",
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const PRAGUE_TIME = new Intl.DateTimeFormat("cs-CZ", {
  timeZone: "Europe/Prague",
  hour: "2-digit",
  minute: "2-digit",
});

function dateKey(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function range(entry: CalendarEntry) {
  return `${PRAGUE_TIME.format(new Date(entry.startAt))}–${PRAGUE_TIME.format(new Date(entry.endAt))}`;
}

function statusLabel(entry: CalendarEntry) {
  if (entry.entryType === "block") return "Blokováno";
  return {
    pending: "Čeká na schválení",
    approved: "Potvrzeno",
    declined: "Zamítnuto",
    cancelled: "Zrušeno",
  }[entry.status];
}

function toIso(value: string): string | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function AdminBookings({
  initial,
  showTitle = true,
}: {
  initial: BookingDashboard;
  showTitle?: boolean;
}) {
  const [dashboard, setDashboard] = useState(initial);
  const [busyId, setBusyId] = useState("");
  const [notice, setNotice] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [blockOpen, setBlockOpen] = useState(false);

  const active = useMemo(
    () =>
      dashboard.entries.filter(
        (entry) =>
          (entry.status === "pending" || entry.status === "approved") &&
          new Date(entry.endAt).getTime() > Date.now(),
      ),
    [dashboard.entries],
  );
  const pending = active.filter((entry) => entry.status === "pending");
  const grouped = useMemo(() => {
    const groups = new Map<string, CalendarEntry[]>();
    for (const entry of active) {
      const key = dateKey(entry.startAt);
      groups.set(key, [...(groups.get(key) ?? []), entry]);
    }
    return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [active]);

  function replaceEntry(updated: CalendarEntry) {
    setDashboard((current) => {
      const entries = current.entries.map((entry) => (entry.id === updated.id ? updated : entry));
      return {
        ...current,
        entries,
        pendingCount: entries.filter((entry) => entry.status === "pending").length,
      };
    });
  }

  async function review(entry: CalendarEntry, status: "approved" | "declined") {
    setBusyId(entry.id);
    setNotice("");
    try {
      const response = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: entry.id, status, adminNote: notes[entry.id] ?? "" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Změnu se nepodařilo uložit.");
      replaceEntry(data.entry);
      setNotice(
        data.emailSent === false
          ? "Změna je uložená, ale e-mail klientovi se nepodařilo odeslat. Kontaktujte ho prosím ručně."
          : status === "approved"
            ? "Termín je potvrzený a klient dostal e-mail."
            : "Termín je zamítnutý a klient dostal e-mail.",
      );
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Změnu se nepodařilo uložit.");
    } finally {
      setBusyId("");
    }
  }

  async function notifyRobin(entry: CalendarEntry) {
    setBusyId(entry.id);
    setNotice("");
    try {
      const response = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: entry.id, action: "notify-robin" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "E-mail se nepodařilo odeslat.");
      replaceEntry(data.entry);
      setNotice("Upozornění Robinovi bylo odesláno.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "E-mail se nepodařilo odeslat.");
    } finally {
      setBusyId("");
    }
  }

  async function cancel(entry: CalendarEntry) {
    if (!window.confirm(`Opravdu uvolnit termín „${entry.title}“?`)) return;
    setBusyId(entry.id);
    setNotice("");
    try {
      const response = await fetch(`/api/admin/bookings?id=${encodeURIComponent(entry.id)}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Termín se nepodařilo uvolnit.");
      replaceEntry(data.entry);
      setNotice(
        entry.entryType === "block"
          ? "Blokace je uvolněná."
          : data.emailSent === false
            ? "Termín je uvolněný, ale e-mail klientovi se nepodařilo odeslat. Kontaktujte ho prosím ručně."
            : "Termín je uvolněný a klient dostal e-mail.",
      );
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Termín se nepodařilo uvolnit.");
    } finally {
      setBusyId("");
    }
  }

  async function addBlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const startAt = toIso(String(formData.get("startAt") ?? ""));
    const endAt = toIso(String(formData.get("endAt") ?? ""));
    if (!startAt || !endAt) {
      setNotice("Vyplňte začátek a konec blokace.");
      return;
    }
    setBusyId("new-block");
    setNotice("");
    try {
      const response = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          note: formData.get("note"),
          startAt,
          endAt,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Termín se nepodařilo zablokovat.");
      setDashboard((current) => ({
        ...current,
        entries: [...current.entries, data.entry],
      }));
      form.reset();
      setBlockOpen(false);
      setNotice("Termín je v Robinově kalendáři zablokovaný.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Termín se nepodařilo zablokovat.");
    } finally {
      setBusyId("");
    }
  }

  return (
    <section className="admin-section admin-bookings" id="rezervace-admin">
      <div className="admin-booking-head">
        <div>
          <div className="admin-booking-title">
            {showTitle ? <h2>Rezervace a kalendář</h2> : null}
            {dashboard.pendingCount > 0 ? (
              <span className="admin-booking-badge" aria-label={`${dashboard.pendingCount} rezervací čeká`}>
                {dashboard.pendingCount} nové
              </span>
            ) : null}
          </div>
          <p className="admin-help">
            Žádost drží zvolený čas. Potvrďte ji, zamítněte, nebo přidejte vlastní blokaci.
          </p>
        </div>
        <button type="button" className="admin-booking-add" onClick={() => setBlockOpen((open) => !open)}>
          {blockOpen ? "Zavřít" : "+ Blokovat termín"}
        </button>
      </div>

      {!dashboard.configured ? (
        <div className="admin-booking-warning" role="status">
          Rezervační databáze ještě není připojená. Veřejný formulář zůstane bezpečně vypnutý.
        </div>
      ) : null}
      {dashboard.error ? <div className="admin-booking-warning">{dashboard.error}</div> : null}
      {notice ? <div className="admin-booking-notice" role="status">{notice}</div> : null}

      {blockOpen ? (
        <form className="admin-block-form" onSubmit={addBlock}>
          <label>
            <span>Název blokace *</span>
            <input name="title" required maxLength={160} placeholder="Např. soukromá akce" />
          </label>
          <label>
            <span>Začátek *</span>
            <input name="startAt" type="datetime-local" required />
          </label>
          <label>
            <span>Konec *</span>
            <input name="endAt" type="datetime-local" required />
          </label>
          <label className="admin-block-wide">
            <span>Soukromá poznámka</span>
            <input name="note" maxLength={2000} placeholder="Návštěvníci ji neuvidí" />
          </label>
          <button type="submit" disabled={busyId === "new-block"}>
            {busyId === "new-block" ? "Ukládám…" : "Zablokovat čas"}
          </button>
        </form>
      ) : null}

      {pending.length > 0 ? (
        <div className="admin-pending-list">
          <h3>Čeká na vaše rozhodnutí</h3>
          {pending.map((entry) => (
            <article className="admin-booking-card is-pending" key={entry.id}>
              <div className="admin-booking-card-main">
                <span className="admin-booking-status">{statusLabel(entry)}</span>
                <h4>{entry.eventType}</h4>
                <strong>{PRAGUE_DATE.format(new Date(entry.startAt))}, {range(entry)}</strong>
                <p>{entry.customerName} · {entry.location}</p>
                <div className="admin-booking-links">
                  {entry.customerPhone ? <a href={`tel:${entry.customerPhone}`}>{entry.customerPhone}</a> : null}
                  {entry.customerEmail ? <a href={`mailto:${entry.customerEmail}`}>{entry.customerEmail}</a> : null}
                </div>
                {entry.guestCount ? <p>Počet hostů: {entry.guestCount}</p> : null}
                {entry.message ? <p className="admin-booking-message">{entry.message}</p> : null}
                {!entry.notificationSentAt ? (
                  <div className="admin-booking-email-warning">
                    <span>E-mailové upozornění Robinovi není potvrzené.</span>
                    <button type="button" onClick={() => notifyRobin(entry)} disabled={busyId === entry.id}>
                      Poslat znovu
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="admin-booking-review">
                <label>
                  <span>Poznámka do e-mailu klientovi</span>
                  <textarea
                    rows={3}
                    value={notes[entry.id] ?? ""}
                    onChange={(event) => setNotes((current) => ({ ...current, [entry.id]: event.target.value }))}
                    placeholder="Volitelné — např. čas příjezdu"
                  />
                </label>
                <div>
                  <button type="button" onClick={() => review(entry, "approved")} disabled={busyId === entry.id}>
                    Schválit a poslat e-mail
                  </button>
                  <button className="admin-booking-decline" type="button" onClick={() => review(entry, "declined")} disabled={busyId === entry.id}>
                    Zamítnout
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : dashboard.configured ? (
        <p className="admin-booking-empty">Žádná nová žádost nečeká na schválení.</p>
      ) : null}

      <div className="admin-calendar-list">
        <h3>Nadcházející obsazené termíny</h3>
        {grouped.length ? grouped.map(([key, entries]) => (
          <div className="admin-calendar-day" key={key}>
            <div className="admin-calendar-date">
              <strong>{PRAGUE_DATE.format(new Date(entries[0].startAt))}</strong>
            </div>
            <div className="admin-calendar-events">
              {entries.map((entry) => (
                <article key={entry.id} className={`admin-calendar-event is-${entry.status}`}>
                  <time>{range(entry)}</time>
                  <div>
                    <strong>{entry.title}</strong>
                    <span>{statusLabel(entry)}{entry.location ? ` · ${entry.location}` : ""}</span>
                  </div>
                  {entry.status === "approved" ? (
                    <button type="button" onClick={() => cancel(entry)} disabled={busyId === entry.id}>
                      Uvolnit
                    </button>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        )) : <p className="admin-booking-empty">V kalendáři zatím nejsou žádné budoucí termíny.</p>}
      </div>
    </section>
  );
}

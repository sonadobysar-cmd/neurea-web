"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { GoogleCalendarDashboard } from "@/lib/google-calendar/types";

const RESULT_MESSAGES: Record<string, string> = {
  connected: "Google účet je připojený. Vyberte kalendáře, které mají blokovat termíny.",
  cancelled: "Propojení bylo zrušené. Kalendář na webu zůstal beze změny.",
  "invalid-state": "Připojení vypršelo. Spusťte jej prosím znovu.",
  error: "Google účet se nepodařilo připojit. Zkuste to prosím znovu.",
  "not-configured": "Google OAuth ještě není nakonfigurovaný na serveru.",
};

function accessLabel(role: string) {
  if (role === "owner") return "Vlastní kalendář";
  if (role === "writer") return "Sdílený · lze upravovat";
  if (role === "freeBusyReader") return "Sdílený · pouze obsazenost";
  return "Sdílený · názvy a časy";
}

export function GoogleCalendarSettings({
  initial,
  result,
}: {
  initial: GoogleCalendarDashboard;
  result?: string;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState(initial.selectedCalendarIds);
  const [destination, setDestination] = useState(initial.destinationCalendarId ?? "");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(result ? RESULT_MESSAGES[result] || "" : "");

  function toggleCalendar(id: string, checked: boolean) {
    setSelected((current) => checked
      ? [...new Set([...current, id])]
      : current.filter((calendarId) => calendarId !== id));
  }

  function chooseDestination(id: string) {
    setDestination(id);
    setSelected((current) => [...new Set([...current, id])]);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch("/api/admin/google-calendar/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedCalendarIds: selected,
          destinationCalendarId: destination,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Nastavení se nepodařilo uložit.");
      setNotice("Nastavení je uložené. Google události nyní automaticky blokují termíny na webu.");
      router.refresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Nastavení se nepodařilo uložit.");
    } finally {
      setBusy(false);
    }
  }

  async function disconnect() {
    if (!window.confirm("Opravdu odpojit Google Kalendář? Již zapsané Google události zůstanou zachované.")) return;
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch("/api/admin/google-calendar/settings", { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Google účet se nepodařilo odpojit.");
      setNotice("Google účet je odpojený. Rezervace a vlastní akce v administraci zůstaly zachované.");
      router.refresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Google účet se nepodařilo odpojit.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="admin-google-calendar" aria-labelledby="google-calendar-title">
      <div className="admin-google-head">
        <div className="admin-google-mark" aria-hidden="true">G</div>
        <div>
          <span className="admin-calendar-kicker">Volitelné propojení</span>
          <h2 id="google-calendar-title">Google Kalendář</h2>
          <p>
            Události z vybraných kalendářů blokují volné časy. Schválené rezervace a vlastní akce se zapisují zpět.
          </p>
        </div>
        <span className={`admin-google-state ${initial.connected ? "is-connected" : ""}`}>
          {initial.connected ? "Připojeno" : "Nepřipojeno"}
        </span>
      </div>

      {notice ? <div className="admin-booking-notice" role="status">{notice}</div> : null}
      {initial.lastError ? <div className="admin-booking-warning" role="alert">{initial.lastError}</div> : null}

      {!initial.configured ? (
        <div className="admin-google-empty">
          <div>
            <strong>Propojení čeká na jednorázové nastavení Google OAuth</strong>
            <span>Po doplnění zabezpečených klíčů se Robin přihlásí sám tímto tlačítkem.</span>
          </div>
          <span className="admin-google-disabled">Čeká na nastavení</span>
        </div>
      ) : !initial.connected ? (
        <div className="admin-google-empty">
          <div>
            <strong>Připojte Robinův Google účet</strong>
            <span>Google heslo se webu nikdy nepředává. Přihlášení proběhne přímo u Googlu.</span>
          </div>
          <a className="admin-google-connect" href="/api/admin/google-calendar/connect">
            Připojit Google Kalendář
          </a>
        </div>
      ) : (
        <form className="admin-google-form" onSubmit={save}>
          <div className="admin-google-account">
            <div>
              <span>Připojený účet</span>
              <strong>{initial.email}</strong>
            </div>
            <a href="/api/admin/google-calendar/connect">Připojit znovu</a>
          </div>

          {initial.calendars.length ? (
            <>
              <fieldset className="admin-google-calendars">
                <legend>Kalendáře, které blokují termíny</legend>
                <p>Zaškrtnuté události se zobrazí Robinovi v administraci a návštěvníkům pouze jako obsazený čas.</p>
                <div>
                  {initial.calendars.map((calendar) => (
                    <label key={calendar.id}>
                      <input
                        type="checkbox"
                        checked={selected.includes(calendar.id)}
                        disabled={calendar.id === destination}
                        onChange={(event) => toggleCalendar(calendar.id, event.target.checked)}
                      />
                      <i style={calendar.backgroundColor ? { backgroundColor: calendar.backgroundColor } : undefined} />
                      <span>
                        <strong>{calendar.summary}{calendar.primary ? " · hlavní" : ""}</strong>
                        <small>{accessLabel(calendar.accessRole)}</small>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="admin-google-destination">
                <span>Kam zapisovat schválené rezervace</span>
                <select value={destination} onChange={(event) => chooseDestination(event.target.value)} required>
                  {initial.calendars.filter((calendar) => calendar.canWrite).map((calendar) => (
                    <option value={calendar.id} key={calendar.id}>{calendar.summary}</option>
                  ))}
                </select>
                <small>Cílový kalendář je vždy zároveň zahrnutý do kontroly obsazenosti.</small>
              </label>

              <div className="admin-google-actions">
                <button type="submit" disabled={busy || !selected.length || !destination}>
                  {busy ? "Ukládám…" : "Uložit propojení"}
                </button>
                <button type="button" className="is-danger" onClick={disconnect} disabled={busy}>
                  Odpojit Google účet
                </button>
              </div>
            </>
          ) : (
            <div className="admin-google-reconnect">
              <p>Seznam kalendářů se nepodařilo načíst.</p>
              <a href="/api/admin/google-calendar/connect">Připojit účet znovu</a>
            </div>
          )}
        </form>
      )}
    </section>
  );
}

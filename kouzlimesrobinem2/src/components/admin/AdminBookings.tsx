"use client";

import { FormEvent, useMemo, useState } from "react";
import { timeToMinutes, workingDayForDateKey } from "@/lib/bookings/schedule";
import type {
  BookingDashboard,
  BookingWorkingDay,
  CalendarEntry,
} from "@/lib/bookings/types";

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
const PRAGUE_MONTH = new Intl.DateTimeFormat("cs-CZ", {
  timeZone: "Europe/Prague",
  month: "long",
  year: "numeric",
});
const PRAGUE_PARTS = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Prague",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});
const WEEKDAYS = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];
const WORKING_DAYS = [
  { weekday: 1, label: "Pondělí" },
  { weekday: 2, label: "Úterý" },
  { weekday: 3, label: "Středa" },
  { weekday: 4, label: "Čtvrtek" },
  { weekday: 5, label: "Pátek" },
  { weekday: 6, label: "Sobota" },
  { weekday: 0, label: "Neděle" },
];
const CALENDAR_START_MINUTES = 7 * 60;
const CALENDAR_END_MINUTES = 23 * 60;
const SLOT_MINUTES = 30;

function dateKey(value: string | Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(typeof value === "string" ? new Date(value) : value);
}

function keyParts(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return { year, month, day };
}

function addDays(key: string, amount: number) {
  const { year, month, day } = keyParts(key);
  const next = new Date(Date.UTC(year, month - 1, day + amount));
  return `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}-${String(next.getUTCDate()).padStart(2, "0")}`;
}

function shiftMonth(monthKey: string, amount: number) {
  const [year, month] = monthKey.split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1 + amount, 1));
  return `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}`;
}

function pragueInstant(key: string, minutes = 0) {
  const { year, month, day } = keyParts(key);
  const target = Date.UTC(year, month - 1, day, Math.floor(minutes / 60), minutes % 60);
  let guess = target;

  for (let iteration = 0; iteration < 2; iteration += 1) {
    const parts = Object.fromEntries(
      PRAGUE_PARTS.formatToParts(new Date(guess))
        .filter((part) => part.type !== "literal")
        .map((part) => [part.type, Number(part.value)]),
    );
    const represented = Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second,
    );
    guess += target - represented;
  }

  return new Date(guess);
}

function calendarDays(monthKey: string) {
  const firstKey = `${monthKey}-01`;
  const { year, month } = keyParts(firstKey);
  const mondayOffset = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
  const gridStart = addDays(firstKey, -mondayOffset);
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
}

function entriesForDay(entries: CalendarEntry[], key: string) {
  const start = pragueInstant(key).getTime();
  const end = pragueInstant(addDays(key, 1)).getTime();
  return entries
    .filter((entry) => new Date(entry.startAt).getTime() < end && new Date(entry.endAt).getTime() > start)
    .sort((a, b) => a.startAt.localeCompare(b.startAt));
}

function entryTone(entry: CalendarEntry) {
  if (entry.status === "pending") return "pending";
  if (entry.entryType === "block") return "blocked";
  return "busy";
}

function eventCountLabel(count: number) {
  if (count === 1) return "1 termín";
  if (count > 1 && count < 5) return `${count} termíny`;
  return `${count} termínů`;
}

function slotTime(minutes: number) {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

function range(entry: CalendarEntry) {
  return `${PRAGUE_TIME.format(new Date(entry.startAt))}–${PRAGUE_TIME.format(new Date(entry.endAt))}`;
}

function statusLabel(entry: CalendarEntry) {
  if (entry.entryType === "block") return "Vlastní akce";
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
  const [hoursOpen, setHoursOpen] = useState(false);
  const [workingHoursDraft, setWorkingHoursDraft] = useState(initial.workingHours);
  const todayKey = dateKey(new Date());
  const [visibleMonth, setVisibleMonth] = useState(todayKey.slice(0, 7));
  const [selectedDate, setSelectedDate] = useState(todayKey);

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
  const calendarEntries = useMemo(
    () => dashboard.entries.filter((entry) => entry.status === "pending" || entry.status === "approved"),
    [dashboard.entries],
  );
  const monthDays = useMemo(() => calendarDays(visibleMonth), [visibleMonth]);
  const selectedEntries = useMemo(
    () => entriesForDay(calendarEntries, selectedDate),
    [calendarEntries, selectedDate],
  );
  const selectedWorkingDay = useMemo(
    () => workingDayForDateKey(dashboard.workingHours, selectedDate),
    [dashboard.workingHours, selectedDate],
  );
  const slots = useMemo(
    () => {
      const workingStart = timeToMinutes(selectedWorkingDay.start);
      const workingEnd = timeToMinutes(selectedWorkingDay.end);
      const calendarStart = selectedWorkingDay.enabled
        ? Math.min(CALENDAR_START_MINUTES, workingStart)
        : CALENDAR_START_MINUTES;
      const calendarEnd = selectedWorkingDay.enabled
        ? Math.max(CALENDAR_END_MINUTES, workingEnd)
        : CALENDAR_END_MINUTES;
      return Array.from(
        { length: Math.ceil((calendarEnd - calendarStart) / SLOT_MINUTES) },
        (_, index) => {
          const minutes = calendarStart + index * SLOT_MINUTES;
          const start = pragueInstant(selectedDate, minutes).getTime();
          const end = pragueInstant(selectedDate, minutes + SLOT_MINUTES).getTime();
          const entry = selectedEntries.find(
            (candidate) =>
              new Date(candidate.startAt).getTime() < end && new Date(candidate.endAt).getTime() > start,
          );
          const orderable =
            selectedWorkingDay.enabled &&
            minutes >= workingStart &&
            minutes + SLOT_MINUTES <= workingEnd;
          return { minutes, entry, past: end <= Date.now(), orderable };
        },
      );
    },
    [selectedDate, selectedEntries, selectedWorkingDay],
  );
  const grouped = useMemo(() => {
    const groups = new Map<string, CalendarEntry[]>();
    for (const entry of active) {
      const key = dateKey(entry.startAt);
      groups.set(key, [...(groups.get(key) ?? []), entry]);
    }
    return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [active]);

  function selectCalendarDay(key: string) {
    setSelectedDate(key);
    if (key.slice(0, 7) !== visibleMonth) setVisibleMonth(key.slice(0, 7));
  }

  function moveMonth(amount: number) {
    const nextMonth = shiftMonth(visibleMonth, amount);
    setVisibleMonth(nextMonth);
    setSelectedDate(nextMonth === todayKey.slice(0, 7) ? todayKey : `${nextMonth}-01`);
  }

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

  function updateWorkingDay(weekday: number, patch: Partial<BookingWorkingDay>) {
    setWorkingHoursDraft((current) => ({
      ...current,
      days: current.days.map((day) =>
        day.weekday === weekday ? { ...day, ...patch } : day,
      ),
    }));
  }

  async function saveWorkingHours(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const invalidDay = workingHoursDraft.days.find(
      (day) => day.enabled && timeToMinutes(day.end) <= timeToMinutes(day.start),
    );
    if (invalidDay) {
      setNotice("Konec objednávací doby musí být později než začátek.");
      return;
    }
    setBusyId("working-hours");
    setNotice("");
    try {
      const response = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "working-hours",
          workingHours: workingHoursDraft,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Objednávací hodiny se nepodařilo uložit.");
      setDashboard((current) => ({ ...current, workingHours: data.workingHours }));
      setWorkingHoursDraft(data.workingHours);
      setHoursOpen(false);
      setNotice("Objednávací hodiny jsou uložené a veřejný formulář se jimi řídí.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Objednávací hodiny se nepodařilo uložit.");
    } finally {
      setBusyId("");
    }
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
          ? "Vlastní akce je uvolněná."
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
      setNotice("Vlastní akce je uložená a její čas se veřejnosti zobrazí jako obsazený.");
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
            Žádost drží zvolený čas. Robin si zde nastaví objednávací dobu i přidá vlastní akce.
          </p>
        </div>
        <div className="admin-booking-actions">
          <button
            type="button"
            className="admin-booking-add is-secondary"
            aria-expanded={hoursOpen}
            onClick={() => {
              if (hoursOpen) {
                setWorkingHoursDraft(dashboard.workingHours);
                setHoursOpen(false);
              } else {
                setBlockOpen(false);
                setHoursOpen(true);
              }
            }}
          >
            {hoursOpen ? "Zavřít hodiny" : "Objednávací hodiny"}
          </button>
          <button
            type="button"
            className="admin-booking-add"
            aria-expanded={blockOpen}
            onClick={() => {
              if (!blockOpen) {
                setHoursOpen(false);
                setWorkingHoursDraft(dashboard.workingHours);
              }
              setBlockOpen((open) => !open);
            }}
          >
            {blockOpen ? "Zavřít akci" : "+ Přidat vlastní akci"}
          </button>
        </div>
      </div>

      {!dashboard.configured ? (
        <div className="admin-booking-warning" role="status">
          Rezervační databáze ještě není připojená. Veřejný formulář zůstane bezpečně vypnutý.
        </div>
      ) : null}
      {dashboard.error ? <div className="admin-booking-warning">{dashboard.error}</div> : null}
      {notice ? <div className="admin-booking-notice" role="status">{notice}</div> : null}

      {hoursOpen ? (
        <form className="admin-working-hours" onSubmit={saveWorkingHours}>
          <div className="admin-working-hours-head">
            <div>
              <h3>Kdy se mohou klienti objednávat</h3>
              <p>Vypnutý den se na webu zobrazí jako nedostupný. Časy platí v českém časovém pásmu.</p>
            </div>
            <span>Europe/Prague</span>
          </div>
          <div className="admin-working-hours-grid">
            {WORKING_DAYS.map(({ weekday, label }) => {
              const day = workingHoursDraft.days.find((candidate) => candidate.weekday === weekday)!;
              return (
                <div className={`admin-working-day${day.enabled ? " is-enabled" : ""}`} key={weekday}>
                  <label className="admin-working-day-toggle">
                    <input
                      type="checkbox"
                      checked={day.enabled}
                      onChange={(event) => updateWorkingDay(weekday, { enabled: event.target.checked })}
                    />
                    <span>{label}</span>
                  </label>
                  <label>
                    <span>Od</span>
                    <input
                      type="time"
                      step={900}
                      value={day.start}
                      disabled={!day.enabled}
                      aria-label={`${label} od`}
                      onChange={(event) => updateWorkingDay(weekday, { start: event.target.value })}
                    />
                  </label>
                  <label>
                    <span>Do</span>
                    <input
                      type="time"
                      step={900}
                      value={day.end}
                      disabled={!day.enabled}
                      aria-label={`${label} do`}
                      onChange={(event) => updateWorkingDay(weekday, { end: event.target.value })}
                    />
                  </label>
                </div>
              );
            })}
          </div>
          <div className="admin-working-hours-footer">
            <p>Existující potvrzené akce zůstanou v kalendáři i po změně pracovní doby.</p>
            <button type="submit" disabled={busyId === "working-hours"}>
              {busyId === "working-hours" ? "Ukládám…" : "Uložit objednávací hodiny"}
            </button>
          </div>
        </form>
      ) : null}

      {blockOpen ? (
        <form className="admin-block-form" onSubmit={addBlock} key={selectedDate}>
          <label>
            <span>Název vlastní akce *</span>
            <input name="title" required maxLength={160} placeholder="Např. vystoupení na oslavě" />
          </label>
          <label>
            <span>Začátek *</span>
            <input name="startAt" type="datetime-local" required defaultValue={`${selectedDate}T10:00`} />
          </label>
          <label>
            <span>Konec *</span>
            <input name="endAt" type="datetime-local" required defaultValue={`${selectedDate}T12:00`} />
          </label>
          <label className="admin-block-wide">
            <span>Soukromá poznámka</span>
            <input name="note" maxLength={2000} placeholder="Návštěvníci ji neuvidí" />
          </label>
          <button type="submit" disabled={busyId === "new-block"}>
            {busyId === "new-block" ? "Ukládám…" : "Přidat akci do kalendáře"}
          </button>
        </form>
      ) : null}

      <div className="admin-calendar-visual">
        <div className="admin-month-panel">
          <div className="admin-month-toolbar">
            <div>
              <span className="admin-calendar-kicker">Měsíční přehled</span>
              <h3>{PRAGUE_MONTH.format(pragueInstant(`${visibleMonth}-01`, 12 * 60))}</h3>
            </div>
            <div className="admin-month-controls">
              <button type="button" onClick={() => moveMonth(-1)} aria-label="Předchozí měsíc">‹</button>
              <button type="button" className="admin-month-today" onClick={() => selectCalendarDay(todayKey)}>
                Dnes
              </button>
              <button type="button" onClick={() => moveMonth(1)} aria-label="Následující měsíc">›</button>
            </div>
          </div>

          <div className="admin-calendar-legend" aria-label="Legenda kalendáře">
            <span><i className="is-free" />Volno</span>
            <span><i className="is-closed" />Mimo objednávání</span>
            <span><i className="is-pending" />Čeká</span>
            <span><i className="is-busy" />Potvrzeno</span>
            <span><i className="is-blocked" />Vlastní akce</span>
          </div>

          <div className="admin-month-weekdays" aria-hidden="true">
            {WEEKDAYS.map((day) => <span key={day}>{day}</span>)}
          </div>
          <div className="admin-month-grid">
            {monthDays.map((key) => {
              const dayEntries = entriesForDay(calendarEntries, key);
              const isOutside = key.slice(0, 7) !== visibleMonth;
              const isPast = key < todayKey;
              const tones = new Set(dayEntries.map(entryTone));
              const workingDay = workingDayForDateKey(dashboard.workingHours, key);
              const state = !dashboard.configured
                ? "bez dat"
                : dayEntries.length
                  ? eventCountLabel(dayEntries.length)
                  : !workingDay.enabled
                    ? "bez objednávání"
                  : isPast
                    ? "uplynulo"
                    : "volno";
              return (
                <button
                  type="button"
                  key={key}
                  className={`admin-month-day${key === selectedDate ? " is-selected" : ""}${key === todayKey ? " is-today" : ""}${isOutside ? " is-outside" : ""}${isPast ? " is-past" : ""}${!dashboard.configured ? " is-unavailable" : ""}`}
                  onClick={() => selectCalendarDay(key)}
                  aria-pressed={key === selectedDate}
                  aria-label={`${PRAGUE_DATE.format(pragueInstant(key, 12 * 60))}: ${state}`}
                >
                  <span className="admin-month-day-number">{Number(key.slice(-2))}</span>
                  <span className="admin-month-day-state">{state}</span>
                  <span className="admin-month-day-dots" aria-hidden="true">
                    {dashboard.configured && !dayEntries.length && !isPast && workingDay.enabled ? <i className="is-free" /> : null}
                    {dashboard.configured && !dayEntries.length && !workingDay.enabled ? <i className="is-closed" /> : null}
                    {tones.has("pending") ? <i className="is-pending" /> : null}
                    {tones.has("busy") ? <i className="is-busy" /> : null}
                    {tones.has("blocked") ? <i className="is-blocked" /> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="admin-day-panel" aria-live="polite">
          <div className="admin-day-panel-head">
            <div>
              <span className="admin-calendar-kicker">Vybraný den</span>
              <h3>{PRAGUE_DATE.format(pragueInstant(selectedDate, 12 * 60))}</h3>
            </div>
            {selectedDate === todayKey ? <span className="admin-day-today">Dnes</span> : null}
          </div>
          <p className="admin-day-summary">
            {!dashboard.configured
              ? "Po připojení databáze se zde zobrazí dostupnost jednotlivých časů."
              : selectedEntries.length
                ? `${eventCountLabel(selectedEntries.length)} v kalendáři. Přesné časy jsou zvýrazněné níže.`
                : !selectedWorkingDay.enabled
                  ? "V tento den Robin nepřijímá online rezervace. Vlastní akci sem ale může přidat kdykoli."
                : selectedDate < todayKey
                  ? "Tento den už uplynul."
                  : `Objednávat lze ${selectedWorkingDay.start}–${selectedWorkingDay.end}. Den je zatím volný.`}
          </p>

          <div className="admin-slot-grid" aria-label={`Časové sloty pro ${PRAGUE_DATE.format(pragueInstant(selectedDate, 12 * 60))}`}>
            {slots.map(({ minutes, entry, past, orderable }) => {
              const tone = entry
                ? entryTone(entry)
                : !dashboard.configured || !orderable
                  ? "unavailable"
                  : past
                    ? "past"
                    : "free";
              const label = entry
                ? entry.status === "pending"
                  ? "Čeká"
                  : entry.entryType === "block"
                    ? "Akce"
                    : "Obsazeno"
                : !dashboard.configured
                  ? "Bez dat"
                  : !orderable
                    ? "Mimo dobu"
                  : past
                    ? "Minulo"
                    : "Volno";
              return (
                <div
                  className={`admin-time-slot is-${tone}`}
                  key={minutes}
                  title={entry ? `${range(entry)} · ${entry.title}` : undefined}
                >
                  <strong>{slotTime(minutes)}</strong>
                  <span>{label}</span>
                </div>
              );
            })}
          </div>

          {selectedEntries.length ? (
            <div className="admin-day-events">
              {selectedEntries.map((entry) => (
                <article className={`is-${entryTone(entry)}`} key={entry.id}>
                  <time>{range(entry)}</time>
                  <div>
                    <strong>{entry.title}</strong>
                    <span>{statusLabel(entry)}{entry.location ? ` · ${entry.location}` : ""}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </aside>
      </div>

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

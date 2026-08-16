import Link from "next/link";
import type { GoogleCalendarDashboard } from "@/lib/google-calendar/types";

export function GoogleCalendarSummary({ status }: { status: GoogleCalendarDashboard }) {
  const selectedCount = status.selectedCalendarIds.length;
  return (
    <section className="admin-google-calendar is-compact" aria-labelledby="google-calendar-summary-title">
      <div className="admin-google-head">
        <div className="admin-google-mark" aria-hidden="true">G</div>
        <div>
          <span className="admin-calendar-kicker">Propojený kalendář</span>
          <h2 id="google-calendar-summary-title">Google Kalendář</h2>
          <p>
            {status.connected
              ? `${status.email} · kalendářů pro obsazenost: ${selectedCount}`
              : status.configured
                ? "Robin může bezpečně připojit svůj Google účet."
                : "Čeká na jednorázové nastavení OAuth."}
          </p>
        </div>
        <span className={`admin-google-state ${status.connected ? "is-connected" : ""}`}>
          {status.connected ? "Připojeno" : "Nepřipojeno"}
        </span>
      </div>
      {status.lastError ? <div className="admin-booking-warning">{status.lastError}</div> : null}
      <Link className="admin-google-manage" href="/admin/google-kalendar">
        {status.connected ? "Spravovat propojení" : "Nastavit Google Kalendář"} →
      </Link>
    </section>
  );
}

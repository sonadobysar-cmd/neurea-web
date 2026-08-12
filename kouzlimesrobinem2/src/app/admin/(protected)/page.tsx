import Link from "next/link";
import { readAnalyticsDashboard } from "@/lib/analytics/store";
import { readBookingDashboard } from "@/lib/bookings/store";
import { isEmailConfigured } from "@/lib/email";
import { isTurnstileConfigured } from "@/lib/turnstile";

export default async function AdminDashboardPage() {
  const [analytics, bookings] = await Promise.all([
    readAnalyticsDashboard(),
    readBookingDashboard(),
  ]);
  const now = Date.now();
  const upcomingCount = bookings.entries.filter(
    (entry) =>
      new Date(entry.endAt).getTime() >= now &&
      entry.status !== "declined" &&
      entry.status !== "cancelled",
  ).length;
  const turnstileReady = isTurnstileConfigured();
  const emailReady = isEmailConfigured();

  return (
    <div className="admin-page-stack">
      <header className="admin-page-header">
        <div>
          <span className="admin-page-kicker">Dobrý den, Robine</span>
          <h1>Přehled administrace</h1>
          <p>To nejdůležitější na jednom místě. Podrobnosti najdete v samostatných sekcích.</p>
        </div>
      </header>

      {!turnstileReady ? (
        <div className="admin-booking-warning" role="alert">
          Cloudflare Turnstile zatím nemá produkční klíče. Veřejné formuláře zůstanou bezpečně vypnuté do jejich doplnění.
        </div>
      ) : null}

      {!emailReady ? (
        <div className="admin-booking-warning" role="alert">
          E-mailová upozornění zatím nejsou v tomto prostředí aktivní. Rezervace se uloží, ale Robin ani klient nedostanou e-mail.
        </div>
      ) : null}

      <section className="admin-overview-grid" aria-label="Rychlý přehled">
        <Link href="/admin/rezervace" className="admin-overview-card is-accent">
          <span>Čeká na schválení</span>
          <strong>{bookings.pendingCount}</strong>
          <small>Otevřít rezervace →</small>
        </Link>
        <Link href="/admin/rezervace" className="admin-overview-card">
          <span>Nadcházející položky</span>
          <strong>{upcomingCount}</strong>
          <small>Rezervace i blokace →</small>
        </Link>
        <Link href="/admin/statistiky" className="admin-overview-card">
          <span>Návštěvy za 30 dní</span>
          <strong>{analytics.status === "ready" ? analytics.month.visits : "—"}</strong>
          <small>Otevřít statistiky →</small>
        </Link>
        <Link href="/admin/nastaveni" className="admin-overview-card">
          <span>Provoz rezervací</span>
          <strong className="admin-overview-status">
            {bookings.configured && turnstileReady && emailReady ? "Připraveno" : "Doplnit"}
          </strong>
          <small>Databáze, e-maily a ochrana →</small>
        </Link>
      </section>

      <section className="admin-section admin-quick-links">
        <div>
          <h2>Co chcete upravit?</h2>
          <p className="admin-help">Každá oblast má vlastní stránku a vlastní tlačítko pro uložení.</p>
        </div>
        <div className="admin-quick-grid">
          <Link href="/admin/obsah"><strong>Texty webu</strong><span>Úvod, služby, kontakt a patička</span></Link>
          <Link href="/admin/fotky"><strong>Fotky a galerie</strong><span>Hlavní galerie a fotky z vystoupení</span></Link>
          <Link href="/admin/cenik"><strong>Ceník</strong><span>Vstupenky, ceny a doprava</span></Link>
          <Link href="/admin/pravni"><strong>Právní texty</strong><span>Podmínky a ochrana údajů</span></Link>
        </div>
      </section>
    </div>
  );
}

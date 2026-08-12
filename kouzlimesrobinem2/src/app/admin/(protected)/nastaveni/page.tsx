import { AdminPasswordForm } from "@/components/admin/AdminPasswordForm";
import { isBookingDatabaseConfigured } from "@/lib/bookings/store";
import { isEmailConfigured } from "@/lib/email";
import { isTurnstileConfigured } from "@/lib/turnstile";

export default function AdminSettingsPage() {
  const turnstileReady = isTurnstileConfigured();
  const databaseReady = isBookingDatabaseConfigured();
  const emailReady = isEmailConfigured();

  return (
    <div className="admin-page-stack">
      <header className="admin-page-header">
        <div>
          <span className="admin-page-kicker">Účet a bezpečnost</span>
          <h1>Nastavení</h1>
          <p>Změna přístupového hesla a kontrola ochrany veřejných formulářů.</p>
        </div>
      </header>
      <section className="admin-section">
        <h2>Stav rezervačního systému</h2>
        <div className="admin-config-grid">
          <div className={`admin-config-state ${databaseReady ? "is-ready" : "is-warning"}`}>
            <strong>{databaseReady ? "Databáze rezervací je připojená" : "Databáze rezervací není připojená"}</strong>
            <span>
              {databaseReady
                ? "Rezervace, schválené termíny i Robinovy blokace se bezpečně ukládají."
                : "Bez databáze nelze přijímat ani spravovat termíny."}
            </span>
          </div>
          <div className={`admin-config-state ${emailReady ? "is-ready" : "is-warning"}`}>
            <strong>{emailReady ? "E-mailová upozornění jsou aktivní" : "E-mailová upozornění nejsou aktivní"}</strong>
            <span>
              {emailReady
                ? "Robin dostane novou žádost a klient obdrží zprávu po schválení nebo zamítnutí."
                : "Rezervace se uloží, ale bez e-mailového upozornění."}
            </span>
          </div>
          <div className={`admin-config-state ${turnstileReady ? "is-ready" : "is-warning"}`}>
            <strong>{turnstileReady ? "Cloudflare Turnstile je aktivní" : "Chybí produkční klíče Cloudflare Turnstile"}</strong>
            <span>
              {turnstileReady
                ? "Kontaktní a rezervační formulář jsou chráněné proti automatizovanému spamu."
                : "Formuláře zůstávají bezpečně vypnuté, dokud se klíče nedoplní ve Vercelu."}
            </span>
          </div>
        </div>
      </section>
      <AdminPasswordForm />
    </div>
  );
}

import { AdminPasswordForm } from "@/components/admin/AdminPasswordForm";
import { isTurnstileConfigured } from "@/lib/turnstile";

export default function AdminSettingsPage() {
  const turnstileReady = isTurnstileConfigured();

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
        <h2>Ochrana formulářů</h2>
        <div className={`admin-config-state ${turnstileReady ? "is-ready" : "is-warning"}`}>
          <strong>{turnstileReady ? "Cloudflare Turnstile je aktivní" : "Chybí produkční klíče Cloudflare Turnstile"}</strong>
          <span>
            {turnstileReady
              ? "Kontaktní a rezervační formulář jsou chráněné proti automatizovanému spamu."
              : "Formuláře zůstávají bezpečně vypnuté, dokud se klíče nedoplní ve Vercelu."}
          </span>
        </div>
      </section>
      <AdminPasswordForm />
    </div>
  );
}

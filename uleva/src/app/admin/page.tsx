import { getCityMetrics, statusLabel } from "@/data/cityStatus";

export const metadata = {
  robots: { index: false, follow: false },
  title: "MamaSOS Admin — přehled měst",
};

export default function AdminPage() {
  const cities = getCityMetrics();

  return (
    <div className="shell pb-16 pt-28 md:pb-24 md:pt-32">
      <p className="eyebrow">Interní</p>
      <h1 className="display mt-2 text-4xl md:text-5xl">Přehled lokalit</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-soft">
        Nábor pečujících je otevřený po celé ČR. Stav města slouží k prioritizaci
        marketingu a informování klientek — ne k zákazu registrace.
      </p>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--line)] text-xs uppercase tracking-wide text-ink-soft">
              <th className="py-3 pr-3">Město</th>
              <th className="py-3 pr-3">Stav</th>
              <th className="py-3 pr-3">Registrované</th>
              <th className="py-3 pr-3">Ověřené</th>
              <th className="py-3 pr-3">S kalendářem</th>
              <th className="py-3 pr-3">Sloty 14 dní</th>
              <th className="py-3">Čekající klientky</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((c) => (
              <tr key={c.cityKey} className="border-b border-[var(--line)]">
                <td className="py-3 pr-3 font-bold">{c.label}</td>
                <td className="py-3 pr-3">{statusLabel(c.status)}</td>
                <td className="py-3 pr-3">{c.registered}</td>
                <td className="py-3 pr-3">{c.verified}</td>
                <td className="py-3 pr-3">{c.withCalendar}</td>
                <td className="py-3 pr-3">{c.openSlots14d}</td>
                <td className="py-3">{c.waitingClients}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-8 space-y-2 text-sm text-ink-soft">
        <li>• Schválit / zamítnout ověření — TODO napojit na backend</li>
        <li>• Skrýt neaktivní profil / vyžádat aktualizaci dokladů — TODO</li>
        <li>• Rozeslat pečujícím upozornění podle města — TODO</li>
        <li>• Kontaktovat čekající klientky po aktivaci lokality — TODO</li>
      </ul>
    </div>
  );
}

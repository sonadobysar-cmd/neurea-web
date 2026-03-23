import { cookies } from "next/headers";
import { AdminLoginPanel } from "@/components/AdminLoginPanel";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { PageShell } from "@/components/PageShell";
import { getAdminCookieName, verifyAdminSessionValue } from "@/lib/adminAuth";
import { listBookings } from "@/lib/bookingStore";

export default async function AdminRezervacePage() {
  const cookieStore = await cookies();
  const session = verifyAdminSessionValue(cookieStore.get(getAdminCookieName())?.value);

  if (!session) {
    return (
      <PageShell className="max-w-2xl">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
          Rezervace
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/60">
          Přihlaste se heslem nebo magic tokenem.
        </p>
        <AdminLoginPanel />
      </PageShell>
    );
  }

  const bookings = (await listBookings()).sort((a, b) => {
    const aKey = `${a.date} ${a.time}`;
    const bKey = `${b.date} ${b.time}`;
    return aKey < bKey ? -1 : aKey > bKey ? 1 : 0;
  });

  return (
    <PageShell variant="wide">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
            Rezervace
          </h1>
          <p className="mt-4 text-sm text-ink/60">Přihlášená agenda: {session.email}</p>
        </div>
        <AdminLogoutButton />
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-white/70 bg-white/60 shadow-luxury backdrop-blur-md">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/[0.06] bg-fog/80">
            <tr>
              <th className="px-4 py-3">Termín</th>
              <th className="px-4 py-3">Klient</th>
              <th className="px-4 py-3">Služba</th>
              <th className="px-4 py-3">Platba</th>
              <th className="px-4 py-3">Stav</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-ink/55" colSpan={5}>
                  Zatím bez rezervací.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id} className="border-t border-ink/[0.05]">
                  <td className="px-4 py-4">
                    <div className="font-medium text-ink">{b.date}</div>
                    <div className="text-ink/55">{b.time}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-ink">{b.clientName}</div>
                    <div className="text-ink/55">{b.clientEmail}</div>
                    <div className="text-ink/55">{b.clientPhone}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-ink">{b.serviceName}</div>
                    <div className="text-ink/55">{b.durationMin} min</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-ink">{b.chargedAmountCzk.toLocaleString("cs-CZ")} Kč</div>
                    <div className="text-ink/55">{b.paymentOption}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-full border border-gold/25 bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-ink/70">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}


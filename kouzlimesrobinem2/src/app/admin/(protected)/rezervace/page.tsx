import { AdminBookings } from "@/components/admin/AdminBookings";
import { GoogleCalendarSummary } from "@/components/admin/GoogleCalendarSummary";
import { readBookingDashboard } from "@/lib/bookings/store";
import { readGoogleCalendarDashboard } from "@/lib/google-calendar/store";

export default async function AdminBookingsPage() {
  const now = Date.now();
  const [bookings, google] = await Promise.all([
    readBookingDashboard(),
    readGoogleCalendarDashboard(
      new Date(now - 14 * 24 * 60 * 60_000),
      new Date(now + 400 * 24 * 60 * 60_000),
    ),
  ]);
  bookings.entries = [...bookings.entries, ...google.entries]
    .sort((a, b) => a.startAt.localeCompare(b.startAt));

  return (
    <div className="admin-page-stack">
      <header className="admin-page-header">
        <div>
          <span className="admin-page-kicker">Kalendář</span>
          <h1>Rezervace</h1>
          <p>Objednávací hodiny, schvalování poptávek a Robinovy vlastní akce v jednom přehledu.</p>
        </div>
      </header>
      <GoogleCalendarSummary status={google} />
      <AdminBookings initial={bookings} showTitle={false} />
    </div>
  );
}

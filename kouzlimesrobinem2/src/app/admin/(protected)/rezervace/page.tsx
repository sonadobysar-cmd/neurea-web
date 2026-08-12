import { AdminBookings } from "@/components/admin/AdminBookings";
import { readBookingDashboard } from "@/lib/bookings/store";

export default async function AdminBookingsPage() {
  const bookings = await readBookingDashboard();

  return (
    <div className="admin-page-stack">
      <header className="admin-page-header">
        <div>
          <span className="admin-page-kicker">Kalendář</span>
          <h1>Rezervace</h1>
          <p>Schvalování poptávek, odmítnutí termínů a vlastní blokace v jednom přehledu.</p>
        </div>
      </header>
      <AdminBookings initial={bookings} showTitle={false} />
    </div>
  );
}

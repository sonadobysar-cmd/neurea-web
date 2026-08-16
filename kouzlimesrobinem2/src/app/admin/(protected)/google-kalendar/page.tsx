import { GoogleCalendarSettings } from "@/components/admin/GoogleCalendarSettings";
import { readGoogleCalendarSettingsDashboard } from "@/lib/google-calendar/store";

export default async function AdminGoogleCalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ google?: string }>;
}) {
  const [google, query] = await Promise.all([
    readGoogleCalendarSettingsDashboard(),
    searchParams,
  ]);

  return (
    <div className="admin-page-stack">
      <header className="admin-page-header">
        <div>
          <span className="admin-page-kicker">Kalendář</span>
          <h1>Google propojení</h1>
          <p>Výběr kalendářů pro kontrolu obsazenosti a zápis schválených rezervací.</p>
        </div>
      </header>
      <GoogleCalendarSettings initial={google} result={query.google} />
    </div>
  );
}

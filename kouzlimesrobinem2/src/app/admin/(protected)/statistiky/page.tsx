import { AdminAnalytics } from "@/components/admin/AdminAnalytics";
import { readAnalyticsDashboard } from "@/lib/analytics/store";

export default async function AdminAnalyticsPage() {
  const analytics = await readAnalyticsDashboard();

  return (
    <div className="admin-page-stack">
      <header className="admin-page-header">
        <div>
          <span className="admin-page-kicker">Soukromý přehled</span>
          <h1>Statistiky webu</h1>
          <p>Návštěvnost, zdroje návštěv a používaná zařízení bez osobních údajů návštěvníků.</p>
        </div>
      </header>
      <AdminAnalytics dashboard={analytics} showTitle={false} />
    </div>
  );
}

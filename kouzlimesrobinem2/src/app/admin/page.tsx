import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { readSiteContent } from "@/lib/cms/store";
import { readAnalyticsDashboard } from "@/lib/analytics/store";
import { AdminEditor } from "@/components/admin/AdminEditor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const [content, analytics] = await Promise.all([
    readSiteContent(),
    readAnalyticsDashboard(),
  ]);
  return <AdminEditor initial={content} analytics={analytics} />;
}

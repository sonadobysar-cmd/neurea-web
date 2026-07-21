import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { readSiteContent } from "@/lib/cms/store";
import { AdminEditor } from "@/components/admin/AdminEditor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const content = await readSiteContent();
  return <AdminEditor initial={content} />;
}

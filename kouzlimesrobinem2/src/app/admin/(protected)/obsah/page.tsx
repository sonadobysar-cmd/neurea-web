import { AdminEditor } from "@/components/admin/AdminEditor";
import { readSiteContent } from "@/lib/cms/store";

export default async function AdminContentPage() {
  return <AdminEditor initial={await readSiteContent()} view="content" />;
}

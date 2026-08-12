import { AdminEditor } from "@/components/admin/AdminEditor";
import { readSiteContent } from "@/lib/cms/store";

export default async function AdminPhotosPage() {
  return <AdminEditor initial={await readSiteContent()} view="media" />;
}

import { AdminEditor } from "@/components/admin/AdminEditor";
import { readSiteContent } from "@/lib/cms/store";

export default async function AdminPricingPage() {
  return <AdminEditor initial={await readSiteContent()} view="pricing" />;
}

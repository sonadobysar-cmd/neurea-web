import { redirect } from "next/navigation";

/** /lic → static studio (public/lic/index.html) */
export default function LicPage() {
  redirect("/lic/index.html");
}

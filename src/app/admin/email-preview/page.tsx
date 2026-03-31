import { cookies } from "next/headers";
import Link from "next/link";
import { AdminLoginPanel } from "@/components/AdminLoginPanel";
import { PageShell } from "@/components/PageShell";
import { buildBookingConfirmationHtml } from "@/lib/email/bookingConfirmationHtml";
import { MOCK_BOOKING_FOR_PREVIEW } from "@/lib/email/mockBooking";
import { getAdminCookieName, verifyAdminSessionValue } from "@/lib/adminAuth";

export const metadata = {
  title: "Náhled e-mailu",
};

export default async function AdminEmailPreviewPage() {
  const cookieStore = await cookies();
  const session = verifyAdminSessionValue(cookieStore.get(getAdminCookieName())?.value);

  if (!session) {
    return (
      <PageShell className="max-w-2xl">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink md:text-5xl">
          Náhled e-mailu
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/60">
          Pro zobrazení náhledu potvrzovacího e-mailu se přihlaste.
        </p>
        <AdminLoginPanel />
      </PageShell>
    );
  }

  const html = buildBookingConfirmationHtml(MOCK_BOOKING_FOR_PREVIEW);

  return (
    <PageShell variant="wide">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-4 font-display text-3xl font-normal tracking-tight text-ink md:text-4xl">
            Náhled potvrzovacího e-mailu
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/60">
            Ukázková data (jméno, termín, částka) jsou pouze pro náhled. Skutečný e-mail se generuje po
            platbě se skutečnými údaji. Úpravy vzhledu v souboru{" "}
            <code className="rounded bg-ink/5 px-1">src/lib/email/bookingConfirmationHtml.ts</code>.
          </p>
        </div>
        <Link href="/admin/rezervace" className="text-sm font-normal text-gold transition hover:underline">
          ← Zpět na rezervace
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-gold/20 bg-[#f0f0f0] shadow-luxury">
        <p className="border-b border-gold/15 bg-white/90 px-4 py-2 text-center text-xs text-ink/45">
          Náhled (stejný HTML jako v e-mailové schránce)
        </p>
        <iframe
          title="Náhled potvrzovacího e-mailu"
          srcDoc={html}
          className="h-[min(85vh,900px)] w-full border-0 bg-white"
          sandbox="allow-same-origin"
        />
      </div>
    </PageShell>
  );
}

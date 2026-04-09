import { BookingFlow } from "@/components/BookingFlow";
import { PageShell } from "@/components/PageShell";

/** Klasická online rezervace (Stripe) — pouze na hlavní doméně neurea.cz. */
export function RezervaceBookingPage() {
  return (
    <PageShell variant="wide" className="py-10 md:py-14">
      <p className="eyebrow">Online</p>
      <h1 className="mt-3 font-display text-3xl font-normal tracking-tight text-ink md:text-4xl">
        Rezervace termínu
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
        Vyberte službu, datum a čas. Platba proběhne bezpečně přes Stripe.
      </p>
      <BookingFlow />
    </PageShell>
  );
}

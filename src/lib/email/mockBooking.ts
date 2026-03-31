import type { Booking } from "@/lib/bookingStore";

/** Ukázková rezervace jen pro náhled e-mailu v /admin/email-preview */
export const MOCK_BOOKING_FOR_PREVIEW: Booking = {
  id: "preview-mock",
  serviceId: "vstupni-diagnostika",
  serviceName: "Vstupní diagnostika",
  durationMin: 75,
  servicePriceCzk: 3500,
  paymentOption: "deposit_1000",
  chargedAmountCzk: 1000,
  date: "2026-06-15",
  time: "10:30",
  clientName: "Jana Nováková",
  clientEmail: "klient@example.cz",
  clientPhone: "+420 777 888 999",
  notes: "",
  status: "paid",
  createdAt: new Date().toISOString(),
  paidAt: new Date().toISOString(),
  confirmationEmailSent: true,
};

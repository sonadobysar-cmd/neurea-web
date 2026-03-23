export type ServiceDefinition = {
  id: string;
  name: string;
  durationMin: number;
  priceCzk: number;
};

export type PaymentOption = "deposit_500" | "deposit_1000" | "full" | "test_10";

export const SERVICES: ServiceDefinition[] = [
  { id: "vstupni-diagnostika", name: "Vstupní diagnostika", durationMin: 75, priceCzk: 3500 },
  { id: "serie-5", name: "Série 5 sezení", durationMin: 75, priceCzk: 14000 },
  { id: "serie-10", name: "Série 10 sezení", durationMin: 75, priceCzk: 25000 },
  { id: "detsky-program", name: "Dětský program (série 5)", durationMin: 60, priceCzk: 12000 },
  { id: "hrv-biofeedback", name: "HRV biofeedback", durationMin: 45, priceCzk: 1600 },
  { id: "tdcs", name: "Transkraniální stimulace (tDCS)", durationMin: 45, priceCzk: 2200 },
  { id: "ces", name: "Kranální elektrostimulace (CES)", durationMin: 45, priceCzk: 1800 },
  { id: "fotobiomodulace", name: "Fotobiomodulace mozku", durationMin: 45, priceCzk: 2200 },
  { id: "myofascialni-prace", name: "Myofasciální práce", durationMin: 60, priceCzk: 2000 },
];

export const PAYMENT_OPTIONS: { id: PaymentOption; label: string }[] = [
  { id: "deposit_500", label: "Záloha 500 Kč" },
  { id: "deposit_1000", label: "Záloha 1 000 Kč" },
  { id: "full", label: "Plná platba" },
];

/**
 * Dočasná nejnižší testovací platba (vždy v UI, dokud neodstraníme).
 * Pozn.: Stripe pro CZK obvykle nepřijme méně než ~15 Kč — proto 15 Kč, ne 10 Kč.
 * Odstranění: smaž `test_10` z PaymentOption, řádky v getChargeAmountCzk, tuto konstantu,
 * úpravu v BookingFlow (paymentOptions) a v checkout route (popis TEST … Kč).
 */
export const PAYMENT_OPTION_TEST_10: { id: PaymentOption; label: string } = {
  id: "test_10",
  label: "Test 15 Kč (dočasně)",
};

export function getChargeAmountCzk(servicePriceCzk: number, paymentOption: PaymentOption) {
  /** Minimální částka pro CZK u Stripe (~15 Kč) - viz chyby při 10 Kč */
  if (paymentOption === "test_10") return 15;
  if (paymentOption === "deposit_500") return 500;
  if (paymentOption === "deposit_1000") return 1000;
  return servicePriceCzk;
}

export function getServiceById(serviceId: string) {
  return SERVICES.find((s) => s.id === serviceId) || null;
}


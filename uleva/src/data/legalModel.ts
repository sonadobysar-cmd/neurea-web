/**
 * Locked product/legal model for MamaSOS (pending lawyer confirmation of wording).
 * Do NOT mix A/B/C in product or contracts.
 */
export const MARKETPLACE_MODEL = "A_TRUE_MARKETPLACE" as const;

export const MODEL_SUMMARY = {
  id: MARKETPLACE_MODEL,
  label: "Varianta A — skutečné online tržiště",
  careContract: "Klientka ↔ pečující (OSVČ)",
  platformRole:
    "MamaSOS zprostředkuje vyhledání, rezervaci, platbu (přes licencovaného providera) a podporu.",
  clientSees: "Jméno, IČO pečující, služba, termín, konečná cena před platbou.",
  paymentsRule:
    "Klientské peníze neprocházejí běžným provozním účtem MamaSOS bez právního posouzení. Preferovat split payments / connected accounts.",
  livePaymentsBlockedUntil:
    "Písemné potvrzení advokáta + daňového poradce k fakturaci a platebnímu toku.",
} as const;

/**
 * Economics on site today: client price vs caregiver payout.
 * Accounting method is NOT chosen — lawyer/tax must pick ONE.
 */
export type BillingHypothesisId =
  | "caregiver_invoices_client_full_mama_commission"
  | "split_invoices_client_care_and_platform"
  | "mama_invoices_client_caregiver_subcontractor";

export const BILLING_HYPOTHESES: {
  id: BillingHypothesisId;
  title: string;
  exampleUleva: string;
  fitsVariantA: boolean;
  note: string;
}[] = [
  {
    id: "caregiver_invoices_client_full_mama_commission",
    title: "Pečující fakturuje klientce plnou cenu; MamaSOS účtuje pečující provizi",
    exampleUleva:
      "Klientka 449 Kč/h · pečující obdrží 250 Kč/h · MamaSOS fakturuje pečující ~199 Kč/h jako zprostředkování (nebo % ekvivalent).",
    fitsVariantA: true,
    note: "Nejbližší k variantě A. Vyžaduje jasnou smlouvu MamaSOS–pečující a případně inkaso jménem pečující (obchodní zástupce) přes licencovanou bránu.",
  },
  {
    id: "split_invoices_client_care_and_platform",
    title: "Klientka dostane dvě položky: služba pečující + služba MamaSOS",
    exampleUleva:
      "Pečující 250 Kč/h + MamaSOS 199 Kč/h = 449 Kč/h. Transparentní dvě smluvní strany.",
    fitsVariantA: false,
    note: "Blíží se variantě C — dvě služby. Složitější pro klientku a DPH.",
  },
  {
    id: "mama_invoices_client_caregiver_subcontractor",
    title: "MamaSOS fakturuje klientce 449 Kč; pečující fakturuje MamaSOS 250 Kč",
    exampleUleva: "MamaSOS = prodávající služby klientce; pečující = subdodavatel.",
    fitsVariantA: false,
    note: "Varianta B — NELZE tvrdit „jsme jen zprostředkovatel“ a odmítat odpovědnost za kvalitu.",
  },
];

export const LAWYER_BRIEF_QUESTIONS = [
  "Je MamaSOS online tržiště / zprostředkovatel, nebo poskytovatel služby?",
  "Kdo uzavírá smlouvu s klientkou?",
  "Jak správně účtovat rozdělení klientské ceny a výplaty pečující (např. 449/250 u Úlevy)?",
  "Může MamaSOS nastavit jednotnou cenu segmentu?",
  "Nejde o poskytování platební služby (zákon č. 370/2017 Sb.)?",
  "Nejde o zprostředkování zaměstnání vyžadující povolení MPSV?",
  "Nevykazují vztahy s pečujícími znaky závislé práce (švarcsystém)?",
  "Jaké živnosti potřebují Úleva / dula / laktace?",
  "Kde končí příležitostné hlídání a začíná regulovaná péče do 3 let v denním režimu?",
  "Kde končí nezdravotní podpora a začíná zdravotní služba?",
  "Jak zákonně kontrolovat a evidovat výpis z RT?",
  "Jaké povinnosti plynou z DSA, P2B a DAC7?",
  "Jak řešit odstoupení do 14 dnů u blízkých termínů?",
  "Kdo vyřizuje reklamaci služby a kdo vrací peníze?",
  "Jaké pojistné krytí je nezbytné?",
  "Jaká DPIA a GDPR dokumentace je potřebná?",
  "Jaké texty musí být přímo v checkoutu a potvrzovacím e-mailu?",
] as const;

export const RANKING_RULES_PUBLIC = [
  "Vzdálenost od zadané lokality",
  "Shoda se zvolenými potřebami / typem služby",
  "Aktivní kalendář a počet volných termínů",
  "Hodnocení z dokončených návštěv",
  "Pořadí není placené — platba neposouvá profil výše",
] as const;

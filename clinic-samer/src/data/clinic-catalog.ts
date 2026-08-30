/** Data from Známy lékař profile — https://www.znamylekar.cz/profil/samer-asad */

export type PricedService = {
  id: string;
  name: Record<"cs" | "en" | "de" | "it" | "ar", string>;
  price?: string;
  priceNote?: Record<"cs" | "en" | "de" | "it" | "ar", string>;
};

export type PriceCategory = {
  id: "general" | "fertility" | "specialized";
  title: Record<"cs" | "en" | "de" | "it" | "ar", string>;
  description: Record<"cs" | "en" | "de" | "it" | "ar", string>;
  serviceIds: string[];
};

export const pricedServices: PricedService[] = [
  {
    id: "online-consultation",
    name: {
      cs: "Online konzultace",
      en: "Online consultation",
      de: "Online-Beratung",
      it: "Consulto online",
      ar: "استشارة عبر الإنترنت",
    },
    price: "1 500 Kč",
  },
  {
    id: "gyn-exam",
    name: {
      cs: "Gynekologické vyšetření",
      en: "Gynaecological examination",
      de: "Gynäkologische Untersuchung",
      it: "Visita ginecologica",
      ar: "فحص نسائي",
    },
    price: "od 500 Kč",
  },
  {
    id: "complex-gyn",
    name: {
      cs: "Komplexní gynekologické vyšetření",
      en: "Comprehensive gynaecological exam",
      de: "Umfassende gynäkologische Untersuchung",
      it: "Visita ginecologica completa",
      ar: "فحص نسائي شامل",
    },
  },
  {
    id: "routine",
    name: {
      cs: "Běžný termín",
      en: "Standard appointment",
      de: "Regulärer Termin",
      it: "Visita ordinaria",
      ar: "موعد عادي",
    },
  },
  {
    id: "ultrasound",
    name: {
      cs: "Gynekologický ultrazvuk",
      en: "Gynaecological ultrasound",
      de: "Gynäkologischer Ultraschall",
      it: "Ecografia ginecologica",
      ar: "موجات فوق صوتية نسائية",
    },
  },
  {
    id: "cytology",
    name: {
      cs: "Cytologie",
      en: "Cytology",
      de: "Zytologie",
      it: "Citologia",
      ar: "فحص الخلايا",
    },
  },
  {
    id: "contraception",
    name: {
      cs: "Antikoncepce",
      en: "Contraception",
      de: "Verhütung",
      it: "Contraccezione",
      ar: "منع الحمل",
    },
  },
  {
    id: "hpv",
    name: {
      cs: "Očkování proti HPV",
      en: "HPV vaccination",
      de: "HPV-Impfung",
      it: "Vaccino HPV",
      ar: "تطعيم فيروس الورم الحليمي",
    },
  },
  {
    id: "pregnancy",
    name: {
      cs: "Péče o těhotné",
      en: "Pregnancy care",
      de: "Schwangerschaftsbegleitung",
      it: "Assistenza in gravidanza",
      ar: "رعاية الحمل",
    },
  },
  {
    id: "prenatal-4d",
    name: {
      cs: "Prenatální péče, genetické testy a ultrazvuk 4D",
      en: "Prenatal care, genetic tests and 4D ultrasound",
      de: "Pränatalvorsorge, Gentests und 4D-Ultraschall",
      it: "Cure prenatali, test genetici ed ecografia 4D",
      ar: "رعاية ما قبل الولادة والفحوصات الجينية والموجات 4D",
    },
    price: "2 500 Kč",
  },
  {
    id: "infertility",
    name: {
      cs: "Konzultace neplodných párů",
      en: "Infertility couple consultation",
      de: "Beratung bei Kinderwunsch",
      it: "Consulenza infertilità di coppia",
      ar: "استشارة العقم للزوجين",
    },
    price: "od 2 500 Kč",
  },
  {
    id: "reproductive",
    name: {
      cs: "Reprodukční medicína",
      en: "Reproductive medicine",
      de: "Reproduktionsmedizin",
      it: "Medicina riproduttiva",
      ar: "طب الإنجاب",
    },
  },
  {
    id: "amh",
    name: {
      cs: "Vyšetření AMH",
      en: "AMH testing",
      de: "AMH-Untersuchung",
      it: "Esame AMH",
      ar: "فحص AMH",
    },
  },
  {
    id: "hormones",
    name: {
      cs: "Hormonální vyšetření",
      en: "Hormone testing",
      de: "Hormonuntersuchung",
      it: "Esami ormonali",
      ar: "فحوصات هرمونية",
    },
  },
  {
    id: "thyroid",
    name: {
      cs: "Vyšetření štítné žlázy",
      en: "Thyroid examination",
      de: "Schilddrüsenuntersuchung",
      it: "Esame della tiroide",
      ar: "فحص الغدة الدرقية",
    },
  },
  {
    id: "sti",
    name: {
      cs: "Vyšetření pohlavně přenosných chorob",
      en: "STI screening",
      de: "Untersuchung auf Geschlechtskrankheiten",
      it: "Screening MST",
      ar: "فحص الأمراض المنقولة جنسياً",
    },
  },
  {
    id: "culture",
    name: {
      cs: "Kultivační vyšetření",
      en: "Culture testing",
      de: "Kulturuntersuchung",
      it: "Esame colturale",
      ar: "فحص زرع",
    },
  },
  {
    id: "breast",
    name: {
      cs: "Vyšetření prsu",
      en: "Breast examination",
      de: "Brustuntersuchung",
      it: "Esame del seno",
      ar: "فحص الثدي",
    },
  },
  {
    id: "genetic",
    name: {
      cs: "Genetické vyšetření",
      en: "Genetic testing",
      de: "Genetische Untersuchung",
      it: "Test genetici",
      ar: "فحوصات جينية",
    },
  },
  {
    id: "diagnostic",
    name: {
      cs: "Diagnostické vyšetření",
      en: "Diagnostic examination",
      de: "Diagnostische Untersuchung",
      it: "Esame diagnostico",
      ar: "فحص تشخيصي",
    },
  },
  {
    id: "cryo",
    name: {
      cs: "Kryoterapie",
      en: "Cryotherapy",
      de: "Kryotherapie",
      it: "Crioterapia",
      ar: "العلاج بالتبريد",
    },
    price: "1 000 Kč",
  },
  {
    id: "co2-laser",
    name: {
      cs: "CO₂ laserová gynekologie — balíček 3 procedur",
      en: "CO₂ laser gynaecology — package of 3 procedures",
      de: "CO₂-Lasergynäkologie — Paket mit 3 Behandlungen",
      it: "Ginecologia laser CO₂ — pacchetto di 3 procedure",
      ar: "ليزر CO₂ النسائي — باقة من 3 جلسات",
    },
    price: "7 000 Kč",
  },
  {
    id: "alt-med",
    name: {
      cs: "Alternativní medicína",
      en: "Complementary medicine",
      de: "Alternative Medizin",
      it: "Medicina alternativa",
      ar: "طب بديل",
    },
  },
];

export const priceCategories: PriceCategory[] = [
  {
    id: "general",
    title: {
      cs: "Gynekologie & prevence",
      en: "Gynaecology & prevention",
      de: "Gynäkologie & Vorsorge",
      it: "Ginecologia & prevenzione",
      ar: "طب النساء والوقاية",
    },
    description: {
      cs: "Pravidelná péče, diagnostika a vyšetření pro jistotu v každé životní etapě.",
      en: "Routine care, diagnostics and examinations for confidence at every stage of life.",
      de: "Regelmäßige Betreuung, Diagnostik und Untersuchungen für jede Lebensphase.",
      it: "Cure regolari, diagnostica ed esami per ogni fase della vita.",
      ar: "رعاية دورية وتشخيص وفحوصات تمنحك الثقة في كل مرحلة من الحياة.",
    },
    serviceIds: [
      "gyn-exam",
      "online-consultation",
      "complex-gyn",
      "routine",
      "ultrasound",
      "cytology",
      "contraception",
      "hpv",
      "sti",
      "culture",
      "breast",
    ],
  },
  {
    id: "fertility",
    title: {
      cs: "Plodnost & těhotenství",
      en: "Fertility & pregnancy",
      de: "Kinderwunsch & Schwangerschaft",
      it: "Fertilità & gravidanza",
      ar: "الخصوبة والحمل",
    },
    description: {
      cs: "Od prvního rozhovoru přes vyšetření páru až po citlivou péči v těhotenství.",
      en: "From the first conversation and couple diagnostics to considerate pregnancy care.",
      de: "Vom ersten Gespräch über die Paardiagnostik bis zur einfühlsamen Schwangerschaftsbegleitung.",
      it: "Dal primo colloquio e dalla diagnosi di coppia alla cura attenta in gravidanza.",
      ar: "من الاستشارة الأولى وفحوصات الزوجين إلى رعاية الحمل باهتمام وخصوصية.",
    },
    serviceIds: [
      "pregnancy",
      "prenatal-4d",
      "infertility",
      "reproductive",
      "amh",
      "hormones",
      "thyroid",
      "genetic",
    ],
  },
  {
    id: "specialized",
    title: {
      cs: "Specializovaná péče",
      en: "Specialist care",
      de: "Spezialisierte Versorgung",
      it: "Cure specialistiche",
      ar: "الرعاية المتخصصة",
    },
    description: {
      cs: "Moderní ambulantní postupy volené vždy podle konkrétní indikace a vašich potřeb.",
      en: "Modern outpatient procedures selected for your specific indication and needs.",
      de: "Moderne ambulante Verfahren, passend zu Ihrer individuellen Indikation und Situation.",
      it: "Procedure ambulatoriali moderne scelte secondo l'indicazione e le esigenze individuali.",
      ar: "إجراءات حديثة للعيادات الخارجية تُختار وفق الحالة والاحتياجات الفردية.",
    },
    serviceIds: ["diagnostic", "cryo", "co2-laser", "alt-med"],
  },
];

export const priceNotes: Record<
  "cs" | "en" | "de" | "it" | "ar",
  string[]
> = {
  cs: [
    "Roční poplatek za celý rok: 500 Kč.",
    "Ceny se mohou mírně lišit podle náročnosti zákroku — stanovují se individuálně po konzultaci.",
    "Laserová terapie: cena podle indikace.",
    "Prenatální péče, genetické testy a ultrazvuk 4D: 2 500 Kč.",
    "Léčba neplodných párů: 2 500 Kč.",
    "Uvedené ceny jsou orientační pro pacienty bez pojištění (dle Známy lékař).",
  ],
  en: [
    "Annual practice fee: CZK 500.",
    "Prices may vary with procedure complexity — set individually after consultation.",
    "Laser therapy: priced by indication.",
    "Prenatal care, genetic tests and 4D ultrasound: CZK 2,500.",
    "Infertility couple treatment: CZK 2,500.",
    "Listed prices are indicative for uninsured patients (per Známy lékař).",
  ],
  de: [
    "Jahresgebühr: 500 Kč.",
    "Preise können je nach Aufwand leicht abweichen — individuell nach Beratung.",
    "Lasertherapie: Preis nach Indikation.",
    "Schwangerschaftsvorsorge, Gentests und 4D-Ultraschall: 2 500 Kč.",
    "Behandlung bei Kinderwunsch: 2 500 Kč.",
    "Angaben sind Orientierungswerte für Patientinnen ohne Versicherung (laut Známy lékař).",
  ],
  it: [
    "Quota annuale: 500 Kč.",
    "I prezzi possono variare in base alla complessità — definiti dopo consulto.",
    "Terapia laser: prezzo secondo indicazione.",
    "Cura prenatale, test genetici e ecografia 4D: 2 500 Kč.",
    "Trattamento infertilità di coppia: 2 500 Kč.",
    "Prezzi indicativi per pazienti senza assicurazione (da Známy lékař).",
  ],
  ar: [
    "الرسوم السنوية: 500 كرونة.",
    "قد تختلف الأسعار حسب تعقيد الإجراء — تُحدد بعد الاستشارة.",
    "العلاج بالليزر: حسب الاستطباب.",
    "رعاية ما قبل الولادة والاختبارات الجينية والموجات 4D: 2500 كرونة.",
    "علاج العقم للزوجين: 2500 كرونة.",
    "الأسعار إرشادية للمرضى دون تأمين (حسب Známy lékař).",
  ],
};

export const insurers = [
  { code: "111", name: "VZP — Všeobecná zdravotní pojišťovna" },
  { code: "207", name: "OZP — Oborová zdravotní pojišťovna" },
  { code: "211", name: "ZPMV — Zdravotní pojišťovna ministerstva vnitra" },
  { code: "205", name: "ČPZP — Česká průmyslová zdravotní pojišťovna" },
  { code: "201", name: "VoZP — Vojenská zdravotní pojišťovna" },
  { code: "213", name: "RBP — Revírní bratrská pokladna" },
  { code: "209", name: "ZP Škoda — Zaměstnanecká pojišťovna Škoda" },
  { code: "PVZP", name: "PVZP" },
  { code: "333", name: "UNIQA pro cizince / VZP s.r.o." },
];

export const treatedConditions: Record<
  "cs" | "en" | "de" | "it" | "ar",
  string[]
> = {
  cs: [
    "Dysmenorea",
    "Problémy v období dospívání",
    "Menopauza",
    "Hyperprolaktinémie",
    "Onemocnění prsu",
    "Premenstruační syndrom",
    "Neplodnost",
    "Anémie v těhotenství",
    "Močová inkontinence",
    "Endometrióza",
    "Endokrinní onemocnění",
    "Hormonální poruchy",
    "Nepravidelná menstruace",
    "Komplikace v těhotenství",
    "Sexuální poruchy",
    "Laser CO₂ — inkontinence, omlazení pochvy, komplikace po porodu",
    "Laser CO₂ — suspektní precanceróza",
    "Labioplastika v lokální anestezii (CO₂ laser)",
    "Plastická operace hráze",
  ],
  en: [
    "Dysmenorrhea",
    "Adolescent gynaecology",
    "Menopause",
    "Hyperprolactinemia",
    "Breast conditions",
    "Premenstrual syndrome",
    "Infertility",
    "Anemia in pregnancy",
    "Urinary incontinence",
    "Endometriosis",
    "Endocrine disorders",
    "Hormonal disorders",
    "Irregular menstruation",
    "Pregnancy complications",
    "Sexual dysfunction",
    "CO₂ laser — incontinence, vaginal rejuvenation, postpartum issues",
    "CO₂ laser — suspected precancerous changes",
    "Labiaplasty under local anesthesia (CO₂ laser)",
    "Perineal plastic surgery",
  ],
  de: [
    "Dysmenorrhoe",
    "Gynäkologie in der Pubertät",
    "Menopause",
    "Hyperprolaktinämie",
    "Brusterkrankungen",
    "Prämenstruelles Syndrom",
    "Unfruchtbarkeit",
    "Anämie in der Schwangerschaft",
    "Harninkontinenz",
    "Endometriose",
    "Endokrine Erkrankungen",
    "Hormonelle Störungen",
    "Unregelmäßige Menstruation",
    "Schwangerschaftskomplikationen",
    "Sexuelle Störungen",
    "CO₂-Laser — Inkontinenz, vaginale Verjüngung, postpartale Probleme",
    "CO₂-Laser — Verdacht auf Präkanzerose",
    "Labioplastik in Lokalanaesthesie (CO₂-Laser)",
    "Plastik des Damms",
  ],
  it: [
    "Dismenorrea",
    "Ginecologia adolescenziale",
    "Menopausa",
    "Iperprolattinemia",
    "Patologie mammarie",
    "Sindrome premestruale",
    "Infertilità",
    "Anemia in gravidanza",
    "Incontinenza urinaria",
    "Endometriosi",
    "Malattie endocrine",
    "Disturbi ormonali",
    "Mestruazioni irregolari",
    "Complicanze della gravidanza",
    "Disturbi sessuali",
    "Laser CO₂ — incontinenza, ringiovanimento vaginale, post-parto",
    "Laser CO₂ — sospetta precancerosi",
    "Labioplastica in anestesia locale (laser CO₂)",
    "Chirurgia plastica del perineo",
  ],
  ar: [
    "عسر الطمث",
    "مشاكل فترة المراهقة",
    "سن اليأس",
    "فرط البرولاكتين",
    "أمراض الثدي",
    "متلازمة ما قبل الحيض",
    "العقم",
    "فقر الدم في الحمل",
    "سلس البول",
    "بطانة الرحم الهاجرة",
    "أمراض الغدد الصماء",
    "اضطرابات هرمونية",
    "حيض غير منتظم",
    "مضاعفات الحمل",
    "اضطرابات جنسية",
    "ليزر CO₂ — سلس البول وتجديد المهبل ومضاعفات ما بعد الولادة",
    "ليزر CO₂ — تغيرات ما قبل السرطان المشتبهة",
    "رأب الشفرين تحت التخدير الموضعي (ليزر CO₂)",
    "جراحة تجميل العجان",
  ],
};

export const spokenLanguages: Record<"cs" | "en" | "de" | "it" | "ar", string[]> = {
  cs: ["čeština", "angličtina", "arabština"],
  en: ["Czech", "English", "Arabic"],
  de: ["Tschechisch", "Englisch", "Arabisch"],
  it: ["ceco", "inglese", "arabo"],
  ar: ["التشيكية", "الإنجليزية", "العربية"],
};

export const educationCs = [
  "Lékařská fakulta Univerzity Palackého — specializace v gynekologii a porodnictví",
  "Licence pro výkon samostatné praxe a odborného zástupce v oboru gynekologie",
  "Specializovaná způsobilost v gynekologii, porodnictví a neplodnosti",
  "Odborný lékař gynekolog, IVF, asistovaná reprodukce",
  "Diplom celoživotního vzdělávání v gynekologii, porodnictví a neplodnosti",
  "Diplom v ultrazvuku 13. a 20. týden",
];

import type { Locale } from "@/lib/locales";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    short: string;
    tagline: string;
  };
  nav: {
    home: string;
    services: string;
    about: string;
    reviews: string;
    contact: string;
    book: string;
  };
  hero: {
    brand: string;
    title: string;
    titleEm: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
  };
  trust: {
    languages: string;
    languagesText: string;
    newPatients: string;
    newPatientsText: string;
    international: string;
    internationalText: string;
  };
  welcome: {
    eyebrow: string;
    title: string;
    lead: string;
    cta: string;
    photoLabel: string;
  };
  services: {
    eyebrow: string;
    title: string;
    lead: string;
    viewAll: string;
    items: {
      id: string;
      title: string;
      text: string;
    }[];
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    doctorTitle: string;
    doctorRole: string;
    doctorBio: string;
    membershipsTitle: string;
    memberships: string[];
    nurseTitle: string;
    nurseRole: string;
    teamLabel: string;
    cta: string;
  };
  atmosphere: {
    eyebrow: string;
    title: string;
    lead: string;
    consent: string;
  };
  reviews: {
    eyebrow: string;
    title: string;
    lead: string;
    leave: string;
    empty: string;
    formTitle: string;
    formLead: string;
    name: string;
    rating: string;
    text: string;
    submit: string;
    success: string;
    successHint: string;
    sourceLabel: string;
    sourceLink: string;
    countHint: string;
    ratingScore: string;
  };
  booking: {
    eyebrow: string;
    title: string;
    lead: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    servicePlaceholder: string;
    date: string;
    time: string;
    note: string;
    notePlaceholder: string;
    submit: string;
    success: string;
    successHint: string;
    hoursTitle: string;
    hours: { day: string; time: string }[];
    privacy: string;
    stepService: string;
    stepDateTime: string;
    stepDetails: string;
    next: string;
    back: string;
    slotsTitle: string;
    summary: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    address: string;
    email: string;
    phone: string;
    mapCta: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    lead: string;
    priceCol: string;
    onRequest: string;
    notesTitle: string;
    insuranceTitle: string;
    insuranceLead: string;
    diseasesTitle: string;
    languagesTitle: string;
    paymentTitle: string;
    paymentCash: string;
    sourceNote: string;
  };
  footer: {
    mission: string;
    rights: string;
    links: string;
  };
  common: {
    required: string;
    loading: string;
    error: string;
  };
};

const cs: Dictionary = {
  meta: {
    title: "MUDr. Samer Asad · Gynekologie & IVF, Praha",
    description:
      "Diskrétní gynekologická péče a reprodukční medicína v Praze 4. Prevence, neplodnost a těhotenství — česky, anglicky a arabsky.",
  },
  brand: {
    name: "MUDr. Samer Asad",
    short: "Clinic Samer",
    tagline: "Gynekologie · IVF · Praha",
  },
  nav: {
    home: "Úvod",
    services: "Služby",
    about: "O nás",
    reviews: "Recenze",
    contact: "Kontakt",
    book: "Rezervovat",
  },
  hero: {
    brand: "Clinic Samer",
    title: "Péče, které můžete",
    titleEm: "důvěřovat.",
    lead: "Diskrétní gynekologie a IVF v Praze — klidné prostředí, jasná komunikace a moderní medicína pod jednou střechou.",
    ctaPrimary: "Rezervovat termín",
    ctaSecondary: "Prohlédnout služby",
    scroll: "Poznejte kliniku",
  },
  trust: {
    languages: "Tři jazyky",
    languagesText: "Česky, anglicky a arabsky.",
    newPatients: "Nové pacientky",
    newPatientsText: "Přijímáme nové pacientky. Kapacity máme otevřené.",
    international: "Zahraniční péče",
    internationalText: "Vítáme pacientky ze zahraničí i dlouhodobě v ČR.",
  },
  welcome: {
    eyebrow: "Nové pacientky",
    title: "Přijímáme nové pacientky",
    lead: "Máme volné kapacity. Domluvte si první termín online — ozveme se s potvrzením.",
    cta: "Chci se registrovat!",
    photoLabel: "Foto: nové pacientky v čekárně",
  },
  services: {
    eyebrow: "Služby",
    title: "Péče, která navazuje. A dává smysl.",
    lead: "Nemusíte pokaždé začínat znovu. Od prevence přes cestu k miminku až po specializovanou léčbu známe váš příběh a vysvětlíme každý další krok.",
    viewAll: "Všechny služby",
    items: [
      {
        id: "gyn",
        title: "Ambulantní gynekologie",
        text: "Pravidelné kontroly i chvíle, kdy potřebujete rychlou odpověď. Citlivé vyšetření, moderní diagnostika a plán, kterému rozumíte.",
      },
      {
        id: "ivf",
        title: "Diagnostika neplodnosti & IVF",
        text: "Když se početí nedaří, začneme důkladně — u ženy i muže. Výsledky spojíme do srozumitelného plánu bez zbytečného čekání.",
      },
      {
        id: "laser",
        title: "Laser & plazma terapie",
        text: "Šetrná moderní péče při změnách po porodu, v menopauze, při intimním diskomfortu nebo lehké inkontinenci — vždy podle indikace.",
      },
      {
        id: "pregnancy",
        title: "Těhotenská poradna a ultrazvuk",
        text: "Pravidelné kontroly, ultrazvuk zpravidla každé tři týdny a doporučená genetická vyšetření.",
      },
      {
        id: "contraception",
        title: "Hormonální a nehormonální tělíska",
        text: "Výběr vhodné varianty včetně Levosertu podle zdravotního stavu a plánování rodiny.",
      },
      {
        id: "hormones",
        title: "Hormonální potíže",
        text: "Diagnostika a léčba obtíží ovlivňujících cyklus, plodnost i každodenní kvalitu života.",
      },
      {
        id: "metabolism",
        title: "Obezitologická a metabolická poradna",
        text: "Odborná péče při nadváze, obezitě a metabolických obtížích s vlivem na hormony, plodnost a těhotenství.",
      },
    ],
  },
  about: {
    eyebrow: "O nás",
    title: "Lékař, kterému můžete říct vše",
    lead: "Cílem je příjemné a diskrétní prostředí — pomoc v běžných i složitějších situacích, v ambulanci i při hospitalizaci.",
    doctorTitle: "MUDr. Samer Asad",
    doctorRole: "Gynekolog a porodník",
    doctorBio:
      "Lékařská fakulta Univerzity Palackého. Specializace v gynekologii a porodnictví, odborná způsobilost v neplodnosti a asistované reprodukci. Licence pro samostatnou praxi.",
    membershipsTitle: "Členství",
    memberships: [
      "Česká gynekologicko-porodnická společnost (ČGPS)",
      "Sekce asistované reprodukce ČGPS",
      "Česká lékařská společnost JEP",
      "ESHRE — European Society of Human Reproduction and Embryology",
    ],
    nurseTitle: "Nataliia Asad, DiS.",
    nurseRole: "Zdravotní sestra",
    teamLabel: "Tým ordinace",
    cta: "Domluvit konzultaci",
  },
  atmosphere: {
    eyebrow: "Příběhy rodin",
    title: "Okamžiky, které dávají naší práci smysl",
    lead: "Za každou fotografií je jiná cesta. Spojuje je důvěra, kontinuita péče a radost z nového začátku.",
    consent: "Fotografie jsou zveřejněny se souhlasem rodin.",
  },
  reviews: {
    eyebrow: "Recenze",
    title: "Hlasy pacientek",
    lead: "Skutečné zkušenosti z naší ordinace. Vaše zpětná vazba nám pomáhá růst.",
    leave: "Napsat recenzi",
    empty: "Zatím tu nejsou zveřejněné recenze. Budeme rádi za tu vaši.",
    formTitle: "Sdílejte svou zkušenost",
    formLead: "Děkujeme za důvěru. Recenze pomáhají dalším ženám vybrat péči.",
    name: "Jméno",
    rating: "Hodnocení",
    text: "Vaše zkušenost",
    submit: "Odeslat recenzi",
    success: "Děkujeme za recenzi",
    successHint: "Vaše hodnocení jsme přijali. Brzy se objeví na webu.",
    sourceLabel: "Ukázky z",
    sourceLink: "Známy lékař",
    countHint: "725 ověřených názorů",
    ratingScore: "4,9",
  },
  booking: {
    eyebrow: "Rezervace",
    title: "Vyberte si skutečně volný termín",
    lead: "Rezervujte návštěvu v živém kalendáři a potvrzení dostanete okamžitě. Pokud si nejste jistá typem návštěvy, rádi poradíme telefonicky.",
    name: "Jméno a příjmení",
    email: "E-mail",
    phone: "Telefon",
    service: "Typ návštěvy",
    servicePlaceholder: "Vyberte službu",
    date: "Preferovaný den",
    time: "Preferovaný čas",
    note: "Poznámka",
    notePlaceholder: "Volitelně — důvod návštěvy, preference jazyka…",
    submit: "Odeslat rezervaci",
    success: "Rezervace odeslána",
    successHint: "Ozveme se vám co nejdříve s potvrzením termínu.",
    hoursTitle: "Ordinační hodiny",
    hours: [
      { day: "Pondělí", time: "8:00 – 15:00" },
      { day: "Úterý", time: "10:00 – 17:00" },
      { day: "Středa", time: "9:00 – 15:30" },
      { day: "Čtvrtek", time: "9:00 – 16:15" },
      { day: "Pátek", time: "8:30 – 12:30" },
    ],
    privacy: "Odesláním souhlasíte se zpracováním údajů pro účely rezervace.",
    stepService: "1 · Služba",
    stepDateTime: "2 · Termín",
    stepDetails: "3 · Kontakt",
    next: "Pokračovat",
    back: "Zpět",
    slotsTitle: "Dostupné časy",
    summary: "Shrnutí",
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Jsme v Praze 4",
    lead: "Gynekologická ambulance · Branická 479/21",
    address: "Branická 479/21, 147 00 Praha 4",
    email: "dr.samer@seznam.cz",
    phone: "+420 734 421 860",
    mapCta: "Otevřít mapu",
  },
  pricing: {
    eyebrow: "Ceník",
    title: "Služby a orientační ceny",
    lead: "Kompletní přehled ze Známy lékař. Přesná cena závisí na rozsahu péče — rádi ji upřesníme při rezervaci.",
    priceCol: "Cena",
    onRequest: "Individuálně",
    notesTitle: "Důležité informace",
    insuranceTitle: "Zdravotní pojišťovny",
    insuranceLead: "Máme smlouvy se všemi hlavními zdravotními pojišťovnami.",
    diseasesTitle: "Časté oblasti péče",
    languagesTitle: "Jazyky",
    paymentTitle: "Platba (soukromé návštěvy)",
    paymentCash: "Hotovost",
    sourceNote: "Údaje dle profilu na Známy lékař. Ceny pro pacienty bez pojištění jsou orientační.",
  },
  footer: {
    mission:
      "Příjemné a diskrétní prostředí. Pomoc zdravotnickou péčí i radou — v ambulanci i při hospitalizaci.",
    rights: "Všechna práva vyhrazena.",
    links: "Najdete nás též na",
  },
  common: {
    required: "Povinné pole",
    loading: "Odesílám…",
    error: "Něco se nepovedlo. Zkuste to prosím znovu.",
  },
};

const en: Dictionary = {
  meta: {
    title: "MUDr. Samer Asad · Gynaecology & IVF, Prague",
    description:
      "Discreet gynaecology and reproductive medicine in Prague 4. Prevention, fertility and pregnancy care — in Czech, English and Arabic.",
  },
  brand: {
    name: "MUDr. Samer Asad",
    short: "Clinic Samer",
    tagline: "Gynaecology · IVF · Prague",
  },
  nav: {
    home: "Home",
    services: "Services",
    about: "About",
    reviews: "Reviews",
    contact: "Contact",
    book: "Book",
  },
  hero: {
    brand: "Clinic Samer",
    title: "Care you can",
    titleEm: "trust.",
    lead: "Discreet gynaecology and IVF in Prague — a calm space, clear communication and modern medicine under one roof.",
    ctaPrimary: "Book an appointment",
    ctaSecondary: "Explore services",
    scroll: "Discover the clinic",
  },
  trust: {
    languages: "Three languages",
    languagesText: "Czech, English and Arabic.",
    newPatients: "New patients",
    newPatientsText: "We welcome new patients. Appointments are available.",
    international: "International care",
    internationalText: "We welcome patients from abroad living in or visiting Czechia.",
  },
  welcome: {
    eyebrow: "New patients",
    title: "We are accepting new patients",
    lead: "Appointments are available. Book your first visit online — we will confirm shortly.",
    cta: "I want to register!",
    photoLabel: "Photo: clinic — coming soon",
  },
  services: {
    eyebrow: "Services",
    title: "Comprehensive care, unhurried",
    lead: "From prevention to IVF — one practice, continuous care and time for your questions.",
    viewAll: "All services",
    items: [
      {
        id: "gyn",
        title: "Outpatient gynaecology",
        text: "Prevention, diagnostics, contraception, pregnancy care and perioperative support.",
      },
      {
        id: "ivf",
        title: "Fertility diagnostics & IVF",
        text: "Couple assessment, reproductive medicine and IVF with a clear plan.",
      },
      {
        id: "laser",
        title: "Laser & plasma therapy",
        text: "Modern intimate care with CO₂ laser and plasma therapy.",
      },
      {
        id: "pregnancy",
        title: "Pregnancy clinic & ultrasound",
        text: "Regular check-ups, ultrasound usually every three weeks and recommended genetic screening.",
      },
      {
        id: "contraception",
        title: "Hormonal & non-hormonal IUDs",
        text: "Choosing the right option, including Levosert, based on health and family planning.",
      },
      {
        id: "hormones",
        title: "Hormonal concerns",
        text: "Diagnosis and treatment of conditions affecting the cycle, fertility and everyday quality of life.",
      },
      {
        id: "metabolism",
        title: "Obesity & metabolic clinic",
        text: "Specialist care for weight and metabolic concerns that can affect hormones, fertility and pregnancy.",
      },
    ],
  },
  about: {
    eyebrow: "About",
    title: "A doctor you can tell everything",
    lead: "A pleasant, discreet setting — support in everyday and complex situations, in the clinic and during hospital care.",
    doctorTitle: "MUDr. Samer Asad",
    doctorRole: "Gynaecologist and obstetrician",
    doctorBio:
      "Faculty of Medicine, Palacký University. Specialist in gynaecology and obstetrics, with expertise in infertility and assisted reproduction. Licensed for independent practice.",
    membershipsTitle: "Memberships",
    memberships: [
      "Czech Society of Gynaecology and Obstetrics (CGPS)",
      "Assisted Reproduction Section of CGPS",
      "Czech Medical Society JEP",
      "ESHRE — European Society of Human Reproduction and Embryology",
    ],
    nurseTitle: "Nataliia Asad, DiS.",
    nurseRole: "Nurse",
    teamLabel: "Practice team",
    cta: "Book a consultation",
  },
  atmosphere: {
    eyebrow: "Space",
    title: "Calm you feel at the door",
    lead: "Our Branická practice — discreet, bright and ready so you never have to rush.",
    consent: "The photographs are published with the families' consent.",
  },
  reviews: {
    eyebrow: "Reviews",
    title: "Patient voices",
    lead: "Real experiences from our practice. Your feedback helps us grow.",
    leave: "Leave a review",
    empty: "No published reviews yet. We would love to hear yours.",
    formTitle: "Share your experience",
    formLead: "Thank you for your trust. Reviews help other women choose care.",
    name: "Name",
    rating: "Rating",
    text: "Your experience",
    submit: "Submit review",
    success: "Thank you for your review",
    successHint: "We have received your rating. It will appear on the site soon.",
    sourceLabel: "Samples from",
    sourceLink: "Známy lékař",
    countHint: "725 verified reviews",
    ratingScore: "4.9",
  },
  booking: {
    eyebrow: "Booking",
    title: "Choose an available appointment",
    lead: "Book through the live calendar and receive immediate confirmation. If you are unsure which visit to choose, please call us.",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    service: "Visit type",
    servicePlaceholder: "Select a service",
    date: "Preferred day",
    time: "Preferred time",
    note: "Note",
    notePlaceholder: "Optional — reason for visit, language preference…",
    submit: "Send booking request",
    success: "Booking sent",
    successHint: "We will contact you shortly to confirm your appointment.",
    hoursTitle: "Opening hours",
    hours: [
      { day: "Monday", time: "8:00 – 15:00" },
      { day: "Tuesday", time: "10:00 – 17:00" },
      { day: "Wednesday", time: "9:00 – 15:30" },
      { day: "Thursday", time: "9:00 – 16:15" },
      { day: "Friday", time: "8:30 – 12:30" },
    ],
    privacy: "By submitting you agree to processing of data for booking purposes.",
    stepService: "1 · Service",
    stepDateTime: "2 · Time",
    stepDetails: "3 · Details",
    next: "Continue",
    back: "Back",
    slotsTitle: "Available times",
    summary: "Summary",
  },
  contact: {
    eyebrow: "Contact",
    title: "We are in Prague 4",
    lead: "Gynaecological practice · Branická 479/21",
    address: "Branická 479/21, 147 00 Prague 4",
    email: "dr.samer@seznam.cz",
    phone: "+420 734 421 860",
    mapCta: "Open map",
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Services and indicative prices",
    lead: "Full overview from Známy lékař. Exact pricing depends on the scope of care — we will confirm when you book.",
    priceCol: "Price",
    onRequest: "On request",
    notesTitle: "Important notes",
    insuranceTitle: "Health insurance",
    insuranceLead: "We contract with all major Czech health insurers.",
    diseasesTitle: "Common areas of care",
    languagesTitle: "Languages",
    paymentTitle: "Payment (private visits)",
    paymentCash: "Cash",
    sourceNote: "Data per Známy lékař profile. Prices for uninsured patients are indicative.",
  },
  footer: {
    mission:
      "A pleasant, discreet environment. Medical care and advice — in the clinic and during hospital stays.",
    rights: "All rights reserved.",
    links: "Also find us on",
  },
  common: {
    required: "Required field",
    loading: "Sending…",
    error: "Something went wrong. Please try again.",
  },
};

const de: Dictionary = {
  meta: {
    title: "MUDr. Samer Asad · Gynäkologie & IVF, Prag",
    description:
      "Diskrete Gynäkologie und Reproduktionsmedizin in Prag 4. Vorsorge, Fruchtbarkeit und Schwangerschaft — auf Tschechisch, Englisch und Arabisch.",
  },
  brand: {
    name: "MUDr. Samer Asad",
    short: "Clinic Samer",
    tagline: "Gynäkologie · IVF · Prag",
  },
  nav: {
    home: "Start",
    services: "Leistungen",
    about: "Über uns",
    reviews: "Bewertungen",
    contact: "Kontakt",
    book: "Termin",
  },
  hero: {
    brand: "Clinic Samer",
    title: "Behandlung, der Sie",
    titleEm: "vertrauen.",
    lead: "Diskrete Gynäkologie und IVF in Prag — ruhige Atmosphäre, klare Kommunikation und moderne Medizin unter einem Dach.",
    ctaPrimary: "Termin buchen",
    ctaSecondary: "Leistungen ansehen",
    scroll: "Klinik entdecken",
  },
  trust: {
    languages: "Drei Sprachen",
    languagesText: "Tschechisch, Englisch und Arabisch.",
    newPatients: "Neue Patientinnen",
    newPatientsText: "Wir nehmen neue Patientinnen auf. Termine sind verfügbar.",
    international: "Internationale Betreuung",
    internationalText: "Wir begrüßen Patientinnen aus dem Ausland.",
  },
  welcome: {
    eyebrow: "Neue Patientinnen",
    title: "Wir nehmen neue Patientinnen auf",
    lead: "Termine sind verfügbar. Buchen Sie Ihren ersten Besuch online — wir bestätigen in Kürze.",
    cta: "Ich möchte mich anmelden!",
    photoLabel: "Foto: Praxis — folgt",
  },
  services: {
    eyebrow: "Leistungen",
    title: "Umfassende Betreuung ohne Hetze",
    lead: "Von Vorsorge bis IVF — eine Praxis, kontinuierliche Betreuung und Zeit für Fragen.",
    viewAll: "Alle Leistungen",
    items: [
      {
        id: "gyn",
        title: "Ambulante Gynäkologie",
        text: "Vorsorge, Diagnostik, Verhütung, Schwangerschaftsbegleitung und perioperative Unterstützung.",
      },
      {
        id: "ivf",
        title: "Fruchtbarkeitsdiagnostik & IVF",
        text: "Paardiagnostik, Reproduktionsmedizin und IVF mit klarem Plan.",
      },
      {
        id: "laser",
        title: "Laser- & Plasmatherapie",
        text: "Moderne intimmedizinische Lösungen mit CO₂-Laser und Plasma.",
      },
      {
        id: "pregnancy",
        title: "Schwangerenberatung & Ultraschall",
        text: "Regelmäßige Kontrollen, Ultraschall in der Regel alle drei Wochen und empfohlene genetische Untersuchungen.",
      },
      {
        id: "contraception",
        title: "Hormonelle & hormonfreie Spiralen",
        text: "Auswahl der passenden Variante einschließlich Levosert nach Gesundheit und Familienplanung.",
      },
      {
        id: "hormones",
        title: "Hormonelle Beschwerden",
        text: "Diagnostik und Behandlung von Beschwerden mit Einfluss auf Zyklus, Fruchtbarkeit und Lebensqualität.",
      },
      {
        id: "metabolism",
        title: "Adipositas- & Stoffwechselberatung",
        text: "Fachärztliche Betreuung bei Gewichts- und Stoffwechselproblemen mit Einfluss auf Hormone, Fruchtbarkeit und Schwangerschaft.",
      },
    ],
  },
  about: {
    eyebrow: "Über uns",
    title: "Ein Arzt, dem Sie alles sagen können",
    lead: "Angenehme, diskrete Umgebung — Hilfe in alltäglichen und komplexen Situationen, in der Praxis und bei stationärer Behandlung.",
    doctorTitle: "MUDr. Samer Asad",
    doctorRole: "Facharzt für Gynäkologie und Geburtshilfe",
    doctorBio:
      "Medizinische Fakultät der Palacký-Universität. Spezialisierung in Gynäkologie und Geburtshilfe, Expertise in Infertilität und assistierter Reproduktion. Zulassung für selbstständige Praxis.",
    membershipsTitle: "Mitgliedschaften",
    memberships: [
      "Tschechische Gesellschaft für Gynäkologie und Geburtshilfe (ČGPS)",
      "Sektion für assistierte Reproduktion der ČGPS",
      "Tschechische Ärztegesellschaft JEP",
      "ESHRE — European Society of Human Reproduction and Embryology",
    ],
    nurseTitle: "Nataliia Asad, DiS.",
    nurseRole: "Krankenschwester",
    teamLabel: "Praxisteam",
    cta: "Beratung vereinbaren",
  },
  atmosphere: {
    eyebrow: "Raum",
    title: "Ruhe, die Sie an der Tür spüren",
    lead: "Praxis in der Branická — diskret, hell und so, dass Sie sich nie beeilen müssen.",
    consent: "Die Fotos werden mit Einwilligung der Familien veröffentlicht.",
  },
  reviews: {
    eyebrow: "Bewertungen",
    title: "Stimmen unserer Patientinnen",
    lead: "Echte Erfahrungen aus unserer Praxis. Ihr Feedback hilft uns zu wachsen.",
    leave: "Bewertung schreiben",
    empty: "Noch keine veröffentlichten Bewertungen. Wir freuen uns auf Ihre.",
    formTitle: "Teilen Sie Ihre Erfahrung",
    formLead: "Danke für Ihr Vertrauen. Bewertungen helfen anderen Frauen bei der Wahl.",
    name: "Name",
    rating: "Bewertung",
    text: "Ihre Erfahrung",
    submit: "Bewertung senden",
    success: "Danke für Ihre Bewertung",
    successHint: "Wir haben Ihre Bewertung erhalten. Sie erscheint bald auf der Website.",
    sourceLabel: "Beispiele von",
    sourceLink: "Známy lékař",
    countHint: "725 verifizierte Bewertungen",
    ratingScore: "4,9",
  },
  booking: {
    eyebrow: "Termin",
    title: "Verfügbaren Termin wählen",
    lead: "Buchen Sie im Live-Kalender und erhalten Sie sofort eine Bestätigung. Bei Fragen zur Terminart beraten wir Sie telefonisch.",
    name: "Vor- und Nachname",
    email: "E-Mail",
    phone: "Telefon",
    service: "Art des Besuchs",
    servicePlaceholder: "Leistung wählen",
    date: "Wunschtag",
    time: "Wunschzeit",
    note: "Anmerkung",
    notePlaceholder: "Optional — Grund des Besuchs, Sprachwunsch…",
    submit: "Terminanfrage senden",
    success: "Anfrage gesendet",
    successHint: "Wir melden uns bald zur Terminbestätigung.",
    hoursTitle: "Öffnungszeiten",
    hours: [
      { day: "Montag", time: "8:00 – 15:00" },
      { day: "Dienstag", time: "10:00 – 17:00" },
      { day: "Mittwoch", time: "9:00 – 15:30" },
      { day: "Donnerstag", time: "9:00 – 16:15" },
      { day: "Freitag", time: "8:30 – 12:30" },
    ],
    privacy: "Mit dem Absenden stimmen Sie der Datenverarbeitung für Terminzwecke zu.",
    stepService: "1 · Leistung",
    stepDateTime: "2 · Termin",
    stepDetails: "3 · Kontakt",
    next: "Weiter",
    back: "Zurück",
    slotsTitle: "Verfügbare Zeiten",
    summary: "Zusammenfassung",
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Wir sind in Prag 4",
    lead: "Gynäkologische Praxis · Branická 479/21",
    address: "Branická 479/21, 147 00 Prag 4",
    email: "dr.samer@seznam.cz",
    phone: "+420 734 421 860",
    mapCta: "Karte öffnen",
  },
  pricing: {
    eyebrow: "Preise",
    title: "Leistungen und Richtpreise",
    lead: "Vollständige Übersicht von Známy lékař. Der genaue Preis hängt vom Umfang ab — wir bestätigen bei der Buchung.",
    priceCol: "Preis",
    onRequest: "Individuell",
    notesTitle: "Wichtige Hinweise",
    insuranceTitle: "Krankenkassen",
    insuranceLead: "Wir haben Verträge mit allen großen tschechischen Krankenkassen.",
    diseasesTitle: "Häufige Behandlungsbereiche",
    languagesTitle: "Sprachen",
    paymentTitle: "Zahlung (Privatbesuche)",
    paymentCash: "Bargeld",
    sourceNote: "Angaben laut Profil auf Známy lékař. Preise für Patientinnen ohne Versicherung sind Richtwerte.",
  },
  footer: {
    mission:
      "Angenehme, diskrete Umgebung. Medizinische Hilfe und Beratung — in der Praxis und bei stationärer Behandlung.",
    rights: "Alle Rechte vorbehalten.",
    links: "Auch zu finden auf",
  },
  common: {
    required: "Pflichtfeld",
    loading: "Wird gesendet…",
    error: "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
  },
};

const it: Dictionary = {
  meta: {
    title: "MUDr. Samer Asad · Ginecologia & IVF, Praga",
    description:
      "Ginecologia discreta e medicina riproduttiva a Praga 4. Prevenzione, fertilità e gravidanza — in ceco, inglese e arabo.",
  },
  brand: {
    name: "MUDr. Samer Asad",
    short: "Clinic Samer",
    tagline: "Ginecologia · IVF · Praga",
  },
  nav: {
    home: "Home",
    services: "Servizi",
    about: "Chi siamo",
    reviews: "Recensioni",
    contact: "Contatti",
    book: "Prenota",
  },
  hero: {
    brand: "Clinic Samer",
    title: "Cure di cui potete",
    titleEm: "fidarvi.",
    lead: "Ginecologia discreta e IVF a Praga — ambiente sereno, comunicazione chiara e medicina moderna sotto lo stesso tetto.",
    ctaPrimary: "Prenota un appuntamento",
    ctaSecondary: "Scopri i servizi",
    scroll: "Scopri la clinica",
  },
  trust: {
    languages: "Tre lingue",
    languagesText: "Ceco, inglese e arabo.",
    newPatients: "Nuove pazienti",
    newPatientsText: "Accogliamo nuove pazienti. Appuntamenti disponibili.",
    international: "Cura internazionale",
    internationalText: "Benvenute pazienti dall’estero.",
  },
  welcome: {
    eyebrow: "Nuove pazienti",
    title: "Accettiamo nuove pazienti",
    lead: "Appuntamenti disponibili. Prenota la prima visita online — confermeremo a breve.",
    cta: "Voglio registrarmi!",
    photoLabel: "Foto: studio — in arrivo",
  },
  services: {
    eyebrow: "Servizi",
    title: "Cure complete, senza fretta",
    lead: "Dalla prevenzione all’IVF — uno studio, continuità di cura e tempo per le domande.",
    viewAll: "Tutti i servizi",
    items: [
      {
        id: "gyn",
        title: "Ginecologia ambulatoriale",
        text: "Prevenzione, diagnostica, contraccezione, assistenza in gravidanza e supporto perioperatorio.",
      },
      {
        id: "ivf",
        title: "Diagnosi di infertilità & IVF",
        text: "Valutazione di coppia, medicina riproduttiva e IVF con un piano chiaro.",
      },
      {
        id: "laser",
        title: "Laser e terapia al plasma",
        text: "Soluzioni moderne per la salute intima con laser CO₂ e plasma.",
      },
      {
        id: "pregnancy",
        title: "Consultorio gravidanza ed ecografia",
        text: "Controlli regolari, ecografia di norma ogni tre settimane e screening genetici raccomandati.",
      },
      {
        id: "contraception",
        title: "IUD ormonali e non ormonali",
        text: "Scelta della soluzione adatta, compreso Levosert, in base a salute e pianificazione familiare.",
      },
      {
        id: "hormones",
        title: "Disturbi ormonali",
        text: "Diagnosi e cura dei disturbi che influenzano ciclo, fertilità e qualità della vita.",
      },
      {
        id: "metabolism",
        title: "Ambulatorio obesità e metabolismo",
        text: "Cura specialistica per peso e metabolismo con impatto su ormoni, fertilità e gravidanza.",
      },
    ],
  },
  about: {
    eyebrow: "Chi siamo",
    title: "Un medico a cui potete dire tutto",
    lead: "Ambiente piacevole e discreto — aiuto nelle situazioni quotidiane e complesse, in ambulatorio e in ospedale.",
    doctorTitle: "MUDr. Samer Asad",
    doctorRole: "Ginecologo e ostetrico",
    doctorBio:
      "Facoltà di Medicina, Università Palacký. Specializzazione in ginecologia e ostetricia, competenza in infertilità e riproduzione assistita. Licenza per pratica indipendente.",
    membershipsTitle: "Affiliazioni",
    memberships: [
      "Società ceca di ginecologia e ostetricia (ČGPS)",
      "Sezione di riproduzione assistita ČGPS",
      "Società medica ceca JEP",
      "ESHRE — European Society of Human Reproduction and Embryology",
    ],
    nurseTitle: "Nataliia Asad, DiS.",
    nurseRole: "Infermiera",
    teamLabel: "Team dello studio",
    cta: "Prenota una consulenza",
  },
  atmosphere: {
    eyebrow: "Spazio",
    title: "Calma che sentite alla porta",
    lead: "Studio in Branická — discreto, luminoso e pensato perché non dobbiate mai avere fretta.",
    consent: "Le fotografie sono pubblicate con il consenso delle famiglie.",
  },
  reviews: {
    eyebrow: "Recensioni",
    title: "Voci delle pazienti",
    lead: "Esperienze reali dal nostro studio. Il vostro feedback ci aiuta a crescere.",
    leave: "Lascia una recensione",
    empty: "Ancora nessuna recensione pubblicata. Saremo lieti della vostra.",
    formTitle: "Condividi la tua esperienza",
    formLead: "Grazie per la fiducia. Le recensioni aiutano altre donne a scegliere.",
    name: "Nome",
    rating: "Valutazione",
    text: "La tua esperienza",
    submit: "Invia recensione",
    success: "Grazie per la recensione",
    successHint: "Abbiamo ricevuto la valutazione. Apparirà presto sul sito.",
    sourceLabel: "Esempi da",
    sourceLink: "Známy lékař",
    countHint: "725 recensioni verificate",
    ratingScore: "4,9",
  },
  booking: {
    eyebrow: "Prenotazione",
    title: "Scegli un appuntamento disponibile",
    lead: "Prenota dal calendario aggiornato e ricevi conferma immediata. Se non sai quale visita scegliere, chiamaci.",
    name: "Nome e cognome",
    email: "Email",
    phone: "Telefono",
    service: "Tipo di visita",
    servicePlaceholder: "Seleziona un servizio",
    date: "Giorno preferito",
    time: "Ora preferita",
    note: "Nota",
    notePlaceholder: "Opzionale — motivo della visita, lingua preferita…",
    submit: "Invia prenotazione",
    success: "Prenotazione inviata",
    successHint: "Vi contatteremo a breve per confermare l’appuntamento.",
    hoursTitle: "Orari",
    hours: [
      { day: "Lunedì", time: "8:00 – 15:00" },
      { day: "Martedì", time: "10:00 – 17:00" },
      { day: "Mercoledì", time: "9:00 – 15:30" },
      { day: "Giovedì", time: "9:00 – 16:15" },
      { day: "Venerdì", time: "8:30 – 12:30" },
    ],
    privacy: "Inviando accetti il trattamento dei dati per la prenotazione.",
    stepService: "1 · Servizio",
    stepDateTime: "2 · Orario",
    stepDetails: "3 · Contatto",
    next: "Continua",
    back: "Indietro",
    slotsTitle: "Orari disponibili",
    summary: "Riepilogo",
  },
  contact: {
    eyebrow: "Contatti",
    title: "Siamo a Praga 4",
    lead: "Ambulatorio ginecologico · Branická 479/21",
    address: "Branická 479/21, 147 00 Praga 4",
    email: "dr.samer@seznam.cz",
    phone: "+420 734 421 860",
    mapCta: "Apri mappa",
  },
  pricing: {
    eyebrow: "Prezzi",
    title: "Servizi e prezzi indicativi",
    lead: "Panoramica completa da Známy lékař. Il prezzo esatto dipende dall’ambito — lo confermiamo in prenotazione.",
    priceCol: "Prezzo",
    onRequest: "Su richiesta",
    notesTitle: "Note importanti",
    insuranceTitle: "Assicurazioni sanitarie",
    insuranceLead: "Convenzioni con le principali assicurazioni sanitarie ceche.",
    diseasesTitle: "Aree di cura frequenti",
    languagesTitle: "Lingue",
    paymentTitle: "Pagamento (visite private)",
    paymentCash: "Contanti",
    sourceNote: "Dati dal profilo Známy lékař. Prezzi per pazienti non assicurati indicativi.",
  },
  footer: {
    mission:
      "Ambiente piacevole e discreto. Cura medica e consiglio — in ambulatorio e in ospedale.",
    rights: "Tutti i diritti riservati.",
    links: "Ci trovate anche su",
  },
  common: {
    required: "Campo obbligatorio",
    loading: "Invio in corso…",
    error: "Qualcosa non ha funzionato. Riprova.",
  },
};

const ar: Dictionary = {
  meta: {
    title: "الدكتور سامر أسعد · طب النساء وأطفال الأنابيب، براغ",
    description:
      "رعاية نسائية وطب إنجاب في براغ 4. الوقاية والخصوبة والحمل — بالتشيكية والإنجليزية والعربية.",
  },
  brand: {
    name: "الدكتور سامر أسعد",
    short: "Clinic Samer",
    tagline: "طب النساء · أطفال الأنابيب · براغ",
  },
  nav: {
    home: "الرئيسية",
    services: "الخدمات",
    about: "من نحن",
    reviews: "التقييمات",
    contact: "التواصل",
    book: "حجز موعد",
  },
  hero: {
    brand: "Clinic Samer",
    title: "رعاية يمكنكم",
    titleEm: "الوثوق بها.",
    lead: "طب نساء سري وأطفال أنابيب في براغ — أجواء هادئة وتواصل واضح وطب حديث تحت سقف واحد.",
    ctaPrimary: "احجزي موعداً",
    ctaSecondary: "تعرّفي على الخدمات",
    scroll: "اكتشفي العيادة",
  },
  trust: {
    languages: "ثلاث لغات",
    languagesText: "التشيكية والإنجليزية والعربية.",
    newPatients: "مريضات جدد",
    newPatientsText: "نستقبل مريضات جدداً. المواعيد متاحة.",
    international: "رعاية دولية",
    internationalText: "نرحب بالمريضات من الخارج.",
  },
  welcome: {
    eyebrow: "مريضات جدد",
    title: "نستقبل مريضات جدداً",
    lead: "المواعيد متاحة. احجزي زيارتك الأولى عبر الإنترنت — نؤكد قريباً.",
    cta: "أريد التسجيل!",
    photoLabel: "صورة: العيادة — قريباً",
  },
  services: {
    eyebrow: "الخدمات",
    title: "رعاية شاملة بلا استعجال",
    lead: "من الوقاية إلى أطفال الأنابيب — عيادة واحدة ورعاية مستمرة ووقت لأسئلتكن.",
    viewAll: "كل الخدمات",
    items: [
      {
        id: "gyn",
        title: "طب النساء العيادي",
        text: "الوقاية والتشخيص ووسائل منع الحمل ورعاية الحمل والدعم حول العمليات.",
      },
      {
        id: "ivf",
        title: "تشخيص العقم وأطفال الأنابيب",
        text: "تقييم الزوجين وطب الإنجاب وأطفال الأنابيب بخطة واضحة.",
      },
      {
        id: "laser",
        title: "الليزر والعلاج بالبلازما",
        text: "حلول حديثة للصحة الحميمة بليزر CO₂ والبلازما.",
      },
      {
        id: "pregnancy",
        title: "عيادة الحمل والموجات فوق الصوتية",
        text: "فحوصات منتظمة وموجات فوق صوتية عادة كل ثلاثة أسابيع وفحوصات جينية موصى بها.",
      },
      {
        id: "contraception",
        title: "اللوالب الهرمونية وغير الهرمونية",
        text: "اختيار الخيار المناسب بما فيه Levosert حسب الصحة وخطط الأسرة.",
      },
      {
        id: "hormones",
        title: "المشكلات الهرمونية",
        text: "تشخيص وعلاج المشكلات التي تؤثر في الدورة والخصوبة وجودة الحياة اليومية.",
      },
      {
        id: "metabolism",
        title: "عيادة السمنة والتمثيل الغذائي",
        text: "رعاية متخصصة للوزن والتمثيل الغذائي وتأثيرهما في الهرمونات والخصوبة والحمل.",
      },
    ],
  },
  about: {
    eyebrow: "من نحن",
    title: "طبيب يمكنكنّ إخباره بكل شيء",
    lead: "بيئة لطيفة وسرية — مساعدة في الحالات اليومية والمعقدة، في العيادة وعند الاستشفاء.",
    doctorTitle: "الدكتور سامر أسعد",
    doctorRole: "اختصاصي أمراض النساء والتوليد",
    doctorBio:
      "كلية الطب، جامعة بالاتسكي. تخصص في طب النساء والتوليد، وكفاءة في العقم والإنجاب المساعد. ترخيص للممارسة المستقلة.",
    membershipsTitle: "العضويات",
    memberships: [
      "الجمعية التشيكية لطب النساء والتوليد",
      "قسم الإنجاب المساعد",
      "الجمعية الطبية التشيكية JEP",
      "ESHRE — الجمعية الأوروبية للتكاثر البشري وعلم الأجنة",
    ],
    nurseTitle: "Nataliia Asad, DiS.",
    nurseRole: "ممرضة",
    teamLabel: "فريق العيادة",
    cta: "احجزي استشارة",
  },
  atmosphere: {
    eyebrow: "المكان",
    title: "هدوء تشعرن به عند الباب",
    lead: "عيادتنا في برانيتسكا — سرية ومضيئة ومصممة حتى لا تضطررن للاستعجال.",
    consent: "نُشرت الصور بموافقة العائلات.",
  },
  reviews: {
    eyebrow: "التقييمات",
    title: "أصوات المريضات",
    lead: "تجارب حقيقية من عيادتنا. ملاحظاتكن تساعدنا على التطور.",
    leave: "اكتبي تقييماً",
    empty: "لا توجد تقييمات منشورة بعد. يسعدنا سماع رأيك.",
    formTitle: "شاركي تجربتك",
    formLead: "شكراً لثقتكن. التقييمات تساعد نساء أخريات على الاختيار.",
    name: "الاسم",
    rating: "التقييم",
    text: "تجربتك",
    submit: "إرسال التقييم",
    success: "شكراً على التقييم",
    successHint: "استلمنا تقييمك. سيظهر قريباً على الموقع.",
    sourceLabel: "نماذج من",
    sourceLink: "Známy lékař",
    countHint: "725 تقييماً موثّقاً",
    ratingScore: "4,9",
  },
  booking: {
    eyebrow: "الحجز",
    title: "اختاري موعداً متاحاً",
    lead: "احجزي من التقويم المباشر واحصلي على تأكيد فوري. اتصلي بنا إذا لم تعرفي نوع الزيارة المناسب.",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    service: "نوع الزيارة",
    servicePlaceholder: "اختاري خدمة",
    date: "اليوم المفضل",
    time: "الوقت المفضل",
    note: "ملاحظة",
    notePlaceholder: "اختياري — سبب الزيارة، اللغة المفضلة…",
    submit: "إرسال طلب الحجز",
    success: "تم إرسال الحجز",
    successHint: "سنتواصل معك قريباً لتأكيد الموعد.",
    hoursTitle: "ساعات العمل",
    hours: [
      { day: "الاثنين", time: "8:00 – 15:00" },
      { day: "الثلاثاء", time: "10:00 – 17:00" },
      { day: "الأربعاء", time: "9:00 – 15:30" },
      { day: "الخميس", time: "9:00 – 16:15" },
      { day: "الجمعة", time: "8:30 – 12:30" },
    ],
    privacy: "بإرسال النموذج توافقين على معالجة البيانات لغرض الحجز.",
    stepService: "١ · الخدمة",
    stepDateTime: "٢ · الموعد",
    stepDetails: "٣ · التواصل",
    next: "متابعة",
    back: "رجوع",
    slotsTitle: "الأوقات المتاحة",
    summary: "الملخص",
  },
  contact: {
    eyebrow: "التواصل",
    title: "نحن في براغ 4",
    lead: "عيادة نسائية · Branická 479/21",
    address: "Branická 479/21, 147 00 براغ 4",
    email: "dr.samer@seznam.cz",
    phone: "+420 734 421 860",
    mapCta: "افتحي الخريطة",
  },
  pricing: {
    eyebrow: "الأسعار",
    title: "الخدمات والأسعار الإرشادية",
    lead: "نظرة كاملة من Známy lékař. السعر الدقيق يعتمد على نطاق الرعاية — نؤكده عند الحجز.",
    priceCol: "السعر",
    onRequest: "حسب الحالة",
    notesTitle: "معلومات مهمة",
    insuranceTitle: "التأمين الصحي",
    insuranceLead: "عقود مع شركات التأمين الصحي التشيكية الرئيسية.",
    diseasesTitle: "مجالات الرعاية الشائعة",
    languagesTitle: "اللغات",
    paymentTitle: "الدفع (زيارات خاصة)",
    paymentCash: "نقداً",
    sourceNote: "البيانات وفق ملف Známy lékař. الأسعار للمرضى دون تأمين إرشادية.",
  },
  footer: {
    mission:
      "بيئة لطيفة وسرية. رعاية طبية ونصيحة — في العيادة وعند الاستشفاء.",
    rights: "جميع الحقوق محفوظة.",
    links: "تجدوننا أيضاً على",
  },
  common: {
    required: "حقل مطلوب",
    loading: "جارٍ الإرسال…",
    error: "حدث خطأ. حاولي مرة أخرى.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { cs, en, de, it, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.cs;
}

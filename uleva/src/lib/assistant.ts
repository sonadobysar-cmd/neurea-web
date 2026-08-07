import { SERVICE_PRICING, formatCzk } from "@/data/pricing";
import {
  extractRecommendFromText,
  recommendProviders,
  type RankedProvider,
} from "@/lib/recommend";

export type AssistantReply = {
  answer: string;
  recommendations?: RankedProvider[];
  links?: { href: string; label: string }[];
};

type Faq = {
  keys: string[];
  answer: string;
  links?: { href: string; label: string }[];
};

const FAQ: Faq[] = [
  {
    keys: ["cena", "kolik", "ceník", "stoji", "stojí", "fee", "provize", "předplat"],
    answer: `Jednotný ceník pro maminky:\n• Úleva doma ${formatCzk(SERVICE_PRICING.uleva.pricePerHour)}/h (min. ${SERVICE_PRICING.uleva.minHours} h)\n• Dula ${formatCzk(SERVICE_PRICING.dula.pricePerHour)}/h (min. ${SERVICE_PRICING.dula.minHours} h)\n• Laktace ${formatCzk(SERVICE_PRICING.laktace.pricePerHour)}/h (min. ${SERVICE_PRICING.laktace.minHours} h)\n\nPlatíš jen objednané hodiny — žádné předplatné. Cena, kterou vidíš, je cena služby.`,
    links: [{ href: "/cenik", label: "Otevřít ceník" }],
  },
  {
    keys: ["ověř", "over", "bezpeč", "rt", "trestní", "pojišt", "důvěř", "duver"],
    answer:
      "Každá pečující musí mít: IČO, ověřenou totožnost, výpis z rejstříku trestů, pohovor a pojištění. Bez aktivního kalendáře se ve výsledcích nezobrazí. MamaSOS je zprostředkovatel — službu poskytuje podnikatelka.",
    links: [{ href: "/jak-to-funguje", label: "Jak ověřujeme" }],
  },
  {
    keys: ["kalendář", "termin", "termín", "rezerv", "dostup", "kdy"],
    answer:
      "Rezervuješ přímo v kalendáři pečující — vidíš volné sloty a klikneš. Žádné dopisování „máš čas ve středu?“. Po výběru zaplatíš na platformě a termín je držený.",
    links: [{ href: "/hledat", label: "Najít volné termíny" }],
  },
  {
    keys: ["platb", "karta", "zaplat", "výplat", "vyplat", "převod"],
    answer:
      "Zaplatíš předem kartou za konkrétní rezervaci. Vidíš jen cenu služby — bez předplatného a bez peněženky s volným dobíjením.",
  },
  {
    keys: ["dula", "šestin", "sestin", "poporod"],
    answer:
      "Poporodní dula = přítomnost, rutina, emoční opora. Není to zdravotní péče ani porodní asistence. Sazba je jednotná pro všechny duly na platformě.",
    links: [{ href: "/hledat?sluzba=dula", label: "Najít dulu" }],
  },
  {
    keys: ["lakt", "koj", "mléko", "mleko"],
    answer:
      "Laktační poradkyně mají jasný badge: porodní asistentka (PA) nebo laická podpora. Při zdravotních potížích vždy kontaktuj lékaře nebo 155 — MamaSOS nenahrazuje medicínu.",
    links: [{ href: "/hledat?sluzba=laktace", label: "Najít laktační poradkyni" }],
  },
  {
    keys: ["úlev", "ulev", "uklid", "úklid", "vař", "hlíd", "souroz"],
    answer:
      "Úleva doma znamená praktickou pomoc: uvařit, uklidit, pohlídat sourozence, být s miminkem zatímco si odpočineš. Jde o občasnou krátkodobou pomoc v domácnosti — ne jesle ani denní režim péče o děti do 3 let.",
    links: [{ href: "/hledat?sluzba=uleva", label: "Najít úlevu doma" }],
  },
  {
    keys: ["pečuj", "hlídač", "hlidac", "registrovat peč", "nabídnout", "chci nabízet", "iče", "ičo"],
    answer:
      "Pečující musí mít IČO a správnou živnost, projít ověřením a nastavit rezervační kalendář. Bez kalendáře profil nezveřejníme. Ceny jsou jednotné — vyděláš rezervacemi a recenzemi.",
    links: [{ href: "/nabidnout", label: "Registrace pečující" }],
  },
  {
    keys: ["zdravot", "nemoc", "horeč", "depres", "kriz", "155", "lékař", "lekar"],
    answer:
      "MamaSOS není zdravotní služba. Při zdravotních potížích, podezření na poporodní komplikace nebo krizové situaci kontaktuj lékaře, pohotovost nebo 155. AI ti pomůže najít praktickou podporu doma — ne diagnózu.",
  },
  {
    keys: ["maminka", "registr", "účet", "ucet", "přihlás", "prihlas", "login"],
    answer:
      "Jako maminka si založíš účet, vybereš pečující (nebo necháš doporučit AI), rezervuješ termín a uvidíš rezervace ve svém účtu. Heslo v demu stačí libovolné — data běží v tomto prohlížeči.",
    links: [
      { href: "/registrace", label: "Registrace maminky" },
      { href: "/prihlaseni", label: "Přihlášení" },
    ],
  },
  {
    keys: ["celá čr", "cela cr", "měst", "mesto", "praha", "brno", "kde funguj"],
    answer:
      "MamaSOS cílí na celou ČR. Hledáš podle lokality a ukážeme nejbližší ověřené ženy s volnými sloty (v demu: Praha, Brno, Ostrava a další města).",
    links: [{ href: "/hledat", label: "Hledat podle města" }],
  },
  {
    keys: ["rozdíl", "hlídačk", "hlidack", "proč vy", "proc vy", "unikát"],
    answer:
      "Narozdíl od obecných inzerátů má MamaSOS: povinné ověření, reálný kalendář místo chatu, poporodní niche a jednotné ceny podle typu služby — ne podle toho, kdo je dražší na profilu.",
  },
  {
    keys: ["storno", "zruš", "zrus", "vrácení", "vraceni"],
    answer:
      "V produkci bude storno podle podmínek (např. volné zrušení do X hodin před termínem). V demu je rezervace simulovaná — platební brána ještě není napojená.",
  },
];

function wantsRecommendation(text: string) {
  const t = text.toLowerCase();
  return (
    t.includes("doporuč") ||
    t.includes("doporuc") ||
    t.includes("najdi") ||
    t.includes("najdi mi") ||
    t.includes("kdo") ||
    t.includes("kandidát") ||
    t.includes("kandidat") ||
    t.includes("hodí") ||
    t.includes("vhodn") ||
    t.includes("potřebuju") ||
    t.includes("potrebuju") ||
    t.includes("hledám") ||
    t.includes("hledam") ||
    t.includes("přijed") ||
    t.includes("prijed")
  );
}

function formatRecommendations(list: RankedProvider[]) {
  if (!list.length) {
    return "Podle zadaných požadavků teď nikoho blízko nemám s volným termínem. Zkus jiné město nebo typ služby.";
  }
  return list
    .map((r, i) => {
      const slot = r.nextSlot
        ? `nejbližší: ${r.nextSlot.date} ${r.nextSlot.start}`
        : "bez slotu";
      return `${i + 1}. ${r.provider.name} (${r.provider.city}) — ${r.reasons.slice(0, 3).join(" · ")} · ${slot}`;
    })
    .join("\n");
}

export function askAssistant(message: string): AssistantReply {
  const text = message.trim();
  if (!text) {
    return {
      answer:
        "Napiš mi, co potřebuješ — třeba „Praha, úleva doma, vaření a sourozenci“ nebo otázku k cenám a ověření.",
    };
  }

  if (wantsRecommendation(text) || extractRecommendFromText(text).service) {
    const input = extractRecommendFromText(text);
    // If user only asked a FAQ-like question without location/service intent, fall through
    const looksLikeMatch =
      wantsRecommendation(text) ||
      Boolean(input.cityKey) ||
      Boolean(input.service) ||
      (input.needs && input.needs.length > 0);

    if (looksLikeMatch && (wantsRecommendation(text) || input.cityKey || input.needs?.length)) {
      const recommendations = recommendProviders({
        ...input,
        cityKey: input.cityKey ?? "praha",
        service: input.service ?? "all",
      });
      return {
        answer: `Tady jsou nejvhodnější kandidátky podle tvých požadavků:\n\n${formatRecommendations(recommendations)}\n\nMůžu upřesnit: město, typ služby (úleva/dula/laktace), vaření, úklid, sourozenci, noční směna.`,
        recommendations,
        links: [
          { href: "/asistent", label: "Otevřít doporučení" },
          {
            href: `/hledat?mesto=${input.cityKey ?? "praha"}${
              input.service && input.service !== "all" ? `&sluzba=${input.service}` : ""
            }`,
            label: "Zobrazit ve vyhledávání",
          },
        ],
      };
    }
  }

  const lower = text.toLowerCase();
  const hit = FAQ.find((f) => f.keys.some((k) => lower.includes(k)));
  if (hit) {
    return { answer: hit.answer, links: hit.links };
  }

  return {
    answer:
      "Jasně — jsem MamaSOS asistentka. Umím:\n• vysvětlit ceny, ověření, platby a hranice služeb\n• doporučit pečující podle města a potřeb\n• navést tě na registraci maminky nebo pečující\n\nZkus třeba: „Doporuč mi dulu v Brně“ nebo „Kolik stojí úleva doma?“",
    links: [
      { href: "/asistent", label: "Průvodce doporučením" },
      { href: "/registrace", label: "Registrace maminky" },
      { href: "/nabidnout", label: "Registrace pečující" },
    ],
  };
}

export const ASSISTANT_STARTERS = [
  "Doporuč mi úlevu doma v Praze, vaření a sourozenci",
  "Kolik to stojí a je nějaké předplatné?",
  "Jak ověřujete pečující?",
  "Chci se registrovat jako pečující",
  "Najdi laktační poradkyni PA v Brně",
];

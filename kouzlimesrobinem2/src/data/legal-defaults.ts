import type { LegalPagesContent } from "@/lib/cms/types";

export const ANALYTICS_PRIVACY_NOTICE =
  "Pro soukromý přehled v administraci web eviduje zahájení 30minutové návštěvní relace, vstupní stránku, doménu zdroje, zemi a obecný typ zařízení a prohlížeče. Neukládá jméno, kontakt ani IP adresu; IP se použije pouze krátkodobě pro odvození země a ochranu proti zneužití. Identifikátor relace zůstává jen v dočasném úložišti prohlížeče bez cookies. Anonymní technické záznamy jsou uloženy ve Vercel Blob nejdéle 90 dní.";

export const GOOGLE_CALENDAR_PRIVACY_NOTICE =
  "Pokud správce aktivuje volitelné propojení s Google Kalendářem, údaje schválené rezervace (zejména termín, typ a místo akce, jméno, kontakt a související poznámky) mohou být zapsány do jeho soukromého Google Kalendáře. Google tyto údaje zpracovává jako poskytovatel kalendářové služby podle svých příslušných smluvních a bezpečnostních podmínek. Propojení lze kdykoliv odvolat v administraci webu.";

export const LEGAL_DEFAULTS: LegalPagesContent = {
  terms: {
    title: "Obchodní podmínky",
    lead:
      "Tyto obchodní podmínky upravují objednání a poskytnutí kouzelnického vystoupení, balónkové tvorby a souvisejících služeb pod značkou Kouzlíme s Robinem (Robin Panuš). Jde o klientskou šablonu — konkrétní detaily zakázky mohou být upřesněny v potvrzení objednávky.",
    updated: "Šablonová verze — aktualizováno: srpen 2026",
    sections: [
      {
        heading: "1. Poskytovatel",
        body: "Poskytovatelem služeb je Robin Panuš (Kouzlíme s Robinem).\n\nKontakt: kouzlimesrobinem@email.cz, telefon 775 950 328.",
      },
      {
        heading: "2. Předmět služeb",
        body: "Předmětem je živé vystoupení (kouzla, balónková zvířátka, mentalismus nebo jejich kombinace) v rozsahu a na místě dohodnutém při rezervaci. Orientační délka vystoupení a cena jsou uvedeny na webu; finální podoba se potvrzuje písemně (e-mail / zpráva).",
      },
      {
        heading: "3. Objednávka a uzavření smlouvy",
        body: "Poptávka přes webový formulář není ještě závaznou objednávkou. Smlouva vzniká potvrzením termínu a podmínek ze strany poskytovatele (typicky e-mailem) a odsouhlasením klientem.\n\nPro závaznou rezervaci může být vyžadována záloha — výše a splatnost budou uvedeny v potvrzení.",
      },
      {
        heading: "4. Cena a platební podmínky",
        body: "Cena vystoupení a dopravy vychází z aktuální nabídky na webu, pokud není dohodnuto jinak. Doprava se obvykle účtuje podle skutečně ujeté vzdálenosti z Mladé Boleslavi.\n\nDoplatek je splatný nejpozději v den vystoupení, není-li dohodnuto jinak. Preferovaný způsob platby: převod na účet nebo hotovost dle dohody.",
      },
      {
        heading: "5. Povinnosti klienta",
        body: "Klient zajistí zejména:\n\n- včasné potvrzení místa, času a kontaktní osoby na místě\n- prostor vhodný pro vystoupení (dostatek místa, bezpečný přístup)\n- přiměřené podmínky pro děti / publikum dle typu akce\n- informaci o případných omezeních (hluk, venkovní akce, počet dětí)",
      },
      {
        heading: "6. Zrušení a změna termínu",
        body: "Zrušení nebo přesun termínu klientem je třeba oznámit co nejdříve e-mailem nebo telefonicky. Není-li dohodnuto jinak:\n\n- zrušení více než 14 dní před akcí — záloha může být převedena na náhradní termín nebo vrácena dle dohody\n- zrušení 7–14 dní před akcí — záloha se zpravidla nevrací\n- zrušení méně než 7 dní před akcí — může být účtována celá dohodnutá cena vystoupení\n\nPokud vystoupení zruší poskytovatel (např. nemoc, vyšší moc), nabídne náhradní termín nebo vrátí již uhrazenou zálohu.",
      },
      {
        heading: "7. Průběh vystoupení",
        body: "Poskytovatel vystoupí v dohodnutém čase a rozsahu. Menší odchylky v programu (např. výběr triků podle věku dětí) jsou běžné a slouží kvalitě zážitku. Fotografie a nahrávky z akce může klient pořizovat pro soukromé účely; komerční použití vyžaduje souhlas.",
      },
      {
        heading: "8. Odpovědnost",
        body: "Poskytovatel odpovídá za řádné provedení služby. Neodpovídá za škody vzniklé okolnostmi mimo jeho kontrolu (výpadek elektřiny, nevhodný prostor, chování třetích osob) ani za ztrátu věcí hostů na akci.",
      },
      {
        heading: "9. Ochrana osobních údajů",
        body: "Zpracování osobních údajů popisuje samostatný dokument {{privacy-link}}.",
      },
      {
        heading: "10. Závěrečná ustanovení",
        body: "Vztahy se řídí právním řádem České republiky. Odchylná ujednání v potvrzení objednávky mají přednost před těmito podmínkami. Tyto podmínky mohou být aktualizovány; pro konkrétní zakázku platí verze platná v den potvrzení rezervace.",
      },
    ],
  },
  privacy: {
    title: "Ochrana osobních údajů",
    lead:
      "Tyto informace popisují, jak zpracováváme osobní údaje, které nám dobrovolně poskytnete přes kontaktní nebo rezervační formulář na webu Kouzlíme s Robinem.",
    updated: "Aktualizováno: srpen 2026",
    sections: [
      {
        heading: "1. Správce údajů",
        body: "Správcem osobních údajů je Robin Panuš (Kouzlíme s Robinem).\n\nKontakt: kouzlimesrobinem@email.cz, telefon 775 950 328.",
      },
      {
        heading: "2. Jaké údaje zpracováváme",
        body: "Z kontaktního a rezervačního formuláře můžeme zpracovat:\n\n- jméno\n- e-mailovou adresu\n- telefonní číslo\n- požadovaný termín, typ a místo akce, případně počet hostů\n- obsah zprávy / poznámky\n- technické údaje nezbytné pro ochranu formuláře (např. IP při limitech a anti-spam)",
      },
      {
        heading: "3. Účel a právní důvod",
        body: "Údaje zpracováváme za účelem vyřízení poptávky, posouzení a správy rezervace a navazující komunikace. Právním důvodem je provedení opatření před uzavřením smlouvy na vaši žádost (čl. 6 odst. 1 písm. b GDPR), případně váš souhlas a oprávněný zájem na bezpečné komunikaci a ochraně formuláře.",
      },
      {
        heading: "4. Komu údaje předáváme",
        body: `Údaje používáme primárně my. Pro hosting využíváme Vercel, pro databázi rezervací Neon a pro transakční e-maily Resend. Tito zpracovatelé údaje zpracovávají pro provoz služby podle příslušných smluvních a bezpečnostních podmínek.\n\n${GOOGLE_CALENDAR_PRIVACY_NOTICE}`,
      },
      {
        heading: "5. Doba uložení",
        body: "Údaje uchováváme po dobu nezbytnou k vyřízení poptávky a případné navazující komunikace, nejdéle však obvykle 12 měsíců od posledního kontaktu, pokud není delší uchování nutné z právních důvodů.",
      },
      {
        heading: "6. Vaše práva",
        body: "Máte právo:\n\n- požadovat přístup ke svým údajům\n- požadovat opravu nebo výmaz\n- omezení zpracování\n- námitku proti zpracování\n- odvolat souhlas (pokud je zpracování na souhlasu založeno)\n- podat stížnost u Úřadu pro ochranu osobních údajů\n\nPro uplatnění práv napište na kouzlimesrobinem@email.cz.",
      },
      {
        heading: "7. Cookies a měření",
        body: `Web nepoužívá reklamní cookies. Pro návštěvnost můžeme využívat privátní měření hostingu (Vercel Analytics) bez reklamních profilů. ${ANALYTICS_PRIVACY_NOTICE}\n\nPro ochranu kontaktního a rezervačního formuláře používáme Cloudflare Turnstile. Cloudflare při ověření zpracovává nezbytné technické údaje za účelem ochrany proti automatizovanému zneužití.`,
      },
    ],
  },
};

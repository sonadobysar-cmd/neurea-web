export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSection = {
  id: string;
  title: string;
  items: FaqItem[];
};

/** Texty z podkladů NEUREA — jazykově upraveno pro web */
export const faqSections: FaqSection[] = [
  {
    id: "obecne",
    title: "Obecné otázky",
    items: [
      {
        question: "Co je NEUREA a čím se liší od psychologa nebo psychiatra?",
        answer:
          "NEUREA je neuro-somatické poradenské pracoviště. Neposkytujeme psychoterapii ani psychiatrickou péči — pracujeme s biologickým základem obtíží, ne s jejich psychologickým „zpracováním“ v terapeutickém smyslu. Psycholog pracuje s myšlenkami a emocemi. Psychiatr předepisuje léky. My měříme objektivní stav nervové soustavy a pomocí klinicky ověřených technologií ho cíleně ovlivňujeme. Tři přístupy se nevylučují — naopak se doplňují.",
      },
      {
        question: "Pro koho jsou služby NEUREA vhodné?",
        answer:
          "Pro lidi, kteří trpí vyhořením, depresí, úzkostmi, nespavostí, ADHD nebo chronickou bolestí a klasická cesta jim nestačila. Také pro výkonné lidi, kteří chtějí optimalizovat kognitivní výkon. A pro rodiče dětí s ADHD, kteří hledají alternativu k medikaci.",
      },
      {
        question: "Musím mít lékařskou diagnózu, abych mohl/a přijít?",
        answer:
          "Ne. Přijít můžete i bez diagnózy — stačí symptomy, které vás trápí. Diagnózu nevystavujeme ani nevyžadujeme. Vstupní diagnostika objektivně změří stav vaší nervové soustavy a na základě dat sestavíme individuální protokol.",
      },
      {
        question: "Je NEUREA náhrada za lékaře nebo psychiatra?",
        answer:
          "Ne. NEUREA je podpůrné pracoviště — není náhradou lékařské péče. Pokud užíváte léky nebo jste v psychiatrické péči, doporučujeme v ní pokračovat a naše služby využívat jako doplněk. Mnoho klientů kombinuje NEUREA s farmakologickou léčbou — výsledky bývají lepší při obou přístupech.",
      },
    ],
  },
  {
    id: "technologie",
    title: "Technologie a bezpečnost",
    items: [
      {
        question: "Jsou technologie, které používáte, bezpečné?",
        answer:
          "Ano. Všechny technologie, které v NEUREA používáme, jsou neinvazivní, klinicky testované a schválené regulačními orgány (FDA cleared nebo EU MDR). Intenzity proudu u neurostimulačních přístrojů jsou výrazně nižší než u běžných lékařských procedur. Před každým sezením provedeme vstupní screening kvůli vyloučení kontraindikací.",
      },
      {
        question: "Existují kontraindikace — kdy nemohu přijít?",
        answer:
          "Ano. Neurostimulační technologie nejsou vhodné např. pro osoby s epilepsií, kardiostimulátorem nebo kochleárním implantátem, těhotné ženy, osoby po nedávné operaci mozku nebo s aktivním nádorovým onemocněním CNS. V případě pochybností nás kontaktujte předem.",
      },
      {
        question: "Funguje to opravdu, nebo je to placebo?",
        answer:
          "Technologie, které používáme, mají za sebou dvojitě zaslepené placebem kontrolované klinické studie — vysoký standard vědeckého důkazu. Výsledky navíc sledujeme objektivně pomocí HRV — nejen subjektivním pocitem. Konkrétní čísla a studie rádi vysvětlíme při konzultaci.",
      },
      {
        question: "Kdy pocítím výsledky?",
        answer:
          "Záleží na obtížích a individuální reakci. Někteří klienti zaznamenají změnu již po 2–3 sezeních. Efekt technologií je kumulativní — každé sezení navazuje na předchozí. Proto doporučujeme sérii sezení, ne jednorázovou návštěvu.",
      },
    ],
  },
  {
    id: "sezeni",
    title: "Průběh sezení",
    items: [
      {
        question: "Jak vypadá první návštěva?",
        answer:
          "První návštěva je vstupní diagnostika (75 minut). Začínáme strukturovanou anamnézou — ptáme se na vaše symptomy, historii a cíle. Potom provedeme HRV měření a analýzu koherence autonomního nervového systému. Na základě dat sestavíme váš individuální protokol. Odcházíte s plánem a objektivními daty o stavu nervové soustavy.",
      },
      {
        question: "Jak se mám připravit na sezení?",
        answer:
          "Přijďte vyspaní, v pohodlném oblečení. Vyhněte se alkoholu a kávě asi 2 hodiny před sezením — ovlivňují HRV měření. Přineste si seznam léků, které užíváte. Nic dalšího není potřeba — ostatní zajistíme.",
      },
      {
        question: "Je sezení bolestivé nebo nepříjemné?",
        answer:
          "Ne. Většina klientů popisuje sezení jako příjemné až relaxační. Neurostimulační technologie pracují s velmi slabými proudy — většina lidí cítí jen mírné brnění nebo teplo. Fotobiomodulace je obvykle zcela bezbolestná. Myofasciální práce může být místy intenzivnější, ale nikdy bolestivá — intenzitu nastavujeme podle vašeho komfortu.",
      },
    ],
  },
  {
    id: "ceny",
    title: "Ceny a rezervace",
    items: [
      {
        question: "Jsou služby hrazeny pojišťovnou?",
        answer:
          "Ne — služby NEUREA nejsou hrazeny z veřejného zdravotního pojištění. Na vyžádání vystavíme potvrzení o zaplacení pro účely daňového odpočtu nebo refundace od zaměstnavatele v rámci benefitních programů.",
      },
      {
        question: "Proč musím platit zálohu při rezervaci?",
        answer:
          "Záloha 1 000 Kč potvrzuje závazek — náš i váš. Rezervujeme pro vás konkrétní čas a přístroje. Záloha se odečte od ceny sezení. Při zrušení více než 48 h předem ji vrátíme nebo přesuneme na jiný termín (viz obchodní podmínky).",
      },
      {
        question: "Co když potřebuji zrušit termín na poslední chvíli z vážného důvodu?",
        answer:
          "Chápeme, že život přináší nečekané situace. V případě prokazatelné vážné události (hospitalizace, úmrtí v rodině, závažná nehoda) zálohu vrátíme nebo přesuneme. Kontaktujte nás na info@neurea.cz do 48 hodin a přiložte příslušný doklad.",
      },
      {
        question: "Mohu přijít jen na jednu technologii bez celého protokolu?",
        answer:
          "Ano — nabízíme à la carte sezení na jednotlivé technologie. Doporučujeme ale začít vstupní diagnostikou, aby mělo sezení smysl a bylo správně nastaveno. Bez vstupní diagnostiky nevíme, jaký protokol je pro vás optimální.",
      },
    ],
  },
];

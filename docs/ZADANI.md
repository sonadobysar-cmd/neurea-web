# Zadání webu NEUREA — oficiální směr

Tento dokument je **jednotný zdroj pravdy** pro vývoj: co má web vizuálně a tónem odpovídat.

## 1. Referenční vzor (zadání od klienta)

- **Referenční web (struktura, důvěra, editorial luxus):** [theaeonclinic.com](https://theaeonclinic.com)  
  — světlá perleť / bílá, hodně prostoru, pásy s důvěryhodností (ocenění / partnerství), silná typografie, klidný luxusní klinický tón.

- **Grafický vzor od zadavatelky:** šablony z **Canvy** + **animované logo** a **celkový vizuální styl** (barvy zlata, kompozice, animace marku).  
  — Logo NEUREA (symbol + nápis) je **součástí identity**; v hero má být **jemně animované** (ne statické), v souladu s poskytnutým vzorem.

- **Aktuální stav webu (k porovnání s předlohou):** screenshot v souboru  
  **`docs/reference-screenshot-2026-03.png`** — slouží jako kontrola, co je potřeba ladit oproti Canvě / AEONu.

## 2. Co musí výsledek splňovat

| Oblast | Požadavek |
|--------|-----------|
| Paleta | Perleť / krémová / taupe, **kovové zlato** jako akcent (ne levná žlutá) |
| Typografie | Editorial nadpisy (Playfair), čisté UI (Manrope) — viz `layout.tsx` |
| Hero | Dvousloupcový layout na desktopu; **logo v prémiovém rámu** (tmavý panel odpovídá značce zlato na tmavém); **animace loga** (3D „dýchání“ / float + jemná rotace v prostoru, ne agresivní „kolotoč“) |
| Hlavička | Sticky, vzdušná, zlaté akcenty při hoveru |
| Důvěra | Sekce / pás evokující **AEON** (krátké claimy, čísla, lokace) — viz úvodní stránka |
| Tón | Profesionální, diskrétní, **ne** generické „wellness studio“ bez kontextu |

## 3. Technické poznámky

- Logo v `public/` — `heroSymbolUrl` ve `src/lib/site.ts` (PNG lockup s alfou, ideálně bez černého pozadí).
- Dev server: `npm run dev` s hostem `127.0.0.1` (viz `package.json`).
- Vizuální implementace: `Hero.tsx`, `globals.css`, `tailwind.config.ts`.

## 4. Záměrně upřesněno oproti obecné šabloně

- Texty jsou **česky** a zaměřené na **neuro-somatiku / měření** (NEUREA), ne na kopírování AEONu 1:1.
- **Brno** jako lokace místo Dubaje — struktura „důvěra + hero + služby“ zůstává.

---

**Shrnutí:** Zadání = **referenční web AEON** (úroveň a struktura) + **váš vizuál z Canvy** (logo, animace, styl).  
Jakékoli další úpravy prosím doplňovat sem nebo do issue s odkazem na tento soubor.

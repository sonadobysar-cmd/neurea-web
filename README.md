# NEUREA — web (neurea.cz)

Next.js 15 (App Router) + TypeScript + Tailwind CSS. Světlý luxusní vizuál: krémová paleta, zlaté akcenty, fonty Playfair Display + Manrope.

---

### Kde je náhled? (nejčastější)

**V terminálu uvidíte jen řádky textu — ne samotný web.** Stránka se **nikdy neotevře sama** uvnitř Cursoru. Musíte ji otevřít v **prohlížeči** (Safari / Chrome), nebo použít příkaz níže.

**Nejjednodušší na Macu:** nechte běžet `npm run dev`, počkejte až uvidíte `Ready`, pak otevřete **druhý** terminál ve Cursoru (*Terminal* → *Split Terminal* nebo `+`) a spusťte:

```bash
cd /Users/soni/Neurea
npm run open-browser
```

Tím se **automaticky otevře Safari** (nebo výchozí prohlížeč) na náhledu. Skript **chvíli čeká** a zkusí porty **3000–3005** i adresy `localhost` / `127.0.0.1` (aby seděl i jiný port, než 3000). Pokud přesto skončí chybou, nejdřív ať doběhne v druhém terminálu `Ready`, pak `npm run open-browser` spusťte znovu.

---

**Web v Cursoru „nevidíte“** jako stránku — otevření je v **Safari nebo Chrome** (normální okno prohlížeče), nebo *Simple Browser* v Cursoru (viz níže).

1. **Složka projektu** na vašem Macu je typicky:  
   **`/Users/soni/Neurea`**  
   (Finder → **Přejít** → **Přejít ke složce…** → vložte tuto cestu a Enter.)

2. **Terminál** (v Cursoru: menu *Terminal* → *New Terminal*, nebo systémový Terminál): zkopírujte **obě** řádky najednou:
   ```bash
   cd /Users/soni/Neurea
   npm run dev
   ```
   Nechte běžet — nesmíte okno zavřít. Po chvíli uvidíte něco jako `Ready` / `Local: http://localhost:3000` (nebo jiný port).

3. **Adresa náhledu** — v prohlížeči do řádku s adresou **ručně napište** (nebo zkopírujte **přesně** řádek `Local:` z terminálu), typicky:
   ```
   http://localhost:3000
   ```
   Pokud je port obsazený, Next použije **3001, 3002…** — vždy použij URL z terminálu u `Local:`.

**V Cursoru bez prohlížeče:** `Cmd + Shift + P` → **Simple Browser: Show** → vložte stejnou adresu jako u `Local:` (např. `http://localhost:3000`).

---

## Spuštění lokálně

```bash
cd /Users/soni/Neurea
npm install
cp .env.example .env.local
# doplň STRIPE_SECRET_KEY z Stripe dashboardu
npm run dev
```

Po `npm run dev` otevřete v prohlížeči adresu z řádku **`Local:`** (často **`http://127.0.0.1:3000`**, nebo jiný port). Spolehlivější než `localhost` je **`http://127.0.0.1:PORT`**. Nebo použijte **`npm run open-browser`**.

**Doména neurea.cz** zatím tento projekt neobsahuje — na „internet“ se dostane až po **nasazení** (např. Vercel). Lokálně vždy `localhost` + port z terminálu při běžícím `npm run dev`.

### Když `npm install` hlásí chybu oprávnění (EPERM u `.npm`)

Na macOS někdy složka `~/.npm` patří „rootu“. Oprava (jednou):

```bash
sudo chown -R $(whoami) ~/.npm
```

Nebo instalace s lokální cache v projektu:

```bash
cd ~/Neurea
npm install --cache ./.npm-cache
```

### Když `npm run dev` hned spadne (`uv_interface_addresses` / `networkInterfaces`)

Na některých verzích Node (např. **24**) nebo v omezeném prostředí Next při startu volá síťové rozhraní OS a může skončit chybou typu **`uv_interface_addresses returned Unknown system error`**.

V tomto projektu je **`next dev` nastavený s `-H 127.0.0.1`**, aby se tomu vyhlo. V prohlížeči otevírej **`http://127.0.0.1:3000`** (nebo port z řádku `Local:`). Pokud problém přetrvá, nainstaluj **Node 20 LTS** (např. z [nodejs.org](https://nodejs.org)) a znovu `npm install`.

### Prohlížeč píše „web není dostupný“ / „Nelze se připojit“ / `ERR_CONNECTION_REFUSED`

1. **Musí běžet** `npm run dev` a v terminálu musí být **`✓ Ready`** a řádek **`Local: http://127.0.0.1:XXXX`** (číslo **PORT** si poznamenej).
2. **Adresa musí sedět s portem** — když je port **3000** obsazený jiným programem, Next použije **3001, 3004…** Otevři **přesně** tu adresu z řádku `Local:`, ne starý bookmark na `:3000`.
3. **Na Macu často nefunguje `localhost`, ale funguje `127.0.0.1`** — dev server naslouchá na IPv4 (`127.0.0.1`). Prohlížeč u `http://localhost:3000` někdy volá **IPv6** (`::1`) a spojení spadne. **Zkus vždy:** `http://127.0.0.1:PORT` (PORT z terminálu).
4. Nebo spusť druhý terminál: `npm run open-browser` — zkusí porty 3000–3005 a otevře fungující URL.

### Když localhost „nejde“

1. V terminálu musí běžet `npm run dev` a být vidět řádek `Ready` / `Local: …`.
2. **Prohlížeč píše „Nelze se připojit“ / `ERR_CONNECTION_REFUSED`** — dev server neběží, nebo používáš **špatný port**. Podívej se na **`Local:`** v terminálu a otevři **tu** adresu (ne starý bookmark na `:3000`).
3. **Červený/černý overlay od Next.js („Runtime Error“ / „Build Error“)** — to už je **připojení OK**, ale chyba v kódu nebo konfiguraci; přesná hláška je v **terminálu** i v overlay.
4. Zkus `npm run build` — pokud build spadne, oprav chyby z výpisu.
5. Jiný program může obsadit port 3000 — Next přepne na **3001** atd.; `npm run open-browser` to teď zkouší automaticky.

### Když terminál hlásí `EMFILE: too many open files` (Watchpack)

Na macOS je někdy nízký limit souborů. Před `npm run dev` v **tom samém** terminálu zkuste:

```bash
ulimit -n 10240
```

Pak znovu `npm run dev`. Trvalá úprava: např. v `~/.zshrc` řádek `ulimit -n 10240`.

### „Runtime Error“ / v terminálu `Cannot find module './123.js'` (chunk z `.next`)

Tohle casem vznikne po přerušeném buildu, upgradu Next.js nebo když běží starý `npm run dev` a soubory v `.next` už nesedí. **Vyčisti cache a znovu spusť dev:**

```bash
cd /Users/soni/Neurea
npm run clean
npm run dev
```

Pokud problém přetrvá, ještě jednou `npm run build` (ověří, že projekt jde zkompilovat).

### Chyba `Cannot find module for page: /_document` nebo divné chyby po buildu

Často je rozbitá složka `.next` (přerušený build). Vyčisti a znovu:

```bash
cd ~/Neurea
npm run clean
npm run build
npm run dev
```

### `EMFILE: too many open files, watch` (macOS)

Příliš mnoho sledovaných souborů. Dočasně zvýš limit v **tom samém** terminálu před `npm run dev`:

```bash
ulimit -n 10240
npm run dev
```

Nebo zavři jiné náročné aplikace / druhý běžící `next dev`.

## Zadání vs. implementace

V repu **není** vaše originální zadání z Canvy / školy — je tu jen obecný směr (viz níže).  
Aby šlo web **sladit 1:1 s návrhem**, doplňte prosím šablonu **`docs/ZADANI.md`** (odkaz na Figma/Canvu, barvy, pořadí sekcí).

**Oprava (únor 2026):** Hero dřív odkazoval na `neurea-symbol.png`, který v `public/` nebyl — nyní se používá existující **`/neurea-symbol.svg`** (`src/lib/site.ts`).

**Oficiální zadání / vzor:** viz **`docs/ZADANI.md`** — referenční web [AEON Clinic](https://theaeonclinic.com) + váš **Canva vizuál + animované logo**.  
**Vizuální směr (2026):** **bílá / krémová** (`#FFFFFF`, `#F9F6F0`), text `#1A1A1A`, zlato `#B8963E`. **Typografie:** Cormorant Garamond (nadpisy, lehké řezy) + DM Sans (text). **Hero** je centrovaný, logo bez rámečku, volitelné video se světlým přechodem; **jedna** kontrastní tmavá sekce (`section-velvet`) na úvodní stránce. Inspirace: světlý luxusní klinický web (např. AEON). Viz `Hero.tsx`, `page.tsx`, `globals.css`.

## Co je hotové

- Struktura stránek: Úvod, Jak to funguje, Služby, Technologie, O nás, Ceník, Rezervace, Kontakt,
  Screening testy, Obchodní podmínky, GDPR.
- **Úvodní stránka** rozšířená o pás lokací / zálohy, karty služeb, teaser technologií a sekci testů.
- **Vizuální styl:** světlý „švýcarská klinika“ — hodně bílého prostoru, tenké zlaté linky, skleněné panely, **champagne** primární CTA (`.btn-gold` / `.btn-primary`), sekundární outline (`.btn-outline-gold`), světlá patička, sjednocené styly v `globals.css`.
- Hero s velkým symbolem loga (`LogoMark` — **PNG s alfou**; jemná animace „float“ místo rotace).
- **Interaktivní screening:** PHQ-9 (deprese), GAD-7 (úzkost), ISI (insomnie), ASRS část A (ADHD dospělí),
  rodičovský checklist (ADHD děti) — výsledková stránka + u PHQ-9 upozornění při odpovědi na sebepoškození.
- **Cookie lišta** (souhlas ukládán do `localStorage`) + stránka **Cookie politika** (`/cookies`).
- **SEO:** `sitemap.xml` a `robots.txt` (App Router).
- **Mobilní plovoucí CTA** (Rezervovat / Testy) + odsazení obsahu (`pb-28`), aby nic nezasahovalo.
- **Kontakt:** embed mapy OpenStreetMap (orientační Brno — po doplnění adresy upravíte souřadnice v `kontakt/page.tsx`).
- **FAQ:** stránka `/faq` (obsah z vašeho PDF, jazykově sjednoceno).
- **Logo:** `public/neurea-symbol.png` (hero — cesta `heroSymbolUrl`, rozměry `heroSymbolSize` ve `src/lib/site.ts`) a volitelně `public/neurea-wordmark.svg` — hlavička (`wordmarkUrl`; `null` = textové NEUREA).
- **Rezervace + kalendář:** `bookingUrl` ve `src/lib/site.ts` (aktuálně např. Calendly). Google Kalendář sám o sobě neřeší zálohu přes Stripe — viz `/rezervace`.
- **Stripe Checkout** pro zálohu 1 000 Kč (`/api/checkout` → přesměrování na Stripe).
- Patička s právním disclaimerem (NEUREA není zdravotnické zařízení).

## Další kroky (doporučeno)

- Sladit tok: záloha Stripe ↔ výběr termínu v Calendly (ruční postup nebo automatizace přes Zapier/Make).
- Volitelně: přesnější výška wordmarku v `Header.tsx` (`h-8` / `max-w-*`), pokud logo v hlavičce potřebuje jiné proporce.
- Právní review textů u screeningů (formulace krizových kontaktů, přesné licence škál).
- Doplnit adresy, mapu, telefon, e-mailové šablony ve Stripe.
- Samostatná stránka Cookie politika (podrobněji než v GDPR).

## Nasazení

Vhodné: [Vercel](https://vercel.com) — nastavit env proměnné a `NEXT_PUBLIC_SITE_URL` na produkční doménu.

### Úvod (hero) — světlý luxusní styl

Úvodní sekce je **bílá / krémová** (`#FFFFFF` / `#F9F6F0`), bez tmavých ploch. Logo je čistý obrázek (`LogoMark`), volitelně s jemnou animací. Pokud v `src/lib/site.ts` nastavíte **`heroVideoUrl`** (a případně poster), na pozadí se přehraje video se **světlým** přechodem — žádné černé „jeviště“.

### „Interní chyba serveru“ / 502 po nasazení (Docker, VPS, vlastní hosting)

Často je příčina, že **produkční** server naslouchá jen na **`127.0.0.1`**. Pak zvenku (nebo z jiného kontejneru) **není na co se připojit** a proxy vrátí 500/502.

- **`npm run dev`** zůstává s **`-H 127.0.0.1`** kvůli chybě Node na některých Macích (`uv_interface_addresses`).
- **`npm run start`** (produkce po `next build`) musí běžet **bez** vynucení jen na localhost — výchozí Next.js je **`0.0.0.0`** (všechna rozhraní). Nepřidávejte do start scriptu `-H 127.0.0.1`.

V Dockeru zkontrolujte také mapování portu a proměnnou **`PORT`** (např. `3000`), kterou Next respektuje.

# Clinic Samer

Luxusní web pro gynekologickou ordinaci **MUDr. Samer Asad** — moderní upgrade původního [clinic-samer.cz](https://www.clinic-samer.cz).

## Spuštění

```bash
cd clinic-samer
npm install
npm run dev
```

Otevřete **http://127.0.0.1:3200** (nebo dvakrát klikněte `OTEVRI.command`).

## Jazyky

`/cs` · `/en` · `/de` · `/it` · `/ar` (RTL)

## Funkce

- **Rezervace** — `/[locale]/booking`
- **Recenze** — veřejný formulář; na webu se zobrazí až po schválení
- **Admin** — `/admin` (heslo: `ADMIN_PASSWORD` v `.env.local`, default `samer-admin-2026`)
  - Schvalování / zamítání recenzí (klient schvalování nevidí)
  - Přehled a stav rezervací

## Fotky

Placeholdery jsou označené — nahraďte soubory v `public/photos/` a upravte cesty v komponentách.

## Data

Lokálně se ukládají do `data/reviews.json` a `data/bookings.json` (gitignore).

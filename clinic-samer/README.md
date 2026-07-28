# Clinic Samer

Luxusní web pro gynekologickou ordinaci **MUDr. Samer Asad** — moderní upgrade původního [clinic-samer.cz](https://www.clinic-samer.cz).

**Live:** [https://clinic-samer.vercel.app](https://clinic-samer.vercel.app)

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

- **Rezervace** — `/[locale]/booking` (3krokový flow)
- **Recenze** — veřejný formulář; na webu se zobrazí až po schválení
- **Admin** — `/admin` (heslo: `ADMIN_PASSWORD` v env, default `samer-admin-2026`)

## Fotky

Placeholdery jsou označené — nahraďte soubory v `public/photos/`.

## Deploy

```bash
cd clinic-samer && npx vercel --prod
```

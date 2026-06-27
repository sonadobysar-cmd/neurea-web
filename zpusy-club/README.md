# Zpussy Club — web z Lovable

Podcast **Ivany & Kundosaki** — veřejný web, e-shop (Shopify), členská sekce **Zpussy+** (Supabase auth).

Stack: TanStack Start · Vite · React 19 · Tailwind 4 · Supabase · Shopify Storefront API.

## Spuštění lokálně

```bash
cd zpusy-club
cp .env.example .env
# doplň Supabase klíče z Lovable (nebo z existujícího .env)
npm install
npm run dev
```

V prohlížeči otevři adresu z terminálu (typicky `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Struktura

| Cesta | Popis |
|-------|--------|
| `/` | Úvodní stránka podcastu |
| `/shop` | Merch (Shopify) |
| `/plus` | Landing členské sekce |
| `/auth` | Přihlášení / registrace |
| `/plus/checkout` | Mock checkout členství |
| `/_authenticated/plus/*` | Chráněný obsah (videa, zápisky, chat…) |

## Poznámky

- Projekt přenesen z Lovable exportu (původní název archivu „Russian Lip Art“ — jde o Zpussy Club).
- Shopify storefront je v `src/lib/shopify.ts`.
- Migrace DB: `supabase/migrations/`.

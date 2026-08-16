# Kouzlíme s Robinem — sloučený web (Robin1+2+3)

Kombinace tří variant podle agendy — nasazeno na **kouzlimesrobinem2.vercel.app**.

## Zdroje

| Prvek | Z varianty |
|-------|------------|
| Pozadí (bubliny) | Robin2 (`kouzlimesrobinem1`) |
| Hero rám fotky | Robin1 (`kouzlimesrobinem`) |
| Hero interakce, font, karty | Robin3 (`kouzlimesrobinem2`) |
| Balónky „Praskni“ | Robin2 |
| Galerie + lightbox | Robin3 + pojízdný pás |
| Formulář | API `/api/contact` + Resend |

## Úpravy HTML

Upravte `kouzlimesrobinem2-work/body.html`, pak:

```bash
python3 scripts/build-kouzlimesrobinem2.py
```

## Vercel

- **Project:** `kouzlimesrobinem2`
- **Root:** `kouzlimesrobinem2`
- **URL:** https://kouzlimesrobinem2.vercel.app
- **Databáze:** Vercel Neon `robin-calendar`
- **Obsah a analytika:** Vercel Blob `robin-cms`
- **Env:** přehled bezpečně pojmenovaných proměnných je v `.env.example`; skutečné hodnoty patří pouze do Vercelu
- **Rezervace:** `/admin/rezervace`
- **Statistiky:** `/admin/statistiky`

### Volitelné propojení Google Kalendáře

Po nastavení OAuth proměnných v `.env.example` si Robin připojí účet sám v `/admin/google-kalendar`.
Vybrané Google kalendáře blokují veřejné termíny a schválené rezervace i vlastní akce se zapisují do zvoleného Robinova kalendáře. Obnovovací token je v Neonu uložený šifrovaně; heslo ke Google účtu aplikace nikdy nedostane.

Povolená návratová adresa v Google Cloud:

```text
https://kouzlimesrobinem2.vercel.app/api/admin/google-calendar/callback
```

## Lokálně

```bash
cd kouzlimesrobinem2
npm install
npm run dev
```

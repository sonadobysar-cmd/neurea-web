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
- **Env:** `RESEND_API_KEY`, volitelně `EMAIL_FROM` (ověřená doména)

## Lokálně

```bash
cd kouzlimesrobinem2
npm install
npm run dev
```

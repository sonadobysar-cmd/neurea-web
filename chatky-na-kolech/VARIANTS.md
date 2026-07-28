# Chatky na kolech — varianty

## Aktuální (produkce / `main`)
Teplý LA architectural styl + 3D konfigurátor.  
Live: https://chatky-na-kolech.vercel.app

## Varianta classic (uložená pro později)
Git větev: `chatky/variant-classic` (commit `67c0932`)  
Styl před tvrdým LA/3D přepisem — Syne + Unplgd kroky, teplý teak.

### Nasazení varianty na Vercel později
```bash
cd chatky-na-kolech
git checkout chatky/variant-classic
npx vercel --prod --yes
# pak se vrať na main:
git checkout main
```

Nebo ve Vercelu vytvoř druhý projekt a nastav Root Directory + Production Branch = `chatky/variant-classic`.

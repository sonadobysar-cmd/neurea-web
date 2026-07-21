# Reel — 5 oborů do portfolia (1080×1920, 26 s, 24 fps)

Prodejní reel pro NIADO BY SAR. Phone mockupy s tvými weby + přirozený text o otevřených místech v portfoliu.

## Požadavky

- Node.js 20+
- Chromium (nainstaluje se s Playwright)

## Použití

```bash
npm install
npx playwright install chromium
npm run build
```

Výstup:

- `reel.mp4` — finální video (bez zvuku)
- `qa/` — kontrolní snímky
- `frames/` — PNG snímky (24 fps × 26 s)

## Assety — vlož své weby

Do `./assets/` dej screenshoty webů (na výšku, ideálně full-page):

| Soubor | Popisek ve videu |
|--------|------------------|
| `web-01.png` | Klinika estetiky |
| `web-02.png` | Kavárna & cukrárna |
| `web-03.png` | Import vín |

Teď jsou tam placeholdery z portfolia — stačí je přepsat vlastními PNG se stejným názvem a znovu spustit `npm run render`.

## Timeline (26 s)

| Čas | Scéna |
|-----|-------|
| 0–3,2 s | Hook — přijímám ještě 5 oborů |
| 3,2–6,5 s | Cena — web za 2–5 tisíc |
| 6,5–11,5 s | Mockup 1 |
| 11,5–16,5 s | Mockup 2 |
| 16,5–21 s | Mockup 3 |
| 21–23,5 s | Filtr — obory, které v portfoliu chybí |
| 23,5–26 s | CTA — napiš obor do DM |

## Caption na Instagram (zkopíruj)

```
Přijímám ještě 5 oborů do portfolia.

Web za 2–5 tisíc — podle náročnosti.
Přednost mají obory, které u mě ještě chybí.

Když mi napíšeš, rovnou uveď obor — hned ti řeknu, jestli sedíme.
Piš prosím jen při vážném zájmu. Děkuju ✦

@niadobysar
```

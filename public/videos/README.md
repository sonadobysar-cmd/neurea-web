# Hero video

Vlož sem soubor videa pro úvodní sekci:

- **`hero.mp4`** — přesně tento název (malá písmena), cesta: `public/videos/hero.mp4` → v prohlížeči `/videos/hero.mp4`
- volitelně **`hero.webm`** — menší soubor; v `page.tsx` přidej `<Hero videoWebmSrc="/videos/hero.webm" />`
- volitelně **`hero-poster.jpg`** + `<Hero posterSrc="/videos/hero-poster.jpg" />`

Minimální rozlišení: ideálně **1920×1080** nebo vyšší; video se ořízne na celou obrazovku (`object-cover`).

**Když se video neukazuje:** zkontroluj, že soubor opravdu leží v `Neurea/public/videos/hero.mp4`, restartuj `npm run dev`, tvrdý refresh (Cmd+Shift+R). Bez souboru uvidíš jen tmavé pozadí.

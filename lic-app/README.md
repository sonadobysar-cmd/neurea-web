# Líc

**Tvoje tvář. Sedí. Neskače.**

## Otevři

- Next.js: [http://127.0.0.1:3000/lic/](http://127.0.0.1:3000/lic/)
- Static: [http://127.0.0.1:5177/lic/](http://127.0.0.1:5177/lic/)
- Nebo dvojklik `OTEVRI-LIC.command` v rootu repo

```bash
# sync + static server
cd lic-app && npm run dev

# nebo celý Neurea
cd .. && npm run dev
# → http://127.0.0.1:3000/lic/
```

Zdrojáky: `lic-app/` → sync do `public/lic/` (`npm run sync`).

## Features

- Demo portrait hned po startu (studio není prázdné)
- Upload foto/video + **kamera live**
- Beauty Natural / Glow / Glam + vyhlazení
- Stabilní face lock (FaceDetector + smoothing)
- Před / po, světlo, watermark, hook + CZ titulky
- Dictation cs-CZ, oprava češtiny
- Scan háčků u videa
- Export PNG 1080×1920 + video short (WebM)

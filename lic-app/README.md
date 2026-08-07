# Líc

**Tvoje tvář. Sedí. Neskače.**

Vizuální MVP studia: nahraješ fotku/video → beauty lock + světlo + CZ titulky na canvasu → stáhneš 9:16 PNG.

## Spuštění

```bash
cd lic-app
npm run dev
```

Otevři [http://127.0.0.1:5177](http://127.0.0.1:5177) nebo `#studio`.

## Co umí teď

- Upload fotky / videa (drag & drop)
- 9:16 cover crop na canvasu (1080×1920)
- Beauty: Natural / Glow / Glam + síla + vyhlazení (stabilní face box)
- FaceDetector API (Chrome) se smoothed trackingem — ring nelítá
- Světlo: Soft / Cinema / Night / Clean
- Titulky: Bold / Soft / Pop / Minimal + „Opravit češtinu“
- U videa: seek, přehrávání, auto háčky podle délky
- Export: stažení PNG shortu

## Další krok

- Skutečné ASR titulky (Whisper)
- Auto-háčky z audio energie
- Video export (WebCodecs / ffmpeg.wasm)
- Silnější identity beauty (SDK / model)

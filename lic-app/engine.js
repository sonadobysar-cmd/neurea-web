/**
 * Líc render engine — cover crop 9:16, beauty beauty, light, captions, face lock.
 */
window.LicEngine = (() => {
  const W = 1080;
  const H = 1920;

  const state = {
    beauty: "glow",
    beautyStrength: 18,
    smooth: 35,
    light: "soft",
    captionStyle: "bold",
    captionText: "tohle jsem nečekala…",
    face: null, // {x,y,w,h} in canvas coords — smoothed
    hasMedia: false,
    mediaKind: null, // image | video
  };

  let canvas;
  let ctx;
  let videoEl;
  let imageEl = null;
  let raf = 0;
  let faceDetector = null;
  let lastDetect = 0;
  let smoothFace = null;
  const off = { blur: null, blurCtx: null };

  const beautyBoost = { natural: 0.7, glow: 1, glam: 1.35 };

  function init(els) {
    canvas = els.canvas;
    ctx = canvas.getContext("2d", { alpha: false });
    videoEl = els.video;
    if ("FaceDetector" in window) {
      try {
        faceDetector = new FaceDetector({ fastMode: true, maxDetectedFaces: 1 });
      } catch {
        faceDetector = null;
      }
    }
    ensureOffscreen();
    drawPlaceholder();
  }

  function ensureOffscreen() {
    if (!off.blur) {
      off.blur = document.createElement("canvas");
      off.blur.width = W;
      off.blur.height = H;
      off.blurCtx = off.blur.getContext("2d");
    }
  }

  function setOptions( partial) {
    Object.assign(state, partial);
    if (state.hasMedia) requestRender();
    else drawPlaceholder();
  }

  function getState() {
    return { ...state, face: smoothFace };
  }

  function drawPlaceholder() {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#2a1822");
    g.addColorStop(0.45, "#151822");
    g.addColorStop(1, "#07080c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // soft face oval
    const cx = W / 2;
    const cy = H * 0.38;
    const rg = ctx.createRadialGradient(cx - 40, cy - 80, 20, cx, cy, 280);
    rg.addColorStop(0, "#f0d2c4");
    rg.addColorStop(0.45, "#c47d72");
    rg.addColorStop(1, "rgba(60,30,40,0)");
    ctx.fillStyle = rg;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 220, 280, 0, 0, Math.PI * 2);
    ctx.fill();

    drawOverlays(defaultFaceBox());
  }

  function defaultFaceBox() {
    return { x: W * 0.28, y: H * 0.22, w: W * 0.44, h: H * 0.32 };
  }

  function coverDraw(source, sw, sh) {
    const scale = Math.max(W / sw, H / sh);
    const dw = sw * scale;
    const dh = sh * scale;
    const dx = (W - dw) / 2;
    const dy = (H - dh) / 2;
    ctx.drawImage(source, dx, dy, dw, dh);
    return { scale, dx, dy, dw, dh };
  }

  function filterString() {
    const s = (state.beautyStrength / 100) * beautyBoost[state.beauty];
    const brightness = 1 + s * 0.12;
    const contrast = state.light === "cinema" ? 1.12 : state.light === "clean" ? 1.04 : 1.07;
    const saturate = 1 + s * 0.35 + (state.beauty === "glam" ? 0.08 : 0);
    return `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;
  }

  function applySkinSmooth(face) {
    if (!face || state.smooth <= 0) return;
    ensureOffscreen();
    const blurPx = 6 + (state.smooth / 70) * 18;
    const octx = off.blurCtx;
    octx.clearRect(0, 0, W, H);
    octx.filter = `blur(${blurPx}px)`;
    octx.drawImage(canvas, 0, 0);
    octx.filter = "none";

    // Soft elliptical mask over face — stable, no jittery landmarks
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(
      face.x + face.w / 2,
      face.y + face.h * 0.52,
      face.w * 0.48,
      face.h * 0.55,
      0,
      0,
      Math.PI * 2
    );
    ctx.clip();
    ctx.globalAlpha = 0.18 + (state.smooth / 70) * 0.42;
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(off.blur, 0, 0);
    ctx.restore();
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  function drawLight(face) {
    const modes = {
      soft: () => {
        const g = ctx.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, "rgba(255,220,200,0.22)");
        g.addColorStop(0.4, "rgba(255,220,200,0)");
        g.addColorStop(1, "rgba(20,10,30,0.25)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      },
      cinema: () => {
        const g = ctx.createLinearGradient(0, 0, W, H);
        g.addColorStop(0, "rgba(255,70,90,0.16)");
        g.addColorStop(0.5, "rgba(0,0,0,0)");
        g.addColorStop(1, "rgba(40,60,120,0.18)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
        // vignette
        const v = ctx.createRadialGradient(W / 2, H * 0.4, H * 0.15, W / 2, H * 0.45, H * 0.75);
        v.addColorStop(0, "rgba(0,0,0,0)");
        v.addColorStop(1, "rgba(0,0,0,0.45)");
        ctx.fillStyle = v;
        ctx.fillRect(0, 0, W, H);
      },
      night: () => {
        const g = ctx.createLinearGradient(0, H * 0.1, 0, H);
        g.addColorStop(0, "rgba(30,15,40,0.25)");
        g.addColorStop(0.5, "rgba(0,0,0,0)");
        g.addColorStop(1, "rgba(255,50,90,0.2)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
        if (face) {
          const spot = ctx.createRadialGradient(
            face.x + face.w / 2,
            face.y + face.h * 0.35,
            10,
            face.x + face.w / 2,
            face.y + face.h * 0.4,
            face.w * 0.9
          );
          spot.addColorStop(0, "rgba(255,200,180,0.2)");
          spot.addColorStop(1, "rgba(255,200,180,0)");
          ctx.fillStyle = spot;
          ctx.fillRect(0, 0, W, H);
        }
      },
      clean: () => {
        const g = ctx.createLinearGradient(0, 0, 0, H * 0.5);
        g.addColorStop(0, "rgba(255,255,255,0.18)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      },
    };
    ctx.save();
    ctx.globalCompositeOperation = "soft-light";
    (modes[state.light] || modes.soft)();
    ctx.restore();
  }

  function drawGlow(face) {
    const s = (state.beautyStrength / 100) * beautyBoost[state.beauty];
    if (s <= 0 || !face) return;
    const g = ctx.createRadialGradient(
      face.x + face.w / 2,
      face.y + face.h * 0.4,
      face.w * 0.1,
      face.x + face.w / 2,
      face.y + face.h * 0.45,
      face.w * 0.85
    );
    const a = s * (state.beauty === "glam" ? 0.55 : 0.4);
    g.addColorStop(0, `rgba(255,190,210,${a})`);
    g.addColorStop(1, "rgba(255,190,210,0)");
    ctx.save();
    ctx.globalCompositeOperation = "soft-light";
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  function wrapText(text, maxWidth, font) {
    ctx.font = font;
    const words = text.split(/\s+/);
    const lines = [];
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines.slice(0, 3);
  }

  function drawCaption() {
    const text = (state.captionText || "").trim();
    if (!text) return;
    const style = state.captionStyle;
    const maxW = W * 0.82;
    const baseY = H * 0.82;

    if (style === "bold") {
      const font = `800 64px Syne, system-ui, sans-serif`;
      const lines = wrapText(text, maxW, font);
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      lines.forEach((ln, i) => {
        const y = baseY + i * 74;
        ctx.lineWidth = 10;
        ctx.strokeStyle = "rgba(0,0,0,0.75)";
        ctx.strokeText(ln, W / 2, y);
        ctx.fillStyle = "#fff";
        ctx.fillText(ln, W / 2, y);
      });
    } else if (style === "soft") {
      const font = `600 56px Syne, system-ui, sans-serif`;
      const lines = wrapText(text, maxW, font);
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0,0,0,0.65)";
      ctx.shadowBlur = 24;
      ctx.fillStyle = "#f6f1ea";
      lines.forEach((ln, i) => ctx.fillText(ln, W / 2, baseY + i * 68));
      ctx.shadowBlur = 0;
    } else if (style === "pop") {
      const font = `800 52px Syne, system-ui, sans-serif`;
      const lines = wrapText(text, maxW * 0.9, font);
      ctx.font = font;
      const padX = 28;
      const padY = 18;
      const lineH = 60;
      const boxH = lines.length * lineH + padY * 2;
      let boxW = 0;
      lines.forEach((ln) => {
        boxW = Math.max(boxW, ctx.measureText(ln).width);
      });
      boxW += padX * 2;
      const bx = (W - boxW) / 2;
      const by = baseY - boxH / 2;
      ctx.fillStyle = "#d8ff4a";
      roundRect(ctx, bx, by, boxW, boxH, 18);
      ctx.fill();
      ctx.fillStyle = "#12140a";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      lines.forEach((ln, i) => ctx.fillText(ln, W / 2, by + padY + lineH * i + lineH / 2));
    } else {
      const font = `500 42px Figtree, system-ui, sans-serif`;
      const lines = wrapText(text.toUpperCase(), maxW, font);
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "0.06em";
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 14;
      lines.forEach((ln, i) => ctx.fillText(ln, W / 2, baseY + i * 52));
      ctx.shadowBlur = 0;
    }
  }

  function roundRect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }

  function drawFaceRing(face) {
    if (!face) return;
    ctx.save();
    ctx.strokeStyle = "rgba(216,255,74,0.7)";
    ctx.lineWidth = 4;
    ctx.shadowColor = "rgba(216,255,74,0.35)";
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.ellipse(
      face.x + face.w / 2,
      face.y + face.h * 0.52,
      face.w * 0.52,
      face.h * 0.58,
      0,
      0,
      Math.PI * 2
    );
    ctx.stroke();
    ctx.restore();
  }

  function drawOverlays(face) {
    applySkinSmooth(face);
    drawGlow(face);
    drawLight(face);
    drawFaceRing(face);
    drawCaption();
  }

  function lerpFace(next) {
    if (!next) return smoothFace || defaultFaceBox();
    if (!smoothFace) {
      smoothFace = { ...next };
      return smoothFace;
    }
    // Heavy smoothing = no flying ring
    const a = 0.18;
    smoothFace = {
      x: smoothFace.x + (next.x - smoothFace.x) * a,
      y: smoothFace.y + (next.y - smoothFace.y) * a,
      w: smoothFace.w + (next.w - smoothFace.w) * a,
      h: smoothFace.h + (next.h - smoothFace.h) * a,
    };
    return smoothFace;
  }

  async function detectFace() {
    const now = performance.now();
    if (!faceDetector || now - lastDetect < 120) return smoothFace || defaultFaceBox();
    lastDetect = now;
    try {
      const faces = await faceDetector.detect(canvas);
      if (faces?.[0]) {
        const b = faces[0].boundingBox;
        return lerpFace({
          x: b.x,
          y: b.y,
          w: b.width,
          h: b.height,
        });
      }
    } catch {
      /* ignore */
    }
    return lerpFace(defaultFaceBox());
  }

  async function renderFrame() {
    if (!state.hasMedia) {
      drawPlaceholder();
      return;
    }

    ctx.filter = filterString();
    if (state.mediaKind === "video" && videoEl.readyState >= 2) {
      coverDraw(videoEl, videoEl.videoWidth, videoEl.videoHeight);
    } else if (state.mediaKind === "image" && imageEl?.complete) {
      coverDraw(imageEl, imageEl.naturalWidth, imageEl.naturalHeight);
    }
    ctx.filter = "none";

    const face = await detectFace();
    state.face = face;
    drawOverlays(face);
  }

  function loop() {
    raf = requestAnimationFrame(loop);
    if (state.mediaKind === "video" && !videoEl.paused && !videoEl.ended) {
      renderFrame();
    }
  }

  function requestRender() {
    return renderFrame();
  }

  function stopLoop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  function startLoop() {
    stopLoop();
    loop();
  }

  async function loadFile(file) {
    revoke();
    const url = URL.createObjectURL(file);
    state._url = url;
    smoothFace = null;

    if (file.type.startsWith("video/")) {
      state.mediaKind = "video";
      state.hasMedia = true;
      videoEl.src = url;
      await new Promise((resolve, reject) => {
        videoEl.onloadeddata = resolve;
        videoEl.onerror = reject;
      });
      videoEl.pause();
      videoEl.currentTime = Math.min(1, (videoEl.duration || 1) * 0.15);
      await waitSeek();
      await renderFrame();
      return { kind: "video", duration: videoEl.duration || 0, url };
    }

    state.mediaKind = "image";
    state.hasMedia = true;
    imageEl = new Image();
    imageEl.src = url;
    await imageEl.decode();
    await renderFrame();
    return { kind: "image", duration: 0, url };
  }

  function waitSeek() {
    return new Promise((resolve) => {
      if (videoEl.seeking) {
        videoEl.onseeked = () => resolve();
      } else {
        // slight delay for decoder
        requestAnimationFrame(() => resolve());
      }
    });
  }

  async function seek(t) {
    if (state.mediaKind !== "video") return;
    videoEl.currentTime = t;
    await new Promise((r) => {
      videoEl.onseeked = () => r();
    });
    await renderFrame();
  }

  function play() {
    if (state.mediaKind !== "video") return;
    videoEl.muted = true;
    videoEl.play();
    startLoop();
  }

  function pause() {
    if (state.mediaKind !== "video") return;
    videoEl.pause();
    stopLoop();
    renderFrame();
  }

  function isPlaying() {
    return state.mediaKind === "video" && !videoEl.paused;
  }

  function getVideo() {
    return videoEl;
  }

  function revoke() {
    stopLoop();
    if (state._url) URL.revokeObjectURL(state._url);
    state._url = null;
    imageEl = null;
    if (videoEl) {
      videoEl.removeAttribute("src");
      videoEl.load();
    }
  }

  function exportPng() {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png");
    });
  }

  /** Lightweight Czech cleanup for captions */
  function polishCzech(input) {
    let t = (input || "").trim();
    const map = [
      [/necekala/gi, "nečekala"],
      [/necekal/gi, "nečekal"],
      [/muzu/gi, "můžu"],
      [/muzes/gi, "můžeš"],
      [/prislo/gi, "přišlo"],
      [/prisel/gi, "přišel"],
      [/dekuju/gi, "děkuju"],
      [/dekuji/gi, "děkuji"],
      [/prosim/gi, "prosím"],
      [/jasne/gi, "jasně"],
      [/skvele/gi, "skvěle"],
      [/uz /gi, "už "],
      [/ neni /gi, " není "],
      [/ jeste /gi, " ještě "],
      [/ ted /gi, " teď "],
      [/vic /gi, "víc "],
      [/pritom/gi, "přitom"],
      [/opravdu/gi, "opravdu"],
      [/ \.\.\./g, "…"],
      [/\.\.\./g, "…"],
    ];
    for (const [re, to] of map) t = t.replace(re, to);
    // capitalize first letter
    if (t) t = t.charAt(0).toLocaleLowerCase("cs-CZ") + t.slice(1);
    return t;
  }

  function buildClipsFromDuration(duration) {
    if (!duration || duration < 3) {
      return [
        { t: 0, title: "Hlavní moment", caption: "tohle je ten moment", score: 90 },
      ];
    }
    const points = [
      { r: 0.12, title: "Háček — otevření", caption: "tohle jsem nečekala…", score: 92 },
      { r: 0.45, title: "Punchline", caption: "a přesně tohle mě změnilo", score: 88 },
      { r: 0.78, title: "Emocionální moment", caption: "když ti dojde, že to jde", score: 85 },
    ];
    return points
      .map((p) => ({
        t: Math.min(duration - 0.3, Math.max(0, duration * p.r)),
        title: p.title,
        caption: p.caption,
        score: p.score,
      }))
      .filter((p) => p.t >= 0);
  }

  function formatTime(sec) {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${String(r).padStart(2, "0")}`;
  }

  return {
    init,
    setOptions,
    getState,
    loadFile,
    seek,
    play,
    pause,
    isPlaying,
    getVideo,
    exportPng,
    polishCzech,
    buildClipsFromDuration,
    formatTime,
    requestRender,
    W,
    H,
  };
})();

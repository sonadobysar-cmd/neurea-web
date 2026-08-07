/**
 * Líc render engine — 9:16 cover, beauty beauty, light, captions, face lock, clip export.
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
    hookText: "POČKEJ…",
    watermark: true,
    compare: false,
    showRing: true,
    face: null,
    hasMedia: false,
    mediaKind: null,
  };

  let canvas;
  let ctx;
  let videoEl;
  let imageEl = null;
  let raf = 0;
  let faceDetector = null;
  let lastDetect = 0;
  let smoothFace = null;
  let exporting = false;
  const off = { blur: null, blurCtx: null, raw: null, rawCtx: null };

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
    if (!off.raw) {
      off.raw = document.createElement("canvas");
      off.raw.width = W;
      off.raw.height = H;
      off.rawCtx = off.raw.getContext("2d", { willReadFrequently: true });
    }
  }

  function setOptions(partial) {
    Object.assign(state, partial);
    if (state.hasMedia) requestRender();
    else drawPlaceholder();
  }

  function getState() {
    return { ...state, face: smoothFace, exporting };
  }

  function drawPlaceholder() {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#2a1822");
    g.addColorStop(0.45, "#151822");
    g.addColorStop(1, "#07080c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
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

  function coverDraw(targetCtx, source, sw, sh) {
    const scale = Math.max(W / sw, H / sh);
    const dw = sw * scale;
    const dh = sh * scale;
    const dx = (W - dw) / 2;
    const dy = (H - dh) / 2;
    targetCtx.drawImage(source, dx, dy, dw, dh);
  }

  function filterString() {
    if (state.compare) return "none";
    const s = (state.beautyStrength / 100) * beautyBoost[state.beauty];
    const brightness = 1 + s * 0.12;
    const contrast = state.light === "cinema" ? 1.12 : state.light === "clean" ? 1.04 : 1.07;
    const saturate = 1 + s * 0.35 + (state.beauty === "glam" ? 0.08 : 0);
    return `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;
  }

  function applySkinSmooth(face) {
    if (state.compare || !face || state.smooth <= 0) return;
    ensureOffscreen();
    const blurPx = 6 + (state.smooth / 70) * 18;
    const octx = off.blurCtx;
    octx.clearRect(0, 0, W, H);
    octx.filter = `blur(${blurPx}px)`;
    octx.drawImage(canvas, 0, 0);
    octx.filter = "none";
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
    ctx.drawImage(off.blur, 0, 0);
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function drawLight(face) {
    if (state.compare) return;
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
        g.addColorStop(1, "rgba(30,40,70,0.2)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
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
    if (state.compare) return;
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
      } else line = test;
    }
    if (line) lines.push(line);
    return lines.slice(0, 3);
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

  function drawHook() {
    if (state.compare) return;
    const text = (state.hookText || "").trim();
    if (!text) return;
    const font = `800 48px Syne, system-ui, sans-serif`;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const y = H * 0.12;
    ctx.lineWidth = 8;
    ctx.strokeStyle = "rgba(0,0,0,0.7)";
    ctx.strokeText(text.toUpperCase(), W / 2, y);
    ctx.fillStyle = "#d8ff4a";
    ctx.fillText(text.toUpperCase(), W / 2, y);
  }

  function drawCaption() {
    if (state.compare) return;
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
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 14;
      lines.forEach((ln, i) => ctx.fillText(ln, W / 2, baseY + i * 52));
      ctx.shadowBlur = 0;
    }
  }

  function drawWatermark() {
    if (!state.watermark || state.compare) return;
    ctx.save();
    ctx.font = `700 28px Syne, system-ui, sans-serif`;
    ctx.fillStyle = "rgba(246,241,234,0.45)";
    ctx.textAlign = "right";
    ctx.fillText("Líc", W - 48, H - 48);
    ctx.restore();
  }

  function drawFaceRing(face) {
    if (!state.showRing || exporting || !face) return;
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
    drawHook();
    drawCaption();
    drawWatermark();
    drawFaceRing(face);
  }

  function lerpFace(next) {
    if (!next) return smoothFace || defaultFaceBox();
    if (!smoothFace) {
      smoothFace = { ...next };
      return smoothFace;
    }
    const a = 0.16;
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
    if (!faceDetector || now - lastDetect < 100) return smoothFace || defaultFaceBox();
    lastDetect = now;
    try {
      const faces = await faceDetector.detect(canvas);
      if (faces?.[0]) {
        const b = faces[0].boundingBox;
        return lerpFace({ x: b.x, y: b.y, w: b.width, h: b.height });
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
      coverDraw(ctx, videoEl, videoEl.videoWidth, videoEl.videoHeight);
    } else if (state.mediaKind === "image" && imageEl?.complete) {
      coverDraw(ctx, imageEl, imageEl.naturalWidth, imageEl.naturalHeight);
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

  function waitSeek() {
    return new Promise((resolve) => {
      if (!videoEl.seeking) {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
        return;
      }
      const done = () => {
        videoEl.removeEventListener("seeked", done);
        resolve();
      };
      videoEl.addEventListener("seeked", done);
    });
  }

  function makeDemoPortraitDataUrl() {
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const x = c.getContext("2d");
    const bg = x.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#3a2230");
    bg.addColorStop(0.45, "#151822");
    bg.addColorStop(1, "#07080c");
    x.fillStyle = bg;
    x.fillRect(0, 0, W, H);

    const cx = W / 2;
    const cy = H * 0.4;
    const skin = x.createRadialGradient(cx - 50, cy - 90, 20, cx, cy, 300);
    skin.addColorStop(0, "#f3d2c4");
    skin.addColorStop(0.45, "#d49586");
    skin.addColorStop(1, "#8a4a55");
    x.fillStyle = skin;
    x.beginPath();
    x.ellipse(cx, cy, 250, 330, 0, 0, Math.PI * 2);
    x.fill();

    // blush
    x.fillStyle = "rgba(255,138,166,0.35)";
    x.beginPath();
    x.ellipse(cx - 110, cy + 30, 70, 40, 0, 0, Math.PI * 2);
    x.ellipse(cx + 110, cy + 30, 70, 40, 0, 0, Math.PI * 2);
    x.fill();

    // eyes
    x.fillStyle = "#2a1a20";
    x.beginPath();
    x.ellipse(cx - 85, cy - 40, 22, 14, 0, 0, Math.PI * 2);
    x.ellipse(cx + 85, cy - 40, 22, 14, 0, 0, Math.PI * 2);
    x.fill();

    // mouth
    x.strokeStyle = "#6a3040";
    x.lineWidth = 10;
    x.lineCap = "round";
    x.beginPath();
    x.moveTo(cx - 60, cy + 100);
    x.quadraticCurveTo(cx, cy + 150, cx + 60, cy + 100);
    x.stroke();

    // shoulders
    x.fillStyle = "#1a1220";
    x.beginPath();
    x.ellipse(cx, H * 0.72, 340, 220, 0, 0, Math.PI * 2);
    x.fill();

    x.fillStyle = "rgba(246,241,234,0.35)";
    x.font = "600 42px Syne, Georgia, serif";
    x.textAlign = "center";
    x.fillText("Líc demo", cx, H * 0.88);
    return c.toDataURL("image/png");
  }

  async function loadImageUrl(url, { revokeOnReplace = false } = {}) {
    revoke();
    state._url = revokeOnReplace ? url : null;
    state._externalUrl = url;
    smoothFace = null;
    state.mediaKind = "image";
    state.hasMedia = true;
    imageEl = new Image();
    imageEl.crossOrigin = "anonymous";
    await new Promise((resolve, reject) => {
      imageEl.onload = () => resolve();
      imageEl.onerror = () => reject(new Error("Image load failed"));
      imageEl.src = url;
    });
    await renderFrame();
    return { kind: "image", duration: 0, url };
  }

  async function loadDemoPortrait() {
    return loadImageUrl(makeDemoPortraitDataUrl());
  }

  async function loadCamera() {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("Kamera není dostupná");
    }
    revoke();
    smoothFace = null;
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 1080 }, height: { ideal: 1920 } },
      audio: false,
    });
    state._stream = stream;
    state.mediaKind = "video";
    state.hasMedia = true;
    videoEl.srcObject = stream;
    videoEl.muted = true;
    await videoEl.play();
    startLoop();
    await renderFrame();
    return { kind: "camera", duration: Infinity };
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
      videoEl.currentTime = Math.min(1, (videoEl.duration || 1) * 0.12);
      await waitSeek();
      await renderFrame();
      return { kind: "video", duration: videoEl.duration || 0, url };
    }

    return loadImageUrl(url, { revokeOnReplace: true });
  }

  async function seek(t) {
    if (state.mediaKind !== "video") return;
    const target = Math.max(0, Math.min(t, (videoEl.duration || 0) - 0.05));
    if (Math.abs(videoEl.currentTime - target) < 0.02) {
      await renderFrame();
      return;
    }
    videoEl.currentTime = target;
    await waitSeek();
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
    if (state._stream) {
      state._stream.getTracks().forEach((t) => t.stop());
      state._stream = null;
    }
    if (state._url) URL.revokeObjectURL(state._url);
    state._url = null;
    imageEl = null;
    if (videoEl) {
      videoEl.srcObject = null;
      videoEl.removeAttribute("src");
      videoEl.load();
    }
  }

  function exportPng() {
    const prevRing = state.showRing;
    state.showRing = false;
    return requestRender().then(
      () =>
        new Promise((resolve) => {
          canvas.toBlob((blob) => {
            state.showRing = prevRing;
            requestRender();
            resolve(blob);
          }, "image/png");
        })
    );
  }

  function pickMime() {
    const types = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm", "video/mp4"];
    for (const t of types) {
      if (window.MediaRecorder && MediaRecorder.isTypeSupported(t)) return t;
    }
    return "video/webm";
  }

  /**
   * Export short clip as WebM/MP4 from canvas stream.
   */
  async function exportClip({ start = 0, duration = 6, onProgress } = {}) {
    if (state.mediaKind !== "video") {
      const png = await exportPng();
      return { blob: png, ext: "png" };
    }
    if (!window.MediaRecorder) throw new Error("MediaRecorder není dostupný");

    exporting = true;
    state.showRing = false;
    pause();
    await seek(start);

    const mime = pickMime();
    const stream = canvas.captureStream(30);
    const chunks = [];
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 8_000_000 });
    rec.ondataavailable = (e) => {
      if (e.data?.size) chunks.push(e.data);
    };

    const ended = new Promise((resolve) => {
      rec.onstop = () => resolve();
    });

    rec.start(100);
    videoEl.muted = true;
    videoEl.currentTime = start;
    await waitSeek();
    await videoEl.play();
    startLoop();

    const t0 = performance.now();
    await new Promise((resolve) => {
      const tick = () => {
        const elapsed = (performance.now() - t0) / 1000;
        const p = Math.min(1, elapsed / duration);
        onProgress?.(p);
        if (elapsed >= duration || videoEl.ended || videoEl.currentTime >= start + duration) {
          resolve();
          return;
        }
        requestAnimationFrame(tick);
      };
      tick();
    });

    videoEl.pause();
    stopLoop();
    await requestRender();
    rec.stop();
    await ended;
    stream.getTracks().forEach((t) => t.stop());

    exporting = false;
    state.showRing = true;
    await requestRender();

    const blob = new Blob(chunks, { type: mime });
    const ext = mime.includes("mp4") ? "mp4" : "webm";
    return { blob, ext };
  }

  function frameScore(imageData) {
    const d = imageData.data;
    let sum = 0;
    let sumSq = 0;
    let n = 0;
    // sample every 16th pixel
    for (let i = 0; i < d.length; i += 64) {
      const v = (d[i] + d[i + 1] + d[i + 2]) / 3;
      sum += v;
      sumSq += v * v;
      n++;
    }
    const mean = sum / n;
    const variance = sumSq / n - mean * mean;
    // prefer mid brightness + some contrast (faces/talking tend to score)
    const bright = 1 - Math.abs(mean - 118) / 118;
    return variance * 0.04 + bright * 40;
  }

  async function scanHooks(count = 3) {
    if (state.mediaKind !== "video") return buildClipsFromDuration(0);
    const duration = videoEl.duration || 0;
    if (duration < 2) return buildClipsFromDuration(duration);

    ensureOffscreen();
    const samples = Math.min(24, Math.max(8, Math.floor(duration)));
    const scored = [];
    const prevCompare = state.compare;
    const prevRing = state.showRing;
    state.compare = true;
    state.showRing = false;

    for (let i = 0; i < samples; i++) {
      const t = (duration * (i + 0.5)) / samples;
      videoEl.currentTime = t;
      await waitSeek();
      off.rawCtx.filter = "none";
      coverDraw(off.rawCtx, videoEl, videoEl.videoWidth, videoEl.videoHeight);
      const data = off.rawCtx.getImageData(0, 0, W, H);
      let score = frameScore(data);
      if (faceDetector) {
        try {
          const faces = await faceDetector.detect(off.raw);
          if (faces?.[0]) score += 55 + faces[0].boundingBox.width * 0.02;
        } catch {
          /* ignore */
        }
      }
      scored.push({ t, score });
    }

    state.compare = prevCompare;
    state.showRing = prevRing;

    scored.sort((a, b) => b.score - a.score);
    // diversify timestamps (min 2.5s apart)
    const picked = [];
    for (const s of scored) {
      if (picked.every((p) => Math.abs(p.t - s.t) > 2.5)) picked.push(s);
      if (picked.length >= count) break;
    }
    picked.sort((a, b) => a.t - b.t);

    const titles = ["Háček — silný start", "Punchline", "Emocionální beat", "Closer"];
    const captions = [
      "tohle jsem nečekala…",
      "a přesně tohle mě změnilo",
      "když ti dojde, že to jde",
      "ulož si tohle",
    ];

    const clips = picked.map((p, i) => ({
      t: p.t,
      title: titles[i] || `Moment ${i + 1}`,
      caption: captions[i] || "tenhle moment",
      score: Math.min(99, Math.round(70 + p.score / 8)),
    }));

    await seek(clips[0]?.t || 0);
    return clips.length ? clips : buildClipsFromDuration(duration);
  }

  function polishCzech(input) {
    let t = ` ${input || ""} `.trim();
    t = ` ${t} `;
    const map = [
      [/necekala/gi, "nečekala"],
      [/necekal/gi, "nečekal"],
      [/necekalas/gi, "nečekalaš"],
      [/muzu/gi, "můžu"],
      [/muzes/gi, "můžeš"],
      [/muze/gi, "může"],
      [/prislo/gi, "přišlo"],
      [/prisel/gi, "přišel"],
      [/prisla/gi, "přišla"],
      [/dekuju/gi, "děkuju"],
      [/dekuji/gi, "děkuji"],
      [/prosim/gi, "prosím"],
      [/jasne/gi, "jasně"],
      [/skvele/gi, "skvěle"],
      [/skvely/gi, "skvělý"],
      [/uz /gi, "už "],
      [/ neni /gi, " není "],
      [/ jeste /gi, " ještě "],
      [/ ted /gi, " teď "],
      [/vic /gi, "víc "],
      [/pritom/gi, "přitom"],
      [/ protoze /gi, " protože "],
      [/ taky /gi, " taky "],
      [/ kdyz /gi, " když "],
      [/ jestli /gi, " jestli "],
      [/ \.\.\./g, "…"],
      [/\.\.\./g, "…"],
    ];
    for (const [re, to] of map) t = t.replace(re, to);
    t = t.trim();
    if (t) t = t.charAt(0).toLocaleLowerCase("cs-CZ") + t.slice(1);
    return t;
  }

  function buildClipsFromDuration(duration) {
    if (!duration || duration < 3) {
      return [{ t: 0, title: "Hlavní moment", caption: "tohle je ten moment", score: 90 }];
    }
    const points = [
      { r: 0.12, title: "Háček — otevření", caption: "tohle jsem nečekala…", score: 92 },
      { r: 0.45, title: "Punchline", caption: "a přesně tohle mě změnilo", score: 88 },
      { r: 0.78, title: "Emocionální moment", caption: "když ti dojde, že to jde", score: 85 },
    ];
    return points.map((p) => ({
      t: Math.min(duration - 0.3, Math.max(0, duration * p.r)),
      title: p.title,
      caption: p.caption,
      score: p.score,
    }));
  }

  function formatTime(sec) {
    const s = Math.max(0, Math.floor(sec || 0));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${String(r).padStart(2, "0")}`;
  }

  return {
    init,
    setOptions,
    getState,
    loadFile,
    loadImageUrl,
    loadDemoPortrait,
    loadCamera,
    seek,
    play,
    pause,
    isPlaying,
    getVideo,
    exportPng,
    exportClip,
    scanHooks,
    polishCzech,
    buildClipsFromDuration,
    formatTime,
    requestRender,
    W,
    H,
  };
})();

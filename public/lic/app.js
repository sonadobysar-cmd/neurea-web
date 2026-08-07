(() => {
  const Engine = window.LicEngine;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const landing = $("#view-landing");
  const studio = $("#view-studio");
  const toast = $("#toast");
  const captionInput = $("#caption-input");
  const hookInput = $("#hook-input");
  const beautyVal = $("#beauty-val");
  const smoothVal = $("#smooth-val");
  const beautyStrength = $("#beauty-strength");
  const smoothStrength = $("#smooth-strength");
  const stageHint = $("#stage-hint");
  const lockText = $("#lock-text");
  const viralScore = $("#viral-score");
  const uploadZone = $("#upload-zone");
  const fileInput = $("#file-input");
  const uploadTitle = $("#upload-title");
  const uploadMeta = $("#upload-meta");
  const mediaTools = $("#media-tools");
  const seek = $("#seek");
  const seekVal = $("#seek-val");
  const clipLen = $("#clip-len");
  const clipLenVal = $("#clip-len-val");
  const clipList = $("#clip-list");
  const emptyStage = $("#empty-stage");
  const btnPlay = $("#btn-toggle-play");
  const btnCompare = $("#btn-compare");
  const compareTag = $("#compare-tag");
  const czNote = $("#cz-note");
  const chkWatermark = $("#chk-watermark");
  const exportProgress = $("#export-progress");
  const exportBarFill = $("#export-bar-fill");
  const exportProgressText = $("#export-progress-text");

  let clips = [];
  let activeClip = 0;
  let compareOn = false;
  let recognizing = false;
  let recognition = null;

  Engine.init({
    canvas: $("#stage-canvas"),
    video: $("#source-video"),
  });

  function showToast(msg) {
    toast.hidden = false;
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("is-on"), 2400);
  }

  function downloadBlob(blob, name) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function go(view) {
    if (view === "studio") {
      landing.classList.remove("is-active");
      studio.classList.add("is-active");
      history.replaceState(null, "", "#studio");
      Engine.requestRender();
    } else {
      Engine.pause();
      studio.classList.remove("is-active");
      landing.classList.add("is-active");
      history.replaceState(null, "", "#");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setStep(n) {
    $$(".step").forEach((el) => el.classList.toggle("is-active", Number(el.dataset.step) === n));
  }

  function syncEngine() {
    Engine.setOptions({
      beauty: $("#beauty-presets .preset.is-active")?.dataset.beauty || "glow",
      beautyStrength: Number(beautyStrength.value),
      smooth: Number(smoothStrength.value),
      light: $("#light-presets .chip.is-active")?.dataset.light || "soft",
      captionStyle: $("#caption-styles .chip.is-active")?.dataset.caption || "bold",
      captionText: captionInput.value,
      hookText: hookInput.value,
      watermark: !!chkWatermark.checked,
      compare: compareOn,
    });
    beautyVal.textContent = `${beautyStrength.value}%`;
    smoothVal.textContent = `${smoothStrength.value}%`;
    clipLenVal.textContent = `${clipLen.value}s`;
    updateHint();
    compareTag.hidden = !compareOn;
    compareTag.textContent = compareOn ? "PŘED" : "";
    btnCompare.classList.toggle("is-on", compareOn);

    const st = Engine.getState();
    if (st.hasMedia) {
      lockText.textContent = compareOn ? "Raw · bez beauty" : "Face lock stabilní";
      emptyStage.hidden = true;
    } else {
      lockText.textContent = "Čekám na media";
      emptyStage.hidden = false;
    }
  }

  function updateHint() {
    const b = $("#beauty-presets .preset.is-active")?.dataset.beauty || "glow";
    const l = $("#light-presets .chip.is-active")?.dataset.light || "soft";
    const c = $("#caption-styles .chip.is-active")?.dataset.caption || "bold";
    const cap = (s) => s[0].toUpperCase() + s.slice(1);
    stageHint.textContent = compareOn
      ? "Před · raw frame"
      : `${cap(b)} · ${cap(l)} light · Caption ${cap(c)}`;
  }

  function renderClips() {
    clipList.innerHTML = "";
    if (!clips.length) {
      clipList.innerHTML = `<p class="note" style="margin:0.75rem 0 0">Nahraj video a klikni Najít háčky.</p>`;
      return;
    }
    clips.forEach((clip, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `clip${i === activeClip ? " is-active" : ""}`;
      btn.innerHTML = `
        <span class="clip-time">${Engine.formatTime(clip.t)}</span>
        <span class="clip-title">${clip.title}</span>
        <span class="clip-score">${clip.score}</span>
      `;
      btn.addEventListener("click", async () => {
        activeClip = i;
        renderClips();
        captionInput.value = clip.caption;
        viralScore.textContent = `Score ${clip.score}`;
        syncEngine();
        if (Engine.getState().mediaKind === "video") {
          Engine.pause();
          btnPlay.hidden = false;
          btnPlay.textContent = "Přehrát";
          await Engine.seek(clip.t);
          seek.value = String(clip.t);
          seekVal.textContent = Engine.formatTime(clip.t);
        }
        setStep(1);
      });
      clipList.appendChild(btn);
    });
  }

  async function handleFile(file) {
    if (!file) return;
    setStep(1);
    compareOn = false;
    showToast(`Načítám ${file.name.slice(0, 26)}…`);
    try {
      const info = await Engine.loadFile(file);
      emptyStage.hidden = true;
      uploadTitle.textContent = file.name.length > 28 ? `${file.name.slice(0, 28)}…` : file.name;

      if (info.kind === "video") {
        mediaTools.hidden = false;
        btnPlay.hidden = false;
        btnPlay.textContent = "Přehrát";
        seek.max = String(info.duration || 1);
        seek.value = String(Engine.getVideo().currentTime || 0);
        seekVal.textContent = Engine.formatTime(Number(seek.value));
        uploadMeta.textContent = `Video · ${Engine.formatTime(info.duration)}`;
        showToast("Skenuju háčky…");
        clips = await Engine.scanHooks(3);
        activeClip = 0;
        captionInput.value = clips[0]?.caption || captionInput.value;
        viralScore.textContent = `Score ${clips[0]?.score || "—"}`;
        seek.value = String(clips[0]?.t || 0);
        seekVal.textContent = Engine.formatTime(Number(seek.value));
        renderClips();
        showToast(`Hotovo · ${clips.length} háčky`);
      } else {
        mediaTools.hidden = true;
        btnPlay.hidden = true;
        uploadMeta.textContent = "Fotka · 9:16 crop";
        clips = [
          { t: 0, title: "Portrait short", caption: "main character energy", score: 94 },
          { t: 0, title: "Soft glow look", caption: "tohle je ten look", score: 90 },
          { t: 0, title: "Story ready", caption: "ulož si tohle", score: 87 },
        ];
        activeClip = 0;
        captionInput.value = clips[0].caption;
        viralScore.textContent = `Score ${clips[0].score}`;
        renderClips();
        showToast("Fotka ready");
      }
      syncEngine();
    } catch (err) {
      console.error(err);
      showToast("Nepodařilo se načíst soubor");
    }
  }

  $$("[data-go]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      go(el.dataset.go);
    });
  });
  $("#btn-demo-scroll")?.addEventListener("click", () => $("#jak")?.scrollIntoView({ behavior: "smooth" }));
  $$(".step").forEach((el) => el.addEventListener("click", () => setStep(Number(el.dataset.step))));

  uploadZone.addEventListener("click", () => fileInput.click());
  uploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadZone.classList.add("is-drag");
  });
  uploadZone.addEventListener("dragleave", () => uploadZone.classList.remove("is-drag"));
  uploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadZone.classList.remove("is-drag");
    if (e.dataTransfer?.files?.[0]) handleFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener("change", () => {
    if (fileInput.files?.[0]) handleFile(fileInput.files[0]);
  });

  seek?.addEventListener("input", async () => {
    const t = Number(seek.value);
    seekVal.textContent = Engine.formatTime(t);
    Engine.pause();
    btnPlay.textContent = "Přehrát";
    await Engine.seek(t);
    syncEngine();
  });

  clipLen?.addEventListener("input", () => {
    clipLenVal.textContent = `${clipLen.value}s`;
  });

  btnPlay?.addEventListener("click", () => {
    if (Engine.isPlaying()) {
      Engine.pause();
      btnPlay.textContent = "Přehrát";
    } else {
      Engine.play();
      btnPlay.textContent = "Pauza";
      const v = Engine.getVideo();
      v.ontimeupdate = () => {
        seek.value = String(v.currentTime);
        seekVal.textContent = Engine.formatTime(v.currentTime);
      };
      v.onended = () => {
        btnPlay.textContent = "Přehrát";
      };
    }
  });

  btnCompare?.addEventListener("click", () => {
    compareOn = !compareOn;
    syncEngine();
    showToast(compareOn ? "Před · raw" : "Po · Líc beauty");
  });

  $("#btn-scan-hooks")?.addEventListener("click", async () => {
    if (Engine.getState().mediaKind !== "video") {
      showToast("Háčky jen u videa");
      return;
    }
    showToast("Skenuju háčky…");
    clips = await Engine.scanHooks(3);
    activeClip = 0;
    captionInput.value = clips[0]?.caption || captionInput.value;
    viralScore.textContent = `Score ${clips[0]?.score || "—"}`;
    seek.value = String(clips[0]?.t || 0);
    seekVal.textContent = Engine.formatTime(Number(seek.value));
    renderClips();
    syncEngine();
    showToast(`${clips.length} háčky ready`);
  });

  $$("#beauty-presets .preset").forEach((el) => {
    el.addEventListener("click", () => {
      $$("#beauty-presets .preset").forEach((p) => p.classList.toggle("is-active", p === el));
      const b = el.dataset.beauty;
      if (b === "natural") beautyStrength.value = "12";
      if (b === "glow") beautyStrength.value = "18";
      if (b === "glam") beautyStrength.value = "28";
      compareOn = false;
      setStep(2);
      syncEngine();
    });
  });
  beautyStrength.addEventListener("input", syncEngine);
  smoothStrength.addEventListener("input", syncEngine);

  $$("#light-presets .chip").forEach((el) => {
    el.addEventListener("click", () => {
      $$("#light-presets .chip").forEach((c) => c.classList.toggle("is-active", c === el));
      syncEngine();
    });
  });
  chkWatermark?.addEventListener("change", syncEngine);

  $$("#caption-styles .chip").forEach((el) => {
    el.addEventListener("click", () => {
      $$("#caption-styles .chip").forEach((c) => c.classList.toggle("is-active", c === el));
      setStep(3);
      syncEngine();
    });
  });
  captionInput.addEventListener("input", syncEngine);
  hookInput.addEventListener("input", syncEngine);

  $("#btn-fix-cz")?.addEventListener("click", () => {
    const before = captionInput.value;
    const after = Engine.polishCzech(before);
    captionInput.value = after;
    hookInput.value = Engine.polishCzech(hookInput.value).toLocaleUpperCase("cs-CZ");
    syncEngine();
    czNote.textContent = before !== after ? "✓ Opraveno" : "✓ Už je OK";
    showToast(before !== after ? "Čeština opravená" : "Není co opravovat");
  });

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  $("#btn-mic")?.addEventListener("click", () => {
    if (!SpeechRecognition) {
      showToast("Dictation v tomhle prohlížeči nejde");
      return;
    }
    if (recognizing && recognition) {
      recognition.stop();
      return;
    }
    recognition = new SpeechRecognition();
    recognition.lang = "cs-CZ";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognizing = true;
    $("#btn-mic").textContent = "⏹ Stop";
    showToast("Mluv · cs-CZ");
    recognition.onresult = (e) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
      captionInput.value = Engine.polishCzech(text);
      syncEngine();
    };
    recognition.onerror = () => {
      recognizing = false;
      $("#btn-mic").textContent = "🎤 Dictation";
      showToast("Dictation error");
    };
    recognition.onend = () => {
      recognizing = false;
      $("#btn-mic").textContent = "🎤 Dictation";
    };
    recognition.start();
  });

  $("#btn-export-png")?.addEventListener("click", async () => {
    setStep(4);
    if (!Engine.getState().hasMedia) return showToast("Nejdřív nahraj media");
    Engine.pause();
    btnPlay.textContent = "Přehrát";
    compareOn = false;
    syncEngine();
    const blob = await Engine.exportPng();
    if (!blob) return showToast("Export selhal");
    downloadBlob(blob, `lic-short-${Date.now()}.png`);
    showToast("PNG · 1080×1920");
  });

  $("#btn-export-video")?.addEventListener("click", async () => {
    setStep(4);
    if (!Engine.getState().hasMedia) return showToast("Nejdřív nahraj media");
    if (Engine.getState().mediaKind !== "video") {
      showToast("U fotky stáhni PNG");
      return;
    }
    Engine.pause();
    btnPlay.textContent = "Přehrát";
    compareOn = false;
    syncEngine();

    const start = clips[activeClip]?.t ?? (Number(seek.value) || 0);
    const duration = Number(clipLen.value) || 6;
    exportProgress.hidden = false;
    exportBarFill.style.width = "0%";
    exportProgressText.textContent = "Exportuji short…";
    showToast(`Export ${duration}s…`);

    try {
      const { blob, ext } = await Engine.exportClip({
        start,
        duration,
        onProgress: (p) => {
          exportBarFill.style.width = `${Math.round(p * 100)}%`;
          exportProgressText.textContent = `Exportuji… ${Math.round(p * 100)}%`;
        },
      });
      downloadBlob(blob, `lic-short-${Date.now()}.${ext}`);
      showToast(`Video short · ${ext.toUpperCase()}`);
    } catch (err) {
      console.error(err);
      showToast("Video export selhal");
    } finally {
      exportProgress.hidden = true;
      syncEngine();
    }
  });

  let heroTick = 0;
  setInterval(() => {
    if (!landing.classList.contains("is-active")) return;
    heroTick = (heroTick + 1) % 3;
    document.documentElement.style.setProperty("--beauty", String([0.12, 0.22, 0.3][heroTick]));
  }, 3200);

  async function loadDemo() {
    try {
      await Engine.loadDemoPortrait();
      emptyStage.hidden = true;
      uploadTitle.textContent = "demo portrait";
      uploadMeta.textContent = "Demo · 9:16 · nahraj svoje";
      mediaTools.hidden = true;
      btnPlay.hidden = true;
      clips = [
        { t: 0, title: "Portrait short", caption: "main character energy", score: 94 },
        { t: 0, title: "Soft glow look", caption: "tohle je ten look", score: 90 },
        { t: 0, title: "Story ready", caption: "ulož si tohle", score: 87 },
      ];
      activeClip = 0;
      captionInput.value = clips[0].caption;
      viralScore.textContent = `Score ${clips[0].score}`;
      renderClips();
      syncEngine();
      showToast("Demo ready · nahraj svoje foto/video");
    } catch (err) {
      console.error(err);
      showToast("Demo load fail");
    }
  }

  renderClips();
  syncEngine();

  $("#btn-demo")?.addEventListener("click", () => loadDemo());
  $("#btn-camera")?.addEventListener("click", async () => {
    try {
      showToast("Zapínám kameru…");
      await Engine.loadCamera();
      emptyStage.hidden = true;
      uploadTitle.textContent = "live kamera";
      uploadMeta.textContent = "Live · face lock";
      mediaTools.hidden = true;
      btnPlay.hidden = true;
      clips = [{ t: 0, title: "Live take", caption: "právě teď", score: 91 }];
      activeClip = 0;
      captionInput.value = clips[0].caption;
      viralScore.textContent = "Score 91";
      renderClips();
      syncEngine();
      showToast("Kamera live · beauty zapnuté");
    } catch (err) {
      console.error(err);
      showToast("Kamera zamítnutá / nedostupná");
    }
  });

  // Always land in studio with demo so UI isn't empty
  go("studio");
  loadDemo().finally(() => {
    window.dispatchEvent(new Event("lic-ready"));
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") go("landing");
    if (e.key === "c" && studio.classList.contains("is-active")) {
      compareOn = !compareOn;
      syncEngine();
    }
  });
})();

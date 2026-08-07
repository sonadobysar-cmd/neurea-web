(() => {
  const Engine = window.LicEngine;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const landing = $("#view-landing");
  const studio = $("#view-studio");
  const toast = $("#toast");
  const captionInput = $("#caption-input");
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
  const clipList = $("#clip-list");
  const emptyStage = $("#empty-stage");
  const btnPlay = $("#btn-toggle-play");
  const czNote = $("#cz-note");

  let clips = [];
  let activeClip = 0;

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
    $$(".step").forEach((el) => {
      el.classList.toggle("is-active", Number(el.dataset.step) === n);
    });
  }

  function syncEngine() {
    Engine.setOptions({
      beauty: document.querySelector("#beauty-presets .preset.is-active")?.dataset.beauty || "glow",
      beautyStrength: Number(beautyStrength.value),
      smooth: Number(smoothStrength.value),
      light: document.querySelector("#light-presets .chip.is-active")?.dataset.light || "soft",
      captionStyle: document.querySelector("#caption-styles .chip.is-active")?.dataset.caption || "bold",
      captionText: captionInput.value,
    });
    beautyVal.textContent = `${beautyStrength.value}%`;
    smoothVal.textContent = `${smoothStrength.value}%`;
    updateHint();
    const st = Engine.getState();
    if (st.hasMedia) {
      lockText.textContent = st.face ? "Face lock stabilní" : "Hledám tvář…";
      emptyStage.hidden = true;
    } else {
      lockText.textContent = "Čekám na media";
      emptyStage.hidden = false;
    }
  }

  function updateHint() {
    const b = ($("#beauty-presets .preset.is-active")?.dataset.beauty || "glow");
    const l = ($("#light-presets .chip.is-active")?.dataset.light || "soft");
    const c = ($("#caption-styles .chip.is-active")?.dataset.caption || "bold");
    const cap = (s) => s[0].toUpperCase() + s.slice(1);
    stageHint.textContent = `${cap(b)} · ${cap(l)} light · Caption ${cap(c)}`;
  }

  function renderClips() {
    clipList.innerHTML = "";
    if (!clips.length) {
      clipList.innerHTML = `<p class="note" style="margin:0.75rem 0 0">Háčky se objeví po nahrání videa.</p>`;
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
          lockText.textContent = "Face lock stabilní";
        }
        setStep(1);
      });
      clipList.appendChild(btn);
    });
  }

  async function handleFile(file) {
    if (!file) return;
    setStep(1);
    showToast(`Načítám ${file.name.slice(0, 26)}…`);
    try {
      const info = await Engine.loadFile(file);
      emptyStage.hidden = true;
      uploadTitle.textContent = file.name.length > 28 ? `${file.name.slice(0, 28)}…` : file.name;
      syncEngine();

      if (info.kind === "video") {
        mediaTools.hidden = false;
        btnPlay.hidden = false;
        btnPlay.textContent = "Přehrát";
        seek.max = String(info.duration || 1);
        seek.value = String(Engine.getVideo().currentTime || 0);
        seekVal.textContent = Engine.formatTime(Number(seek.value));
        uploadMeta.textContent = `Video · ${Engine.formatTime(info.duration)}`;
        clips = Engine.buildClipsFromDuration(info.duration);
        activeClip = 0;
        captionInput.value = clips[0]?.caption || captionInput.value;
        viralScore.textContent = `Score ${clips[0]?.score || "—"}`;
        renderClips();
        showToast("AI našla háčky · Face lock ready");
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
        showToast("Fotka ready · uprav beauty a stáhni");
      }
      lockText.textContent = "Face lock stabilní";
      syncEngine();
    } catch (err) {
      console.error(err);
      showToast("Nepodařilo se načíst soubor");
    }
  }

  // Nav
  $$("[data-go]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      go(el.dataset.go);
    });
  });
  $("#btn-demo-scroll")?.addEventListener("click", () => {
    $("#jak")?.scrollIntoView({ behavior: "smooth" });
  });
  $$(".step").forEach((el) => {
    el.addEventListener("click", () => setStep(Number(el.dataset.step)));
  });

  // Upload
  uploadZone.addEventListener("click", () => fileInput.click());
  uploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadZone.classList.add("is-drag");
  });
  uploadZone.addEventListener("dragleave", () => uploadZone.classList.remove("is-drag"));
  uploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadZone.classList.remove("is-drag");
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  });
  fileInput.addEventListener("change", () => {
    if (fileInput.files?.[0]) handleFile(fileInput.files[0]);
  });

  // Seek / play
  seek?.addEventListener("input", async () => {
    const t = Number(seek.value);
    seekVal.textContent = Engine.formatTime(t);
    Engine.pause();
    btnPlay.textContent = "Přehrát";
    await Engine.seek(t);
    lockText.textContent = "Face lock stabilní";
  });

  btnPlay?.addEventListener("click", () => {
    if (Engine.isPlaying()) {
      Engine.pause();
      btnPlay.textContent = "Přehrát";
    } else {
      Engine.play();
      btnPlay.textContent = "Pauza";
      setStep(1);
      const v = Engine.getVideo();
      const onTime = () => {
        seek.value = String(v.currentTime);
        seekVal.textContent = Engine.formatTime(v.currentTime);
      };
      v.ontimeupdate = onTime;
      v.onended = () => {
        btnPlay.textContent = "Přehrát";
      };
    }
  });

  // Beauty
  $$("#beauty-presets .preset").forEach((el) => {
    el.addEventListener("click", () => {
      $$("#beauty-presets .preset").forEach((p) => p.classList.toggle("is-active", p === el));
      const b = el.dataset.beauty;
      if (b === "natural") beautyStrength.value = "12";
      if (b === "glow") beautyStrength.value = "18";
      if (b === "glam") beautyStrength.value = "28";
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

  $$("#caption-styles .chip").forEach((el) => {
    el.addEventListener("click", () => {
      $$("#caption-styles .chip").forEach((c) => c.classList.toggle("is-active", c === el));
      setStep(3);
      syncEngine();
    });
  });
  captionInput.addEventListener("input", syncEngine);

  $("#btn-fix-cz")?.addEventListener("click", () => {
    const before = captionInput.value;
    const after = Engine.polishCzech(before);
    captionInput.value = after;
    syncEngine();
    czNote.textContent = before !== after ? "✓ Opraveno do češtiny" : "✓ Už je v pořádku";
    showToast(before !== after ? "Čeština opravená" : "Není co opravovat");
  });

  $("#btn-export").addEventListener("click", async () => {
    setStep(4);
    if (!Engine.getState().hasMedia) {
      showToast("Nejdřív nahraj fotku nebo video");
      return;
    }
    Engine.pause();
    btnPlay.textContent = "Přehrát";
    await Engine.requestRender();
    // ensure one more paint with overlays
    await new Promise((r) => requestAnimationFrame(r));
    const blob = await Engine.exportPng();
    if (!blob) {
      showToast("Export selhal");
      return;
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `lic-short-${Date.now()}.png`;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast("Staženo · 1080×1920 PNG");
  });

  // Landing beauty cycle
  let heroTick = 0;
  setInterval(() => {
    if (!landing.classList.contains("is-active")) return;
    heroTick = (heroTick + 1) % 3;
    document.documentElement.style.setProperty("--beauty", String([0.12, 0.22, 0.3][heroTick]));
  }, 3200);

  // Init UI
  renderClips();
  syncEngine();
  if (location.hash === "#studio") go("studio");

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") go("landing");
  });
})();

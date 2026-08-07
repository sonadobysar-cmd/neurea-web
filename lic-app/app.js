(() => {
  const state = {
    beauty: "glow",
    beautyStrength: 18,
    light: "soft",
    caption: "bold",
    clip: 0,
    step: 1,
  };

  const clips = [
    { title: "Háček — překvapení", caption: "tohle jsem nečekala…", score: 92 },
    { title: "Punchline", caption: "a přesně tohle mě změnilo", score: 88 },
    { title: "Emocionální moment", caption: "když ti dojde, že to jde", score: 85 },
  ];

  const beautyBoost = { natural: 0.7, glow: 1, glam: 1.25 };
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const landing = $("#view-landing");
  const studio = $("#view-studio");
  const toast = $("#toast");
  const beautyLayer = $("#beauty-layer");
  const lightLayer = $("#light-layer");
  const liveCaption = $("#live-caption");
  const captionInput = $("#caption-input");
  const beautyVal = $("#beauty-val");
  const beautyStrength = $("#beauty-strength");
  const stageHint = $("#stage-hint");
  const lockText = $("#lock-text");
  const viralScore = $("#viral-score");
  const faceRing = $("#face-ring");
  const stagePortrait = $("#stage-portrait");
  const uploadZone = $("#upload-zone");
  const fileInput = $("#file-input");

  function showToast(msg) {
    toast.hidden = false;
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      toast.classList.remove("is-on");
    }, 2200);
  }

  function go(view) {
    if (view === "studio") {
      landing.classList.remove("is-active");
      studio.classList.add("is-active");
      document.documentElement.style.setProperty("--beauty", String((state.beautyStrength / 100) * beautyBoost[state.beauty]));
      pulseLock();
      history.replaceState(null, "", "#studio");
    } else {
      studio.classList.remove("is-active");
      landing.classList.add("is-active");
      history.replaceState(null, "", "#");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setStep(n) {
    state.step = n;
    $$(".step").forEach((el) => {
      el.classList.toggle("is-active", Number(el.dataset.step) === n);
    });
  }

  function pulseLock() {
    faceRing.classList.remove("is-tracking");
    void faceRing.offsetWidth;
    faceRing.classList.add("is-tracking");
    lockText.textContent = "Face lock stabilní";
  }

  function applyBeauty() {
    const strength = (state.beautyStrength / 100) * beautyBoost[state.beauty];
    document.documentElement.style.setProperty("--beauty", String(strength));

    // Subtle face-lock micro-adjust — stays locked, doesn't "fly"
    const settleX = state.beauty === "glam" ? -0.4 : state.beauty === "glow" ? 0.2 : 0;
    const settleY = state.beautyStrength * 0.02;
    faceRing.style.left = `calc(50% + ${settleX}px)`;
    faceRing.style.top = `calc(30% + ${settleY}px)`;

    beautyVal.textContent = `${state.beautyStrength}%`;
    updateHint();
    pulseLock();
  }

  function applyLight() {
    lightLayer.dataset.mode = state.light;
    const contrast = { soft: 1.04, cinema: 1.12, night: 1.08, clean: 1.02 }[state.light];
    document.documentElement.style.setProperty("--light-contrast", String(contrast));
    updateHint();
  }

  function applyCaption() {
    liveCaption.dataset.style = state.caption;
    liveCaption.textContent = captionInput.value.trim() || "…";
    updateHint();
  }

  function updateHint() {
    const b = state.beauty[0].toUpperCase() + state.beauty.slice(1);
    const l = state.light[0].toUpperCase() + state.light.slice(1);
    const c = state.caption[0].toUpperCase() + state.caption.slice(1);
    stageHint.textContent = `${b} · ${l} light · Caption ${c}`;
  }

  function selectClip(index) {
    state.clip = index;
    const clip = clips[index];
    $$(".clip").forEach((el) => el.classList.toggle("is-active", Number(el.dataset.clip) === index));
    captionInput.value = clip.caption;
    viralScore.textContent = `Score ${clip.score}`;
    applyCaption();
    pulseLock();
    stagePortrait.style.animation = "none";
    void stagePortrait.offsetWidth;
    stagePortrait.style.animation = "";
  }

  // Navigation
  $$("[data-go]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      go(el.dataset.go);
    });
  });

  $("#btn-demo-scroll")?.addEventListener("click", () => {
    $("#jak")?.scrollIntoView({ behavior: "smooth" });
  });

  // Steps
  $$(".step").forEach((el) => {
    el.addEventListener("click", () => setStep(Number(el.dataset.step)));
  });

  // Clips
  $$(".clip").forEach((el) => {
    el.addEventListener("click", () => selectClip(Number(el.dataset.clip)));
  });

  // Beauty presets
  $$("#beauty-presets .preset").forEach((el) => {
    el.addEventListener("click", () => {
      state.beauty = el.dataset.beauty;
      $$("#beauty-presets .preset").forEach((p) => p.classList.toggle("is-active", p === el));
      if (state.beauty === "natural") state.beautyStrength = 12;
      if (state.beauty === "glow") state.beautyStrength = 18;
      if (state.beauty === "glam") state.beautyStrength = 28;
      beautyStrength.value = String(state.beautyStrength);
      setStep(2);
      applyBeauty();
    });
  });

  beautyStrength.addEventListener("input", () => {
    state.beautyStrength = Number(beautyStrength.value);
    applyBeauty();
  });

  // Light
  $$("#light-presets .chip").forEach((el) => {
    el.addEventListener("click", () => {
      state.light = el.dataset.light;
      $$("#light-presets .chip").forEach((c) => c.classList.toggle("is-active", c === el));
      applyLight();
    });
  });

  // Captions
  $$("#caption-styles .chip").forEach((el) => {
    el.addEventListener("click", () => {
      state.caption = el.dataset.caption;
      $$("#caption-styles .chip").forEach((c) => c.classList.toggle("is-active", c === el));
      setStep(3);
      applyCaption();
    });
  });

  captionInput.addEventListener("input", applyCaption);

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
    const file = fileInput.files?.[0];
    if (file) handleFile(file);
  });

  function handleFile(file) {
    setStep(1);
    showToast(`Načteno: ${file.name.slice(0, 28)}${file.name.length > 28 ? "…" : ""}`);
    pulseLock();
    // Demo: simulate AI finding clips
    setTimeout(() => showToast("AI našla 3 háčky · Face lock ready"), 900);
  }

  $("#btn-export").addEventListener("click", () => {
    setStep(4);
    showToast("Export ready · 9:16 · bez watermarku (Pro)");
  });

  // Hero beauty beauty cycle for landing wow
  let heroTick = 0;
  setInterval(() => {
    if (!landing.classList.contains("is-active")) return;
    heroTick = (heroTick + 1) % 3;
    const levels = [0.12, 0.22, 0.3];
    document.documentElement.style.setProperty("--beauty", String(levels[heroTick]));
  }, 3200);

  // Init
  lightLayer.dataset.mode = "soft";
  liveCaption.dataset.style = "bold";
  applyBeauty();
  applyLight();
  applyCaption();

  if (location.hash === "#studio") go("studio");

  // Keyboard shortcut
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") go("landing");
  });
})();

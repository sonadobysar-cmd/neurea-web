(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 7) Marquee — každá položka + oranžová hvězda
  var mq = document.getElementById("mq");
  if (mq) {
    var star =
      '<svg class="st mq-star" aria-hidden="true"><use href="#star"/></svg>';
    var words =
      (window.__ROBIN_MARQUEE && window.__ROBIN_MARQUEE.length
        ? window.__ROBIN_MARQUEE
        : [
            "kouzelník",
            "balonkář",
            "mentalista",
            "školky",
            "školy",
            "narozeninové oslavy",
            "městské slavnosti",
            "veřejné akce",
            "soukromé akce",
          ]);
    var half = words
      .map(function (w) {
        return (
          '<span class="mq-item"><span class="mq-text">' +
          w +
          "</span>" +
          star +
          "</span>"
        );
      })
      .join("");
    mq.innerHTML = half + half;
  }

  // 1) Pozadí Robin2 — bubliny + balónky (1:1 z kouzlimesrobinem1)
  var layer = document.getElementById("bubbles");
  var balloonData = window.ROBIN2_BALLOON_DATA || {};
  var balloonSrcs = balloonData.balloonSrcs || [];
  var balloonCursor = 0;
  if (layer && !reduce) {
    var bubbles = [];
    var W = innerWidth;
    var H = innerHeight;
    addEventListener("resize", function () {
      W = innerWidth;
      H = innerHeight;
    });

    function spawnBubble(isBalloon, startVisible) {
      var el, size;
      if (isBalloon && balloonSrcs.length) {
        el = document.createElement("img");
        el.className = "bubble balloon-float";
        el.src = balloonSrcs[balloonCursor % balloonSrcs.length];
        balloonCursor++;
        el.alt = "";
        size = 44 + Math.random() * 30;
        el.style.height = size + "px";
        el.style.width = "auto";
      } else {
        el = document.createElement("div");
        el.className = "bubble";
        size = 26 + Math.random() * 70;
        el.style.width = el.style.height = size + "px";
      }
      var x = Math.random() * (W - size);
      var b = {
        el: el,
        x: x,
        y: startVisible ? Math.random() * Math.max(1, H - size) : H + size,
        size: size,
        vy: 0.18 + Math.random() * 0.32,
        drift: (Math.random() - 0.5) * 0.32,
        phase: Math.random() * 6,
        isBalloon: !!isBalloon,
        spin: (Math.random() - 0.5) * 0.4,
        rot: 0,
      };
      el.style.transform = "translate(" + b.x + "px," + b.y + "px)";
      if (!isBalloon) {
        el.addEventListener("click", function (e) {
          popBubble(b, e.clientX, e.clientY);
        });
      }
      layer.appendChild(el);
      bubbles.push(b);
    }

    function popBubble(b, cx, cy) {
      var i = bubbles.indexOf(b);
      if (i < 0) return;
      bubbles.splice(i, 1);
      b.el.remove();
      var p = document.createElement("div");
      p.className = "pop";
      p.style.left = cx + "px";
      p.style.top = cy + "px";
      for (var k = 0; k < 7; k++) {
        var s = document.createElement("span");
        var a = (Math.PI * 2 * k) / 7;
        s.style.setProperty("--px", Math.cos(a) * 40 + "px");
        s.style.setProperty("--py", Math.sin(a) * 40 + "px");
        p.appendChild(s);
      }
      document.body.appendChild(p);
      setTimeout(function () {
        p.remove();
      }, 650);
    }

    var mx = W / 2;
    var my = H / 2;
    addEventListener("mousemove", function (e) {
      mx = e.clientX;
      my = e.clientY;
    });

    function tick() {
      for (var i = bubbles.length - 1; i >= 0; i--) {
        var b = bubbles[i];
        b.y -= b.vy;
        b.phase += 0.01;
        var sway = Math.sin(b.phase) * 0.5 + b.drift;
        var dx = b.x - mx;
        var dy = b.y - my;
        var dist = Math.hypot(dx, dy);
        if (dist < 120) sway += dx / dist * 1.2;
        b.x += sway;
        if (b.isBalloon) b.rot += b.spin;
        if (b.y < -b.size - 20) {
          b.el.remove();
          bubbles.splice(i, 1);
          continue;
        }
        b.el.style.transform =
          "translate(" +
          b.x +
          "px," +
          b.y +
          "px)" +
          (b.isBalloon ? " rotate(" + b.rot + "deg)" : "");
      }
      requestAnimationFrame(tick);
    }

    var target = Math.min(14, Math.floor(W / 110));
    for (var i = 0; i < target; i++) {
      setTimeout(function () {
        spawnBubble(false);
      }, i * 400);
    }
    for (var initialBalloon = 0; initialBalloon < Math.min(3, balloonSrcs.length); initialBalloon++) {
      spawnBubble(true, true);
    }
    setInterval(function () {
      if (bubbles.length < target) spawnBubble(false);
    }, 2600);
    setInterval(function () {
      if (
        bubbles.filter(function (b) {
          return b.isBalloon;
        }).length < 3
      )
        spawnBubble(true);
    }, 5200);
    requestAnimationFrame(tick);
  }

  // 9) Galerie — pojízdný pás + lightbox se šipkami (i galerie Z vystoupení)
  var strip = document.getElementById("strip");
  if (strip && strip.classList.contains("strip--marquee")) {
    strip.innerHTML = strip.innerHTML + strip.innerHTML;
  }
  var momentsStrip = document.getElementById("moments-strip");
  if (momentsStrip && momentsStrip.classList.contains("strip--marquee")) {
    momentsStrip.innerHTML = momentsStrip.innerHTML + momentsStrip.innerHTML;
  }

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCap = document.getElementById("lightbox-cap");
  var closeBtn = lightbox && lightbox.querySelector(".lightbox-close");
  var prevBtn = lightbox && lightbox.querySelector(".lightbox-prev");
  var nextBtn = lightbox && lightbox.querySelector(".lightbox-next");
  var currentLb = -1;
  var galleryImgs = [];
  var lightboxReturnFocus = null;

  function showLightboxAt(index) {
    if (!lightbox || !lightboxImg || !galleryImgs.length) return;
    var n = galleryImgs.length;
    currentLb = ((index % n) + n) % n;
    var img = galleryImgs[currentLb];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
    if (lightboxCap) lightboxCap.textContent = img.alt || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  function openLightboxFrom(group, img) {
    lightboxReturnFocus = document.activeElement;
    galleryImgs = [];
    if (group) {
      group.querySelectorAll("figure[data-lightbox] img").forEach(function (el) {
        galleryImgs.push(el);
      });
    }
    var idx = galleryImgs.indexOf(img);
    showLightboxAt(idx >= 0 ? idx : 0);
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    currentLb = -1;
    if (lightboxReturnFocus && lightboxReturnFocus.focus) lightboxReturnFocus.focus();
    lightboxReturnFocus = null;
  }

  function stepLightbox(delta) {
    if (currentLb < 0) return;
    showLightboxAt(currentLb + delta);
  }

  document.querySelectorAll("[data-lb-group], #strip").forEach(function (group) {
    group.querySelectorAll("figure[data-lightbox]").forEach(function (figure) {
      figure.setAttribute("role", "button");
      figure.setAttribute("tabindex", "0");
      var figureImg = figure.querySelector("img");
      figure.setAttribute("aria-label", "Zvětšit fotografii" + (figureImg && figureImg.alt ? ": " + figureImg.alt : ""));
    });
    group.addEventListener("click", function (e) {
      var img = e.target.closest("figure[data-lightbox] img");
      if (img) openLightboxFrom(group, img);
    });
    group.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var figure = e.target.closest("figure[data-lightbox]");
      var img = figure && figure.querySelector("img");
      if (img) {
        e.preventDefault();
        openLightboxFrom(group, img);
      }
    });
  });
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", function () {
    stepLightbox(-1);
  });
  if (nextBtn) nextBtn.addEventListener("click", function () {
    stepLightbox(1);
  });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox || lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "Tab") {
        var controls = [closeBtn, prevBtn, nextBtn].filter(Boolean);
        if (!controls.length) return;
        var first = controls[0];
        var last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // 8) Balónky — modal po „Zkusit si kouzlo“, max 2 prasknutí, pak CTA
  var balloonModal = document.getElementById("balloonModal");
  var popstage = document.getElementById("popstage");
  var cluster = document.getElementById("cluster");
  var reward = document.getElementById("reward");
  var popBtn = document.getElementById("popBtn");
    var popCta = document.getElementById("popCta");
    var balloonProgress = document.getElementById("balloonProgress");
    var progressDots = balloonModal
      ? balloonModal.querySelectorAll(".balloon-progress__dot")
      : [];
  var resetBalloonGame = function () {};
  var balloonReturnFocus = null;

  function openBalloonModal(e) {
    if (e) e.preventDefault();
    if (!balloonModal) return;
    balloonReturnFocus = e && e.currentTarget ? e.currentTarget : document.activeElement;
    resetBalloonGame();
    balloonModal.hidden = false;
    balloonModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var closeBtn = balloonModal.querySelector(".balloon-modal__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeBalloonModal() {
    if (!balloonModal || balloonModal.hidden) return;
    balloonModal.hidden = true;
    balloonModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (balloonReturnFocus && balloonReturnFocus.focus) balloonReturnFocus.focus();
    balloonReturnFocus = null;
  }

  document.querySelectorAll("[data-open-balloons]").forEach(function (el) {
    el.addEventListener("click", openBalloonModal);
  });
  document.querySelectorAll("[data-close-balloons]").forEach(function (el) {
    el.addEventListener("click", function () {
      closeBalloonModal();
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeBalloonModal();
    if (e.key === "Tab" && balloonModal && !balloonModal.hidden) {
      var focusable = Array.prototype.slice.call(
        balloonModal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter(function (el) {
        return el.offsetParent !== null;
      });
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  if (popstage && cluster && reward) {
    var rewards = balloonData.rewards || [];
    var order = [];
    var MAX_POPS = 2;
    var balloonPanel = balloonModal ? balloonModal.querySelector(".balloon-panel") : null;
    var popped = 0;
    var busy = false;

    function shuffle() {
      order = rewards.map(function (_, i) {
        return i;
      });
      for (var i = order.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = order[i];
        order[i] = order[j];
        order[j] = t;
      }
    }
    shuffle();

    resetBalloonGame = function () {
      popped = 0;
      busy = false;
      reward.classList.remove("show");
      reward.innerHTML = "";
      cluster.classList.remove("gone", "popping");
      if (balloonPanel) balloonPanel.classList.remove("balloon-panel--done");
      if (popBtn) popBtn.style.display = "none";
      if (popCta) popCta.style.display = "none";
      shuffle();
      syncPopUi();
    };

    function renderReward(pick, done) {
      if (!pick) return;
      var label = done
        ? "Už jsi praskl(a) 2× — teď objednej Robina naživo"
        : "Robin ti vyrobil " + pick.lbl;
      reward.innerHTML =
        '<img src="' +
        pick.src +
        '" alt="' +
        pick.lbl +
        '"><span class="rlabel"><svg><use href="#star"/></svg>' +
        label +
        "</span>";
      void reward.offsetWidth;
      reward.classList.add("show");
    }

    function setClusterEnabled(on) {
      if (on) {
        cluster.removeAttribute("aria-disabled");
        cluster.tabIndex = 0;
        cluster.style.pointerEvents = "";
        cluster.style.cursor = "";
      } else {
        cluster.setAttribute("aria-disabled", "true");
        cluster.tabIndex = -1;
        cluster.style.pointerEvents = "none";
        cluster.style.cursor = "default";
      }
    }

    function syncPopUi() {
      var done = popped >= MAX_POPS;
      if (popBtn) popBtn.style.display = done || popped === 0 ? "none" : "";
      if (popCta) popCta.style.display = done ? "" : "none";
      if (balloonPanel) balloonPanel.classList.toggle("balloon-panel--done", done);
      if (balloonProgress) {
        balloonProgress.textContent = done ? "Kouzlo dokončeno" : popped === 0 ? "1. ze 2 pokusů" : "2. ze 2 pokusů";
      }
      progressDots.forEach(function (dot, index) {
        dot.classList.toggle("is-active", !done && index === popped);
        dot.classList.toggle("is-done", done || index < popped);
      });
      setClusterEnabled(!done && !cluster.classList.contains("gone"));
    }

    function starBurst() {
      var r = cluster.getBoundingClientRect();
      var cx = r.left + r.width / 2;
      var cy = r.top + r.height / 2;
      var p = document.createElement("div");
      p.className = "pop";
      p.style.left = cx + "px";
      p.style.top = cy + "px";
      for (var k = 0; k < 18; k++) {
        var sp = document.createElement("span");
        var a = (Math.PI * 2 * k) / 18;
        var d = 70 + Math.random() * 90;
        sp.style.setProperty("--px", Math.cos(a) * d + "px");
        sp.style.setProperty("--py", Math.sin(a) * d + "px");
        sp.style.background = ["#EDE81F", "#7457B1", "#F68544", "#3FA9E0"][k % 4];
        sp.style.width = sp.style.height = 8 + Math.random() * 8 + "px";
        p.appendChild(sp);
      }
      document.body.appendChild(p);
      setTimeout(function () {
        p.remove();
      }, 700);
    }

    function doPop() {
      if (busy || !rewards.length || popped >= MAX_POPS) return;
      busy = true;
      var pickIndex = order[popped % order.length];
      var pick = rewards[pickIndex];
      starBurst();
      cluster.classList.add("popping");
      setTimeout(function () {
        cluster.classList.add("gone");
        cluster.classList.remove("popping");
      }, 620);
      popped++;
      renderReward(pick, popped >= MAX_POPS);
      syncPopUi();
      setTimeout(function () {
        busy = false;
      }, 400);
    }

    function resetPop() {
      if (busy || popped >= MAX_POPS) return;
      reward.classList.remove("show");
      reward.innerHTML = "";
      cluster.classList.remove("gone", "popping");
      setClusterEnabled(true);
      if (popBtn) popBtn.style.display = "none";
    }

    cluster.addEventListener("click", doPop);
    cluster.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        doPop();
      }
    });
    if (popBtn) popBtn.addEventListener("click", resetPop);

    syncPopUi();

    if (window.location.hash === "#balonky") {
      openBalloonModal();
    }
  }

  // 11) Kontaktní formulář
  var contactForm = document.getElementById("contactForm");
  var contactThanks = document.getElementById("contactThanks");
  var turnstileSiteKey = window.__ROBIN_TURNSTILE_SITE_KEY || "";
  var turnstileWidgetId = null;

  function loadTurnstileScript() {
    return new Promise(function (resolve) {
      if (!turnstileSiteKey) return resolve(false);
      if (window.turnstile) return resolve(true);
      var existing = document.getElementById("turnstile-api");
      if (existing) {
        existing.addEventListener("load", function () {
          resolve(!!window.turnstile);
        });
        return;
      }
      var script = document.createElement("script");
      script.id = "turnstile-api";
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = function () {
        resolve(!!window.turnstile);
      };
      script.onerror = function () {
        resolve(false);
      };
      document.head.appendChild(script);
    });
  }

  function renderTurnstileWidget() {
    var mount = document.getElementById("contactTurnstile");
    if (!mount || !turnstileSiteKey || !window.turnstile || turnstileWidgetId != null) {
      return;
    }
    turnstileWidgetId = window.turnstile.render(mount, {
      sitekey: turnstileSiteKey,
      theme: "light",
    });
  }

  function resetTurnstileWidget() {
    if (window.turnstile && turnstileWidgetId != null) {
      window.turnstile.reset(turnstileWidgetId);
    }
  }

  function getTurnstileToken() {
    if (!turnstileSiteKey) return "";
    if (!window.turnstile || turnstileWidgetId == null) return "";
    return window.turnstile.getResponse(turnstileWidgetId) || "";
  }

  // Mobilní menu
  var navEl = document.querySelector("nav");
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.getElementById("navMenu");
  if (navEl && navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navEl.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute(
        "aria-label",
        open ? "Zavřít menu" : "Otevřít menu",
      );
    });
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navEl.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Otevřít menu");
      });
    });
    document.addEventListener("click", function (e) {
      if (!navEl.classList.contains("is-open")) return;
      if (navEl.contains(e.target)) return;
      navEl.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Otevřít menu");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        navEl.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Otevřít menu");
      }
    });
  }

  function showContactError(msg) {
    var existing = document.getElementById("contactError");
    if (existing) existing.remove();
    var err = document.createElement("p");
    err.id = "contactError";
    err.className = "contact-error";
    err.setAttribute("role", "alert");
    err.setAttribute("aria-live", "assertive");
    err.textContent = msg;
    if (contactForm) contactForm.insertAdjacentElement("afterend", err);
  }

  if (contactForm) {
    loadTurnstileScript().then(function (ok) {
      if (ok) renderTurnstileWidget();
    });

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(contactForm);
      if (String(fd.get("website") || "").trim()) return;

      var name = String(fd.get("name") || "").trim().slice(0, 120);
      var email = String(fd.get("email") || "").trim().slice(0, 254);
      var phone = String(fd.get("phone") || "").trim().slice(0, 30);
      var message = String(fd.get("message") || "").trim().slice(0, 5000);
      if (!name) {
        showContactError("Zadejte prosím jméno.");
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showContactError("Zadejte prosím platný e-mail.");
        return;
      }
      if (!phone || phone.replace(/\D/g, "").length < 9) {
        showContactError("Zadejte prosím platné telefonní číslo.");
        return;
      }
      if (!fd.get("consent")) {
        showContactError("Pro odeslání je potřeba souhlas se zpracováním údajů.");
        return;
      }

      var turnstileToken = getTurnstileToken();
      if (turnstileSiteKey && !turnstileToken) {
        showContactError("Potvrďte prosím, že nejste robot.");
        return;
      }

      var btn = contactForm.querySelector('button[type="submit"]');
      var btnHtml = btn ? btn.innerHTML : "";
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Odesílám…";
      }

      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          message: message,
          consent: true,
          turnstileToken: turnstileToken,
        }),
      })
        .then(function (res) {
          return res.json().then(function (data) {
            return { ok: res.ok, data: data };
          });
        })
        .then(function (result) {
          if (!result.ok) throw new Error(result.data.error || "Odeslání se nepovedlo.");
          var err = document.getElementById("contactError");
          if (err) err.remove();
          contactForm.reset();
          resetTurnstileWidget();
          if (btn) {
            btn.disabled = true;
            btn.textContent = "Odesláno";
          }
          if (contactThanks) contactThanks.hidden = false;
        })
        .catch(function (err) {
          showContactError(
            err.message ||
              "Zprávu se nepodařilo odeslat. Napište prosím na kouzlimesrobinem@email.cz.",
          );
          resetTurnstileWidget();
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = btnHtml;
          }
        });
    });
  }
})();

(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 7) Marquee — přesný obsah ze zadání (styl Robin3)
  var mq = document.getElementById("mq");
  if (mq) {
    var star =
      '<svg class="st lg" style="fill:#EE8B00"><use href="#star"/></svg>';
    var line =
      "kouzelník · balonkář · mentalista · školky · školy · narozeninové oslavy · městské slavnosti · veřejné akce · soukromé akce";
    var half =
      '<span class="mq-item">' + line + " " + star + "</span>";
    mq.innerHTML = half + half;
  }

  // 1) Pozadí Robin2 — bubliny + balónky (1:1 z kouzlimesrobinem1)
  var layer = document.getElementById("bubbles");
  var balloonData = window.ROBIN2_BALLOON_DATA || {};
  var balloonSrcs = balloonData.balloonSrcs || [];
  if (layer && !reduce) {
    var bubbles = [];
    var W = innerWidth;
    var H = innerHeight;
    addEventListener("resize", function () {
      W = innerWidth;
      H = innerHeight;
    });

    function spawnBubble(isBalloon) {
      var el, size;
      if (isBalloon && balloonSrcs.length) {
        el = document.createElement("img");
        el.className = "bubble balloon-float";
        el.src = balloonSrcs[Math.floor(Math.random() * balloonSrcs.length)];
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
        y: H + size,
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

  // 9) Galerie — pojízdný pás + lightbox se šipkami
  var strip = document.getElementById("strip");
  if (strip && strip.classList.contains("strip--marquee")) {
    strip.innerHTML = strip.innerHTML + strip.innerHTML;
  }

  var galleryImgs = [];
  if (strip) {
    strip.querySelectorAll("figure[data-lightbox] img").forEach(function (img) {
      galleryImgs.push(img);
    });
  }

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCap = document.getElementById("lightbox-cap");
  var closeBtn = lightbox && lightbox.querySelector(".lightbox-close");
  var prevBtn = lightbox && lightbox.querySelector(".lightbox-prev");
  var nextBtn = lightbox && lightbox.querySelector(".lightbox-next");
  var currentLb = -1;

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
  }

  function openLightbox(img) {
    var idx = galleryImgs.indexOf(img);
    showLightboxAt(idx >= 0 ? idx : 0);
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    currentLb = -1;
  }

  function stepLightbox(delta) {
    if (currentLb < 0) return;
    showLightboxAt(currentLb + delta);
  }

  if (strip) {
    strip.addEventListener("click", function (e) {
      var img = e.target.closest("figure[data-lightbox] img");
      if (img) openLightbox(img);
    });
  }
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
    });
  }

  // 8) Balónky Robin2 — hra 1:1 (base64 odměny z originálu)
  var popstage = document.getElementById("popstage");
  var cluster = document.getElementById("cluster");
  var reward = document.getElementById("reward");
  var popBtn = document.getElementById("popBtn");
  var final = document.getElementById("tfinal");

  if (popstage && cluster && reward) {
    var rewards = balloonData.rewards || [];
    var order = [];
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
      if (busy || !rewards.length) return;
      busy = true;
      var pick = rewards[order[popped % order.length]];
      starBurst();
      cluster.classList.add("popping");
      setTimeout(function () {
        cluster.classList.add("gone");
        cluster.classList.remove("popping");
      }, 620);
      reward.innerHTML =
        '<img src="' +
        pick.src +
        '" alt="' +
        pick.lbl +
        '"><span class="rlabel"><svg><use href="#star"/></svg>Robin ti vyrobil ' +
        pick.lbl +
        "</span>";
      void reward.offsetWidth;
      reward.classList.add("show");
      popped++;
      if (popBtn) popBtn.style.display = "";
      if (popped >= 2 && final && !final.classList.contains("show"))
        final.classList.add("show");
      setTimeout(function () {
        busy = false;
      }, 400);
    }

    function resetPop() {
      if (busy) return;
      reward.classList.remove("show");
      reward.innerHTML = "";
      cluster.classList.remove("gone", "popping");
    }

    cluster.addEventListener("click", doPop);
    cluster.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        doPop();
      }
    });
    if (popBtn) popBtn.addEventListener("click", resetPop);
  }

  // 11) Kontaktní formulář
  var contactForm = document.getElementById("contactForm");
  var contactThanks = document.getElementById("contactThanks");

  function showContactError(msg) {
    var existing = document.getElementById("contactError");
    if (existing) existing.remove();
    var err = document.createElement("p");
    err.id = "contactError";
    err.className = "contact-error";
    err.textContent = msg;
    if (contactForm) contactForm.insertAdjacentElement("afterend", err);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(contactForm);
      if (String(fd.get("website") || "").trim()) return;

      var email = String(fd.get("email") || "").trim();
      var phone = String(fd.get("phone") || "").trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showContactError("Zadejte prosím platný e-mail.");
        return;
      }
      if (!phone || phone.replace(/\D/g, "").length < 9) {
        showContactError("Zadejte prosím platné telefonní číslo.");
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
          email: email,
          phone: phone,
          message: String(fd.get("message") || "").trim(),
        }),
      })
        .then(function (res) {
          return res.json().then(function (data) {
            return { ok: res.ok, data: data };
          });
        })
        .then(function (result) {
          if (!result.ok) throw new Error(result.data.error || "Odeslání se nepovedlo.");
          contactForm.hidden = true;
          var err = document.getElementById("contactError");
          if (err) err.remove();
          if (contactThanks) contactThanks.hidden = false;
        })
        .catch(function (err) {
          showContactError(
            err.message ||
              "Zprávu se nepodařilo odeslat. Napište prosím na info@kouzlimesrobinem.cz.",
          );
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = btnHtml;
          }
        });
    });
  }
})();

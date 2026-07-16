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

  // 1) Pozadí Robin2 — bubliny
  var layer = document.getElementById("bubbles");
  if (layer && !reduce) {
    var bubbles = [];

    function spawnBubble(asBalloon) {
      var el;
      var size = asBalloon ? 64 + Math.random() * 48 : 18 + Math.random() * 42;
      if (asBalloon) {
        el = document.createElement("img");
        el.className = "bubble balloon-float";
        el.src = "/balloon-cluster.png";
        el.alt = "";
        el.draggable = false;
        el.style.width = size + "px";
        el.style.height = "auto";
      } else {
        el = document.createElement("div");
        el.className = "bubble";
        el.style.width = size + "px";
        el.style.height = size + "px";
      }
      var b = {
        el: el,
        x: Math.random() * innerWidth,
        y: innerHeight + size + Math.random() * 120,
        size: size,
        vy: 0.35 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
        isBalloon: !!asBalloon,
      };
      el.style.left = b.x + "px";
      el.style.top = b.y + "px";
      el.addEventListener("click", function () {
        popBubble(b);
      });
      layer.appendChild(el);
      bubbles.push(b);
    }

    function popBubble(b) {
      var i = bubbles.indexOf(b);
      if (i < 0) return;
      bubbles.splice(i, 1);
      b.el.remove();
      var p = document.createElement("div");
      p.className = "pop";
      p.style.left = b.x + b.size / 2 + "px";
      p.style.top = b.y + b.size / 2 + "px";
      for (var k = 0; k < 12; k++) {
        var sp = document.createElement("span");
        var a = (Math.PI * 2 * k) / 12;
        var d = 40 + Math.random() * 60;
        sp.style.setProperty("--px", Math.cos(a) * d + "px");
        sp.style.setProperty("--py", Math.sin(a) * d + "px");
        sp.style.background = ["#EDE81F", "#7457B1", "#F68544", "#3FA9E0"][k % 4];
        sp.style.width = sp.style.height = 6 + Math.random() * 6 + "px";
        p.appendChild(sp);
      }
      document.body.appendChild(p);
      setTimeout(function () {
        p.remove();
      }, 650);
    }

    function tick() {
      for (var i = bubbles.length - 1; i >= 0; i--) {
        var b = bubbles[i];
        b.y -= b.vy;
        b.phase += 0.01;
        b.x += Math.sin(b.phase) * 0.35;
        b.el.style.transform = "translate3d(" + b.x + "px," + b.y + "px,0)";
        if (b.y < -b.size - 20) {
          b.el.remove();
          bubbles.splice(i, 1);
        }
      }
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
    setInterval(function () {
      if (bubbles.length < 14) spawnBubble(false);
    }, 2600);
    setInterval(function () {
      if (
        bubbles.filter(function (b) {
          return b.isBalloon;
        }).length < 2
      )
        spawnBubble(true);
    }, 6200);
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

  // 8) Balónky Robin2
  var popstage = document.getElementById("popstage");
  var cluster = document.getElementById("cluster");
  var reward = document.getElementById("reward");
  var popBtn = document.getElementById("popBtn");
  var final = document.getElementById("tfinal");

  if (popstage && cluster && reward) {
    var rewards = [
      { src: "/luxury/img-06.jpg", lbl: "balónkového pudla" },
      { src: "/luxury/img-11.jpg", lbl: "balónkového pejska" },
      { src: "/luxury/img-08.jpg", lbl: "balónkové zvířátko" },
      { src: "/luxury/img-03.jpg", lbl: "modrého pejska" },
    ];
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
      }, 650);
    }

    function doPop() {
      if (busy) return;
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

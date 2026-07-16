(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // marquee content
  var mq = document.getElementById('mq');
  var star = '<svg class="st lg" style="fill:#EE8B00"><use href="#star"/></svg>';
  var words = ['kouzla','balónková zvířátka','mentalismus','dětské oslavy','školky','firemní večery'];
  var half = words.map(function(w){return '<span class="mq-item">'+w+' '+star+'</span>';}).join('');
  mq.innerHTML = half + half;

  // cursor glow + sparkle trail
  var glow = document.getElementById('glow');
  var fine = matchMedia('(pointer:fine)').matches;
  var lastSpark = 0;
  function makeStar(size, color){
    var ns='http://www.w3.org/2000/svg';
    var s=document.createElementNS(ns,'svg');
    s.setAttribute('width',size); s.setAttribute('height',size); s.setAttribute('viewBox','0 0 24 24');
    var u=document.createElementNS(ns,'use');
    u.setAttribute('href','#star'); s.appendChild(u); s.style.fill=color;
    return s;
  }
  if (!reduce && fine){
    document.addEventListener('mousemove', function(e){
      document.body.classList.add('glow-on');
      glow.style.left = e.clientX+'px';
      glow.style.top = e.clientY+'px';
      var now = performance.now();
      if (now - lastSpark > 90){
        lastSpark = now;
        var sp = document.createElement('span');
        sp.className='spark';
        var size = 7 + Math.random()*8;
        sp.appendChild(makeStar(size, Math.random()<.5 ? '#EE8B00' : '#FFBE3D'));
        sp.style.left = (e.clientX + (Math.random()*22-11)) + 'px';
        sp.style.top  = (e.clientY + (Math.random()*22-11)) + 'px';
        document.body.appendChild(sp);
        sp.addEventListener('animationend', function(){ sp.remove(); });
      }
    });
  }

  // hero portrait 3D tilt (Robin3 — arch uvnitř hero-luxe)
  var hv = document.querySelector('.hero-visual');
  var arch = hv && (hv.querySelector('.hero-luxe .arch') || hv.querySelector('.arch'));
  if (!reduce && fine && arch){
    arch.style.transition = 'transform .18s ease-out';
    hv.addEventListener('mousemove', function(e){
      var r = hv.getBoundingClientRect();
      var x = (e.clientX - r.left)/r.width - .5;
      var y = (e.clientY - r.top)/r.height - .5;
      arch.style.transform = 'perspective(900px) rotateY('+(x*7)+'deg) rotateX('+(-y*6)+'deg)';
    });
    hv.addEventListener('mouseleave', function(){ arch.style.transform = 'none'; });
  }

  // stat counters
  function count(el){
    var target = +el.dataset.count, t0 = null, dur = 1400;
    function tick(t){
      if(!t0) t0 = t;
      var p = Math.min((t - t0)/dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  document.querySelectorAll('[data-count]').forEach(function(el){
    if (reduce){ el.textContent = el.dataset.count; return; }
    count(el);
  });

  // magnetic buttons
  if (!reduce && fine){
    document.querySelectorAll('.btn').forEach(function(btn){
      btn.addEventListener('mousemove', function(e){
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width/2, y = e.clientY - r.top - r.height/2;
        btn.style.transform = 'translate('+(x*.14)+'px,'+(y*.28 - 3)+'px)';
      });
      btn.addEventListener('mouseleave', function(){ btn.style.transform = ''; });
    });
  }

  // discipline cards: click to flip
  document.querySelectorAll('.pcard').forEach(function(c){
    function flip(){ c.classList.toggle('flipped'); }
    c.addEventListener('click', flip);
    c.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); flip(); }
    });
  });

  // ---------- mentalist trick ----------
  var SUIT = {h:'#s-h', d:'#s-d', s:'#s-s', c:'#s-c'};
  var RED = {h:1, d:1};
  var ORIG = [['K','h'],['Q','s'],['J','d'],['K','c'],['Q','h'],['J','s']];
  var REPL = [['K','d'],['Q','c'],['J','h'],['K','s'],['Q','d']];
  var tbox = document.getElementById('tcards');
  var tbtn = document.getElementById('tbtn');
  var tmsg = document.getElementById('tmsg');
  var busy = false, done = false;

  function cardHTML(rank, suit){
    var red = RED[suit] ? ' red' : '';
    var use = '<svg viewBox="0 0 24 24" aria-hidden="true"';
    return '<div class="tcard">' +
      '<div class="tface'+red+'">' +
        '<div class="crn"><b>'+rank+'</b>'+use+'><use href="'+SUIT[suit]+'"/></svg></div>' +
        use+' class="mid"><use href="'+SUIT[suit]+'"/></svg>' +
        '<div class="crn flip"><b>'+rank+'</b>'+use+'><use href="'+SUIT[suit]+'"/></svg></div>' +
      '</div>' +
      '<div class="tface tback"></div>' +
    '</div>';
  }
  function render(cards){
    tbox.innerHTML = cards.map(function(c){ return cardHTML(c[0], c[1]); }).join('');
  }
  function setDown(down){
    tbox.querySelectorAll('.tcard').forEach(function(c, i){
      c.style.setProperty('--d', (i*70)+'ms');
      c.classList.toggle('down', down);
    });
  }
  function goldBurst(host){
    var n = 30;
    for (var i=0;i<n;i++){
      var b = document.createElement('span');
      b.className = 'bstar';
      var ang = Math.random()*Math.PI*2, dist = 90 + Math.random()*240;
      b.style.setProperty('--bx', Math.cos(ang)*dist+'px');
      b.style.setProperty('--by', Math.sin(ang)*dist*.72+'px');
      b.appendChild(makeStar(9 + Math.random()*14, Math.random()<.5 ? '#EE8B00' : '#FFBE3D'));
      host.appendChild(b);
      b.addEventListener('animationend', function(ev){ ev.target.remove(); });
    }
  }
  if (tbox && tbtn) {
    render(ORIG);
    tbtn.addEventListener('click', function(){
      if (busy) return;
      busy = true;
      if (done){
        tmsg.classList.remove('show');
        setDown(true);
        setTimeout(function(){
          render(ORIG);
          setDown(true);
          requestAnimationFrame(function(){ requestAnimationFrame(function(){ setDown(false); }); });
          tbtn.firstChild.textContent = 'Zamíchat karty';
          done = false; busy = false;
        }, 900);
        return;
      }
      setDown(true);
      setTimeout(function(){
        render(REPL);
        setDown(true);
        requestAnimationFrame(function(){ requestAnimationFrame(function(){ setDown(false); }); });
      }, 950);
      setTimeout(function(){
        tmsg.textContent = '„Vaše karta zmizela. Přesně ta, na kterou jste mysleli."';
        tmsg.classList.add('show');
        goldBurst(document.querySelector('.trick .wrap'));
        tbtn.firstChild.textContent = 'Zkusit znovu';
        done = true; busy = false;
      }, 1750);
    });
  }

  // reveals
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.14});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // drag-to-scroll gallery (skip auto-marquee strips)
  var strip = document.getElementById('strip');
  if (strip && !strip.classList.contains('strip--marquee')) {
    var down=false, sx=0, sl=0;
    strip.addEventListener('pointerdown', function(e){ down=true; sx=e.clientX; sl=strip.scrollLeft; strip.classList.add('drag'); strip.setPointerCapture(e.pointerId); });
    strip.addEventListener('pointermove', function(e){ if(!down) return; strip.scrollLeft = sl - (e.clientX - sx); });
    ['pointerup','pointercancel'].forEach(function(ev){ strip.addEventListener(ev, function(){ down=false; strip.classList.remove('drag'); }); });
  }
})();
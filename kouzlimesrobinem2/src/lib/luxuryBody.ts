export const luxuryBodyHtml = `<div id="bubbles" aria-hidden="true"></div>
<div id="glow" aria-hidden="true"></div>

<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <symbol id="star" viewBox="0 0 24 24"><path d="M12 0c1.2 6.8 4.9 10.6 12 12-7.1 1.4-10.8 5.2-12 12-1.2-6.8-4.9-10.6-12-12C7.1 10.6 10.8 6.8 12 0z"/></symbol>
    <symbol id="s-h" viewBox="0 0 24 24"><path d="M12 21C6 15.9 2.4 12.4 2.4 8.6 2.4 5.6 4.8 3.4 7.6 3.4c1.8 0 3.4.9 4.4 2.3 1-1.4 2.6-2.3 4.4-2.3 2.8 0 5.2 2.2 5.2 5.2 0 3.8-3.6 7.3-9.6 12.4z"/></symbol>
    <symbol id="s-d" viewBox="0 0 24 24"><path d="M12 1.5 20 12l-8 10.5L4 12z"/></symbol>
    <symbol id="s-s" viewBox="0 0 24 24"><path d="M12 2c4.8 4.6 8.4 7.6 8.4 11 0 2.6-2 4.6-4.5 4.6-1.2 0-2.3-.5-3.1-1.3.2 1.9.9 3.5 2.2 4.7v1H9v-1c1.3-1.2 2-2.8 2.2-4.7-.8.8-1.9 1.3-3.1 1.3-2.5 0-4.5-2-4.5-4.6C3.6 9.6 7.2 6.6 12 2z"/></symbol>
    <symbol id="s-c" viewBox="0 0 24 24"><path d="M12 2.2a4 4 0 0 1 4 4c0 .8-.3 1.6-.7 2.3a4 4 0 1 1-1.9 7 8 8 0 0 0 1.9 4.5v1H8.7v-1a8 8 0 0 0 1.9-4.5 4 4 0 1 1-1.9-7 4 4 0 0 1-.7-2.3 4 4 0 0 1 4-4z"/></symbol>
  </defs>
</svg>

<nav>
  <div class="wrap nav-in">
    <a class="brand" href="#top"><b>Kouzlíme s Robinem</b><span>kouzelník · balónkář · mentalista</span></a>
    <div class="nav-links">
      <a href="#top">Domů</a>
      <a href="#robin">O mě</a>
      <a href="#ukazka">Ukázka představení</a>
      <a href="#cena">Ceník</a>
      <a href="#kontakt">Kontakt</a>
    </div>
  </div>
</nav>

<header class="hero" id="top">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow"><svg class="st"><use href="#star"/></svg>Kouzelník Robin Panuš — Praha a okolí</p>
      <h1>
        <span class="line"><span>Umění</span></span>
        <span class="line"><span><em>úžasu</em> pro</span></span>
        <span class="line"><span>malé i velké.</span></span>
      </h1>
      <p class="lead">Kouzelnická show, balónková zvířátka a mentalismus v jednom vystoupení. Pro dětské oslavy, školky i firemní večery — vždy naživo, vždy s dětmi uprostřed dění.</p>
      <div class="cta-row">
        <a class="btn btn-ink" href="#kouzlo">Zkusit si kouzlo<svg class="st"><use href="#star"/></svg></a>
        <a class="btn btn-ghost" href="#disciplina">Prohlédnout nabídku</a>
      </div>
      <div class="hero-stats">
        <div class="hstat"><b><span data-count="11">0</span><em>+</em></b><span>let na jevišti</span></div>
        <div class="hstat"><b>3<em>v</em>1</b><span>kouzla · balónky · mentalismus</span></div>
        <div class="hstat"><b><span data-count="45">0</span><em>′</em></b><span>show na míru</span></div>
      </div>
    </div>
    <div class="hero-visual">
      <div class="hero-luxe">
        <div class="hero-luxe__frame">
          <span class="hero-luxe__corner hero-luxe__corner--tl" aria-hidden="true">✦</span>
          <span class="hero-luxe__corner hero-luxe__corner--tr" aria-hidden="true">✦</span>
          <span class="hero-luxe__corner hero-luxe__corner--bl" aria-hidden="true">✦</span>
          <span class="hero-luxe__corner hero-luxe__corner--br" aria-hidden="true">✦</span>
          <div class="hero-luxe__mat">
            <div class="hero-luxe__viewport">
              <div class="arch"><img src="/luxury/img-01.jpg" alt="Kouzelník Robin Panuš — portrét"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="arch-echo" aria-hidden="true"></div>
      <svg class="seal" viewBox="0 0 132 132" aria-hidden="true">
        <circle class="disc" cx="66" cy="66" r="66"/>
        <defs><path id="cir" d="M66,66 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs>
        <text><textPath href="#cir">11 LET NA JEVIŠTI · PRAHA ·&#160;</textPath></text>
        <path class="core" d="M66 50c1.6 9 6.5 14 16 16-9.5 1.9-14.4 6.9-16 16-1.6-9.1-6.5-14.1-16-16 9.5-2 14.4-7 16-16z"/>
      </svg>
    </div>
  </div>
</header>

<div class="marquee" aria-hidden="true">
  <div class="mq-track" id="mq"></div>
</div>

<section class="cards-sec" id="disciplina">
  <div class="wrap">
    <div class="cards-head reveal">
      <p class="eyebrow"><svg class="st"><use href="#star"/></svg>Tři disciplíny<svg class="st"><use href="#star"/></svg></p>
      <h2>Vyberte si <em>kartu.</em></h2>
      <p class="lead" style="margin-left:auto;margin-right:auto">Každé vystoupení skládám z toho, co se hodí právě pro vaši akci — nebo všechny tři dohromady.</p>
    </div>
    <div class="fan reveal d1">
      <article class="pcard" data-i="0" tabindex="0" role="button" aria-label="Kouzelník — kliknutím otočíte kartu">
        <div class="pc-inner">
          <div class="pc-face">
            <div class="idx"><b>K</b><svg class="st"><use href="#star"/></svg></div>
            <div class="ph"><img src="/luxury/img-02.jpg" alt="Robin při kouzelnickém triku se šátky"></div>
            <h3>Kouzelník</h3>
            <p>Interaktivní kouzla plná humoru pro předškoláky, školáky i dospělé publikum.</p>
            <div class="idx flip"><b>K</b><svg class="st"><use href="#star"/></svg></div>
          </div>
          <div class="pc-face pc-back">
            <svg class="st"><use href="#star"/></svg>
            <h4>Kouzelník</h4>
            <ul><li>Oslavy · školky · 1. stupeň ZŠ</li><li>Děti asistují na jevišti</li><li>Humor pro celou rodinu</li></ul>
            <span class="flip-hint">Kliknutím otočíte zpět</span>
          </div>
        </div>
      </article>
      <article class="pcard" data-i="1" tabindex="0" role="button" aria-label="Balónkář — kliknutím otočíte kartu">
        <div class="pc-inner">
          <div class="pc-face">
            <div class="idx"><b>B</b><svg class="st"><use href="#star"/></svg></div>
            <div class="ph"><img src="/luxury/img-03.jpg" alt="Robin tvoří modrého balónkového pejska"></div>
            <h3>Balónkář</h3>
            <p>Zvířátka, meče i květiny na počkání — každé dítě si odnese svoje domů.</p>
            <div class="idx flip"><b>B</b><svg class="st"><use href="#star"/></svg></div>
          </div>
          <div class="pc-face pc-back">
            <svg class="st"><use href="#star"/></svg>
            <h4>Balónkář</h4>
            <ul><li>Pejsci, meče i květiny</li><li>Tvorba přímo před očima</li><li>Výtvor pro každé dítě domů</li></ul>
            <span class="flip-hint">Kliknutím otočíte zpět</span>
          </div>
        </div>
      </article>
      <article class="pcard" data-i="2" tabindex="0" role="button" aria-label="Mentalista — kliknutím otočíte kartu">
        <div class="pc-inner">
          <div class="pc-face">
            <div class="idx"><b>M</b><svg class="st"><use href="#star"/></svg></div>
            <div class="ph"><img src="/luxury/img-04.jpg" alt="Robin předvádí mentalismus"></div>
            <h3>Mentalista</h3>
            <p>Čtení myšlenek a překvapivé triky u stolu — ideální zvláštnění firemního večera.</p>
            <div class="idx flip"><b>M</b><svg class="st"><use href="#star"/></svg></div>
          </div>
          <div class="pc-face pc-back">
            <svg class="st"><use href="#star"/></svg>
            <h4>Mentalista</h4>
            <ul><li>Firemní večery a rauty</li><li>Mikromagie u stolu</li><li>Čtení myšlenek naživo</li></ul>
            <span class="flip-hint">Kliknutím otočíte zpět</span>
          </div>
        </div>
      </article>
    </div>
    <p class="fan-hint">Najeďte na kartu — kliknutím ji otočíte</p>
  </div>
</section>

<section class="program" id="ukazka">
  <div class="wrap prog-grid">
    <div class="prog-left reveal">
      <p class="eyebrow"><svg class="st"><use href="#star"/></svg>Průběh vystoupení</p>
      <h2>Jak vypadá <em>show.</em></h2>
      <p class="lead">Čtyřicet pět minut, které utečou jako pět. Program vždy ladím podle věku dětí a povahy akce.</p>
    </div>
    <div>
      <div class="step reveal"><div class="rn">I.</div><div><h3>Přivítání a první kouzlo</h3><p>Prolomení ledů — děti se během pár minut stanou součástí představení.</p></div></div>
      <div class="step reveal d1"><div class="rn">II.</div><div><h3>Interaktivní kouzelnická show</h3><p>Triky, u kterých děti asistují na jevišti. Smích a údiv v jednom.</p></div></div>
      <div class="step reveal d2"><div class="rn">III.</div><div><h3>Balónková zvířátka</h3><p>Pejsci, meče a květiny pro každého — vyráběné přímo před očima.</p></div></div>
      <div class="step reveal d3"><div class="rn">IV.</div><div><h3>Velké finále</h3><p>Závěrečné kouzlo, o kterém se doma mluví ještě týden.</p></div></div>
    </div>
  </div>
</section>

<section class="gal-sec" id="galerie">
  <div class="wrap gal-head reveal">
    <div>
      <p class="eyebrow"><svg class="st"><use href="#star"/></svg>Z vystoupení</p>
      <h2>Okamžiky, u kterých <em>spadne brada.</em></h2>
    </div>
    <p class="gal-hint">Klikněte na fotku<svg class="st"><use href="#star"/></svg></p>
  </div>
  <div class="gal-viewport">
    <div class="strip strip--marquee" id="strip">
      <figure class="gph" data-lightbox><img src="/luxury/img-05.jpg" alt="Robin tvaruje balónek na pódiu"></figure>
      <figure class="gph" data-lightbox><img src="/luxury/img-06.jpg" alt="Robin s červeným balónkovým pudlem"></figure>
      <figure class="gph wide" data-lightbox><img src="/luxury/img-07.jpg" alt="Robin předvádí kouzelnou knihu dětem"></figure>
      <figure class="gph" data-lightbox><img src="/luxury/img-08.jpg" alt="Robin s loutkou mývala"></figure>
      <figure class="gph" data-lightbox><img src="/luxury/img-09.jpg" alt="Kouzelnický trik s barevnými šátky"></figure>
      <figure class="gph" data-lightbox><img src="/luxury/img-10.jpg" alt="Kouzelnický trik s míčky"></figure>
      <figure class="gph" data-lightbox><img src="/luxury/img-11.jpg" alt="Robin s balónkovým pejskem"></figure>
    </div>
  </div>
</section>

<div class="lightbox" id="lightbox" hidden aria-hidden="true">
  <button class="lightbox-close" type="button" aria-label="Zavřít">×</button>
  <figure class="lightbox-inner">
    <img id="lightbox-img" src="" alt="">
    <figcaption id="lightbox-cap"></figcaption>
  </figure>
</div>

<section class="quote">
  <div class="wrap reveal">
    <p class="eyebrow" style="justify-content:center"><svg class="st"><use href="#star"/></svg>Řekli o Robinovi</p>
    <figure>
      <blockquote>„Udržet pozornost dvaceti předškoláků celých čtyřicet pět minut — to je samo o sobě kouzlo."</blockquote>
      <figcaption>maminka oslavenkyně · narozeniny, Praha</figcaption>
    </figure>
  </div>
</section>

<section class="balloon-sec" id="kouzlo">
  <div class="wrap">
    <div class="balloon-panel reveal">
      <span class="eyebrow"><svg class="st"><use href="#star"/></svg>Malé kouzlo pro vás</span>
      <h2>Praskni balónek, <span class="balloon-em">co vyrobí Robin?</span></h2>
      <p class="balloon-lead">Klikni na balónky a nech se překvapit, jaké zvířátko ti Robin vykouzlí. Pokaždé něco jiného!</p>
      <div class="popstage" id="popstage">
        <div class="cluster" id="cluster" role="button" tabindex="0" aria-label="Prasknout balónky">
          <img src="/balloon-cluster.png" alt="" class="cluster-art" width="600" height="591" draggable="false">
          <span class="cluster-hint">Praskni mě! ✦</span>
        </div>
        <div class="reward" id="reward"></div>
      </div>
      <button class="btn btn-primary pop-btn" id="popBtn" style="display:none" type="button">Prasknout další<svg class="st"><use href="#star"/></svg></button>
      <p class="trick-final" id="tfinal">A tohle všechno zažijete naživo. ✦</p>
    </div>
  </div>
</section>

<section class="price-sec" id="cena">
  <div class="wrap">
    <div class="reveal" style="text-align:center;max-width:640px;margin:0 auto">
      <p class="eyebrow" style="justify-content:center"><svg class="st"><use href="#star"/></svg>Program a cena</p>
      <h2>Vaše <em>vstupenka.</em></h2>
    </div>
    <div class="ticket reveal d1">
      <div class="tk-main">
        <span class="tk-tag">Nejčastější volba</span>
        <h3>Kouzelnická show · 45 minut</h3>
        <ul class="tk-list">
          <li><svg class="st"><use href="#star"/></svg>Interaktivní kouzla s dětmi</li>
          <li><svg class="st"><use href="#star"/></svg>Balónkové zvířátko pro každého</li>
          <li><svg class="st"><use href="#star"/></svg>Program dle věku publika</li>
          <li><svg class="st"><use href="#star"/></svg>Vlastní ozvučení i rekvizity</li>
          <li><svg class="st"><use href="#star"/></svg>Oslavenec v hlavní roli</li>
          <li><svg class="st"><use href="#star"/></svg>Velké finále na závěr</li>
        </ul>
        <div class="price-calc">
          <label class="price-calc__label" for="eventType">Typ akce</label>
          <select class="price-calc__select" id="eventType">
            <option value="6000">Narozeninová oslava · 6 000 Kč</option>
            <option value="6000">Školka / mateřská škola · 6 000 Kč</option>
            <option value="6500">Základní škola · 6 500 Kč</option>
            <option value="7000">Městská slavnost · 7 000 Kč</option>
            <option value="7500">Firemní akce · 7 500 Kč</option>
            <option value="6000">Veřejná akce · 6 000 Kč</option>
            <option value="6000">Soukromá akce · 6 000 Kč</option>
          </select>
          <label class="price-calc__label" for="distanceKm">Vzdálenost od Mladé Boleslavi (km)</label>
          <input class="price-calc__input" id="distanceKm" type="number" min="0" step="1" value="0" inputmode="numeric">
          <p class="price-calc__note">Doprava: 12 Kč/km (výjezd z MB). Finální cenu upravím podle rozsahu a typu akce.</p>
          <p class="price-calc__total" id="priceTotal" aria-live="polite">Celkem: <strong>6 000 Kč</strong> (vystoupení 6 000 Kč + doprava 0 Kč)</p>
        </div>
        <p class="tk-note">Chystáte akci pro školku, obec nebo firmu? Napište mi pár řádků a připravím program i cenu přesně na míru.</p>
      </div>
      <div class="tk-side">
        <span class="from">Cena od</span>
        <div class="amt" id="ticketAmt">6 000 <small>Kč</small></div>
        <span class="per" id="ticketPer">za vystoupení + 12 Kč/km (výjezd MB)</span>
        <a class="btn btn-ink" href="#kontakt">Rezervovat termín<svg class="st"><use href="#star"/></svg></a>
      </div>
    </div>
  </div>
</section>

<section class="about" id="robin">
  <div class="wrap about-grid">
    <div class="about-visual reveal">
      <div class="arch"><img src="/luxury/img-12.jpg" alt="Kouzelník Robin Panuš při vystoupení"></div>
      <div class="arch-echo" aria-hidden="true"></div>
    </div>
    <div class="reveal d1">
      <p class="eyebrow"><svg class="st"><use href="#star"/></svg>O Robinovi</p>
      <h2>Jedenáct let <em>na jevišti.</em></h2>
      <p class="lead">Kouzlím od dětství a posledních jedenáct let se tomu věnuji naplno. Vystupuji pro školky, základní školy a rodinné oslavy, s mikromagií jsem soutěžil i mezi profesionály.</p>
      <p class="lead">Nejvíc mě baví ten okamžik, kdy dítě poprvé uvěří, že kouzla existují. Kvůli němu jezdím po Praze i daleko za ni.</p>
      <p class="sig">— Robin Panuš</p>
    </div>
  </div>
</section>

<section class="contact" id="kontakt">
  <div class="wrap reveal">
    <p class="eyebrow" style="justify-content:center"><svg class="st"><use href="#star"/></svg>Kontakt · Praha a okolí</p>
    <h2>Domluvme si <em>termín.</em></h2>
    <a class="big-tel" href="tel:+420775950328">775 950 328</a>
    <a class="mail" href="mailto:info@kouzlimesrobinem.cz">info@kouzlimesrobinem.cz</a>
    <form class="contact-form" id="contactForm" novalidate>
      <input type="text" name="website" class="contact-hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <input name="name" type="text" placeholder="Jméno" autocomplete="name">
      <input name="email" type="email" required placeholder="E-mail *" autocomplete="email">
      <input name="phone" type="tel" required placeholder="Telefon *" autocomplete="tel">
      <textarea name="message" rows="4" placeholder="Typ akce, datum, místo…"></textarea>
      <button class="btn btn-ink" type="submit">Odeslat zprávu<svg class="st"><use href="#star"/></svg></button>
    </form>
    <div class="contact-thanks" id="contactThanks" hidden>
      <p>Děkujeme za zprávu, už letí Robinovi do E-mailu, ozve se co nejdříve.</p>
    </div>
  </div>
</section>

<footer>
  <div class="wrap foot">
    <span>© 2026 Kouzlíme s Robinem — Robin Panuš</span>
    <span>Praha a okolí · www.kouzlimesrobinem.cz</span>
  </div>
</footer>`;

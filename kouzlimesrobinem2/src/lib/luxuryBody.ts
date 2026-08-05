export const luxuryBodyTemplate = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
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
    <a class="brand" href="#top"><b>{{cms.brand.name}}</b><span>{{cms.brand.tagline}}</span></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="navMenu" aria-label="Otevřít menu">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>
    <div class="nav-links" id="navMenu">
      <a href="#top">Domů</a>
      <a href="#robin">O mně</a>
      <a href="#galerie">Ukázka představení</a>
      <a href="#z-vystoupeni">Z vystoupení</a>
      <a href="#cena">Ceník</a>
      <a href="#rezervace">Rezervace</a>
      <a href="#kontakt">Kontakt</a>
    </div>
  </div>
</nav>

<header class="hero" id="top">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <h1>
        <span class="line"><span>{{cms.hero.line1}}</span></span>
        <span class="line"><span>{{cms.hero.line2Before}}<em>{{cms.hero.line2Em}}</em>{{cms.hero.line2After}}</span></span>
        <span class="line"><span>{{cms.hero.line3}}</span></span>
      </h1>
      <p class="lead">{{cms.hero.lead}}</p>
      <div class="cta-row">
        <a class="btn btn-ink" href="#disciplina">{{cms.hero.ctaPrimary}}<svg class="st"><use href="#star"/></svg></a>
        <a class="btn btn-ghost" href="#balonky" id="openBalloons" data-open-balloons>{{cms.hero.ctaSecondary}}</a>
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
              <div class="arch"><img src="{{cms.hero.image}}" alt="{{cms.hero.imageAlt}}"></div>
            </div>
          </div>
        </div>
      </div>
      <svg class="seal" viewBox="0 0 132 132" aria-hidden="true">
        <circle class="disc" cx="66" cy="66" r="66"/>
        <defs><path id="cir" d="M66,66 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs>
        <text><textPath href="#cir">{{cms.hero.seal}}&#160;</textPath></text>
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
      <h2>{{cms.disciplines.titleBefore}}<em>{{cms.disciplines.titleEm}}</em></h2>
      <p class="lead" style="margin-left:auto;margin-right:auto">{{cms.disciplines.lead}}</p>
    </div>
    <div class="fan reveal d1">
      {{cms.disciplines.cards}}
    </div>
    <p class="fan-hint">Klepnutím / kliknutím kartu otočíte</p>
  </div>
</section>

<section class="gal-sec" id="galerie">
  <div class="wrap gal-head reveal">
    <div>
      <h2>{{cms.gallery.titleBefore}}<em>{{cms.gallery.titleEm}}</em></h2>
    </div>
    <p class="gal-hint">Klikněte na fotku<svg class="st"><use href="#star"/></svg></p>
  </div>
  <div class="gal-viewport">
    <div class="strip strip--marquee" id="strip">
      {{cms.gallery.images}}
    </div>
  </div>
</section>

<div class="lightbox" id="lightbox" hidden aria-hidden="true">
  <button class="lightbox-close" type="button" aria-label="Zavřít">×</button>
  <button class="lightbox-prev" type="button" aria-label="Předchozí fotka">‹</button>
  <button class="lightbox-next" type="button" aria-label="Další fotka">›</button>
  <figure class="lightbox-inner">
    <img id="lightbox-img" src="" alt="">
    <figcaption id="lightbox-cap"></figcaption>
  </figure>
</div>

<section class="quote">
  <div class="wrap reveal">
    <figure>
      <blockquote>{{cms.quote.text}}</blockquote>
      <figcaption>{{cms.quote.caption}}</figcaption>
    </figure>
  </div>
</section>

<section class="price-sec" id="cena">
  <div class="wrap">
    <div class="reveal" style="text-align:center;max-width:640px;margin:0 auto">
      <h2>{{cms.pricing.titleBefore}}<em>{{cms.pricing.titleEm}}</em></h2>
      <p class="lead" style="margin-left:auto;margin-right:auto">{{cms.pricing.lead}}</p>
    </div>
    <div class="ticket reveal d1">
      <div class="tk-main">
        <div class="tk-price-block tk-price-block--main">
          <span class="from">{{cms.pricing.priceLabel}}</span>
          <div class="amt">{{cms.pricing.priceAmount}} <small>{{cms.pricing.priceCurrency}}</small></div>
          <span class="per">{{cms.pricing.pricePer}}</span>
          <p class="tk-note">{{cms.pricing.priceNote}}</p>
        </div>
      </div>
      <div class="tk-side">
        <div class="tk-price-row">
          <span class="from">{{cms.pricing.travelLabel}}</span>
          <div class="amt amt-sm">{{cms.pricing.travelAmount}} <small>{{cms.pricing.travelUnit}}</small></div>
          <span class="per">{{cms.pricing.travelPer}}</span>
          <p class="tk-side-note">{{cms.pricing.travelNote}}</p>
        </div>
        <a class="btn btn-ink" href="#rezervace">Rezervovat termín<svg class="st"><use href="#star"/></svg></a>
      </div>
    </div>

    <div class="price-booking booking-sec{{cms.contact.bookingSecClass}}" id="rezervace">
      <div class="booking-head reveal">
        <h2>Rezervace <em>termínu.</em></h2>
        <p class="lead">Vyberte si volný termín. Po rezervaci přijde potvrzení e-mailem a termín se propsíše přímo do Robinova Google Kalendáře.</p>
      </div>
      <div class="booking-embed reveal d1" id="bookingEmbed">
        {{cms.contact.bookingEmbed}}
      </div>
      <div class="booking-fallback reveal d1">
        <p>Online kalendář se právě napojuje. Zatím napište přes <a href="#kontakt">kontaktní formulář</a> — ozveme se s termíny.</p>
        <a class="btn btn-ink" href="#kontakt">Napsat Robinovi<svg class="st"><use href="#star"/></svg></a>
      </div>
    </div>
  </div>
</section>

<section class="about" id="robin">
  <div class="wrap about-grid">
    <div class="about-visual reveal">
      <div class="arch"><img src="{{cms.about.image}}" alt="{{cms.about.imageAlt}}"></div>
    </div>
    <div class="reveal d1">
      <p class="eyebrow"><svg class="st"><use href="#star"/></svg>{{cms.about.eyebrow}}</p>
      <h2>{{cms.about.titleBefore}}<em>{{cms.about.titleEm}}</em></h2>
      <p class="lead">{{cms.about.lead1}}</p>
      <p class="lead">{{cms.about.lead2}}</p>
      <p class="sig">{{cms.about.signature}}</p>
    </div>
  </div>
</section>

<section class="moments-sec" id="z-vystoupeni">
  <div class="wrap moments-head reveal">
    <div>
      <h2>{{cms.moments.titleBefore}}<em>{{cms.moments.titleEm}}</em></h2>
      <p class="lead">{{cms.moments.lead}}</p>
    </div>
    <p class="gal-hint">Fotky z akcí<svg class="st"><use href="#star"/></svg></p>
  </div>
  <div class="moments-viewport reveal d1">
    <div class="strip strip--marquee moments-strip" id="moments-strip" data-lb-group>
      {{cms.moments.images}}
    </div>
  </div>
</section>

<section class="contact" id="kontakt">
  <div class="wrap reveal">
    <h2>{{cms.contact.titleBefore}}<em>{{cms.contact.titleEm}}</em></h2>
    <span class="big-tel">{{cms.contact.phoneDisplay}}</span>
    <span class="mail">{{cms.contact.email}}</span>
    <form class="contact-form" id="contactForm" novalidate>
      <input type="text" name="website" class="contact-hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <input name="name" type="text" required placeholder="Jméno *" autocomplete="name" maxlength="120">
      <input name="email" type="email" required placeholder="E-mail *" autocomplete="email" maxlength="254">
      <input name="phone" type="tel" required placeholder="Telefon *" autocomplete="tel" maxlength="30">
      <textarea name="message" rows="4" placeholder="Poznámka (volitelné)" maxlength="5000"></textarea>
      <label class="contact-consent">
        <input type="checkbox" name="consent" value="1" required>
        <span>Souhlasím se <a href="/ochrana-udaju" target="_blank" rel="noopener noreferrer">zpracováním osobních údajů</a> za účelem vyřízení poptávky. *</span>
      </label>
      <div class="contact-turnstile" id="contactTurnstile" aria-label="Ověření proti robotům"></div>
      <button class="btn btn-ink" type="submit">Odeslat zprávu<svg class="st"><use href="#star"/></svg></button>
    </form>
    <div class="contact-thanks" id="contactThanks" hidden>
      <p>{{cms.contact.thanks}}</p>
    </div>
  </div>
</section>

<section class="kouzla-sec" id="kouzla">
  <div class="trick trick-cards">
    <div class="wrap">
      <div class="reveal" style="text-align:center;max-width:660px;margin:0 auto">
        <h2>Přečtu vám <em>myšlenky.</em></h2>
        <p class="lead">Zapamatujte si <strong style="color:var(--ivory)">jednu</strong> z šesti karet. Jen v duchu — nikam neklikejte. Soustřeďte se na ni&hellip; a pak nechte zamíchat.</p>
      </div>
      <div class="tcards reveal d1" id="tcards" aria-live="polite"></div>
      <p class="trick-msg" id="tmsg"></p>
      <div class="trick-ctas reveal d2">
        <button class="btn btn-amber" id="tbtn" type="button">Zamíchat karty<svg class="st"><use href="#star"/></svg></button>
      </div>
    </div>
  </div>
</section>

<div class="balloon-modal" id="balloonModal" hidden aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="balloonModalTitle">
  <div class="balloon-modal__backdrop" data-close-balloons></div>
  <div class="balloon-modal__panel">
    <button class="balloon-modal__close" type="button" aria-label="Zavřít" data-close-balloons>×</button>
    <div class="balloon-panel">
      <div class="balloon-copy">
        <span class="balloon-kicker">Malé kouzlo na zkoušku</span>
        <h2 id="balloonModalTitle">Praskni balonek a zjisti, <span class="balloon-em">co ti Robin vyrobí</span></h2>
        <p class="balloon-lead">Máš dva pokusy. Klepni na balonky a nech se překvapit.</p>
        <div class="balloon-progress" aria-live="polite">
          <span class="balloon-progress__dot is-active"></span>
          <span class="balloon-progress__dot"></span>
          <span class="balloon-progress__label" id="balloonProgress">1. ze 2 pokusů</span>
        </div>
      </div>
      <div class="popstage" id="popstage">
        <div class="cluster" id="cluster" role="button" tabindex="0" aria-label="Prasknout balónky">
          <img src="/balloon-cluster.png" alt="" class="cluster-art" width="600" height="591" draggable="false">
          <span class="cluster-hint">Praskni mě! ✦</span>
        </div>
        <div class="reward" id="reward"></div>
      </div>
      <div class="balloon-actions">
        <button class="btn btn-primary pop-btn" id="popBtn" style="display:none" type="button">Prasknout podruhé<svg class="st"><use href="#star"/></svg></button>
        <a class="btn btn-ink pop-cta" id="popCta" href="#rezervace" style="display:none" data-close-balloons>Objednat Robina<svg class="st"><use href="#star"/></svg></a>
        <p class="trick-final" id="tfinal">A tohle všechno zažijete naživo. ✦</p>
      </div>
    </div>
  </div>
</div>

<footer>
  <div class="wrap foot">
    <span>{{cms.footer.copy}}</span>
    <div class="foot-links">
      <a href="/obchodni-podminky">Obchodní podmínky</a>
      <a href="/ochrana-udaju">Ochrana údajů</a>
      <a class="foot-credit" href="https://niadobysar.com" target="_blank" rel="noopener noreferrer">Web · Nia Dobyšar</a>
    </div>
  </div>
</footer>`;

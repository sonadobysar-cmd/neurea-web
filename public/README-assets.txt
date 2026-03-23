Složka public/ — soubory dostupné přímo na webu.

• neurea-hero-lockup.png — hlavní logo v úvodní sekci (symbol + nápis NEUREA).
  Doporučeno: PNG s opravdovou průhledností (alfa), bez černého pozadí — na webu se zobrazuje
  na tmavém „medailonu“, takže i export s černým pozadím vizuálně splyne.
  Cesta a rozměry: heroSymbolUrl + heroSymbolSize ve src/lib/site.ts.

  V hero je jemná 3D animace (logo-3d) + „dýchání“ (logo-float) — viz vzor luxusní kliniky v docs/ZADANI.md.
  Nastavení: tailwind.config.ts → keyframes logo3d / animation logo-3d.

  Chcete točit jen horní symbol, ne text? Nahrajte zvlášť jen symbol (PNG) a upravíme layout.

• neurea-wordmark.svg — volitelné; hlavička teď používá text NEUREA (viz Header.tsx). wordmarkUrl ve site.ts může zůstat null.

• Hero video (volitelné, jako theaeonclinic.com) — MP4 v public/, např. neurea-hero.mp4.
  V Canvě: Sdílet → Stáhnout → Video (MP4). Do src/lib/site.ts nastavte heroVideoUrl:
  "/neurea-hero.mp4" a volitelně heroVideoPosterUrl na JPG/PNG prvního snímku (lepší LCP).
  Formát: H.264/AAC je nejširší podpora v prohlížečích. Když heroVideoUrl zůstane null,
  zobrazí se fallback: gradient + statické logo s animací.

• Záložní soubory (1.svg, 4.svg, …) můžete po kontrole smazat.

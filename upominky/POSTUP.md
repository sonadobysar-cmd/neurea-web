# Upomínky — iPhone, krok za krokem

> Appka je **jen pro iPhone**. Mac nepotřebuješ — Xcode na Macu slouží jen k instalaci na telefon.

---

## 1. Otevři projekt

Ve Finderu: **Neurea → upominky** → dvakrát klikni **`OTEVRI-APKU.command`**

---

## 2. Připoj iPhone

1. Kabel iPhone ↔ Mac
2. iPhone **odemčený**
3. **Důvěřovat** tomuto počítači

---

## 3. Apple ID v Xcode (jednou)

1. **Xcode** → **Settings** → **Accounts**
2. **+** → **Apple ID** → přihlas se

---

## 4. Signing

1. Vlevo **Upominky** → **Signing & Capabilities**
2. **Automatically manage signing** ✓
3. **Team:** Sona Dobyšar
4. Když je červená chyba → **Try Again**
5. Pokud pořád červená → smaň **iCloud** capability (✕), pokud tam je

---

## 5. Nainstaluj na iPhone

1. Nahoře vyber **svůj iPhone** (ne simulátor, ne My Mac)
2. **▶ Play** (`Cmd + R`)
3. Počkej 2–5 minut

---

## 6. Na iPhonu

1. **Důvěřovat vývojáři:** Nastavení → Obecné → Správa VPN a zařízení → Důvěřovat
2. Otevři **Upomínky** na ploše
3. **Pokračovat** → povol **notifikace**
4. **+** → přidej plán se štítkem

---

## Používání

| Chceš… | Udělej… |
|--------|---------|
| Přidat plán | **+** → co, kdy, štítek → Uložit |
| Vlastní štítek | Ikona **štítku** vlevo nahoře |
| Filtrovat | Klepni na pastelovou stuhu nahoře |
| Upravit plán | Klepni na kartu nebo tužku |
| Smazat | Ikona koše na kartě |

---

## Rezervace z niadobysar.com (automaticky)

Když někdo rezervuje konzultaci na webu, **sama se objeví v appce** s připomínkami. Sync token i Vercel Blob jsou už nastavené — stačí **▶ Play** v Xcode.

Rezervace se ukládají do kategorie **Práce**. Obsazené časy na webu se automaticky skrývají.

---

## Důležité

- **Xcode na Macu** = jen „dílna“ na instalaci, appku používáš na **iPhonu**
- **Kabel potřebuješ jen na instalaci a update** — appka pak běží sama, telefon může být odpojený
- Po **~7 dnech** appka může přestat otevírat → připoj k Macu, znovu **▶ Play** (bez mazání appky)
- Plány jsou **jen v telefonu** (bez syncu mezi zařízeními)
- Drž telefon **na výšku** (portrait) — appka není na šířku

### ⚠️ Máš dvě ikony Upomínky?

To vzniklo změnou identifikátoru appky — každá ikona = jiná appka = **jiná data**.

1. Na iPhonu **podrž prst** na ikoně → zjisti, která má tvoje plány (ta starší)
2. **Tu prázdnou / novou smaž** (Odstranit appku)
3. V Xcode **▶ Play** — aktualizuje se ta správná, data zůstanou

### ⚠️ Nikdy nemazej appku při updatu!

- Novou verzi nainstaluješ jen **▶ Play** v Xcode — **data zůstanou**
- Když appku z plochy **smažeš** (Odstranit appku), **zmizí všechny plány**
- Ikona se neaktualizuje? Pořád jen **▶ Play**, **nemazat**

---

## Když něco nejde

Pošli screenshot z Xcode — opravím to.

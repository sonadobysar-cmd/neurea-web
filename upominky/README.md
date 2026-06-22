# Upomínky — osobní appka s automatickými připomínkami

Zadáš **co** a **kdy** — appka sama pošle notifikace (jako SMS po rezervaci u kliniky):

1. **Večer předem** v 18:00  
2. **Ráno v den D** v 8:00  
3. **1 hodinu před** termínem  

Nic dalšího nastavovat nemusíš.

---

## Co je Xcode?

**Xcode** je bezplatná aplikace od Apple — „dílna“, ve které se iPhone/Mac appky sestaví a nainstalují na tvůj telefon. Je to jako Cursor, ale pro Apple appky.

Na tvém Macu **Xcode zatím není** (je jen vývojářská příprava v příkazové řádce). Bez Xcode appku nespustíš — musíš ho jednou nainstalovat.

---

## Krok 1: Nainstaluj Xcode

1. Otevři **App Store** na Macu (ikona „A“ v Docku nebo Spotlight: `Cmd + mezerník` → napiš **App Store**).
2. Vyhledej **Xcode**.
3. Klikni **Získat** / **Install** (je zdarma, ale velký — cca 12 GB, stahování může trvat).
4. Po instalaci Xcode **jednou otevři** a potvrď licenci / doinstaluj doplňky, pokud se zeptá.

---

## Krok 2: Otevři projekt

1. Ve Finderu jdi do složky `Neurea/upominky/`.
2. Dvakrát klikni na **`Upominky.xcodeproj`** (modrá ikona).
3. Otevře se Xcode s projektem **Upomínky**.

---

## Krok 3: Spusť na Macu (nejjednodušší první test)

1. Nahoře v Xcode je výběr zařízení — klikni a zvol **My Mac (Designed for iPad)** nebo **Mac (Mac Catalyst)**.
2. Stiskni **▶ Play** (nebo `Cmd + R`).
3. Appka se spustí na Macu.
4. Při prvním plánu appka požádá o **povolení notifikací** — klikni **Povolit**.

---

## Krok 4: Nainstaluj na iPhone

1. Připoj iPhone kabelem k Macu (nebo přes Wi‑Fi debugging, až budeš chtít).
2. Na iPhonu potvrď **Důvěřovat tomuto počítači**.
3. V Xcode nahoře vyber **tvůj iPhone** (místo simulátoru).
4. Vlevo klikni na modrý projekt **Upominky** → záložka **Signing & Capabilities**.
5. U **Team** zvol svůj Apple ID (přidej ho přes **Add Account…**, pokud tam není).
6. Stiskni **▶ Play** — appka se nainstaluje na telefon.

> Bez placeného Apple Developer účtu (99 USD/rok) appka na iPhonu funguje, ale po cca 7 dnech ji musíš z Xcode znovu „přehrát“. Pro osobní použití to většinou stačí.

---

## Jak appku používat

1. Klepni **+** → napiš např. „Zubař“ a zvol datum a čas.
2. **Uložit** — hotovo.
3. V seznamu uvidíš, kdy přesně přijdou připomínky.
4. Smazání plánu (swipe doleva) zruší i naplánované notifikace.

---

## Struktura projektu

```
upominky/
  Upominky.xcodeproj    ← otevři v Xcode
  Upominky/
    UpominkyApp.swift
    Models/EventItem.swift
    Services/ReminderScheduler.swift   ← logika 3 připomínek
    Views/...
```

---

## Co zatím není (můžeme doplnit)

- **Sync mezi iPhonem a Macem** přes iCloud — zatím má každé zařízení vlastní data.
- **Vlastní časy připomínek** — teď jsou pevně 18:00 / 8:00 / −1 h.
- **Ikona appky** — v Assets je placeholder; můžeš přidat vlastní obrázek 1024×1024.

Až budeš mít Xcode nainstalované, napiš — projdeme spolu první spuštění nebo doplníme iCloud sync.

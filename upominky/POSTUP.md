# Upomínky — přesný postup krok za krokem

> **Co už je hotové za tebe:** celá appka je naprogramovaná. Ty jen nainstaluješ Xcode, otevřeš projekt a stiskneš Play. Připomínky (večer 18:00, ráno 8:00, 1 h předem) fungují automaticky.

---

## Část A — Dokončení instalace Xcode

### A1. Počkej na stažení
- Xcode je velký (cca 10–12 GB). Nech Mac **na nabíječce** a připojený k internetu.
- V **App Store** u Xcode uvidíš průběh stahování (kruh).

### A2. První spuštění Xcode
1. Po instalaci otevři **Xcode** (Spotlight: `Cmd + mezerník` → napiš **Xcode** → Enter).
2. Pokud se zeptá na **licenci** → klikni **Souhlasím / Agree**.
3. Pokud nabídne **doinstalovat doplňky** → klikni **Install** a počkej (pár minut).
4. Xcode může zůstat otevřené — nebo ho zavři, až bude hotovo.

**Hotovo část A** — Xcode máš připravené.

---

## Část B — Otevření appky (2 kliky)

### B1. Otevři projekt
Ve Finderu jdi do složky:

```
Neurea → upominky
```

**Dvakrát klikni** na soubor:

```
OTEVRI-APKU.command
```

- Mac se může zeptat „opravdu spustit?“ → klikni **Otevřít**.
- Otevře se **Xcode** s projektem Upomínky.

*(Alternativa: dvakrát klikni na modrou ikonu `Upominky.xcodeproj`.)*

### B2. Co uvidíš v Xcode
- **Vlevo** — seznam souborů (nemusíš do nich sahat).
- **Uprostřed** — kód (nemusíš měnit).
- **Nahoře uprostřed** — výběr zařízení (kam appku spustit).
- **Nahoře vlevo** — tlačítko **▶** (Play).

---

## Část C — První spuštění na Macu (doporučeno jako první test)

### C1. Vyber zařízení
1. Nahoře v Xcode klikni na **název zařízení** (např. „iPhone 16“ nebo podobně).
2. V menu zvol jednu z možností:
   - **My Mac (Designed for iPad)**, nebo
   - **Mac (Mac Catalyst)** / **Upominky > My Mac**

### C2. Spusť appku
1. Klikni na **▶ Play** (nebo klávesa `Cmd + R`).
2. První sestavení trvá **2–5 minut** — Xcode „kompiluje“ appku. To je normální.
3. Otevře se okno appky **Upomínky**.

### C3. V appce na Macu
1. Klepni **Pokračovat** → **Začít používat**.
2. Když macOS požádá o **notifikace** → **Povolit**.
3. Klepni **+** → napiš např. „Zkouška appky“ → zvol **zítra** nějaký čas → **Uložit**.
4. V seznamu uvidíš, kdy přijdou připomínky.

**Hotovo část C** — appka na Macu funguje.

---

## Část D — Nainstalování na iPhone

> Udělej až když funguje test na Macu. Potřebuješ **kabel** iPhone ↔ Mac (nebo později Wi‑Fi).

### D1. Připoj iPhone
1. Připoj iPhone kabelem k Macu.
2. Na iPhonu vyskočí „Důvěřovat tomuto počítači?“ → **Důvěřovat** → zadej kód iPhonu.

### D2. Přihlas Apple ID do Xcode (jednou)
1. V Xcode nahoře menu **Xcode** → **Settings…** (nebo **Preferences**).
2. Záložka **Accounts** (Účty).
3. Vlevo dole **+** → **Apple ID** → přihlas se e-mailem a heslem k **iCloudu / Apple ID**.
4. Zavři okno nastavení.

### D3. Podpis appky (Signing)
1. V Xcode **vlevo** klikni na **modrou ikonu Upominky** (úplně nahoře v seznamu).
2. Uprostřed záložka **Signing & Capabilities**.
3. Zaškrtni **Automatically manage signing**.
4. U **Team** vyber své jméno / Apple ID.
   - Pokud píše chybu „Failed to register bundle identifier“ → u **Bundle Identifier** změň na něco unikátního, např. `cz.tvoje-jmeno.upominky` (bez mezer, malá písmena).

### D4. Vyber iPhone a spusť
1. Nahoře v Xcode u zařízení zvol **tvůj iPhone** (název telefonu, ne simulátor).
2. Klikni **▶ Play** (`Cmd + R`).
3. Na iPhonu může vyskočit:
   - **„Untrusted Developer“** → na iPhonu: **Nastavení → Obecné → Správa VPN a zařízení** → tvůj Apple ID → **Důvěřovat**.
4. Appka **Upomínky** se objeví na ploše iPhonu.

### D5. Notifikace na iPhonu
1. Při prvním spuštění povol **notifikace**.
2. Pokud jsi odmítla: **Nastavení → Upomínky → Oznámení → Povolit**.

**Hotovo část D** — appka na iPhonu funguje.

---

## Část E — Jak appku každý den používat

| Chceš… | Udělej… |
|--------|---------|
| Přidat plán | Otevři appku → **+** → co + kdy → **Uložit** |
| Smazat plán | V seznamu **potáhni prstem doleva** na řádku → Smazat |
| Zkontrolovat připomínky | U každého plánu je napsáno, kdy přijdou |

**Nic jiného nastavovat nemusíš** — připomínky jdou samy.

---

## Část F — Důležité věci, které vědět

### Appka na iPhonu po cca 7 dnech přestane otevírat?
- Ano, u **bezplatného** Apple účtu — to je normální.
- **Řešení:** připoj iPhone k Macu, v Xcode klikni **▶ Play** znovu (1 minuta). Data v appce zůstanou.

### Mac a iPhone nemají stejné plány?
- Zatím ano — každé zařízení má vlastní seznam. Sync přes iCloud můžeme doplnit později.

### Xcode znovu neotevírat?
- Na Macu: appku spouštíš z Launchpadu / Aplikací jako normální program.
- Na iPhonu: z plochy. Xcode jen když appku „obnovuješ“ po 7 dnech nebo chceš novou verzi.

---

## Když něco nejde — rychlá pomoc

| Problém | Řešení |
|---------|--------|
| Červená chyba v Xcode | Pošli screenshot — opravím kód |
| „Signing“ chyba | Změň Bundle Identifier (viz D3) |
| Nepřicházejí notifikace | Zkontroluj Nastavení → Upomínky → Oznámení |
| Play je šedé | Nahoře musí být vybrané zařízení (Mac nebo iPhone) |
| Build trvá dlouho | První build 2–5 min je normální |

---

## Co udělám já (v Cursoru), až napíšeš

- Opravím chyby v Xcode (screenshot stačí).
- Změním časy připomínek, vzhled, texty.
- Doplním sync iCloud mezi iPhonem a Macem.
- Pomůžu s ikonou appky.

**Od tebe stačí:** dokončit Xcode → **OTEVRI-APKU.command** → **▶ Play** → napsat, co se stalo.

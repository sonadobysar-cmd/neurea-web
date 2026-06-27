## Cíl
Postavit reálný členský systém: registrace/login → mock checkout → chráněný dashboard s video knihovnou, zápisky, hlasovkami a komunitou.

## Kroky

### 1. Backend (Lovable Cloud)
- Zapnu Lovable Cloud (Supabase pod kapotou).
- Aktivuju Google a Apple login.
- Tabulky:
  - `profiles` — id, display_name, nickname, avatar_url, bio (auto-create přes trigger při registraci)
  - `memberships` — user_id, plan (`month` | `year` | `founder`), status (`active` | `none`), started_at, expires_at
  - `chat_messages` — id, user_id, body, created_at (pro komunitní chat)
  - `notes` — id, title, slug, body, author, published_at, members_only (zápisky/blog)
  - `voicenotes` — id, title, audio_url, duration, published_at, members_only
- RLS: profily a chat čte jen přihlášený; zápisky/hlasovky čte jen člen s `memberships.status = 'active'`.
- Seed: pár ukázkových zápisků, hlasovek a chat zpráv (přes migration).

### 2. Routy
```
/auth                                 — login / registrace (email+heslo, Google, Apple)
/reset-password                       — povinná stránka pro reset hesla
/plus                                 — landing (už existuje) — CTA mění chování dle přihlášení
/plus/checkout                        — mock checkout (po registraci, před vstupem)
/_authenticated/plus/dashboard        — chráněný hub (Domů + featured)
/_authenticated/plus/videa            — video knihovna (epizody z YouTube + bonusy)
/_authenticated/plus/zapisky          — blog/eseje (členský obsah)
/_authenticated/plus/zapisky/$slug    — detail zápisku
/_authenticated/plus/hlasovky         — audio přehrávač list
/_authenticated/plus/chat             — komunitní chat (realtime)
/_authenticated/plus/ucet             — profil + členství + odhlášení
```
Pokud uživatel přijde na `/_authenticated/plus/*` bez aktivního členství → redirect na `/plus/checkout`.

### 3. Mock checkout
- Formulář (jméno, email předvyplněn, výběr plánu, "karta" pole jen pro show).
- Po submitu zavolá server fn, která vloží/updatuje `memberships` na `active` s odpovídajícím `expires_at`.
- Žádné reálné platby — UI a flow ale připravené na pozdější napojení.

### 4. UI / design
- Dashboard navazuje vizuálně na current `/plus` (dark, neon glow, gradients).
- Sidebar s menu (Domů, Videa, Zápisky, Hlasovky, Chat, Účet).
- Hero karta s naposledy přidaným obsahem.
- Mobile: hamburger sidebar.
- Stejné design tokeny (`var(--pink)`, `var(--teal)`, `var(--ink)`).

### 5. Navigace v existujícím webu
- V `SiteHeader` přidám podle stavu přihlášení buď "Přihlásit" nebo "Můj klub" → `/plus/dashboard`.
- Na `/plus` tlačítko "Zaplatit" → pokud nepřihlášený, vede na `/auth?redirect=/plus/checkout`.

### 6. Bezpečnost
- RLS na všech tabulkách, žádné role v `profiles`.
- Server fn pro mock-platbu validuje přihlášení (`requireSupabaseAuth`).
- Chat: insert jen pro aktivní členy.

## Co NEdělám teď
- Reálné platby (Stripe/Paddle) — checkout je mock.
- Email šablony pro Supabase (defaultní stačí).
- Admin sekce (přidávání zápisků a hlasovek půjde zatím přes migration / databázi).
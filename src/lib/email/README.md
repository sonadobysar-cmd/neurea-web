# E-maily po rezervaci

Potvrzení se odesílá **po úspěšné platbě** ve Stripe webhooku (`checkout.session.completed`).

## Kde si zobrazit náhled e-mailu

Po přihlášení do adminu otevři v prohlížeči:

**`/admin/email-preview`**

(nebo z adminu rezervací odkaz **„Náhled e-mailu“**). Uvidíš stejné HTML jako zákazník v schránce (ukázková jména/termín jsou v `mockBooking.ts`).

## Resend (doporučeno)

1. Účet na [resend.com](https://resend.com) → API Keys → vytvoř klíč `re_...`
2. **Domains** → přidej `neurea.cz`, nastav DNS záznamy (SPF/DKIM), počkej na ověření
3. V Vercelu nastav:
   - `RESEND_API_KEY` = tvůj klíč
   - `EMAIL_FROM` = např. `NEUREA <rezervace@neurea.cz>` (adresa z ověřené domény)

Bez ověřené domény můžeš krátce testovat s výchozím odesílatelem `onboarding@resend.dev` (jen pro vývoj).

## Šablona

HTML šablona: `bookingConfirmationHtml.ts` — barvy NEUREA (zlato `#B8963E`), čistá typografie.

---

## SMS (zatím neimplementováno)

Resend **SMS neposílá** — jen e-mail. SMS jde napojit např. přes **Twilio** / **Vonage**: po platbě nebo z cronu zavolat jejich API na číslo z rezervace. Potřeba účet u operátora, souhlas zákazníka se zpracováním tel. čísla a budget (cca haléře–koruny za SMS).

## Připomenutí den předem (zatím neimplementováno)

Typicky: **denní úloha** (Vercel Cron) + projde rezervace na „zítra“ + odešle e-mail (Resend) případně SMS. Vyžaduje spolehlivé uložení rezervací (ideálně databáze, ne jen soubor na serveru).

Až budeš chtít, můžeme to doplnit jako další krok.

# E-maily po rezervaci

Potvrzení se odesílá **po úspěšné platbě** ve Stripe webhooku (`checkout.session.completed`).

## Resend (doporučeno)

1. Účet na [resend.com](https://resend.com) → API Keys → vytvoř klíč `re_...`
2. **Domains** → přidej `neurea.cz`, nastav DNS záznamy (SPF/DKIM), počkej na ověření
3. V Vercelu nastav:
   - `RESEND_API_KEY` = tvůj klíč
   - `EMAIL_FROM` = např. `NEUREA <rezervace@neurea.cz>` (adresa z ověřené domény)

Bez ověřené domény můžeš krátce testovat s výchozím odesílatelem `onboarding@resend.dev` (jen pro vývoj).

## Šablona

HTML šablona: `bookingConfirmationHtml.ts` — barvy NEUREA (zlato `#B8963E`), čistá typografie.

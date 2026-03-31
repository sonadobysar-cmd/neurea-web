import type { Booking } from "@/lib/bookingStore";
import { site } from "@/lib/site";

function formatDateCs(isoDate: string) {
  const d = new Date(`${isoDate}T12:00:00`);
  return new Intl.DateTimeFormat("cs-CZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function buildReminderEmailHtml(booking: Booking): string {
  const when = `${formatDateCs(booking.date)} v ${booking.time}`;
  const brand = site.name;
  const accent = "#B8963E";
  const ink = "#1a1a1a";
  const muted = "#5c5c5c";

  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Připomínka rezervace</title>
</head>
<body style="margin:0;padding:0;background:#f6f4f0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:${ink};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f4f0;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(26,26,26,0.06);">
          <tr>
            <td style="padding:28px 32px 8px 32px;border-bottom:1px solid rgba(184,150,62,0.25);">
              <p style="margin:0;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:${accent};">${brand}</p>
              <h1 style="margin:12px 0 0 0;font-size:22px;font-weight:300;letter-spacing:-0.02em;">Zítra máte rezervaci</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;">
              <p style="margin:0 0 16px 0;font-size:15px;line-height:1.65;color:${ink};">
                Dobrý den, <strong>${escapeHtml(booking.clientName)}</strong>,
              </p>
              <p style="margin:0 0 20px 0;font-size:15px;line-height:1.65;color:${muted};">
                připomínáme návštěvu u ${brand}. Těšíme se na vás.
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#faf9f6;border-radius:12px;border:1px solid rgba(184,150,62,0.2);">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${muted};">Služba</p>
                    <p style="margin:0;font-size:17px;font-weight:500;">${escapeHtml(booking.serviceName)}</p>
                    <p style="margin:14px 0 0 0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${muted};">Termín</p>
                    <p style="margin:4px 0 0 0;font-size:15px;">${escapeHtml(when)}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:22px 0 0 0;font-size:14px;line-height:1.6;color:${muted};">
                Potřebujete změnu termínu? Napište nám co nejdříve na <a href="mailto:${site.email}" style="color:${accent};text-decoration:none;border-bottom:1px solid rgba(184,150,62,0.4);">${site.email}</a>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px 28px 32px;background:#fafafa;border-top:1px solid #eee;">
              <p style="margin:0;font-size:12px;line-height:1.5;color:#888;">
                Tento e-mail je automatická připomínka den před návštěvou.
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0 0;font-size:11px;color:#aaa;">${brand} · ${site.url.replace(/^https?:\/\//, "")}</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type ContactPayload = {
  source: "homepage" | "configurator";
  name: string;
  email: string;
  phone?: string;
  intent: string;
  message: string;
  website?: string;
  configuration?: unknown;
};

export type ContactDelivery = "sent" | "mailto";

function mailtoUrl(to: string, payload: ContactPayload) {
  const subject =
    payload.source === "configurator"
      ? "Poptávka z konfigurátoru FLAX"
      : "Nová poptávka z webu FLAX";
  const configuration = payload.configuration
    ? `\n\nKonfigurace:\n${JSON.stringify(payload.configuration, null, 2)}`
    : "";
  const body = [
    `Jméno: ${payload.name}`,
    `E-mail: ${payload.email}`,
    `Telefon: ${payload.phone || "neuveden"}`,
    `Záměr: ${payload.intent}`,
    "",
    payload.message,
    configuration,
  ].join("\n");

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function deliverContact(
  to: string,
  payload: ContactPayload,
): Promise<ContactDelivery> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) return "sent";
  } catch {
    // The mailto fallback below prevents a lead from being silently lost.
  }

  window.location.href = mailtoUrl(to, payload);
  return "mailto";
}

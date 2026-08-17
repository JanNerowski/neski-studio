import { createServerFn } from "@tanstack/react-start";

import { siteConfig } from "@/config/site";
import { contactSchema, type ContactFormValues, type SubmitContactResult } from "@/lib/contact";

function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function optionalLine(label: string, value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? `${label}: ${trimmed}` : null;
}

function formatMessage(data: ContactFormValues) {
  return [
    `Nowe zapytanie ze strony ${siteConfig.name}`,
    "",
    `Imię: ${data.name}`,
    optionalLine("Firma", data.company),
    `Telefon: ${data.phone}`,
    `E-mail: ${data.email}`,
    optionalLine("Branża", data.industry),
    optionalLine("Strona", data.website),
    optionalLine("Budżet", data.budget),
    optionalLine("Termin", data.timeline),
    "",
    "Wiadomość:",
    data.message,
    "",
    "Zgoda na kontakt: tak",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

async function sendViaFormspree(formId: string, data: ContactFormValues) {
  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company ?? "",
      industry: data.industry ?? "",
      website: data.website ?? "",
      message: data.message,
      budget: data.budget ?? "",
      timeline: data.timeline ?? "",
      _subject: `Zapytanie ze strony: ${data.name}`,
      _replyto: data.email,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("[contact] Formspree rejected the submission", response.status, body);
    throw new Error("delivery_failed");
  }
}

async function sendViaResend(apiKey: string, data: ContactFormValues) {
  const from = env("RESEND_FROM_EMAIL") ?? "NESKI Studio <onboarding@resend.dev>";
  const to = env("CONTACT_TO_EMAIL") ?? siteConfig.contact.email;
  const text = formatMessage(data);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `Zapytanie ze strony: ${data.name}`,
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("[contact] Resend rejected the submission", response.status, body);
    throw new Error("delivery_failed");
  }
}

async function deliver(data: ContactFormValues) {
  const formspreeId = env("FORMSPREE_FORM_ID");
  const resendKey = env("RESEND_API_KEY");

  if (formspreeId) {
    await sendViaFormspree(formspreeId, data);
    return;
  }

  if (resendKey) {
    await sendViaResend(resendKey, data);
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("not_configured");
  }

  console.info("[contact] No delivery provider configured (dev). Submission:", {
    name: data.name,
    email: data.email,
    company: data.company,
  });
}

export const submitContact = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }): Promise<SubmitContactResult> => {
    if (data.honeypot?.trim()) {
      return { ok: true };
    }

    try {
      await deliver(data);
      return { ok: true };
    } catch (error) {
      const reason = error instanceof Error ? error.message : "unknown";
      if (reason === "not_configured") {
        console.error("[contact] Set FORMSPREE_FORM_ID or RESEND_API_KEY to enable delivery.");
      }
      return {
        ok: false,
        error: `Nie udało się wysłać wiadomości. Napisz bezpośrednio na ${siteConfig.contact.email}.`,
      };
    }
  });

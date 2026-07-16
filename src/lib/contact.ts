// Centralized contact / WhatsApp config — edit here to update across the site.
// Use the international format without "+" for wa.me links.
// Set to empty string to hide the WhatsApp CTA.
export const WHATSAPP_NUMBER = "919999999999"; // TODO: replace with real WhatsApp number

export const WHATSAPP_DEFAULT_MESSAGE =
  "Alpha Men பற்றி தெரிஞ்சுக்கணும். Free advisor call வேண்டும்.";

export function whatsappLink(message = WHATSAPP_DEFAULT_MESSAGE) {
  if (!WHATSAPP_NUMBER) return null;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export const siteConfig = {
  name: "NESKI Studio",
  title: "NESKI Studio | Strony internetowe dla firm",
  description:
    "Projekt i wdrożenie strony, widoczność w Google i reklamy. Hosting, poczta i opieka po starcie - w jednym miejscu.",
  url: "https://neskistudio.pl",
  locale: "pl_PL",
  language: "pl",
  contact: {
    email: "kontakt@neskistudio.pl",
    phone: "570 118 116",
  },
  legal: {
    lastUpdated: "17 sierpnia 2026",
  },
  ogImage: {
    path: "/og-image.png",
    alt: "NESKI Studio - strony internetowe, widoczność i reklamy dla firm",
    width: 1200,
    height: 630,
    type: "image/png",
  },
} as const;

export function getAbsoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

export function getTelHref(phone = siteConfig.contact.phone) {
  const digits = phone.replace(/\D/g, "");
  return digits ? `tel:+48${digits}` : "";
}

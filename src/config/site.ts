export const siteConfig = {
  name: "NESKI Studio",
  title: "NESKI Studio | Strony internetowe dla firm",
  description:
    "Pomagam firmom budować silną obecność w sieci, projektując i tworząc nowoczesne strony internetowe.",
  url: "https://neskistudio.pl",
  locale: "pl_PL",
  language: "pl",
  contact: {
    email: "kontakt@neskistudio.pl",
    /** Public phone number. Leave empty until a real number is confirmed. */
    phone: "",
  },
  legal: {
    owner: "Jan Nerowski",
    lastUpdated: "17 sierpnia 2026",
  },
  ogImage: {
    path: "/og-image.png",
    alt: "NESKI Studio - nowoczesne rozwiązania dla biznesu",
    width: 1200,
    height: 630,
    type: "image/png",
  },
} as const;

export function getAbsoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

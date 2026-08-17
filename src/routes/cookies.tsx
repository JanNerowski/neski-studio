import { createFileRoute, Link } from "@tanstack/react-router";

import { LegalLayout, LegalSection } from "@/components/landing/LegalLayout";
import { getAbsoluteUrl, siteConfig } from "@/config/site";

const title = `Cookies | ${siteConfig.name}`;
const description =
  "Informacje o plikach cookies używanych na stronie NESKI Studio oraz o tym, jak możesz nimi zarządzać.";

export const Route = createFileRoute("/cookies")({
  component: CookiesPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: getAbsoluteUrl("/cookies") },
      { property: "og:locale", content: siteConfig.locale },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: getAbsoluteUrl("/cookies") }],
  }),
});

function CookiesPage() {
  return (
    <LegalLayout
      title="Pliki cookies"
      description="Strona korzysta wyłącznie z plików niezbędnych do działania i bezpieczeństwa."
      updated={siteConfig.legal.lastUpdated}
    >
      <LegalSection title="1. Czym są cookies">
        <p>
          Cookies to niewielkie pliki zapisywane w Twojej przeglądarce. Pomagają stronie działać
          poprawnie, zapamiętać ustawienia lub zapewnić bezpieczeństwo połączenia.
        </p>
      </LegalSection>

      <LegalSection title="2. Jakie cookies stosuję">
        <p>
          Na {siteConfig.url} używam wyłącznie cookies technicznych (niezbędnych). Nie uruchamiam
          narzędzi analitycznych ani reklamowych, które wymagałyby zgody na cookies marketingowe.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-medium text-foreground">Cookies sesyjne i bezpieczeństwa</strong> -
            mogą być ustawiane przez infrastrukturę hostingu (m.in. Cloudflare) w celu ochrony przed
            ruchem złośliwym i prawidłowego dostarczenia strony.
          </li>
          <li>
            <strong className="font-medium text-foreground">Preferencje przeglądarki</strong> - strona
            nie zapisuje własnych cookies marketingowych ani profilujących.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Podstawa stosowania">
        <p>
          Cookies niezbędne do świadczenia usługi drogą elektroniczną nie wymagają zgody. Jeśli w
          przyszłości pojawią się cookies analityczne lub marketingowe, poproszę o zgodę zanim zostaną
          uruchomione.
        </p>
      </LegalSection>

      <LegalSection title="4. Zarządzanie cookies">
        <p>
          Możesz usunąć pliki cookies lub zablokować ich zapisywanie w ustawieniach przeglądarki.
          Ograniczenie cookies technicznych może wpłynąć na działanie strony.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Chrome - Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie</li>
          <li>Firefox - Ustawienia → Prywatność i bezpieczeństwo</li>
          <li>Safari - Ustawienia → Prywatność</li>
          <li>Edge - Ustawienia → Pliki cookie i uprawnienia witryny</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Więcej informacji">
        <p>
          Zasady przetwarzania danych osobowych znajdziesz w{" "}
          <Link to="/polityka-prywatnosci" className="text-foreground underline-offset-4 hover:underline">
            Polityce prywatności
          </Link>
          . Pytania:{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-foreground underline-offset-4 hover:underline"
          >
            {siteConfig.contact.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";

import { LegalLayout, LegalSection } from "@/components/landing/LegalLayout";
import { getAbsoluteUrl, siteConfig } from "@/config/site";

const title = `Polityka prywatności | ${siteConfig.name}`;
const description =
  "Zasady przetwarzania danych osobowych przez NESKI Studio - kontakt, formularz, prawa osób, których dane dotyczą.";

export const Route = createFileRoute("/polityka-prywatnosci")({
  component: PrivacyPolicyPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: getAbsoluteUrl("/polityka-prywatnosci") },
      { property: "og:locale", content: siteConfig.locale },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: getAbsoluteUrl("/polityka-prywatnosci") }],
  }),
});

function PrivacyPolicyPage() {
  const email = siteConfig.contact.email;

  return (
    <LegalLayout
      title="Polityka prywatności"
      description="Poniżej wyjaśniam, jakie dane zbieram, w jakim celu i jakie masz prawa."
      updated={siteConfig.legal.lastUpdated}
    >
      <LegalSection title="1. Administrator danych">
        <p>
          Administratorem danych osobowych jest {siteConfig.name} („Administrator”).
        </p>
        <p>
          Kontakt w sprawach ochrony danych:{" "}
          <a href={`mailto:${email}`} className="text-foreground underline-offset-4 hover:underline">
            {email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Zakres i cele przetwarzania">
        <p>Dane przetwarzam wyłącznie w związku z prowadzeniem strony {siteConfig.url} oraz obsługą zapytań.</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-medium text-foreground">Formularz kontaktowy</strong> - imię, telefon,
            e-mail oraz opcjonalnie firma, branża, adres strony, budżet, termin i treść wiadomości.
            Cel: odpowiedź na zapytanie i przygotowanie oferty.
          </li>
          <li>
            <strong className="font-medium text-foreground">Kontakt bezpośredni</strong> - dane podane w
            e-mailu lub podczas rozmowy. Cel: korespondencja i realizacja współpracy.
          </li>
          <li>
            <strong className="font-medium text-foreground">Dane techniczne</strong> - adres IP, typ
            przeglądarki i podstawowe logi serwera, w zakresie niezbędnym do bezpieczeństwa i działania
            strony.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Podstawy prawne">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            art. 6 ust. 1 lit. b RODO - działania przed zawarciem umowy (odpowiedź na zapytanie, oferta);
          </li>
          <li>
            art. 6 ust. 1 lit. a RODO - zgoda wyrażona w formularzu, gdy jest wymagana do kontaktu;
          </li>
          <li>
            art. 6 ust. 1 lit. f RODO - prawnie uzasadniony interes Administratora (ochrona strony,
            dochodzenie roszczeń, prowadzenie korespondencji).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Odbiorcy danych">
        <p>
          Dane mogą być powierzane zaufanym podmiotom przetwarzającym, wyłącznie w zakresie potrzebnym
          do działania strony i dostarczenia wiadomości:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>dostawca hostingu i infrastruktury (m.in. Cloudflare);</li>
          <li>
            dostawca obsługi formularza lub poczty elektronicznej (np. Formspree lub Resend), jeśli jest
            skonfigurowany.
          </li>
        </ul>
        <p>Nie sprzedaję danych i nie udostępniam ich w celach marketingu osób trzecich.</p>
      </LegalSection>

      <LegalSection title="5. Okres przechowywania">
        <p>
          Dane z formularza przechowuję przez czas potrzebny do obsługi zapytania, a następnie do 24
          miesięcy - chyba że rozpoczniemy współpracę (wówczas obowiązują terminy wynikające z umowy i
          przepisów rachunkowych) albo wcześniej zażądasz usunięcia danych, o ile nie sprzeciwiają się
          temu obowiązki prawne.
        </p>
      </LegalSection>

      <LegalSection title="6. Twoje prawa">
        <p>Przysługuje Ci prawo do:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>dostępu do danych, ich sprostowania i usunięcia;</li>
          <li>ograniczenia przetwarzania oraz przenoszenia danych;</li>
          <li>wniesienia sprzeciwu wobec przetwarzania opartego na uzasadnionym interesie;</li>
          <li>cofnięcia zgody w dowolnym momencie (bez wpływu na wcześniejsze przetwarzanie);</li>
          <li>
            złożenia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).
          </li>
        </ul>
        <p>
          Żądania realizuję po kontakcie na{" "}
          <a href={`mailto:${email}`} className="text-foreground underline-offset-4 hover:underline">
            {email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="7. Dobrowolność">
        <p>
          Podanie danych w formularzu jest dobrowolne, ale niezbędne, żeby móc odpowiedzieć na zapytanie.
          Brak danych uniemożliwia kontakt zwrotny.
        </p>
      </LegalSection>

      <LegalSection title="8. Pliki cookies">
        <p>
          Szczegóły dotyczące plików cookies opisuję na stronie{" "}
          <Link to="/cookies" className="text-foreground underline-offset-4 hover:underline">
            Cookies
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="9. Zmiany">
        <p>
          Polityka może być aktualizowana, gdy zmieni się sposób działania strony lub przepisy. Aktualna
          wersja jest zawsze dostępna pod tym adresem.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

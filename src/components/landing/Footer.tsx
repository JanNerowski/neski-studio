import { Link } from "@tanstack/react-router";

import { LogoMark } from "@/components/landing/Navbar";
import { getTelHref, siteConfig } from "@/config/site";

const NAV = [
  { href: "/#oferta", label: "Oferta" },
  { href: "/#dla-kogo", label: "Dla kogo" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#proces", label: "Proces" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#kontakt", label: "Kontakt" },
] as const;

const SERVICES = [
  "Strony internetowe",
  "Widoczność i reklamy",
  "Wizytówka Google",
  "Hosting i poczta",
  "Opieka po starcie",
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <LogoMark />
              <span className="font-display text-xl font-semibold text-gradient-brand">NESKI Studio</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Strony internetowe, widoczność w Google i reklamy dla firm. Hosting, poczta i opieka po starcie.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Nawigacja
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-foreground/80 transition-colors hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Zakres
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80">
              {SERVICES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Kontakt
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={getTelHref()}
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} NESKI Studio. Wszelkie prawa zastrzeżone.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/polityka-prywatnosci" className="hover:text-foreground">
              Polityka prywatności
            </Link>
            <Link to="/cookies" className="hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

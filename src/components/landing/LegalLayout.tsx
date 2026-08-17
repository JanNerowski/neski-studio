import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { AmbientBackground } from "@/components/landing/AmbientBackground";
import { Footer } from "@/components/landing/Footer";
import { LogoMark } from "@/components/landing/Navbar";

type LegalLayoutProps = {
  title: string;
  description: string;
  updated: string;
  children: ReactNode;
};

export function LegalLayout({ title, description, updated, children }: LegalLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <a
        href="#legal-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
      >
        Przejdź do treści
      </a>
      <AmbientBackground />

      <header className="relative z-10 px-4 pt-6">
        <nav
          aria-label="Nawigacja strony prawnej"
          className="glass mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 md:px-6 md:py-4"
        >
          <Link to="/" className="group flex items-center gap-3">
            <LogoMark />
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl tracking-tight text-gradient-brand md:text-2xl">
                NESKI
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground md:text-[11px]">
                Studio
              </span>
            </div>
          </Link>
          <Link
            to="/"
            hash="kontakt"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.75_0.22_295)] to-[oklch(0.6_0.24_265)] px-4 py-2.5 text-sm font-semibold text-black md:px-5"
          >
            Umów analizę
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </header>

      <main id="legal-content" className="relative px-6 py-16 md:py-24">
        <article className="mx-auto max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Informacje prawne</p>
          <h1 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
            <span className="text-gradient">{title}</span>
          </h1>
          <p className="mt-4 text-muted-foreground">{description}</p>
          <p className="mt-2 text-xs text-muted-foreground/80">Ostatnia aktualizacja: {updated}</p>
          <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/85">{children}</div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl tracking-tight text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-muted-foreground">{children}</div>
    </section>
  );
}

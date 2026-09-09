import { useEffect, useState } from "react";
import { ArrowRight, Eye, Megaphone, Phone } from "lucide-react";

import { HeroShowreel } from "@/components/landing/HeroShowreel";
import { useQuote } from "@/components/landing/QuoteDialog";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const HEADLINE_STATIC = "Nowoczesne strony internetowe,";
const HEADLINE_MID = "które pokażą";
const HEADLINE_TYPED = "Twoją firmę";
const HEADLINE_FULL = `${HEADLINE_STATIC} ${HEADLINE_MID} ${HEADLINE_TYPED}.`;

function useHeadlineTypewriter(reducedMotion: boolean) {
  const [chars, setChars] = useState(reducedMotion ? HEADLINE_TYPED.length : 0);
  const [periodOn, setPeriodOn] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setChars(HEADLINE_TYPED.length);
      setPeriodOn(true);
      return;
    }

    if (chars < HEADLINE_TYPED.length) {
      const delay = chars === 0 ? 1000 : 95;
      const id = window.setTimeout(() => setChars((c) => c + 1), delay);
      return () => window.clearTimeout(id);
    }

    setPeriodOn(true);
    let timeout = window.setTimeout(function blink() {
      setPeriodOn(false);
      timeout = window.setTimeout(() => {
        setPeriodOn(true);
        timeout = window.setTimeout(blink, 2000);
      }, 520);
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, [chars, reducedMotion]);

  const done = chars >= HEADLINE_TYPED.length;

  return {
    typed: HEADLINE_TYPED.slice(0, chars),
    charsComplete: done,
    showPeriod: done && periodOn,
  };
}

const BENEFITS = [
  {
    icon: Eye,
    text: "Widać, czym się zajmujesz - bez dopytywania",
  },
  {
    icon: Phone,
    text: "Łatwy kontakt: formularz albo telefon",
  },
  {
    icon: Megaphone,
    text: "Strona gotowa pod Google i reklamy",
  },
] as const;

export function Hero() {
  const { openQuote } = useQuote();
  const reducedMotion = useReducedMotion();
  const { typed, charsComplete, showPeriod } = useHeadlineTypewriter(reducedMotion);

  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="relative max-w-3xl animate-rise lg:col-span-6">
            <div className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Strony internetowe dla firm
            </div>

            <h1 className="relative z-10 mt-8 pb-8 font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              <span className="sr-only">{HEADLINE_FULL}</span>
              <span aria-hidden="true">
                <span className="text-gradient">{HEADLINE_STATIC}</span>{" "}
                <span className="text-gradient-brand">{HEADLINE_MID}</span>
                <span className="block min-h-[1.2em] text-gradient-brand">
                  {typed}
                  {charsComplete ? (
                    <span
                      className={`inline-block transition-opacity duration-500 ease-out ${
                        showPeriod ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      .
                    </span>
                  ) : null}
                </span>
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-[17px]">
              Projekt i wdrożenie strony, widoczność w Google i reklamy - w jednym miejscu.
              Klient od razu widzi ofertę i wie, jak się odezwać.
            </p>

            <ul className="mt-8 space-y-3">
              {BENEFITS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-start gap-3 text-sm text-foreground/90 md:text-[15px]">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                      <Icon className="h-4 w-4 text-[oklch(0.85_0.15_290)]" strokeWidth={1.75} />
                    </span>
                    {item.text}
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={openQuote}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
              >
                Wyceń projekt
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3.5 text-sm text-foreground/90 transition-colors hover:bg-white/[0.06]"
              >
                Zobacz przykłady
              </a>
            </div>
          </div>

          <div className="animate-showreel-enter lg:col-span-6">
            <HeroShowreel />
          </div>
        </div>
      </div>
    </section>
  );
}

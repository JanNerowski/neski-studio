import { useEffect, useState } from "react";

import { HeroShowreel } from "@/components/landing/HeroShowreel";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const HEADLINE_STATIC = "Nowoczesne strony internetowe,";
const HEADLINE_MID = "które pokażą";
const HEADLINE_TYPED = "Twoją firmę";
const HEADLINE_FULL = `${HEADLINE_STATIC} ${HEADLINE_MID} ${HEADLINE_TYPED}.`;

function useHeadlineTypewriter(reducedMotion: boolean) {
  const [chars, setChars] = useState(reducedMotion ? HEADLINE_TYPED.length : 0);

  useEffect(() => {
    if (reducedMotion) {
      setChars(HEADLINE_TYPED.length);
      return;
    }

    if (chars >= HEADLINE_TYPED.length) return;

    const delay = chars === 0 ? 1000 : 95;
    const id = window.setTimeout(() => setChars((c) => c + 1), delay);
    return () => window.clearTimeout(id);
  }, [chars, reducedMotion]);

  const done = chars >= HEADLINE_TYPED.length;

  return {
    typed: HEADLINE_TYPED.slice(0, chars),
    charsComplete: done,
  };
}

export function Hero() {
  const reducedMotion = useReducedMotion();
  const { typed, charsComplete } = useHeadlineTypewriter(reducedMotion);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-x-hidden">
      <HeroShowreel>
        <h1 className="animate-rise font-display text-[clamp(2.35rem,7vw,3.15rem)] font-semibold leading-[1.05] tracking-[-0.03em] lg:text-[clamp(2.6rem,3.4vw,3.75rem)]">
          <span className="sr-only">{HEADLINE_FULL}</span>
          <span aria-hidden="true">
            <span className="text-gradient">{HEADLINE_STATIC}</span>{" "}
            <span className="text-gradient-brand">{HEADLINE_MID}</span>
            <span className="block min-h-[1.2em] text-gradient-brand">
              {typed}
              {charsComplete ? (
                <span className={reducedMotion ? "inline-block" : "animate-headline-dot inline-block"}>
                  .
                </span>
              ) : null}
            </span>
          </span>
        </h1>
      </HeroShowreel>
    </section>
  );
}

import { useEffect, useState, type MouseEvent } from "react";
import { ChevronDown } from "lucide-react";

import { HeroShowreel } from "@/components/landing/HeroShowreel";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

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

function scrollToOffer(event: MouseEvent<HTMLAnchorElement>, reducedMotion: boolean) {
  const target = document.getElementById("oferta");
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

export function Hero() {
  const reducedMotion = useReducedMotion();
  const { typed, charsComplete } = useHeadlineTypewriter(reducedMotion);
  const [cueHidden, setCueHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setCueHidden(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-x-hidden">
      <HeroShowreel>
        <h1 className="animate-rise font-display text-[clamp(2.35rem,7vw,3.15rem)] font-semibold leading-[1.05] tracking-[-0.03em] lg:text-[clamp(2.6rem,3.4vw,3.75rem)]">
          <span className="sr-only">{HEADLINE_FULL}</span>
          <span aria-hidden="true">
            <span className="text-gradient">{HEADLINE_STATIC}</span>{" "}
            <span className="text-gradient-brand">{HEADLINE_MID}</span>
            <span className="block min-h-[1.2em]">
              <span className="text-gradient-brand">{typed}</span>
              {charsComplete ? (
                <span
                  className={cn(
                    "inline-block text-gradient-brand",
                    !reducedMotion && "animate-headline-dot",
                  )}
                >
                  .
                </span>
              ) : null}
            </span>
          </span>
        </h1>
      </HeroShowreel>

      <div
        className={cn(
          "absolute bottom-6 left-1/2 z-20 -translate-x-1/2 transition-opacity duration-500 sm:bottom-8",
          cueHidden ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <a
          href="#oferta"
          onClick={(event) => scrollToOffer(event, reducedMotion)}
          className={cn(
            "group inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] font-medium text-white/90 shadow-[0_0_18px_oklch(0.62_0.22_290/0.28)] backdrop-blur-md transition-all duration-300 sm:px-5 sm:text-sm",
            "hover:border-[oklch(0.72_0.18_290/0.55)] hover:bg-white/10 hover:shadow-[0_0_28px_oklch(0.65_0.22_290/0.5)]",
            !reducedMotion && "animate-scroll-cue",
          )}
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.16_290)]",
                !reducedMotion && "animate-scroll-dot",
              )}
            />
          </span>
          Odkryj ofertę
          <ChevronDown
            className="h-4 w-4 text-white/70 transition-transform duration-300 group-hover:translate-y-1"
            strokeWidth={1.75}
          />
        </a>
      </div>
    </section>
  );
}

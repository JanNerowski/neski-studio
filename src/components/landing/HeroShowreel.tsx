import { useEffect, useRef, useState, type ReactNode } from "react";

import logo from "@/assets/neski-mark.png";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const VIDEO_SRC = "/hero.mp4";
const HAS_HERO_VIDEO = false;
const TICKER_PX_PER_SEC = 88;
const TICKER_REPEATS = 4;

const WORDS = ["Strona", "Google", "Reklamy", "Opieka"] as const;
const LOOP = Array.from({ length: TICKER_REPEATS }, () => WORDS).flat();

function WordTicker({
  reducedMotion,
  mask = "linear-gradient(to_right,transparent,black_8%,black_92%,transparent)",
}: {
  reducedMotion: boolean;
  mask?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCopyRef = useRef<HTMLDivElement>(null);
  const copies = reducedMotion ? [WORDS] : [LOOP, LOOP];

  useEffect(() => {
    if (reducedMotion) return;
    const first = firstCopyRef.current;
    const track = trackRef.current;
    if (!first || !track) return;

    let lastWidth = 0;
    const sync = () => {
      const width = Math.round(first.scrollWidth);
      if (width <= 0) return;
      if (lastWidth > 0 && Math.abs(width - lastWidth) < 8) return;
      lastWidth = width;
      track.style.setProperty("--word-marquee-distance", `${width}px`);
      track.style.setProperty("--word-marquee-duration", `${(width / TICKER_PX_PER_SEC).toFixed(2)}s`);
    };

    sync();
    void document.fonts.ready.then(sync);
    const observer = new ResizeObserver(sync);
    observer.observe(first);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
      aria-hidden
    >
      <div
        ref={trackRef}
        className={cn(
          "flex w-max will-change-transform [contain:layout_style]",
          !reducedMotion && "animate-word-marquee",
          reducedMotion && "justify-center",
        )}
      >
        {copies.map((words, copy) => (
          <div key={copy} ref={copy === 0 ? firstCopyRef : undefined} className="flex">
            {words.map((word, i) => (
              <span
                key={`${copy}-${i}-${word}`}
                className="shrink-0 px-8 font-display text-xl font-medium text-[oklch(0.84_0.14_290)] md:px-10 md:text-2xl"
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroShowreel({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [useVideo, setUseVideo] = useState(HAS_HERO_VIDEO);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {useVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setUseVideo(false)}
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_32%,oklch(0.42_0.22_290/_0.55),transparent_62%),radial-gradient(50%_40%_at_80%_70%,oklch(0.35_0.18_265/_0.4),transparent_60%),linear-gradient(165deg,oklch(0.16_0.04_280),oklch(0.08_0.02_275))]" />
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]" />

            <div
              className={cn(
                "absolute left-1/2 top-[30%] h-[min(72vw,380px)] w-[min(72vw,380px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 lg:top-[38%]",
                !reducedMotion && "animate-ring-spin",
              )}
            />
            <div
              className={cn(
                "absolute left-1/2 top-[30%] h-[min(52vw,260px)] w-[min(52vw,260px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[oklch(0.72_0.18_290/_0.28)] lg:top-[38%]",
                !reducedMotion && "animate-ring-spin-rev",
              )}
            />
          </>
        )}

        <div className="grain absolute inset-0 z-[1] opacity-40" />
        <div className="absolute inset-x-0 bottom-0 z-[2] h-[42%] bg-gradient-to-t from-[oklch(0.07_0.02_275/_0.72)] via-[oklch(0.07_0.02_275/_0.28)] to-transparent lg:h-[28%]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col items-center px-6 pb-12 pt-28 md:pt-32 lg:justify-center lg:pb-16">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[oklch(0.28_0.08_285)] to-[oklch(0.14_0.04_275)] ring-1 ring-white/15 shadow-[0_20px_50px_-16px_oklch(0.55_0.28_295/_0.7)] sm:h-20 sm:w-20 lg:h-24 lg:w-24">
            <img src={logo} alt="" className="h-10 w-10 object-contain sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
          </div>
          <p className="text-shine mt-4 font-display text-4xl font-semibold tracking-tight sm:mt-5 lg:mt-6 lg:text-5xl">
            NESKI
          </p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.32em] text-white/55">Studio</p>
        </div>

        <div className="order-1 mt-8 w-screen max-w-[100vw] lg:hidden">
          <WordTicker reducedMotion={reducedMotion} />
        </div>

        <div className="order-2 mt-auto w-full pt-8 lg:mt-10 lg:grid lg:w-screen lg:max-w-[100vw] lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)_minmax(0,1fr)] lg:items-center lg:gap-x-10 lg:px-10 lg:pt-0">
          <div className="hidden min-w-0 overflow-hidden lg:block">
            <WordTicker
              reducedMotion={reducedMotion}
              mask="linear-gradient(to right, transparent, black 12%, black 48%, transparent 78%)"
            />
          </div>
          <div className="min-w-0 lg:px-2 lg:text-center">{children}</div>
          <div className="hidden min-w-0 overflow-hidden lg:block">
            <WordTicker
              reducedMotion={reducedMotion}
              mask="linear-gradient(to right, transparent 22%, black 52%, black 88%, transparent)"
            />
          </div>
        </div>
      </div>
    </>
  );
}

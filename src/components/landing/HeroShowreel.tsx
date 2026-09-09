import { useEffect, useState } from "react";

import logo from "@/assets/neski-mark.png";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const VIDEO_SRC = "/hero.mp4";
const HAS_HERO_VIDEO = false;
const WORD_MS = 2200;

const WORDS = ["Strona", "Google", "Reklamy", "Opieka"] as const;

export function HeroShowreel() {
  const reducedMotion = useReducedMotion();
  const [word, setWord] = useState(0);
  const [useVideo, setUseVideo] = useState(HAS_HERO_VIDEO);

  useEffect(() => {
    if (reducedMotion || useVideo) return;
    const id = window.setInterval(() => {
      setWord((i) => (i + 1) % WORDS.length);
    }, WORD_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, useVideo]);

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[oklch(0.1_0.03_275)] shadow-[0_60px_140px_-36px_oklch(0.2_0.12_285/_0.85)]">
        <div className="relative aspect-[4/5] min-h-[360px] max-h-[560px] w-full sm:aspect-[5/6] md:min-h-[420px]">
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
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_35%,oklch(0.42_0.22_290/_0.55),transparent_62%),radial-gradient(50%_40%_at_80%_80%,oklch(0.35_0.18_265/_0.4),transparent_60%),linear-gradient(165deg,oklch(0.16_0.04_280),oklch(0.08_0.02_275))]"
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]"
              />

              <div
                aria-hidden
                className={cn(
                  "absolute left-1/2 top-[42%] h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 md:h-[340px] md:w-[340px]",
                  !reducedMotion && "animate-ring-spin",
                )}
              />
              <div
                aria-hidden
                className={cn(
                  "absolute left-1/2 top-[42%] h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[oklch(0.72_0.18_290/_0.28)] md:h-[250px] md:w-[250px]",
                  !reducedMotion && "animate-ring-spin-rev",
                )}
              />

              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[oklch(0.28_0.08_285)] to-[oklch(0.14_0.04_275)] ring-1 ring-white/15 shadow-[0_20px_50px_-16px_oklch(0.55_0.28_295/_0.7)] md:h-24 md:w-24">
                  <img src={logo} alt="" className="h-12 w-12 object-contain md:h-14 md:w-14" />
                </div>
                <p className="mt-6 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
                  NESKI
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.32em] text-white/55">
                  Studio
                </p>
                <p
                  key={WORDS[word]}
                  className="mt-8 font-display text-xl font-medium text-gradient-brand md:text-2xl"
                >
                  {WORDS[word]}
                </p>
              </div>
            </>
          )}

          <div aria-hidden className="grain pointer-events-none absolute inset-0 z-10 opacity-40" />
          <div className="absolute inset-x-0 bottom-0 z-20 p-5 md:p-6">
            <p className="text-sm text-white/70">Strony, widoczność i reklamy dla firm.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

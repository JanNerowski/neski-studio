import { useEffect, useRef, useState } from "react";
import { Code2, MessageCircle, PenLine, Rocket } from "lucide-react";

import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const STEP_MS = 4200;

const STEPS = [
  {
    n: "01",
    title: "Rozmowa",
    desc: "Krótko o firmie i tym, po co ma być strona. Bez zobowiązań.",
    icon: MessageCircle,
  },
  {
    n: "02",
    title: "Projekt",
    desc: "Układ, teksty, wygląd. Widzisz propozycję, zanim cokolwiek wdrażamy.",
    icon: PenLine,
  },
  {
    n: "03",
    title: "Wdrożenie",
    desc: "Kod, domena, formularz. Strona działa na telefonie i komputerze.",
    icon: Code2,
  },
  {
    n: "04",
    title: "Start",
    desc: "Publikacja. Potem poprawki, hosting i opieka - jeśli chcesz zostać.",
    icon: Rocket,
  },
] as const;

export function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const resumeTimer = useRef<number>(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = useReducedMotion();
  const step = STEPS[active];
  const Icon = step.icon;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.28),
      { threshold: [0.2, 0.35, 0.55] },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(resumeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || paused || !inView) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, paused, inView, active]);

  const goTo = (index: number) => {
    setActive(index);
    setPaused(true);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 8000);
  };

  return (
    <section
      id="proces"
      ref={sectionRef}
      className="relative py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Proces</SectionLabel>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-gradient">Cztery kroki.</span>{" "}
            <span className="text-gradient-brand">Wiesz, co się dzieje.</span>
          </h2>
        </Reveal>

        <Reveal className="mt-12 md:mt-16" delay={80}>
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[oklch(0.12_0.03_275)] p-6 shadow-[0_40px_100px_-36px_oklch(0.2_0.12_285/_0.8)] md:p-10 lg:sticky lg:top-28 lg:col-span-5">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-10 font-display text-[9rem] font-semibold leading-none text-white/[0.04] md:text-[11rem]"
              >
                {step.n}
              </div>
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(70%_55%_at_20%_10%,oklch(0.55_0.24_290/_0.22),transparent_58%)]"
              />

              <div className="relative flex items-center justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[oklch(0.28_0.1_290/_0.45)] ring-1 ring-[oklch(0.75_0.18_290/_0.35)]">
                  <Icon className="h-5 w-5 text-[oklch(0.86_0.14_290)]" strokeWidth={1.75} />
                </span>
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {step.n} / 04
                </p>
              </div>

              <div key={step.n} className={cn(!reducedMotion && "animate-process-step")}>
                <p className="mt-8 font-display text-6xl font-semibold leading-none tracking-tight text-gradient-brand md:text-7xl">
                  {step.n}
                </p>
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/80 md:text-[16px]">
                  {step.desc}
                </p>
              </div>

              {!reducedMotion && (
                <div className="relative mt-8 h-[2px] overflow-hidden rounded-full bg-white/10">
                  <div
                    key={`${step.n}-${paused}-${inView}`}
                    className="h-full origin-left rounded-full bg-gradient-to-r from-[oklch(0.78_0.16_290)] to-[oklch(0.6_0.22_265)]"
                    style={{
                      animation: paused || !inView ? "none" : `process-story ${STEP_MS}ms linear both`,
                      transform: paused ? `scaleX(${(active + 1) / STEPS.length})` : undefined,
                    }}
                  />
                </div>
              )}
            </div>

            <ol className="relative lg:col-span-7">
              <div
                aria-hidden
                className="absolute bottom-6 left-[21px] top-6 w-px bg-white/[0.08] md:left-[25px]"
              >
                <div
                  className="w-px origin-top bg-gradient-to-b from-[oklch(0.78_0.16_290)] to-[oklch(0.55_0.22_265)] transition-[height] duration-700 ease-out"
                  style={{ height: `${(active / (STEPS.length - 1)) * 100}%` }}
                />
              </div>

              {STEPS.map((item, i) => {
                const StepIcon = item.icon;
                const isActive = i === active;
                const isDone = i < active;

                return (
                  <li key={item.n} className="relative">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "group grid w-full grid-cols-[44px_1fr] gap-4 rounded-3xl py-5 text-left transition-colors duration-500 md:grid-cols-[52px_1fr] md:gap-6 md:py-6",
                        isActive ? "bg-white/[0.03]" : "hover:bg-white/[0.02]",
                      )}
                    >
                      <span className="relative z-10 flex justify-center">
                        <span
                          className={cn(
                            "mt-1 flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 md:h-12 md:w-12",
                            isActive
                              ? "border-[oklch(0.78_0.16_290/_0.7)] bg-[oklch(0.28_0.12_290/_0.55)] text-[oklch(0.9_0.1_290)] shadow-[0_0_32px_oklch(0.6_0.24_290/_0.45)]"
                              : isDone
                                ? "border-white/15 bg-white/[0.06] text-white/70"
                                : "border-white/10 bg-[oklch(0.12_0.02_275)] text-muted-foreground",
                            isActive && !reducedMotion && "animate-process-node",
                          )}
                        >
                          <StepIcon className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                      </span>

                      <span className="min-w-0 pr-3 md:pr-5">
                        <span className="flex items-baseline gap-3">
                          <span
                            className={cn(
                              "font-display text-xs font-semibold tracking-[0.18em]",
                              isActive ? "text-[oklch(0.82_0.14_290)]" : "text-muted-foreground",
                            )}
                          >
                            {item.n}
                          </span>
                          <span
                            className={cn(
                              "font-display text-xl font-semibold tracking-tight transition-colors md:text-2xl",
                              isActive ? "text-foreground" : "text-foreground/55 group-hover:text-foreground/80",
                            )}
                          >
                            {item.title}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "mt-2 block text-sm leading-relaxed transition-opacity duration-500",
                            isActive ? "text-foreground/75" : "text-muted-foreground/70",
                          )}
                        >
                          {item.desc}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

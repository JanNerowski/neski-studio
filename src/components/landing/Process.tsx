import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const STEPS = [
  {
    n: "01",
    title: "Bezpłatna analiza",
    desc: "Rozmawiamy o firmie, celach i obecnej sytuacji. Bez zobowiązań.",
  },
  {
    n: "02",
    title: "Strategia",
    desc: "Planujemy strukturę strony, komunikację i sposób pozyskiwania klientów.",
  },
  {
    n: "03",
    title: "Projekt",
    desc: "Tworzymy nowoczesny wygląd dopasowany do marki i oczekiwań klientów.",
  },
  {
    n: "04",
    title: "Development",
    desc: "Kodujemy stronę z naciskiem na szybkość, responsywność i jakość.",
  },
  {
    n: "05",
    title: "Publikacja",
    desc: "Wdrażamy stronę, konfigurujemy domenę, formularze i podstawową analitykę.",
  },
  {
    n: "06",
    title: "Optymalizacja",
    desc: "Analizujemy wyniki i wprowadzamy poprawki wraz z rozwojem biznesu.",
  },
] as const;

export function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(scrolled / total);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  return (
    <section id="proces" ref={sectionRef} className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Proces</SectionLabel>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
            <span className="text-gradient">Od pomysłu do gotowej strony.</span>{" "}
            <span className="italic text-gradient-brand">Przejrzysty proces na każdym etapie.</span>
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-1 overflow-hidden rounded-full bg-white/[0.06] md:block"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.22_290)] to-[oklch(0.6_0.22_250)] transition-[width] duration-150 ease-out"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>

          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} as="li" delay={i * 80}>
                <article className="relative flex h-full flex-col rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/10 hover:bg-white/[0.03]">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full glass font-display text-lg">
                    <span className="text-gradient-brand">{s.n}</span>
                  </span>
                  <h3 className="mt-5 font-display text-2xl tracking-tight">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

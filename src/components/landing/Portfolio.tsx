import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type CaseStudy = {
  name: string;
  industry: string;
  goal: string;
  solution: string;
  result: string;
  scope: string[];
  stats: { label: string; value: string }[];
  gradient: string;
  accent: string;
};

const CASES: CaseStudy[] = [
  {
    name: "Aurum",
    industry: "Restauracja premium",
    goal: "Zwiększenie rezerwacji online i budowanie wizerunku lokalu premium.",
    solution: "Nowa strona z sekcją menu, galerią i prostym systemem rezerwacji.",
    result: "Lepsza prezentacja oferty i wyraźniejsze CTA do rezerwacji stolika.",
    scope: ["UX/UI", "Strona WWW", "Rezerwacje", "Mobile-first"],
    stats: [
      { label: "Zapytania", value: "+42%" },
      { label: "Konwersja", value: "+68%" },
      { label: "CPL", value: "-31%" },
    ],
    gradient: "from-[oklch(0.22_0.06_55)] via-[oklch(0.14_0.04_45)] to-[oklch(0.1_0.02_275)]",
    accent: "oklch(0.75 0.16 55)",
  },
  {
    name: "Luminé",
    industry: "Klinika stomatologiczna",
    goal: "Stały napływ zapytań od pacjentów i profesjonalna prezentacja usług.",
    solution: "Strona z czytelną ofertą, formularzem i integracją kampanii Google.",
    result: "Przejrzysta ścieżka od reklamy do umówienia wizyty.",
    scope: ["Strona WWW", "Google Ads", "Formularze", "SEO lokalne"],
    stats: [
      { label: "Leady", value: "+54%" },
      { label: "CTR", value: "+22%" },
      { label: "Czas na stronie", value: "+38%" },
    ],
    gradient: "from-[oklch(0.2_0.06_290)] via-[oklch(0.13_0.04_280)] to-[oklch(0.09_0.02_275)]",
    accent: "oklch(0.75 0.18 290)",
  },
  {
    name: "Forma",
    industry: "Pracownia architektoniczna",
    goal: "Portfolio, które przyciąga świadomych klientów z wyższym budżetem.",
    solution: "Minimalistyczna strona z dużymi wizualizacjami projektów i selekcją realizacji.",
    result: "Spójny wizerunek marki i lepsza jakość przychodzących zapytań.",
    scope: ["Branding", "Portfolio", "Animacje", "Performance"],
    stats: [
      { label: "Zapytania premium", value: "+36%" },
      { label: "Konwersja", value: "+41%" },
      { label: "Odrzucenia", value: "-18%" },
    ],
    gradient: "from-[oklch(0.18_0.03_250)] via-[oklch(0.12_0.02_265)] to-[oklch(0.09_0.02_275)]",
    accent: "oklch(0.72 0.14 250)",
  },
];

function CaseMockup({ c }: { c: CaseStudy }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.02] shadow-[0_60px_120px_-40px_oklch(0.05_0.05_285/_0.9)]">
      <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="ml-2 text-[10px] text-muted-foreground">{c.name.toLowerCase()}.pl</span>
      </div>
      <div className={`relative aspect-[16/10] bg-gradient-to-br ${c.gradient} p-6 md:p-8`}>
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_20%,oklch(0.55_0.28_295/_0.25),transparent_70%)]"
        />
        <div className="relative">
          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
            {c.industry}
          </span>
          <p className="mt-4 font-display text-3xl tracking-tight md:text-4xl">{c.name}</p>
          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="h-16 rounded-lg bg-white/[0.06]" />
            <div className="h-16 rounded-lg bg-white/[0.08]" />
            <div className="h-16 rounded-lg bg-white/[0.04]" />
          </div>
          <div
            className="mt-4 inline-flex rounded-full px-3 py-1 text-[10px] font-medium text-black"
            style={{ background: c.accent }}
          >
            Umów rozmowę
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudyCard({
  c,
  align,
  index,
}: {
  c: CaseStudy;
  align: "left" | "right";
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [y, setY] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setY((progress - 0.5) * 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  return (
    <article
      ref={ref}
      className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 ${
        align === "right" ? "lg:[&>div:first-child]:order-2" : ""
      }`}
    >
      <div className="lg:col-span-7">
        <div
          className="group transition-transform duration-[1200ms] ease-out"
          style={reducedMotion ? undefined : { transform: `translateY(${y * 0.25}px)` }}
        >
          <CaseMockup c={c} />
        </div>
      </div>
      <div className="lg:col-span-5">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          0{index + 1} - {c.industry}
        </p>
        <h3 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">{c.name}</h3>

        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">Cel</dt>
            <dd className="mt-1 text-foreground/90">{c.goal}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">Rozwiązanie</dt>
            <dd className="mt-1 text-foreground/90">{c.solution}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">Rezultat</dt>
            <dd className="mt-1 text-foreground/90">{c.result}</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-2">
          {c.scope.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {c.stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-1 font-display text-xl text-gradient-brand">{s.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
          * Przykładowe dane demo - projekt prezentacyjny
        </p>

        <a
          href="#kontakt"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
        >
          Chcę podobny efekt <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

export function Portfolio() {
  return (
    <section id="realizacje" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>Realizacje</SectionLabel>
              <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
                <span className="text-gradient">Case studies,</span>
                <br />
                <span className="italic text-gradient-brand">które mówią same za siebie.</span>
              </h2>
            </div>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Chcę taką stronę <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-16 md:gap-20">
          {CASES.map((c, i) => (
            <Reveal key={c.name} delay={i * 60}>
              <CaseStudyCard c={c} align={i % 2 === 0 ? "left" : "right"} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

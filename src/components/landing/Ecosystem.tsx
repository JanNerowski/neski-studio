import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { SectionLabel } from "@/components/landing/SectionLabel";

const ECOSYSTEM = [
  {
    key: "website",
    title: "Strona",
    desc: "Fundament profesjonalnej obecności online i pierwszego wrażenia.",
  },
  {
    key: "marketing",
    title: "Marketing",
    desc: "Kampanie, które przyciągają zdecydowanych klientów.",
  },
  {
    key: "analytics",
    title: "Analityka",
    desc: "Sprawdzamy, skąd pochodzą zapytania i co naprawdę działa.",
  },
  {
    key: "automation",
    title: "Automatyzacja",
    desc: "Formularze i procesy, które oszczędzają Twój czas.",
  },
  {
    key: "growth",
    title: "Wzrost",
    desc: "Regularne poprawki i optymalizacja wraz z rozwojem firmy.",
  },
];

export function Ecosystem() {
  const [active, setActive] = useState(0);

  return (
    <section id="ekosystem" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Ekosystem</SectionLabel>
        <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
          <span className="text-gradient">Strona to dopiero początek. </span>
          <br />
          <span className="italic text-gradient-brand">Wszystko razem napędza rozwój firmy.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-muted-foreground md:text-[17px]">
          Nowoczesna strona internetowa to tylko jeden element. Połączenie marketingu,
          analityki i automatyzacji sprawia, że Twoja firma może pozyskiwać klientów w
          przewidywalny sposób.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Orb visualization */}
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.55_0.28_295/_0.35),transparent_60%)] blur-2xl" />
            {/* Orbit rings */}
            <div className="absolute inset-8 rounded-full border border-white/5" />
            <div className="absolute inset-20 rounded-full border border-white/[0.07]" />
            <div className="absolute inset-32 rounded-full border border-white/[0.09]" />
            {/* Center */}
            <div className="absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--grad-primary)] shadow-[0_0_60px_-10px_oklch(0.6_0.28_290/_0.8)]">
              <span className="font-display text-xl italic text-white">Twój biznes</span>
            </div>
            {/* Nodes */}
            {ECOSYSTEM.map((n, i) => {
              const angle = (i / ECOSYSTEM.length) * Math.PI * 2 - Math.PI / 2;
              const r = 42;
              const x = 50 + Math.cos(angle) * r;
              const y = 50 + Math.sin(angle) * r;
              const isActive = active === i;
              return (
                <button
                  key={n.key}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span
                    className={`glass flex h-14 w-14 items-center justify-center rounded-full text-[11px] font-medium transition-all duration-500 md:h-16 md:w-16 ${
                      isActive
                        ? "scale-110 border-white/30 bg-white/10 text-foreground shadow-[0_10px_40px_-10px_oklch(0.6_0.28_290/_0.7)]"
                        : "text-muted-foreground"
                    }`}
                  >
                    {n.title}
                  </span>
                </button>
              );
            })}
            {/* Connection lines */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              fill="none"
            >
              {ECOSYSTEM.map((_, i) => {
                const angle = (i / ECOSYSTEM.length) * Math.PI * 2 - Math.PI / 2;
                const r = 34;
                const x = 50 + Math.cos(angle) * r;
                const y = 50 + Math.sin(angle) * r;
                return (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={x}
                    y2={y}
                    stroke={active === i ? "oklch(0.75 0.22 290)" : "oklch(1 0 0 / 0.08)"}
                    strokeWidth={active === i ? 0.4 : 0.2}
                    className="transition-all duration-500"
                  />
                );
              })}
            </svg>
          </div>

          {/* List */}
          <div className="flex flex-col gap-2">
            {ECOSYSTEM.map((n, i) => {
              const isActive = active === i;
              return (
                <button
                  key={n.key}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group relative flex items-start gap-6 rounded-3xl p-6 text-left transition-all duration-500 md:p-8 ${
                    isActive
                      ? "glass shadow-[0_20px_60px_-20px_oklch(0.05_0.05_285/_0.9)]"
                      : "border border-transparent hover:border-white/5"
                  }`}
                >
                  <span
                    className={`mt-1 font-display text-2xl transition-colors ${
                      isActive ? "text-gradient-brand" : "text-muted-foreground/60"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                      {n.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm text-muted-foreground md:text-[15px]">
                      {n.desc}
                    </p>
                  </div>
                  <ArrowUpRight
                    className={`h-5 w-5 shrink-0 transition-all ${
                      isActive
                        ? "translate-x-0 translate-y-0 text-foreground"
                        : "translate-x-1 -translate-y-1 text-muted-foreground/40"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

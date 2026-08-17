import { Gauge, LayoutTemplate, LineChart, ShieldCheck, Smartphone, Zap } from "lucide-react";

import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";

const POINTS = [
  {
    icon: LayoutTemplate,
    title: "Pierwsze wrażenie decyduje",
    desc: "Użytkownik ocenia wiarygodność firmy w ułamku sekundy - zanim przeczyta ofertę.",
  },
  {
    icon: Smartphone,
    title: "Prosty kontakt",
    desc: "Formularz, telefon i mapa muszą być widoczne od razu. Im mniej kroków, tym więcej zapytań.",
  },
  {
    icon: Zap,
    title: "Szybkość ładowania",
    desc: "Wolna strona traci klientów. Optymalizacja prędkości to podstawa, nie dodatek.",
  },
  {
    icon: Gauge,
    title: "SEO i Google",
    desc: "Dobra struktura i treści pomagają firmie być widoczną, gdy klienci szukają usług w okolicy.",
  },
  {
    icon: LineChart,
    title: "Analityka i decyzje",
    desc: "Wiesz, skąd przychodzą zapytania i które sekcje naprawdę działają - zamiast zgadywać.",
  },
  {
    icon: ShieldCheck,
    title: "Spójny wizerunek",
    desc: "Strona, reklamy i komunikacja w jednym stylu budują zaufanie i rozpoznawalność marki.",
  },
] as const;

export function WhyBusiness() {
  return (
    <section id="rozwiazanie" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal>
            <SectionLabel>Rozwiązanie</SectionLabel>
            <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
              <span className="text-gradient">Twoja firma nie potrzebuje</span>
              <br />
              <span className="italic text-gradient-brand">kolejnej strony.</span>
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-foreground/90 md:text-2xl">
              Potrzebuje strony, która{" "}
              <span className="text-gradient-brand italic">pracuje</span> - przyciąga,
              przekonuje i generuje zapytania.
            </p>
            <p className="mt-4 max-w-xl text-muted-foreground md:text-[17px]">
              NESKI Studio łączy design, development i marketing w jeden spójny system.
              Bez technicznego żargonu - z jasnym celem: więcej wartościowych klientów dla
              Twojej firmy.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {POINTS.map((point, i) => {
              const Icon = point.icon;
              return (
                <Reveal key={point.title} delay={i * 60}>
                  <article className="glass rounded-2xl p-5 transition-colors duration-300 hover:bg-white/[0.04]">
                    <Icon className="h-5 w-5 text-[oklch(0.85_0.15_290)]" strokeWidth={1.75} />
                    <h3 className="mt-3 text-sm font-semibold text-foreground">{point.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {point.desc}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

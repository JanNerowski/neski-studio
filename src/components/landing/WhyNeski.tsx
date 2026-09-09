import { useState } from "react";

import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { cn } from "@/lib/utils";

const TOPICS = [
  {
    label: "Kontakt",
    usual: "Mail ginie w skrzynce. Nikt nie dzwoni, a gdy piszesz ponownie - cisza.",
    ours: "Jeden numer i formularz. Odpowiedź tego samego dnia, nie za tydzień.",
  },
  {
    label: "Projekt",
    usual: "Gotowy szablon albo strona zrobiona na wyczucie, taka sama jak u sąsiada.",
    ours: "Układ pod Twoją ofertę. Widzisz projekt, zanim cokolwiek idzie na stronę.",
  },
  {
    label: "Google i reklamy",
    usual: "Strona jest, ale nikt jej nie szuka. Reklamy, jeśli w ogóle, prowadzą donikąd.",
    ours: "Strona od razu gotowa pod widoczność i kampanie. Google Ads i Meta, gdy chcesz ruchu.",
  },
  {
    label: "Po starcie",
    usual: "Publikacja i cisza. Hosting, poczta i poprawki zostają Twoim problemem.",
    ours: "Hosting, poczta, poprawki. Wiesz, do kogo napisać, gdy coś trzeba zmienić.",
  },
] as const;

export function WhyNeski() {
  const [active, setActive] = useState(0);
  const topic = TOPICS[active];

  return (
    <section id="dlaczego-my" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Dlaczego my</SectionLabel>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-gradient">Inaczej niż zwykle.</span>{" "}
            <span className="text-gradient-brand">Bez poczekalni i bez szablonu.</span>
          </h2>
        </Reveal>

        <Reveal className="mt-12" delay={80}>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((item, i) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  i === active
                    ? "bg-white text-black"
                    : "border border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-white",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            key={topic.label}
            className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <article className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Często tak bywa
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg">
                {topic.usual}
              </p>
            </article>
            <article className="rounded-3xl border border-[oklch(0.7_0.22_290/_0.28)] bg-[oklch(0.28_0.1_290/_0.18)] p-6 md:p-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[oklch(0.82_0.14_290)]">
                U nas
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground md:text-lg">
                {topic.ours}
              </p>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

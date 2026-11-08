import { useState } from "react";
import { Check, X } from "lucide-react";

import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "Wszystko" },
  { id: "kontakt", label: "Kontakt" },
  { id: "projekt", label: "Projekt" },
  { id: "zapytania", label: "Zapytania" },
  { id: "opieka", label: "Opieka" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

const ROWS = [
  {
    id: "kontakt" as const,
    area: "Kontakt i komunikacja",
    usual:
      "Mail ginie w skrzynce, brak odpowiedzi na maile, ciche dni i czekanie na odpowiedź tygodniami.",
    ours: "Jeden dedykowany numer i formularz. Odpowiedź tego samego dnia, stały kontakt.",
  },
  {
    id: "projekt" as const,
    area: "Podejście do projektu",
    usual: "Gotowe, powtarzalne szablony, do których dopasowuje się Twoją firmę na siłę.",
    ours: "Indywidualny projekt szyty na miarę Twojego biznesu – unikalny design, który buduje autorytet.",
  },
  {
    id: "zapytania" as const,
    area: "Generowanie zapytań",
    usual: "Przekazywanie luźnego ruchu bez nastawienia na dowiezienie twardego wyniku i konwersji.",
    ours: "Nastawienie na pozyskiwanie realnych klientów i zapytań z Google Ads oraz Social Media.",
  },
  {
    id: "opieka" as const,
    area: "Opieka po publikacji",
    usual: "Oddanie strony i zapomnienie – zostajesz sam z błędami, aktualizacjami i serwerem.",
    ours: "Pełne wsparcie techniczne, szybki hosting i ciągłe dbanie o bezpieczeństwo strony.",
  },
];

export function WhyNeski() {
  const [filter, setFilter] = useState<FilterId>("all");

  return (
    <section id="dlaczego-my" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal from="right">
          <SectionLabel>Dlaczego my</SectionLabel>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-gradient">Inaczej niż zwykle.</span>{" "}
            <span className="text-gradient-brand">Bez poczekalni i bez szablonu.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground md:text-[17px]">
            Zobacz, jak wygląda standardowa praca z agencjami, a co zyskujesz, wybierając
            współpracę z NESKI STUDIO.
          </p>
        </Reveal>

        <Reveal from="pop" className="mt-10" delay={80}>
          <div role="group" aria-label="Filtr obszarów" className="flex flex-wrap gap-2">
            {FILTERS.map((item) => {
              const selected = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(item.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    selected
                      ? "border border-[oklch(0.78_0.14_290/0.7)] bg-[oklch(0.32_0.12_290/0.45)] text-white shadow-[0_0_24px_-8px_oklch(0.62_0.22_290/0.9)]"
                      : "border border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-6 hidden overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_oklch(1_0_0/0.08),0_30px_80px_-40px_oklch(0.45_0.2_290/0.55)] backdrop-blur-2xl md:block">
          <div className="grid grid-cols-[minmax(9rem,0.8fr)_minmax(0,1.15fr)_minmax(0,1.25fr)]">
            <div className="px-6 py-5 text-[11px] uppercase tracking-[0.2em] text-white/40">
              Obszar
            </div>
            <div className="flex items-center gap-2 bg-black/25 px-6 py-5 text-[11px] uppercase tracking-[0.2em] text-white/55">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[oklch(0.65_0.18_25/0.16)] text-[oklch(0.78_0.14_25)]">
                <X className="h-3.5 w-3.5" strokeWidth={2.4} />
              </span>
              Często tak bywa
            </div>
            <div className="flex items-center gap-2 border-x border-t border-[oklch(0.75_0.16_290/0.45)] bg-[oklch(0.32_0.12_290/0.28)] px-6 py-5 text-[11px] uppercase tracking-[0.2em] text-[oklch(0.88_0.08_290)] shadow-[inset_0_0_32px_oklch(0.55_0.2_290/0.18)]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[oklch(0.72_0.16_290/0.22)] text-[oklch(0.9_0.1_290)]">
                <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
              </span>
              NESKI Studio
            </div>
          </div>

          {ROWS.map((row, index) => {
            const focused = filter !== "all" && filter === row.id;
            const dimmed = filter !== "all" && filter !== row.id;
            const last = index === ROWS.length - 1;
            return (
              <Reveal key={row.id} from="pop" delay={100 + index * 90}>
                <div
                  className={cn(
                    "group grid grid-cols-[minmax(9rem,0.8fr)_minmax(0,1.15fr)_minmax(0,1.25fr)] border-t border-white/[0.06] transition-all duration-300 hover:bg-white/[0.05]",
                    dimmed && "opacity-40 hover:opacity-100",
                    focused && "bg-white/[0.05]",
                  )}
                >
                  <div className="px-6 py-6 text-sm font-medium text-white/75">{row.area}</div>
                  <div className="bg-black/20 px-6 py-6 text-sm leading-relaxed text-white/60">
                    {row.usual}
                  </div>
                  <div
                    className={cn(
                      "border-x border-[oklch(0.75_0.16_290/0.4)] bg-[oklch(0.32_0.12_290/0.22)] px-6 py-6 text-sm leading-relaxed text-white/90 transition-all duration-300 group-hover:bg-[oklch(0.4_0.16_290/0.38)] group-hover:shadow-[inset_0_0_36px_oklch(0.62_0.22_290/0.45)]",
                      last && "border-b",
                      focused &&
                        "bg-[oklch(0.4_0.16_290/0.38)] shadow-[inset_0_0_36px_oklch(0.62_0.22_290/0.45)]",
                    )}
                  >
                    {row.ours}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-4 md:hidden">
          {ROWS.map((row, index) => {
            const focused = filter !== "all" && filter === row.id;
            const dimmed = filter !== "all" && filter !== row.id;
            return (
              <Reveal key={row.id} from="up" delay={80 + index * 90}>
                <article
                  className={cn(
                    "overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] transition-opacity duration-300",
                    dimmed && "opacity-40",
                    focused && "border-[oklch(0.75_0.16_290/0.4)]",
                  )}
                >
                  <h3 className="px-5 pt-5 font-display text-lg font-semibold tracking-tight">
                    {row.area}
                  </h3>
                  <div className="mx-5 mt-4 border-t-2 border-[oklch(0.72_0.16_25/0.8)] pt-4">
                    <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/50">
                      <X className="h-3.5 w-3.5 text-[oklch(0.78_0.14_25)]" strokeWidth={2.4} />
                      Często tak bywa
                    </p>
                    <p className="mt-2 pb-1 text-sm leading-relaxed text-white/65">{row.usual}</p>
                  </div>
                  <div
                    className={cn(
                      "m-3 mt-4 rounded-2xl border border-[oklch(0.75_0.16_290/0.45)] bg-[oklch(0.32_0.12_290/0.28)] p-4 shadow-[0_0_32px_-14px_oklch(0.62_0.22_290/0.85)]",
                      focused && "shadow-[0_0_36px_-8px_oklch(0.62_0.22_290/0.95)]",
                    )}
                  >
                    <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[oklch(0.88_0.08_290)]">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                      U nas
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/90">{row.ours}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

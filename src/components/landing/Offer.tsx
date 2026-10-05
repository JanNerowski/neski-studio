import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { Globe, Megaphone, ShieldCheck, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const ITEMS: {
  n: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}[] = [
  {
    n: "01",
    title: "Strona, która zamienia widzów w klientów.",
    desc: "Przemyślana architektura i design, dzięki którym odwiedzający natychmiast rozumieją Twoją wartość i zostawiają kontakt.",
    icon: Globe,
  },
  {
    n: "02",
    title: "Stały dopływ zapytań z Google i Social Media.",
    desc: "Uruchamiamy reklamy i pozycjonowanie tam, gdzie Twoi klienci naprawdę szukają usług. Ty odbierasz maile i telefony.",
    icon: Megaphone,
  },
  {
    n: "03",
    title: "Święty spokój i pełne bezpieczeństwo.",
    desc: "Szybki hosting, poczta firmowa i stałe wsparcie techniczne. Twoja strona jest bezpieczna i zawsze aktualna.",
    icon: ShieldCheck,
  },
];

const GLOW_AT = ["18% 0%", "70% 12%", "40% 100%"];

export function Offer() {
  const [active, setActive] = useState(0);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const item = ITEMS[active];

  const moveGlow = (event: MouseEvent<HTMLDivElement>) => {
    const glow = glowRef.current;
    if (!glow) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    glow.style.opacity = "1";
    glow.style.background = `radial-gradient(200px circle at ${x}px ${y}px, oklch(0.62 0.22 290 / 0.34), transparent 68%)`;
  };

  const hideGlow = () => {
    const glow = glowRef.current;
    if (glow) glow.style.opacity = "0";
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    const back = event.key === "ArrowUp" || event.key === "ArrowLeft";
    if (!forward && !back) return;
    event.preventDefault();
    const next = (active + (forward ? 1 : -1) + ITEMS.length) % ITEMS.length;
    setActive(next);
    document.getElementById(`offer-tab-${next}`)?.focus();
  };

  return (
    <section id="oferta" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Oferta</SectionLabel>
          <h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-gradient">Wszystko, czego potrzebuje Twoja firma,</span>{" "}
            <span className="text-gradient-brand">by zdobywać klientów w sieci.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground italic md:text-[17px]">
            Zamiast szukać agencji, programisty i hostingu osobno – dostajesz gotowy system sprzedaży
            pod klucz.
          </p>
        </Reveal>

        <Reveal className="mt-12 md:mt-16" delay={80}>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.28fr)] lg:gap-10">
            <div
              role="tablist"
              aria-label="Filary oferty"
              aria-orientation="vertical"
              className="relative flex flex-col gap-2"
              onMouseMove={moveGlow}
              onMouseLeave={hideGlow}
              onKeyDown={onKeyDown}
            >
              <div
                ref={glowRef}
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-200"
              />
              {ITEMS.map((tab, i) => {
                const Icon = tab.icon;
                const isActive = i === active;
                return (
                  <button
                    key={tab.n}
                    id={`offer-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="offer-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative z-10 flex w-full cursor-pointer items-start gap-4 rounded-2xl px-4 py-4 text-left transition-all duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.75_0.16_290)]",
                      isActive
                        ? "bg-[oklch(0.2_0.06_285/0.78)] text-white shadow-[0_0_0_1px_oklch(0.75_0.16_290/0.45),0_18px_48px_-20px_oklch(0.55_0.26_295/0.85),0_0_40px_oklch(0.58_0.22_290/0.28)]"
                        : "bg-transparent text-white/70 hover:bg-white/[0.045] hover:text-white/90 hover:shadow-[0_0_32px_oklch(0.55_0.2_290/0.22)]",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                        isActive
                          ? "bg-[oklch(0.32_0.12_290/0.55)] ring-1 ring-[oklch(0.75_0.18_290/0.45)]"
                          : "bg-white/[0.04] ring-1 ring-white/10",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 transition-colors duration-300",
                          isActive ? "text-[oklch(0.88_0.12_290)]" : "text-white/35",
                        )}
                        strokeWidth={1.75}
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            "font-display text-xs font-semibold tracking-[0.18em]",
                            isActive
                              ? "text-[oklch(0.84_0.14_290)]"
                              : "text-white/35",
                            isActive && !reducedMotion && "animate-offer-num",
                          )}
                        >
                          {tab.n}
                        </span>
                        {isActive && (
                          <span className="relative flex h-1.5 w-1.5" aria-hidden>
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[oklch(0.75_0.18_290)] opacity-70 motion-safe:animate-ping" />
                            <span className="relative h-1.5 w-1.5 rounded-full bg-[oklch(0.8_0.16_290)] shadow-[0_0_10px_oklch(0.75_0.2_290)]" />
                          </span>
                        )}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block font-display text-[15px] font-semibold leading-snug tracking-tight md:text-base",
                          isActive ? "text-white" : "text-white/70 group-hover:text-white/90",
                        )}
                      >
                        {tab.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_oklch(1_0_0/0.1),0_30px_80px_-36px_oklch(0.45_0.22_290/0.55)] backdrop-blur-2xl md:p-8 lg:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-all duration-700"
                style={{
                  background: `radial-gradient(55% 60% at ${GLOW_AT[active]}, oklch(0.62 0.22 290 / 0.22), transparent 70%)`,
                }}
              />
              <div
                key={item.n}
                id="offer-panel"
                role="tabpanel"
                aria-labelledby={`offer-tab-${active}`}
                className={cn(
                  "relative grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]",
                  !reducedMotion && "animate-offer-panel",
                )}
              >
                <OfferPreview index={active} />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[oklch(0.82_0.12_290)]">
                    {item.n}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight md:text-[1.7rem]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/75 md:text-[16px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function OfferPreview({ index }: { index: number }) {
  if (index === 1) return <AdsPreview />;
  if (index === 2) return <CarePreview />;
  return <SitePreview />;
}

function SitePreview() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white text-neutral-950 shadow-[0_28px_70px_-28px_oklch(0_0_0/0.7)]">
      <div className="flex items-center gap-1.5 border-b border-neutral-200/80 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-neutral-200" />
        <span className="h-2 w-2 rounded-full bg-neutral-200" />
        <span className="h-2 w-2 rounded-full bg-neutral-200" />
        <span className="ml-3 font-display text-[10px] font-semibold tracking-[0.2em] text-neutral-400">
          NESKI
        </span>
      </div>
      <div className="px-5 py-6 md:px-7 md:py-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-violet-600">
          Strona firmowa
        </p>
        <p className="mt-3 max-w-[16rem] font-display text-[1.65rem] font-semibold leading-[1.05] tracking-tight text-neutral-950 md:text-[1.85rem]">
          Nowoczesny design, który sprzedaje.
        </p>
        <p className="mt-3 max-w-[15rem] text-[12px] leading-relaxed text-neutral-500">
          Oferta, zdjęcia i kontakt w jednym miejscu. Klient wie, do kogo pisze.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <span className="rounded-full bg-neutral-950 px-3.5 py-1.5 text-[11px] font-semibold text-white">
            Zostaw kontakt
          </span>
          <span className="text-[11px] font-medium text-neutral-400">Zobacz ofertę</span>
        </div>
      </div>
    </div>
  );
}

function AdsPreview() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[oklch(0.14_0.03_278/0.72)] p-5 md:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Zapytania / 30 dni</p>
          <p className="mt-1 font-display text-4xl font-semibold tracking-tight text-white">+128</p>
        </div>
        <p className="text-[11px] font-medium text-[oklch(0.82_0.14_290)]">Google + Meta</p>
      </div>
      <svg viewBox="0 0 280 88" className="mt-4 h-20 w-full" aria-hidden>
        <defs>
          <linearGradient id="offer-chart" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.18 290)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="oklch(0.72 0.18 290)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 72 C 36 70, 48 58, 78 54 S 130 62, 156 40 S 210 18, 280 8 L 280 88 L 0 88 Z"
          fill="url(#offer-chart)"
        />
        <path
          d="M0 72 C 36 70, 48 58, 78 54 S 130 62, 156 40 S 210 18, 280 8"
          fill="none"
          stroke="oklch(0.78 0.16 290)"
          strokeWidth="2.2"
        />
      </svg>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <span className="rounded-xl bg-white/[0.04] px-3 py-2 text-[12px] text-white/70">
          Pozycjonowanie
        </span>
        <span className="rounded-xl bg-white/[0.04] px-3 py-2 text-[12px] text-white/70">
          Reklamy
        </span>
      </div>
    </div>
  );
}

function CarePreview() {
  const rows = ["Hosting", "Poczta firmowa", "Aktualizacje"];
  return (
    <div className="rounded-2xl border border-white/10 bg-[oklch(0.14_0.03_278/0.72)] p-5 md:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.28_0.1_290/0.45)] ring-1 ring-[oklch(0.75_0.16_290/0.35)]">
          <ShieldCheck className="h-5 w-5 text-[oklch(0.86_0.12_290)]" strokeWidth={1.75} />
        </span>
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">Wszystko pod opieką</p>
          <p className="text-[12px] text-white/50">Strona online, poczta działa</p>
        </div>
      </div>
      <ul className="mt-5 space-y-2">
        {rows.map((row) => (
          <li
            key={row}
            className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2.5 text-[13px]"
          >
            <span className="text-white/80">{row}</span>
            <span className="text-[11px] font-medium tracking-wide text-[oklch(0.82_0.14_290)]">
              Aktywne
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

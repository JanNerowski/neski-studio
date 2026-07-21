import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Layers,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 md:pt-40 md:pb-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* Left */}
        <div className="relative animate-rise">
          <div className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Projektujemy cyfrową obecność lokalnych firm
          </div>

          <h1 className="mt-8 font-display text-[54px] leading-[0.98] tracking-[-0.02em] sm:text-[72px] md:text-[88px] lg:text-[96px]">
            <span className="text-gradient">Twoja strona</span>
            <br />
            <span className="text-gradient">powinna zdobywać</span>
            <br />
            <span className="italic text-gradient-brand">klientów.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-[17px]">
            Projektujemy nowoczesne strony internetowe i kampanie marketingowe, które
            pomagają lokalnym firmom zdobywać więcej wartościowych zapytań oraz budować
            profesjonalny wizerunek.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#kontakt"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
            >
              <span className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,transparent,oklch(0.7_0.2_290/_0.4),transparent)] bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              Umów bezpłatną analizę
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#realizacje"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3.5 text-sm text-foreground/90 backdrop-blur transition-colors hover:bg-white/[0.06]"
            >
              Zobacz realizacje
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12px] uppercase tracking-[0.18em] text-muted-foreground/70">
            <span>Strony premium</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>Kampanie Google & Meta</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>Analytics</span>
          </div>
        </div>

        {/* Right: device presentation */}
        <DevicePresentation />
      </div>
    </section>
  );
}

function DevicePresentation() {
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      {/* Purple ambient glow behind laptop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 translate-y-4 scale-110 rounded-[100px] bg-[radial-gradient(60%_55%_at_50%_45%,oklch(0.55_0.3_295/_0.55),transparent_70%)] blur-2xl animate-glow-pulse"
      />
      {/* Smaller blue glow near phone */}
      <div
        aria-hidden
        className="absolute -bottom-10 right-0 -z-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.24_250/_0.5),transparent_65%)] blur-3xl"
      />

      {/* Laptop */}
      <div
        className="relative"
        style={{ animation: "float-slow 9s ease-in-out infinite" }}
      >
        <div className="relative rounded-[22px] bg-gradient-to-b from-[oklch(0.28_0.02_275)] to-[oklch(0.18_0.02_275)] p-[10px] shadow-[0_60px_120px_-40px_oklch(0.05_0.05_285/_0.9),0_0_0_1px_oklch(1_0_0/_0.08)]">
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/10" />
              <span className="h-2 w-2 rounded-full bg-white/10" />
              <span className="h-2 w-2 rounded-full bg-white/10" />
            </div>
            <div className="glass rounded-full px-3 py-0.5 text-[10px] text-muted-foreground">
              workspace.neski
            </div>
            <div className="w-12" />
          </div>
          <div className="overflow-hidden rounded-[14px] border border-white/5">
            <DesktopPreview />
          </div>
        </div>
        {/* Laptop base */}
        <div className="mx-auto h-3 w-[92%] rounded-b-[20px] bg-gradient-to-b from-[oklch(0.2_0.02_275)] to-[oklch(0.12_0.02_275)] shadow-[0_10px_30px_-10px_oklch(0_0_0/_0.9)]" />
        <div className="mx-auto -mt-1 h-1.5 w-[30%] rounded-full bg-black/60" />
      </div>

      {/* Phone overlapping lower-right corner (does not cover stages/preview/progress on the left) */}
      <div
        className="absolute -bottom-16 -right-2 w-[34%] max-w-[200px] md:-right-10"
        style={{ animation: "float-slower 11s ease-in-out infinite" }}
      >
        <div className="rounded-[36px] bg-gradient-to-b from-[oklch(0.28_0.02_275)] to-[oklch(0.16_0.02_275)] p-[6px] shadow-[0_40px_80px_-20px_oklch(0.05_0.05_285/_0.9),0_0_0_1px_oklch(1_0_0/_0.08)]">
          <div className="relative overflow-hidden rounded-[30px] border border-white/5">
            <div className="absolute left-1/2 top-1.5 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black/80" />
            <MobilePreview />
          </div>
        </div>
      </div>

      {/* Floating benefit cards */}
      <FloatingCards />
    </div>
  );
}

const STAGES = [
  { label: "Strategia", state: "done" },
  { label: "Projekt", state: "done" },
  { label: "Treści", state: "done" },
  { label: "Wdrożenie", state: "done" },
  { label: "Publikacja", state: "active" },
] as const;

const PROGRESS_STEPS = [
  { at: 15, label: "Analiza struktury" },
  { at: 40, label: "Optymalizacja wersji mobilnej" },
  { at: 65, label: "Konfiguracja formularzy" },
  { at: 90, label: "Finalne testy" },
  { at: 100, label: "Gotowa do publikacji" },
] as const;

function useLaunchProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const rampMs = 8500; // slow ramp to 99
    const pauseMs = 1400;
    const finishMs = 900;
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const tick = (now: number) => {
      const elapsed = now - start;
      let v: number;
      if (elapsed < rampMs) {
        v = easeInOut(elapsed / rampMs) * 99;
      } else if (elapsed < rampMs + pauseMs) {
        v = 99;
      } else if (elapsed < rampMs + pauseMs + finishMs) {
        const t = (elapsed - rampMs - pauseMs) / finishMs;
        v = 99 + easeInOut(t) * 1;
      } else {
        v = 100;
        setPct(100);
        return;
      }
      setPct(v);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return pct;
}

function DesktopPreview() {
  const pct = useLaunchProgress();
  const currentStep =
    PROGRESS_STEPS.find((s) => pct <= s.at) ?? PROGRESS_STEPS[PROGRESS_STEPS.length - 1];
  const isDone = pct >= 100;

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[oklch(0.14_0.03_280)] via-[oklch(0.11_0.02_278)] to-[oklch(0.09_0.02_275)]">
      <div
        aria-hidden
        className="absolute -top-1/3 left-1/3 h-[70%] w-[60%] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.28_295/_0.28),transparent_65%)] blur-2xl"
      />

      {/* Top bar */}
      <div className="relative flex items-center justify-between border-b border-white/5 px-3 py-1.5 text-[6.5px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="flex h-3 w-3 items-center justify-center rounded-[3px] bg-gradient-to-br from-[oklch(0.7_0.22_290)] to-[oklch(0.55_0.22_260)] text-[5px] font-bold text-white">
            N
          </span>
          <span className="text-[6.5px] font-medium tracking-[0.14em] text-foreground/90">
            NESKI · PROJECT WORKSPACE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[oklch(0.7_0.22_290/_0.15)] px-1.5 py-[1px] text-[5.5px] text-[oklch(0.85_0.15_290)] ring-1 ring-[oklch(0.7_0.22_290/_0.3)]">
            <span className="h-1 w-1 rounded-full bg-[oklch(0.85_0.15_290)]" /> W trakcie
          </span>
          <span className="text-[5.5px]">Projekt · Nowa strona</span>
        </div>
      </div>

      {/* Body: sidebar + preview + activity */}
      <div className="relative grid grid-cols-[28%_1fr_22%] gap-2 p-2">
        {/* Sidebar: stages */}
        <div className="rounded-md border border-white/5 bg-white/[0.02] p-2">
          <div className="mb-1.5 text-[5px] uppercase tracking-[0.18em] text-muted-foreground/70">
            Etapy projektu
          </div>
          <ul className="space-y-1">
            {STAGES.map((s, i) => {
              const done = s.state === "done";
              return (
                <li key={s.label} className="flex items-center gap-1.5 text-[6.5px]">
                  <span
                    className={`flex h-2.5 w-2.5 items-center justify-center rounded-full ${
                      done
                        ? "bg-[oklch(0.7_0.22_290)] text-black"
                        : "bg-[oklch(0.28_0.12_290/_0.5)] ring-1 ring-[oklch(0.7_0.22_290/_0.6)]"
                    }`}
                  >
                    {done ? (
                      <Check className="h-1.5 w-1.5" strokeWidth={3} />
                    ) : (
                      <span className="h-1 w-1 rounded-full bg-[oklch(0.85_0.15_290)]" />
                    )}
                  </span>
                  <span
                    className={done ? "text-foreground/70 line-through decoration-white/20" : "text-foreground/95 font-medium"}
                  >
                    {s.label}
                  </span>
                  <span className="ml-auto text-[5px] text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Central preview */}
        <div className="rounded-md border border-white/5 bg-gradient-to-br from-[oklch(0.13_0.03_280)] to-[oklch(0.08_0.02_275)] p-1.5">
          <div className="flex items-center justify-between px-0.5 pb-1 text-[5px] text-muted-foreground/70">
            <span>Podgląd · Strona główna</span>
            <span className="inline-flex items-center gap-0.5">
              <span className="h-0.5 w-0.5 rounded-full bg-white/30" />
              <span className="h-0.5 w-0.5 rounded-full bg-white/30" />
              <span className="h-0.5 w-0.5 rounded-full bg-white/30" />
            </span>
          </div>
          <div className="relative overflow-hidden rounded-[6px] border border-white/5 bg-[oklch(0.09_0.02_275)]">
            <div
              aria-hidden
              className="absolute -top-1/2 left-1/2 h-full w-[80%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.28_295/_0.35),transparent_65%)] blur-xl"
            />
            <div className="relative flex flex-col items-center px-3 py-3 text-center">
              <div className="rounded-full border border-white/10 px-1.5 py-[1px] text-[4.5px] text-muted-foreground">
                Studio projektowe · Warszawa
              </div>
              <div className="mt-1.5 font-display text-[11px] leading-[1.05] tracking-tight">
                Twoja strona
                <span className="italic text-gradient-brand"> zdobywa klientów.</span>
              </div>
              <div className="mt-1.5 flex items-center gap-1">
                <span className="rounded-full bg-white px-1.5 py-[1px] text-[4.5px] font-medium text-black">
                  Zamów rozmowę
                </span>
                <span className="rounded-full border border-white/10 px-1.5 py-[1px] text-[4.5px] text-foreground/80">
                  Realizacje
                </span>
              </div>
              <div className="mt-2 grid w-full grid-cols-3 gap-0.5">
                <div className="h-3 rounded-sm bg-white/[0.04]" />
                <div className="h-3 rounded-sm bg-white/[0.06]" />
                <div className="h-3 rounded-sm bg-white/[0.04]" />
              </div>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="rounded-md border border-white/5 bg-white/[0.02] p-2">
          <div className="mb-1.5 text-[5px] uppercase tracking-[0.18em] text-muted-foreground/70">
            Aktywność
          </div>
          <ul className="space-y-1.5 text-[5.5px] text-foreground/85">
            <li className="flex items-start gap-1">
              <Sparkles className="mt-[1px] h-1.5 w-1.5 text-[oklch(0.85_0.15_290)]" />
              <span>Zaktualizowano hero</span>
            </li>
            <li className="flex items-start gap-1">
              <Layers className="mt-[1px] h-1.5 w-1.5 text-[oklch(0.85_0.15_290)]" />
              <span>Nowa sekcja: FAQ</span>
            </li>
            <li className="flex items-start gap-1">
              <MessageSquare className="mt-[1px] h-1.5 w-1.5 text-[oklch(0.85_0.15_290)]" />
              <span>Zatwierdzone treści</span>
            </li>
            <li className="flex items-start gap-1">
              <Check className="mt-[1px] h-1.5 w-1.5 text-[oklch(0.85_0.15_290)]" strokeWidth={3} />
              <span>Formularz kontaktowy</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Launch progress module */}
      <div className="relative mx-2 mb-2 rounded-md border border-white/10 bg-gradient-to-r from-white/[0.03] to-white/[0.01] p-2">
        <div className="flex items-center justify-between text-[6px]">
          <div className="flex items-center gap-1.5">
            <span
              className={`flex h-3 w-3 items-center justify-center rounded-full ${
                isDone
                  ? "bg-[oklch(0.7_0.22_290)] text-black"
                  : "bg-[oklch(0.28_0.12_290/_0.5)] ring-1 ring-[oklch(0.7_0.22_290/_0.6)]"
              }`}
            >
              {isDone ? (
                <Check className="h-2 w-2" strokeWidth={3} />
              ) : (
                <span className="h-1 w-1 animate-pulse rounded-full bg-[oklch(0.85_0.15_290)]" />
              )}
            </span>
            <span className="font-medium text-foreground/95">
              Przygotowanie strony do publikacji
            </span>
          </div>
          <span className="tabular-nums text-muted-foreground">
            {Math.round(pct)}%
          </span>
        </div>
        <div className="relative mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.22_290)] via-[oklch(0.65_0.22_275)] to-[oklch(0.6_0.22_250)] shadow-[0_0_10px_oklch(0.7_0.22_290/_0.6)] transition-[width] duration-200 ease-out"
            style={{ width: `${pct}%` }}
          >
            <div
              className="absolute inset-y-0 -left-1/2 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]"
              style={{ animation: "progress-shimmer 2.4s ease-in-out infinite" }}
            />
          </div>
        </div>
        <div className="mt-1 text-[5.5px] text-muted-foreground/80">
          {currentStep.label}
        </div>
      </div>
    </div>
  );
}

function MobilePreview() {
  return (
    <div className="relative aspect-[9/18] w-full overflow-hidden bg-gradient-to-b from-[oklch(0.14_0.03_280)] to-[oklch(0.09_0.02_275)]">
      <div
        aria-hidden
        className="absolute -top-1/4 left-1/2 h-[50%] w-[120%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.24_250/_0.35),transparent_60%)] blur-2xl"
      />
      {/* status bar */}
      <div className="relative flex items-center justify-between px-3 pt-6 text-[5px] text-muted-foreground/80">
        <span>9:41</span>
        <span className="h-1 w-6 rounded-sm bg-white/10" />
      </div>

      <div className="relative mt-3 px-3">
        <div className="text-[4.5px] uppercase tracking-[0.18em] text-muted-foreground/70">
          Kontakt
        </div>
        <div className="mt-1 font-display text-[10px] leading-[1.05] tracking-tight text-foreground">
          Porozmawiajmy o<br />
          <span className="italic text-gradient-brand">Twojej firmie.</span>
        </div>
        <p className="mt-1.5 text-[5px] leading-relaxed text-muted-foreground">
          Opowiedz krótko, czego potrzebujesz. Odezwiemy się z konkretną propozycją.
        </p>

        <div className="mt-2.5 space-y-1.5">
          <div className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-1">
            <div className="text-[3.5px] uppercase tracking-wider text-muted-foreground/70">
              Imię
            </div>
            <div className="text-[6px] text-foreground/90">Anna</div>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-1">
            <div className="text-[3.5px] uppercase tracking-wider text-muted-foreground/70">
              Telefon lub e-mail
            </div>
            <div className="text-[6px] text-foreground/60">+48 ___ ___ ___</div>
          </div>
          <div className="rounded-md border border-[oklch(0.7_0.22_290/_0.4)] bg-[oklch(0.28_0.12_290/_0.15)] px-1.5 py-1">
            <div className="text-[3.5px] uppercase tracking-wider text-[oklch(0.85_0.15_290)]">
              Czego potrzebujesz?
            </div>
            <div className="text-[6px] text-foreground/90">Nowa strona firmowa</div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-[oklch(0.7_0.22_290)] to-[oklch(0.6_0.22_250)] py-1 text-[6px] font-medium text-white shadow-[0_6px_20px_-6px_oklch(0.6_0.22_270/_0.9)]">
          Wyślij zapytanie
          <ArrowRight className="h-1.5 w-1.5" />
        </div>

        <div className="mt-2 flex items-center justify-between text-[4.5px] text-muted-foreground/80">
          <span className="inline-flex items-center gap-0.5">
            <Phone className="h-1.5 w-1.5" /> Zadzwoń
          </span>
          <span className="inline-flex items-center gap-0.5">
            <Mail className="h-1.5 w-1.5" /> E-mail
          </span>
          <span className="inline-flex items-center gap-0.5">
            <MapPin className="h-1.5 w-1.5" /> Mapa
          </span>
        </div>
      </div>
    </div>
  );
}

const BENEFITS = [
  {
    title: "Nowoczesny wizerunek",
    desc: "Firma wygląda profesjonalnie od pierwszego wejścia.",
    icon: Sparkles,
    side: "tl",
    anim: "card-drift-a",
    duration: 7,
  },
  {
    title: "Prosty kontakt",
    desc: "Klient szybko znajdzie numer telefonu, formularz lub mapę.",
    icon: Phone,
    side: "tr",
    anim: "card-drift-b",
    duration: 8,
  },
  {
    title: "Pełna opieka",
    desc: "W razie potrzeby zajmujemy się aktualizacjami i rozwojem strony.",
    icon: ShieldCheck,
    side: "bl",
    anim: "card-drift-c",
    duration: 6.5,
  },
  {
    title: "Przyciąga odpowiednich klientów",
    desc: "Strona zachęca do kontaktu osoby zainteresowane Twoimi usługami.",
    icon: Users,
    side: "br",
    anim: "card-drift-d",
    duration: 7.5,
  },
] as const;

function FloatingCards() {
  const positions: Record<string, string> = {
    tl: "hidden md:block -left-24 -top-4 lg:-left-28",
    tr: "hidden md:block -right-24 top-6 lg:-right-28",
    bl: "hidden md:block -left-20 bottom-6 lg:-left-24",
    br: "hidden md:block -right-16 -bottom-24 lg:-right-20",
  };
  return (
    <>
      {BENEFITS.map((b, i) => {
        const Icon = b.icon;
        return (
          <div
            key={b.title}
            className={`absolute ${positions[b.side]} w-[190px]`}
            style={{
              animation: `rise-in 1s cubic-bezier(0.2,0.7,0.2,1) ${0.5 + i * 0.15}s both, ${b.anim} ${b.duration}s ease-in-out ${i * 0.6}s infinite`,
            }}
          >
            <div className="glass rounded-2xl p-3 shadow-[0_10px_30px_-10px_oklch(0.05_0.05_285/_0.8)] ring-1 ring-white/5">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[oklch(0.28_0.12_290/_0.35)] ring-1 ring-[oklch(0.7_0.22_290/_0.4)]">
                  <Icon className="h-3 w-3 text-[oklch(0.85_0.15_290)]" strokeWidth={2} />
                </span>
                <span className="text-[11.5px] font-medium leading-tight text-foreground/95">
                  {b.title}
                </span>
              </div>
              <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted-foreground">
                {b.desc}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

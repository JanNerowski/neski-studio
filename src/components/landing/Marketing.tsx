import {
  ArrowRight,
  BarChart3,
  Megaphone,
  RefreshCw,
  Search,
  Share2,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";

const FLOW = [
  { label: "Strona", icon: Share2 },
  { label: "Ruch", icon: Megaphone },
  { label: "Użytkownik", icon: Users },
  { label: "Konwersja", icon: Target },
  { label: "Analiza", icon: BarChart3 },
  { label: "Optymalizacja", icon: RefreshCw },
] as const;

const CHANNELS = [
  {
    icon: Search,
    title: "Google Ads",
    desc: "Kampanie w wyszukiwarce, które docierają do osób aktywnie szukających Twojej usługi.",
  },
  {
    icon: Megaphone,
    title: "Meta Ads",
    desc: "Reklamy na Facebooku i Instagramie budujące rozpoznawalność i generujące zapytania.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    desc: "Konfiguracja analityki, aby wiedzieć, co działa i gdzie inwestować budżet marketingowy.",
  },
  {
    icon: RefreshCw,
    title: "Remarketing",
    desc: "Powrót użytkowników, którzy odwiedzili stronę, ale jeszcze nie wysłali zapytania.",
  },
] as const;

const DEMO_METRICS = [
  { label: "Użytkownicy", value: "12.4k", change: "+18%" },
  { label: "Konwersje", value: "284", change: "+32%" },
  { label: "CTR", value: "4.8%", change: "+0.6%" },
  { label: "Leady", value: "96", change: "+24%" },
] as const;

export function Marketing() {
  return (
    <section id="marketing" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Marketing</SectionLabel>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
            <span className="text-gradient">Strona to początek.</span>{" "}
            <span className="italic text-gradient-brand">System rozwija wyniki.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground md:text-[17px]">
            Po publikacji strony uruchamiamy ruch, mierzymy zachowania użytkowników i
            optymalizujemy kolejne kroki. Wszystko w jednym, spójnym procesie.
          </p>
        </Reveal>

        <Reveal className="mt-14" delay={80}>
          <div className="glass overflow-hidden rounded-3xl p-6 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Przepływ wzrostu
            </p>
            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {FLOW.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="flex items-center gap-3 md:flex-col md:gap-2">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[oklch(0.28_0.12_290/_0.35)] ring-1 ring-[oklch(0.7_0.22_290/_0.3)]">
                      <Icon className="h-5 w-5 text-[oklch(0.85_0.15_290)]" strokeWidth={1.75} />
                    </span>
                    <span className="text-sm font-medium text-foreground">{step.label}</span>
                    {i < FLOW.length - 1 && (
                      <ArrowRight
                        aria-hidden
                        className="hidden h-4 w-4 text-muted-foreground/50 md:block md:rotate-0"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((channel, i) => {
            const Icon = channel.icon;
            return (
              <Reveal key={channel.title} delay={i * 70}>
                <article className="group glass h-full rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1">
                  <Icon className="h-5 w-5 text-[oklch(0.85_0.15_290)]" strokeWidth={1.75} />
                  <h3 className="mt-4 font-display text-2xl tracking-tight">{channel.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {channel.desc}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14" delay={120}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h3 className="font-display text-3xl tracking-tight md:text-4xl">
                <span className="text-gradient">Decyzje oparte</span>{" "}
                <span className="italic text-gradient-brand">na danych.</span>
              </h3>
              <p className="mt-4 max-w-lg text-muted-foreground md:text-[17px]">
                Konfiguruję analitykę tak, abyś widział źródła ruchu, konwersje i skuteczność
                kampanii - bez zgadywania, co naprawdę działa.
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground/70">
                Poniżej: przykładowy widok demo
              </p>
            </div>

            <div className="glass overflow-hidden rounded-3xl border border-white/10">
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[oklch(0.85_0.15_290)]" />
                  <span className="text-xs font-medium tracking-wide text-foreground/90">
                    NESKI · Analytics
                  </span>
                </div>
                <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-muted-foreground">
                  Demo
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-4">
                {DEMO_METRICS.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {m.label}
                    </p>
                    <p className="mt-1 font-display text-2xl tracking-tight">{m.value}</p>
                    <p className="mt-1 text-xs text-[oklch(0.75_0.18_145)]">{m.change}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5 px-5 py-4">
                <div className="flex items-end gap-1.5 h-20">
                  {[38, 52, 44, 68, 58, 74, 62, 80].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-[oklch(0.55_0.22_265)] to-[oklch(0.72_0.22_290)] opacity-80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  Źródła ruchu · przykładowe dane demonstracyjne
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

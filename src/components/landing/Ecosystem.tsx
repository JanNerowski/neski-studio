import {
  BarChart3,
  Globe,
  Megaphone,
  RefreshCw,
  Search,
  Target,
} from "lucide-react";

import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";

const ECOSYSTEM = [
  {
    n: "01",
    key: "strategy",
    title: "Strategia",
    desc: "Analizujemy firmę, klientów i cele. Ustalamy, co strona ma osiągać i jak ma prowadzić użytkownika.",
    icon: Target,
  },
  {
    n: "02",
    key: "website",
    title: "Strona internetowa",
    desc: "Projektujemy i wdrażamy nowoczesną stronę premium - szybką, czytelną i gotową do konwersji.",
    icon: Globe,
  },
  {
    n: "03",
    key: "visibility",
    title: "Widoczność",
    desc: "Dbamy o SEO, strukturę treści i techniczne fundamenty, które pomagają być widocznym w Google.",
    icon: Search,
  },
  {
    n: "04",
    key: "campaigns",
    title: "Kampanie",
    desc: "Uruchamiamy Google Ads i Meta Ads, które kierują wartościowy ruch prosto na Twoją stronę.",
    icon: Megaphone,
  },
  {
    n: "05",
    key: "analytics",
    title: "Analityka",
    desc: "Konfigurujemy pomiary, aby wiedzieć, skąd przychodzą zapytania i co naprawdę działa.",
    icon: BarChart3,
  },
  {
    n: "06",
    key: "optimization",
    title: "Optymalizacja",
    desc: "Regularnie poprawiamy stronę i kampanie na podstawie danych - wraz z rozwojem firmy.",
    icon: RefreshCw,
  },
] as const;

export function Ecosystem() {
  return (
    <section id="ekosystem" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Ekosystem</SectionLabel>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
            <span className="text-gradient">Strona to dopiero początek.</span>
            <br />
            <span className="italic text-gradient-brand">Wszystko razem napędza rozwój firmy.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground md:text-[17px]">
            NESKI Studio nie kończy pracy na publikacji. Budujemy spójny system: strategia,
            strona, widoczność, kampanie, analityka i ciągła optymalizacja.
          </p>
        </Reveal>

        <div className="relative mt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:block"
          />
          <ol className="grid grid-cols-1 gap-4 md:gap-5">
            {ECOSYSTEM.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.key} as="li" delay={i * 70}>
                  <article className="group relative md:pl-14">
                    <span
                      aria-hidden
                      className="absolute left-0 top-8 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-[oklch(0.72_0.22_290)] shadow-[0_0_16px_oklch(0.7_0.22_290/_0.8)] md:block"
                    />
                    <div className="glass flex flex-col gap-5 rounded-3xl p-6 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-24px_oklch(0.55_0.28_295/_0.45)] md:flex-row md:items-start md:p-8">
                      <div className="flex items-center gap-4 md:w-48 md:shrink-0 md:flex-col md:items-start">
                        <span className="font-display text-3xl text-gradient-brand">{item.n}</span>
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[oklch(0.28_0.12_290/_0.35)] ring-1 ring-[oklch(0.7_0.22_290/_0.35)]">
                          <Icon className="h-5 w-5 text-[oklch(0.85_0.15_290)]" strokeWidth={1.75} />
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

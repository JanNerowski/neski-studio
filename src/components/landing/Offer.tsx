import { Globe, Megaphone, Wrench } from "lucide-react";

import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";

const ITEMS = [
  {
    icon: Globe,
    title: "Strony internetowe",
    desc: "Czytelna oferta, zdjęcia, formularz i telefon. Jedna strona albo kilka podstron - klient od razu wie, czym się zajmujesz.",
  },
  {
    icon: Megaphone,
    title: "Widoczność i reklamy",
    desc: "Google, wizytówka firmy, kampanie Google Ads i Meta. Ruch na stronę, która umie zebrać zapytanie.",
  },
  {
    icon: Wrench,
    title: "Hosting i opieka",
    desc: "Domena, poczta, utrzymanie i poprawki po starcie. Strona zostaje pod opieką, nie oddana i zapomniana.",
  },
] as const;

export function Offer() {
  return (
    <section id="oferta" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Oferta</SectionLabel>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-gradient">Strony, widoczność i opieka</span>{" "}
            <span className="text-gradient-brand">- bez rozdrobnionej oferty.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground md:text-[17px]">
            Najpierw strona, która tłumaczy firmę. Potem Google i reklamy, gdy chcesz więcej zapytań.
            Hosting i poczta, żeby to działało.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 90}>
                <article className="glass h-full rounded-3xl p-6 md:p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_24px_60px_-28px_oklch(0.55_0.28_295/_0.55)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[oklch(0.28_0.12_290/_0.35)] ring-1 ring-[oklch(0.7_0.22_290/_0.35)]">
                    <Icon className="h-5 w-5 text-[oklch(0.85_0.15_290)]" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                    {item.desc}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

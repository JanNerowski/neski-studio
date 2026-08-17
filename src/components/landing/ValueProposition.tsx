import {
  Eye,
  MousePointerClick,
  Search,
  Sparkles,
} from "lucide-react";

import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";

const CARDS = [
  {
    icon: Sparkles,
    title: "Profesjonalny wizerunek",
    desc: "Pierwsze wrażenie buduje zaufanie. Strona premium pokazuje, że Twoja firma traktuje klientów poważnie.",
  },
  {
    icon: MousePointerClick,
    title: "Więcej wartościowych zapytań",
    desc: "Przemyślana struktura i CTA prowadzą użytkownika do kontaktu zamiast do opuszczenia strony.",
  },
  {
    icon: Eye,
    title: "Lepsza konwersja",
    desc: "Jasna oferta, prosty formularz i szybkie ładowanie zwiększają szansę na realne zapytanie.",
  },
  {
    icon: Search,
    title: "Widoczność w Google",
    desc: "Strona zoptymalizowana technicznie i merytorycznie ma większą szansę dotrzeć do nowych klientów.",
  },
] as const;

export function ValueProposition() {
  return (
    <section id="dlaczego" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Dlaczego to ma znaczenie</SectionLabel>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-gradient">Dobra strona internetowa</span>{" "}
            <span className="italic text-gradient-brand">to inwestycja, nie koszt.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground md:text-[17px]">
            Klienci oceniają firmę w kilka sekund. Strona, która wygląda profesjonalnie
            i działa szybko, realnie wpływa na liczbę zapytań i jakość leadów.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={i * 80} className="group">
                <article className="glass relative h-full overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_oklch(0.55_0.28_295/_0.55)]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.28_295/_0.25),transparent_70%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[oklch(0.28_0.12_290/_0.35)] ring-1 ring-[oklch(0.7_0.22_290/_0.35)]">
                    <Icon className="h-5 w-5 text-[oklch(0.85_0.15_290)]" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl tracking-tight">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                    {card.desc}
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

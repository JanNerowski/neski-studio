import { ArrowUpRight } from "lucide-react";

import gabinet from "@/assets/examples/przyklad-gabinet.png";
import hotel from "@/assets/examples/przyklad-hotel.png";
import lokal from "@/assets/examples/przyklad-lokal.png";
import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { useQuote } from "@/components/landing/QuoteDialog";

const EXAMPLES = [
  {
    image: gabinet,
    industry: "Gabinet kosmetologiczny",
    title: "Oferta zabiegów i umówienie wizyty",
    desc: "Zdjęcia, zakres usług i przycisk kontaktu. Pacjent wie, czy to miejsce dla niego.",
  },
  {
    image: lokal,
    industry: "Restauracja",
    title: "Menu, klimat i rezerwacja stolika",
    desc: "Gość na telefonie widzi, co jecie i jak zarezerwować wieczór.",
  },
  {
    image: hotel,
    industry: "Hotel nad morzem",
    title: "Pokoje, terminy i zapytanie",
    desc: "Zdjęcia obiektu, krótka oferta i droga do rezerwacji - bez ściany tekstu.",
  },
] as const;

export function Portfolio() {
  const { openQuote } = useQuote();

  return (
    <section id="portfolio" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>Portfolio</SectionLabel>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                <span className="text-gradient">Tak może wyglądać</span>{" "}
                <span className="text-gradient-brand">strona Twojej firmy.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                To wizualizacje kierunku, nie strony klientów. Pokazują, jak może wyglądać
                gabinet, lokal albo hotel - bez udawania cudzych realizacji.
              </p>
            </div>
            <button
              type="button"
              onClick={openQuote}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Chcę taką stronę <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-16 md:gap-20">
          {EXAMPLES.map((item, i) => (
            <Reveal key={item.industry} delay={i * 60}>
              <article
                className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 ${
                  i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-7">
                  <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.02] shadow-[0_60px_120px_-40px_oklch(0.05_0.05_285/_0.9)]">
                    <img
                      src={item.image}
                      alt={`Przykład strony: ${item.industry}`}
                      className="aspect-[16/10] w-full object-cover object-top"
                    />
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    0{i + 1} - {item.industry}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-[15px]">
                    {item.desc}
                  </p>
                  <button
                    type="button"
                    onClick={openQuote}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    Chcę podobny kierunek <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

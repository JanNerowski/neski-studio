import { useState } from "react";

import gabinet from "@/assets/examples/dla-kogo-gabinet.jpg";
import hotel from "@/assets/examples/dla-kogo-hotel.jpg";
import lokal from "@/assets/examples/dla-kogo-lokal.jpg";
import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const AUDIENCES = [
  {
    title: "Gabinety i usługi",
    desc: "Wizyta, telefon, adres. Strona ma umówić klienta, nie opowiadać o sobie stronami.",
    image: gabinet,
  },
  {
    title: "Lokale i gastronomia",
    desc: "Menu, godziny, rezerwacja. Gość na telefonie w kilka sekund wie, czy do Ciebie przyjść.",
    image: lokal,
  },
  {
    title: "Hotele i firmy lokalne",
    desc: "Oferta, dojazd, zapytanie. Kto szuka w Google, ma Cię zobaczyć jako konkretną opcję.",
    image: hotel,
  },
] as const;

export function ForWhom() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  return (
    <section id="dla-kogo" className="relative py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal from="left">
          <SectionLabel>Dla kogo</SectionLabel>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-gradient">Dla firm usługowych,</span>{" "}
            <span className="text-gradient-brand">które chcą zapytań z sieci.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground md:text-[17px]">
            Gabinet, lokal, hotel, warsztat - branża jest wskazówką, nie ograniczeniem.
            Ważne, żeby strona tłumaczyła ofertę i zbierała kontakt.
          </p>
        </Reveal>

        <div
            role="radiogroup"
            aria-label="Branże"
            className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 py-2 md:grid md:grid-cols-3 md:overflow-visible md:px-0"
          >
            {AUDIENCES.map((item, i) => {
              const isActive = i === active;
              return (
                <Reveal
                  key={item.title}
                  from={i === 0 ? "left" : i === 1 ? "pop" : "right"}
                  delay={i * 110}
                  className="w-[min(78vw,280px)] shrink-0 snap-start md:w-auto"
                >
                <button
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group w-full cursor-pointer rounded-[24px] border p-2 text-left transition-all duration-300",
                    isActive
                      ? "border-[oklch(0.75_0.16_290/0.55)] bg-white/10 shadow-[0_0_0_1px_oklch(0.75_0.16_290/0.35),0_18px_40px_-18px_oklch(0.55_0.26_295/0.75)] backdrop-blur-md"
                      : "border-white/10 bg-transparent hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_16px_40px_-24px_oklch(0.55_0.22_290/0.55)]",
                    isActive && !reducedMotion && "-translate-y-1",
                  )}
                >
                  <span className="relative block aspect-video overflow-hidden rounded-[18px]">
                    <img
                      src={item.image}
                      alt=""
                      className={cn(
                        "h-full w-full object-cover object-center transition duration-500",
                        isActive
                          ? "opacity-100 grayscale-0"
                          : "opacity-80 grayscale-[30%] group-hover:opacity-100 group-hover:grayscale-0",
                      )}
                    />
                  </span>
                  <span className="block px-2 pb-2 pt-3">
                    <span className="block font-display text-lg font-semibold tracking-tight">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-white/60">
                      {item.desc}
                    </span>
                  </span>
                </button>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-3 px-1 text-sm text-white/45">* Przykładowe wizualizacje stron.</p>
      </div>
    </section>
  );
}

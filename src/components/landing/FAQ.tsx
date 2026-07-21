import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { SectionLabel } from "@/components/landing/SectionLabel";

const FAQS = [
  {
    q: "Ile trwa realizacja strony?",
    a: "Większość stron realizuję w ciągu 2-3 tygodni roboczych, w zależności od zakresu projektu.",
  },
  {
    q: "Ile kosztuje strona w NESKI Studio?",
    a: "Każdy projekt wyceniam indywidualnie. Po krótkiej rozmowie przygotowuję propozycję dopasowaną do potrzeb Twojej firmy.",
  },
  {
    q: "Czy prowadzicie też reklamy?",
    a: "Tak. Pomagam przygotować kampanie marketingowe oraz konfiguruję analitykę, aby strona realnie wspierała rozwój firmy.",
  },
  {
    q: "Czy mogę rozbudować stronę później?",
    a: "Oczywiście, strona jest przygotowana tak, aby można ją było łatwo rozwijać wraz z rozwojem Twojego biznesu.",
  },
  {
    q: "Co jeśli mam już stronę?",
    a: "Zrobimy audyt i pokażemy, co warto zmienić. Czasem wystarczy redesign kluczowych sekcji zamiast pełnej przebudowy.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
          <span className="text-gradient">Pytania,</span>{" "}
          <span className="italic text-gradient-brand">które padają najczęściej.</span>
        </h2>
        <div className="mt-12 divide-y divide-white/5 border-y border-white/5">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="font-display text-2xl leading-tight tracking-tight md:text-3xl">
                    {f.q}
                  </span>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all ${
                      isOpen ? "bg-white text-black rotate-180" : "text-foreground"
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-8" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pr-14 text-muted-foreground md:text-[17px]">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

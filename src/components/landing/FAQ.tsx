import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";

import { SectionLabel } from "@/components/landing/SectionLabel";
import { Reveal } from "@/components/landing/Reveal";
import { FAQS } from "@/data/faq";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
            <span className="text-gradient">Pytania,</span>{" "}
            <span className="italic text-gradient-brand">które padają najczęściej.</span>
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-white/5 border-y border-white/5">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;

            return (
              <div key={f.q}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
                  >
                    <span className="font-sans text-[17px] font-medium leading-snug tracking-normal text-foreground md:text-xl">
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all ${
                        isOpen ? "bg-white text-black rotate-180" : "text-foreground"
                      }`}
                    >
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-8" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pr-14 text-muted-foreground md:text-[17px]">{f.a}</p>
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

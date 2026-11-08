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
        <Reveal from="pop">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-gradient">Pytania,</span>{" "}
            <span className="text-gradient-brand">które padają najczęściej.</span>
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-white/5 border-y border-white/5">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;

            return (
              <Reveal key={f.q} from={i % 2 === 0 ? "left" : "right"} delay={i * 60}>
              <div
                className="group -mx-3 rounded-2xl px-3 transition-all duration-300 hover:bg-[oklch(0.72_0.16_290/0.08)] hover:shadow-[inset_0_0_0_1px_oklch(1_0_0/0.1),0_16px_40px_-28px_oklch(0.62_0.22_295/0.95)] focus-within:bg-[oklch(0.72_0.16_290/0.08)] focus-within:shadow-[inset_0_0_0_1px_oklch(1_0_0/0.1),0_16px_40px_-28px_oklch(0.62_0.22_295/0.95)]"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
                  >
                    <span className="font-sans text-[17px] font-medium leading-snug tracking-normal text-foreground transition-colors duration-300 group-hover:text-white md:text-xl">
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-[oklch(0.78_0.14_290/0.7)] group-hover:shadow-[0_0_20px_-4px_oklch(0.72_0.18_290/0.9)] ${
                        isOpen ? "bg-white text-black rotate-180" : "text-foreground group-hover:text-white"
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
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

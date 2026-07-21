import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";
import { SectionLabel } from "@/components/landing/SectionLabel";

const CASES = [
  {
    img: case1,
    tag: "Restauracja premium",
    name: "Aurum",
    desc: "Rezerwacje online wzrosły trzykrotnie w pierwszym kwartale.",
  },
  {
    img: case2,
    tag: "Klinika stomatologiczna",
    name: "Luminé",
    desc: "Nowa strona i kampanie Google — ciągły napływ zapytań pacjentów.",
  },
  {
    img: case3,
    tag: "Pracownia architektoniczna",
    name: "Forma",
    desc: "Portfolio, które przyciąga świadomych, wysokobudżetowych klientów.",
  },
];

export function Portfolio() {
  return (
    <section id="realizacje" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Realizacje</SectionLabel>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
              <span className="text-gradient">Prace, które</span>
              <br />
              <span className="italic text-gradient-brand">mówią same za siebie.</span>
            </h2>
          </div>
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Chcę taką stronę <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-14">
          {CASES.map((c, i) => (
            <CaseStudy key={c.name} c={c} align={i % 2 === 0 ? "left" : "right"} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy({
  c,
  align,
  index,
}: {
  c: (typeof CASES)[number];
  align: "left" | "right";
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setY((progress - 0.5) * 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 ${
        align === "right" ? "lg:[&>div:first-child]:order-2" : ""
      }`}
    >
      <div className="lg:col-span-8">
        <div className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.02] shadow-[0_60px_120px_-40px_oklch(0.05_0.05_285/_0.9)]">
          <div
            aria-hidden
            className="absolute -inset-8 -z-10 rounded-[50px] bg-[radial-gradient(60%_60%_at_50%_50%,oklch(0.55_0.28_295/_0.35),transparent_70%)] blur-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
          <img
            src={c.img}
            alt={`${c.name} — realizacja`}
            width={1600}
            height={1200}
            loading="lazy"
            className="block h-auto w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
            style={{ transform: `translateY(${y * 0.3}px)` }}
          />
        </div>
      </div>
      <div className="lg:col-span-4">
        <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          0{index + 1} — {c.tag}
        </div>
        <h3 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">{c.name}</h3>
        <p className="mt-4 text-muted-foreground">{c.desc}</p>
      </div>
    </div>
  );
}

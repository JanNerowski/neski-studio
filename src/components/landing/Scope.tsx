import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";

const ITEMS = [
  {
    title: "Strona internetowa",
    desc: "Oferta, zdjęcia, formularz i telefon. Klient wie, czym się zajmujesz.",
  },
  {
    title: "Strona pod reklamę",
    desc: "Krótsza strona pod kampanię, gdy nie potrzeba całego serwisu.",
  },
  {
    title: "Reklamy Google",
    desc: "Kampanie, które prowadzą na stronę, a nie w pustkę.",
  },
  {
    title: "Reklamy Meta",
    desc: "Facebook i Instagram - cel to zapytanie, nie sam zasięg.",
  },
  {
    title: "Wizytówka Google",
    desc: "Firma na mapie i w wyszukiwarce, z danymi i zdjęciami.",
  },
  {
    title: "Hosting i poczta",
    desc: "Strona i firmowy e-mail działają, nie leżą na darmowym koncie.",
  },
  {
    title: "Opieka po starcie",
    desc: "Poprawki, drobne zmiany - wiesz, do kogo napisać.",
  },
] as const;

export function Scope() {
  return (
    <section id="zakres" className="relative py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Zakres</SectionLabel>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-gradient">Co konkretnie</span>{" "}
            <span className="text-gradient-brand">robimy.</span>
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 40}>
              <article className="group grid grid-cols-1 items-baseline gap-2 py-5 transition-colors duration-300 hover:bg-white/[0.03] sm:grid-cols-[4.5rem_minmax(0,16rem)_1fr] sm:gap-8 sm:px-3 md:py-6">
                <span className="font-display text-sm font-semibold text-[oklch(0.78_0.16_290)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {item.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

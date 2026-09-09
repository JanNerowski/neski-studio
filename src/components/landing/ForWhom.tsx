import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const AUDIENCES = [
  {
    title: "Gabinety i usługi",
    desc: "Wizyta, telefon, adres. Strona ma umówić klienta, nie opowiadać o sobie stronami.",
  },
  {
    title: "Lokale i gastronomia",
    desc: "Menu, godziny, rezerwacja. Gość na telefonie w kilka sekund wie, czy do Ciebie przyjść.",
  },
  {
    title: "Hotele i firmy lokalne",
    desc: "Oferta, dojazd, zapytanie. Kto szuka w Google, ma Cię zobaczyć jako konkretną opcję.",
  },
] as const;

export function ForWhom() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="dla-kogo" className="relative py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
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

        <div className="mt-8 grid grid-cols-1 gap-5 pb-6 md:mt-10 md:grid-cols-3 md:gap-5">
          {AUDIENCES.map((item, i) => (
            <Reveal key={item.title} delay={i * 90} className="h-full">
              <div className="relative h-full">
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-x-4 -bottom-6 h-16 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.26_290/_0.8),oklch(0.52_0.22_265/_0.28)_52%,transparent_72%)] blur-2xl",
                    !reducedMotion && "animate-audience-glow",
                  )}
                  style={{ animationDelay: `${i * 0.85}s` }}
                />
                <article className="relative z-10 rounded-[28px] border border-white/10 bg-[oklch(0.14_0.03_275)] p-6 md:p-7">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(80%_60%_at_50%_120%,oklch(0.55_0.22_290/_0.18),transparent_62%)]"
                  />
                  <h3 className="relative font-display text-2xl font-semibold tracking-tight md:text-[1.7rem]">
                    {item.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </article>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

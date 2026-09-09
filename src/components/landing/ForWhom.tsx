import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";

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
  return (
    <section id="dla-kogo" className="relative py-20 md:py-28">
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

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {AUDIENCES.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <article className="h-full rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/12 hover:bg-white/[0.04] hover:shadow-[0_24px_60px_-28px_oklch(0.55_0.28_295/_0.4)]">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

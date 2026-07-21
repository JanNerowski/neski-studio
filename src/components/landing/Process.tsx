import { SectionLabel } from "@/components/landing/SectionLabel";

const STEPS = [
  {
    n: "01",
    title: "Discovery",
    desc: "Rozmawiamy o Twojej firmie, klientach i celach.",
  },
  {
    n: "02",
    title: "Strategy",
    desc: "Planujemy strukturę strony oraz sposób prezentacji oferty.",
  },
  {
    n: "03",
    title: "Design",
    desc: "Projektujemy nowoczesny wygląd dopasowany do Twojej marki.",
  },
  {
    n: "04",
    title: "Launch",
    desc: "Publikujemy stronę i konfigurujemy wszystkie niezbędne narzędzia.",
  },
  {
    n: "05",
    title: "Growth",
    desc: "Wprowadzamy poprawki i rozwijamy stronę wraz z rozwojem firmy.",
  },
];

export function Process() {
  return (
    <section id="proces" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Proces</SectionLabel>
        <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
          <span className="text-gradient">Od pomysłu do gotowej strony. </span>{" "}
          <span className="italic text-gradient-brand">Przejrzysty proces na każdym etapie.</span>
        </h2>

        <div className="relative mt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent md:block"
          />
          <ol className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-6">
            {STEPS.map((s, i) => (
              <li
                key={s.n}
                className="animate-rise"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="relative flex items-center gap-4 md:block">
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full glass font-display text-xl">
                    <span className="text-gradient-brand">{s.n}</span>
                  </span>
                  <div className="md:mt-6">
                    <h3 className="font-display text-2xl tracking-tight">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

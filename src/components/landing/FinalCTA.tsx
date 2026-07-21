import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="kontakt" className="relative px-6 pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-b from-[oklch(0.2_0.04_285)] to-[oklch(0.13_0.02_275)] px-8 py-20 text-center md:px-20 md:py-28">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_20%,oklch(0.55_0.3_295/_0.5),transparent_70%)]"
          />
          <div
            aria-hidden
            className="absolute -bottom-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.5_0.25_265/_0.4),transparent_60%)] blur-3xl"
          />
          <div className="relative">
            <div className="glass mx-auto inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] text-muted-foreground">
              Odpowiadamy w ciągu 24h
            </div>
            <h2 className="mx-auto mt-8 max-w-4xl font-display text-5xl leading-[1] tracking-[-0.02em] md:text-7xl lg:text-8xl">
              <span className="text-gradient">Zbudujmy stronę,</span>
              <br />
              <span className="italic text-gradient-brand">która pracuje.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-muted-foreground md:text-[17px]">
              Podczas bezpłatnej konsultacji przeanalizujemy Twoją obecną stronę lub
              pomysł i zaproponujemy rozwiązania dopasowane do Twojego biznesu. Bez
              zobowiązań.
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href="mailto:hello@neski.studio"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
              >
                Umów bezpłatną analizę
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

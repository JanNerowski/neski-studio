import { ContactForm } from "@/components/landing/ContactForm";
import { Reveal } from "@/components/landing/Reveal";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { getTelHref, siteConfig } from "@/config/site";

export function Contact() {
  return (
    <section id="kontakt" className="relative px-6 pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Kontakt</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            <span className="text-gradient">Napisz albo zadzwoń.</span>{" "}
            <span className="text-gradient-brand">Oddzwonię z propozycją.</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground md:text-[17px]">
            Formularz,{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {siteConfig.contact.email}
            </a>{" "}
            albo{" "}
            <a
              href={getTelHref()}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {siteConfig.contact.phone}
            </a>
            .
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={80}>
          <ContactForm idPrefix="contact" />
        </Reveal>
      </div>
    </section>
  );
}

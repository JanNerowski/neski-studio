import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { AmbientBackground } from "@/components/landing/AmbientBackground";
import { Ecosystem } from "@/components/landing/Ecosystem";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { Portfolio } from "@/components/landing/Portfolio";
import { Process } from "@/components/landing/Process";

const FAQS_SEO = [
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

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "NESKI Studio - strony i marketing dla lokalnych firm." },
      {
        name: "description",
        content:
          "Projektujemy nowoczesne strony internetowe i kampanie marketingowe, które pomagają lokalnym firmom zdobywać wartościowych klientów.",
      },
      { property: "og:url", content: "https://neski-digital-craft.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://neski-digital-craft.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS_SEO.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});


function Home() {
  useEffect(() => {
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const getNavHeight = () => {
      const nav = document.querySelector("header nav") as HTMLElement | null;
      return nav?.getBoundingClientRect().height ?? 72;
    };
    const getNavOffset = () => getNavHeight() + 20;

    let raf = 0;
    let animating = false;
    const cancel = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      animating = false;
    };
    const smoothScrollTo = (targetY: number, duration = 700) => {
      if (animating) return;
      const startY = window.scrollY;
      const maxY =
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
        ) - window.innerHeight;
      const endY = Math.max(0, Math.min(maxY, targetY));
      if (Math.abs(endY - startY) < 1) return;
      animating = true;
      const startT = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - startT) / duration);
        const y = startY + (endY - startY) * easeInOutCubic(p);
        window.scrollTo(0, y);
        if (p < 1) {
          raf = requestAnimationFrame(step);
        } else {
          raf = 0;
          animating = false;
        }
      };
      raf = requestAnimationFrame(step);
    };
    const scrollToHash = (hash: string) => {
      if (!hash || hash === "#") return;
      if (hash === "#top") {
        smoothScrollTo(0);
        return;
      }
      const el = document.querySelector(hash) as HTMLElement | null;
      if (!el) return;
      // Prefer the section's first eyebrow/heading so we stop at the visible title,
      // not at the section's outer padding.
      const anchorEl =
        (el.querySelector("[data-section-anchor]") as HTMLElement | null) ||
        (el.querySelector("h1, h2, h3") as HTMLElement | null) ||
        el;
      const y = anchorEl.getBoundingClientRect().top + window.scrollY - getNavOffset();
      smoothScrollTo(y);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || !hash.startsWith("#")) return;
      e.preventDefault();
      if (animating) return;
      scrollToHash(hash);
      history.replaceState(null, "", hash === "#top" ? " " : hash);
    };
    const onUserScroll = () => {
      // Only cancel on genuine user input (wheel/touch/keyboard), not programmatic scrolls
      cancel();
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(e.key)) {
        cancel();
      }
    };
    document.addEventListener("click", onClick);
    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchstart", onUserScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    if (window.location.hash) {
      setTimeout(() => scrollToHash(window.location.hash), 80);
    }
    return () => {
      cancel();
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchstart", onUserScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);



  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <AmbientBackground />
      <Navbar />
      <main className="relative">
        <Hero />
        <Ecosystem />
        <Portfolio />
        <Process />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { AmbientBackground } from "@/components/landing/AmbientBackground";
import { Contact } from "@/components/landing/Contact";
import { Ecosystem } from "@/components/landing/Ecosystem";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Marketing } from "@/components/landing/Marketing";
import { Navbar } from "@/components/landing/Navbar";
import { Portfolio } from "@/components/landing/Portfolio";
import { Process } from "@/components/landing/Process";
import { ValueProposition } from "@/components/landing/ValueProposition";
import { WhyBusiness } from "@/components/landing/WhyBusiness";
import { getAbsoluteUrl, siteConfig } from "@/config/site";
import { FAQS } from "@/data/faq";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: siteConfig.title },
      { name: "description", content: siteConfig.description },
      { property: "og:title", content: siteConfig.title },
      { property: "og:description", content: siteConfig.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteConfig.url },
      { property: "og:locale", content: siteConfig.locale },
      {
        property: "og:image",
        content: getAbsoluteUrl(siteConfig.ogImage.path),
      },
      {
        property: "og:image:width",
        content: String(siteConfig.ogImage.width),
      },
      {
        property: "og:image:height",
        content: String(siteConfig.ogImage.height),
      },
      { property: "og:image:type", content: siteConfig.ogImage.type },
      { property: "og:image:alt", content: siteConfig.ogImage.alt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: siteConfig.title },
      { name: "twitter:description", content: siteConfig.description },
      {
        name: "twitter:image",
        content: getAbsoluteUrl(siteConfig.ogImage.path),
      },
      { name: "twitter:image:alt", content: siteConfig.ogImage.alt },
    ],
    links: [{ rel: "canonical", href: siteConfig.url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
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
      const anchorEl =
        (el.querySelector("[data-section-anchor]") as HTMLElement | null) ||
        (el.querySelector("h1, h2, h3") as HTMLElement | null) ||
        el;
      const y = anchorEl.getBoundingClientRect().top + window.scrollY - getNavOffset();
      smoothScrollTo(y);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      const hashPos = href.indexOf("#");
      if (hashPos === -1) return;
      const path = href.slice(0, hashPos);
      const hash = href.slice(hashPos);
      const isHomeHash = href.startsWith("#") || path === "" || path === "/";
      if (!isHomeHash || !hash) return;
      if (window.location.pathname !== "/") return;
      e.preventDefault();
      if (animating) return;
      scrollToHash(hash);
      history.replaceState(null, "", hash === "#top" ? " " : hash);
    };
    const onUserScroll = () => {
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
      >
        Przejdź do treści
      </a>
      <AmbientBackground />
      <Navbar />
      <main id="main-content" className="relative">
        <Hero />
        <ValueProposition />
        <WhyBusiness />
        <Ecosystem />
        <Portfolio />
        <Process />
        <Marketing />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

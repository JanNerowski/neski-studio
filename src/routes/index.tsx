import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Layers, Mail, MapPin, Menu, MessageSquare, Minus, Phone, Plus, ShieldCheck, Sparkles, Star, Users, X } from "lucide-react";

import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";
import neskiMark from "@/assets/neski-mark.png.asset.json";

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

/* ---------------- Ambient background ---------------- */

function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.22_0.08_285_/_0.6),transparent_60%)]" />
      <div className="absolute -top-40 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.28_295_/_0.35),transparent_60%)] blur-3xl animate-glow-pulse" />
      <div className="absolute top-[40%] -left-40 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,oklch(0.5_0.28_265_/_0.25),transparent_60%)] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.25_300_/_0.22),transparent_60%)] blur-3xl" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
    </div>
  );
}

/* ---------------- Navbar ---------------- */

const NAV_LINKS = [
  { href: "#ekosystem", label: "Ekosystem" },
  { href: "#realizacje", label: "Realizacje" },
  { href: "#proces", label: "Proces" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const delta = y - lastY;
      if (open) {
        setHidden(false);
      } else if (y < 80) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const sections = NAV_LINKS
      .map((l) => document.querySelector(l.href) as HTMLElement | null)
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive("#" + visible.target.id);
      },
      { rootMargin: "-140px 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);


  return (
    <header
      className={`fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-all duration-300 ease-out will-change-transform ${
        hidden ? "-translate-y-[140%] opacity-0" : "translate-y-0 opacity-100"
      }`}
    >

      <nav
        className={`glass grain flex w-full max-w-6xl items-center justify-between rounded-2xl pl-4 pr-3 py-3 md:pl-6 md:pr-4 md:py-4 transition-all duration-500 ${
          scrolled
            ? "shadow-[0_30px_80px_-20px_oklch(0.5_0.25_285_/_0.45)] border-white/15"
            : ""
        }`}
      >
        <a href="#top" className="group flex items-center gap-3">
          <LogoMark />
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl md:text-2xl tracking-tight text-gradient-brand">
              NESKI
            </span>
            <span className="text-[10px] md:text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Studio
            </span>
          </div>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`group relative rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 ease-out ${
                    isActive
                      ? "text-white"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.6_0.24_285/_0.35),transparent_70%)] opacity-0 blur-md transition-opacity duration-300 ease-out ${
                      isActive ? "opacity-60" : "group-hover:opacity-100"
                    }`}
                  />
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 rounded-full ring-1 transition-all duration-300 ease-out ${
                      isActive
                        ? "bg-white/[0.08] ring-white/15"
                        : "bg-white/0 ring-white/0 group-hover:bg-white/[0.05] group-hover:ring-white/10"
                    }`}
                  />
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            );
          })}
        </ul>


        <div className="flex items-center gap-2">
          <a
            href="#kontakt"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.75_0.22_295)] to-[oklch(0.6_0.24_265)] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_10px_30px_-10px_oklch(0.6_0.28_285/_0.7)] transition-transform hover:scale-[1.04]"
          >
            Umów analizę
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="md:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="glass absolute top-24 left-4 right-4 rounded-3xl p-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#kontakt"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-[oklch(0.75_0.22_295)] to-[oklch(0.6_0.24_265)] px-4 py-3 text-sm font-semibold text-black"
              >
                Umów analizę
                <ArrowRight className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function LogoMark() {
  return (
    <div className="relative flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.28_0.08_285)] to-[oklch(0.15_0.04_275)] shadow-[0_10px_30px_-8px_oklch(0.6_0.28_285/_0.55)] ring-1 ring-white/10 overflow-hidden">
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(60%_60%_at_50%_30%,oklch(0.55_0.28_295/_0.45),transparent_70%)]" />
      <img
        src={neskiMark.url}
        alt="NESKI Studio"
        className="relative h-7 w-7 md:h-8 md:w-8 object-contain"
      />
    </div>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 md:pt-40 md:pb-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* Left */}
        <div className="relative animate-rise">
          <div className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Projektujemy cyfrową obecność lokalnych firm
          </div>

          <h1 className="mt-8 font-display text-[54px] leading-[0.98] tracking-[-0.02em] sm:text-[72px] md:text-[88px] lg:text-[96px]">
            <span className="text-gradient">Twoja strona</span>
            <br />
            <span className="text-gradient">powinna zdobywać</span>
            <br />
            <span className="italic text-gradient-brand">klientów.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-[17px]">
            Projektujemy nowoczesne strony internetowe i kampanie marketingowe, które
            pomagają lokalnym firmom zdobywać więcej wartościowych zapytań oraz budować
            profesjonalny wizerunek.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#kontakt"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
            >
              <span className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,transparent,oklch(0.7_0.2_290/_0.4),transparent)] bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              Umów bezpłatną analizę
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#realizacje"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3.5 text-sm text-foreground/90 backdrop-blur transition-colors hover:bg-white/[0.06]"
            >
              Zobacz realizacje
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12px] uppercase tracking-[0.18em] text-muted-foreground/70">
            <span>Strony premium</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>Kampanie Google & Meta</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>Analytics</span>
          </div>
        </div>

        {/* Right: device presentation */}
        <DevicePresentation />
      </div>
    </section>
  );
}

function DevicePresentation() {
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      {/* Purple ambient glow behind laptop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 translate-y-4 scale-110 rounded-[100px] bg-[radial-gradient(60%_55%_at_50%_45%,oklch(0.55_0.3_295/_0.55),transparent_70%)] blur-2xl animate-glow-pulse"
      />
      {/* Smaller blue glow near phone */}
      <div
        aria-hidden
        className="absolute -bottom-10 right-0 -z-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.24_250/_0.5),transparent_65%)] blur-3xl"
      />

      {/* Laptop */}
      <div
        className="relative"
        style={{ animation: "float-slow 9s ease-in-out infinite" }}
      >
        <div className="relative rounded-[22px] bg-gradient-to-b from-[oklch(0.28_0.02_275)] to-[oklch(0.18_0.02_275)] p-[10px] shadow-[0_60px_120px_-40px_oklch(0.05_0.05_285/_0.9),0_0_0_1px_oklch(1_0_0/_0.08)]">
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/10" />
              <span className="h-2 w-2 rounded-full bg-white/10" />
              <span className="h-2 w-2 rounded-full bg-white/10" />
            </div>
            <div className="glass rounded-full px-3 py-0.5 text-[10px] text-muted-foreground">
              workspace.neski
            </div>
            <div className="w-12" />
          </div>
          <div className="overflow-hidden rounded-[14px] border border-white/5">
            <DesktopPreview />
          </div>
        </div>
        {/* Laptop base */}
        <div className="mx-auto h-3 w-[92%] rounded-b-[20px] bg-gradient-to-b from-[oklch(0.2_0.02_275)] to-[oklch(0.12_0.02_275)] shadow-[0_10px_30px_-10px_oklch(0_0_0/_0.9)]" />
        <div className="mx-auto -mt-1 h-1.5 w-[30%] rounded-full bg-black/60" />
      </div>

      {/* Phone overlapping lower-right corner (does not cover stages/preview/progress on the left) */}
      <div
        className="absolute -bottom-16 -right-2 w-[34%] max-w-[200px] md:-right-10"
        style={{ animation: "float-slower 11s ease-in-out infinite" }}
      >
        <div className="rounded-[36px] bg-gradient-to-b from-[oklch(0.28_0.02_275)] to-[oklch(0.16_0.02_275)] p-[6px] shadow-[0_40px_80px_-20px_oklch(0.05_0.05_285/_0.9),0_0_0_1px_oklch(1_0_0/_0.08)]">
          <div className="relative overflow-hidden rounded-[30px] border border-white/5">
            <div className="absolute left-1/2 top-1.5 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black/80" />
            <MobilePreview />
          </div>
        </div>
      </div>

      {/* Floating benefit cards */}
      <FloatingCards />
    </div>
  );
}

const STAGES = [
  { label: "Strategia", state: "done" },
  { label: "Projekt", state: "done" },
  { label: "Treści", state: "done" },
  { label: "Wdrożenie", state: "done" },
  { label: "Publikacja", state: "active" },
] as const;

const PROGRESS_STEPS = [
  { at: 15, label: "Analiza struktury" },
  { at: 40, label: "Optymalizacja wersji mobilnej" },
  { at: 65, label: "Konfiguracja formularzy" },
  { at: 90, label: "Finalne testy" },
  { at: 100, label: "Gotowa do publikacji" },
] as const;

function useLaunchProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const rampMs = 8500; // slow ramp to 99
    const pauseMs = 1400;
    const finishMs = 900;
    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const tick = (now: number) => {
      const elapsed = now - start;
      let v: number;
      if (elapsed < rampMs) {
        v = easeInOut(elapsed / rampMs) * 99;
      } else if (elapsed < rampMs + pauseMs) {
        v = 99;
      } else if (elapsed < rampMs + pauseMs + finishMs) {
        const t = (elapsed - rampMs - pauseMs) / finishMs;
        v = 99 + easeInOut(t) * 1;
      } else {
        v = 100;
        setPct(100);
        return;
      }
      setPct(v);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return pct;
}

function DesktopPreview() {
  const pct = useLaunchProgress();
  const currentStep =
    PROGRESS_STEPS.find((s) => pct <= s.at) ?? PROGRESS_STEPS[PROGRESS_STEPS.length - 1];
  const isDone = pct >= 100;

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[oklch(0.14_0.03_280)] via-[oklch(0.11_0.02_278)] to-[oklch(0.09_0.02_275)]">
      <div
        aria-hidden
        className="absolute -top-1/3 left-1/3 h-[70%] w-[60%] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.28_295/_0.28),transparent_65%)] blur-2xl"
      />

      {/* Top bar */}
      <div className="relative flex items-center justify-between border-b border-white/5 px-3 py-1.5 text-[6.5px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="flex h-3 w-3 items-center justify-center rounded-[3px] bg-gradient-to-br from-[oklch(0.7_0.22_290)] to-[oklch(0.55_0.22_260)] text-[5px] font-bold text-white">
            N
          </span>
          <span className="text-[6.5px] font-medium tracking-[0.14em] text-foreground/90">
            NESKI · PROJECT WORKSPACE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[oklch(0.7_0.22_290/_0.15)] px-1.5 py-[1px] text-[5.5px] text-[oklch(0.85_0.15_290)] ring-1 ring-[oklch(0.7_0.22_290/_0.3)]">
            <span className="h-1 w-1 rounded-full bg-[oklch(0.85_0.15_290)]" /> W trakcie
          </span>
          <span className="text-[5.5px]">Projekt · Nowa strona</span>
        </div>
      </div>

      {/* Body: sidebar + preview + activity */}
      <div className="relative grid grid-cols-[28%_1fr_22%] gap-2 p-2">
        {/* Sidebar: stages */}
        <div className="rounded-md border border-white/5 bg-white/[0.02] p-2">
          <div className="mb-1.5 text-[5px] uppercase tracking-[0.18em] text-muted-foreground/70">
            Etapy projektu
          </div>
          <ul className="space-y-1">
            {STAGES.map((s, i) => {
              const done = s.state === "done";
              return (
                <li key={s.label} className="flex items-center gap-1.5 text-[6.5px]">
                  <span
                    className={`flex h-2.5 w-2.5 items-center justify-center rounded-full ${
                      done
                        ? "bg-[oklch(0.7_0.22_290)] text-black"
                        : "bg-[oklch(0.28_0.12_290/_0.5)] ring-1 ring-[oklch(0.7_0.22_290/_0.6)]"
                    }`}
                  >
                    {done ? (
                      <Check className="h-1.5 w-1.5" strokeWidth={3} />
                    ) : (
                      <span className="h-1 w-1 rounded-full bg-[oklch(0.85_0.15_290)]" />
                    )}
                  </span>
                  <span
                    className={done ? "text-foreground/70 line-through decoration-white/20" : "text-foreground/95 font-medium"}
                  >
                    {s.label}
                  </span>
                  <span className="ml-auto text-[5px] text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Central preview */}
        <div className="rounded-md border border-white/5 bg-gradient-to-br from-[oklch(0.13_0.03_280)] to-[oklch(0.08_0.02_275)] p-1.5">
          <div className="flex items-center justify-between px-0.5 pb-1 text-[5px] text-muted-foreground/70">
            <span>Podgląd · Strona główna</span>
            <span className="inline-flex items-center gap-0.5">
              <span className="h-0.5 w-0.5 rounded-full bg-white/30" />
              <span className="h-0.5 w-0.5 rounded-full bg-white/30" />
              <span className="h-0.5 w-0.5 rounded-full bg-white/30" />
            </span>
          </div>
          <div className="relative overflow-hidden rounded-[6px] border border-white/5 bg-[oklch(0.09_0.02_275)]">
            <div
              aria-hidden
              className="absolute -top-1/2 left-1/2 h-full w-[80%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.28_295/_0.35),transparent_65%)] blur-xl"
            />
            <div className="relative flex flex-col items-center px-3 py-3 text-center">
              <div className="rounded-full border border-white/10 px-1.5 py-[1px] text-[4.5px] text-muted-foreground">
                Studio projektowe · Warszawa
              </div>
              <div className="mt-1.5 font-display text-[11px] leading-[1.05] tracking-tight">
                Twoja strona
                <span className="italic text-gradient-brand"> zdobywa klientów.</span>
              </div>
              <div className="mt-1.5 flex items-center gap-1">
                <span className="rounded-full bg-white px-1.5 py-[1px] text-[4.5px] font-medium text-black">
                  Zamów rozmowę
                </span>
                <span className="rounded-full border border-white/10 px-1.5 py-[1px] text-[4.5px] text-foreground/80">
                  Realizacje
                </span>
              </div>
              <div className="mt-2 grid w-full grid-cols-3 gap-0.5">
                <div className="h-3 rounded-sm bg-white/[0.04]" />
                <div className="h-3 rounded-sm bg-white/[0.06]" />
                <div className="h-3 rounded-sm bg-white/[0.04]" />
              </div>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="rounded-md border border-white/5 bg-white/[0.02] p-2">
          <div className="mb-1.5 text-[5px] uppercase tracking-[0.18em] text-muted-foreground/70">
            Aktywność
          </div>
          <ul className="space-y-1.5 text-[5.5px] text-foreground/85">
            <li className="flex items-start gap-1">
              <Sparkles className="mt-[1px] h-1.5 w-1.5 text-[oklch(0.85_0.15_290)]" />
              <span>Zaktualizowano hero</span>
            </li>
            <li className="flex items-start gap-1">
              <Layers className="mt-[1px] h-1.5 w-1.5 text-[oklch(0.85_0.15_290)]" />
              <span>Nowa sekcja: FAQ</span>
            </li>
            <li className="flex items-start gap-1">
              <MessageSquare className="mt-[1px] h-1.5 w-1.5 text-[oklch(0.85_0.15_290)]" />
              <span>Zatwierdzone treści</span>
            </li>
            <li className="flex items-start gap-1">
              <Check className="mt-[1px] h-1.5 w-1.5 text-[oklch(0.85_0.15_290)]" strokeWidth={3} />
              <span>Formularz kontaktowy</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Launch progress module */}
      <div className="relative mx-2 mb-2 rounded-md border border-white/10 bg-gradient-to-r from-white/[0.03] to-white/[0.01] p-2">
        <div className="flex items-center justify-between text-[6px]">
          <div className="flex items-center gap-1.5">
            <span
              className={`flex h-3 w-3 items-center justify-center rounded-full ${
                isDone
                  ? "bg-[oklch(0.7_0.22_290)] text-black"
                  : "bg-[oklch(0.28_0.12_290/_0.5)] ring-1 ring-[oklch(0.7_0.22_290/_0.6)]"
              }`}
            >
              {isDone ? (
                <Check className="h-2 w-2" strokeWidth={3} />
              ) : (
                <span className="h-1 w-1 animate-pulse rounded-full bg-[oklch(0.85_0.15_290)]" />
              )}
            </span>
            <span className="font-medium text-foreground/95">
              Przygotowanie strony do publikacji
            </span>
          </div>
          <span className="tabular-nums text-muted-foreground">
            {Math.round(pct)}%
          </span>
        </div>
        <div className="relative mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.22_290)] via-[oklch(0.65_0.22_275)] to-[oklch(0.6_0.22_250)] shadow-[0_0_10px_oklch(0.7_0.22_290/_0.6)] transition-[width] duration-200 ease-out"
            style={{ width: `${pct}%` }}
          >
            <div
              className="absolute inset-y-0 -left-1/2 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]"
              style={{ animation: "progress-shimmer 2.4s ease-in-out infinite" }}
            />
          </div>
        </div>
        <div className="mt-1 text-[5.5px] text-muted-foreground/80">
          {currentStep.label}
        </div>
      </div>
    </div>
  );
}

function MobilePreview() {
  return (
    <div className="relative aspect-[9/18] w-full overflow-hidden bg-gradient-to-b from-[oklch(0.14_0.03_280)] to-[oklch(0.09_0.02_275)]">
      <div
        aria-hidden
        className="absolute -top-1/4 left-1/2 h-[50%] w-[120%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.24_250/_0.35),transparent_60%)] blur-2xl"
      />
      {/* status bar */}
      <div className="relative flex items-center justify-between px-3 pt-6 text-[5px] text-muted-foreground/80">
        <span>9:41</span>
        <span className="h-1 w-6 rounded-sm bg-white/10" />
      </div>

      <div className="relative mt-3 px-3">
        <div className="text-[4.5px] uppercase tracking-[0.18em] text-muted-foreground/70">
          Kontakt
        </div>
        <div className="mt-1 font-display text-[10px] leading-[1.05] tracking-tight text-foreground">
          Porozmawiajmy o<br />
          <span className="italic text-gradient-brand">Twojej firmie.</span>
        </div>
        <p className="mt-1.5 text-[5px] leading-relaxed text-muted-foreground">
          Opowiedz krótko, czego potrzebujesz. Odezwiemy się z konkretną propozycją.
        </p>

        <div className="mt-2.5 space-y-1.5">
          <div className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-1">
            <div className="text-[3.5px] uppercase tracking-wider text-muted-foreground/70">
              Imię
            </div>
            <div className="text-[6px] text-foreground/90">Anna</div>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-1">
            <div className="text-[3.5px] uppercase tracking-wider text-muted-foreground/70">
              Telefon lub e-mail
            </div>
            <div className="text-[6px] text-foreground/60">+48 ___ ___ ___</div>
          </div>
          <div className="rounded-md border border-[oklch(0.7_0.22_290/_0.4)] bg-[oklch(0.28_0.12_290/_0.15)] px-1.5 py-1">
            <div className="text-[3.5px] uppercase tracking-wider text-[oklch(0.85_0.15_290)]">
              Czego potrzebujesz?
            </div>
            <div className="text-[6px] text-foreground/90">Nowa strona firmowa</div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-[oklch(0.7_0.22_290)] to-[oklch(0.6_0.22_250)] py-1 text-[6px] font-medium text-white shadow-[0_6px_20px_-6px_oklch(0.6_0.22_270/_0.9)]">
          Wyślij zapytanie
          <ArrowRight className="h-1.5 w-1.5" />
        </div>

        <div className="mt-2 flex items-center justify-between text-[4.5px] text-muted-foreground/80">
          <span className="inline-flex items-center gap-0.5">
            <Phone className="h-1.5 w-1.5" /> Zadzwoń
          </span>
          <span className="inline-flex items-center gap-0.5">
            <Mail className="h-1.5 w-1.5" /> E-mail
          </span>
          <span className="inline-flex items-center gap-0.5">
            <MapPin className="h-1.5 w-1.5" /> Mapa
          </span>
        </div>
      </div>
    </div>
  );
}

const BENEFITS = [
  {
    title: "Nowoczesny wizerunek",
    desc: "Firma wygląda profesjonalnie od pierwszego wejścia.",
    icon: Sparkles,
    side: "tl",
    anim: "card-drift-a",
    duration: 7,
  },
  {
    title: "Prosty kontakt",
    desc: "Klient szybko znajdzie numer telefonu, formularz lub mapę.",
    icon: Phone,
    side: "tr",
    anim: "card-drift-b",
    duration: 8,
  },
  {
    title: "Pełna opieka",
    desc: "W razie potrzeby zajmujemy się aktualizacjami i rozwojem strony.",
    icon: ShieldCheck,
    side: "bl",
    anim: "card-drift-c",
    duration: 6.5,
  },
  {
    title: "Przyciąga odpowiednich klientów",
    desc: "Strona zachęca do kontaktu osoby zainteresowane Twoimi usługami.",
    icon: Users,
    side: "br",
    anim: "card-drift-d",
    duration: 7.5,
  },
] as const;

function FloatingCards() {
  const positions: Record<string, string> = {
    tl: "hidden md:block -left-24 -top-4 lg:-left-28",
    tr: "hidden md:block -right-24 top-6 lg:-right-28",
    bl: "hidden md:block -left-20 bottom-6 lg:-left-24",
    br: "hidden md:block -right-16 -bottom-24 lg:-right-20",
  };
  return (
    <>
      {BENEFITS.map((b, i) => {
        const Icon = b.icon;
        return (
          <div
            key={b.title}
            className={`absolute ${positions[b.side]} w-[190px]`}
            style={{
              animation: `rise-in 1s cubic-bezier(0.2,0.7,0.2,1) ${0.5 + i * 0.15}s both, ${b.anim} ${b.duration}s ease-in-out ${i * 0.6}s infinite`,
            }}
          >
            <div className="glass rounded-2xl p-3 shadow-[0_10px_30px_-10px_oklch(0.05_0.05_285/_0.8)] ring-1 ring-white/5">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[oklch(0.28_0.12_290/_0.35)] ring-1 ring-[oklch(0.7_0.22_290/_0.4)]">
                  <Icon className="h-3 w-3 text-[oklch(0.85_0.15_290)]" strokeWidth={2} />
                </span>
                <span className="text-[11.5px] font-medium leading-tight text-foreground/95">
                  {b.title}
                </span>
              </div>
              <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted-foreground">
                {b.desc}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}


/* ---------------- Ecosystem ---------------- */

const ECOSYSTEM = [
  {
    key: "website",
    title: "Strona",
    desc: "Fundament profesjonalnej obecności online i pierwszego wrażenia.",
  },
  {
    key: "marketing",
    title: "Marketing",
    desc: "Kampanie, które przyciągają zdecydowanych klientów.",
  },
  {
    key: "analytics",
    title: "Analityka",
    desc: "Sprawdzamy, skąd pochodzą zapytania i co naprawdę działa.",
  },
  {
    key: "automation",
    title: "Automatyzacja",
    desc: "Formularze i procesy, które oszczędzają Twój czas.",
  },
  {
    key: "growth",
    title: "Wzrost",
    desc: "Regularne poprawki i optymalizacja wraz z rozwojem firmy.",
  },
];

function Ecosystem() {
  const [active, setActive] = useState(0);

  return (
    <section id="ekosystem" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Ekosystem</SectionLabel>
        <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
          <span className="text-gradient">Strona to dopiero początek. </span>
          <br />
          <span className="italic text-gradient-brand">Wszystko razem napędza rozwój firmy.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-muted-foreground md:text-[17px]">
          Nowoczesna strona internetowa to tylko jeden element. Połączenie marketingu,
          analityki i automatyzacji sprawia, że Twoja firma może pozyskiwać klientów w
          przewidywalny sposób.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Orb visualization */}
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.55_0.28_295/_0.35),transparent_60%)] blur-2xl" />
            {/* Orbit rings */}
            <div className="absolute inset-8 rounded-full border border-white/5" />
            <div className="absolute inset-20 rounded-full border border-white/[0.07]" />
            <div className="absolute inset-32 rounded-full border border-white/[0.09]" />
            {/* Center */}
            <div className="absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--grad-primary)] shadow-[0_0_60px_-10px_oklch(0.6_0.28_290/_0.8)]">
              <span className="font-display text-xl italic text-white">Twój biznes</span>
            </div>
            {/* Nodes */}
            {ECOSYSTEM.map((n, i) => {
              const angle = (i / ECOSYSTEM.length) * Math.PI * 2 - Math.PI / 2;
              const r = 42;
              const x = 50 + Math.cos(angle) * r;
              const y = 50 + Math.sin(angle) * r;
              const isActive = active === i;
              return (
                <button
                  key={n.key}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span
                    className={`glass flex h-14 w-14 items-center justify-center rounded-full text-[11px] font-medium transition-all duration-500 md:h-16 md:w-16 ${
                      isActive
                        ? "scale-110 border-white/30 bg-white/10 text-foreground shadow-[0_10px_40px_-10px_oklch(0.6_0.28_290/_0.7)]"
                        : "text-muted-foreground"
                    }`}
                  >
                    {n.title}
                  </span>
                </button>
              );
            })}
            {/* Connection lines */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              fill="none"
            >
              {ECOSYSTEM.map((_, i) => {
                const angle = (i / ECOSYSTEM.length) * Math.PI * 2 - Math.PI / 2;
                const r = 34;
                const x = 50 + Math.cos(angle) * r;
                const y = 50 + Math.sin(angle) * r;
                return (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={x}
                    y2={y}
                    stroke={active === i ? "oklch(0.75 0.22 290)" : "oklch(1 0 0 / 0.08)"}
                    strokeWidth={active === i ? 0.4 : 0.2}
                    className="transition-all duration-500"
                  />
                );
              })}
            </svg>
          </div>

          {/* List */}
          <div className="flex flex-col gap-2">
            {ECOSYSTEM.map((n, i) => {
              const isActive = active === i;
              return (
                <button
                  key={n.key}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group relative flex items-start gap-6 rounded-3xl p-6 text-left transition-all duration-500 md:p-8 ${
                    isActive
                      ? "glass shadow-[0_20px_60px_-20px_oklch(0.05_0.05_285/_0.9)]"
                      : "border border-transparent hover:border-white/5"
                  }`}
                >
                  <span
                    className={`mt-1 font-display text-2xl transition-colors ${
                      isActive ? "text-gradient-brand" : "text-muted-foreground/60"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                      {n.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm text-muted-foreground md:text-[15px]">
                      {n.desc}
                    </p>
                  </div>
                  <ArrowUpRight
                    className={`h-5 w-5 shrink-0 transition-all ${
                      isActive
                        ? "translate-x-0 translate-y-0 text-foreground"
                        : "translate-x-1 -translate-y-1 text-muted-foreground/40"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Portfolio ---------------- */

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

function Portfolio() {
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

/* ---------------- Process ---------------- */

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

function Process() {
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

/* ---------------- FAQ ---------------- */

const FAQS = [
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

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">
          <span className="text-gradient">Pytania,</span>{" "}
          <span className="italic text-gradient-brand">które padają najczęściej.</span>
        </h2>
        <div className="mt-12 divide-y divide-white/5 border-y border-white/5">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="font-display text-2xl leading-tight tracking-tight md:text-3xl">
                    {f.q}
                  </span>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all ${
                      isOpen ? "bg-white text-black rotate-180" : "text-foreground"
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-8" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pr-14 text-muted-foreground md:text-[17px]">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCTA() {
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

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <LogoMark />
          <span className="text-foreground/90">NESKI Studio</span>
          <span className="ml-2">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#ekosystem" className="hover:text-foreground">Ekosystem</a>
          <a href="#realizacje" className="hover:text-foreground">Realizacje</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
          <a href="mailto:hello@neski.studio" className="hover:text-foreground">
            hello@neski.studio
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Shared ---------------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary/60" />
      {children}
    </div>
  );
}

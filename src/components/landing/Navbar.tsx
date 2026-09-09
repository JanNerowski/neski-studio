import { useEffect, useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";

import { useQuote } from "@/components/landing/QuoteDialog";
import { getTelHref, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import logo from "@/assets/neski-mark.png";

const NAV_LINKS = [
  { href: "#oferta", label: "Oferta" },
  { href: "#dla-kogo", label: "Dla kogo" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#proces", label: "Proces" },
  { href: "#faq", label: "FAQ" },
];

export function LogoMark() {
  return (
    <div className="relative flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.28_0.08_285)] to-[oklch(0.15_0.04_275)] shadow-[0_10px_30px_-8px_oklch(0.6_0.28_285/_0.55)] ring-1 ring-white/10 overflow-hidden">
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(60%_60%_at_50%_30%,oklch(0.55_0.28_295/_0.45),transparent_70%)]" />
      <img
        src={logo}
        alt="NESKI Studio"
        className="relative h-7 w-7 md:h-8 md:w-8 object-contain"
      />
    </div>
  );
}

export function PhoneLink({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const phone = siteConfig.contact.phone;
  const href = getTelHref(phone);

  if (compact) {
    return (
      <a
        href={href}
        className={`inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2 py-1.5 text-[13px] font-semibold text-white min-[400px]:px-2.5 min-[400px]:py-2 min-[400px]:text-sm ${className}`}
        aria-label={`Zadzwoń ${phone}`}
      >
        <Phone className="h-3.5 w-3.5 text-[oklch(0.82_0.16_290)]" strokeWidth={2} />
        {phone}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={cn("flex flex-col items-end leading-none", className)}
    >
      <span className="flex items-center gap-1 text-[11px] text-white/70">
        <Phone className="h-3 w-3 text-[oklch(0.82_0.16_290)]" strokeWidth={2.25} />
        Szybki kontakt
      </span>
      <span className="mt-1 text-[17px] font-extrabold tracking-tight text-white md:text-[19px]">
        {phone}
      </span>
    </a>
  );
}

export function Navbar() {
  const { openQuote } = useQuote();
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
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href) as HTMLElement | null).filter(
      (el): el is HTMLElement => !!el,
    );
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-50 flex justify-center px-3 min-[400px]:px-4 transition-all duration-300 ease-out will-change-transform ${
        hidden ? "-translate-y-[140%] opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <nav
        aria-label="Główna nawigacja"
        className={`glass grain flex w-full max-w-6xl min-w-0 items-center justify-between gap-2 rounded-2xl pl-3 pr-2 py-2.5 min-[400px]:pl-4 min-[400px]:pr-3 min-[400px]:py-3 md:pl-6 md:pr-4 md:py-3.5 transition-all duration-500 ${
          scrolled
            ? "border-white/15 bg-[oklch(0.13_0.02_275/_0.85)] shadow-[0_30px_80px_-20px_oklch(0.5_0.25_285_/_0.45)] backdrop-blur-xl"
            : ""
        }`}
      >
        <a href="#top" className="group flex min-w-0 items-center gap-2 min-[400px]:gap-3">
          <LogoMark />
          <div className="hidden min-[380px]:flex flex-col leading-none">
            <span className="font-display text-xl md:text-2xl font-semibold tracking-tight text-gradient-brand">
              NESKI
            </span>
            <span className="text-[10px] md:text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Studio
            </span>
          </div>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`group relative rounded-full px-3 py-2.5 text-sm font-medium transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                    isActive ? "text-white" : "text-muted-foreground hover:text-white"
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

        <div className="flex shrink-0 items-center gap-1.5 min-[400px]:gap-3 md:gap-4">
          <PhoneLink className="hidden md:flex" />
          <PhoneLink compact className="md:hidden" />
          <button
            type="button"
            onClick={openQuote}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.75_0.22_295)] to-[oklch(0.6_0.24_265)] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_10px_30px_-10px_oklch(0.6_0.28_285/_0.7)] transition-transform hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            Wyceń projekt
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <>
          <button
            type="button"
            aria-label="Zamknij menu"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-nav"
            className="glass absolute top-24 left-4 right-4 z-50 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl p-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3.5 text-base text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="px-4 py-3">
                <PhoneLink className="items-start" />
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openQuote();
                  }}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-[oklch(0.75_0.22_295)] to-[oklch(0.6_0.24_265)] px-4 py-3.5 text-sm font-semibold text-black"
                >
                  Wyceń projekt
                  <ArrowRight className="h-4 w-4" />
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}

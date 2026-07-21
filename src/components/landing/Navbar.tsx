import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

import logo from "@/assets/neski-mark.png";

const NAV_LINKS = [
  { href: "#ekosystem", label: "Ekosystem" },
  { href: "#realizacje", label: "Realizacje" },
  { href: "#proces", label: "Proces" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
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

export function Navbar() {
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

import { LogoMark } from "@/components/landing/Navbar";

export function Footer() {
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

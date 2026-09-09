import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { ContactForm } from "@/components/landing/ContactForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type QuoteContextValue = {
  open: boolean;
  openQuote: () => void;
  closeQuote: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) {
    throw new Error("useQuote must be used within QuoteProvider");
  }
  return ctx;
}

function QuoteDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="glass max-h-[min(100dvh,920px)] w-[calc(100%-1.25rem)] max-w-3xl overflow-y-auto rounded-3xl border-white/10 bg-[oklch(0.14_0.02_275/_0.94)] p-5 shadow-[0_40px_120px_-24px_oklch(0.15_0.08_285/_0.8)] backdrop-blur-xl duration-500 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:p-8 max-sm:h-[100dvh] max-sm:w-full max-sm:max-w-none max-sm:rounded-none"
      >
        <DialogHeader className="pr-8 text-left">
          <DialogTitle className="font-display text-3xl font-semibold leading-[1.05] tracking-tight md:text-4xl">
            <span className="text-gradient">Opowiedz o</span>{" "}
            <span className="text-gradient-brand">projekcie.</span>
          </DialogTitle>
          <DialogDescription className="pt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
            Formularz albo telefon. Odezwę się z konkretną propozycją - bez zobowiązań.
          </DialogDescription>
        </DialogHeader>
        <ContactForm
          idPrefix="quote"
          className="mt-2 border-white/10 bg-white/[0.02] md:p-6"
        />
      </DialogContent>
    </Dialog>
  );
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo<QuoteContextValue>(
    () => ({
      open,
      openQuote: () => setOpen(true),
      closeQuote: () => setOpen(false),
    }),
    [open],
  );

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteDialog open={open} onOpenChange={setOpen} />
    </QuoteContext.Provider>
  );
}

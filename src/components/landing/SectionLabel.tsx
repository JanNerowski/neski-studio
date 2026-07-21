export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary/60" />
      {children}
    </div>
  );
}

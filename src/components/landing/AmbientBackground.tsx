export function AmbientBackground() {
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

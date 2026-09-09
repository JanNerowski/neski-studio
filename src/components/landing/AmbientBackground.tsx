export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.22_0.08_285_/_0.6),transparent_60%)]" />
      <div className="absolute -top-40 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.28_295_/_0.35),transparent_60%)] blur-3xl animate-glow-pulse" />
      <div className="absolute top-[40%] -left-40 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,oklch(0.5_0.28_265_/_0.25),transparent_60%)] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.25_300_/_0.22),transparent_60%)] blur-3xl" />

      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:28px_28px]" />

      <svg className="absolute -left-10 top-[18%] h-[420px] w-[420px] opacity-[0.12]" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="160" fill="none" stroke="white" strokeWidth="0.6" />
        <circle cx="200" cy="200" r="110" fill="none" stroke="white" strokeWidth="0.6" />
        <path d="M40 200 H360 M200 40 V360" stroke="white" strokeWidth="0.5" />
      </svg>
      <svg className="absolute -right-8 bottom-[12%] h-[360px] w-[360px] opacity-[0.1]" viewBox="0 0 360 360">
        <rect x="40" y="40" width="280" height="280" fill="none" stroke="white" strokeWidth="0.6" />
        <path d="M40 180 H320 M180 40 V320" stroke="white" strokeWidth="0.5" />
      </svg>

      <div className="animate-watermark-drift absolute -left-6 top-[28%] select-none font-display text-[22vw] font-semibold leading-none tracking-[-0.06em] text-white/[0.07]">
        NESKI
      </div>
      <div className="absolute right-[-4%] top-[62%] select-none font-display text-[14vw] font-semibold leading-none tracking-[0.18em] text-white/[0.055]">
        STUDIO
      </div>
    </div>
  );
}

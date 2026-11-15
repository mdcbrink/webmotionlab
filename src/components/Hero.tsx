import { HeroSceneLazy as HeroScene } from "./HeroSceneLazy";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-start overflow-hidden pb-16 pt-[46svh] md:items-center md:pb-16 md:pt-28">
      {/* Achtergrond: raster en bewegende lichtvlekken */}
      <div aria-hidden className="grid-bg absolute inset-0 -z-20" />
      <div aria-hidden className="aurora -z-20 left-[45%] top-[10%] h-[46vw] w-[46vw] bg-turq/25" />
      <div aria-hidden className="aurora -z-20 left-[-10%] top-[55%] h-[30vw] w-[30vw] bg-[#1b6cff]/20 [animation-delay:-7s]" />

      {/* 3D-scène: rechts op desktop, boven de tekst op mobiel */}
      <div className="absolute inset-x-0 top-14 -z-10 h-[40svh] md:inset-y-0 md:left-auto md:right-0 md:top-0 md:h-auto md:w-[60%]">
        <HeroScene />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow mb-6">Digital studio voor ondernemers</p>
          <h1 id="hero-title" className="font-display text-[clamp(2.7rem,7.4vw,6.4rem)] font-bold leading-[.92] tracking-[-.035em]">
            We build websites that <span className="text-gradient">move</span> you.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-mute md:text-xl">
            Wij bouwen moderne, interactieve en indrukwekkende websites die jouw bedrijf online naar een hoger niveau tillen.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">
              Start jouw website <span className="arrow" aria-hidden>→</span>
            </a>
            <a href="#werk" className="btn btn-ghost">
              Bekijk ons werk
            </a>
          </div>
          <p className="mt-8 flex items-center gap-3 text-sm text-mute">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-turq shadow-[0_0_10px_var(--color-turq)]" />
            Premium kwaliteit, vanaf <strong className="font-semibold text-white">€500</strong>
          </p>
        </div>
      </div>

      {/* Scroll-indicator */}
      <a href="#diensten" aria-label="Scroll naar de diensten" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[.25em] text-mute md:flex">
        <span className="flex h-9 w-6 justify-center rounded-full border border-white/25 pt-2">
          <span className="scroll-wheel h-2 w-0.5 rounded-full bg-turq" />
        </span>
        Scroll
      </a>
    </section>
  );
}

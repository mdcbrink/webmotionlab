"use client";

import { useEffect, useRef } from "react";
import { steps } from "@/data/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

/** Tijdlijn met een lichtlijn die meegroeit terwijl je scrolt. */
export function Process() {
  const line = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const w = wrap.current, l = line.current;
      if (!w || !l) return;
      const r = w.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.75 - r.top) / r.height));
      l.style.setProperty("--p", String(p));
      w.querySelectorAll<HTMLElement>("[data-step]").forEach((el, i) => {
        el.dataset.on = p >= (i + 0.15) / steps.length ? "1" : "0";
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="werkwijze" aria-labelledby="werkwijze-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading id="werkwijze-title" eyebrow="Hoe werkt het?" title={<>From idea<br /><span className="text-gradient">to online.</span></>} />

        <div ref={wrap} className="relative">
          {/* lijn: verticaal op mobiel, horizontaal op desktop */}
          <div aria-hidden className="absolute left-[22px] top-0 h-full w-px bg-white/10 md:left-0 md:top-[22px] md:h-px md:w-full" />
          <div
            ref={line}
            aria-hidden
            className="absolute left-[22px] top-0 h-full w-px origin-top bg-gradient-to-b from-turq to-turq-light shadow-[0_0_12px_var(--color-turq)] [transform:scaleY(var(--p,0))] md:left-0 md:top-[22px] md:h-px md:w-full md:origin-left md:bg-gradient-to-r md:[transform:scaleX(var(--p,0))]"
          />
          <ol className="relative grid gap-12 md:grid-cols-4 md:gap-8">
            {steps.map((s, i) => (
              <li key={s.nr} data-step className="group relative pl-16 md:pl-0 md:pt-20">
                <span className="absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-ink font-display text-sm text-mute transition-all duration-500 group-data-[on=1]:border-turq group-data-[on=1]:bg-turq group-data-[on=1]:text-ink group-data-[on=1]:shadow-[0_0_24px_var(--color-turq)]">
                  {s.nr}
                </span>
                <Reveal delay={i * 90}>
                  <h3 className="font-display text-2xl font-semibold uppercase tracking-tight">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-mute">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Mockup } from "./Mockup";
import { IconArrow, IconCheck, IconClose } from "./Icons";

function Visual({ p }: { p: Project }) {
  // eslint-disable-next-line @next/next/no-img-element
  return p.image ? <img src={p.image} alt={`Website van ${p.name}`} className="w-full rounded-xl" loading="lazy" /> : <Mockup style={p.mockup} />;
}

export function Portfolio() {
  const [active, setActive] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (active && !d.open) d.showModal();
    if (!active && d.open) d.close();
  }, [active]);

  return (
    <section id="werk" aria-labelledby="werk-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          id="werk-title"
          eyebrow="Portfolio"
          title={<>Built to <span className="text-gradient">stand out.</span></>}
          intro="Drie conceptontwerpen die laten zien hoe verschillend onze websites kunnen zijn. Elk ontwerp krijgt een eigen identiteit, afgestemd op de branche en de doelgroep."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100} className={i === 0 ? "md:col-span-2" : ""}>
              <button
                type="button"
                onClick={() => setActive(p)}
                className="group block w-full rounded-3xl border border-white/[.07] bg-ink-2/70 p-4 text-left transition-colors duration-300 hover:border-turq/40 md:p-6"
                aria-label={`Bekijk project ${p.name}`}
              >
                <div className={`overflow-hidden rounded-2xl bg-ink p-4 md:p-8 ${i === 0 ? "md:px-24" : ""}`}>
                  <div className="transition-transform duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02]">
                    <Visual p={p} />
                  </div>
                </div>
                <div className="mt-5 flex items-end justify-between gap-4 px-1">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-mute">{p.sector}</span>
                      {p.concept && (
                        <span className="rounded-full border border-turq/30 px-2.5 py-0.5 text-[11px] uppercase tracking-[.15em] text-turq">Conceptontwerp</span>
                      )}
                    </div>
                    <h3 className="mt-1.5 font-display text-2xl font-semibold md:text-3xl">{p.name}</h3>
                    <p className="mt-1.5 max-w-lg text-[15px] text-mute">{p.summary}</p>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-turq group-hover:bg-turq group-hover:text-ink">
                    <IconArrow className="h-5 w-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Projectpresentatie */}
      <dialog
        ref={dialog}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === dialog.current && setActive(null)}
        aria-labelledby="project-title"
        className="m-auto max-h-[92vh] w-[min(1100px,94vw)] overflow-y-auto rounded-3xl border border-white/10 bg-ink-2 p-0 text-white backdrop:bg-black/70 backdrop:backdrop-blur-md"
      >
        {active && (
          <article className="p-5 md:p-10">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">{active.sector}</p>
                <h3 id="project-title" className="mt-3 font-display text-4xl font-bold md:text-5xl">{active.name}</h3>
              </div>
              <button type="button" onClick={() => setActive(null)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 hover:border-turq hover:text-turq" aria-label="Sluiten">
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            {active.concept && (
              <p className="mb-6 rounded-xl border border-turq/25 bg-turq/[.06] px-4 py-3 text-sm text-turq-light">
                Dit is een conceptontwerp van WEBMOTIONLAB, gemaakt om onze stijl en werkwijze te laten zien. Het is geen klantproject.
              </p>
            )}
            <div className="rounded-2xl bg-ink p-4 md:p-10">
              <Visual p={active} />
            </div>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div>
                <h4 className="font-display text-lg font-semibold text-turq">De uitdaging</h4>
                <p className="mt-2 leading-relaxed text-mute">{active.challenge}</p>
                <h4 className="mt-8 font-display text-lg font-semibold text-turq">Onze aanpak</h4>
                <p className="mt-2 leading-relaxed text-mute">{active.approach}</p>
              </div>
              <div>
                <h4 className="font-display text-lg font-semibold text-turq">Onderdelen</h4>
                <ul className="mt-3 space-y-2.5">
                  {active.features.map((f) => (
                    <li key={f} className="flex gap-3"><IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-turq" />{f}</li>
                  ))}
                </ul>
                <h4 className="mt-8 font-display text-lg font-semibold text-turq">Stijl</h4>
                <div className="mt-3 flex items-center gap-2">
                  {active.palette.map((c) => (
                    <span key={c} className="h-9 w-9 rounded-full border border-white/15" style={{ background: c }} title={c} />
                  ))}
                  <span className="ml-3 text-sm text-mute">{active.fonts}</span>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
              <p className="text-mute">Zoiets voor jouw bedrijf?</p>
              <a href="#contact" onClick={() => setActive(null)} className="btn btn-primary">
                Start jouw website <span className="arrow" aria-hidden>→</span>
              </a>
            </div>
          </article>
        )}
      </dialog>
    </section>
  );
}

import { benefits } from "@/data/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { IconChat, IconChip, IconGem, IconTag } from "./Icons";

const icons = { premium: IconGem, prijs: IconTag, persoonlijk: IconChat, tech: IconChip } as const;

export function Why() {
  return (
    <section id="waarom" aria-labelledby="waarom-title" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="aurora right-[-15%] top-[20%] h-[40vw] w-[40vw] bg-turq/15" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          id="waarom-title"
          eyebrow="Waarom WEBMOTIONLAB"
          title={<>Big agency look.<br /><span className="text-gradient">Smart agency pricing.</span></>}
        />

        <div className="grid gap-5 lg:grid-cols-12">
          {/* Blikvanger: de prijs */}
          <Reveal className="lg:col-span-5">
            <div className="glass glow-border relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-3xl p-8 md:p-10">
              <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-turq/20 blur-3xl" />
              <p className="relative max-w-sm text-lg leading-relaxed text-mute">
                Een professionele website hoeft geen duizenden euro&apos;s te kosten. Je krijgt de uitstraling van een groot bureau, voor een prijs die past bij een ondernemer.
              </p>
              <div className="relative">
                <p className="text-sm uppercase tracking-[.2em] text-mute">Websites vanaf</p>
                <p className="font-display text-[clamp(5rem,12vw,9rem)] font-bold leading-none tracking-[-.05em]">
                  <span className="text-turq">€</span>500
                </p>
                <a href="#prijzen" className="mt-4 inline-flex items-center gap-2 text-turq-light hover:underline">
                  Bekijk de pakketten <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {benefits.map((b, i) => {
              const Icon = icons[b.key];
              return (
                <Reveal key={b.key} delay={i * 90}>
                  <div className="group h-full rounded-3xl border border-white/[.07] bg-ink-2/70 p-7 transition-colors duration-300 hover:border-turq/40">
                    <Icon className="h-7 w-7 text-turq transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6" />
                    <h3 className="mt-8 font-display text-xl font-semibold">{b.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-mute">{b.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

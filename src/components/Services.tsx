import { services } from "@/data/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { IconBrowser, IconCheck, IconCube, IconSpark } from "./Icons";

const icons = { "3d": IconCube, business: IconBrowser, experience: IconSpark } as const;

export function Services() {
  return (
    <section id="diensten" aria-labelledby="diensten-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          id="diensten-title"
          eyebrow="Wat wij doen"
          title={<>More than just <span className="text-gradient">a website.</span></>}
          intro="Een website is vaak de eerste kennismaking met je bedrijf. Daarom kijken we verder dan een mooi plaatje: we ontwerpen een ervaring die past bij je merk, vertrouwen wekt en bezoekers aanzet tot actie."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.key];
            return (
              <Reveal key={s.key} delay={i * 110}>
                <TiltCard className="glass glow-border h-full rounded-3xl p-8 md:p-9">
                  <div className="mb-10 flex items-center justify-between" style={{ transform: "translateZ(30px)" }}>
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-turq/30 bg-turq/10 text-turq shadow-[0_0_30px_-8px_var(--color-turq)]">
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="font-display text-sm text-mute">0{i + 1}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold uppercase tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-mute">{s.intro}</p>
                  <ul className="mt-7 space-y-3 border-t border-white/10 pt-6">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[15px]">
                        <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-turq" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

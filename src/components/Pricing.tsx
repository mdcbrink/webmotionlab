import { plans } from "@/data/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { IconCheck } from "./Icons";

export function Pricing() {
  return (
    <section id="prijzen" aria-labelledby="prijzen-title" className="relative py-28 md:py-40">
      <div aria-hidden className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-[420px] max-w-4xl rounded-full bg-turq/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          id="prijzen-title"
          align="center"
          eyebrow="Prijzen"
          title={<>Premium websites.<br /><span className="text-gradient">Accessible prices.</span></>}
          intro="Kies het pakket dat bij je past. Dit zijn vanafprijzen: de uiteindelijke prijs hangt af van jouw wensen en functionaliteiten. Je ontvangt altijd eerst een offerte."
        />

        <div className="grid items-stretch gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 110} className={p.featured ? "lg:-my-4" : ""}>
              <div
                className={`relative flex h-full flex-col rounded-3xl p-8 md:p-9 ${
                  p.featured
                    ? "glow-border bg-gradient-to-b from-[#123a3a] via-ink-2 to-ink-2 shadow-[0_30px_80px_-30px_rgba(32,224,208,.45)]"
                    : "border border-white/[.08] bg-ink-2/70"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3.5 left-8 rounded-full bg-turq px-3.5 py-1 text-xs font-semibold uppercase tracking-[.15em] text-ink">
                    Meest gekozen
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold uppercase tracking-[.12em]">{p.name}</h3>
                <p className="mt-1 text-sm text-mute">{p.for}</p>
                <p className="mt-8 flex items-baseline gap-2">
                  <span className="text-sm text-mute">vanaf</span>
                  <span className="font-display text-6xl font-bold tracking-[-.04em]">€{p.price}</span>
                </p>
                <p className="mt-1 text-xs text-mute">hosting en domeinnaam niet inbegrepen</p>
                <ul className="mt-8 flex-1 space-y-3.5 border-t border-white/10 pt-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[15px]">
                      <IconCheck className={`mt-0.5 h-5 w-5 shrink-0 ${p.featured ? "text-turq-light" : "text-turq"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`btn mt-10 justify-center ${p.featured ? "btn-primary" : "btn-ghost"}`}>
                  Vraag een offerte aan <span className="arrow" aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-mute">
            Voorlopige pakketvoorstellen. Iets anders nodig, zoals een webshop of extra functies? Vraag een offerte op maat aan.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

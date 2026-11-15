import { faqs } from "@/data/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

/** Accordion met native <details>: werkt met toetsenbord en zonder JavaScript. */
export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-28 md:py-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="faq-title" eyebrow="Veelgestelde vragen" title={<>Good questions.<br /><span className="text-gradient">Clear answers.</span></>} />
            <Reveal>
              <p className="-mt-6 text-mute md:-mt-12">
                Staat je vraag er niet bij? <a href="#contact" className="text-turq-light underline-offset-4 hover:underline">Stel hem gerust</a>.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="space-y-3 lg:col-span-7">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 4) * 60}>
              <details className="group rounded-2xl border border-white/[.08] transition-colors duration-300 hover:border-white/20 open:border-turq/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 font-display text-lg font-medium">
                  {f.q}
                  <span className="faq-icon grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-turq transition-transform duration-300" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 leading-relaxed text-mute">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

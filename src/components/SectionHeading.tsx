import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  id: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`mb-14 max-w-3xl md:mb-20 ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow mb-5">{eyebrow}</p>
      <h2 id={id} className="font-display text-[clamp(2.2rem,5.2vw,4.4rem)] font-bold uppercase leading-[.95] tracking-[-.03em]">
        {title}
      </h2>
      {intro && <p className={`mt-6 text-lg leading-relaxed text-mute ${align === "center" ? "mx-auto" : ""} max-w-2xl`}>{intro}</p>}
    </Reveal>
  );
}

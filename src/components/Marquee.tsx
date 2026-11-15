const words = ["3D Web Design", "Business Websites", "Motion Design", "Responsive", "Interactie", "Conversie", "Merkbeleving"];

/** Lopende tekstband als visuele overgang tussen secties. */
export function Marquee() {
  const row = [...words, ...words];
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-white/[.06] bg-ink-2/60 py-6">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-semibold uppercase tracking-tight text-white/80 md:text-3xl">
            {w}
            <span className="text-turq">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

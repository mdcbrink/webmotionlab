import Link from "next/link";

/** Typografisch logo: WEBMOTION + LAB, met een turquoise "beweging"-punt. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="WEBMOTIONLAB, naar de homepage" className={`group inline-flex items-center gap-2 font-display text-[17px] font-bold tracking-[.08em] ${className}`}>
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inset-0 rounded-full bg-turq opacity-60 blur-[3px] transition-transform duration-500 group-hover:scale-150" />
        <span className="relative h-2.5 w-2.5 rounded-full bg-turq" />
      </span>
      <span>
        WEBMOTION<span className="text-turq">LAB</span>
      </span>
    </Link>
  );
}

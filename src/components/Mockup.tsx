import type { MockupStyle } from "@/data/projects";

/**
 * Gestileerde website-mockups, volledig in CSS (geen afbeeldingen nodig).
 * Elk concept heeft een eigen sfeer, zodat het portfolio verschillende stijlen laat zien.
 */
function Browser({ children, bar = "#1a1f27", dot = "rgba(255,255,255,.25)" }: { children: React.ReactNode; bar?: string; dot?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)]">
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: bar }}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2 rounded-full" style={{ background: dot }} />
        ))}
        <span className="ml-3 h-3 flex-1 rounded-full" style={{ background: dot, opacity: 0.35 }} />
      </div>
      <div className="relative aspect-[16/10] [container-type:inline-size]">{children}</div>
    </div>
  );
}

function Restaurant() {
  return (
    <Browser bar="#1d130e" dot="rgba(243,230,211,.3)">
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 75% 60%, #5a2a12 0%, #24130b 45%, #140d0a 75%)" }}>
        <div className="absolute right-[12%] top-[26%] h-[48%] w-[34%] rounded-full" style={{ background: "radial-gradient(circle at 50% 60%, #ffb36b 0%, #e8752a 30%, rgba(232,117,42,0) 70%)", filter: "blur(6px)", opacity: 0.85 }} />
        <div className="absolute inset-x-[6%] top-[7%] flex items-center justify-between text-[1.35cqw] uppercase tracking-[.2em] text-[#f3e6d3]/70">
          <span className="font-serif text-[1.4em] normal-case tracking-normal text-[#f3e6d3]">Ember &amp; Oak</span>
          <span className="flex gap-[1.5em]"><span>Menu</span><span>Verhaal</span><span className="rounded-full bg-[#e8752a] px-[1em] py-[.3em] text-[#140d0a]">Reserveer</span></span>
        </div>
        <div className="absolute left-[6%] top-[34%] font-serif leading-[.95] text-[#f3e6d3]" style={{ fontSize: "4.65cqw" }}>
          Vuur, hout<br />&amp; <em className="text-[#e8752a]">tijd.</em>
        </div>
        <div className="absolute bottom-[10%] left-[6%] flex gap-[3%] w-[52%]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[4.5cqw] flex-1 rounded-md border border-[#f3e6d3]/15 bg-[#f3e6d3]/5" />
          ))}
        </div>
      </div>
    </Browser>
  );
}

function RealEstate() {
  return (
    <Browser bar="#e9e3da" dot="rgba(30,42,47,.25)">
      <div className="absolute inset-0 bg-[#f4f0ea]">
        <div className="absolute inset-x-[6%] top-[7%] flex items-center justify-between text-[1.35cqw] uppercase tracking-[.25em] text-[#1e2a2f]/70">
          <span className="font-serif text-[1.4em] normal-case tracking-[.02em] text-[#1e2a2f]">Lumen Living</span>
          <span className="flex gap-[1.5em]"><span>Aanbod</span><span>Over</span><span>Contact</span></span>
        </div>
        <div className="absolute left-[6%] top-[28%] font-serif leading-[1] text-[#1e2a2f]" style={{ fontSize: "3.9cqw" }}>
          Wonen in<br />het licht.
        </div>
        <div className="absolute left-[6%] top-[58%] h-[1px] w-[22%] bg-[#b89b72]" />
        {/* architectonisch blok met lijnen */}
        <div className="absolute right-[6%] top-[22%] h-[56%] w-[46%] overflow-hidden rounded-sm" style={{ background: "linear-gradient(160deg,#d9cdbb 0%,#b89b72 60%,#8a7253 100%)" }}>
          <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,.18) 0 1px, transparent 1px 14%)" }} />
          <div className="absolute bottom-0 left-[10%] h-[70%] w-[40%] bg-[#f4f0ea]/80" />
          <div className="absolute bottom-0 left-[54%] h-[48%] w-[34%] bg-[#1e2a2f]/70" />
        </div>
        <div className="absolute bottom-[8%] left-[6%] flex w-[40%] gap-[4%]">
          <div className="h-[3.0cqw] flex-1 rounded-sm bg-[#1e2a2f]" />
          <div className="h-[3.0cqw] flex-1 rounded-sm border border-[#1e2a2f]/40" />
        </div>
      </div>
    </Browser>
  );
}

function Creative() {
  return (
    <Browser bar="#1b0b2c" dot="rgba(255,79,216,.35)">
      <div className="absolute inset-0 overflow-hidden" style={{ background: "#12051f" }}>
        <div className="absolute -left-[10%] -top-[30%] h-[90%] w-[70%] rounded-full" style={{ background: "radial-gradient(circle,#ff4fd8 0%,rgba(255,79,216,0) 65%)", opacity: 0.7 }} />
        <div className="absolute -bottom-[40%] right-[-10%] h-[100%] w-[70%] rounded-full" style={{ background: "radial-gradient(circle,#5b7cff 0%,rgba(91,124,255,0) 65%)", opacity: 0.75 }} />
        <div className="absolute inset-x-[6%] top-[7%] flex items-center justify-between font-mono text-[1.27cqw] uppercase text-white/70">
          <span className="font-sans text-[1.3em] font-black tracking-tight text-white">PRISMA®</span>
          <span className="flex gap-[1.5em]"><span>Work</span><span>Studio</span><span>Hi!</span></span>
        </div>
        <div className="absolute left-[6%] top-[24%] font-black uppercase leading-[.82] tracking-[-.04em] text-white" style={{ fontSize: "6.9cqw" }}>
          Make it<br />loud.
        </div>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-lg border border-white/20"
            style={{
              width: "22%", height: "34%", right: `${6 + i * 9}%`, top: `${44 - i * 9}%`,
              transform: `rotate(${-8 + i * 7}deg)`,
              background: ["linear-gradient(135deg,#ff4fd8,#ff9a5b)", "linear-gradient(135deg,#5b7cff,#4fffd8)", "linear-gradient(135deg,#ffe14f,#ff4fd8)"][i],
            }}
          />
        ))}
      </div>
    </Browser>
  );
}

export function Mockup({ style }: { style: MockupStyle }) {
  if (style === "restaurant") return <Restaurant />;
  if (style === "realestate") return <RealEstate />;
  return <Creative />;
}

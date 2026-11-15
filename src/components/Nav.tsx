"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import Link from "next/link";
import { nav } from "@/config/site";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 md:px-5 ${scrolled ? "glass shadow-[0_10px_40px_-20px_rgba(0,0,0,.8)]" : ""}`}>
          <Logo />
          <nav aria-label="Hoofdmenu" className="hidden items-center gap-8 lg:flex">
            {nav.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-mute transition-colors hover:text-white">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/#contact" className="btn btn-primary hidden !px-5 !py-2.5 !text-sm sm:inline-flex">
              Start jouw website
            </Link>
            <button
              type="button"
              className="relative grid h-11 w-11 place-items-center rounded-full border border-white/15 lg:hidden"
              aria-label={open ? "Menu sluiten" : "Menu openen"}
              aria-expanded={open}
              aria-controls="mobiel-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className={`absolute h-px w-5 bg-white transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-px w-5 bg-white transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobiel menu */}
      <div
        id="mobiel-menu"
        className={`fixed inset-0 -z-10 bg-ink/95 backdrop-blur-xl transition-opacity duration-500 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobiel menu" className="flex h-full flex-col justify-center gap-2 px-8">
          {nav.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className={`font-display text-4xl font-semibold transition-all duration-500 hover:text-turq ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              {l.label}
            </a>
          ))}
          <Link href="/#contact" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="btn btn-primary mt-8 self-start">
            Start jouw website <span className="arrow">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

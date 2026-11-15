import Link from "next/link";
import { nav, site } from "@/config/site";
import { services } from "@/data/content";
import { Logo } from "./Logo";

export function Footer() {
  const socials = Object.entries(site.socials).filter(([, url]) => url);
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[.07] bg-ink-2/50">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 border-b border-white/[.07] pb-16 md:flex-row md:items-end">
          <p className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.6rem)] font-bold uppercase leading-[.95] tracking-[-.03em]">
            Premium websites.<br /><span className="text-gradient">Without the premium price.</span>
          </p>
          <Link href="/#contact" className="btn btn-primary shrink-0">Start jouw website <span className="arrow" aria-hidden>→</span></Link>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-mute">
              Creatief digitaal bureau voor moderne, interactieve en 3D-websites. Premium kwaliteit, toegankelijk geprijsd.
            </p>
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-4 py-2 text-sm capitalize hover:border-turq hover:text-turq">{name}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <nav aria-label="Footer navigatie" className="lg:col-span-2">
            <h2 className="mb-4 text-sm uppercase tracking-[.18em] text-mute">Menu</h2>
            <ul className="space-y-2.5">
              {nav.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-turq">{l.label}</Link></li>)}
              <li><Link href="/#contact" className="hover:text-turq">Contact</Link></li>
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <h2 className="mb-4 text-sm uppercase tracking-[.18em] text-mute">Diensten</h2>
            <ul className="space-y-2.5">
              {services.map((s) => <li key={s.key}><Link href="/#diensten" className="hover:text-turq">{s.title}</Link></li>)}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h2 className="mb-4 text-sm uppercase tracking-[.18em] text-mute">Contact</h2>
            <ul className="space-y-2.5">
              {site.contact.email && <li><a href={`mailto:${site.contact.email}`} className="hover:text-turq">{site.contact.email}</a></li>}
              {site.contact.phone && <li><a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-turq">{site.contact.phone}</a></li>}
              {site.contact.city && <li className="text-mute">{site.contact.city}</li>}
              <li><Link href="/#contact" className="text-turq-light hover:underline">Aanvraagformulier →</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/[.07] pt-8 text-sm text-mute md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.name}. Alle rechten voorbehouden.{site.contact.kvk && ` KvK ${site.contact.kvk}`}</p>
          <ul className="flex gap-6">
            <li><Link href="/privacy/" className="hover:text-white">Privacyverklaring</Link></li>
            <li><Link href="/voorwaarden/" className="hover:text-white">Algemene voorwaarden</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

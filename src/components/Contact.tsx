"use client";

import { useRef, useState } from "react";
import { site } from "@/config/site";
import { budgets, websiteTypes } from "@/data/content";
import { Reveal } from "./Reveal";
import { IconCheck, IconMail, IconPhone } from "./Icons";

type Fields = { naam: string; bedrijf: string; email: string; telefoon: string; type: string; budget: string; omschrijving: string; akkoord: boolean };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

const empty: Fields = { naam: "", bedrijf: "", email: "", telefoon: "", type: "", budget: "", omschrijving: "", akkoord: false };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.naam.trim().length < 2) e.naam = "Vul je naam in.";
  if (f.bedrijf.trim().length < 2) e.bedrijf = "Vul je bedrijfsnaam in.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Vul een geldig e-mailadres in, bijvoorbeeld naam@bedrijf.nl.";
  if (f.telefoon.trim() && !/^[+()\d\s-]{8,20}$/.test(f.telefoon.trim())) e.telefoon = "Dit telefoonnummer klopt niet helemaal. Laat het leeg als je het niet wilt invullen.";
  if (!f.type) e.type = "Kies een type website.";
  if (!f.budget) e.budget = "Kies een geschat budget.";
  if (f.omschrijving.trim().length < 20) e.omschrijving = "Vertel iets meer over je project (minimaal 20 tekens).";
  if (!f.akkoord) e.akkoord = "Geef toestemming zodat we contact met je mogen opnemen.";
  return e;
}

const inputBase =
  "w-full rounded-xl border bg-ink/60 px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-turq focus:bg-ink";

export function Contact() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    const next = { ...f, [k]: v };
    setF(next);
    if (touched) setErrors(validate(next));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    // Honeypot tegen spam: bots vullen dit verborgen veld in.
    const hp = (formRef.current?.elements.namedItem("_gotcha") as HTMLInputElement | null)?.value;
    if (hp) return;

    if (!site.formspreeId) {
      setStatus({
        kind: "error",
        message: "Het formulier is nog niet gekoppeld aan een verzenddienst, dus er is niets verstuurd. (Voor de beheerder: vul NEXT_PUBLIC_FORMSPREE_ID in, zie README.)",
      });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          naam: f.naam, bedrijf: f.bedrijf, email: f.email, telefoon: f.telefoon || "-",
          type_website: f.type, budget: f.budget, omschrijving: f.omschrijving,
          _subject: `Nieuwe aanvraag van ${f.bedrijf} via webmotionlab`,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ kind: "sent" });
      setF(empty);
      setTouched(false);
    } catch {
      setStatus({
        kind: "error",
        message: `Versturen is niet gelukt. Probeer het over een paar minuten opnieuw${site.contact.email ? ` of mail ons via ${site.contact.email}` : ""}.`,
      });
    }
  }

  const field = (k: keyof Fields) => ({
    name: k,
    id: `f-${k}`,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
  });
  const border = (k: keyof Fields) => (errors[k] ? "border-[#ff6b7a]" : "border-white/10");
  const Err = ({ k }: { k: keyof Fields }) =>
    errors[k] ? <p id={`e-${k}`} className="mt-2 text-sm text-[#ff8a96]">{errors[k]}</p> : null;
  const Label = ({ k, children, optional }: { k: keyof Fields; children: React.ReactNode; optional?: boolean }) => (
    <label htmlFor={`f-${k}`} className="mb-2 block text-sm font-medium">
      {children} {optional && <span className="font-normal text-mute">(optioneel)</span>}
    </label>
  );

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="aurora left-[-10%] top-[10%] h-[45vw] w-[45vw] bg-turq/15" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-5">Contact</p>
            <h2 id="contact-title" className="font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-bold uppercase leading-[.92] tracking-[-.03em]">
              Ready to move <span className="text-gradient">beyond ordinary?</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-mute">
              Vertel ons wat je nodig hebt. Wij helpen je om jouw ideeën om te zetten in een indrukwekkende online ervaring.
            </p>
            <ul className="mt-10 space-y-4 text-mute">
              {["Reactie op je aanvraag", "Vrijblijvend kennismakingsgesprek", "Duidelijke offerte vooraf"].map((t) => (
                <li key={t} className="flex items-center gap-3"><IconCheck className="h-5 w-5 text-turq" />{t}</li>
              ))}
            </ul>
            {(site.contact.email || site.contact.phone) && (
              <div className="mt-10 space-y-3">
                {site.contact.email && (
                  <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 hover:text-turq"><IconMail className="h-5 w-5 text-turq" />{site.contact.email}</a>
                )}
                {site.contact.phone && (
                  <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-turq"><IconPhone className="h-5 w-5 text-turq" />{site.contact.phone}</a>
                )}
              </div>
            )}
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={120}>
          <div className="glass glow-border rounded-3xl p-6 md:p-10">
            {status.kind === "sent" ? (
              <div role="status" className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-turq text-ink shadow-[0_0_40px_var(--color-turq)]"><IconCheck className="h-8 w-8" /></span>
                <h3 className="mt-6 font-display text-3xl font-semibold">Bedankt voor je aanvraag!</h3>
                <p className="mt-3 max-w-sm text-mute">We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op.</p>
                <button type="button" onClick={() => setStatus({ kind: "idle" })} className="btn btn-ghost mt-8">Nog een aanvraag versturen</button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <div>
                  <Label k="naam">Naam</Label>
                  <input {...field("naam")} autoComplete="name" value={f.naam} onChange={(e) => set("naam", e.target.value)} className={`${inputBase} ${border("naam")}`} placeholder="Je naam" />
                  <Err k="naam" />
                </div>
                <div>
                  <Label k="bedrijf">Bedrijfsnaam</Label>
                  <input {...field("bedrijf")} autoComplete="organization" value={f.bedrijf} onChange={(e) => set("bedrijf", e.target.value)} className={`${inputBase} ${border("bedrijf")}`} placeholder="Je bedrijf" />
                  <Err k="bedrijf" />
                </div>
                <div>
                  <Label k="email">E-mailadres</Label>
                  <input {...field("email")} type="email" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} className={`${inputBase} ${border("email")}`} placeholder="naam@bedrijf.nl" />
                  <Err k="email" />
                </div>
                <div>
                  <Label k="telefoon" optional>Telefoonnummer</Label>
                  <input {...field("telefoon")} type="tel" autoComplete="tel" value={f.telefoon} onChange={(e) => set("telefoon", e.target.value)} className={`${inputBase} ${border("telefoon")}`} placeholder="06 …" />
                  <Err k="telefoon" />
                </div>
                <div>
                  <Label k="type">Type website</Label>
                  <select {...field("type")} value={f.type} onChange={(e) => set("type", e.target.value)} className={`${inputBase} ${border("type")} appearance-none`}>
                    <option value="">Maak een keuze</option>
                    {websiteTypes.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <Err k="type" />
                </div>
                <div>
                  <Label k="budget">Geschat budget</Label>
                  <select {...field("budget")} value={f.budget} onChange={(e) => set("budget", e.target.value)} className={`${inputBase} ${border("budget")} appearance-none`}>
                    <option value="">Maak een keuze</option>
                    {budgets.map((b) => <option key={b}>{b}</option>)}
                  </select>
                  <Err k="budget" />
                </div>
                <div className="sm:col-span-2">
                  <Label k="omschrijving">Omschrijving van het project</Label>
                  <textarea {...field("omschrijving")} rows={5} value={f.omschrijving} onChange={(e) => set("omschrijving", e.target.value)} className={`${inputBase} ${border("omschrijving")} resize-y`} placeholder="Wat doet je bedrijf, wat wil je bereiken en heb je voorbeelden die je mooi vindt?" />
                  <Err k="omschrijving" />
                </div>
                <div className="sm:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-mute">
                    <input {...field("akkoord")} type="checkbox" checked={f.akkoord} onChange={(e) => set("akkoord", e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#20e0d0]" />
                    <span>Ik geef toestemming dat WEBMOTIONLAB mijn gegevens gebruikt om contact met mij op te nemen over deze aanvraag. Lees de <a href="/privacy/" className="text-turq-light underline underline-offset-4">privacyverklaring</a>.</span>
                  </label>
                  <Err k="akkoord" />
                </div>
                {status.kind === "error" && (
                  <p role="alert" className="rounded-xl border border-[#ff6b7a]/40 bg-[#ff6b7a]/10 px-4 py-3 text-sm text-[#ffb3bb] sm:col-span-2">{status.message}</p>
                )}
                {touched && Object.keys(errors).length > 0 && (
                  <p role="alert" className="text-sm text-[#ff8a96] sm:col-span-2">Controleer de gemarkeerde velden.</p>
                )}
                <div className="sm:col-span-2">
                  <button type="submit" disabled={status.kind === "sending"} className="btn btn-primary w-full justify-center !py-4 text-base uppercase tracking-[.08em] disabled:opacity-60 sm:w-auto">
                    {status.kind === "sending" ? "Bezig met versturen…" : <>Let&apos;s build something <span className="arrow" aria-hidden>→</span></>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

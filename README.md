# WEBMOTIONLAB — website

De website van WEBMOTIONLAB: Next.js + TypeScript + Tailwind CSS, met een Three.js-deeltjesscène in de hero.
Fase 1: de homepage. De extra pagina's (Over ons, Diensten, Portfolio, Prijzen, Contact) volgen.

## Snel starten

Je hebt [Node.js](https://nodejs.org) 20 of nieuwer nodig.

```bash
npm install
cp .env.example .env.local    # en vul de Formspree-ID in (zie hieronder)
npm run dev                   # open http://localhost:3000
```

## Wat je zelf moet invullen

| Wat | Waar |
|---|---|
| Domein (voor SEO en social previews) | `src/config/site.ts` → `url` |
| E-mail, telefoon, plaats, KvK-nummer | `src/config/site.ts` → `contact` (lege velden worden automatisch verborgen) |
| Instagram / LinkedIn / TikTok | `src/config/site.ts` → `socials` |
| Formulier-ID van Formspree | `.env.local` → `NEXT_PUBLIC_FORMSPREE_ID` |
| Privacyverklaring | `src/app/privacy/page.tsx` (nu een tijdelijke tekst) |
| Algemene voorwaarden | `src/app/voorwaarden/page.tsx` (nu een tijdelijke tekst) |
| Btw: prijzen in- of exclusief? | `src/components/Pricing.tsx`, regel onder de prijs |

## Aanvraagformulier koppelen (Formspree)

1. Maak een gratis account op [formspree.io](https://formspree.io) en maak een nieuw formulier aan.
2. Je krijgt een adres als `https://formspree.io/f/abcdwxyz`. De ID is `abcdwxyz`.
3. Zet in `.env.local`: `NEXT_PUBLIC_FORMSPREE_ID=abcdwxyz` (en bij je hosting als omgevingsvariabele).
4. Bouw de site opnieuw. Aanvragen komen nu in jullie mailbox.

Zolang de ID ontbreekt, verstuurt het formulier **niets** en zegt het dat ook eerlijk tegen de bezoeker.
Het formulier heeft validatie, foutmeldingen per veld, een spam-honeypot en een bevestiging na verzending.

## Teksten en content aanpassen

- **Alle homepage-teksten** (diensten, voordelen, pakketten, stappen, FAQ, formulieropties): `src/data/content.ts`
- **Portfolio**: `src/data/projects.ts`
  - Echt project toevoegen: kopieer een object, zet `concept: false`, zet een afbeelding in `public/work/` en vul `image: "/work/naam.jpg"` in.
  - Projecten met `concept: true` krijgen automatisch het label *Conceptontwerp* en een melding in de projectpresentatie.
- **Kleuren en lettertypen**: `src/app/globals.css` (bovenaan, `@theme`)

## Publiceren

De site wordt een statische map (`out/`) die overal draait.

**Netlify** (aanrader, gratis): koppel de Git-repository, build command `npm run build`, publish directory `out`, en zet `NEXT_PUBLIC_FORMSPREE_ID` bij *Environment variables*.

**Vercel**: importeer de repository; Vercel herkent Next.js automatisch. Zet dezelfde omgevingsvariabele.

**Eigen hosting**: `npm run build` en upload de inhoud van `out/` naar je webserver.

## Techniek

- `src/components/HeroScene.tsx`: de 3D-hero. Eén deeltjeswolk wisselt van vorm: **idee** (bol) → **beweging** (knoop) → **website** (browservenster). De muis duwt deeltjes weg; bij scrollen waaiert de wolk uit.
  - Wordt pas geladen na de rest van de pagina (`HeroSceneLazy.tsx`), rendert alleen als de hero in beeld is, en gebruikt minder deeltjes op mobiel.
  - Respecteert *verminderde beweging* in de systeeminstellingen; zonder WebGL blijft de achtergrondgloed gewoon staan.
- Geen zware animatiebibliotheken: animaties met CSS en een kleine `IntersectionObserver` (`Reveal.tsx`).
- SEO: metadata, Open Graph-afbeelding (`public/og.png`), gestructureerde data voor het bedrijf en de FAQ, semantische HTML.
- Toegankelijkheid: skip-link, toetsenbordbediening, zichtbare focus, `aria`-labels, native `<details>` voor de FAQ en `<dialog>` voor projectpresentaties.

## Aannames die we hebben gedaan

- Prijzen zijn vanafprijzen en voorlopig, zoals in de briefing. Of ze in- of exclusief btw zijn, staat er bewust niet bij.
- Hosting en domeinnaam zijn niet inbegrepen (FAQ en prijskaarten). Pas dit aan als jullie het wel aanbieden.
- Doorlooptijd: er wordt geen termijn beloofd; de planning staat in de offerte.
- De drie portfolio-projecten zijn conceptontwerpen en staan ook zo op de site.

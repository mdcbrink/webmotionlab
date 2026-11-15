/**
 * Alle teksten van de homepage op één plek.
 * Aanpassen kan hier zonder dat je de componenten hoeft aan te raken.
 */

export const services = [
  {
    key: "3d",
    title: "3D Web Design",
    intro: "Websites waar bezoekers even voor blijven hangen.",
    points: [
      "Interactieve 3D-elementen",
      "Unieke visuele ervaringen",
      "Moderne animaties",
      "Opvallende digitale presentaties",
    ],
  },
  {
    key: "business",
    title: "Business Websites",
    intro: "Een professioneel visitekaartje dat vertrouwen wekt.",
    points: [
      "Professionele bedrijfswebsites",
      "Responsive design",
      "Duidelijke navigatie",
      "Gericht op conversie en vertrouwen",
    ],
  },
  {
    key: "experience",
    title: "Digital Experiences",
    intro: "Beweging en interactie die je merk laten leven.",
    points: [
      "Motion design",
      "Interactieve elementen",
      "Moderne gebruikerservaring",
      "Creatieve digitale oplossingen",
    ],
  },
] as const;

export const benefits = [
  {
    key: "premium",
    title: "Premium uitstraling",
    text: "Een ontwerp dat eruitziet alsof een groot bureau het maakte. Geen template, maar een eigen gezicht voor jouw bedrijf.",
  },
  {
    key: "prijs",
    title: "Betaalbare tarieven",
    text: "Professioneel hoeft geen duizenden euro's te kosten. Wij werken slim en efficiënt, en dat zie je terug in de prijs.",
  },
  {
    key: "persoonlijk",
    title: "Persoonlijke samenwerking",
    text: "Je praat direct met de mensen die jouw website ontwerpen en bouwen. Korte lijnen, snelle schakels.",
  },
  {
    key: "tech",
    title: "Moderne technologie",
    text: "Gebouwd met dezelfde technieken als de grote merken: snel, veilig, responsive en klaar voor de toekomst.",
  },
] as const;

export type Plan = {
  name: string;
  price: string;
  for: string;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Starter",
    price: "500",
    for: "Voor startende ondernemers",
    features: [
      "Professioneel webdesign",
      "Tot 3 pagina's",
      "Responsive ontwerp",
      "Contactformulier",
      "Basis SEO",
    ],
  },
  {
    name: "Business",
    price: "750",
    for: "Voor groeiende bedrijven",
    featured: true,
    features: [
      "Tot 5 pagina's",
      "Uitgebreider maatwerkdesign",
      "Animaties en interacties",
      "SEO-basis",
      "Contactformulier",
    ],
  },
  {
    name: "Premium",
    price: "1.000",
    for: "Voor bedrijven die zich willen onderscheiden",
    features: [
      "Uitgebreid maatwerkdesign",
      "Tot 8 pagina's",
      "Geavanceerde animaties",
      "3D-elementen waar passend",
      "Uitgebreidere SEO-inrichting",
    ],
  },
];

export const steps = [
  { nr: "01", title: "Discovery", text: "We bespreken jouw bedrijf, wensen en doelstellingen." },
  { nr: "02", title: "Design", text: "We ontwikkelen het ontwerp van jouw website." },
  { nr: "03", title: "Development", text: "We bouwen en optimaliseren de website." },
  { nr: "04", title: "Launch", text: "Na jouw goedkeuring zetten we de website online." },
] as const;

export const faqs = [
  {
    q: "Wat kost een website bij WEBMOTIONLAB?",
    a: "Onze websites beginnen vanaf €500 (Starter). Business start vanaf €750 en Premium vanaf €1.000. Dit zijn vanafprijzen: de uiteindelijke prijs hangt af van jouw wensen en de functionaliteiten die je nodig hebt. Je ontvangt altijd eerst een offerte, zodat je vooraf weet waar je aan toe bent.",
  },
  {
    q: "Hoe lang duurt het bouwen van een website?",
    a: "Dat hangt af van de omvang van de website en hoe snel teksten en beeldmateriaal beschikbaar zijn. In de offerte spreken we een concrete planning met je af.",
  },
  {
    q: "Kan ik zelf mijn website aanpassen?",
    a: "Dat kan, als je dat wilt. Laat het ons vooraf weten, dan nemen we het mee in het ontwerp en de offerte. Kleine aanpassingen kunnen we ook voor je doen.",
  },
  {
    q: "Is mijn website geschikt voor mobiel?",
    a: "Ja. Elke website ontwerpen en testen we voor mobiel, tablet en desktop. De meeste bezoekers komen tegenwoordig via hun telefoon, dus daar beginnen we mee.",
  },
  {
    q: "Zijn hosting en domeinnaam inbegrepen?",
    a: "Niet standaard. Hosting en een domeinnaam zijn doorlopende kosten die los van het ontwerp staan. We helpen je graag bij het kiezen en inrichten, en we vermelden eventuele kosten duidelijk in de offerte.",
  },
  {
    q: "Kan ik later extra pagina's toevoegen?",
    a: "Ja. Je website groeit mee met je bedrijf. Extra pagina's of functies voegen we in overleg toe; je krijgt vooraf een prijsopgave.",
  },
  {
    q: "Kan ik een volledig unieke website laten maken?",
    a: "Zeker. Ook onze pakketten zijn geen templates: elk ontwerp maken we voor jouw bedrijf. Heb je bijzondere wensen? Dan maken we een offerte op maat.",
  },
  {
    q: "Wat is een 3D-website?",
    a: "Een website met driedimensionale elementen die bewegen en reageren op de bezoeker, bijvoorbeeld een product dat meedraait als je scrolt of een object dat reageert op je muis. Het maakt je site memorabel. We zetten 3D alleen in waar het iets toevoegt, en zorgen dat je site snel blijft.",
  },
  {
    q: "Hoe verloopt het aanvraagproces?",
    a: "Vul het formulier onderaan deze pagina in. We nemen contact met je op voor een kennismaking, bespreken je wensen en sturen daarna een offerte. Pas als je akkoord bent, gaan we aan de slag.",
  },
] as const;

export const websiteTypes = [
  "Bedrijfswebsite",
  "3D-website",
  "Portfolio / persoonlijk merk",
  "Landingspagina",
  "Webshop",
  "Anders / weet ik nog niet",
] as const;

export const budgets = [
  "€500 – €750",
  "€750 – €1.000",
  "€1.000 – €2.000",
  "€2.000+",
  "Nog niet bepaald",
] as const;

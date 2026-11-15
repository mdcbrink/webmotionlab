/**
 * Portfolio-projecten.
 *
 * Een echt project toevoegen? Kopieer een object, zet `concept: false`,
 * vul de teksten in en zet een afbeelding in /public/work/ (bijv. "/work/klantnaam.jpg")
 * bij `image`. Zonder `image` tekenen we een gestileerde mockup met `mockup`.
 */
export type MockupStyle = "restaurant" | "realestate" | "creative";

export type Project = {
  slug: string;
  name: string;
  sector: string;
  concept: boolean; // true = conceptontwerp, geen echte klant
  summary: string;
  challenge: string;
  approach: string;
  features: string[];
  palette: string[];
  fonts: string;
  mockup: MockupStyle;
  image?: string;
  url?: string;
};

export const projects: Project[] = [
  {
    slug: "ember-oak",
    name: "Ember & Oak",
    sector: "Modern restaurant",
    concept: true,
    summary: "Een warme, sfeervolle site die je de geur van de houtoven bijna laat ruiken.",
    challenge:
      "Een restaurant verkoopt een avond, niet een menukaart. De site moet gasten in de juiste stemming brengen én het reserveren zo makkelijk mogelijk maken.",
    approach:
      "Donkere, warme tinten met gloeiend oranje accenten. Grote sfeerbeelden, een menu dat per gang opent en een reserveerknop die altijd in beeld blijft.",
    features: ["Menu per gang met animatie", "Altijd zichtbare reserveerknop", "Openingstijden en route in één oogopslag", "Sfeervolle scroll-overgangen"],
    palette: ["#140D0A", "#E8752A", "#F3E6D3"],
    fonts: "Serif-koppen met een strakke sans-serif",
    mockup: "restaurant",
  },
  {
    slug: "lumen-living",
    name: "Lumen Living",
    sector: "Premium vastgoed",
    concept: true,
    summary: "Rust, ruimte en licht: een site die voelt als een bezichtiging.",
    challenge:
      "Bij premium vastgoed draait alles om vertrouwen en uitstraling. Bezoekers moeten snel kunnen zoeken, maar de site mag nooit druk aanvoelen.",
    approach:
      "Veel witruimte, zachte zandtinten en architectonische lijnen. Woningen in grote kaarten met een slimme filter, en een 3D-plattegrond als blikvanger.",
    features: ["Aanbod met filters", "3D-plattegrond per woning", "Bezichtiging direct inplannen", "Rustige, elegante animaties"],
    palette: ["#F4F0EA", "#1E2A2F", "#B89B72"],
    fonts: "Elegante serif met dunne sans-serif",
    mockup: "realestate",
  },
  {
    slug: "studio-prisma",
    name: "Studio Prisma",
    sector: "Creatieve onderneming",
    concept: true,
    summary: "Een speelse portfoliosite met kleur, beweging en durf.",
    challenge:
      "Een creatieve studio moet laten zien wat ze kan, al vanaf de eerste seconde. Een standaard portfolio-raster valt niet op.",
    approach:
      "Felle kleurverlopen, grote typografie en projecten die als kaarten door het scherm bewegen. Elke hover voelt als een kleine verrassing.",
    features: ["Bewegende projectkaarten", "Kleurverlopen die meebewegen met de muis", "Case-pagina's per project", "Contact in één klik"],
    palette: ["#12051F", "#FF4FD8", "#5B7CFF"],
    fonts: "Extra vette display-letter met monospace-details",
    mockup: "creative",
  },
];

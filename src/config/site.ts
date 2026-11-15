/**
 * Centrale instellingen van WEBMOTIONLAB.
 * Vul hier jullie eigen gegevens in. Lege velden worden op de site automatisch verborgen,
 * zodat er nooit een verzonnen adres, telefoonnummer of social-account verschijnt.
 */
type SiteConfig = {
  name: string; url: string; tagline: string; description: string;
  contact: { email: string; phone: string; city: string; kvk: string };
  socials: Record<string, string>;
  formspreeId: string;
};

export const site: SiteConfig = {
  name: "WEBMOTIONLAB",
  url: "https://www.webmotionlab.nl", // TODO: vervang door jullie echte domein
  tagline: "Premium websites. Without the premium price.",
  description:
    "WEBMOTIONLAB ontwerpt en bouwt moderne, interactieve en 3D-websites voor ondernemers. Premium kwaliteit, vanaf €500.",

  contact: {
    email: "", // bijv. "hallo@webmotionlab.nl"
    phone: "", // bijv. "+31 6 12345678"
    city: "", // bijv. "Rotterdam" (geen volledig adres nodig)
    kvk: "", // KvK-nummer, verplicht op een zakelijke site
  },

  socials: {
    instagram: "", // volledige URL, bijv. "https://www.instagram.com/webmotionlab"
    linkedin: "",
    tiktok: "",
  },

  /**
   * Formspree: maak een gratis formulier aan op https://formspree.io
   * en zet de formulier-ID (het deel na /f/) in .env.local als NEXT_PUBLIC_FORMSPREE_ID.
   */
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
};

export const nav = [
  { label: "Diensten", href: "/#diensten" },
  { label: "Werk", href: "/#werk" },
  { label: "Prijzen", href: "/#prijzen" },
  { label: "Werkwijze", href: "/#werkwijze" },
  { label: "FAQ", href: "/#faq" },
] as const;

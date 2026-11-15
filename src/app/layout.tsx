import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "WEBMOTIONLAB — Premium websites. Without the premium price.",
    template: "%s — WEBMOTIONLAB",
  },
  description: site.description,
  keywords: ["3D website", "webdesign", "website laten maken", "betaalbare website", "interactieve website", "webdesign bureau"],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: site.url,
    siteName: site.name,
    title: "WEBMOTIONLAB — We build websites that move you.",
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "WEBMOTIONLAB" }],
  },
  twitter: { card: "summary_large_image", title: "WEBMOTIONLAB", description: site.description, images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#080B10", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-turq focus:px-4 focus:py-2 focus:text-ink">
          Ga naar de inhoud
        </a>
        {children}
      </body>
    </html>
  );
}

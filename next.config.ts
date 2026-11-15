import type { NextConfig } from "next";

// Statische export: de site wordt een map met HTML/JS/CSS ("out/")
// die op elke host werkt (Netlify, Vercel, Cloudflare Pages, eigen hosting).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;

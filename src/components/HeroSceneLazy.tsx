"use client";

import dynamic from "next/dynamic";

// Three.js pas laden nadat de pagina zelf al zichtbaar is: snellere eerste weergave.
export const HeroSceneLazy = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), { ssr: false });

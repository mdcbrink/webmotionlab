import { Nav } from "./Nav";
import { Footer } from "./Footer";

/** Tijdelijke juridische pagina: maakt duidelijk dat de tekst nog moet worden opgesteld. */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-5 pb-28 pt-40 md:px-8">
        <p className="eyebrow mb-5">Juridisch</p>
        <h1 className="font-display text-5xl font-bold tracking-[-.03em]">{title}</h1>
        <div className="mt-10 space-y-5 leading-relaxed text-mute">{children}</div>
      </main>
      <Footer />
    </>
  );
}

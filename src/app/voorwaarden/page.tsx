import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Algemene voorwaarden", robots: { index: false } };

export default function Voorwaarden() {
  return (
    <LegalPage title="Algemene voorwaarden">
      <p className="rounded-xl border border-turq/25 bg-turq/[.06] px-4 py-3 text-turq-light">
        Onze algemene voorwaarden worden nog opgesteld. Afspraken over prijs, planning en oplevering leggen we altijd vast in de offerte.
      </p>
      {/* TODO: vervang door de definitieve algemene voorwaarden. */}
    </LegalPage>
  );
}

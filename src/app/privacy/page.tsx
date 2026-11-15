import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacyverklaring", robots: { index: false } };

export default function Privacy() {
  return (
    <LegalPage title="Privacyverklaring">
      <p className="rounded-xl border border-turq/25 bg-turq/[.06] px-4 py-3 text-turq-light">
        Deze privacyverklaring wordt nog opgesteld. Tot die tijd: gegevens die je via het aanvraagformulier stuurt, gebruiken we alleen om contact met je op te nemen over je aanvraag.
      </p>
      <p>
        {/* TODO: vervang door de definitieve privacyverklaring (o.a. wie verwerkt, welke gegevens, doel, bewaartermijn, verwerkers zoals Formspree en hosting, rechten van betrokkenen, contactgegevens). */}
        Vragen over je gegevens? Neem contact met ons op via het formulier op de homepage.
      </p>
    </LegalPage>
  );
}

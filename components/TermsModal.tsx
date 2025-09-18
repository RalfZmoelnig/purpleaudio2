"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type TermsModalProps = {
  linkClassName?: string;
};

export default function TermsModal({ linkClassName }: TermsModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={linkClassName || 'hover:text-gray-900 underline'}
        onClick={() => setOpen(true)}
      >
        AGB
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-6">
              <h2 className="text-xl font-semibold text-gray-900">Allgemeine Geschäftsbedingungen</h2>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                aria-label="Schließen"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm text-gray-700 max-h-[70vh] overflow-y-auto">
              <h3 className="font-semibold text-gray-900">1. Geltungsbereich</h3>
              <p>Diese AGB gelten für alle Verträge zwischen Purple.Audio (Spotwatch GmbH) und den Nutzern der Plattform.</p>
              <h3 className="font-semibold text-gray-900">2. Leistungen</h3>
              <p>Wir stellen Tools zur Transkription und Untertitelung bereit. Der genaue Funktionsumfang ergibt sich aus der Leistungsbeschreibung.</p>
              <h3 className="font-semibold text-gray-900">3. Registrierung & Konto</h3>
              <p>Nutzer sind verpflichtet, Zugangsdaten geheim zu halten und uns bei Missbrauch unverzüglich zu informieren.</p>
              <h3 className="font-semibold text-gray-900">4. Preise & Zahlungen</h3>
              <p>Preise richten sich nach dem jeweils gültigen Preisplan. Abrechnung erfolgt über Zahlungsdienstleister.</p>
              <h3 className="font-semibold text-gray-900">5. Nutzungsrechte</h3>
              <p>Nutzer bleiben Inhaber ihrer Inhalte. Wir erhalten die zur Leistungserbringung erforderlichen Nutzungsrechte.</p>
              <h3 className="font-semibold text-gray-900">6. Haftung</h3>
              <p>Haftung für Vorsatz und grobe Fahrlässigkeit; im Übrigen nur bei Verletzung wesentlicher Pflichten und beschränkt auf den vorhersehbaren Schaden.</p>
              <h3 className="font-semibold text-gray-900">7. Datenschutz</h3>
              <p>Es gilt unsere Datenschutzerklärung.</p>
              <h3 className="font-semibold text-gray-900">8. Laufzeit & Kündigung</h3>
              <p>Sofern nicht anders vereinbart, sind Pläne monatlich kündbar zum Laufzeitende.</p>
              <h3 className="font-semibold text-gray-900">9. Schlussbestimmungen</h3>
              <p>Es gilt deutsches Recht. Gerichtsstand ist, soweit zulässig, München.</p>
            </div>

            <div className="mt-6 flex justify-end">
              <Button className="rounded-full bg-purple-700 hover:bg-purple-800" onClick={() => setOpen(false)}>
                Schließen
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



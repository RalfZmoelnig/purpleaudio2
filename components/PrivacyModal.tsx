"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type PrivacyModalProps = {
  linkClassName?: string;
};

export default function PrivacyModal({ linkClassName }: PrivacyModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={linkClassName || 'hover:text-gray-900 underline'}
        onClick={() => setOpen(true)}
      >
        Datenschutzerklärung
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-6">
              <h2 className="text-xl font-semibold text-gray-900">Datenschutzerklärung</h2>
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
              <p>Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr ernst. Diese Erklärung informiert darüber, welche Daten wir erheben, wie wir sie verwenden und welche Rechte Ihnen zustehen.</p>
              <h3 className="font-semibold text-gray-900">Verantwortlicher</h3>
              <p>Purple.Audio (Spotwatch GmbH), Lutzstrasse 2, 80687 München, info@spotwatch.io</p>
              <h3 className="font-semibold text-gray-900">Verarbeitete Daten</h3>
              <p>Nutzungsdaten, technische Daten (z. B. IP-Adresse), Kontodaten, Zahlungsdaten (über Zahlungsdienstleister).</p>
              <h3 className="font-semibold text-gray-900">Zwecke</h3>
              <p>Bereitstellung der Dienste, Sicherheit, Betrugsprävention, Abrechnung, Produktverbesserung, Support.</p>
              <h3 className="font-semibold text-gray-900">Rechtsgrundlagen</h3>
              <p>Art. 6 Abs. 1 lit. b DSGVO (Vertrag), lit. f (berechtigte Interessen), ggf. lit. a (Einwilligung).</p>
              <h3 className="font-semibold text-gray-900">Speicherdauer</h3>
              <p>Entspricht den gesetzlichen Aufbewahrungsfristen bzw. solange erforderlich zur Erfüllung der Zwecke.</p>
              <h3 className="font-semibold text-gray-900">Empfänger</h3>
              <p>IT-Dienstleister, Hosting, Zahlungsanbieter, Support-Tools. Übermittlungen finden nur im Rahmen der DSGVO statt.</p>
              <h3 className="font-semibold text-gray-900">Ihre Rechte</h3>
              <p>Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch, Beschwerde bei einer Aufsichtsbehörde.</p>
              <h3 className="font-semibold text-gray-900">Cookies</h3>
              <p>Wir verwenden essenzielle Cookies. Details in der Cookie-Notice und in den Einstellungen.</p>
              <h3 className="font-semibold text-gray-900">Kontakt</h3>
              <p>Bei Fragen wenden Sie sich an: info@spotwatch.io</p>
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



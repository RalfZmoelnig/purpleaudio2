"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type ImpressumModalProps = {
  triggerClassName?: string;
  linkClassName?: string;
};

export default function ImpressumModal({ triggerClassName, linkClassName }: ImpressumModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={linkClassName || 'hover:text-gray-900 underline'}
        onClick={() => setOpen(true)}
      >
        Impressum
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-6">
              <h2 className="text-xl font-semibold text-gray-900">Impressum</h2>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                aria-label="Schließen"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm text-gray-700">
              <p>
                Spotwatch GmbH<br />
                Geschäftsführer/ CEO: Ralf Zmölnig
              </p>
              <p>
                Lutzstrasse 2<br />
                80687 München
              </p>
              <p>
                Telefon: (08141) 315 03 75<br />
                E-Mail: info@spotwatch.io
              </p>
              <p>
                Registergericht: Amtsgericht München<br />
                Registernummer: HRB 213077<br />
                Ust-IdNr. gemäß §27 a Umsatzsteuergesetz: DE296021952
              </p>
              <p>
                Verantwortlich für den Inhalt nach §55 Abs. 2 RStV: Ralf Zmölnig
              </p>
              <p>
                Konzeption, Realisierung und Online-Marketing powered by ROCKIT-INTERNET München.
              </p>
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



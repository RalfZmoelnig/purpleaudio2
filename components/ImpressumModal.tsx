'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ImpressumModalProps {
  linkClassName?: string;
}

export default function ImpressumModal({ linkClassName = '' }: ImpressumModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={linkClassName}
      >
        Impressum
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Impressum</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </Button>
            </div>
            
            <div className="prose max-w-none">
              <h3>Angaben gemäß § 5 TMG</h3>
              <p>
                Purple.Audio<br />
                Musterstraße 123<br />
                12345 Musterstadt
              </p>
              
              <h3>Kontakt</h3>
              <p>
                Telefon: +49 (0) 123 456789<br />
                E-Mail: info@purple.audio
              </p>
              
              <h3>Umsatzsteuer-ID</h3>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                DE123456789
              </p>
              
              <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
              <p>
                Ralf Zmoelnig<br />
                Musterstraße 123<br />
                12345 Musterstadt
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
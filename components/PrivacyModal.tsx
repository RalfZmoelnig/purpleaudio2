'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface PrivacyModalProps {
  linkClassName?: string;
}

export default function PrivacyModal({ linkClassName = '' }: PrivacyModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={linkClassName}
      >
        Datenschutzerklärung
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Datenschutzerklärung</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </Button>
            </div>
            
            <div className="prose max-w-none">
              <h3>1. Datenschutz auf einen Blick</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
              </p>
              
              <h3>2. Datenerfassung auf dieser Website</h3>
              <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
                Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" 
                in dieser Datenschutzerklärung entnehmen.
              </p>
              
              <h3>3. Hosting</h3>
              <p>
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
                Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA
              </p>
              
              <h3>4. Allgemeine Hinweise und Pflichtinformationen</h3>
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
                Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den 
                gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
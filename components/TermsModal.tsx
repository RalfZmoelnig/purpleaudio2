'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface TermsModalProps {
  linkClassName?: string;
}

export default function TermsModal({ linkClassName = '' }: TermsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={linkClassName}
      >
        AGB
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Allgemeine Geschäftsbedingungen</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </Button>
            </div>
            
            <div className="prose max-w-none">
              <h3>§ 1 Geltungsbereich</h3>
              <p>
                Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen 
                Purple.Audio und dem Kunden über die Nutzung der Transkriptions- und 
                Untertitelungsdienstleistungen.
              </p>
              
              <h3>§ 2 Leistungen</h3>
              <p>
                Purple.Audio bietet Transkriptions- und Untertitelungsdienstleistungen 
                für Audio- und Videodateien an. Die Leistungen umfassen die Umwandlung 
                von Sprache in Text sowie die Erstellung von Untertiteln.
              </p>
              
              <h3>§ 3 Nutzungsrechte</h3>
              <p>
                Der Kunde erhält die ausschließlichen Nutzungsrechte an den erstellten 
                Transkriptionen und Untertiteln für seine eigenen Zwecke.
              </p>
              
              <h3>§ 4 Preise und Zahlung</h3>
              <p>
                Die Preise ergeben sich aus der aktuellen Preisliste. Die Zahlung erfolgt 
                im Voraus für das gewählte Paket.
              </p>
              
              <h3>§ 5 Datenschutz</h3>
              <p>
                Die Verarbeitung personenbezogener Daten erfolgt gemäß der 
                Datenschutzerklärung und den Bestimmungen der DSGVO.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
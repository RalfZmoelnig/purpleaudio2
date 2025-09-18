'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

type ConsentValue = 'accepted' | 'rejected';

const CONSENT_COOKIE = 'cookie_consent';
const CONSENT_MAX_AGE_DAYS = 180;

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState<null | 'privacy' | 'terms'>(null);

  useEffect(() => {
    const existing = getCookie(CONSENT_COOKIE);
    if (!existing) {
      setVisible(true);
    }
  }, []);

  function handle(consent: ConsentValue) {
    setCookie(CONSENT_COOKIE, consent, CONSENT_MAX_AGE_DAYS);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-700">
              Wir verwenden Cookies, um grundlegende Funktionen bereitzustellen und
              die Nutzung zu verstehen. Details findest du in unserer{' '}
              <button
                type="button"
                onClick={() => setModal('privacy')}
                className="underline text-purple-700"
              >
                Datenschutzerklärung
              </button>{' '}
              und unseren{' '}
              <button
                type="button"
                onClick={() => setModal('terms')}
                className="underline text-purple-700"
              >
                AGB
              </button>.
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => handle('rejected')}
              >
                Ablehnen
              </Button>
              <Button
                className="rounded-full bg-purple-700 hover:bg-purple-800"
                onClick={() => handle('accepted')}
              >
                Akzeptieren
              </Button>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setModal(null)}
          />
          <div className="relative w-full sm:max-w-2xl mx-auto bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-6 sm:p-8 overflow-y-auto max-h-[80vh]">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {modal === 'privacy' ? 'Datenschutzerklärung' : 'Allgemeine Geschäftsbedingungen (AGB)'}
              </h3>
              <Button variant="outline" className="rounded-full" onClick={() => setModal(null)}>
                Schließen
              </Button>
            </div>
            {modal === 'privacy' ? (
              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <p>
                  Wir verarbeiten hochgeladene Audio‑ und Videodateien ausschließlich
                  zur Erbringung unserer Dienste (Transkription/Untertitel). Inhalte
                  werden verschlüsselt übertragen und gespeichert und nach Abschluss
                  der Verarbeitung gemäß Aufbewahrungsfristen gelöscht, sofern keine
                  längere Speicherung aktiv gewählt wird.
                </p>
                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
                  Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung
                  und Datenübertragbarkeit. Kontakt für Datenschutzanfragen: privacy@purple.audio.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Verarbeitung auf EU‑Infrastruktur, strenge Zugriffsrechte</li>
                  <li>Keine Weitergabe an Dritte zu Werbezwecken</li>
                  <li>Auftragsverarbeitung gemäß Art. 28 DSGVO auf Anfrage</li>
                </ul>
              </div>
            ) : (
              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <p>
                  Diese AGB regeln die Nutzung von Purple.Audio. Mit der Registrierung
                  schließt du einen Vertrag über die Nutzung unserer SaaS‑Leistungen.
                </p>
                <ul className="list-decimal pl-5 space-y-1">
                  <li>Leistungsumfang: Transkription, Untertitelung, Exporte, API.</li>
                  <li>Nutzungsrechte: Du behältst alle Rechte an deinen Inhalten.</li>
                  <li>Verbotene Inhalte: Kein rechtswidriges oder urheberrechtswidriges Material.</li>
                  <li>Haftung: Nach gesetzlichen Vorgaben, keine Gewähr für perfekte Fehlerfreiheit.</li>
                  <li>Zahlungen/Kündigung: Abomodell mit monatlicher Abrechnung; kündbar zum Laufzeitende.</li>
                </ul>
                <p>
                  Es gilt deutsches Recht. Gerichtsstand ist, soweit zulässig, der Sitz des Anbieters.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}



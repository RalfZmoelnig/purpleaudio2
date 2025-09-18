import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';
import CookieConsent from '@/components/CookieConsent';

export const metadata: Metadata = {
  title: 'Purple.Audio ist Audiotranskription 5.0',
  description:
    'Purple.Audio ist Audiotranskription und Unterttitelung für Youtube-Videos und mehr - schnell akkurat und sicher!',
  robots: { index: false, follow: false }
};

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-white">
        <SWRConfig
          value={{
            fallback: {
              // We do NOT await here
              // Only components that read this data will suspend
              '/api/user': getUser(),
              '/api/team': getTeamForUser()
            }
          }}
        >
          {children}
          <CookieConsent />
        </SWRConfig>
      </body>
    </html>
  );
}

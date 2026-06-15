import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Marbella Twin Towers — Luxury Apartments in New Chandigarh',
  description:
    'The first and the iconic twin towers development in the Chandigarh Tri-City region. Modern luxury residences with world-class amenities.',
  openGraph: {
    title: 'Marbella Twin Towers — Luxury Apartments in New Chandigarh',
    description:
      'The first and the iconic twin towers development in the Chandigarh Tri-City region. Modern luxury residences with world-class amenities.',
    type: 'website',
    images: ['/hero-1.jpg'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a1a1a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}

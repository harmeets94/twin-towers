import type { Metadata } from 'next';
import Script from 'next/script';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Amenities } from '@/components/sections/Amenities';
import { WhyChoose } from '@/components/sections/WhyChoose';
import { Stats } from '@/components/sections/Stats';
import { FloorPlan } from '@/components/sections/FloorPlan';
import { Gallery } from '@/components/sections/Gallery';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { FloatingContactBar } from '@/components/islands/FloatingContactBar';
import { FloatingForm } from '@/components/islands/FloatingForm';
import { ScrollToTop } from '@/components/islands/ScrollToTop';
import { WhatsAppFloat } from '@/components/sections/WhatsAppFloat';

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
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Residence',
  name: 'Marbella Twin Towers',
  description:
    'The first and the iconic twin towers development in the Chandigarh Tri-City region. Premium 4+1/5 BHK super luxury residences.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Madhya Marg, Sector 2',
    addressLocality: 'New Chandigarh',
    addressRegion: 'Punjab',
    addressCountry: 'IN',
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  image: '/hero-1.jpg',
  telephone: '+919478997378',
};

export default function Home() {
  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FloatingContactBar />
      <Header />
      <main>
        <Hero />
        <About />
        <Amenities />
        <WhyChoose />
        <Stats />
        <FloorPlan />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <FloatingForm />
      <ScrollToTop />
      <WhatsAppFloat />
    </>
  );
}

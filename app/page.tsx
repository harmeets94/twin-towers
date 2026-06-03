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

export default function Home() {
  return (
    <>
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

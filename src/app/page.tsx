import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/sections/HeroCarousel";
import AboutSection from "@/components/sections/AboutSection";
import ServiceTicker from "@/components/sections/ServiceTicker";
import FloorPlanSection from "@/components/sections/FloorPlanSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import GallerySection from "@/components/sections/GallerySection";
import StatsSection from "@/components/sections/StatsSection";
import MapSection from "@/components/sections/MapSection";
import ContactSection from "@/components/sections/ContactSection";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ScrollToTop from "@/components/ui/ScrollToTop";
import LeadCaptureModal from "@/components/ui/LeadCaptureModal";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Layout Components */}
      <TopBar />
      <Header />

      {/* Page Sections */}
      <HeroCarousel />
      <AboutSection />
      <ServiceTicker />
      <FloorPlanSection />
      <WhyChooseSection />
      <GallerySection />
      <StatsSection />
      <MapSection />
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Floating UI Elements */}
      <WhatsAppButton />
      <ScrollToTop />
      <LeadCaptureModal />
    </main>
  );
}

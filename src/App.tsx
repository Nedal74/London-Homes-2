import { useState, useCallback } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { useUnits } from './hooks/useUnits';
import { computeStats } from './lib/utils';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import StatsSection from './components/StatsSection';
import UnitsSection from './components/UnitsSection';
import GallerySection from './components/GallerySection';
import LocationSection from './components/LocationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import InquiryModal from './components/InquiryModal';
import type { Unit } from './types';
import ProjectSlider from './components/ProjectSlider';

function AppContent() {
  const { units, loading, error, refetch } = useUnits();
  const stats = computeStats(units);
  const [inquiryUnit, setInquiryUnit] = useState<Unit | null>(null);

  const handleInquire = useCallback((unit: Unit) => {
    setInquiryUnit(unit);
  }, []);

  const handleCloseModal = useCallback(() => {
    setInquiryUnit(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <ProjectSlider />
        <StatsSection stats={stats} />
        <UnitsSection
          units={units}
          loading={loading}
          error={error}
          onRefetch={refetch}
          onInquire={handleInquire}
        />
        <GallerySection />
                <AboutSection />

        <LocationSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
      <InquiryModal unit={inquiryUnit} onClose={handleCloseModal} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

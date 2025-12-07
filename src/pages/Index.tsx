// src/pages/Index.tsx

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// --- COMPONENTS ---
import Loader from '@/components/Loader';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TrustedBy from '@/components/TrustedBy';
// Note: Ensure this file exists. In previous steps, we named it "InvestmentSection" or "InvestmentIntelligenceCenter".
// If you named it InvestmentSection.tsx, update this import.
import InvestmentInsights from '@/components/InvestmentInsights'; 
import SmarterInvesting from '@/components/SmarterInvesting';
import CoreFeatures from '@/components/CoreFeatures';
import MetricsSection from '@/components/MetricsSection';
import PricingSection from '@/components/PricingSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  const [loading, setLoading] = useState(true);

  // UX Improvement: Lock body scroll while loader is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
      // Optional: Scroll to top to ensure we start fresh
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      
      {/* 
        AnimatePresence enables the exit animation defined inside your Loader component 
        to play when 'loading' becomes false.
      */}
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {/* 
        Main Content 
        We render this immediately so it sits *behind* the loader.
        When the loader fades out opacity, this is revealed smoothly.
      */}
      <div>
        <Navigation />
        
        <main>
          <HeroSection />
          <TrustedBy />
          <InvestmentInsights />
          <SmarterInvesting />
          <CoreFeatures />
          <MetricsSection />
          <PricingSection />
          <CTASection />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
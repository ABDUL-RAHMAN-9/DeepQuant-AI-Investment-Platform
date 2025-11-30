import { useState } from 'react';
import Loader from '@/components/Loader';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TrustedBy from '@/components/TrustedBy';
import InvestmentInsights from '@/components/InvestmentInsights';
import SmarterInvesting from '@/components/SmarterInvesting';
import CoreFeatures from '@/components/CoreFeatures';
import MetricsSection from '@/components/MetricsSection';
import PricingSection from '@/components/PricingSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader onComplete={handleLoadComplete} />}
      
      <div className={loading ? 'hidden' : 'block'}>
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
    </>
  );
};

export default Index;

// src/pages/Index.tsx

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

// --- COMPONENTS ---
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustedBy from "@/components/TrustedBy";
import InvestmentInsights from "@/components/InvestmentInsights";
import SmarterInvesting from "@/components/SmarterInvesting";
import CoreFeatures from "@/components/CoreFeatures";
import MetricsSection from "@/components/MetricsSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
    const [loading, setLoading] = useState(true);

    // UX Improvement: Lock scroll while loader is active
    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = "unset";
        }
    }, [loading]);

    return (
        <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden">
            {/* 
        --- 1. HERO BACKGROUND LAYER ONLY --- 
        CHANGED: Used 'absolute' instead of 'fixed'.
        RESULT: This background stays at the TOP of the page. 
        It sits behind the Hero, but as you scroll down, it disappears.
        It will NOT interfere with the CTA section at the bottom.
      */}
            <div className="absolute top-0 left-0 w-full h-[120vh] z-0 pointer-events-none overflow-hidden">
                {/* Grid Pattern (Hero Only) */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Spline 3D Orb (Hero Only) */}
                {/* We keep it here (not inside HeroSection) so it loads immediately and doesn't reset */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <iframe
                        src="https://my.spline.design/orb-j2bnsGUiEKVrsn1TugjuetDS/"
                        frameBorder="0"
                        width="100%"
                        height="100%"
                        className="w-full h-full opacity-80"
                        title="3D Abstract Orb"
                    />
                </div>

                {/* Bottom Fade: Smoothly blends the Orb area into the solid background below */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* --- 2. LOADER OVERLAY (Fixed on Top) --- */}
            <AnimatePresence mode="wait">
                {loading && <Loader onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {/* --- 3. MAIN CONTENT --- */}
            <div className="relative z-10">
                <Navigation />

                <main>
                    {/* Hero Section (Transparent background so Orb shows through) */}
                    <HeroSection />

                    {/* 
             SOLID BACKGROUND WRAPPER
             All components below the Hero live inside this solid background.
             This guarantees the Spline Orb NEVER shows up behind them.
          */}
                    <div className="relative bg-background z-20 shadow-2xl ">
                        <TrustedBy />
                        <InvestmentInsights />
                        <SmarterInvesting />
                        <CoreFeatures />
                        <MetricsSection />
                        <PricingSection />

                        {/* The CTA Section is now completely isolated on a solid background */}
                        <CTASection />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default Index;

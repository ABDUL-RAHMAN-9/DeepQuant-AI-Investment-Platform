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
            {/* --- LAYER 1: BACKGROUND GRID (z-0) --- */}
            {/* This sits at the very back */}
            <div
                className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* --- LAYER 2: SPLINE ANIMATION (z-10) --- */}
            {/* 
         - Sits ABOVE the grid (z-10 vs z-0).
         - We use 'fixed' so it stays on screen while you scroll (creating a cool parallax effect).
         - It loads IMMEDIATELY (no waiting for loader). 
      */}
            <div className="fixed inset-0 z-10 flex items-center justify-center">
                <iframe
                    src="https://my.spline.design/orb-j2bnsGUiEKVrsn1TugjuetDS/"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    className="pointer-events-none opacity-80" // opacity-80 blends it slightly with dark mode
                    title="3D Abstract Orb"
                />
            </div>

            {/* --- LAYER 3: THE LOADER (z-50) --- */}
            <AnimatePresence mode="wait">
                {loading && <Loader onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {/* --- LAYER 4: MAIN CONTENT (z-20) --- */}
            {/* 
         - Sits ABOVE the Spline Animation (z-20 vs z-10).
         - This ensures buttons are clickable and text is readable.
      */}
            <div className="relative z-20">
                <Navigation />

                <main>
                    {/* HeroSection is now transparent so we can see the layers below */}
                    <HeroSection />

                    {/* 
             NOTE: As you scroll down, if other sections have a solid background color (bg-background),
             they will cover the orb. If you want the orb visible everywhere, remove bg colors from other sections.
          */}
                    <div className="bg-background/80 backdrop-blur-sm">
                        {" "}
                        {/* Optional: Adds a slight blur behind rest of content */}
                        <TrustedBy />
                        <InvestmentInsights />
                        <SmarterInvesting />
                        <CoreFeatures />
                        <MetricsSection />
                        <PricingSection />
                        <CTASection />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default Index;

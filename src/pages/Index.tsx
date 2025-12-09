// src/pages/Index.tsx

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

// --- COMPONENTS ---
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustedBy from "@/components/TrustedBy";
import InvestmentInsights from "@/components/InvestmentInsights"; // "Invest with Intelligence"
import SmarterInvesting from "@/components/SmarterInvesting"; // Feature lead-in
import CoreFeatures from "@/components/CoreFeatures"; // Feature Grid
import MetricsSection from "@/components/MetricsSection"; // "Performance You Can Measure"
import PricingSection from "@/components/PricingSection"; // "Pricing Options"
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
            {/* --- 1. HERO BACKGROUND LAYER ONLY --- */}
            <div className="absolute top-0 left-0 w-full h-[120vh] z-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
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
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* --- 2. LOADER OVERLAY --- */}
            <AnimatePresence mode="wait">
                {loading && <Loader onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {/* --- 3. MAIN CONTENT --- */}
            <div className="relative z-10">
                <Navigation />

                <main>
                    {/* ID="HOME" added here for scroll-to-top */}
                    <section id="home">
                        <HeroSection />
                    </section>

                    {/* SOLID BACKGROUND WRAPPER */}
                    <div className="relative bg-background z-20 shadow-2xl ">
                        <TrustedBy />

                        {/* ID="INTELLIGENCE" -> Maps to "Invest with Intelligence" */}
                        <section id="intelligence">
                            <InvestmentInsights />
                        </section>

                        {/* ID="FEATURES" -> Maps to Smarter Investing & Core Features */}
                        <section id="features">
                            <SmarterInvesting />
                            <CoreFeatures />
                        </section>

                        {/* ID="PERFORMANCE" -> Maps to "Performance You Can Measure" */}
                        <section id="performance">
                            <MetricsSection />
                        </section>

                        {/* ID="PRICING" -> Maps to Pricing Section */}
                        <section id="pricing">
                            <PricingSection />
                        </section>

                        <CTASection />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default Index;

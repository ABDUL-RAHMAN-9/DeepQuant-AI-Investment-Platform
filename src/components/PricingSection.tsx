import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const plans = [
    {
        id: 1,
        name: "Core Plan",
        prices: {
            monthly: 99,
            yearly: 79,
        },
        features: [
            "0.2% management fee",
            "AI rebalancing",
            "Market insights",
            "Mobile support",
        ],
    },
    {
        id: 2,
        name: "Vision Plan",
        prices: {
            monthly: 299,
            yearly: 249,
        },
        features: [
            "0.2%-0.1% management fee",
            "Advanced AI strategies",
            "1-on-1 support",
            "Investment team access",
            "Private support & onboarding",
        ],
    },
];

// --- HOOK: Intersection Observer ---
const useIsVisible = (ref: React.RefObject<HTMLElement>) => {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);
    return isIntersecting;
};

const PricingSection = () => {
    const [isYearly, setIsYearly] = useState(true);
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIsVisible(sectionRef);

    return (
        <section
            id="pricing"
            ref={sectionRef}
            className="py-24 relative overflow-hidden bg-background text-foreground">
            {/* --- BACKGROUND EFFECTS --- */}

            {/* 1. GRID LAYER WITH MASK (Fade Effect) */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            {/* Top Left Glow */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
            {/* Bottom Right Glow */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div
                    className={`text-center mb-16 transition-all duration-1000 transform ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x">
                            Pricing Options
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Choose the solution that fits your investing goals
                    </p>

                    {/* Custom Toggle Button (Pure Tailwind) */}
                    <div className="inline-flex items-center bg-muted/50 p-1 rounded-xl relative border border-white/5 backdrop-blur-sm">
                        {/* The Sliding Background Pill */}
                        <div
                            className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-primary rounded-lg shadow-lg shadow-primary/20 transition-transform duration-300 ease-in-out ${
                                isYearly ? "translate-x-full" : "translate-x-0"
                            }`}
                        />

                        {/* Buttons */}
                        <button
                            onClick={() => setIsYearly(false)}
                            className={`relative z-10 px-8 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 w-32 ${
                                !isYearly
                                    ? "text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}>
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsYearly(true)}
                            className={`relative z-10 px-8 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 w-32 ${
                                isYearly
                                    ? "text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}>
                            Yearly
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => {
                        const isPopular = isYearly ? index === 1 : index === 0;
                        const currentPrice = isYearly
                            ? plan.prices.yearly
                            : plan.prices.monthly;

                        return (
                            // OUTER WRAPPER: Staggered Entrance
                            <div
                                key={plan.id}
                                style={{ transitionDelay: `${index * 150}ms` }}
                                className={`transition-all duration-700 ease-out transform ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-12"
                                }`}>
                                {/* INNER CARD: Hover Effects */}
                                <div
                                    className={`relative p-8 h-full rounded-[24px] transition-all duration-300 ease-out transform hover:-translate-y-3 ${
                                        isPopular
                                            ? "border border-primary/50 bg-background/60 backdrop-blur-xl shadow-2xl shadow-primary/10"
                                            : "border border-white/10 bg-background/30 backdrop-blur-md hover:border-white/20"
                                    }`}>
                                    {/* Background Glow for Popular Card */}
                                    {isPopular && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent rounded-[24px] pointer-events-none" />
                                    )}

                                    {/* "Best Value" Badge */}
                                    <div
                                        className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full text-xs font-bold text-primary-foreground shadow-[0_0_20px_-5px_rgba(var(--primary-rgb),0.6)] z-20 transition-opacity duration-300 ${
                                            isPopular
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}>
                                        BEST VALUE
                                    </div>

                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold mb-2">
                                            {plan.name}
                                        </h3>

                                        <div className="mb-6 overflow-hidden flex items-end">
                                            <span className="text-5xl font-bold flex items-center tracking-tight">
                                                $
                                                {/* Simple CSS Fade Animation on Value Change */}
                                                <span
                                                    key={currentPrice}
                                                    className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                    {currentPrice}
                                                </span>
                                            </span>
                                            <span className="text-muted-foreground mb-1 ml-1 text-lg">
                                                /{isYearly ? "year" : "month"}
                                            </span>
                                        </div>

                                        <ul className="space-y-4 mb-8">
                                            {plan.features.map(
                                                (feature, fIndex) => (
                                                    <li
                                                        key={fIndex}
                                                        className="flex items-start gap-3 group">
                                                        <div
                                                            className={`mt-0.5 p-1 rounded-full transition-colors duration-300 ${
                                                                isPopular
                                                                    ? "bg-primary/20 text-primary"
                                                                    : "bg-muted text-muted-foreground group-hover:text-primary"
                                                            }`}>
                                                            <Check className="w-3.5 h-3.5" />
                                                        </div>
                                                        <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                                            {feature}
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                        </ul>

                                        <Button
                                            className={`w-full py-6 text-lg rounded-xl transition-all duration-300 ${
                                                isPopular
                                                    ? "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30"
                                                    : "bg-secondary hover:bg-secondary/80 text-foreground"
                                            }`}>
                                            {isPopular
                                                ? "Get Started Now"
                                                : "Choose Core"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;

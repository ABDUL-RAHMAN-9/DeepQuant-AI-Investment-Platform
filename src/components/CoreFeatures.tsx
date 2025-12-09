import { useState, useEffect, useRef } from "react";
import {
    TrendingUp,
    PieChart,
    Shield,
    Clock,
    BarChart3,
    Zap,
    ArrowUpRight,
} from "lucide-react";

// --- DATA ---
const features = [
    {
        icon: TrendingUp,
        title: "AI-Powered Strategies",
        description:
            "Leverage cutting-edge algorithms to identify profitable market opportunities before they trend.",
        accent: "from-emerald-500/20 to-emerald-500/5",
        iconColor: "text-emerald-500",
    },
    {
        icon: PieChart,
        title: "Portfolio Optimization",
        description:
            "Automatically diversify investments across non-correlated assets to maximize returns and minimize risk.",
        accent: "from-blue-500/20 to-blue-500/5",
        iconColor: "text-blue-500",
    },
    {
        icon: Shield,
        title: "Proactive Risk Management",
        description:
            "Continuously monitor market volatility indices to automatically hedge your positions 24/7.",
        accent: "from-purple-500/20 to-purple-500/5",
        iconColor: "text-purple-500",
    },
    {
        icon: Clock,
        title: "Real-Time Insights",
        description:
            "Access up-to-the-minute data feeds and predictive analytics to stay ahead of the macro cycle.",
        accent: "from-amber-500/20 to-amber-500/5",
        iconColor: "text-amber-500",
    },
    {
        icon: BarChart3,
        title: "Automated Rebalancing",
        description:
            "Our AI detects drift in your asset allocation and adjusts your portfolio proactively without manual input.",
        accent: "from-cyan-500/20 to-cyan-500/5",
        iconColor: "text-cyan-500",
    },
    {
        icon: Zap,
        title: "Performance Tracking",
        description:
            "Visualize your wealth accumulation with detailed, interactive reports and transparent benchmarking.",
        accent: "from-rose-500/20 to-rose-500/5",
        iconColor: "text-rose-500",
    },
];

// --- HOOK: Intersection Observer ---
// Detects when the section is in view to trigger the entrance animation
const useIsVisible = (ref: React.RefObject<HTMLElement>) => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    observer.disconnect(); // Only animate once
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => observer.disconnect();
    }, [ref]);

    return isIntersecting;
};

const CoreFeatures = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIsVisible(sectionRef);

    return (
        <section
            id="features"
            ref={sectionRef}
            className="py-24 relative overflow-hidden bg-background text-foreground">
            {/* --- BACKGROUND EFFECTS --- */}
             <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            {/* Top Right Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            {/* Bottom Left Glow */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div
                    className={`text-center mb-16 md:mb-24 transition-all duration-1000 transform ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Smarter Investing.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x">
                            Stronger Outcomes
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Experience the future of wealth management with tools
                        designed for the modern era.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            // 1. OUTER WRAPPER: Handles the Slow Staggered Entrance
                            <div
                                key={index}
                                style={{ transitionDelay: `${index * 100}ms` }}
                                className={`transition-all duration-700 ease-out transform ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-12"
                                }`}>
                                {/* 2. INNER CARD: Handles the Fast Hover Interaction (300ms) */}
                                <div className="group relative h-full">
                                    {/* Card Container */}
                                    {/* 
                      - duration-300: Makes it snappy
                      - hover:-translate-y-3: Lifts it up visibly 
                  */}
                                    <div
                                        className="relative h-full p-8 rounded-[24px] bg-background/60 border border-border/50 backdrop-blur-md overflow-hidden 
                                transition-all duration-300 ease-out 
                                hover:shadow-2xl hover:border-primary/20 hover:-translate-y-3">
                                        {/* Dynamic Hover Gradient Background */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                        />

                                        <div className="relative z-10 flex flex-col h-full">
                                            {/* Header: Icon & Action */}
                                            <div className="flex justify-between items-start mb-6">
                                                {/* Boxed Icon */}
                                                <div className="p-3 rounded-xl bg-background/80 shadow-sm border border-border/50 transition-transform duration-300 group-hover:scale-110">
                                                    <Icon
                                                        className={`w-8 h-8 ${feature.iconColor}`}
                                                    />
                                                </div>

                                                {/* Hover Action Arrow */}
                                                <div className="text-muted-foreground opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                                    <ArrowUpRight className="w-5 h-5" />
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                                                {feature.title}
                                            </h3>

                                            <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow group-hover:text-foreground/80 transition-colors duration-300">
                                                {feature.description}
                                            </p>

                                            {/* Footer: Learn More Link */}
                                            <div className="mt-auto pt-4 border-t border-border/30 flex items-center text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                                Learn more
                                            </div>
                                        </div>
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

export default CoreFeatures;

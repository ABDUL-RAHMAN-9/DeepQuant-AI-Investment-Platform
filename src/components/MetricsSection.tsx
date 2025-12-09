import { useEffect, useState, useRef } from "react";
import { Users, TrendingUp, Briefcase } from "lucide-react";

const metrics = [
    {
        id: 1,
        value: 98.7,
        suffix: "%",
        label: "Client Satisfaction Rate",
        prefix: "",
        decimals: 1,
        icon: Users,
        color: "text-emerald-400",
    },
    {
        id: 2,
        value: 250,
        suffix: "M+",
        label: "Assets Under Management",
        prefix: "$",
        decimals: 0,
        icon: TrendingUp,
        color: "text-blue-400",
    },
    {
        id: 3,
        value: 120,
        suffix: "+",
        label: "Investment Strategies",
        prefix: "",
        decimals: 0,
        icon: Briefcase,
        color: "text-purple-400",
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

// --- SUB-COMPONENT: Animated Counter ---
const Counter = ({
    value,
    prefix = "",
    suffix = "",
    decimals = 0,
    className,
}: any) => {
    const ref = useRef(null);
    const isVisible = useIsVisible(ref);
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        const duration = 2000; // 2 seconds to count up

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease Out Quart formula for smooth landing
            const easeOut = 1 - Math.pow(1 - progress, 4);

            setDisplayValue(easeOut * value);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Ensure exact final value matches
                setDisplayValue(value);
            }
        };

        window.requestAnimationFrame(step);
    }, [isVisible, value]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            {displayValue.toFixed(decimals)}
            {suffix}
        </span>
    );
};

const MetricsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIsVisible(sectionRef);

    return (
        <section
            ref={sectionRef}
            className="py-24 relative overflow-hidden bg-background text-foreground">
            {/* --- BACKGROUND EFFECTS --- */}

            {/* 
         1. GRID LAYER WITH MASK (The "Blur/Fade" Effect)
         - [mask-image:linear-gradient(...)] creates the fade.
         - Transparent at top (0%), Black (Visible) at 20%, Black at 80%, Transparent at bottom (100%).
      */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* 2. Glowing Orbs (Center Glow) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div
                    className={`text-center mb-16 md:mb-24 transition-all duration-1000 transform ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Performance You Can <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x">
                            Measure
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Our results speak for themselves. We combine data-driven
                        insights with human expertise to deliver consistent
                        value.
                    </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {metrics.map((metric, index) => (
                        // OUTER WRAPPER: Handles Staggered Entrance (Slow)
                        <div
                            key={metric.id}
                            style={{ transitionDelay: `${index * 150}ms` }}
                            className={`transition-all duration-700 ease-out transform ${
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-12"
                            }`}>
                            {/* INNER WRAPPER: Handles Fast Hover Interaction (Fast) */}
                            <div className="relative group h-full">
                                {/* Card Container */}
                                {/* Added 'hover:-translate-y-3' for the snappy lift effect */}
                                <div
                                    className="h-full p-8 rounded-2xl bg-background/40 border border-white/10 backdrop-blur-md shadow-xl overflow-hidden 
                                transition-all duration-300 ease-out 
                                hover:shadow-primary/10 hover:border-primary/20 hover:-translate-y-3">
                                    {/* Background Gradient on Hover */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                    />

                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        {/* Icon Container */}
                                        <div
                                            className={`mb-6 p-4 rounded-full bg-secondary/30 ${metric.color} bg-opacity-10 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110`}>
                                            <metric.icon className="w-8 h-8" />
                                        </div>

                                        {/* Animated Counter Number */}
                                        <div className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-foreground">
                                            <Counter
                                                value={metric.value}
                                                prefix={metric.prefix}
                                                suffix={metric.suffix}
                                                decimals={metric.decimals}
                                                className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
                                            />
                                        </div>

                                        {/* Label */}
                                        <h3 className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                            {metric.label}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Divider (Fade In) */}
                <div
                    style={{ transitionDelay: "600ms" }}
                    className={`mt-16 pt-8 text-center transition-all duration-1000 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                        Trusted by modern investors worldwide
                    </p>
                </div>
            </div>
        </section>
    );
};

export default MetricsSection;

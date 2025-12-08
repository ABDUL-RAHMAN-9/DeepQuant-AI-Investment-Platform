import { useEffect, useState, useRef, useMemo } from "react";
import {
    Activity,
    Zap,
    Shield,
    BarChart3,
    ArrowUpRight,
    TrendingUp,
} from "lucide-react";

// --- DATA ---
const metrics = [
    {
        id: 1,
        label: "Total Asset Growth",
        value: 48.23,
        suffix: "%",
        color: "text-emerald-400",
    },
    {
        id: 2,
        label: "Execution Speed",
        value: 14.2,
        suffix: "ms",
        color: "text-blue-400",
    },
    {
        id: 3,
        label: "AI Confidence",
        value: 98.5,
        suffix: "%",
        color: "text-purple-400",
    },
    {
        id: 4,
        label: "Volatility Index",
        value: 12.4,
        suffix: "",
        color: "text-amber-400",
    },
];

const insights = [
    {
        id: "growth",
        title: "Precision Growth",
        desc: "Predictive AI models analyzing 50k+ data points to identify breakout opportunities before the market reacts.",
        icon: TrendingUp,
        accent: "from-emerald-500/20 to-emerald-500/5",
        iconColor: "text-emerald-400",
        chartData: [20, 35, 30, 45, 40, 60, 55, 75, 70, 90],
    },
    {
        id: "alloc",
        title: "Dynamic Allocation",
        desc: "Real-time rebalancing across non-correlated assets to maximize yield while insulating capital from shocks.",
        icon: BarChart3,
        accent: "from-blue-500/20 to-blue-500/5",
        iconColor: "text-blue-400",
        chartData: [40, 45, 42, 55, 65, 60, 75, 80, 85, 95],
    },
    {
        id: "speed",
        title: "Hyperspeed Execution",
        desc: "Zero-latency trade execution ensures you never miss a micro-trend due to human delay or platform lag.",
        icon: Zap,
        accent: "from-amber-500/20 to-amber-500/5",
        iconColor: "text-amber-400",
        chartData: [30, 25, 40, 35, 50, 45, 60, 55, 80, 85],
    },
    {
        id: "risk",
        title: "Risk Radar",
        desc: "24/7 automated surveillance that instantly adjusts hedging strategies when market volatility spikes.",
        icon: Shield,
        accent: "from-red-500/20 to-red-500/5",
        iconColor: "text-red-400",
        chartData: [80, 70, 60, 65, 50, 45, 30, 35, 20, 15],
    },
];

// --- HELPER: Intersection Observer ---
const useIsVisible = (ref) => {
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

// --- COMPONENT: Sparkline ---
const Sparkline = ({ data, color, isVisible }) => {
    const points = useMemo(() => {
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min;
        return data
            .map((val, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = 40 - ((val - min) / range) * 40;
                return `${x},${y}`;
            })
            .join(" ");
    }, [data]);

    return (
        <div className="h-12 w-full mt-6 opacity-80 overflow-hidden">
            <svg
                viewBox="0 0 100 40"
                className="w-full h-full overflow-visible">
                <path
                    d={`M ${points}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`${color} transition-all duration-[2000ms] ease-out ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                        strokeDasharray: 200,
                        strokeDashoffset: isVisible ? 0 : 200,
                    }}
                />
                <path
                    d={`M ${points}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className={`${color} blur-sm transition-opacity duration-[2000ms] delay-200 ${
                        isVisible ? "opacity-40" : "opacity-0"
                    }`}
                />
            </svg>
        </div>
    );
};

// --- COMPONENT: Counter ---
const Counter = ({ value, suffix, color }) => {
    const ref = useRef(null);
    const isVisible = useIsVisible(ref);
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!isVisible) return;
        let startTime;
        const duration = 2000;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setDisplayValue(easeOut * value);
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }, [isVisible, value]);

    return (
        <span
            ref={ref}
            className={`text-4xl md:text-5xl font-bold tracking-tight ${color}`}>
            {displayValue.toFixed(1)}
            {suffix}
        </span>
    );
};

// --- COMPONENT: InvestmentSection ---
const InvestmentSection = () => {
    const sectionRef = useRef(null);
    const isSectionVisible = useIsVisible(sectionRef);

    return (
        <section
            ref={sectionRef}
            className="py-24 relative overflow-hidden bg-background text-foreground">
            {/* Background */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div
                    className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 transform ${
                        isSectionVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Invest with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x">
                            Intelligence
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Our platform synthesizes thousands of market signals per
                        second to deliver an edge unseen in traditional
                        investing.
                    </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
                    {metrics.map((metric, index) => (
                        // WRAPPER: Handles entrance delay
                        <div
                            key={metric.id}
                            className={`transition-all duration-700 ease-out transform ${
                                isSectionVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            }`}
                            style={{ transitionDelay: `${index * 100}ms` }}>
                            {/* INNER: Handles fast hover */}
                            <div className="p-6 h-full rounded-2xl bg-muted/30 border border-border/50 backdrop-blur-sm transition-all duration-300 ease-out hover:bg-muted/50 hover:border-primary/20 hover:-translate-y-1 hover:shadow-lg">
                                <Counter
                                    value={metric.value}
                                    suffix={metric.suffix}
                                    color={metric.color}
                                />
                                <p className="text-sm text-muted-foreground mt-2 font-medium uppercase tracking-wider">
                                    {metric.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dashboard Cards (The Main Fix) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {insights.map((item, index) => (
                        <CardItem
                            key={item.id}
                            item={item}
                            index={index}
                            parentVisible={isSectionVisible}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- FIX APPLIED HERE ---
const CardItem = ({ item, index, parentVisible }) => {
    const cardRef = useRef(null);
    const isVisible = useIsVisible(cardRef);

    return (
        // 1. OUTER WRAPPER: Handles the Entrance Animation + Delay
        // We apply the 'transitionDelay' HERE.
        // This only controls opacity/translate-y entrance.
        <div
            ref={cardRef}
            style={{ transitionDelay: `${index * 150}ms` }}
            className={`transition-all duration-700 ease-out transform 
              ${
                  parentVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
              }`}>
            {/* 
              2. INNER CARD: Handles the Hover Interaction 
              NO transitionDelay here. It will react instantly (300ms duration).
            */}
            <div
                className="group relative h-full overflow-hidden rounded-[24px] p-8 border border-border/50 bg-background/60 backdrop-blur-md shadow-lg 
              transition-all duration-300 ease-out transform
              hover:-translate-y-3 hover:shadow-2xl hover:border-primary/30">
                {/* Gradient Reveal */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        {/* Icon Box */}
                        <div className="p-3 rounded-xl bg-background/80 shadow-sm border border-border/50 transition-transform duration-300 group-hover:scale-110 group-hover:border-primary/20">
                            <item.icon
                                className={`w-8 h-8 ${item.iconColor}`}
                            />
                        </div>
                        {/* Live Badge */}
                        <div className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                            Live Analysis{" "}
                            <Activity className="w-3 h-3 animate-pulse" />
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4 group-hover:text-foreground/80 transition-colors duration-300">
                        {item.desc}
                    </p>

                    {/* Sparkline */}
                    <Sparkline
                        data={item.chartData}
                        color={item.iconColor}
                        isVisible={isVisible}
                    />

                    <div className="mt-6 flex items-center text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        View full report
                        <ArrowUpRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentSection;

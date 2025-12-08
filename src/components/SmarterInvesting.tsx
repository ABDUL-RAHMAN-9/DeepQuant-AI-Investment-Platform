import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Layers, PieChart, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- DATA ---
const features = [
    {
        id: "portfolio",
        title: "Precision-Engineered Portfolios",
        tagline: "Built for resilience.",
        description:
            "Our algorithms construct portfolios designed to weather market volatility while capturing growth, using institutional-grade asset allocation strategies.",
        // Abstract, tech-focused finance image
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop",
        icon: PieChart,
    },
    {
        id: "security",
        title: "Bank-Grade Security Standards",
        tagline: "Your wealth, protected.",
        description:
            "We utilize 256-bit encryption and biometric verification to ensure your assets and personal data remain impenetrable to external threats.",
        // Cyber security abstract image
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop",
        icon: ShieldCheck,
    },
    {
        id: "transparency",
        title: "Total Fee Transparency",
        tagline: "No hidden costs. Ever.",
        description:
            "See exactly where every dollar goes. We believe in radical transparency, ensuring our incentives are perfectly aligned with your financial success.",
        // Clean, transparent glass/tech image
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        icon: Layers,
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
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);
    return isIntersecting;
};

// --- SUB-COMPONENT: Feature Card ---
const FeatureCard = ({ feature, index, onDetailsClick }: any) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIsVisible(ref);
    const isEven = index % 2 === 0;

    return (
        <div
            ref={ref}
            className={`relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center transition-all duration-1000 transform 
        ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
        }`}>
            {/* TEXT SECTION */}
            <div
                className={`relative z-10 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                }`}>
                {/* Visual Connecting Line (Desktop Only) */}
                <div
                    className={`absolute top-1/2 ${
                        isEven
                            ? "-right-12 lg:-right-24"
                            : "-left-12 lg:-left-24"
                    } w-0 lg:w-24 h-[1px] bg-gradient-to-r from-primary/50 to-transparent hidden lg:block`}
                />

                <div className="space-y-6">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase border border-primary/20">
                        <feature.icon className="w-4 h-4" />
                        Feature 0{index + 1}
                    </div>

                    <h3 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
                        {feature.title}
                    </h3>

                    <p className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">
                        {feature.tagline}
                    </p>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {feature.description}
                    </p>

                    <div className="pt-4">
                        <Button
                            onClick={() => onDetailsClick(feature.id)}
                            className="group h-12 px-6 rounded-full bg-background border border-primary/20 hover:border-primary/50 text-foreground overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                            variant="outline">
                            <span className="flex items-center gap-2 font-medium group-hover:text-primary transition-colors">
                                Explore Details
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* IMAGE SECTION */}
            <div
                className={`relative group ${
                    isEven ? "lg:order-2" : "lg:order-1"
                }`}>
                {/* Background Glow (Behind Image) */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Glass Card Container */}
                <div className="relative rounded-[2rem] p-2 bg-white/5 border border-white/10 shadow-2xl overflow-hidden transition-transform duration-500 hover:-translate-y-2">
                    <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/3]">
                        {/* The Image */}
                        <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Overlay Gradient (for text readability if needed) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                        {/* Floating "AI Active" Badge inside image */}
                        <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-bold text-white tracking-wider uppercase">
                                    AI Analysis Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
const SmarterInvesting = () => {
    const navigate = useNavigate();
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIsVisible(sectionRef);

    const handleDetailsClick = (featureId: string) => {
        navigate(`/feature/${featureId}`);
    };

    return (
        <section
            ref={sectionRef}
            id="smarter-investing"
            className="py-32 relative overflow-hidden bg-background text-foreground">
            {/* --- BACKGROUND EFFECTS --- */}

            {/* 1. Grid Pattern with Fade Mask (Matches other sections) */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* 2. Soft Gradient Orbs */}
            <div className="absolute top-20 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
            <div className="absolute bottom-40 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div
                    className={`text-center mb-32 max-w-3xl mx-auto transition-all duration-1000 transform ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-12"
                    }`}>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                        Smarter Investing <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x">
                            Starts Here
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        A next-generation platform engineered for the modern
                        investor: combining institutional-grade technology with
                        transparent, goal-oriented financial strategies.
                    </p>
                </div>

                {/* Features List */}
                <div className="space-y-32">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={feature.id}
                            feature={feature}
                            index={index}
                            onDetailsClick={handleDetailsClick}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SmarterInvesting;

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle2,
    AlertCircle,
    Layers,
    ShieldCheck,
    PieChart,
    Info,
} from "lucide-react";

// --- MOCK DATA ---
const features = [
    {
        id: "portfolio",
        title: "Precision Portfolios",
        tagline: "Built for resilience & growth.",
        description:
            "Our algorithms construct portfolios designed to weather market volatility while capturing growth. We parse millions of data points to ensure your asset mix is perfectly aligned with your risk tolerance, adjusting automatically as market conditions shift.",
        // IMAGE CHANGE: Dark 3D Abstract Flow (Black/Metallic)
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop",
        icon: PieChart,
        detailContent: {
            heading: "Technical Specs",
            points: [
                "Dynamic Rebalancing (Volatility-based)",
                "Automated Tax-loss harvesting",
                "Multi-asset diversification",
                "Institutional risk modeling",
            ],
        },
    },
    {
        id: "security",
        title: "Bank-Grade Security",
        tagline: "Impenetrable asset protection.",
        description:
            "We utilize 256-bit AES encryption and biometric verification to ensure your assets and personal data remain impenetrable. We employ real-time intrusion detection systems that monitor for anomalies 24/7.",
        // IMAGE CHANGE: Dark Cyber-Security/Lock (Deep Blue/Black)
        image: "https://images.unsplash.com/photo-1430276084627-789fe55a6da0?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        icon: ShieldCheck,
        detailContent: {
            heading: "Security Protocols",
            points: [
                "AES-256 Encryption Standards",
                "Biometric Multi-Factor Auth",
                "Real-time intrusion detection",
                "Cold storage for digital assets",
            ],
        },
    },
    {
        id: "transparency",
        title: "Total Transparency",
        tagline: "No hidden costs. Ever.",
        description:
            "See exactly where every dollar goes. We believe in radical transparency. Our incentives are perfectly aligned with your financial success, with clear, real-time reporting on all expense ratios and management fees.",
        // IMAGE CHANGE: Dark Architectural Lines/Glass (Minimalist Black)
        image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2574&auto=format&fit=crop",
        icon: Layers,
        detailContent: {
            heading: "The Promise",
            points: [
                "Zero hidden management fees",
                "Real-time expense tracking",
                "Fiduciary standard of care",
                "Audit-ready performance logs",
            ],
        },
    },
];

const FeatureDetailPage = () => {
    const { featureId } = useParams();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Immediate load animation
        setTimeout(() => setIsLoaded(true), 100);
    }, [featureId]);

    const feature = features.find((f) => f.id === featureId);

    // --- ERROR STATE ---
    if (!feature) {
        return (
            <div className="h-screen flex items-center justify-center bg-background text-foreground relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="text-center z-10">
                    <h1 className="text-2xl font-bold mb-4">
                        Feature Not Found
                    </h1>
                    <Button onClick={() => navigate("/")} variant="outline">
                        Return Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        // h-screen ensures NO PAGE SCROLL on desktop.
        <section className="h-screen w-full bg-background text-foreground relative overflow-hidden flex flex-col items-center justify-center">
            {/* --- BACKGROUND EFFECTS --- */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow opacity-50" />
            <div className="absolute bottom-0 left-0 w-[50vh] h-[50vh] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none opacity-30" />

            {/* 
            --- MAIN GLASS CONSOLE --- 
            w-[95%] max-w-[1800px] -> Full Screen Width (Command Center Style)
        */}
            <div
                className={`
                relative w-[95%] max-w-[1800px] h-[90vh]
                bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 
                rounded-[2rem] shadow-2xl overflow-hidden 
                flex flex-col md:flex-row 
                transition-all duration-700 transform 
                ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            `}>
                {/* --- LEFT COLUMN: VISUALS (40% width) --- */}
                <div className="relative w-full md:w-[40%] h-64 md:h-full group overflow-hidden border-b md:border-b-0 md:border-r border-white/10 bg-black/40">
                    {/* 
                    UPDATED IMAGE STYLING:
                    Added 'grayscale-[0.3]' to slightly desaturate the images 
                    so they blend perfectly with the black theme.
                */}
                    <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale-[0.3] group-hover:grayscale-0"
                    />

                    {/* Overlay Gradient: Stronger black fade for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Top Left Back Button */}
                    <div className="absolute top-6 left-6 z-20">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => navigate(-1)}
                            className="rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back
                        </Button>
                    </div>

                    {/* Bottom Title Overlay */}
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-primary/20 text-primary border border-primary/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                            <feature.icon className="w-3 h-3" />
                            {feature.id} Protocol
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                            {feature.title}
                        </h1>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: DATA (60% width) --- */}
                <div className="relative w-full md:w-[60%] h-full flex flex-col p-8 md:p-16 overflow-y-auto custom-scrollbar">
                    <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto">
                        {/* Tagline */}
                        <div className="mb-10 border-l-4 border-primary/50 pl-6 md:pl-8">
                            <p className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 font-medium italic">
                                "{feature.tagline}"
                            </p>
                        </div>

                        {/* Description */}
                        <div className="mb-12">
                            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Info className="w-4 h-4" /> System Overview
                            </h3>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                                {feature.description}
                            </p>
                        </div>

                        {/* Technical Specs Grid */}
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
                            <h3 className="text-white text-lg font-semibold mb-6 border-b border-white/10 pb-4">
                                {feature.detailContent.heading}
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                {feature.detailContent.points.map(
                                    (point, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                transitionDelay: `${
                                                    200 + index * 50
                                                }ms`,
                                            }}
                                            className={`flex items-start gap-3 transition-all duration-500 transform ${
                                                isLoaded
                                                    ? "opacity-100 translate-x-0"
                                                    : "opacity-0 translate-x-4"
                                            }`}>
                                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-400 text-sm md:text-base font-medium">
                                                {point}
                                            </span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Footer Status Line */}
                    <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground uppercase tracking-wider">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            System Status: Online
                        </span>
                        <span>Secure Connection: TLS 1.3</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureDetailPage;

import {
    Hexagon,
    Triangle,
    Circle,
    Box,
    Diamond,
    Command,
    Gem,
    Layers,
} from "lucide-react";

// --- MOCK DATA ---
const companies = [
    { name: "Wealthro", icon: Hexagon, weight: "font-bold" },
    { name: "Finyon", icon: Triangle, weight: "font-semibold" },
    { name: "Aegra", icon: Circle, weight: "font-black" },
    { name: "Postvio", icon: Box, weight: "font-medium" },
    { name: "Vaultic", icon: Diamond, weight: "font-bold" },
    { name: "NexusCorp", icon: Command, weight: "font-extrabold" },
    { name: "SynergyLabs", icon: Layers, weight: "font-semibold" },
    { name: "Innovatech", icon: Gem, weight: "font-bold" },
];

// Double the array to ensure seamless looping without gaps
const scrollingLogos = [...companies, ...companies];

const TrustedBy = () => {
    return (
        <section className="py-10 border-y border-white/5 bg-background/50 backdrop-blur-sm relative overflow-hidden">
            {/* 
        INJECTING CSS ANIMATION STYLE 
        This makes the marquee work without editing tailwind.config.js 
      */}
            <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: scroll 30s linear infinite;
        }
        /* Pause animation on hover */
        .group:hover .animate-infinite-scroll {
          animation-play-state: paused;
        }
      `}</style>

            {/* Header */}
            <div className="container mx-auto px-6 mb-10 text-center relative z-200">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest opacity-80 text-shadow-lg/30">
                    Trusted by the world's leading teams
                </p>
            </div>

            {/* Marquee Wrapper - The 'group' class here enables the hover-pause effect */}
            <div className="relative w-full overflow-hidden group">
                {/* Left Fade Mask */}
                <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

                {/* The Scrolling Track */}
                <div className="flex items-center gap-16 md:gap-24 animate-infinite-scroll w-max px-4">
                    {scrollingLogos.map((company, index) => (
                        <div
                            key={`${company.name}-${index}`}
                            className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-all duration-300 cursor-default group/item">
                            {/* Logo Icon */}
                            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover/item:bg-primary/10 group-hover/item:border-primary/20 transition-colors duration-300">
                                <company.icon className="w-6 h-6 text-foreground group-hover/item:text-primary transition-colors duration-300" />
                            </div>

                            {/* Logo Text */}
                            <span
                                className={`text-xl text-foreground ${company.weight} tracking-tight text-shadow-lg/30`}>
                                {company.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Right Fade Mask */}
                <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    );
};

export default TrustedBy;

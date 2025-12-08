import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

const CTASection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIsVisible(sectionRef);

    return (
        <section ref={sectionRef} className="py-24 relative z-20">
            <div className="container mx-auto px-6">
                {/* 
            THE "PORTAL" CARD 
            - 'bg-gray-950': Creates the solid dark background (blocking the global orb).
            - 'overflow-hidden': Contains the grid and blur effects inside the rounded corners.
        */}
                <div
                    className={`relative overflow-hidden rounded-[3rem] border border-white/10 bg-gray-950 text-center shadow-2xl transition-all duration-1000 transform 
          ${
              isVisible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-12 scale-95"
          }`}>
                    {/* --- BACKGROUND LAYER --- */}

                    {/* 1. Aurora Glows (Behind the grid) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-50 pointer-events-none animate-pulse-slow" />
                    <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 blur-[130px] rounded-full opacity-40 pointer-events-none" />

                    {/* 
             2. THE GRID LAYOUT + BLUR MASK
             - opacity-[0.1]: Keeps the white grid subtle against the dark background.
             - mask-image: Fades the grid out at 0% (top) and 100% (bottom), keeping it visible in the center.
          */}
                    <div
                        className="absolute inset-0 opacity-[0.1] pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
                        style={{
                            backgroundImage:
                                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />

                    {/* --- CONTENT LAYER --- */}
                    <div className="relative z-10 px-6 py-20 md:py-32 flex flex-col items-center">
                        {/* Animated Badge */}
                        <div
                            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 transition-all duration-700 delay-100 ${
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4"
                            }`}>
                            <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300/20" />
                            <span className="text-sm font-medium text-white/90 tracking-wide">
                                Limited Access: Early Bird 2.0
                            </span>
                        </div>

                        {/* Headline */}
                        <h2
                            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight transition-all duration-700 delay-200 ${
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4"
                            }`}>
                            Start Investing <br className="hidden md:block" />
                            <span className="relative inline-block">
                                {/* Text Gradient */}
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-200 to-white">
                                    Smarter Today
                                </span>
                                {/* Glow behind text */}
                                <span className="absolute inset-0 bg-primary/20 blur-xl z-0" />
                            </span>
                        </h2>

                        {/* Subheadline */}
                        <p
                            className={`text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed transition-all duration-700 delay-300 ${
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4"
                            }`}>
                            Harness the power of AI to grow your portfolio with
                            confidence. Join 50,000+ investors who have already
                            switched to the future.
                        </p>

                        {/* Action Buttons */}
                        <div
                            className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto transition-all duration-700 delay-500 ${
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4"
                            }`}>
                            {/* Primary Button */}
                            <Button
                                size="lg"
                                className="group relative h-14 px-10 text-lg bg-white text-black hover:bg-white/90 hover:scale-105 active:scale-95 overflow-hidden rounded-full transition-all duration-300 shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)]">
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                <span className="relative flex items-center gap-2 font-bold">
                                    Get Started Now
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </Button>

                            {/* Secondary Button */}
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-10 text-lg border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95 rounded-full transition-all duration-300 backdrop-blur-sm">
                                Book a Demo
                            </Button>
                        </div>

                        {/* Footer Text */}
                        <p
                            className={`mt-8 text-sm text-gray-500 transition-all duration-700 delay-700 ${
                                isVisible ? "opacity-100" : "opacity-0"
                            }`}>
                            No credit card required for 14-day trial
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;

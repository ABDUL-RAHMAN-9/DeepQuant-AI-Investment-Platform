import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, PlayCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import demoVideo from "@/assets/videos/demo_video.mp4";

// --- IMAGE IMPORTS ---
import img1 from "@/assets/img-1.avif";
import img2 from "@/assets/img-2.avif";
import img3 from "@/assets/img-3.avif";
import img4 from "@/assets/img-4.avif";

const trustedAvatars = [img1, img2, img3, img4];

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

const HeroSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIsVisible(sectionRef);

    // Video Modal state
    const [showVideoModal, setShowVideoModal] = useState(false);

    // Scroll helpers
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-transparent">
            {/* --- BACKGROUND LAYER --- */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background z-0" />

            {/* --- CONTENT LAYER --- */}
            <div className="container mx-auto px-6 relative z-10 text-center">
                {/* 1. Animated Pill Badge */}
                <div
                    className={`flex justify-center mb-8 transition-all duration-1000 ease-out transform ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-12"
                    }`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(var(--primary-rgb),0.3)] hover:bg-primary/20 transition-colors duration-300">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-sm font-medium text-primary tracking-wide">
                            Investment Potential Unlocked
                        </span>
                        <ChevronRight className="w-4 h-4 text-primary/70" />
                    </div>
                </div>

                {/* 2. Main Headline */}
                <h1
                    style={{ transitionDelay: "100ms" }}
                    className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight transition-all duration-1000 ease-out transform ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-12"
                    }`}>
                    Empowering Your
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x">
                        Investments with AI
                    </span>
                    <br />
                    Technology
                </h1>

                {/* 3. Subheadline */}
                <p
                    style={{ transitionDelay: "200ms" }}
                    className={`text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md transition-all duration-1000 ease-out transform ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-12"
                    }`}>
                    Our innovative AI technology transforms asset management by
                    analyzing vast data sets in real-time, giving you the edge
                    in a volatile market.
                </p>

                {/* 4. Buttons */}
                <div
                    style={{ transitionDelay: "300ms" }}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 ease-out transform ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-12"
                    }`}>
                    {/* Watch Demo → Open Modal */}
                    <Button
                        size="lg"
                        variant="outline"
                        className="h-14 px-8 text-lg border-2 border-primary/20 hover:border-primary/50 bg-background/50 backdrop-blur-sm rounded-full transition-all duration-300 group"
                        onClick={() => setShowVideoModal(true)}>
                        <span className="flex items-center gap-2 text-foreground/90">
                            <PlayCircle className="w-5 h-5 group-hover:text-primary transition-colors" />
                            Watch Demo
                        </span>
                    </Button>

                    <Button
                        size="lg"
                        className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg shadow-primary/20 text-shadow-lg transition-all duration-300 hover:scale-105"
                        onClick={() => scrollToSection("features")}>
                        Learn More
                    </Button>
                </div>

                {/* 5. Social Proof / Avatars */}
                <div
                    style={{ transitionDelay: "400ms" }}
                    className={`flex flex-col md:flex-row items-center justify-center gap-4 p-4 rounded-2xl bg-background/40 border border-white/5 backdrop-blur-sm w-fit mx-auto transition-all duration-1000 ease-out transform ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-12"
                    }`}>
                    <div className="flex -space-x-4">
                        {trustedAvatars.map((imgSrc, index) => (
                            <div
                                key={index}
                                className="relative transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:z-10">
                                <img
                                    src={imgSrc || "/api/placeholder/40/40"}
                                    alt={`User ${index + 1}`}
                                    className="w-12 h-12 rounded-full border-[3px] border-background object-cover shadow-lg"
                                />
                            </div>
                        ))}
                        <div className="w-12 h-12 rounded-full border-[3px] border-background bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-xs font-bold text-white shadow-lg z-0 relative hover:-translate-y-2 hover:scale-110 transition-all duration-300">
                            +1.2k
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-1 justify-center md:justify-start text-yellow-500 mb-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <svg
                                    key={i}
                                    className="w-4 h-4 fill-current"
                                    viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">
                            Trusted by 1,200+ modern investors
                        </p>
                    </div>
                </div>
            </div>

            {/* --- VIDEO MODAL --- */}
            {showVideoModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-background rounded-xl p-4 max-w-3xl w-full relative">
                        <button
                            className="absolute top-3 right-3 text-white text-lg font-bold"
                            onClick={() => setShowVideoModal(false)}>
                            ✕
                        </button>

                        <video
                            className="w-full h-64 md:h-96 rounded-xl"
                            src={demoVideo}
                            controls
                            autoPlay
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default HeroSection;

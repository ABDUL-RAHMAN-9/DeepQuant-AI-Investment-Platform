import { Linkedin, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// --- HOOK: Intersection Observer (For the smooth fade-in entrance) ---
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

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const footerRef = useRef<HTMLElement>(null);
    const isVisible = useIsVisible(footerRef);

    const socialLinks = [
        {
            icon: Linkedin,
            href: "https://www.linkedin.com/in/abdulrahman-in/",
            label: "LinkedIn",
            // Tailwind specific hover classes
            colorClass:
                "hover:text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/20",
        },
        {
            icon: Github,
            href: "https://github.com/ABDUL-RAHMAN-9",
            label: "GitHub",
            colorClass:
                "hover:text-purple-500 hover:bg-purple-500/10 hover:border-purple-500/20",
        },
        
    ];

    return (
        <footer
            ref={footerRef}
            className="relative border-t border-white/5 py-6 bg-background overflow-hidden">
            {/* --- BACKGROUND EFFECTS --- */}

            {/* 1. Grid Overlay with Top Mask (Fades into the section above) */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_20%)]"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* 2. Bottom Center Glow */}
            <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-50" />

            <div className="container mx-auto px-6 relative z-10">
                <div
                    className={`flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-1000 transform ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}>
                    {/* LEFT SIDE: Copyright & Credits */}
                    <div className="text-sm text-muted-foreground order-2 md:order-1 text-center md:text-left">
                        <p className="leading-relaxed mb-2">
                            &copy; {currentYear}{" "}
                            <span className="font-bold text-foreground tracking-wide">
                                DeepQuant
                            </span>
                            . All rights reserved.
                        </p>
                        <p className="flex items-center justify-center md:justify-start gap-1">
                            Designed & Developed by{" "}
                            <a
                                href="https://www.linkedin.com/in/abdulrahman-in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative font-medium text-foreground transition-colors hover:text-primary">
                                Abdul Rahman
                                {/* Underline Animation */}
                                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
                            </a>
                        </p>
                    </div>

                    {/* RIGHT SIDE: Social Links */}
                    <div className="flex items-center gap-4 order-1 md:order-2">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    // STAGGERED ENTRANCE DELAY
                                    style={{
                                        transitionDelay: `${index * 100}ms`,
                                    }}
                                    // BUTTON STYLING
                                    className={`
                    w-12 h-12 rounded-xl border border-white/5 bg-white/5 
                    flex items-center justify-center text-muted-foreground 
                    transition-all duration-300 ease-out
                    hover:-translate-y-1 hover:scale-110 hover:shadow-lg
                    active:scale-95
                    ${social.colorClass}
                  `}>
                                    <Icon className="w-5 h-5 transition-transform duration-300" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

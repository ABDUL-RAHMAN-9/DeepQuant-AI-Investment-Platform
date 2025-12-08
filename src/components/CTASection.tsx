// src/components/CTASection.tsx

import {
    ArrowRight,
    Sparkles,
    Check,
    Mail,
    AlertCircle,
    Loader2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

// --- CONFIGURATION ---
const EMAILJS_SERVICE_ID = "service_swsxkmb";
const EMAILJS_TEMPLATE_ID = "template_b06blbj";
const EMAILJS_PUBLIC_KEY = "DqznM9SqpQGNh1c3F";

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

    // --- STATE MANAGEMENT ---
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");
    const [errorMessage, setErrorMessage] = useState("");

    // --- EMAIL VALIDATION ---
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // --- HANDLE SUBMISSION ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (!email) {
            setErrorMessage("Please enter an email address.");
            setStatus("error");
            return;
        }
        if (!isValidEmail(email)) {
            setErrorMessage("Please enter a valid email address.");
            setStatus("error");
            return;
        }

        setStatus("submitting");

        try {
            const templateParams = {
                user_email: email,
                message:
                    "Welcome to DeepQuant. Your spot in the private beta is secured.",
                reply_to: email,
            };

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            setStatus("success");
            setEmail("");
        } catch (error) {
            console.error("FAILED...", error);
            setErrorMessage("System busy. Please try again later.");
            setStatus("error");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (status === "error") setStatus("idle");
        setEmail(e.target.value);
    };

    return (
        <section ref={sectionRef} className="py-24 relative z-20">
            <div className="container mx-auto px-6">
                {/* GLASS CARD CONTAINER */}
                <div
                    className={`
                        relative overflow-hidden rounded-[3rem] 
                        border border-primary/20 bg-background/40 backdrop-blur-xl 
                        text-center shadow-2xl shadow-primary/5
                        transition-all duration-1000 transform 
                        ${
                            isVisible
                                ? "opacity-100 translate-y-0 scale-100"
                                : "opacity-0 translate-y-12 scale-95"
                        }
                    `}>
                    {/* --- BACKGROUND EFFECTS --- */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

                    <div
                        className="absolute inset-0 opacity-[0.05] pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
                        style={{
                            backgroundImage:
                                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />

                    {/* --- CONTENT --- */}
                    <div className="relative z-10 px-6 py-20 md:py-28 flex flex-col items-center">
                        {/* 1. Badge */}
                        <div
                            className={`
                                inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
                                bg-primary/10 border border-primary/20 text-primary 
                                mb-8 transition-all duration-700 delay-100 
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"
                                }
                            `}>
                            <Sparkles className="w-4 h-4 fill-primary/20" />
                            <span className="text-sm font-medium tracking-wide">
                                Private Beta Access
                            </span>
                        </div>

                        {/* 2. Headline */}
                        <h2
                            className={`
                                text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight 
                                transition-all duration-700 delay-200 
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"
                                }
                            `}>
                            Be the First to <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x">
                                Experience the Future
                            </span>
                        </h2>

                        {/* 3. Subheadline */}
                        <p
                            className={`
                                text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed 
                                transition-all duration-700 delay-300 
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"
                                }
                            `}>
                            We are currently onboarding a limited number of
                            investors. Secure your spot in the priority queue
                            today.
                        </p>

                        {/* 4. THE INTERACTION: Waitlist Form */}
                        <div
                            className={`
                                w-full max-w-md transition-all duration-700 delay-500 
                                ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"
                                }
                             `}>
                            {status === "success" ? (
                                // SUCCESS STATE
                                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center gap-3 animate-in fade-in zoom-in duration-300">
                                    <div className="p-1 rounded-full bg-emerald-500 text-black">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span className="font-semibold">
                                        Confirmation email sent! Check your
                                        inbox.
                                    </span>
                                </div>
                            ) : (
                                // INPUT STATE
                                <form
                                    onSubmit={handleSubmit}
                                    className="relative group">
                                    {/* Glowing Border effect */}
                                    <div
                                        className={`absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500 ${
                                            status === "error"
                                                ? "from-red-500 via-orange-500 to-red-500 opacity-50"
                                                : ""
                                        }`}
                                    />

                                    <div className="relative flex items-center bg-background rounded-full border border-white/10 p-1.5 shadow-2xl">
                                        {/* Icon */}
                                        <div
                                            className={`pl-4 pr-3 ${
                                                status === "error"
                                                    ? "text-red-400"
                                                    : "text-muted-foreground"
                                            }`}>
                                            {status === "error" ? (
                                                <AlertCircle className="w-5 h-5" />
                                            ) : (
                                                <Mail className="w-5 h-5" />
                                            )}
                                        </div>

                                        {/* Input Field */}
                                        <input
                                            type="email"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={handleInputChange}
                                            disabled={status === "submitting"}
                                            className="w-full bg-transparent border-none text-foreground placeholder:text-muted-foreground focus:outline-none text-base py-3 disabled:opacity-50"
                                        />

                                        {/* Submit Button inside the bar */}
                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            // FIX: Removed 'hover:scale-105' and added 'hover:shadow-lg'
                                            // This keeps the button in "one position" but makes it glow.
                                            className="flex-shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground h-11 px-6 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-70 disabled:hover:shadow-none flex items-center gap-2">
                                            {status === "submitting" ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    Join Waitlist
                                                    <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Error Message Display */}
                                    {status === "error" && (
                                        <p className="absolute -bottom-8 left-6 text-sm text-red-400 animate-in fade-in slide-in-from-top-1">
                                            {errorMessage}
                                        </p>
                                    )}
                                </form>
                            )}
                        </div>

                        {/* Footer Text */}
                        <p
                            className={`
                                mt-8 text-sm text-muted-foreground 
                                transition-all duration-700 delay-700 
                                ${isVisible ? "opacity-100" : "opacity-0"}
                            `}>
                            Join 2,000+ others waiting for access.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;

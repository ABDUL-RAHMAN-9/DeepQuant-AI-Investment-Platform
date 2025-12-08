// src/components/Loader.tsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoaderProps {
    onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // 1. FASTER: Reduced total load time to 1 second (1000ms)
        const duration = 1000;
        const intervalTime = 20;
        const steps = duration / intervalTime;

        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const progress = Math.min(
                Math.round((currentStep / steps) * 100),
                100
            );
            setCount(progress);

            if (currentStep >= steps) {
                clearInterval(timer);
                // 2. FASTER: Only wait 0.2s after 100% before closing (was 0.6s)
                setTimeout(() => {
                    onComplete();
                }, 200);
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onComplete]);

    // Animation Variants
    const wordVariants = {
        hidden: { y: -150, opacity: 0, filter: "blur(10px)" },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.6, // Slightly tighter duration
            },
        },
        exit: {
            y: -50,
            opacity: 0,
            filter: "blur(10px)",
            transition: { duration: 0.3 }, // Faster exit
        },
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} // Faster page fade out
        >
            {/* --- BACKGROUND EFFECTS --- */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

            {/* --- MAIN CONTENT --- */}
            <div className="relative z-10 flex flex-col items-center">
                {/* The Split Title Animation */}
                <div className="flex items-center gap-2 md:gap-4 overflow-hidden py-4">
                    <motion.h1
                        variants={wordVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="text-6xl md:text-9xl font-extrabold tracking-tighter text-foreground">
                        Deep
                    </motion.h1>
                    <motion.h1
                        variants={wordVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                        Quant
                    </motion.h1>
                </div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="mt-4 px-4 text-center text-base sm:text-lg md:text-2xl text-muted-foreground font-medium tracking-wide">
                    Where AI Meets High-Performance Investing
                </motion.p>
            </div>

            {/* --- LOADING INDICATOR --- */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }} // Reduced delay
                className="absolute bottom-12 md:bottom-20 flex flex-col items-center gap-2">
                <div className="text-4xl md:text-5xl font-mono font-bold text-primary/80">
                    {count}%
                </div>
                <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: "0%" }}
                        animate={{ width: `${count}%` }}
                        transition={{ ease: "linear", duration: 0.1 }}
                    />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-[0.2em] mt-2">
                    System Initializing
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Loader;

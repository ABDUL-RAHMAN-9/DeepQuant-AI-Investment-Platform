// src/components/Loader.tsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 1. Simulate the percentage counter (0 to 100)
    const duration = 2000; // 2 seconds total load time
    const intervalTime = 20;
    const steps = duration / intervalTime;
    
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setCount(progress);

      if (currentStep >= steps) {
        clearInterval(timer);
        // 2. Wait a split second after 100%, then trigger unmount
        setTimeout(() => {
            onComplete();
        }, 600); 
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
        duration: 0.8 
      } 
    },
    exit: { 
      y: -50, 
      opacity: 0, 
      filter: "blur(10px)",
      transition: { duration: 0.5 } 
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Smooth fade out of the whole screen
      transition={{ duration: 0.5 }}
    >
        {/* --- BACKGROUND EFFECTS --- */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
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
                    className="text-6xl md:text-9xl font-extrabold tracking-tighter text-foreground"
                >
                    Deep
                </motion.h1>
                <motion.h1
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ delay: 0.1 }} // Slight delay for "Quant"
                    className="text-6xl md:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500"
                >
                    Quant
                </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-4 text-lg md:text-2xl text-muted-foreground font-medium tracking-wide"
            >
                Where AI Meets High-Performance Investing
            </motion.p>
        </div>

        {/* --- LOADING INDICATOR --- */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-12 md:bottom-20 flex flex-col items-center gap-2"
        >
            <div className="text-4xl md:text-5xl font-mono font-bold text-primary/80">
                {count}%
            </div>
            <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${count}%` }}
                    transition={{ ease: "linear", duration: 0.1 }} // Immediate response to state
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
// src/components/Loader.tsx

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const deepRef = useRef<HTMLSpanElement>(null); // Ref for "Deep"
  const quantRef = useRef<HTMLSpanElement>(null); // Ref for "Quant"
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Check if refs are available
    if (!loaderRef.current || !deepRef.current || !quantRef.current) return;
    
    // Total animation time for core sequence: ~1.8 seconds
    const CORE_DURATION = 1.8; 

    const tl = gsap.timeline({
      onComplete: () => {
        // Final fade-out of the whole loader screen
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete,
        });
      },
      defaults: {
        ease: "power3.inOut",
      },
    });

    // --- 1. Title Split & Converge from Top ---
    // The starting Y value (e.g., -500) positions it high above the viewport.

    // "Deep" moves from top-left to center
    tl.fromTo(
      deepRef.current,
      { y: "-100vh", opacity: 0, rotation: -5 }, // Start off-screen top-left, slightly rotated
      { y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: "power3.out" },
      0 // Start at the beginning of the timeline
    );

    // "Quant" moves from top-right to center
    tl.fromTo(
      quantRef.current,
      { y: "-100vh", opacity: 0, rotation: 5 }, // Start off-screen top-right, slightly rotated
      { y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: "power3.out" },
      0 // Start at the same time as "Deep"
    );

    // --- 2. Subtitle Reveal ---
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3" // Start 0.3s before the title convergence ends for a smooth follow-up
    );
    
    // --- 3. Hold and Fade-out Prep ---
    // The core elements hold for the remainder of the CORE_DURATION
    // Then everything prepares to fade out via the onComplete of the timeline.
    
    // Ensure the timeline finishes around 1.8s mark for speed
    tl.delay(CORE_DURATION - tl.totalDuration() - 0.5); // Add a small delay to hit the 1.8s mark roughly

    // Cleanup function
    return () => {
        tl.kill();
    };

  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden" 
    >
      <div className="flex items-center justify-center">
        {/* Title Split into Deep and Quant */}
        <h1
          className="text-white text-6xl md:text-9xl font-extrabold tracking-tight text-center"
          style={{ 
            textShadow: "0 8px 24px rgba(0,0,0,0.75)",
            display: 'flex', // Ensure the spans sit side-by-side
            transformStyle: 'preserve-3d', // For cleaner rotation animation
          }}
        >
          {/* "Deep" container: Start hidden high above */}
          <span 
            ref={deepRef} 
            className="block" // Needs to be 'block' for the Y-translation to work correctly
            style={{ 
                transform: 'translateY(-100vh)', // Initial style will be overridden by GSAP, but good for SSR safety
                opacity: 0, 
            }}
          >
            Deep
          </span>
          {/* "Quant" container: Start hidden high above */}
          <span 
            ref={quantRef} 
            className="block" // Needs to be 'block' for the Y-translation to work correctly
            style={{ 
                transform: 'translateY(-100vh)',
                opacity: 0, 
            }}
          >
            Quant
          </span>
        </h1>
      </div>

      <p
        ref={subtitleRef}
        className="text-white/90 text-2xl md:text-4xl mt-12 font-medium tracking-wide text-center"
        style={{ textShadow: "0 4px 14px rgba(0,0,0,0.7)", opacity: 0 }} // Start invisible
      >
        Where AI Meets High-Performance Investing.
      </p>
    </div>
  );
};

export default Loader;
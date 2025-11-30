import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: onComplete
        });
      }
    });

    tl.to(progressRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.inOut'
    });
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <div ref={textRef} className="mb-8">
        <h1 className="text-5xl md:text-7xl font-bold text-gradient glow">
          DeepQuant
        </h1>
      </div>
      
      <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
};

export default Loader;

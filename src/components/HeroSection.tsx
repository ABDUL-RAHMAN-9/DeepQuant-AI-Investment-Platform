import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// --- NEW IMAGE IMPORTS ---
// Assuming standard Next.js or Vite/Webpack setup where assets are imported directly
import img1 from '@/assets/img-1.avif';
import img2 from '@/assets/img-2.avif';
import img3 from '@/assets/img-3.avif';
import img4 from '@/assets/img-4.avif';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Array of imported images to map over
  // Assuming a structure where imported images have a 'src' property (common in modern build tools)
  const trustedAvatars = [img1, img2, img3, img4];

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    
    tl.from(contentRef.current?.children, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src='https://my.spline.design/orb-j2bnsGUiEKVrsn1TugjuetDS/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="pointer-events-none"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background z-10" />

      <div ref={contentRef} className="container mx-auto px-6 relative z-20 text-center">
        <div className="inline-block mb-6 px-6 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
          <span className="text-sm font-medium text-primary-glow">Investment Potential</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          Empowering Your<br />
          <span className="text-gradient">Investments with AI</span><br />
          Technology
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Our innovative AI technology transforms asset management by analyzing vast data sets in real-time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button size="lg" className="bg-primary hover:bg-primary-glow glow-hover text-lg px-8">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 text-lg px-8">
            Learn More
          </Button>
        </div>

        {/* --- UPDATED: Renders the 4 imported images here --- */}
        <div className="flex items-center justify-center gap-3">
          <div className="flex -space-x-3">
            {trustedAvatars.map((imgSrc, index) => (
              <img
                key={index}
                // Use the image source from the import
                src={imgSrc || imgSrc} 
                alt={`Trusted User Avatar ${index + 1}`}
                // Applied the same W/H and border/round styling
                className="w-10 h-10 rounded-full border-2 border-background object-cover"
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">Trusted already by 1.2K+</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import performanceBars from '@/assets/performance-bars.png';
import assetAllocation from '@/assets/asset-allocation-bars.png';
import riskManagement from '@/assets/risk-management-dots.png';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Transparent Performance Tracking',
    description: 'Monitor portfolio growth with real-time, easy-to-read analytics.',
    image: performanceBars,
    imagePosition: 'left'
  },
  {
    title: 'Seamless Asset Allocation',
    description: 'Balance investments across asset classes for better returns.',
    image: assetAllocation,
    imagePosition: 'right'
  },
  {
    title: 'Smart Risk Management',
    description: 'AI analyzes volatility and trends to minimize risk exposure.',
    image: riskManagement,
    imagePosition: 'left'
  }
];

const SmarterInvesting = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = sectionRef.current?.querySelectorAll('.feature-section');
    
    sections?.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Smarter Investing Starts Here
          </h2>
        </div>

        {features.map((feature, index) => (
          <div
            key={index}
            className={`feature-section grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32 last:mb-0 ${
              feature.imagePosition === 'right' ? 'lg:grid-flow-dense' : ''
            }`}
          >
            <div className={feature.imagePosition === 'right' ? 'lg:col-start-2' : ''}>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">{feature.title}</h3>
              <p className="text-lg text-muted-foreground mb-6">{feature.description}</p>
              <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                Learn More
              </Button>
            </div>

            <div className={`flex items-center justify-center ${feature.imagePosition === 'right' ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-glow blur-3xl opacity-50" />
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="relative z-10 w-full max-w-md animate-float"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SmarterInvesting;

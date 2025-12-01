import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom'; 

import { features } from '@/lib/featureData';

gsap.registerPlugin(ScrollTrigger);

const SmarterInvesting = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

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

  const handleDetailsClick = (featureId) => {
    navigate(`/feature/${featureId}`);
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-24 md:py-32 bg-gradient-to-b from-background to-background/50 overflow-hidden" 
    >
      <div className="container mx-auto px-6">
        
        {/* Modernized Heading Section */}
        <div className="text-center mb-20 md:mb-28 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gradient mb-4 leading-tight">
            Smarter Investing Starts Here
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground/90 font-light mt-4">
            A next-generation platform engineered for the modern investor:
            combining institutional-grade technology with transparent,
            goal-oriented financial strategies.
          </p>
        </div>

        {/* Feature List Structure */}
        <div className="space-y-32 md:space-y-48">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`feature-section grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center ${
                feature.imagePosition === 'right' ? 'lg:grid-flow-dense' : ''
              }`}
            >
              
              {/* Feature Content (Text Block) */}
              <div 
                className={`lg:col-span-6 ${
                  feature.imagePosition === 'right' ? 'lg:col-start-7' : 'lg:col-start-1'
                }`}
              >
                <div className="space-y-4 md:space-y-6">
                  <span className="inline-block text-lg font-semibold text-primary/80 uppercase tracking-widest">
                    Feature {index + 1}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-2xl font-medium text-muted-foreground/90">
                    {feature.tagline}
                  </p>
                  <p className="text-lg text-muted-foreground pt-2">
                    {feature.description}
                  </p>
                </div>
                
                <div className="mt-8">
                  <Button 
                    variant="outline" 
                    onClick={() => handleDetailsClick(feature.id)} 
                    className="border-2 border-primary/50 hover:bg-primary/10 text-lg px-8 py-6 font-semibold transition-all duration-300"
                  >
                    Explore Details &rarr;
                  </Button>
                </div>
              </div>

              {/* Feature Image (Visual Block) */}
              <div 
                className={`lg:col-span-6 flex items-center justify-center p-4 ${
                  feature.imagePosition === 'right' ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-7'
                }`}
              >
                <div className="relative w-full max-w-xl">
                  <div className="absolute inset-0 bg-gradient-glow blur-[50px] opacity-40 z-0 rounded-3xl" />
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="relative z-10 w-full rounded-xl shadow-2xl transition-transform duration-1000 animate-float"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmarterInvesting;
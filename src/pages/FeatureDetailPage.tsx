// src/pages/FeatureDetailPage.tsx

import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText'; 

// Import the data source
import { features } from '@/lib/featureData'; 

// Note: Ensure you have GSAP and SplitText installed and imported correctly.

const FeatureDetailPage = () => {
  const { featureId } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const titleRef = useRef(null); 

  const feature = features.find(f => f.id === featureId);

  // --- ERROR STATE (Kept clean) ---
  if (!feature) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gradient mb-4">Feature Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8">
            The requested feature details could not be located.
          </p>
          <Button onClick={() => navigate('/')} variant="outline">
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  // --- GSAP ANIMATION LOGIC (Retained) ---
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Page Content Fade-In (main container)
    tl.from(pageRef.current, { opacity: 0, y: 20, duration: 0.7 }, 0);
    
    // 2. Title Animation 
    if (titleRef.current && SplitText) { 
        const splitTitle = new SplitText(titleRef.current, { type: 'words' });
        
        tl.from(splitTitle.words, {
            opacity: 0,
            y: 40, 
            rotationX: -10,
            stagger: 0.05, 
            duration: 0.7, 
        }, 0.1); 
    }

    // 3. Other elements fade-in
    tl.from('.detail-tagline', { opacity: 0, y: 10, duration: 0.4 }, 0.4); 
    tl.from('.back-button', { opacity: 0, x: -10, duration: 0.4 }, 0.4);
    
  }, [featureId]);


  return (
    <section className="py-8 md:py-12 min-h-screen flex flex-col bg-background text-foreground">
      <div ref={pageRef} className="container mx-auto px-6 flex-grow">
        
        {/* TOP HEADER SECTION: Back Button & Hero */}
        <header className="mb-6 border-b border-border/50 pb-4">
            <div className="mb-3"> 
                <Button 
                    variant="link" 
                    onClick={() => navigate(-1)} 
                    className="text-sm text-primary/80 hover:text-primary transition-colors back-button"
                >
                    &larr; Back to Features
                </Button>
            </div>

            <div className="text-center max-w-5xl mx-auto">
                <h1 
                    ref={titleRef} 
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 leading-tight overflow-hidden"
                >
                    {feature.title}
                </h1>
                <p className="text-lg md:text-xl text-primary/70 font-light detail-tagline">
                    {feature.tagline}
                </p>
            </div>
        </header>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch"> 
            
            {/* Left Column: Image and Main Description (Overview Box) */}
            <div 
                // Increased padding from p-5 to p-6 to make the box look bigger
                className="lg:col-span-3 p-6 rounded-xl border border-border/50 bg-card/40 relative 
                           transition-all duration-300 ease-in-out cursor-default 
                           hover:translate-y-[-3px] hover:shadow-2xl hover:border-primary/50" 
            >
                
                <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-20 z-0 rounded-xl pointer-events-none" />

                <h2 className="text-xl font-semibold mb-3 text-foreground/90">Overview</h2>
                {/* Reduced margin on description to compensate for larger image */}
                <p className="text-sm text-muted-foreground/80 mb-4"> 
                    {feature.description}
                </p>
                
                {/* Image Container: INCREASED MAX HEIGHT HERE (from 64/72 to 80/96) */}
                <div className="relative w-full max-h-80 lg:max-h-96 overflow-hidden rounded-lg"> 
                    <div className="absolute inset-0 bg-gradient-glow blur-[30px] opacity-20 z-0" />
                    <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="relative z-10 w-full h-full object-contain rounded-lg shadow-2xl" 
                    />
                </div>
            </div>

            {/* Right Column: Detailed Breakdown (Remains the same) */}
            <div className="lg:col-span-2 p-5 rounded-xl bg-secondary/30 border border-primary/20 space-y-4"> 
                
                <h3 className="text-lg font-bold text-primary">
                    {feature.detailContent.heading}
                </h3>
                
                <ul className="space-y-3">
                    {feature.detailContent.points.map((point, index) => (
                        <li 
                            key={index} 
                            className="flex items-start bg-card p-3 rounded-md shadow-md border border-border/50 transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-lg hover:border-primary cursor-pointer"
                        >
                            <svg className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"> 
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-medium text-foreground/85">{point}</span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureDetailPage;
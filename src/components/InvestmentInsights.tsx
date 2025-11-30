import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portfolioChart from '@/assets/portfolio-growth-chart.png';
import diversifiedDots from '@/assets/diversified-assets-dots.png';
import lightningBolt from '@/assets/lightning-bolt.png';
import radarChart from '@/assets/radar-chart.png';

gsap.registerPlugin(ScrollTrigger);

const insights = [
  {
    title: 'Precision-Driven Portfolio Growth',
    description: 'Every move guided by data and insights for smarter portfolio growth.',
    image: portfolioChart,
    delay: 0
  },
  {
    title: 'Diversified Assets',
    description: 'Tailor your portfolio to achieve optimal performance.',
    image: diversifiedDots,
    delay: 0.2
  },
  {
    title: 'Maximize Returns, Minimize Effort',
    description: 'A fully automated investment system that saves you time and worry.',
    image: lightningBolt,
    delay: 0.4
  },
  {
    title: 'Your Portfolio, Optimized in Real-Time',
    description: 'Adjusted instantly with market changes to enhance investment efficiency.',
    image: radarChart,
    delay: 0.6
  }
];

const InvestmentInsights = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.insight-card');
    
    cards?.forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
  }, []);

  return (
    <section ref={sectionRef} id="feature" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Invest with Confidence.<br />
            <span className="text-gradient">Backed by Intelligence.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="insight-card glass-card p-8 hover:glow transition-all duration-300"
            >
              <div className="mb-6 h-48 flex items-center justify-center">
                <img 
                  src={insight.image} 
                  alt={insight.title}
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3">{insight.title}</h3>
              <p className="text-muted-foreground">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentInsights;

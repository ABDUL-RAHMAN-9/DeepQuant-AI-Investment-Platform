import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 98.7, suffix: '%', label: 'Client Satisfaction Rate' },
  { value: 250, suffix: 'M+', label: 'Assets Managed', prefix: '$' },
  { value: 120, suffix: '+', label: 'Investment Strategies' }
];

const MetricsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const counters = sectionRef.current?.querySelectorAll('.metric-value');
    
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      onEnter: () => {
        if (!animated) {
          counters?.forEach((counter, index) => {
            const target = metrics[index].value;
            gsap.to(counter, {
              innerText: target,
              duration: 2,
              snap: { innerText: target > 100 ? 1 : 0.1 },
              ease: 'power2.out',
              onUpdate: function() {
                const value = gsap.getProperty(counter, 'innerText') as number;
                counter.textContent = target > 100 ? Math.floor(value).toString() : value.toFixed(1);
              }
            });
          });
          setAnimated(true);
        }
      }
    });
  }, [animated]);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Performance You Can<br />
            <span className="text-gradient">Measure</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-3">
                {metric.prefix}
                <span className="metric-value text-gradient">0</span>
                {metric.suffix}
              </div>
              <p className="text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;

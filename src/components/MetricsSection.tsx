import { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { Users, TrendingUp, Briefcase } from 'lucide-react';

const metrics = [
  { 
    id: 1,
    value: 98.7, 
    suffix: '%', 
    label: 'Client Satisfaction Rate', 
    prefix: '',
    decimals: 1,
    icon: Users,
    color: 'text-emerald-400'
  },
  { 
    id: 2,
    value: 250, 
    suffix: 'M+', 
    label: 'Assets Under Management', 
    prefix: '$',
    decimals: 0,
    icon: TrendingUp,
    color: 'text-blue-400'
  },
  { 
    id: 3,
    value: 120, 
    suffix: '+', 
    label: 'Investment Strategies', 
    prefix: '',
    decimals: 0,
    icon: Briefcase,
    color: 'text-purple-400'
  }
];

// --- Sub-Component: Animated Counter ---
const Counter = ({ value, prefix = '', suffix = '', decimals = 0, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Spring configuration for a smooth "landing"
  const spring = useSpring(0, { 
    stiffness: 60, 
    damping: 20, 
    duration: 2 
  });

  // Transform the spring value into a string format
  const display = useTransform(spring, (current) => {
    // Determine formatting based on decimals
    const formatted = current.toFixed(decimals);
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref} className={className}>{display}</motion.span>;
};

const MetricsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-background text-foreground">
      
      {/* --- BACKGROUND EFFECTS --- */}
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      {/* Glowing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />


      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Performance You Can <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x">
              Measure
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Our results speak for themselves. We combine data-driven insights with 
            human expertise to deliver consistent value.
          </motion.p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              {/* Card Container */}
              <div className="h-full p-8 rounded-2xl bg-background/40 border border-white/10 backdrop-blur-md shadow-xl overflow-hidden transition-all duration-300 hover:shadow-primary/10 hover:border-primary/20">
                
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  
                  {/* Icon Container */}
                  <div className={`mb-6 p-4 rounded-full bg-secondary/30 ${metric.color} bg-opacity-10 ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300`}>
                    <metric.icon className="w-8 h-8" />
                  </div>

                  {/* Animated Counter Number */}
                  <div className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-foreground">
                    <Counter 
                      value={metric.value} 
                      prefix={metric.prefix} 
                      suffix={metric.suffix} 
                      decimals={metric.decimals}
                      className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
                    />
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {metric.label}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional: Trust Badge/Logos Divider could go here */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-16 pt-8 border-t border-white/5 text-center"
        >
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Trusted by modern investors worldwide
            </p>
        </motion.div>

      </div>
    </section>
  );
};

export default MetricsSection;
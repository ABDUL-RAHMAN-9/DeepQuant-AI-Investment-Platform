import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { Activity, Zap, Shield, BarChart3, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useRef } from 'react';

// --- DATA ---
const metrics = [
  {
    id: 1,
    label: 'Total Asset Growth',
    value: 48.23,
    suffix: '%',
    color: 'text-emerald-400',
  },
  {
    id: 2,
    label: 'Execution Speed',
    value: 14.2,
    suffix: 'ms',
    color: 'text-blue-400',
  },
  {
    id: 3,
    label: 'AI Confidence',
    value: 98.5,
    suffix: '%',
    color: 'text-purple-400',
  },
  {
    id: 4,
    label: 'Volatility Index',
    value: 12.4,
    suffix: '',
    color: 'text-amber-400',
  },
];

const insights = [
  {
    id: 'growth',
    title: 'Precision Growth',
    desc: 'Predictive AI models analyzing 50k+ data points to identify breakout opportunities before the market reacts.',
    icon: TrendingUp,
    accent: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-400',
    chartData: [20, 35, 30, 45, 40, 60, 55, 75, 70, 90]
  },
  {
    id: 'alloc',
    title: 'Dynamic Allocation',
    desc: 'Real-time rebalancing across non-correlated assets to maximize yield while insulating capital from shocks.',
    icon: BarChart3,
    accent: 'from-blue-500/20 to-blue-500/5',
    iconColor: 'text-blue-400',
    chartData: [40, 45, 42, 55, 65, 60, 75, 80, 85, 95]
  },
  {
    id: 'speed',
    title: 'Hyperspeed Execution',
    desc: 'Zero-latency trade execution ensures you never miss a micro-trend due to human delay or platform lag.',
    icon: Zap,
    accent: 'from-amber-500/20 to-amber-500/5',
    iconColor: 'text-amber-400',
    chartData: [30, 25, 40, 35, 50, 45, 60, 55, 80, 85]
  },
  {
    id: 'risk',
    title: 'Risk Radar',
    desc: '24/7 automated surveillance that instantly adjusts hedging strategies when market volatility spikes.',
    icon: Shield,
    accent: 'from-red-500/20 to-red-500/5',
    iconColor: 'text-red-400',
    chartData: [80, 70, 60, 65, 50, 45, 30, 35, 20, 15] // Downward trend implies reduced risk
  }
];

// --- SUB-COMPONENTS ---

// 1. Ticking Counter Component
const Counter = ({ value, suffix, color }) => {
  const spring = useSpring(0, { stiffness: 50, damping: 20, duration: 2 });
  const display = useTransform(spring, (current) => `${current.toFixed(1)}${suffix}`);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <motion.span ref={ref} className={`text-4xl md:text-5xl font-bold tracking-tight ${color}`}>
      {display}
    </motion.span>
  );
};

// 2. Sparkline Chart (SVG)
const Sparkline = ({ data, color }) => {
  // Simple logic to convert array to SVG path
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  const width = 100;
  const height = 40;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-12 w-full mt-6 opacity-80">
      <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible preserve-3d">
        <motion.path
          d={`M ${points}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={color}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        {/* Glowing blurry copy for neon effect */}
        <motion.path
          d={`M ${points}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className={`${color} blur-sm opacity-50`}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

// --- MAIN SECTION ---

const InvestmentSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-background text-foreground">
      
      {/* --- BACKGROUND EFFECTS (Matching your CTA) --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
         style={{
           backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
           backgroundSize: '40px 40px'
         }}
      />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />


      <div className="container mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Invest with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x">
                Intelligence
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Our platform synthesizes thousands of market signals per second to deliver an edge unseen in traditional investing.
            </p>
          </motion.div>
        </div>

        {/* LIVE METRICS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl bg-muted/30 border border-border/50 backdrop-blur-sm hover:bg-muted/50 transition-colors"
            >
              <Counter value={metric.value} suffix={metric.suffix} color={metric.color} />
              <p className="text-sm text-muted-foreground mt-2 font-medium uppercase tracking-wider">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* DASHBOARD CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {insights.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className={`group relative overflow-hidden rounded-[24px] p-8 border border-border/50 bg-background/60 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-2xl`}
            >
              {/* Gradient Background on Card */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-background/80 shadow-sm border border-border/50 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                    Live Analysis <Activity className="w-3 h-3 animate-pulse" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {item.desc}
                </p>

                {/* Animated Sparkline */}
                <Sparkline data={item.chartData} color={item.iconColor} />

                <div className="mt-6 flex items-center text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  View full report <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InvestmentSection;
import { TrendingUp, PieChart, Shield, Clock, BarChart3, Zap, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Enhanced data with color accents to match the "Dashboard" look
const features = [
  {
    icon: TrendingUp,
    title: 'AI-Powered Strategies',
    description: 'Leverage cutting-edge algorithms to identify profitable market opportunities before they trend.',
    accent: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-500'
  },
  {
    icon: PieChart,
    title: 'Portfolio Optimization',
    description: 'Automatically diversify investments across non-correlated assets to maximize returns and minimize risk.',
    accent: 'from-blue-500/20 to-blue-500/5',
    iconColor: 'text-blue-500'
  },
  {
    icon: Shield,
    title: 'Proactive Risk Management',
    description: 'Continuously monitor market volatility indices to automatically hedge your positions 24/7.',
    accent: 'from-purple-500/20 to-purple-500/5',
    iconColor: 'text-purple-500'
  },
  {
    icon: Clock,
    title: 'Real-Time Insights',
    description: 'Access up-to-the-minute data feeds and predictive analytics to stay ahead of the macro cycle.',
    accent: 'from-amber-500/20 to-amber-500/5',
    iconColor: 'text-amber-500'
  },
  {
    icon: BarChart3,
    title: 'Automated Rebalancing',
    description: 'Our AI detects drift in your asset allocation and adjusts your portfolio proactively without manual input.',
    accent: 'from-cyan-500/20 to-cyan-500/5',
    iconColor: 'text-cyan-500'
  },
  {
    icon: Zap,
    title: 'Performance Tracking',
    description: 'Visualize your wealth accumulation with detailed, interactive reports and transparent benchmarking.',
    accent: 'from-rose-500/20 to-rose-500/5',
    iconColor: 'text-rose-500'
  }
];

const CoreFeatures = () => {
  // Animation Variants for Staggered Entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-background text-foreground">
      
      {/* --- BACKGROUND EFFECTS (Consistent with Investment Section) --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      {/* Top Right Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      {/* Bottom Left Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Smarter Investing.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x">
              Stronger Outcomes
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Experience the future of wealth management with tools designed for the modern era.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative h-full"
              >
                {/* Card Container */}
                <div className="relative h-full p-8 rounded-[24px] bg-background/60 border border-border/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/20">
                  
                  {/* Dynamic Hover Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    
                    {/* Header: Icon & Action */}
                    <div className="flex justify-between items-start mb-6">
                      {/* Boxed Icon */}
                      <div className="p-3 rounded-xl bg-background/80 shadow-sm border border-border/50 group-hover:scale-110 transition-transform duration-300">
                        <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                      </div>
                      
                      {/* Hover Action Arrow */}
                      <div className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                      {feature.description}
                    </p>

                    {/* Footer: Learn More Link */}
                    <div className="mt-auto pt-4 border-t border-border/30 flex items-center text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      Learn more
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreFeatures;
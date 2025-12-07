import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const plans = [
  {
    id: 1,
    name: 'Core Plan',
    prices: {
      monthly: 99,
      yearly: 79 
    },
    features: [
      '0.2% management fee',
      'AI rebalancing',
      'Market insights',
      'Mobile support'
    ],
  },
  {
    id: 2,
    name: 'Vision Plan',
    prices: {
      monthly: 299,
      yearly: 249 
    },
    features: [
      '0.2%-0.1% management fee',
      'Advanced AI strategies',
      '1-on-1 support',
      'Investment team access',
      'Private support & onboarding'
    ],
  }
];

const PricingSection = () => {
  // Default state set to Yearly (Vision Plan highlighted)
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-background text-foreground">
      
      {/* --- BACKGROUND EFFECTS (Consistent with other sections) --- */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      {/* Top Left Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      {/* Bottom Right Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />


      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x">
              Pricing Options
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Choose the solution that fits your investing goals
          </motion.p>
          
          {/* Animated Toggle Button */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-1 bg-muted/50 p-1 rounded-xl relative border border-white/5 backdrop-blur-sm"
          >
            <div className="relative flex">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`relative z-10 px-8 py-2.5 rounded-lg transition-colors duration-200 font-medium text-sm ${
                      !isYearly ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Monthly
                  {!isYearly && (
                      <motion.div
                        layoutId="toggle-background"
                        className="absolute inset-0 bg-primary rounded-lg shadow-lg shadow-primary/20 -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                  )}
                </button>

                <button
                  onClick={() => setIsYearly(true)}
                  className={`relative z-10 px-8 py-2.5 rounded-lg transition-colors duration-200 font-medium text-sm ${
                      isYearly ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Yearly
                  {isYearly && (
                      <motion.div
                        layoutId="toggle-background"
                        className="absolute inset-0 bg-primary rounded-lg shadow-lg shadow-primary/20 -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                  )}
                </button>
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            // Logic: Highlighting switches based on toggle state
            const isPopular = isYearly ? index === 1 : index === 0;
            const currentPrice = isYearly ? plan.prices.yearly : plan.prices.monthly;

            return (
              <motion.div
                key={plan.id}
                layout 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-8 rounded-[24px] transition-all duration-300 ${
                  isPopular
                    ? 'border border-primary/50 bg-background/60 backdrop-blur-xl shadow-2xl shadow-primary/10'
                    : 'border border-white/10 bg-background/30 backdrop-blur-md hover:border-white/20'
                }`}
              >
                {/* Popular Gradient Glow behind the card */}
                {isPopular && (
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent rounded-[24px] pointer-events-none" />
                )}

                {/* Animated Badge */}
                <AnimatePresence>
                  {isPopular && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, x: "-50%" }}
                      animate={{ opacity: 1, y: -18, x: "-50%" }} // Positioned slightly outside top border
                      exit={{ opacity: 0, y: -10, x: "-50%" }}
                      className="absolute left-1/2 px-4 py-1 bg-primary rounded-full text-xs font-bold text-primary-foreground shadow-[0_0_20px_-5px_rgba(var(--primary-rgb),0.6)] z-20"
                    >
                      BEST VALUE
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    
                    <div className="mb-6 overflow-hidden flex items-end">
                      <span className="text-5xl font-bold flex items-center tracking-tight">
                        $
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentPrice}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {currentPrice}
                            </motion.span>
                        </AnimatePresence>
                      </span>
                      <span className="text-muted-foreground mb-1 ml-1 text-lg">/{isYearly ? 'year' : 'month'}</span>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3 group">
                          <div className={`mt-0.5 p-1 rounded-full ${isPopular ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground group-hover:text-primary transition-colors'}`}>
                             <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full py-6 text-lg rounded-xl transition-all duration-300 ${
                        isPopular
                          ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30'
                          : 'bg-secondary hover:bg-secondary/80 text-foreground'
                      }`}
                    >
                      {isPopular ? 'Get Started Now' : 'Choose Core'}
                    </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
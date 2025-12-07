import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[32px] p-12 md:p-24 text-center border border-primary/20 bg-background/50 backdrop-blur-sm"
        >
          {/* --- BACKGROUND ANIMATIONS --- */}
          
          {/* 1. Subtle Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* 2. Moving Glowing Orbs (The "Aurora" Effect) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Orb 1: Top Left */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-primary/30 blur-[100px] rounded-full"
            />
            {/* Orb 2: Bottom Right */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                x: [0, -50, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-[20%] -right-[10%] w-[400px] h-[400px] bg-purple-500/30 blur-[100px] rounded-full"
            />
          </div>

          {/* --- CONTENT --- */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            >
              Start Investing<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x bg-[length:200%_auto]">
                Smarter Today
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed"
            >
              Harness the power of AI to grow your portfolio with confidence and clarity. 
              Join thousands of investors optimizing their future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Button 
                size="lg" 
                className="group relative h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground overflow-hidden rounded-full transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(var(--primary-rgb),0.5)]"
              >
                {/* Shiny highlight effect passing through button */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                
                <span className="relative flex items-center gap-2">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
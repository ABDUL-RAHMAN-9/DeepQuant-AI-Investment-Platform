import { motion } from 'framer-motion';
import { 
  Hexagon, 
  Triangle, 
  Circle, 
  Box, 
  Diamond, 
  Command, 
  Gem, 
  Layers 
} from 'lucide-react';

// --- MOCK DATA: Simulating real company logos ---
const companies = [
  { name: 'Wealthro', icon: Hexagon, weight: 'font-bold' },
  { name: 'Finyon', icon: Triangle, weight: 'font-semibold' },
  { name: 'Aegra', icon: Circle, weight: 'font-black' },
  { name: 'Postvio', icon: Box, weight: 'font-medium' },
  { name: 'Vaultic', icon: Diamond, weight: 'font-bold' },
  { name: 'NexusCorp', icon: Command, weight: 'font-extrabold' },
  { name: 'SynergyLabs', icon: Layers, weight: 'font-semibold' },
  { name: 'Innovatech', icon: Gem, weight: 'font-bold' }
];

// Duplicate the array to ensure seamless looping
const scrollingLogos = [...companies, ...companies];

const TrustedBy = () => {
  return (
    <section className="py-12 border-y border-white/5 bg-background/50 backdrop-blur-sm relative overflow-hidden">
      
      {/* Background Glow (Subtle) */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-8 text-center relative z-20">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Trusted by the world's leading teams
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex overflow-hidden mask-linear-fade">
        {/* 
           The Sliding Track 
           Using Framer Motion for the infinite loop logic.
           animate: moves X from 0 to -50% (because we doubled the list)
        */}
        <motion.div 
          className="flex items-center gap-16 md:gap-24 px-4 min-w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 30, // Adjust speed here (higher = slower)
            repeat: Infinity 
          }}
          // Optional: Pause on hover for better UX
          whileHover={{ animationPlayState: "paused" }} 
          style={{ width: "max-content" }}
        >
          {scrollingLogos.map((company, index) => (
            <div 
              key={`${company.name}-${index}`} 
              className="group flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default"
            >
              {/* Logo Icon */}
              <div className="p-2 rounded-lg bg-foreground/5 group-hover:bg-primary/10 transition-colors">
                <company.icon className="w-6 h-6 md:w-8 md:h-8 text-foreground group-hover:text-primary transition-colors" />
              </div>
              
              {/* Logo Text */}
              <span className={`text-xl md:text-2xl text-foreground ${company.weight} tracking-tight`}>
                {company.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Left/Right Fade Masks (Visual Polish) */}
      <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default TrustedBy;
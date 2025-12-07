import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, PlayCircle } from 'lucide-react';

// --- IMAGE IMPORTS ---
// Ensure these paths match your project structure
import img1 from '@/assets/img-1.avif';
import img2 from '@/assets/img-2.avif';
import img3 from '@/assets/img-3.avif';
import img4 from '@/assets/img-4.avif';

const trustedAvatars = [img1, img2, img3, img4];

const HeroSection = () => {
  // Animation Variants for Staggered Entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-background">
      
      {/* --- BACKGROUND LAYER --- */}
      
      {/* 1. Spline 3D Scene */}
      <div className="absolute inset-0 z-0">
        {/* Added opacity-80 so it blends better with the dark theme */}
        <iframe 
          src='https://my.spline.design/orb-j2bnsGUiEKVrsn1TugjuetDS/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="pointer-events-none opacity-80"
          title="3D Abstract Orb"
        />
      </div>

      {/* 2. Gradient Overlay (Vignette) - Ensures text is readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background z-10" />
      
      {/* 3. Grid Pattern (Consistent with other sections) */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* --- CONTENT LAYER --- */}
      <motion.div 
        className="container mx-auto px-6 relative z-20 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Animated Pill Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(var(--primary-rgb),0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-primary tracking-wide">Investment Potential Unlocked</span>
            <ChevronRight className="w-4 h-4 text-primary/70" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight"
        >
          Empowering Your<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x">
            Investments with AI
          </span><br />
          Technology
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Our innovative AI technology transforms asset management by analyzing vast data sets in real-time, giving you the edge in a volatile market.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          {/* Primary Button with Shine Effect */}
          <Button 
            size="lg" 
            className="group relative h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground overflow-hidden rounded-full shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            <span className="relative flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>

          {/* Secondary Button */}
          <Button 
            size="lg" 
            variant="outline" 
            className="h-14 px-8 text-lg border-2 border-primary/20 hover:border-primary/50 bg-background/50 backdrop-blur-sm hover:bg-primary/10 rounded-full transition-all duration-300 group"
          >
            <span className="flex items-center gap-2 text-foreground/90">
              <PlayCircle className="w-5 h-5 group-hover:text-primary transition-colors" />
              Watch Demo
            </span>
          </Button>
        </motion.div>

        {/* Social Proof / Avatars */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-center gap-4 p-4 rounded-2xl bg-background/40 border border-white/5 backdrop-blur-sm w-fit mx-auto"
        >
          <div className="flex -space-x-4">
            {trustedAvatars.map((imgSrc, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.1, zIndex: 10 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <img
                  src={imgSrc || "/api/placeholder/40/40"} // Fallback if import fails
                  alt={`User ${index + 1}`}
                  className="w-12 h-12 rounded-full border-[3px] border-background object-cover shadow-lg"
                />
              </motion.div>
            ))}
            {/* "More" Bubble */}
            <div className="w-12 h-12 rounded-full border-[3px] border-background bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-xs font-bold text-white shadow-lg z-0">
              +1.2k
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <div className="flex items-center gap-1 justify-center md:justify-start text-yellow-500 mb-1">
               {[1,2,3,4,5].map(i => (
                 <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
               ))}
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Trusted by 1,200+ modern investors
            </p>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default HeroSection;
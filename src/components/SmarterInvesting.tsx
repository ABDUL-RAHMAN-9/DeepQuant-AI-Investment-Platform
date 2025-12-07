import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers, PieChart, ShieldCheck } from 'lucide-react';

// --- DATA ---
const features = [
  {
    id: 'portfolio',
    title: 'Precision-Engineered Portfolios',
    tagline: 'Built for resilience.',
    description: 'Our algorithms construct portfolios designed to weather market volatility while capturing growth, using institutional-grade asset allocation strategies.',
    image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2664&auto=format&fit=crop',
    icon: PieChart
  },
  {
    id: 'security',
    title: 'Bank-Grade Security Standards',
    tagline: 'Your wealth, protected.',
    description: 'We utilize 256-bit encryption and biometric verification to ensure your assets and personal data remain impenetrable to external threats.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
    icon: ShieldCheck
  },
  {
    id: 'transparency',
    title: 'Total Fee Transparency',
    tagline: 'No hidden costs. Ever.',
    description: 'See exactly where every dollar goes. We believe in radical transparency, ensuring our incentives are perfectly aligned with your financial success.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    icon: Layers
  }
];

// --- COMPONENT 1: "Data Rain" Background Effect ---
const DataRainBackground = () => {
  // Vertical lines distributed across the screen width (%)
  const lines = [10, 25, 40, 60, 75, 90]; 

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {lines.map((left, i) => (
        <div 
          key={i}
          className="absolute top-0 bottom-0 w-[1px] bg-white/[0.03]"
          style={{ left: `${left}%` }}
        >
          {/* The moving "data packet" */}
          <motion.div
            className="absolute top-0 w-[2px] h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent -translate-x-[0.5px]"
            animate={{
              y: ['-100%', '150%'], 
            }}
            transition={{
              duration: Math.random() * 5 + 5, // Random speed
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5, // Random offset
            }}
          />
        </div>
      ))}
    </div>
  );
};

// --- COMPONENT 2: 3D Tilt Card ---
const TiltCard = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (e.clientX - rect.left) * 32.5;
    const mouseY = (e.clientY - rect.top) * 32.5;
    
    const rX = (mouseY / height - 32.5 / 2) * -1;
    const rY = mouseX / width - 32.5 / 2;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform
      }}
      className={`relative w-full h-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- Sub-Component: Feature Card ---
const FeatureCard = ({ feature, index, onDetailsClick }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center perspective-1000">
      
      {/* TEXT SECTION */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative z-10 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
      >
        {/* Visual Connecting Line */}
        <div className={`absolute top-1/2 ${isEven ? '-right-12 lg:-right-24' : '-left-12 lg:-left-24'} w-0 lg:w-24 h-[1px] bg-gradient-to-r from-primary/50 to-transparent hidden lg:block`} />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase border border-primary/20">
             {feature.icon ? <feature.icon className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
             Feature 0{index + 1}
          </div>
          
          <h3 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            {feature.title}
          </h3>
          
          <p className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">
            {feature.tagline}
          </p>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {feature.description}
          </p>

          <div className="pt-4">
            <Button 
              onClick={() => onDetailsClick(feature.id)}
              className="group relative h-12 px-6 rounded-full bg-background border border-primary/20 hover:border-primary/50 text-foreground overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              variant="ghost"
            >
              <span className="relative z-10 flex items-center gap-2 font-medium">
                Explore Details 
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* IMAGE SECTION (3D TILT) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`} 
      >
        <TiltCard className="cursor-default">
            {/* 3D Depth Shadow/Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-[2rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 translate-z-[-20px]" />
            
            {/* The Glass Card */}
            <div className="relative rounded-2xl p-2 bg-background/30 backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden group h-full">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                
                {/* Flash Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
                
                {/* The Image */}
                <motion.img 
                  style={{ transform: "translateZ(20px)" }} 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Floating 3D Badge */}
              <div 
                className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg z-30 shadow-xl"
                style={{ transform: "translateZ(50px)" }} 
              >
                  <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-bold text-white tracking-wider uppercase">AI Active</span>
                  </div>
              </div>
            </div>
        </TiltCard>
      </motion.div>

    </div>
  );
};

// --- Main Component ---
const SmarterInvesting = () => {
  const navigate = useNavigate(); 
  const containerRef = useRef(null);
  
  // Parallax Background Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleDetailsClick = (featureId) => {
    navigate(`/feature/${featureId}`);
  };

  return (
    <section 
      ref={containerRef} 
      id="smarter-investing"
      className="py-32 relative overflow-hidden bg-background text-foreground"
    >
      {/* 1. Data Rain Effect */}
      <DataRainBackground />
      
      {/* 2. Parallax Orbs */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-40 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-32 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
          >
            Smarter Investing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x">
              Starts Here
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            A next-generation platform engineered for the modern investor:
            combining institutional-grade technology with transparent,
            goal-oriented financial strategies.
          </motion.p>
        </div>

        {/* Features List */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.id} 
              feature={feature} 
              index={index} 
              onDetailsClick={handleDetailsClick} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmarterInvesting;
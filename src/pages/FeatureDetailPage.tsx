// src/pages/FeatureDetailPage.tsx

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

// 1. OPTIONAL: Import your real data if you have it separated
// import { features } from '@/lib/featureData';

// --- MOCK DATA SOURCE ---
// This ensures the page works immediately without needing external files.
const features = [
  {
    id: 'portfolio',
    title: 'Precision-Engineered Portfolios',
    tagline: 'Built for resilience. Designed for growth.',
    description: 'Our algorithms construct portfolios designed to weather market volatility while capturing growth, using institutional-grade asset allocation strategies. We parse millions of data points to ensure your asset mix is perfectly aligned with your risk tolerance.',
    image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2664&auto=format&fit=crop',
    detailContent: {
        heading: 'Key Technical Advantages',
        points: [
            'Dynamic Rebalancing based on volatility indices',
            'Tax-loss harvesting automation',
            'Multi-asset class diversification',
            'Institutional-grade risk modeling'
        ]
    }
  },
  {
    id: 'security',
    title: 'Bank-Grade Security',
    tagline: 'Your wealth, protected by the best.',
    description: 'We utilize 256-bit encryption and biometric verification to ensure your assets and personal data remain impenetrable. Your peace of mind is our top priority.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
    detailContent: {
        heading: 'Security Protocols',
        points: [
            'AES-256 Encryption Standards',
            'Biometric Multi-Factor Authentication',
            'Real-time intrusion detection systems',
            'Cold storage for digital assets'
        ]
    }
  },
  {
    id: 'transparency',
    title: 'Total Fee Transparency',
    tagline: 'No hidden costs. Ever.',
    description: 'See exactly where every dollar goes. We believe in radical transparency, ensuring our incentives are perfectly aligned with your financial success.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    detailContent: {
        heading: 'Our Promise',
        points: [
            'Zero hidden management fees',
            'Real-time expense ratio tracking',
            'Clear performance reporting',
            'Fiduciary standard of care'
        ]
    }
  }
];

const FeatureDetailPage = () => {
  const { featureId } = useParams();
  const navigate = useNavigate();

  // Scroll to top automatically when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [featureId]);

  const feature = features.find(f => f.id === featureId);

  // --- ERROR STATE (If ID doesn't exist) ---
  if (!feature) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="text-center z-10 px-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-red-500 mb-6">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Feature Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            We couldn't locate the details for this feature. It may have been moved or removed.
          </p>
          <Button onClick={() => navigate('/')} variant="outline" className="border-primary/20 hover:bg-primary/5">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  // Animation Variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="min-h-screen pt-24 pb-12 bg-background text-foreground relative overflow-hidden">
        
        {/* --- BACKGROUND EFFECTS --- */}
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Animated Gradient Blobs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none opacity-30" />

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* TOP HEADER SECTION */}
        <motion.div variants={itemVariants} className="mb-8">
            <Button 
                variant="ghost" 
                onClick={() => navigate(-1)} 
                className="group pl-0 text-muted-foreground hover:text-primary hover:bg-transparent transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Features
            </Button>

            <div className="max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
                    {feature.title}
                </h1>
                <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 font-medium">
                    {feature.tagline}
                </p>
            </div>
        </motion.div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"> 
            
            {/* Left Column: Image & Overview (Takes up 7 cols) */}
            <motion.div 
                variants={itemVariants}
                className="lg:col-span-7 flex flex-col gap-6"
            >
                {/* Image Card Container */}
                <div className="relative rounded-2xl p-2 bg-background/40 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative rounded-xl overflow-hidden aspect-video lg:aspect-[16/10]">
                        <motion.img 
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            src={feature.image} 
                            alt={feature.title}
                            className="w-full h-full object-cover" 
                        />
                    </div>
                </div>

                {/* Overview Text Box */}
                <div className="p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-4">Overview</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {feature.description}
                    </p>
                </div>
            </motion.div>

            {/* Right Column: Details List (Takes up 5 cols) */}
            <motion.div 
                variants={itemVariants}
                className="lg:col-span-5 space-y-6"
            >
                <div className="p-8 rounded-2xl bg-secondary/20 border border-primary/10 backdrop-blur-md relative overflow-hidden">
                    {/* Decorative glow inside card */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />

                    <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                        {feature.detailContent.heading}
                    </h3>
                    
                    <ul className="space-y-4">
                        {feature.detailContent.points.map((point, index) => (
                            <motion.li 
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (index * 0.1) }}
                                className="group flex items-start gap-3 p-3 rounded-lg hover:bg-background/60 transition-colors duration-200 cursor-default"
                            >
                                <div className="mt-1 p-1 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <span className="text-base text-muted-foreground group-hover:text-foreground transition-colors">
                                    {point}
                                </span>
                            </motion.li>
                        ))}
                    </ul>

                    <div className="mt-8 pt-6 border-t border-border/50">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6 shadow-lg shadow-primary/20">
                            Get Started with {feature.title.split(' ')[0]}
                        </Button>
                    </div>
                </div>
            </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default FeatureDetailPage;
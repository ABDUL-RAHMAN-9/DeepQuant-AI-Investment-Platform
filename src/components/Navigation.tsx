import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' : ''
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            
            {/* The src path is simply '/logo.webp' for files in the public directory */}
            <img 
              src="/logo.webp" // Corrected path to public folder asset
              alt="DeepQuant Logo" 
              className="w-8 h-8 rounded-lg object-cover" 
            />

            <span className="text-xl font-bold">DeepQuant</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </a>
            <a href="#feature" className="text-foreground/80 hover:text-foreground transition-colors">
              Feature
            </a>
            <a href="#benefit" className="text-foreground/80 hover:text-foreground transition-colors">
              Benefit
            </a>
            <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors">
              Pricing
            </a>
          </div>

          <Button className="bg-primary hover:bg-primary-glow glow-hover">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
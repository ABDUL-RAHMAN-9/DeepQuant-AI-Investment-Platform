import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' }, // Matches CoreFeatures ID
  { name: 'Intelligence', href: '#smarter-investing' }, // Matches SmarterInvesting ID
  { name: 'Pricing', href: '#pricing' }, // Matches PricingSection ID
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Handle Scroll Background Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Smooth Scroll Function (Fixes header overlap issue)
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu if open

    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerOffset = 80; // Height of your fixed header
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-background/70 backdrop-blur-xl border-white/10 shadow-lg shadow-primary/5 py-4' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            
            {/* LOGO AREA */}
            <a 
              href="#home" 
              onClick={(e) => handleScrollTo(e, '#home')}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-white/10 shadow-inner bg-background/50">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src="/logo.webp" 
                  alt="DeepQuant Logo" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <span className="text-xl font-bold tracking-tight">DeepQuant</span>
            </a>

            {/* DESKTOP NAVIGATION */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  {link.name}
                  {/* Hover Underline Animation */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA BUTTON & MOBILE TOGGLE */}
            <div className="flex items-center gap-4">
              <Button 
                className="hidden md:flex bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105"
                onClick={() => {
                   const pricingSection = document.querySelector('#pricing');
                   if(pricingSection) pricingSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started
              </Button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[70px] z-40 p-4 md:hidden"
          >
            <div className="bg-background/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-lg font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 p-4 rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-border/50 my-2" />
              <Button className="w-full bg-primary py-6 text-lg">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
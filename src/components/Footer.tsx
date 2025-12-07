import { Linkedin, Instagram, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/abdulrahman-in/",
      label: "LinkedIn",
      color: "hover:text-blue-500",
      bg: "hover:bg-blue-500/10"
    },
    {
      icon: Github,
      href: "https://github.com/ABDUL-RAHMAN-9",
      label: "GitHub",
      color: "hover:text-purple-500",
      bg: "hover:bg-purple-500/10"
    },
    // Uncomment if you want to use the Instagram import
    // {
    //   icon: Instagram,
    //   href: "#",
    //   label: "Instagram",
    //   color: "hover:text-pink-500",
    //   bg: "hover:bg-pink-500/10"
    // }
  ];

  return (
    <footer className="relative border-t border-white/10 py-8 bg-background overflow-hidden">
      
      {/* --- BACKGROUND EFFECTS --- */}
      {/* Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Copyright & Credits (Left Side) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground order-2 md:order-1 text-center md:text-left"
          >
            <p className="leading-relaxed">
              &copy; {currentYear} <span className="font-semibold text-foreground">DeepQuant</span>. 
              All rights reserved.
            </p>
            <p className="mt-1">
              Design & developed by{' '}
              <a 
                href="https://www.linkedin.com/in/abdulrahman-in/"
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary/50"
              >
                Abdul Rahman
              </a>
            </p>
          </motion.div>

          {/* Social Links (Right Side) */}
          <div className="flex items-center gap-4 order-1 md:order-2">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full bg-muted/30 border border-white/5 flex items-center justify-center text-muted-foreground transition-all duration-300 ${social.color} ${social.bg} hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5`}
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
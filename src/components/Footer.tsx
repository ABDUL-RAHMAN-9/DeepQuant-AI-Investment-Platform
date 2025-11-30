import { Linkedin, Instagram, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Updated py-6 for a slightly smaller, more compact footer
    <footer className="border-t border-border/30 py-6">
      <div className="container mx-auto px-6">
        {/* Main Footer Row: Copyright on Left, Social Links on Right */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Copyright (Left Side) */}
          <div className="text-sm text-muted-foreground order-2 md:order-1 text-center md:text-left">
            &copy; {currentYear} DeepQuant - Design & develop by Abdul Rahman | All rights reserved.
          </div>

          {/* Social Links (Right Side) */}
          <div className="flex items-center gap-4 order-1 md:order-2">
            <a
              href="https://www.linkedin.com/in/abdulrahman-in/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/dev_abdul_rahman/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
            href="https://github.com/ABDUL-RAHMAN-9"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
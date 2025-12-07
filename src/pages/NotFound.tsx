import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, FileQuestion, MoveLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Keep your logging logic, it's good practice
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      
      {/* --- BACKGROUND EFFECTS --- */}
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none opacity-50" />

      {/* --- CONTENT --- */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          {/* Animated Icon */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-24 h-24 bg-muted/30 rounded-3xl border border-white/10 flex items-center justify-center mx-auto mb-8 backdrop-blur-md shadow-2xl"
          >
            <FileQuestion className="w-10 h-10 text-primary" />
          </motion.div>

          {/* Huge 404 Text */}
          <h1 className="text-8xl md:text-9xl font-extrabold tracking-tighter mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x">
              404
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Page Not Found
          </h2>

          <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-md mx-auto">
            The signal you are looking for has been lost in the data stream. 
            The page may have been moved, deleted, or never existed.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              asChild
              size="lg" 
              className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105"
            >
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </Button>

            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-primary/20 hover:bg-primary/5 hover:border-primary/50"
            >
              <button onClick={() => window.history.back()}>
                <MoveLeft className="w-4 h-4 mr-2" />
                Go Back
              </button>
            </Button>
          </div>

        </motion.div>
      </div>

      {/* Bottom decorative text */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-xs text-muted-foreground/30 font-mono">
          ERROR_CODE: PAGE_NOT_FOUND_EXCEPTION
        </p>
      </div>
    </div>
  );
};

export default NotFound;
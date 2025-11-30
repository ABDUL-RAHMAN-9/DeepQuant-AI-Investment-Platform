import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-primary-glow/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
          
          {/* Glow effect */}
          <div className="absolute inset-0 animate-pulse-glow" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Start Investing<br />
              <span className="text-gradient">Smarter Today</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Harness the power of AI to grow your portfolio with confidence and clarity.
            </p>
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 text-lg px-10 border-2 border-primary glow">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

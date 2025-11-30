import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useState } from 'react';

const plans = [
  {
    name: 'Core Plan',
    price: 99,
    period: 'monthly',
    features: [
      '0.2% management fee',
      'AI rebalancing',
      'Market insights',
      'Mobile support'
    ],
    isPopular: false
  },
  {
    name: 'Vision Plan',
    price: 2099,
    period: 'monthly',
    features: [
      '0.2%-0.1% management fee',
      'Advanced AI strategies',
      '0.2%-1-on-1 support',
      'Investment team access',
      'Private support & onboarding'
    ],
    isPopular: true
  }
];

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Pricing Options</span>
          </h2>
          <p className="text-muted-foreground mb-8">Choose the solution that fits your needs</p>
          
          <div className="inline-flex items-center gap-3 bg-muted/50 p-1 rounded-lg">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-md transition-all ${
                !isYearly ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-md transition-all ${
                isYearly ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card p-8 relative ${
                plan.isPopular
                  ? 'border-2 border-primary bg-gradient-to-br from-primary/10 to-primary/5'
                  : ''
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full text-sm font-medium">
                  Best Value
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.isPopular
                    ? 'bg-primary hover:bg-primary-glow glow'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {plan.isPopular ? 'Upgrade' : 'Get this plan'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

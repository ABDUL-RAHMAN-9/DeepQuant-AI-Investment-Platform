import { TrendingUp, PieChart, Shield, Clock, BarChart3, Zap } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'AI-Powered Strategies',
    description: 'Leverage cutting-edge algorithms to identify profitable market opportunities.'
  },
  {
    icon: PieChart,
    title: 'Portfolio Optimization',
    description: 'Automatically diversify investments to maximize returns and minimize risk.'
  },
  {
    icon: Shield,
    title: 'Proactive Risk Management',
    description: 'Continuously monitor market conditions to safeguard your investments.'
  },
  {
    icon: Clock,
    title: 'Real-Time Insights',
    description: 'Access up-to-the-minute data and analytics to stay ahead of the market.'
  },
  {
    icon: BarChart3,
    title: 'Effortless Risk Management',
    description: 'Our AI identifies potential risks and adjusts your portfolio proactively.'
  },
  {
    icon: Zap,
    title: 'Performance Tracking',
    description: 'Track your portfolio performance with detailed reports and visual analytics.'
  }
];

const CoreFeatures = () => {
  return (
    <section id="benefit" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Smarter Investing.<br />
            <span className="text-gradient">Stronger Outcomes</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-card p-6 group hover:glow transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;

// src/lib/featureData.ts

import { TrendingUp, PieChart, ShieldCheck, LucideIcon } from 'lucide-react';

// Replaced local imports with the provided URLs
const IMAGE_PERFORMANCE = 'https://images.unsplash.com/photo-1645226880663-81561dcab0ae?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const IMAGE_ASSET_ALLOCATION = 'https://images.unsplash.com/photo-1555537827-fb548b59e691?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIzfHx8ZW58MHx8fHx8';
const IMAGE_RISK_MANAGEMENT = 'https://images.unsplash.com/photo-1699878205424-061f7e4775f8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export interface Feature {
  id: string; // Unique ID for routing
  title: string;
  tagline: string;
  description: string;
  image: string; // Holds the external URL
  imagePosition: 'left' | 'right';
  icon: LucideIcon; // Added for UI compatibility
  // Extended content for the detail page
  detailContent: {
    heading: string;
    points: string[];
  };
}

export const features: Feature[] = [
  {
    id: 'ai-powered-portfolio-intelligence',
    title: 'AI-Powered Portfolio Intelligence',
    tagline: 'Institutional-Grade Analytics for Strategic Growth and Alpha.',
    description: 'Gain a competitive edge with proprietary, real-time performance analytics and predictive modeling, ensuring full transparency and proactive investment decisions based on deep, actionable market insights.',
    image: IMAGE_PERFORMANCE,
    imagePosition: 'left',
    icon: TrendingUp, // Matches the "Growth/AI" theme
    detailContent: {
      heading: 'Deeper Dive into Predictive Modeling:',
      points: [
        'Real-Time Volatility Monitoring: 24/7 scanning of global markets to detect anomalies and preempt risks.',
        'Custom Risk Profiling: Tailoring exposure levels to your precise mandate and capacity for capital preservation.',
        'Performance Attribution: Clear, granular breakdown of returns by asset, sector, and strategy drivers.',
        'Scenario Analysis: Modeling future portfolio health under various extreme economic and geopolitical conditions.',
        'Cross-Market Correlation Insight: Uncovering hidden, dynamic relationships between seemingly unrelated asset classes.',
        'Sentiment-Driven Adjustment: Incorporating real-time social and news sentiment data for tactical, data-backed shifts.',
        'Forward-Looking Alpha Generation: Identifying mispriced securities based on proprietary AI-driven projections and signals.',
      ]
    }
  },
  {
    id: 'dynamic-multi-asset-allocation',
    title: 'Dynamic Multi-Asset Allocation',
    tagline: 'Maximize Risk-Adjusted Returns with Algorithmic Precision.',
    description: 'Effortlessly optimize your capital structure across diverse asset classes. Our sophisticated algorithms dynamically adjust holdings to maximize risk-adjusted returns and accelerate long-term wealth accumulation with superior efficiency.',
    image: IMAGE_ASSET_ALLOCATION,
    imagePosition: 'right',
    icon: PieChart, // Matches the "Allocation" theme
    detailContent: {
      heading: 'The Engineering Behind Our Allocation:',
      points: [
        'Proprietary Optimization Engine: Utilizing Modern Portfolio Theory (MPT) principles with a dynamic, forward-looking twist.',
        'Global Asset Diversification: Access to uncorrelated assets to strategically dampen systemic and idiosyncratic risk.',
        'Tax-Aware Rebalancing: Smart rebalancing strategies designed to minimize taxable events and enhance after-tax returns.',
        'Liquidity Management: Ensuring optimal portfolio liquidity to meet any planned or unexpected capital needs swiftly.',
        'Sector Rotation Strategy: Automated, data-driven shifts between economic sectors based on real-time macro indicators.',
        'Cost-Efficient Execution: Smart order routing and minimal transaction costs achieved through optimized timing and market access.',
        'Inflation-Protected Strategies: Dedicated and dynamic allocation to real assets and TIPS to maintain purchasing power over time.',
      ]
    }
  },
  {
    id: 'proactive-volatility-risk-modeling',
    title: 'Proactive Volatility & Risk Modeling',
    tagline: 'Superior Capital Preservation Through Predictive Analysis.',
    description: 'Our proprietary AI engine continuously assesses market volatility, identifies potential tail risks, and implements dynamic hedging strategies to protect capital and rigorously maintain your target risk profiles, ensuring stability.',
    image: IMAGE_RISK_MANAGEMENT,
    imagePosition: 'left',
    icon: ShieldCheck, // Matches the "Security/Risk" theme
    detailContent: {
      heading: 'Robust Risk Mitigation Framework:',
      points: [
        'Tail Risk Identification: Advanced machine learning to predict and isolate extreme, non-linear market events.',
        'Dynamic Hedging: Automated adjustments to futures, options, and other derivatives based on shifting market conditions.',
        'Stress Testing: Quarterly simulation against severe historical crises (e.g., 2008, 2020) to validate portfolio resilience.',
        'Model Validation: Independent and continuous audit of all proprietary risk models for accuracy, robustness, and drift.',
        'Counterparty Risk Assessment: Continuous monitoring of exposure and credit quality across all third-party financial institutions.',
        'Regulatory Compliance Scorecard: Ensuring portfolio structure adheres to global financial regulations and fiduciary mandates.',
        'Max Drawdown Control: Implementing automated, hard limits and safeguards to prevent catastrophic portfolio losses in crisis.',
      ]
    }
  }
];
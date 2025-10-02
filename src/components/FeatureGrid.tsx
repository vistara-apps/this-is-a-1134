import React from 'react';
import { Rocket, Shield, Users, Bot, Zap, BarChart3 } from 'lucide-react';

export function FeatureGrid() {
  const features = [
    {
      icon: Rocket,
      title: 'One-Click Deployment',
      description: 'Deploy token + create liquidity pool in a single transaction. No coding required.',
      color: 'text-primary'
    },
    {
      icon: Shield,
      title: 'Anti-Rug Safety',
      description: 'Built-in liquidity locks, vesting schedules, and Fair Launch Certificate.',
      color: 'text-accent'
    },
    {
      icon: Users,
      title: 'Referral Rewards',
      description: 'Earn $OKIE tokens when your referrals trade. Gamified leaderboard system.',
      color: 'text-chart3'
    },
    {
      icon: Bot,
      title: 'AI Community Agent',
      description: '24/7 autonomous agent posts updates and answers community questions.',
      color: 'text-chart4'
    },
    {
      icon: Zap,
      title: 'Farcaster Frames',
      description: 'Trade directly in social feeds. No context switching, 3x higher conversion.',
      color: 'text-warning'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Launch Health Score, holder distribution, and whale activity alerts.',
      color: 'text-success'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className="group bg-surface/50 backdrop-blur-sm rounded-lg p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover hover:scale-105"
          >
            <div className={`inline-flex p-3 rounded-lg bg-surface-hover ${feature.color} mb-4`}>
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
              {feature.title}
            </h3>
            <p className="text-text-muted leading-relaxed">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
import React from 'react';
import { TrendingUp, DollarSign, Users, Zap } from 'lucide-react';

export function StatsGrid() {
  const stats = [
    {
      label: 'Total Volume',
      value: '$45.2M',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-primary'
    },
    {
      label: 'Tokens Launched',
      value: '2,847',
      change: '+23.1%',
      icon: Zap,
      color: 'text-accent'
    },
    {
      label: 'Active Users',
      value: '18.3K',
      change: '+8.7%',
      icon: Users,
      color: 'text-chart3'
    },
    {
      label: 'Success Rate',
      value: '94.2%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-success'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-surface/80 backdrop-blur-sm rounded-lg p-6 border border-border hover:border-primary/30 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-surface-hover ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className={`text-xs font-medium ${stat.color}`}>
                {stat.change}
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
import React from 'react';
import { TrendingUp, DollarSign, Users, Target } from 'lucide-react';

export function MetricsGrid() {
  const metrics = [
    {
      label: 'Total Volume',
      value: '$245.2K',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-primary'
    },
    {
      label: 'Active Launches',
      value: '3',
      change: '+1',
      trend: 'up',
      icon: Target,
      color: 'text-accent'
    },
    {
      label: 'Total Holders',
      value: '1,247',
      change: '+8.7%',
      trend: 'up',
      icon: Users,
      color: 'text-chart3'
    },
    {
      label: 'Avg Health Score',
      value: '87',
      change: '+2.1',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-success'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div
            key={index}
            className="bg-surface/80 backdrop-blur-sm rounded-lg p-6 border border-border hover:border-primary/30 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-surface-hover ${metric.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className={`text-xs font-medium ${
                metric.trend === 'up' ? 'text-success' : 'text-danger'
              }`}>
                {metric.change}
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-sm text-text-muted">{metric.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
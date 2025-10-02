import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Users, Zap } from 'lucide-react';
import { BlockchainService } from '../services/blockchain';
import { LoadingSpinner } from './ui/LoadingSpinner';

export function StatsGrid() {
  const [stats, setStats] = useState([
    {
      label: 'Total Volume',
      value: '$0',
      change: '+0%',
      icon: DollarSign,
      color: 'text-primary'
    },
    {
      label: 'Tokens Launched',
      value: '0',
      change: '+0%',
      icon: Zap,
      color: 'text-accent'
    },
    {
      label: 'Total Trades',
      value: '0',
      change: '+0%',
      icon: TrendingUp,
      color: 'text-chart3'
    },
    {
      label: 'Active Tokens',
      value: '0',
      change: '+0%',
      icon: Users,
      color: 'text-success'
    }
  ]);
  const [loading, setLoading] = useState(true);

  const blockchainService = BlockchainService.getInstance();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const platformStats = await blockchainService.getPlatformStats();
        
        // Format numbers for display
        const formatNumber = (num: number) => {
          if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
          if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
          return num.toString();
        };

        const formatVolume = (volume: string) => {
          const num = parseFloat(volume);
          if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
          if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
          return `$${num.toFixed(2)}`;
        };

        setStats([
          {
            label: 'Total Volume',
            value: formatVolume(platformStats.totalVolume),
            change: '+12.5%', // TODO: Calculate real change
            icon: DollarSign,
            color: 'text-primary'
          },
          {
            label: 'Tokens Launched',
            value: formatNumber(platformStats.totalTokens),
            change: '+23.1%', // TODO: Calculate real change
            icon: Zap,
            color: 'text-accent'
          },
          {
            label: 'Total Trades',
            value: formatNumber(platformStats.totalTrades),
            change: '+15.3%', // TODO: Calculate real change
            icon: TrendingUp,
            color: 'text-chart3'
          },
          {
            label: 'Active Tokens',
            value: formatNumber(platformStats.activeTokens),
            change: '+8.7%', // TODO: Calculate real change
            icon: Users,
            color: 'text-success'
          }
        ]);
      } catch (error) {
        console.error('Error fetching platform stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Refresh stats every 60 seconds
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

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
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <span className={`text-xs font-medium ${stat.color}`}>
                  {stat.change}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">
                {loading ? '...' : stat.value}
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
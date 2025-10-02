import React from 'react';
import { TrendingUp, TrendingDown, Shield, Users, DollarSign } from 'lucide-react';
import { SparklineChart } from './SparklineChart';

interface Launch {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  holders: number;
  healthScore: number;
  isVerified: boolean;
  chartData: number[];
}

interface LaunchCardProps {
  launch: Launch;
  variant?: 'default' | 'featured' | 'compact';
}

export function LaunchCard({ launch, variant = 'default' }: LaunchCardProps) {
  const isPositive = launch.change24h > 0;
  const healthColor = launch.healthScore >= 80 ? 'text-success' : 
                     launch.healthScore >= 60 ? 'text-warning' : 'text-danger';

  const formatPrice = (price: number) => {
    if (price < 0.000001) return price.toFixed(8);
    if (price < 0.001) return price.toFixed(6);
    if (price < 1) return price.toFixed(4);
    return price.toFixed(2);
  };

  const formatNumber = (num: number) => {
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="group bg-surface/80 backdrop-blur-sm rounded-lg border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold">{launch.symbol.charAt(0)}</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-lg">{launch.name}</h3>
                {launch.isVerified && (
                  <Shield className="h-4 w-4 text-primary" />
                )}
              </div>
              <p className="text-text-muted">${launch.symbol}</p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-md text-xs font-medium ${healthColor} bg-surface-hover`}>
            {launch.healthScore}/100
          </div>
        </div>

        {/* Price and Change */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold">${formatPrice(launch.price)}</div>
            <div className={`flex items-center space-x-1 text-sm ${
              isPositive ? 'text-success' : 'text-danger'
            }`}>
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{Math.abs(launch.change24h).toFixed(1)}%</span>
            </div>
          </div>
          <div className="w-24 h-16">
            <SparklineChart 
              data={launch.chartData} 
              color={isPositive ? 'hsl(142, 76%, 36%)' : 'hsl(0, 84%, 60%)'} 
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-text-muted text-xs mb-1">Volume</div>
            <div className="font-semibold">${formatNumber(launch.volume24h)}</div>
          </div>
          <div>
            <div className="text-text-muted text-xs mb-1">Market Cap</div>
            <div className="font-semibold">${formatNumber(launch.marketCap)}</div>
          </div>
          <div>
            <div className="text-text-muted text-xs mb-1">Holders</div>
            <div className="font-semibold">{formatNumber(launch.holders)}</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors text-sm">
            🚀 Ape In
          </button>
          <button className="px-4 py-2 bg-surface-hover hover:bg-border text-text font-medium rounded-lg transition-colors text-sm">
            📊 Stats
          </button>
        </div>
      </div>
    </div>
  );
}
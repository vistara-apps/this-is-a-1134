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
    <div className="group bg-surface/80 backdrop-blur-sm rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover hover:scale-[1.02] overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:shadow-glow transition-all">
              <span className="text-lg font-bold">{launch.symbol.charAt(0)}</span>
              {launch.isVerified && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <Shield className="h-2.5 w-2.5 text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{launch.name}</h3>
              </div>
              <p className="text-text-muted">${launch.symbol}</p>
            </div>
          </div>
          <div className={`px-3 py-1.5 rounded-lg text-xs font-medium ${healthColor} bg-surface-hover border border-border/50`}>
            <div className="text-center">
              <div className="font-bold">{launch.healthScore}</div>
              <div className="text-[10px] opacity-75">HEALTH</div>
            </div>
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
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div className="bg-surface-hover/50 rounded-lg p-2 sm:p-3">
            <div className="text-text-muted text-[10px] sm:text-xs mb-1">Volume</div>
            <div className="font-semibold text-xs sm:text-sm">${formatNumber(launch.volume24h)}</div>
          </div>
          <div className="bg-surface-hover/50 rounded-lg p-2 sm:p-3">
            <div className="text-text-muted text-[10px] sm:text-xs mb-1">Market Cap</div>
            <div className="font-semibold text-xs sm:text-sm">${formatNumber(launch.marketCap)}</div>
          </div>
          <div className="bg-surface-hover/50 rounded-lg p-2 sm:p-3">
            <div className="text-text-muted text-[10px] sm:text-xs mb-1">Holders</div>
            <div className="font-semibold text-xs sm:text-sm">{formatNumber(launch.holders)}</div>
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
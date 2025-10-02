import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export function TrendingTokens() {
  const tokens = [
    {
      symbol: 'PEPAI',
      name: 'PepeAI',
      price: 0.00012,
      change: 45.2,
      volume: 125000
    },
    {
      symbol: 'MOON',
      name: 'MoonCoin',
      price: 0.0034,
      change: 23.7,
      volume: 89000
    },
    {
      symbol: 'SDOGE',
      name: 'SafeDoge',
      price: 0.000056,
      change: -8.3,
      volume: 45000
    },
    {
      symbol: 'ROCKET',
      name: 'RocketCat',
      price: 0.0089,
      change: 156.8,
      volume: 67000
    }
  ];

  const formatPrice = (price: number) => {
    if (price < 0.000001) return price.toFixed(8);
    if (price < 0.001) return price.toFixed(6);
    if (price < 1) return price.toFixed(4);
    return price.toFixed(2);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(1)}M`;
    if (volume >= 1e3) return `$${(volume / 1e3).toFixed(1)}K`;
    return `$${volume}`;
  };

  return (
    <div className="bg-surface/80 backdrop-blur-sm rounded-xl border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Trending Tokens</h3>
      </div>

      <div className="space-y-4">
        {tokens.map((token, index) => (
          <div
            key={token.symbol}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold">{token.symbol.charAt(0)}</span>
              </div>
              <div>
                <div className="font-medium text-sm">{token.symbol}</div>
                <div className="text-xs text-text-muted">{token.name}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-medium text-sm">${formatPrice(token.price)}</div>
              <div className={`flex items-center text-xs ${
                token.change > 0 ? 'text-success' : 'text-danger'
              }`}>
                {token.change > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(token.change).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-muted mb-3">Quick Stats</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Total Volume (24h)</span>
            <span className="font-medium">$326K</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Active Tokens</span>
            <span className="font-medium">24</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Top Gainer</span>
            <span className="font-medium text-success">ROCKET (+156%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
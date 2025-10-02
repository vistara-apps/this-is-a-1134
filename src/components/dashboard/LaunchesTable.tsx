import React from 'react';
import { ExternalLink, TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';

interface LaunchesTableProps {
  showAll?: boolean;
}

export function LaunchesTable({ showAll = false }: LaunchesTableProps) {
  const launches = [
    {
      id: '1',
      name: 'PepeAI',
      symbol: 'PEPAI',
      status: 'live',
      price: 0.00012,
      change24h: 45.2,
      volume24h: 125000,
      holders: 1247,
      healthScore: 95,
      launched: '2024-01-15'
    },
    {
      id: '2',
      name: 'MoonCoin',
      symbol: 'MOON',
      status: 'live',
      price: 0.0034,
      change24h: 23.7,
      volume24h: 89000,
      holders: 892,
      healthScore: 87,
      launched: '2024-01-10'
    },
    {
      id: '3',
      name: 'SafeDoge',
      symbol: 'SDOGE',
      status: 'locked',
      price: 0.000056,
      change24h: -8.3,
      volume24h: 45000,
      holders: 654,
      healthScore: 72,
      launched: '2024-01-05'
    }
  ];

  const displayLaunches = showAll ? launches : launches.slice(0, 3);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'text-success bg-success/20';
      case 'locked': return 'text-warning bg-warning/20';
      case 'paused': return 'text-danger bg-danger/20';
      default: return 'text-text-muted bg-surface-hover';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  return (
    <div className="bg-surface/80 backdrop-blur-sm rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold">
          {showAll ? 'All Launches' : 'Recent Launches'}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-hover">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Token
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                24h Change
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Volume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Holders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Health
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {displayLaunches.map((launch) => (
              <tr key={launch.id} className="hover:bg-surface-hover transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-sm font-bold">{launch.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{launch.name}</div>
                      <div className="text-sm text-text-muted">${launch.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(launch.status)}`}>
                    {launch.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  ${formatPrice(launch.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`flex items-center text-sm ${
                    launch.change24h > 0 ? 'text-success' : 'text-danger'
                  }`}>
                    {launch.change24h > 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(launch.change24h).toFixed(1)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  ${formatNumber(launch.volume24h)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {formatNumber(launch.holders)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${getHealthScoreColor(launch.healthScore)}`}>
                    {launch.healthScore}/100
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-2">
                    <button className="text-text-muted hover:text-text">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    <button className="text-text-muted hover:text-text">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!showAll && launches.length > 3 && (
        <div className="p-4 border-t border-border text-center">
          <button className="text-primary hover:text-primary-hover text-sm font-medium">
            View All Launches
          </button>
        </div>
      )}
    </div>
  );
}
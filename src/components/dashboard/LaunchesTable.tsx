import React, { useState, useEffect } from 'react';
import { ExternalLink, TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';
import { BlockchainService, TokenData } from '../../services/blockchain';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useAccount } from 'wagmi';

interface LaunchesTableProps {
  showAll?: boolean;
}

export function LaunchesTable({ showAll = false }: LaunchesTableProps) {
  const [launches, setLaunches] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { address } = useAccount();
  const blockchainService = BlockchainService.getInstance();

  useEffect(() => {
    const fetchUserTokens = async () => {
      if (!address) {
        setLaunches([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const userTokens = await blockchainService.getUserTokens(address);
        setLaunches(userTokens);
      } catch (err) {
        console.error('Error fetching user tokens:', err);
        setError('Failed to load your tokens');
      } finally {
        setLoading(false);
      }
    };

    fetchUserTokens();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchUserTokens, 30000);
    return () => clearInterval(interval);
  }, [address]);

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

  const getStatusColor = (isVerified: boolean, liquidityLocked: boolean) => {
    if (isVerified && liquidityLocked) return 'text-success bg-success/20';
    if (liquidityLocked) return 'text-warning bg-warning/20';
    return 'text-text-muted bg-surface-hover';
  };

  const getStatusText = (isVerified: boolean, liquidityLocked: boolean) => {
    if (isVerified && liquidityLocked) return 'Live';
    if (liquidityLocked) return 'Locked';
    return 'Pending';
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  if (loading) {
    return (
      <div className="bg-surface/80 backdrop-blur-sm rounded-lg border border-border p-12">
        <div className="flex justify-center items-center">
          <LoadingSpinner size="lg" />
          <span className="ml-3 text-text-muted">Loading your tokens...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-surface/80 backdrop-blur-sm rounded-lg border border-border p-12 text-center">
        <p className="text-danger mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="bg-surface/80 backdrop-blur-sm rounded-lg border border-border p-12 text-center">
        <p className="text-text-muted">Connect your wallet to view your tokens</p>
      </div>
    );
  }

  if (displayLaunches.length === 0) {
    return (
      <div className="bg-surface/80 backdrop-blur-sm rounded-lg border border-border p-12 text-center">
        <p className="text-text-muted mb-4">You haven't launched any tokens yet</p>
        <a
          href="/launch"
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors inline-block"
        >
          Launch Your First Token
        </a>
      </div>
    );
  }

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
            {displayLaunches.map((launch) => {
              const change24h = Math.random() * 100 - 50; // TODO: Get real price change data
              return (
                <tr key={launch.address} className="hover:bg-surface-hover transition-colors">
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
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(launch.isVerified, launch.liquidityLocked)}`}>
                      {getStatusText(launch.isVerified, launch.liquidityLocked)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    ${formatPrice(launch.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center text-sm ${
                      change24h > 0 ? 'text-success' : 'text-danger'
                    }`}>
                      {change24h > 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(change24h).toFixed(1)}%
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
                      <button 
                        className="text-text-muted hover:text-text"
                        onClick={() => window.open(`https://www.okx.com/web3/explorer/xlayer/address/${launch.address}`, '_blank')}
                        title="View on Explorer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                      <button className="text-text-muted hover:text-text">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
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
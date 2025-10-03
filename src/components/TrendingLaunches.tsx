import React, { useState, useEffect } from 'react';
import { LaunchCard } from './LaunchCard';
import { BlockchainService, TokenData } from '../services/blockchain';
import { LoadingSpinner } from './ui/LoadingSpinner';

export function TrendingLaunches() {
  const [launches, setLaunches] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const blockchainService = BlockchainService.getInstance();

  useEffect(() => {
    const fetchTrendingTokens = async () => {
      try {
        setLoading(true);
        setError(null);
        const trendingTokens = await blockchainService.getTrendingTokens();
        setLaunches(trendingTokens.slice(0, 6)); // Show top 6 trending tokens
      } catch (err) {
        console.error('Error fetching trending tokens:', err);
        setError('Failed to load trending tokens');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTokens();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchTrendingTokens, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-text-muted">Loading trending tokens...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
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

  if (launches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">No trending tokens found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {launches.map((launch) => (
        <LaunchCard 
          key={launch.address} 
          launch={{
            id: launch.address,
            name: launch.name,
            symbol: launch.symbol,
            price: launch.price,
            change24h: Math.random() * 100 - 50, // TODO: Get real price change data
            volume24h: launch.volume24h,
            marketCap: launch.marketCap,
            holders: launch.holders,
            healthScore: launch.healthScore,
            isVerified: launch.isVerified,
            chartData: launch.chartData
          }} 
          variant="featured" 
        />
      ))}
    </div>
  );
}
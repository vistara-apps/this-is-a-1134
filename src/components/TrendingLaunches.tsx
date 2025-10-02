import React from 'react';
import { LaunchCard } from './LaunchCard';

export function TrendingLaunches() {
  const launches = [
    {
      id: '1',
      name: 'PepeAI',
      symbol: 'PEPAI',
      price: 0.00012,
      change24h: 45.2,
      volume24h: 125000,
      marketCap: 2500000,
      holders: 1247,
      healthScore: 95,
      isVerified: true,
      chartData: [0.00008, 0.00009, 0.00011, 0.00010, 0.00012, 0.00014, 0.00012]
    },
    {
      id: '2',
      name: 'MoonCoin',
      symbol: 'MOON',
      price: 0.0034,
      change24h: 23.7,
      volume24h: 89000,
      marketCap: 1800000,
      holders: 892,
      healthScore: 87,
      isVerified: true,
      chartData: [0.0028, 0.0029, 0.0031, 0.0032, 0.0034, 0.0036, 0.0034]
    },
    {
      id: '3',
      name: 'SafeDoge',
      symbol: 'SDOGE',
      price: 0.000056,
      change24h: -8.3,
      volume24h: 45000,
      marketCap: 890000,
      holders: 654,
      healthScore: 72,
      isVerified: false,
      chartData: [0.000062, 0.000059, 0.000057, 0.000055, 0.000056, 0.000054, 0.000056]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {launches.map((launch) => (
        <LaunchCard key={launch.id} launch={launch} variant="featured" />
      ))}
    </div>
  );
}
import React from 'react';
import { Users, TrendingUp, DollarSign, Calendar } from 'lucide-react';

export function ReferralTree() {
  const referralData = {
    direct: [
      { username: 'user123', joined: '2024-01-15', volume: 12500, status: 'active' },
      { username: 'trader456', joined: '2024-01-10', volume: 8900, status: 'active' },
      { username: 'builder789', joined: '2024-01-05', volume: 4500, status: 'inactive' }
    ],
    indirect: [
      { username: 'holder321', joined: '2024-01-12', volume: 3200, referrer: 'user123' },
      { username: 'degen654', joined: '2024-01-08', volume: 1800, referrer: 'trader456' },
      { username: 'moon987', joined: '2024-01-03', volume: 900, referrer: 'builder789' }
    ]
  };

  const totalStats = {
    directReferrals: referralData.direct.length,
    indirectReferrals: referralData.indirect.length,
    totalVolume: [...referralData.direct, ...referralData.indirect].reduce((sum, user) => sum + user.volume, 0),
    activeUsers: referralData.direct.filter(user => user.status === 'active').length
  };

  const formatNumber = (num: number) => {
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-success bg-success/20' : 'text-text-muted bg-surface-hover';
  };

  return (
    <div className="space-y-6">
      {/* Network Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface/80 backdrop-blur-sm rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-surface-hover text-primary">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">{totalStats.directReferrals}</div>
            <div className="text-sm text-text-muted">Direct Referrals</div>
          </div>
        </div>

        <div className="bg-surface/80 backdrop-blur-sm rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-surface-hover text-accent">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">{totalStats.indirectReferrals}</div>
            <div className="text-sm text-text-muted">Indirect Referrals</div>
          </div>
        </div>

        <div className="bg-surface/80 backdrop-blur-sm rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-surface-hover text-chart3">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">${formatNumber(totalStats.totalVolume)}</div>
            <div className="text-sm text-text-muted">Network Volume</div>
          </div>
        </div>

        <div className="bg-surface/80 backdrop-blur-sm rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-surface-hover text-success">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">{totalStats.activeUsers}</div>
            <div className="text-sm text-text-muted">Active Users</div>
          </div>
        </div>
      </div>

      {/* Direct Referrals */}
      <div className="bg-surface/80 backdrop-blur-sm rounded-lg border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Direct Referrals (Level 1)</h3>
          <p className="text-text-muted text-sm mt-1">
            Users who joined using your referral link
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {referralData.direct.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-surface-hover rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold">{user.username.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="font-medium">{user.username}</div>
                    <div className="flex items-center space-x-2 text-sm text-text-muted">
                      <Calendar className="h-3 w-3" />
                      <span>Joined {user.joined}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium">${formatNumber(user.volume)}</div>
                    <div className="text-sm text-text-muted">Volume</div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indirect Referrals */}
      <div className="bg-surface/80 backdrop-blur-sm rounded-lg border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Indirect Referrals (Level 2)</h3>
          <p className="text-text-muted text-sm mt-1">
            Users referred by your direct referrals
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {referralData.indirect.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-surface-hover rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-chart3/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold">{user.username.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="font-medium">{user.username}</div>
                    <div className="flex items-center space-x-2 text-sm text-text-muted">
                      <Calendar className="h-3 w-3" />
                      <span>Joined {user.joined}</span>
                      <span>•</span>
                      <span>via {user.referrer}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-medium">${formatNumber(user.volume)}</div>
                  <div className="text-sm text-text-muted">Volume</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network Growth Chart Placeholder */}
      <div className="bg-surface/80 backdrop-blur-sm rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Network Growth</h3>
        <div className="text-center py-12 text-text-muted">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Network growth chart coming soon</p>
        </div>
      </div>
    </div>
  );
}
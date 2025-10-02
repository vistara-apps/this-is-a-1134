import React, { useState } from 'react';
import { Users, DollarSign, TrendingUp, Gift, Copy, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export function ReferralStats() {
  const [referralCode] = useState('OKIE-ABC123');
  const [isClaimingRewards, setIsClaimingRewards] = useState(false);

  const stats = [
    {
      label: 'Total Referrals',
      value: '23',
      change: '+5 this week',
      icon: Users,
      color: 'text-primary'
    },
    {
      label: 'Volume Generated',
      value: '$156.2K',
      change: '+$45K this month',
      icon: DollarSign,
      color: 'text-accent'
    },
    {
      label: 'Pending Rewards',
      value: '2,450 $OKIE',
      change: '+450 this week',
      icon: Gift,
      color: 'text-chart3'
    },
    {
      label: 'Leaderboard Rank',
      value: '#12',
      change: '+3 positions',
      icon: TrendingUp,
      color: 'text-success'
    }
  ];

  const handleCopyReferralLink = () => {
    const link = `https://okielaunch.app/ref/${referralCode}`;
    navigator.clipboard.writeText(link);
    toast.success('Referral link copied to clipboard!');
  };

  const handleClaimRewards = async () => {
    setIsClaimingRewards(true);
    
    try {
      // Simulate claiming rewards
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Successfully claimed 2,450 $OKIE tokens!');
    } catch (error) {
      toast.error('Failed to claim rewards. Please try again.');
    } finally {
      setIsClaimingRewards(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-text-muted">{stat.label}</div>
                <div className={`text-xs font-medium ${stat.color}`}>
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Referral Link */}
      <div className="bg-surface/80 backdrop-blur-sm rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Your Referral Link</h3>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 bg-surface-hover rounded-lg p-3 font-mono text-sm">
            https://okielaunch.app/ref/{referralCode}
          </div>
          <button
            onClick={handleCopyReferralLink}
            className="flex items-center space-x-2 px-4 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
          >
            <Copy className="h-4 w-4" />
            <span>Copy</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-surface-hover hover:bg-border rounded-lg transition-colors">
            <ExternalLink className="h-4 w-4" />
            <span>Share on Farcaster</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-surface-hover hover:bg-border rounded-lg transition-colors">
            <ExternalLink className="h-4 w-4" />
            <span>Share on Telegram</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-surface-hover hover:bg-border rounded-lg transition-colors">
            <ExternalLink className="h-4 w-4" />
            <span>Share on Discord</span>
          </button>
        </div>
      </div>

      {/* Claim Rewards */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Claim Your Rewards</h3>
            <p className="text-text-muted">
              You have 2,450 $OKIE tokens ready to claim from your referral activity.
            </p>
          </div>
          
          <button
            onClick={handleClaimRewards}
            disabled={isClaimingRewards}
            className="flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200"
          >
            <Gift className="h-5 w-5" />
            <span>
              {isClaimingRewards ? 'Claiming...' : 'Claim Rewards'}
            </span>
          </button>
        </div>
        
        {isClaimingRewards && (
          <div className="mt-4">
            <div className="text-sm text-text-muted mb-2">Processing transaction...</div>
            <div className="w-full bg-surface-hover rounded-full h-2">
              <div className="bg-primary h-2 rounded-full animate-pulse w-2/3"></div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-surface/80 backdrop-blur-sm rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Referral Activity</h3>
        
        <div className="space-y-4">
          {[
            { user: 'user123', action: 'launched PepeAI', reward: '125 $OKIE', time: '2 hours ago' },
            { user: 'trader456', action: 'swapped 5 ETH', reward: '89 $OKIE', time: '1 day ago' },
            { user: 'builder789', action: 'launched MoonCoin', reward: '156 $OKIE', time: '3 days ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
              <div>
                <div className="font-medium text-sm">
                  {activity.user} {activity.action}
                </div>
                <div className="text-xs text-text-muted">
                  {activity.time}
                </div>
              </div>
              <div className="text-sm font-medium text-primary">
                +{activity.reward}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
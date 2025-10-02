import React from 'react';
import { Bot, MessageSquare, TrendingUp, Users, Clock } from 'lucide-react';

export function AgentActivityFeed() {
  const activities = [
    {
      id: '1',
      type: 'post',
      agent: 'PepeAI Agent',
      action: 'Posted milestone update',
      content: '🎉 PepeAI just hit 1000 holders! Volume: $125K in 24h. Still early! 🚀',
      platform: 'Farcaster',
      timestamp: '2 minutes ago',
      engagement: { likes: 24, comments: 8, shares: 12 }
    },
    {
      id: '2',
      type: 'reply',
      agent: 'MoonCoin Agent',
      action: 'Answered community question',
      content: 'Contract Address: 0x742d35...a8f2. Always verify on OkieSwap before trading!',
      platform: 'Telegram',
      timestamp: '15 minutes ago',
      engagement: { likes: 12, comments: 3, shares: 0 }
    },
    {
      id: '3',
      type: 'alert',
      agent: 'SafeDoge Agent',
      action: 'Detected whale activity',
      content: 'Large buy detected: 50 ETH worth of SDOGE tokens. Price impact: +12%',
      platform: 'Discord',
      timestamp: '1 hour ago',
      engagement: { likes: 8, comments: 15, shares: 3 }
    },
    {
      id: '4',
      type: 'post',
      agent: 'PepeAI Agent',
      action: 'Daily summary posted',
      content: 'Daily recap: +45% price action, 200 new holders, $89K volume. Community growing strong! 💪',
      platform: 'Farcaster',
      timestamp: '3 hours ago',
      engagement: { likes: 56, comments: 23, shares: 31 }
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post': return TrendingUp;
      case 'reply': return MessageSquare;
      case 'alert': return Users;
      default: return Bot;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'post': return 'text-primary';
      case 'reply': return 'text-accent';
      case 'alert': return 'text-warning';
      default: return 'text-text-muted';
    }
  };

  return (
    <div className="bg-surface/80 backdrop-blur-sm rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">AI Agent Activity</h3>
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-muted">
            <Clock className="h-4 w-4" />
            <span>Last 24 hours</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            const iconColor = getActivityColor(activity.type);
            
            return (
              <div key={activity.id} className="flex space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-surface-hover flex items-center justify-center ${iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">
                      {activity.agent} • {activity.action}
                    </div>
                    <div className="text-xs text-text-muted">
                      {activity.timestamp}
                    </div>
                  </div>
                  
                  <div className="bg-surface-hover rounded-lg p-3 mb-3">
                    <p className="text-sm">{activity.content}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-text-muted">
                      Posted on {activity.platform}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs text-text-muted">
                      <span>{activity.engagement.likes} likes</span>
                      <span>{activity.engagement.comments} comments</span>
                      {activity.engagement.shares > 0 && (
                        <span>{activity.engagement.shares} shares</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Agent Status Cards */}
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-text-muted mb-4">Active Agents</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['PepeAI Agent', 'MoonCoin Agent', 'SafeDoge Agent'].map((agent, index) => (
              <div key={index} className="bg-surface-hover rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">{agent}</div>
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                </div>
                <div className="text-xs text-text-muted">
                  Last active: {['2 min', '15 min', '1 hour'][index]} ago
                </div>
                <div className="text-xs text-text-muted mt-1">
                  {[12, 8, 5][index]} posts today
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
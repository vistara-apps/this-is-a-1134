import React from 'react';
import { Bot, MessageSquare, Clock, Zap } from 'lucide-react';
import { LaunchData } from '../LaunchWizard';

interface AIAgentStepProps {
  data: LaunchData;
  updateData: (updates: Partial<LaunchData>) => void;
}

export function AIAgentStep({ data, updateData }: AIAgentStepProps) {
  const personalities = [
    {
      id: 'casual' as const,
      name: 'Casual',
      description: 'Friendly and approachable, uses memes and emojis',
      example: "Yo! 🚀 We just hit 100 holders! LFG fam! 💎🙌"
    },
    {
      id: 'professional' as const,
      name: 'Professional',
      description: 'Formal and informative, focuses on metrics and updates',
      example: "Milestone achieved: 100 token holders. Current volume: $12K in 24h."
    },
    {
      id: 'degen' as const,
      name: 'Degen',
      description: 'High energy crypto native, uses slang and CAPS',
      example: "100 HODLERS AND WE\'RE JUST GETTING STARTED!!! 🔥 WAGMI 💪"
    }
  ];

  const frequencies = [
    { id: 'hourly' as const, name: 'Hourly', description: 'Regular updates every hour' },
    { id: 'daily' as const, name: 'Daily', description: 'Daily summaries and highlights' },
    { id: 'milestone' as const, name: 'Milestone Only', description: 'Posts only on achievements' }
  ];

  const channels = [
    { id: 'farcaster', name: 'Farcaster', icon: MessageSquare },
    { id: 'telegram', name: 'Telegram', icon: MessageSquare },
    { id: 'discord', name: 'Discord', icon: MessageSquare }
  ];

  const toggleChannel = (channelId: string) => {
    const current = data.enabledChannels;
    const updated = current.includes(channelId)
      ? current.filter(id => id !== channelId)
      : [...current, channelId];
    updateData({ enabledChannels: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Configure your AI community agent</h3>
        <p className="text-text-muted">
          Your AI agent will autonomously manage community engagement, post updates, and answer questions 24/7.
        </p>
      </div>

      {/* Agent Personality */}
      <div>
        <label className="block text-sm font-medium mb-3">Agent Personality</label>
        <div className="space-y-3">
          {personalities.map((personality) => (
            <button
              key={personality.id}
              onClick={() => updateData({ agentPersonality: personality.id })}
              className={`w-full p-4 rounded-lg border text-left transition-all ${
                data.agentPersonality === personality.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-surface hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Bot className="h-4 w-4 text-primary" />
                <span className="font-semibold">{personality.name}</span>
              </div>
              <p className="text-sm text-text-muted mb-2">{personality.description}</p>
              <div className="bg-surface-hover rounded p-2 text-xs font-mono">
                {personality.example}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Post Frequency */}
      <div>
        <label className="block text-sm font-medium mb-3">Post Frequency</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {frequencies.map((frequency) => (
            <button
              key={frequency.id}
              onClick={() => updateData({ postFrequency: frequency.id })}
              className={`p-4 rounded-lg border text-left transition-all ${
                data.postFrequency === frequency.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-surface hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-semibold">{frequency.name}</span>
              </div>
              <p className="text-sm text-text-muted">{frequency.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Enabled Channels */}
      <div>
        <label className="block text-sm font-medium mb-3">Enabled Channels</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const isEnabled = data.enabledChannels.includes(channel.id);
            
            return (
              <button
                key={channel.id}
                onClick={() => toggleChannel(channel.id)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  isEnabled
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-surface hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="font-semibold">{channel.name}</span>
                  {isEnabled && (
                    <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-text-muted text-xs mt-2">
          Select where your AI agent should post updates and engage with community
        </p>
      </div>

      {/* Agent Preview */}
      <div className="bg-surface-hover rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="h-5 w-5 text-accent" />
          <h4 className="font-semibold">Agent Configuration Summary</h4>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">Personality:</span>
            <span className="font-medium capitalize">{data.agentPersonality}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Post Frequency:</span>
            <span className="font-medium capitalize">{data.postFrequency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Active Channels:</span>
            <span className="font-medium">{data.enabledChannels.length}</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-surface rounded-lg">
          <p className="text-xs text-text-muted mb-2">Sample post:</p>
          <p className="text-sm">
            {data.agentPersonality === 'casual' && "Just launched! 🚀 Join our growing community and let's moon together! 💎"}
            {data.agentPersonality === 'professional' && "Token successfully deployed. Initial liquidity: 1 ETH. Community building phase initiated."}
            {data.agentPersonality === 'degen' && "WE'RE LIVE!!! 🔥🔥🔥 GET IN EARLY BEFORE WE 100X!!! 💪🚀"}
          </p>
        </div>
      </div>
    </div>
  );
}
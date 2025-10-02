import React from 'react';
import { Upload, Sparkles } from 'lucide-react';
import { LaunchData } from '../LaunchWizard';

interface TokenBasicsStepProps {
  data: LaunchData;
  updateData: (updates: Partial<LaunchData>) => void;
}

export function TokenBasicsStep({ data, updateData }: TokenBasicsStepProps) {
  const trendingNames = ['PepeAI', 'MoonCoin', 'SafeDoge', 'RocketCat', 'DiamondHands'];
  
  const suggestName = () => {
    const randomName = trendingNames[Math.floor(Math.random() * trendingNames.length)];
    updateData({ name: randomName, symbol: randomName.toUpperCase().slice(0, 6) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tell us about your token</h3>
        <p className="text-text-muted">
          Basic information that will be displayed to your community and potential investors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Token Name</label>
          <div className="relative">
            <input
              type="text"
              value={data.name}
              onChange={(e) => updateData({ name: e.target.value })}
              placeholder="e.g. Awesome Token"
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
            />
            <button
              onClick={suggestName}
              className="absolute right-3 top-3 text-accent hover:text-accent-hover transition-colors"
              title="Generate random name"
            >
              <Sparkles className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Symbol</label>
          <input
            type="text"
            value={data.symbol}
            onChange={(e) => updateData({ symbol: e.target.value.toUpperCase() })}
            placeholder="e.g. AWESOME"
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Total Supply</label>
        <input
          type="number"
          value={data.supply}
          onChange={(e) => updateData({ supply: e.target.value })}
          placeholder="1000000"
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
        />
        <p className="text-text-muted text-xs mt-1">
          Total number of tokens that will ever exist
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => updateData({ description: e.target.value })}
          placeholder="What makes your token special? Tell your community about your vision..."
          rows={4}
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Logo (Optional)</label>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
          <Upload className="h-8 w-8 text-text-muted mx-auto mb-2" />
          <p className="text-text-muted">
            Drop your logo here or click to browse
          </p>
          <p className="text-xs text-text-muted mt-1">
            PNG, JPG up to 5MB. Recommended: 256x256px
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => updateData({ logo: e.target.files?.[0] })}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
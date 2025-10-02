import React from 'react';
import { Calculator, Info } from 'lucide-react';
import { LaunchData } from '../LaunchWizard';

interface PricingStepProps {
  data: LaunchData;
  updateData: (updates: Partial<LaunchData>) => void;
}

export function PricingStep({ data, updateData }: PricingStepProps) {
  const marketCap = parseFloat(data.initialPrice) * parseFloat(data.supply);
  const potentialHolders = Math.floor(marketCap / 50); // Estimate based on $50 avg investment

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Set your pricing strategy</h3>
        <p className="text-text-muted">
          Configure initial price and liquidity amount. These settings determine your token's market cap and trading stability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Initial Price (ETH)</label>
          <input
            type="number"
            step="0.000001"
            value={data.initialPrice}
            onChange={(e) => updateData({ initialPrice: e.target.value })}
            placeholder="0.0001"
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
          />
          <p className="text-text-muted text-xs mt-1">
            Price per token at launch
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Liquidity Amount (ETH)</label>
          <input
            type="number"
            step="0.1"
            value={data.liquidityAmount}
            onChange={(e) => updateData({ liquidityAmount: e.target.value })}
            placeholder="1"
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
          />
          <p className="text-text-muted text-xs mt-1">
            ETH to provide as initial liquidity
          </p>
        </div>
      </div>

      {/* Market Cap Calculator */}
      <div className="bg-surface-hover rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Calculator className="h-5 w-5 text-accent" />
          <h4 className="font-semibold">Launch Calculations</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              ${marketCap.toLocaleString()}
            </div>
            <div className="text-sm text-text-muted">Initial Market Cap</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {potentialHolders.toLocaleString()}
            </div>
            <div className="text-sm text-text-muted">Potential Holders</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-chart3">
              {(parseFloat(data.liquidityAmount) * 2000).toLocaleString()}
            </div>
            <div className="text-sm text-text-muted">Liquidity Value ($)</div>
          </div>
        </div>
      </div>

      {/* Pricing Tips */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-primary mb-2">Pricing Tips</h4>
            <ul className="text-sm text-text-muted space-y-1">
              <li>• Lower initial price = more room for growth</li>
              <li>• Higher liquidity = more stable trading</li>
              <li>• Target $10K-100K initial market cap for memecoins</li>
              <li>• Consider 1-5 ETH liquidity for serious projects</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
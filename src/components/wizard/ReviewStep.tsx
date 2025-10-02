import React from 'react';
import { CheckCircle, AlertCircle, Rocket, DollarSign } from 'lucide-react';
import { LaunchData } from '../LaunchWizard';

interface ReviewStepProps {
  data: LaunchData;
  updateData: (updates: Partial<LaunchData>) => void;
  onLaunch: () => void;
  isLaunching: boolean;
}

export function ReviewStep({ data, updateData, onLaunch, isLaunching }: ReviewStepProps) {
  const marketCap = parseFloat(data.initialPrice) * parseFloat(data.supply);
  const liquidityValue = parseFloat(data.liquidityAmount) * 2000; // Assuming ETH = $2000
  const safetyScore = 70 + (data.lockDuration >= 90 ? 25 : data.lockDuration >= 30 ? 15 : 5) + (data.teamVesting ? 20 : 0);
  
  const feeBreakdown = {
    platformFee: liquidityValue * 0.03, // 3% of liquidity
    gasFee: 0.005 * 2000, // ~0.005 ETH in USD
    total: liquidityValue * 0.03 + (0.005 * 2000)
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Review your token launch</h3>
        <p className="text-text-muted">
          Double-check all settings before launching. Once deployed, some settings cannot be changed.
        </p>
      </div>

      {/* Token Summary */}
      <div className="bg-surface-hover rounded-lg p-6">
        <h4 className="font-semibold mb-4 flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-success" />
          <span>Token Details</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-muted">Name:</span>
              <span className="font-medium">{data.name || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Symbol:</span>
              <span className="font-medium">${data.symbol || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Total Supply:</span>
              <span className="font-medium">{parseInt(data.supply).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-muted">Initial Price:</span>
              <span className="font-medium">{data.initialPrice} ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Market Cap:</span>
              <span className="font-medium">${marketCap.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Liquidity:</span>
              <span className="font-medium">{data.liquidityAmount} ETH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Settings */}
      <div className="bg-surface-hover rounded-lg p-6">
        <h4 className="font-semibold mb-4 flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-success" />
          <span>Safety Configuration</span>
        </h4>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">Liquidity Lock:</span>
            <span className="font-medium">{data.lockDuration} days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Team Vesting:</span>
            <span className="font-medium">{data.teamVesting ? 'Enabled' : 'Disabled'}</span>
          </div>
          {data.teamVesting && (
            <div className="flex justify-between">
              <span className="text-text-muted">Vesting Cliff:</span>
              <span className="font-medium">{data.vestingCliff} days</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="text-text-muted">Safety Score:</span>
            <span className={`font-bold ${
              safetyScore >= 80 ? 'text-success' : 
              safetyScore >= 60 ? 'text-warning' : 'text-danger'
            }`}>
              {safetyScore}/100
            </span>
          </div>
        </div>
      </div>

      {/* AI Agent */}
      <div className="bg-surface-hover rounded-lg p-6">
        <h4 className="font-semibold mb-4 flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-success" />
          <span>AI Agent Settings</span>
        </h4>
        
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
            <span className="text-text-muted">Channels:</span>
            <span className="font-medium">{data.enabledChannels.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-surface-hover rounded-lg p-6">
        <h4 className="font-semibold mb-4 flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-accent" />
          <span>Fee Breakdown</span>
        </h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">Platform Fee (3%):</span>
            <span className="font-medium">${feeBreakdown.platformFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Gas Fee (est.):</span>
            <span className="font-medium">${feeBreakdown.gasFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-border">
            <span className="font-semibold">Total Cost:</span>
            <span className="font-bold text-primary">${feeBreakdown.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Launch Button */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-2">Ready to launch?</h4>
          <p className="text-text-muted text-sm mb-6">
            Your token will be deployed and trading will begin immediately after confirmation.
          </p>
          
          <button
            onClick={onLaunch}
            disabled={isLaunching || !data.name || !data.symbol}
            className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 shadow-glow hover:shadow-card-hover transform hover:scale-105"
          >
            <Rocket className="h-5 w-5 mr-2" />
            {isLaunching ? 'Launching...' : 'Launch Token Now'}
          </button>
          
          {isLaunching && (
            <div className="mt-4">
              <div className="text-sm text-text-muted mb-2">Transaction in progress...</div>
              <div className="w-full bg-surface-hover rounded-full h-2">
                <div className="bg-primary h-2 rounded-full animate-pulse w-2/3"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Warnings */}
      {safetyScore < 80 && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-warning mb-2">Safety Score Warning</h4>
              <p className="text-sm text-text-muted">
                Your safety score is below 80. Consider enabling longer liquidity lock or team vesting 
                to increase investor confidence and potential trading volume.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
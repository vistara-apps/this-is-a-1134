import React from 'react';
import { Shield, Lock, Clock, AlertTriangle } from 'lucide-react';
import { LaunchData } from '../LaunchWizard';

interface SafetyStepProps {
  data: LaunchData;
  updateData: (updates: Partial<LaunchData>) => void;
}

export function SafetyStep({ data, updateData }: SafetyStepProps) {
  const lockOptions = [
    { days: 30, label: '30 Days', description: 'Basic protection' },
    { days: 90, label: '90 Days', description: 'Standard protection' },
    { days: 365, label: '1 Year', description: 'Maximum trust' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Configure safety features</h3>
        <p className="text-text-muted">
          These settings build trust with your community and prevent rug pulls. Higher safety scores attract more investors.
        </p>
      </div>

      {/* Liquidity Lock Duration */}
      <div>
        <label className="block text-sm font-medium mb-3">Liquidity Lock Duration</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lockOptions.map((option) => (
            <button
              key={option.days}
              onClick={() => updateData({ lockDuration: option.days })}
              className={`p-4 rounded-lg border text-left transition-all ${
                data.lockDuration === option.days
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-surface hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Lock className="h-4 w-4 text-primary" />
                <span className="font-semibold">{option.label}</span>
              </div>
              <p className="text-sm text-text-muted">{option.description}</p>
            </button>
          ))}
        </div>
        <p className="text-text-muted text-xs mt-2">
          Liquidity will be locked for this duration, preventing removal and ensuring trading stability.
        </p>
      </div>

      {/* Team Token Vesting */}
      <div>
        <div className="flex items-center space-x-3 mb-3">
          <input
            type="checkbox"
            id="teamVesting"
            checked={data.teamVesting}
            onChange={(e) => updateData({ teamVesting: e.target.checked })}
            className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary"
          />
          <label htmlFor="teamVesting" className="text-sm font-medium">
            Enable Team Token Vesting
          </label>
        </div>
        
        {data.teamVesting && (
          <div className="ml-7 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Vesting Cliff (Days)</label>
              <input
                type="number"
                value={data.vestingCliff}
                onChange={(e) => updateData({ vestingCliff: parseInt(e.target.value) })}
                min="0"
                max="365"
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
              />
              <p className="text-text-muted text-xs mt-1">
                Team tokens will be locked for this many days before vesting starts
              </p>
            </div>
          </div>
        )}
        
        <p className="text-text-muted text-xs mt-2">
          Prevents team from dumping tokens immediately after launch
        </p>
      </div>

      {/* Safety Score Preview */}
      <div className="bg-surface-hover rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="h-5 w-5 text-success" />
          <h4 className="font-semibold">Safety Score Preview</h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Liquidity Lock</span>
            <span className={`text-sm font-medium ${
              data.lockDuration >= 90 ? 'text-success' : 
              data.lockDuration >= 30 ? 'text-warning' : 'text-danger'
            }`}>
              {data.lockDuration >= 90 ? '25/25' : 
               data.lockDuration >= 30 ? '15/25' : '5/25'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Team Vesting</span>
            <span className={`text-sm font-medium ${data.teamVesting ? 'text-success' : 'text-warning'}`}>
              {data.teamVesting ? '20/20' : '0/20'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Contract Verification</span>
            <span className="text-sm font-medium text-success">25/25</span>
          </div>
          
          <div className="border-t border-border pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Safety Score</span>
              <span className="text-lg font-bold text-primary">
                {70 + (data.lockDuration >= 90 ? 25 : data.lockDuration >= 30 ? 15 : 5) + (data.teamVesting ? 20 : 0)}/100
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Warning for low safety */}
      {(70 + (data.lockDuration >= 90 ? 25 : data.lockDuration >= 30 ? 15 : 5) + (data.teamVesting ? 20 : 0)) < 80 && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-warning mb-2">Low Safety Score</h4>
              <p className="text-sm text-text-muted">
                Consider enabling longer liquidity lock and team vesting to increase investor confidence.
                Projects with 80+ safety scores get 3x more volume on average.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
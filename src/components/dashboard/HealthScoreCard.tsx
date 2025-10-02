import React from 'react';
import { Shield, TrendingUp, AlertTriangle } from 'lucide-react';

export function HealthScoreCard() {
  const healthData = {
    overall: 87,
    factors: [
      { name: 'Liquidity Stability', score: 95, trend: 'up' },
      { name: 'Holder Distribution', score: 80, trend: 'stable' },
      { name: 'Trade Volume', score: 90, trend: 'up' },
      { name: 'Lock Duration', score: 100, trend: 'stable' },
      { name: 'Community Engagement', score: 75, trend: 'down' }
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-3 w-3 text-success" />;
    if (trend === 'down') return <AlertTriangle className="h-3 w-3 text-danger" />;
    return <div className="w-3 h-3" />;
  };

  return (
    <div className="bg-surface/80 backdrop-blur-sm rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Launch Health Score</h3>
      </div>

      {/* Overall Score */}
      <div className="text-center mb-6">
        <div className={`text-4xl font-bold ${getScoreColor(healthData.overall)}`}>
          {healthData.overall}
        </div>
        <div className="text-text-muted text-sm">Overall Health Score</div>
        <div className="w-full bg-surface-hover rounded-full h-2 mt-3">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${healthData.overall}%` }}
          />
        </div>
      </div>

      {/* Factor Breakdown */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-text-muted">Score Breakdown</h4>
        {healthData.factors.map((factor, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm">{factor.name}</span>
              {getTrendIcon(factor.trend)}
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-surface-hover rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    factor.score >= 80 ? 'bg-success' : 
                    factor.score >= 60 ? 'bg-warning' : 'bg-danger'
                  }`}
                  style={{ width: `${factor.score}%` }}
                />
              </div>
              <span className={`text-sm font-medium ${getScoreColor(factor.score)}`}>
                {factor.score}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-primary/10 rounded-lg">
        <h4 className="text-sm font-medium text-primary mb-2">Improvement Tips</h4>
        <ul className="text-xs text-text-muted space-y-1">
          <li>• Increase community engagement through regular updates</li>
          <li>• Monitor for whale activity and large transactions</li>
          <li>• Maintain consistent trading volume</li>
        </ul>
      </div>
    </div>
  );
}
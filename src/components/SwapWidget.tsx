import React, { useState } from 'react';
import { ArrowUpDown, Settings, AlertTriangle, Zap, TrendingUp } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export function SwapWidget() {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('PEPAI');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [isSwapping, setIsSwapping] = useState(false);

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', balance: '2.5', price: 2000 },
    { symbol: 'PEPAI', name: 'PepeAI', balance: '0', price: 0.00012 },
    { symbol: 'MOON', name: 'MoonCoin', balance: '1000', price: 0.0034 },
    { symbol: 'SDOGE', name: 'SafeDoge', balance: '500', price: 0.000056 }
  ];

  const fromTokenData = tokens.find(t => t.symbol === fromToken);
  const toTokenData = tokens.find(t => t.symbol === toToken);

  const calculateToAmount = (amount: string) => {
    if (!amount || !fromTokenData || !toTokenData) return '';
    const fromValue = parseFloat(amount) * fromTokenData.price;
    const toTokens = fromValue / toTokenData.price;
    return toTokens.toFixed(6);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateToAmount(value));
  };

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount('');
    setToAmount('');
  };

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsSwapping(true);
    
    try {
      // Simulate swap transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`Swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`);
      setFromAmount('');
      setToAmount('');
    } catch (error) {
      toast.error('Swap failed. Please try again.');
    } finally {
      setIsSwapping(false);
    }
  };

  const priceImpact = fromAmount ? Math.min(parseFloat(fromAmount) * 0.1, 5) : 0;

  return (
    <Card variant="glass" padding="lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Swap Tokens</h2>
        <button className="p-2 hover:bg-surface-hover rounded-lg transition-colors">
          <Settings className="h-5 w-5 text-text-muted" />
        </button>
      </div>

      {/* From Token */}
      <div className="bg-surface-hover rounded-lg p-4 mb-2">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-text-muted">From</span>
          <span className="text-sm text-text-muted">
            Balance: {fromTokenData?.balance || '0'}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => handleFromAmountChange(e.target.value)}
            placeholder="0.0"
            className="flex-1 text-2xl font-semibold bg-transparent border-none outline-none"
          />
          
          <select
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
            className="bg-surface border border-border rounded-lg px-3 py-2 text-sm font-medium"
          >
            {tokens.map(token => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
        
        {fromAmount && fromTokenData && (
          <div className="text-sm text-text-muted mt-2">
            ≈ ${(parseFloat(fromAmount) * fromTokenData.price).toFixed(2)}
          </div>
        )}
      </div>

      {/* Swap Button */}
      <div className="flex justify-center -my-1 relative z-10">
        <motion.button
          onClick={handleSwapTokens}
          className="p-3 bg-surface border border-border rounded-full hover:bg-surface-hover transition-colors shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUpDown className="h-5 w-5" />
        </motion.button>
      </div>

      {/* To Token */}
      <div className="bg-surface-hover rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-text-muted">To</span>
          <span className="text-sm text-text-muted">
            Balance: {toTokenData?.balance || '0'}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="number"
            value={toAmount}
            readOnly
            placeholder="0.0"
            className="flex-1 text-2xl font-semibold bg-transparent border-none outline-none text-text-muted"
          />
          
          <select
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
            className="bg-surface border border-border rounded-lg px-3 py-2 text-sm font-medium"
          >
            {tokens.map(token => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
        
        {toAmount && toTokenData && (
          <div className="text-sm text-text-muted mt-2">
            ≈ ${(parseFloat(toAmount) * toTokenData.price).toFixed(2)}
          </div>
        )}
      </div>

      {/* Swap Details */}
      {fromAmount && toAmount && (
        <div className="bg-surface-hover rounded-lg p-4 mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Price Impact</span>
            <span className={priceImpact > 3 ? 'text-danger' : 'text-text'}>
              {priceImpact.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Slippage Tolerance</span>
            <span>{slippage}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Minimum Received</span>
            <span>
              {(parseFloat(toAmount) * (1 - slippage / 100)).toFixed(6)} {toToken}
            </span>
          </div>
        </div>
      )}

      {/* Price Impact Warning */}
      {priceImpact > 3 && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-6">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-sm text-warning font-medium">High Price Impact</span>
          </div>
          <p className="text-xs text-text-muted mt-1">
            This trade will significantly move the price. Consider reducing the amount.
          </p>
        </div>
      )}

      {/* Swap Button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleSwap}
        disabled={!fromAmount || !toAmount}
        loading={isSwapping}
        icon={<Zap className="h-5 w-5" />}
        iconPosition="left"
      >
        {isSwapping ? 'Swapping...' : `Swap ${fromToken} for ${toToken}`}
      </Button>

      {/* Gas Fee */}
      <div className="text-center text-xs text-text-muted mt-3">
        Estimated gas fee: ~$2.50 (0.00125 ETH)
      </div>
    </Card>
  );
}
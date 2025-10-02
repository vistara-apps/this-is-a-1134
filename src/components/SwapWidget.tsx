import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Settings, AlertTriangle, Zap, TrendingUp } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { useSwap, useTokenBalance } from '../hooks/useSwap';
import { useAccount, useBalance } from 'wagmi';
import { BlockchainService, TokenData } from '../services/blockchain';
import { usePriceUpdates } from '../hooks/useWebSocket';
import { Address } from 'viem';
import toast from 'react-hot-toast';

export function SwapWidget() {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('OKIECAT');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [isSwapping, setIsSwapping] = useState(false);
  const [quote, setQuote] = useState<any>(null);
  const [availableTokens, setAvailableTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { address, isConnected } = useAccount();
  const { swapETHForTokens, swapTokensForETH, isPending, isConfirming, isSuccess } = useSwap();
  const blockchainService = BlockchainService.getInstance();
  
  // Get real-time price updates for the selected token
  const priceUpdate = usePriceUpdates(
    toToken !== 'ETH' ? availableTokens.find(t => t.symbol === toToken)?.address : undefined
  );

  // Load available tokens from the API
  useEffect(() => {
    const loadTokens = async () => {
      try {
        setLoading(true);
        const { tokens } = await blockchainService.getAllTokens({ 
          pageSize: 20, 
          sort: 'volume',
          order: 'desc' 
        });
        
        // Add ETH as the first option
        const ethToken: TokenData = {
          address: '0x0000000000000000000000000000000000000000' as Address,
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          totalSupply: BigInt(0),
          creator: '0x0000000000000000000000000000000000000000' as Address,
          createdAt: 0,
          price: 2000, // This would come from a price feed
          marketCap: 0,
          volume24h: 0,
          holders: 0,
          healthScore: 100,
          isVerified: true,
          liquidityLocked: false,
          chartData: []
        };
        
        setAvailableTokens([ethToken, ...tokens]);
      } catch (error) {
        console.error('Error loading tokens:', error);
        toast.error('Failed to load available tokens');
      } finally {
        setLoading(false);
      }
    };

    loadTokens();
  }, []);

  const tokens = availableTokens.map(token => ({
    symbol: token.symbol,
    name: token.name,
    address: token.address,
    balance: '0', // TODO: Get real balance
    price: priceUpdate && token.address === priceUpdate.tokenAddress ? priceUpdate.price : token.price,
    decimals: token.decimals
  }));

  const fromTokenData = tokens.find(t => t.symbol === fromToken);
  const toTokenData = tokens.find(t => t.symbol === toToken);

  const calculateToAmount = (amount: string) => {
    if (!amount || !fromTokenData || !toTokenData) return '';
    const fromValue = parseFloat(amount) * fromTokenData.price;
    const toTokens = fromValue / toTokenData.price;
    return toTokens.toFixed(6);
  };

  const handleFromAmountChange = async (value: string) => {
    setFromAmount(value);
    
    if (value && fromTokenData && toTokenData && parseFloat(value) > 0) {
      try {
        const quote = await blockchainService.getSwapQuote(
          fromTokenData.address,
          toTokenData.address,
          value,
          slippage
        );
        
        if (quote) {
          setToAmount(quote.amountOut);
          setQuote(quote);
        } else {
          setToAmount(calculateToAmount(value));
        }
      } catch (error) {
        console.error('Error getting quote:', error);
        setToAmount(calculateToAmount(value));
      }
    } else {
      setToAmount('');
      setQuote(null);
    }
  };

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount('');
    setToAmount('');
  };

  const handleSwap = async () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!fromTokenData || !toTokenData) {
      toast.error('Invalid token selection');
      return;
    }

    setIsSwapping(true);
    
    try {
      toast.loading('Executing swap...', { id: 'swap' });

      let result;
      if (fromToken === 'ETH') {
        // Swapping ETH for tokens
        result = await blockchainService.executeSwap(
          fromTokenData.address,
          toTokenData.address,
          fromAmount,
          slippage
        );
      } else if (toToken === 'ETH') {
        // Swapping tokens for ETH
        result = await blockchainService.executeSwap(
          fromTokenData.address,
          toTokenData.address,
          fromAmount,
          slippage
        );
      } else {
        // Token to token swap (through ETH)
        result = await blockchainService.executeSwap(
          fromTokenData.address,
          toTokenData.address,
          fromAmount,
          slippage
        );
      }

      if (result.success) {
        toast.success(`✅ Swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`, { id: 'swap' });
        setFromAmount('');
        setToAmount('');
        setQuote(null);
      } else {
        throw new Error(result.error || 'Swap failed');
      }
    } catch (error) {
      console.error('Swap error:', error);
      toast.error(error instanceof Error ? error.message : 'Swap failed. Please try again.', { id: 'swap' });
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
import { Address, formatEther, formatUnits } from 'viem';
import { LaunchData } from '../components/LaunchWizard';
import { XLayerAPIService, OkieTokenData } from './xlayer-api';

export interface TokenData {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: bigint;
  creator: Address;
  createdAt: number;
  price: number;
  marketCap: number;
  volume24h: number;
  holders: number;
  healthScore: number;
  isVerified: boolean;
  liquidityLocked: boolean;
  lockDuration?: number;
}

export interface SwapQuote {
  amountIn: string;
  amountOut: string;
  priceImpact: number;
  minimumReceived: string;
  route: Address[];
  gasEstimate: bigint;
}

export class BlockchainService {
  private static instance: BlockchainService;
  private xlayerAPI: XLayerAPIService;

  constructor() {
    this.xlayerAPI = XLayerAPIService.getInstance();
  }

  public static getInstance(): BlockchainService {
    if (!BlockchainService.instance) {
      BlockchainService.instance = new BlockchainService();
    }
    return BlockchainService.instance;
  }

  // Token deployment - This will be handled by the LaunchWizard using useTokenFactory hook
  async deployToken(launchData: LaunchData): Promise<{
    success: boolean;
    tokenAddress?: Address;
    transactionHash?: string;
    error?: string;
  }> {
    // This method should not be called directly
    // Token deployment is handled by the LaunchWizard component using wagmi hooks
    throw new Error('Token deployment should be handled by LaunchWizard component using useTokenFactory hook');
  }

  // Get token information
  async getTokenInfo(tokenAddress: Address): Promise<TokenData | null> {
    try {
      const response = await this.xlayerAPI.getTokenDetails(tokenAddress);
      if (response.code === 0 && response.data) {
        return this.xlayerAPI.formatTokenData(response.data);
      }
      return null;
    } catch (error) {
      console.error('Error fetching token info:', error);
      return null;
    }
  }

  // Get swap quote
  async getSwapQuote(
    tokenIn: Address,
    tokenOut: Address,
    amountIn: string,
    slippage: number = 0.5
  ): Promise<SwapQuote | null> {
    try {
      // This would integrate with the useSwap hook
      // Mock quote for now
      const mockAmountOut = (parseFloat(amountIn) * 0.95).toString(); // 5% price impact
      const priceImpact = 5.0;
      const minimumReceived = (parseFloat(mockAmountOut) * (1 - slippage / 100)).toString();
      
      return {
        amountIn,
        amountOut: mockAmountOut,
        priceImpact,
        minimumReceived,
        route: [tokenIn, tokenOut],
        gasEstimate: BigInt('21000'),
      };
    } catch (error) {
      console.error('Error getting swap quote:', error);
      return null;
    }
  }

  // Execute swap
  async executeSwap(
    tokenIn: Address,
    tokenOut: Address,
    amountIn: string,
    slippage: number = 0.5
  ): Promise<{
    success: boolean;
    transactionHash?: string;
    error?: string;
  }> {
    try {
      // This would integrate with the useSwap hook
      console.log('Executing swap:', { tokenIn, tokenOut, amountIn, slippage });
      
      // Simulate swap delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return {
        success: true,
        transactionHash: '0xswap1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Swap failed',
      };
    }
  }

  // Get user's token balance
  async getTokenBalance(tokenAddress: Address, userAddress: Address): Promise<{
    balance: string;
    formatted: string;
  } | null> {
    try {
      // This would integrate with the useTokenBalance hook
      // Mock balance for now
      const mockBalance = BigInt('1000000000000000000'); // 1 token
      
      return {
        balance: mockBalance.toString(),
        formatted: formatUnits(mockBalance, 18),
      };
    } catch (error) {
      console.error('Error fetching token balance:', error);
      return null;
    }
  }

  // Get all tokens created by a user
  async getUserTokens(userAddress: Address): Promise<TokenData[]> {
    try {
      const response = await this.xlayerAPI.getTokensByCreator(userAddress);
      if (response.code === 0 && response.data.tokens) {
        return response.data.tokens.map(token => this.xlayerAPI.formatTokenData(token));
      }
      return [];
    } catch (error) {
      console.error('Error fetching user tokens:', error);
      return [];
    }
  }

  // Get trending tokens
  async getTrendingTokens(): Promise<TokenData[]> {
    try {
      const response = await this.xlayerAPI.getTrendingTokens('24h');
      if (response.code === 0 && response.data.tokens) {
        return response.data.tokens.map(token => this.xlayerAPI.formatTokenData(token));
      }
      return [];
    } catch (error) {
      console.error('Error fetching trending tokens:', error);
      return [];
    }
  }

  // Get all tokens with pagination
  async getAllTokens(params: {
    page?: number;
    pageSize?: number;
    sort?: 'volume' | 'marketCap' | 'createdAt' | 'tradeCount';
    order?: 'asc' | 'desc';
    search?: string;
  } = {}): Promise<{
    tokens: TokenData[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    try {
      const response = await this.xlayerAPI.getTokens(params);
      if (response.code === 0 && response.data.tokens) {
        return {
          tokens: response.data.tokens.map(token => this.xlayerAPI.formatTokenData(token)),
          total: response.data.total || response.data.tokens.length,
          page: response.data.page || params.page || 1,
          pageSize: response.data.pageSize || params.pageSize || 100
        };
      }
      return {
        tokens: [],
        total: 0,
        page: 1,
        pageSize: 100
      };
    } catch (error) {
      console.error('Error fetching all tokens:', error);
      return {
        tokens: [],
        total: 0,
        page: 1,
        pageSize: 100
      };
    }
  }

  // Get platform statistics
  async getPlatformStats(): Promise<{
    totalTokens: number;
    totalVolume: string;
    totalTrades: number;
    activeTokens: number;
  }> {
    try {
      return await this.xlayerAPI.getTokenStats();
    } catch (error) {
      console.error('Error fetching platform stats:', error);
      return {
        totalTokens: 0,
        totalVolume: '0',
        totalTrades: 0,
        activeTokens: 0
      };
    }
  }

  // Calculate health score
  calculateHealthScore(tokenData: Partial<TokenData>): number {
    let score = 0;
    
    // Liquidity locked (30 points)
    if (tokenData.liquidityLocked) {
      score += 30;
      // Bonus for longer lock duration
      if (tokenData.lockDuration && tokenData.lockDuration >= 90) score += 10;
      if (tokenData.lockDuration && tokenData.lockDuration >= 365) score += 10;
    }
    
    // Verification status (20 points)
    if (tokenData.isVerified) score += 20;
    
    // Holder distribution (20 points)
    if (tokenData.holders) {
      if (tokenData.holders > 1000) score += 20;
      else if (tokenData.holders > 500) score += 15;
      else if (tokenData.holders > 100) score += 10;
      else if (tokenData.holders > 50) score += 5;
    }
    
    // Volume activity (20 points)
    if (tokenData.volume24h && tokenData.marketCap) {
      const volumeRatio = tokenData.volume24h / tokenData.marketCap;
      if (volumeRatio > 0.1) score += 20;
      else if (volumeRatio > 0.05) score += 15;
      else if (volumeRatio > 0.02) score += 10;
      else if (volumeRatio > 0.01) score += 5;
    }
    
    // Age factor (10 points)
    if (tokenData.createdAt) {
      const ageInDays = (Date.now() - tokenData.createdAt) / (1000 * 60 * 60 * 24);
      if (ageInDays > 30) score += 10;
      else if (ageInDays > 7) score += 7;
      else if (ageInDays > 1) score += 5;
    }
    
    return Math.min(score, 100);
  }

  // Format currency values
  formatCurrency(value: number): string {
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
    return `$${value.toFixed(2)}`;
  }

  // Format token amounts
  formatTokenAmount(amount: bigint, decimals: number = 18): string {
    const formatted = formatUnits(amount, decimals);
    const num = parseFloat(formatted);
    
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    if (num < 0.001) return num.toExponential(2);
    return num.toFixed(6);
  }
}
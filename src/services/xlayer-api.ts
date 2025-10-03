import axios from 'axios';
import { Address } from 'viem';

// X Layer API endpoints
const XLAYER_RPC_MAINNET = 'https://rpc.xlayer.tech';
const XLAYER_RPC_TESTNET = 'https://testrpc.xlayer.tech';
const XLAYER_WS_MAINNET = 'wss://ws.xlayer.tech';
const XLAYER_WS_TESTNET = 'wss://testws.xlayer.tech';

// OkieDokie API endpoints
const OKIEDOKIE_API_BASE = 'https://okiedokie.fun/api';

export interface OkieTokenData {
  id: Address;
  address: Address;
  name: string;
  symbol: string;
  description: string;
  imageUri: string;
  decimals: number;
  totalSupply: string;
  creator: Address;
  createdAt: number;
  updatedAt: number;
  price: string;
  marketCap: string;
  volume: string;
  holderCount: number;
  tradeCount: number;
  buyCount: number;
  sellCount: number;
  status: number; // 0: pending, 1: active, 2: paused, 3: completed
  pair: Address;
  blockNumber: string;
  transactionHash: string;
  websiteUrl?: string;
  twitterUrl?: string;
  telegramUrl?: string;
  tokenIndex: string;
  initialBuyAmount: string;
  tokenFactory: {
    id: Address;
    A: string;
    B: string;
    fundToken: Address;
    fundingTarget: string;
  };
}

export interface TokenListResponse {
  code: number;
  message: string;
  data: {
    tokens: OkieTokenData[];
    total?: number;
    page?: number;
    pageSize?: number;
  };
}

export interface TokenDetailsResponse {
  code: number;
  message: string;
  data: OkieTokenData;
}

export interface TradeData {
  id: string;
  tokenAddress: Address;
  trader: Address;
  type: 'buy' | 'sell';
  amount: string;
  price: string;
  value: string;
  timestamp: number;
  transactionHash: string;
  blockNumber: string;
}

export interface TradeHistoryResponse {
  code: number;
  message: string;
  data: {
    trades: TradeData[];
    total: number;
    page: number;
    pageSize: number;
  };
}

export class XLayerAPIService {
  private static instance: XLayerAPIService;
  private isTestnet: boolean;
  private rpcUrl: string;
  private wsUrl: string;

  constructor(isTestnet: boolean = false) {
    this.isTestnet = isTestnet;
    this.rpcUrl = isTestnet ? XLAYER_RPC_TESTNET : XLAYER_RPC_MAINNET;
    this.wsUrl = isTestnet ? XLAYER_WS_TESTNET : XLAYER_WS_MAINNET;
  }

  public static getInstance(isTestnet: boolean = false): XLayerAPIService {
    if (!XLayerAPIService.instance) {
      XLayerAPIService.instance = new XLayerAPIService(isTestnet);
    }
    return XLayerAPIService.instance;
  }

  // OkieDokie API Methods
  async getTokens(params: {
    sort?: 'volume' | 'marketCap' | 'createdAt' | 'tradeCount';
    page?: number;
    pageSize?: number;
    status?: number;
    order?: 'asc' | 'desc';
    search?: string;
  } = {}): Promise<TokenListResponse> {
    try {
      const {
        sort = 'volume',
        page = 1,
        pageSize = 100,
        status,
        order = 'desc',
        search
      } = params;

      const queryParams = new URLSearchParams({
        sort,
        page: page.toString(),
        pageSize: pageSize.toString(),
        order
      });

      if (status !== undefined) {
        queryParams.append('status', status.toString());
      }

      if (search) {
        queryParams.append('search', search);
      }

      const response = await axios.get(`${OKIEDOKIE_API_BASE}/tokens?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tokens:', error);
      throw new Error('Failed to fetch tokens from OkieDokie API');
    }
  }

  async getTokenDetails(tokenAddress: Address): Promise<TokenDetailsResponse> {
    try {
      const response = await axios.get(`${OKIEDOKIE_API_BASE}/tokens/${tokenAddress}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching token details:', error);
      throw new Error(`Failed to fetch token details for ${tokenAddress}`);
    }
  }

  async getTokensByCreator(creatorAddress: Address): Promise<TokenListResponse> {
    try {
      const response = await axios.get(`${OKIEDOKIE_API_BASE}/tokens/creator/${creatorAddress}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching creator tokens:', error);
      throw new Error(`Failed to fetch tokens for creator ${creatorAddress}`);
    }
  }

  async getTradeHistory(tokenAddress: Address, params: {
    page?: number;
    pageSize?: number;
    type?: 'buy' | 'sell';
  } = {}): Promise<TradeHistoryResponse> {
    try {
      const { page = 1, pageSize = 50, type } = params;
      
      const queryParams = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString()
      });

      if (type) {
        queryParams.append('type', type);
      }

      const response = await axios.get(
        `${OKIEDOKIE_API_BASE}/tokens/${tokenAddress}/trades?${queryParams}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching trade history:', error);
      throw new Error(`Failed to fetch trade history for ${tokenAddress}`);
    }
  }

  async getTrendingTokens(timeframe: '1h' | '24h' | '7d' = '24h'): Promise<TokenListResponse> {
    try {
      const response = await axios.get(`${OKIEDOKIE_API_BASE}/tokens/trending?timeframe=${timeframe}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trending tokens:', error);
      // Fallback to regular token list sorted by volume
      return this.getTokens({ sort: 'volume', pageSize: 20 });
    }
  }

  async getTokenStats(): Promise<{
    totalTokens: number;
    totalVolume: string;
    totalTrades: number;
    activeTokens: number;
  }> {
    try {
      const response = await axios.get(`${OKIEDOKIE_API_BASE}/stats`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching token stats:', error);
      // Return mock stats as fallback
      return {
        totalTokens: 0,
        totalVolume: '0',
        totalTrades: 0,
        activeTokens: 0
      };
    }
  }

  // X Layer RPC Methods
  async getBlockNumber(): Promise<number> {
    try {
      const response = await axios.post(this.rpcUrl, {
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1
      });
      return parseInt(response.data.result, 16);
    } catch (error) {
      console.error('Error fetching block number:', error);
      throw new Error('Failed to fetch current block number');
    }
  }

  async getGasPrice(): Promise<string> {
    try {
      const response = await axios.post(this.rpcUrl, {
        jsonrpc: '2.0',
        method: 'eth_gasPrice',
        params: [],
        id: 1
      });
      return response.data.result;
    } catch (error) {
      console.error('Error fetching gas price:', error);
      throw new Error('Failed to fetch current gas price');
    }
  }

  async getBalance(address: Address): Promise<string> {
    try {
      const response = await axios.post(this.rpcUrl, {
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [address, 'latest'],
        id: 1
      });
      return response.data.result;
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw new Error(`Failed to fetch balance for ${address}`);
    }
  }

  async getTransactionReceipt(txHash: string): Promise<any> {
    try {
      const response = await axios.post(this.rpcUrl, {
        jsonrpc: '2.0',
        method: 'eth_getTransactionReceipt',
        params: [txHash],
        id: 1
      });
      return response.data.result;
    } catch (error) {
      console.error('Error fetching transaction receipt:', error);
      throw new Error(`Failed to fetch transaction receipt for ${txHash}`);
    }
  }

  // WebSocket connection for real-time updates
  createWebSocketConnection(): WebSocket | null {
    try {
      const ws = new WebSocket(this.wsUrl);
      
      ws.onopen = () => {
        console.log('Connected to X Layer WebSocket');
        // Subscribe to new blocks
        ws.send(JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_subscribe',
          params: ['newHeads'],
          id: 1
        }));
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };

      return ws;
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      return null;
    }
  }

  // Utility methods
  formatTokenData(rawToken: OkieTokenData): {
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
    chartData: number[];
  } {
    const price = parseFloat(rawToken.price);
    const marketCap = parseFloat(rawToken.marketCap);
    const volume24h = parseFloat(rawToken.volume);
    
    // Calculate health score based on various factors
    let healthScore = 0;
    
    // Volume activity (30 points)
    if (volume24h > 100000) healthScore += 30;
    else if (volume24h > 50000) healthScore += 25;
    else if (volume24h > 10000) healthScore += 20;
    else if (volume24h > 1000) healthScore += 15;
    else if (volume24h > 100) healthScore += 10;
    
    // Holder count (25 points)
    if (rawToken.holderCount > 1000) healthScore += 25;
    else if (rawToken.holderCount > 500) healthScore += 20;
    else if (rawToken.holderCount > 100) healthScore += 15;
    else if (rawToken.holderCount > 50) healthScore += 10;
    else if (rawToken.holderCount > 10) healthScore += 5;
    
    // Trade activity (25 points)
    if (rawToken.tradeCount > 10000) healthScore += 25;
    else if (rawToken.tradeCount > 5000) healthScore += 20;
    else if (rawToken.tradeCount > 1000) healthScore += 15;
    else if (rawToken.tradeCount > 500) healthScore += 10;
    else if (rawToken.tradeCount > 100) healthScore += 5;
    
    // Age factor (10 points)
    const ageInDays = (Date.now() / 1000 - rawToken.createdAt) / (24 * 60 * 60);
    if (ageInDays > 30) healthScore += 10;
    else if (ageInDays > 7) healthScore += 7;
    else if (ageInDays > 1) healthScore += 5;
    
    // Status bonus (10 points)
    if (rawToken.status === 3) healthScore += 10; // Completed/verified
    else if (rawToken.status === 1) healthScore += 5; // Active
    
    // Generate mock chart data (in real implementation, this would come from price history API)
    const chartData = Array.from({ length: 7 }, (_, i) => {
      const variation = (Math.random() - 0.5) * 0.2;
      return price * (1 + variation);
    });

    return {
      address: rawToken.address,
      name: rawToken.name,
      symbol: rawToken.symbol,
      decimals: rawToken.decimals,
      totalSupply: BigInt(rawToken.totalSupply.split('.')[0] || '0'),
      creator: rawToken.creator,
      createdAt: rawToken.createdAt * 1000, // Convert to milliseconds
      price,
      marketCap,
      volume24h,
      holders: rawToken.holderCount,
      healthScore: Math.min(healthScore, 100),
      isVerified: rawToken.status === 3,
      liquidityLocked: true, // Assume locked for OkieDokie tokens
      lockDuration: 90, // Default lock duration
      chartData
    };
  }

  // Price formatting utilities
  formatPrice(price: number): string {
    if (price < 0.000001) return price.toExponential(2);
    if (price < 0.001) return price.toFixed(8);
    if (price < 1) return price.toFixed(6);
    return price.toFixed(4);
  }

  formatMarketCap(marketCap: number): string {
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    if (marketCap >= 1e3) return `$${(marketCap / 1e3).toFixed(1)}K`;
    return `$${marketCap.toFixed(2)}`;
  }

  formatVolume(volume: number): string {
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(2)}M`;
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(1)}K`;
    return volume.toFixed(2);
  }
}
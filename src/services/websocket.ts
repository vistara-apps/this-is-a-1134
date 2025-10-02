import { XLayerAPIService } from './xlayer-api';

export interface WebSocketMessage {
  type: 'newBlock' | 'newTransaction' | 'priceUpdate' | 'volumeUpdate';
  data: any;
}

export interface PriceUpdateData {
  tokenAddress: string;
  price: number;
  change24h: number;
  volume24h: number;
  timestamp: number;
}

export interface BlockData {
  blockNumber: number;
  blockHash: string;
  timestamp: number;
  transactionCount: number;
}

export class WebSocketService {
  private static instance: WebSocketService;
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private isConnected = false;
  private xlayerAPI: XLayerAPIService;

  constructor() {
    this.xlayerAPI = XLayerAPIService.getInstance();
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  connect(): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      this.ws = this.xlayerAPI.createWebSocketConnection();
      
      if (!this.ws) {
        console.error('Failed to create WebSocket connection');
        return;
      }

      this.ws.onopen = () => {
        console.log('WebSocket connected to X Layer');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        
        // Subscribe to new blocks
        this.subscribe('newHeads');
        
        // Subscribe to pending transactions
        this.subscribe('newPendingTransactions');
      };

      this.ws.onmessage = (event) => {
        this.handleMessage(event.data);
      };

      this.ws.onclose = () => {
        console.log('WebSocket connection closed');
        this.isConnected = false;
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnected = false;
      };

    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
      this.attemptReconnect();
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
    this.listeners.clear();
  }

  private subscribe(method: string): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    const message = {
      jsonrpc: '2.0',
      method: 'eth_subscribe',
      params: [method],
      id: Date.now()
    };

    this.ws.send(JSON.stringify(message));
  }

  private handleMessage(data: string): void {
    try {
      const message = JSON.parse(data);
      
      if (message.method === 'eth_subscription') {
        const { subscription, result } = message.params;
        
        if (result.number) {
          // New block
          const blockData: BlockData = {
            blockNumber: parseInt(result.number, 16),
            blockHash: result.hash,
            timestamp: parseInt(result.timestamp, 16) * 1000,
            transactionCount: result.transactions ? result.transactions.length : 0
          };
          
          this.emit('newBlock', blockData);
        } else if (result.hash && !result.number) {
          // New transaction
          this.emit('newTransaction', result);
        }
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);
    
    setTimeout(() => {
      this.connect();
    }, delay);
  }

  // Event listener management
  on(event: string, callback: (data: any) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: string, callback: (data: any) => void): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(callback);
      if (eventListeners.size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  private emit(event: string, data: any): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in WebSocket event callback:', error);
        }
      });
    }
  }

  // Utility methods
  isConnectedToNetwork(): boolean {
    return this.isConnected;
  }

  getConnectionStatus(): 'connected' | 'connecting' | 'disconnected' | 'error' {
    if (!this.ws) return 'disconnected';
    
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return 'connecting';
      case WebSocket.OPEN:
        return 'connected';
      case WebSocket.CLOSING:
      case WebSocket.CLOSED:
        return 'disconnected';
      default:
        return 'error';
    }
  }

  // Simulate price updates (in real implementation, this would come from price feeds)
  startPriceUpdates(): void {
    setInterval(() => {
      // Mock price update for demonstration
      const mockPriceUpdate: PriceUpdateData = {
        tokenAddress: '0x2df6295e1f79751f39594554f1fd93a838430c71',
        price: Math.random() * 0.001,
        change24h: (Math.random() - 0.5) * 20,
        volume24h: Math.random() * 100000,
        timestamp: Date.now()
      };
      
      this.emit('priceUpdate', mockPriceUpdate);
    }, 5000); // Update every 5 seconds
  }
}
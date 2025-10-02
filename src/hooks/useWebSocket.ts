import { useEffect, useState, useCallback } from 'react';
import { WebSocketService, BlockData, PriceUpdateData } from '../services/websocket';

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected' | 'error'>('disconnected');
  const [latestBlock, setLatestBlock] = useState<BlockData | null>(null);
  const [wsService] = useState(() => WebSocketService.getInstance());

  useEffect(() => {
    // Connect to WebSocket
    wsService.connect();

    // Set up event listeners
    const handleNewBlock = (blockData: BlockData) => {
      setLatestBlock(blockData);
    };

    const updateConnectionStatus = () => {
      const status = wsService.getConnectionStatus();
      setConnectionStatus(status);
      setIsConnected(status === 'connected');
    };

    wsService.on('newBlock', handleNewBlock);

    // Check connection status periodically
    const statusInterval = setInterval(updateConnectionStatus, 1000);
    updateConnectionStatus(); // Initial check

    // Start price updates
    wsService.startPriceUpdates();

    return () => {
      clearInterval(statusInterval);
      wsService.off('newBlock', handleNewBlock);
      // Don't disconnect here as other components might be using it
    };
  }, [wsService]);

  const subscribeToPrice = useCallback((callback: (data: PriceUpdateData) => void) => {
    wsService.on('priceUpdate', callback);
    return () => wsService.off('priceUpdate', callback);
  }, [wsService]);

  const subscribeToTransactions = useCallback((callback: (data: any) => void) => {
    wsService.on('newTransaction', callback);
    return () => wsService.off('newTransaction', callback);
  }, [wsService]);

  return {
    isConnected,
    connectionStatus,
    latestBlock,
    subscribeToPrice,
    subscribeToTransactions,
  };
}

export function usePriceUpdates(tokenAddress?: string) {
  const [priceData, setPriceData] = useState<PriceUpdateData | null>(null);
  const { subscribeToPrice } = useWebSocket();

  useEffect(() => {
    if (!tokenAddress) return;

    const unsubscribe = subscribeToPrice((data: PriceUpdateData) => {
      if (!tokenAddress || data.tokenAddress.toLowerCase() === tokenAddress.toLowerCase()) {
        setPriceData(data);
      }
    });

    return unsubscribe;
  }, [tokenAddress, subscribeToPrice]);

  return priceData;
}

export function useBlockUpdates() {
  const { latestBlock, isConnected } = useWebSocket();
  return { latestBlock, isConnected };
}
import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, Activity, Clock } from 'lucide-react';
import { useBlockUpdates } from '../hooks/useWebSocket';

export function NetworkStatus() {
  const { latestBlock, isConnected } = useBlockUpdates();

  const getStatusColor = () => {
    if (!isConnected) return 'text-danger';
    return 'text-success';
  };

  const getStatusIcon = () => {
    if (!isConnected) return WifiOff;
    return Wifi;
  };

  const getStatusText = () => {
    if (!isConnected) return 'Disconnected';
    return 'Connected';
  };

  const formatBlockTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const StatusIcon = getStatusIcon();

  return (
    <div className="flex items-center space-x-3 px-3 py-2 bg-surface/50 border border-border rounded-lg">
      <motion.div
        animate={{ scale: isConnected ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 2, repeat: isConnected ? Infinity : 0 }}
        className={`${getStatusColor()}`}
      >
        <StatusIcon className="h-4 w-4" />
      </motion.div>
      
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-medium ${getStatusColor()}`}>
            X Layer {getStatusText()}
          </span>
        </div>
        
        {latestBlock && isConnected && (
          <div className="flex items-center space-x-2 text-xs text-text-muted">
            <Activity className="h-3 w-3" />
            <span>Block #{latestBlock.blockNumber.toLocaleString()}</span>
            <Clock className="h-3 w-3 ml-1" />
            <span>{formatBlockTime(latestBlock.timestamp)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
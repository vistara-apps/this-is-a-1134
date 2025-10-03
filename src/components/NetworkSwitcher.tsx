import React from 'react';
import { useChainId, useSwitchChain } from 'wagmi';
import { Button } from './ui/Button';
import { AlertTriangle, CheckCircle2, Wifi } from 'lucide-react';
import { xLayer, xLayerTestnet } from '../config/chains';
import { motion } from 'framer-motion';

export function NetworkSwitcher() {
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();

  const isOnCorrectNetwork = chainId === xLayer.id || chainId === xLayerTestnet.id;
  const isMainnet = chainId === xLayer.id;
  const isTestnet = chainId === xLayerTestnet.id;

  const handleSwitchToMainnet = () => {
    switchChain({ chainId: xLayer.id });
  };

  const handleSwitchToTestnet = () => {
    switchChain({ chainId: xLayerTestnet.id });
  };

  if (isOnCorrectNetwork) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center space-x-2 px-3 py-2 bg-success/10 border border-success/20 rounded-lg"
      >
        <CheckCircle2 className="h-4 w-4 text-success" />
        <span className="text-sm font-medium text-success">
          {isMainnet ? 'X Layer Mainnet' : 'X Layer Testnet'}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center space-x-3 p-4 bg-warning/10 border border-warning/20 rounded-lg"
    >
      <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium text-warning mb-1">
          Wrong Network
        </p>
        <p className="text-xs text-text-muted">
          Please switch to X Layer to use OkieLaunch
        </p>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSwitchToTestnet}
          loading={isPending}
          icon={<Wifi className="h-4 w-4" />}
          iconPosition="left"
        >
          Testnet
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleSwitchToMainnet}
          loading={isPending}
          icon={<Wifi className="h-4 w-4" />}
          iconPosition="left"
        >
          Mainnet
        </Button>
      </div>
    </motion.div>
  );
}
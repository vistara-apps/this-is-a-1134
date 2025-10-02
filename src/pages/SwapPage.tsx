import React, { useState } from 'react';
import { SwapWidget } from '../components/SwapWidget';
import { TrendingTokens } from '../components/TrendingTokens';
import { motion } from 'framer-motion';

export function SwapPage() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Trade OkieLaunch <span className="gradient-text">Tokens</span>
            </h1>
            <p className="text-text-muted text-lg">
              Swap tokens with zero slippage protection and built-in safety checks
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SwapWidget />
            </div>
            <div>
              <TrendingTokens />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
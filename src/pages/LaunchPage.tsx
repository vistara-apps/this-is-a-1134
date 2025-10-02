import React, { useState } from 'react';
import { LaunchWizard } from '../components/LaunchWizard';
import { motion } from 'framer-motion';

export function LaunchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-surface/30 to-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Launch Your Token in <span className="gradient-text">3 Minutes</span>
            </h1>
            <p className="text-text-muted text-lg">
              Deploy, create liquidity, and set up safety features in one transaction
            </p>
          </div>
          
          <LaunchWizard />
        </motion.div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { ReferralStats } from '../components/referrals/ReferralStats';
import { ReferralLeaderboard } from '../components/referrals/ReferralLeaderboard';
import { ReferralTree } from '../components/referrals/ReferralTree';
import { motion } from 'framer-motion';

export function ReferralsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'leaderboard', name: 'Leaderboard' },
    { id: 'tree', name: 'My Network' }
  ];

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Referral <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-text-muted text-lg">
              Earn $OKIE tokens by referring new users and building your network
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center space-x-1 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-text-muted hover:text-text hover:bg-surface-hover'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && <ReferralStats />}
            {activeTab === 'leaderboard' && <ReferralLeaderboard />}
            {activeTab === 'tree' && <ReferralTree />}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
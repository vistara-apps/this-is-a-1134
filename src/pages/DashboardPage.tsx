import React, { useState } from 'react';
import { HealthScoreCard } from '../components/dashboard/HealthScoreCard';
import { MetricsGrid } from '../components/dashboard/MetricsGrid';
import { LaunchesTable } from '../components/dashboard/LaunchesTable';
import { AgentActivityFeed } from '../components/dashboard/AgentActivityFeed';
import { AllTokensTable } from '../components/AllTokensTable';
import { Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'launches', name: 'My Launches' },
    { id: 'tokens', name: 'All Tokens' },
    { id: 'agent', name: 'AI Agent' },
    { id: 'analytics', name: 'Analytics' }
  ];

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-text-muted">
              Monitor your launches, track performance, and manage your AI agents
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button className="flex items-center space-x-2 px-4 py-2 bg-surface hover:bg-surface-hover border border-border rounded-lg transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            
            <Link
              to="/launch"
              className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>New Launch</span>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <MetricsGrid />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <LaunchesTable />
              </div>
              <div>
                <HealthScoreCard />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'launches' && (
          <div>
            <LaunchesTable showAll />
          </div>
        )}

        {activeTab === 'tokens' && (
          <div>
            <AllTokensTable maxHeight="calc(100vh - 300px)" />
          </div>
        )}

        {activeTab === 'agent' && (
          <div>
            <AgentActivityFeed />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">Advanced Analytics</h3>
            <p className="text-text-muted">
              Detailed analytics and performance insights coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
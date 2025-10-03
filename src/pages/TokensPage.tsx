import React from 'react';
import { Header } from '../components/Header';
import { AllTokensTable } from '../components/AllTokensTable';

export function TokensPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All X Layer Tokens</h1>
          <p className="text-text-muted">
            Discover and explore all tokens launched on X Layer through OkieDokie
          </p>
        </div>
        
        <AllTokensTable />
      </main>
    </div>
  );
}
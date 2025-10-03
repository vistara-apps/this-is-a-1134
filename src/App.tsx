import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { LaunchPage } from './pages/LaunchPage';
import { DashboardPage } from './pages/DashboardPage';
import { SwapPage } from './pages/SwapPage';
import { ReferralsPage } from './pages/ReferralsPage';
import { TokensPage } from './pages/TokensPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg text-text">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/launch" element={<LaunchPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/swap" element={<SwapPage />} />
            <Route path="/referrals" element={<ReferralsPage />} />
            <Route path="/tokens" element={<TokensPage />} />
          </Routes>
        </main>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: 'hsl(240, 5%, 11%)',
              color: 'hsl(0, 0%, 98%)',
              border: '1px solid hsl(240, 4%, 20%)',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
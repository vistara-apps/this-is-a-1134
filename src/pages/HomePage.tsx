import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingLaunches } from '../components/TrendingLaunches';
import { FeatureGrid } from '../components/FeatureGrid';
import { StatsGrid } from '../components/StatsGrid';
import { Rocket, Shield, Zap, Bot, Users, BarChart3 } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bg via-surface to-bg">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Launch your token in{' '}
              <span className="gradient-text">minutes</span>, not months
            </h1>
            <p className="text-xl text-text-muted max-w-3xl mx-auto mb-8">
              Built-in liquidity, safety guarantees, and AI autopilot—all within Farcaster frames.
              The easiest way to launch and grow your token community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/launch"
                className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-200 shadow-glow hover:shadow-card-hover transform hover:scale-105"
              >
                <Rocket className="h-5 w-5 mr-2" />
                Start Launch
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 bg-surface hover:bg-surface-hover text-text border border-border font-semibold rounded-lg transition-all duration-200"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsGrid />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything you need to succeed</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              From one-click deployment to AI-powered community management, 
              OkieLaunch handles the complexity so you can focus on building.
            </p>
          </div>
          <FeatureGrid />
        </div>
      </section>

      {/* Trending Launches */}
      <section className="py-16 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trending Launches</h2>
            <p className="text-text-muted text-lg">
              Discover the hottest tokens launched on OkieLaunch
            </p>
          </div>
          <TrendingLaunches />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to launch your token?</h2>
          <p className="text-xl text-text-muted mb-8">
            Join thousands of builders who've launched successfully with OkieLaunch.
            No coding required, no complex setup—just results.
          </p>
          <Link
            to="/launch"
            className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-200 shadow-glow hover:shadow-card-hover transform hover:scale-105"
          >
            <Rocket className="h-5 w-5 mr-2" />
            Launch Your Token Now
          </Link>
        </div>
      </section>
    </div>
  );
}
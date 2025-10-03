import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingLaunches } from '../components/TrendingLaunches';
import { FeatureGrid } from '../components/FeatureGrid';
import { StatsGrid } from '../components/StatsGrid';
import { Button } from '../components/ui/Button';
import { Rocket, Shield, Zap, Bot, Users, BarChart3, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bg via-surface to-bg">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
                <Star className="h-4 w-4 mr-2" />
                Trusted by 2,847+ token creators
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Launch your token in{' '}
                <span className="gradient-text">minutes</span>, not months
              </h1>
              
              <p className="text-xl text-text-muted max-w-3xl mx-auto mb-8">
                Built-in liquidity, safety guarantees, and AI autopilot—all within Farcaster frames.
                The easiest way to launch and grow your token community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/launch">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<Rocket className="h-5 w-5" />}
                    iconPosition="left"
                    className="shadow-glow"
                  >
                    Start Launch
                  </Button>
                </Link>
                
                <Link to="/dashboard">
                  <Button
                    variant="outline"
                    size="lg"
                    icon={<BarChart3 className="h-5 w-5" />}
                    iconPosition="left"
                  >
                    View Dashboard
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 text-sm text-text-muted">
                <span>✨ No coding required</span>
                <span className="mx-4">•</span>
                <span>🔒 Built-in safety</span>
                <span className="mx-4">•</span>
                <span>🤖 AI-powered</span>
              </div>
            </motion.div>
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
      <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to launch your token?</h2>
            <p className="text-xl text-text-muted mb-8">
              Join thousands of builders who've launched successfully with OkieLaunch.
              No coding required, no complex setup—just results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/launch">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<Rocket className="h-5 w-5" />}
                  iconPosition="left"
                  className="shadow-glow"
                >
                  Launch Your Token Now
                </Button>
              </Link>
              
              <Link to="/tokens">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight className="h-5 w-5" />}
                  iconPosition="right"
                >
                  Explore All Tokens
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3 min</div>
                <div className="text-sm text-text-muted">Average launch time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">94.2%</div>
                <div className="text-sm text-text-muted">Success rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chart3">$45.2M</div>
                <div className="text-sm text-text-muted">Total volume</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
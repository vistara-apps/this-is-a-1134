import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Rocket, Shield, Bot, Eye, DollarSign } from 'lucide-react';
import { TokenBasicsStep } from './wizard/TokenBasicsStep';
import { PricingStep } from './wizard/PricingStep';
import { SafetyStep } from './wizard/SafetyStep';
import { AIAgentStep } from './wizard/AIAgentStep';
import { ReviewStep } from './wizard/ReviewStep';
import { Progress } from './ui/Progress';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import toast from 'react-hot-toast';

export interface LaunchData {
  // Token basics
  name: string;
  symbol: string;
  supply: string;
  description: string;
  logo?: File;
  
  // Pricing
  initialPrice: string;
  liquidityAmount: string;
  
  // Safety
  lockDuration: number;
  teamVesting: boolean;
  vestingCliff: number;
  
  // AI Agent
  agentPersonality: 'casual' | 'professional' | 'degen';
  postFrequency: 'hourly' | 'daily' | 'milestone';
  enabledChannels: string[];
}

const initialData: LaunchData = {
  name: '',
  symbol: '',
  supply: '1000000',
  description: '',
  initialPrice: '0.0001',
  liquidityAmount: '1',
  lockDuration: 90,
  teamVesting: false,
  vestingCliff: 30,
  agentPersonality: 'casual',
  postFrequency: 'milestone',
  enabledChannels: ['farcaster']
};

export function LaunchWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [launchData, setLaunchData] = useState<LaunchData>(initialData);
  const [isLaunching, setIsLaunching] = useState(false);

  const steps = [
    { 
      title: 'Token Basics', 
      icon: Rocket, 
      component: TokenBasicsStep,
      description: 'Name, symbol, and token details'
    },
    { 
      title: 'Pricing', 
      icon: DollarSign, 
      component: PricingStep,
      description: 'Initial price and liquidity settings'
    },
    { 
      title: 'Safety Settings', 
      icon: Shield, 
      component: SafetyStep,
      description: 'Lock duration and vesting schedule'
    },
    { 
      title: 'AI Agent', 
      icon: Bot, 
      component: AIAgentStep,
      description: 'Configure your community bot'
    },
    { 
      title: 'Review', 
      icon: Eye, 
      component: ReviewStep,
      description: 'Final review and launch'
    }
  ];

  const updateData = (updates: Partial<LaunchData>) => {
    setLaunchData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLaunch = async () => {
    setIsLaunching(true);
    
    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success('🚀 Token launched successfully!');
      
      // In a real app, redirect to dashboard
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
      
    } catch (error) {
      toast.error('Launch failed. Please try again.');
    } finally {
      setIsLaunching(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <Card variant="glass" padding="none" className="overflow-hidden">
      {/* Progress Bar */}
      <div className="p-6 border-b border-border">
        <Progress 
          steps={steps}
          currentStep={currentStep}
          orientation="horizontal"
          showLabels={false}
        />
        
        <div className="text-center mt-6">
          <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
          <p className="text-text-muted text-sm mt-1">{steps[currentStep].description}</p>
          <div className="text-xs text-text-muted mt-2">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStepComponent 
              data={launchData} 
              updateData={updateData}
              onLaunch={handleLaunch}
              isLaunching={isLaunching}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 border-t border-border flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={currentStep === 0}
          icon={<ChevronLeft className="h-4 w-4" />}
          iconPosition="left"
        >
          Previous
        </Button>

        <div className="flex items-center space-x-2 text-xs text-text-muted">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index <= currentStep ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>

        {currentStep < steps.length - 1 ? (
          <Button
            variant="primary"
            onClick={nextStep}
            icon={<ChevronRight className="h-4 w-4" />}
            iconPosition="right"
          >
            Next Step
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleLaunch}
            loading={isLaunching}
            icon={<Rocket className="h-4 w-4" />}
            iconPosition="left"
          >
            {isLaunching ? 'Launching...' : 'Launch Token'}
          </Button>
        )}
      </div>
    </Card>
  );
}
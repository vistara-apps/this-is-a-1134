import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Rocket, Shield, Bot, Eye } from 'lucide-react';
import { TokenBasicsStep } from './wizard/TokenBasicsStep';
import { PricingStep } from './wizard/PricingStep';
import { SafetyStep } from './wizard/SafetyStep';
import { AIAgentStep } from './wizard/AIAgentStep';
import { ReviewStep } from './wizard/ReviewStep';
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
    { title: 'Token Basics', icon: Rocket, component: TokenBasicsStep },
    { title: 'Pricing', icon: Eye, component: PricingStep },
    { title: 'Safety Settings', icon: Shield, component: SafetyStep },
    { title: 'AI Agent', icon: Bot, component: AIAgentStep },
    { title: 'Review', icon: Eye, component: ReviewStep }
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
    <div className="bg-surface/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden">
      {/* Progress Bar */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="flex items-center">
                <div 
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all cursor-pointer relative ${
                    isActive 
                      ? 'border-primary bg-primary text-white shadow-glow animate-pulse' 
                      : isCompleted 
                      ? 'border-primary bg-primary/20 text-primary hover:bg-primary/30'
                      : 'border-border bg-surface-hover text-text-muted'
                  }`}
                  onClick={() => isCompleted && setCurrentStep(index)}
                  title={step.title}
                >
                  <Icon className="h-5 w-5" />
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-bounce"></div>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 transition-all ${
                    isCompleted ? 'bg-gradient-to-r from-primary to-accent' : 'bg-border'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
          <p className="text-text-muted text-sm">Step {currentStep + 1} of {steps.length}</p>
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
      <div className="px-6 py-4 border-t border-border flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center space-x-2 px-4 py-2 text-text-muted hover:text-text disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={nextStep}
            className="flex items-center space-x-2 px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
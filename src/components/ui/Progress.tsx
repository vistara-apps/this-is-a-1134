import React from 'react';
import { motion } from 'framer-motion';

interface ProgressProps {
  steps: Array<{
    title: string;
    icon: React.ComponentType<any>;
    description?: string;
  }>;
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  showLabels?: boolean;
}

export function Progress({ 
  steps, 
  currentStep, 
  orientation = 'horizontal', 
  showLabels = true 
}: ProgressProps) {
  return (
    <div className={`flex ${orientation === 'vertical' ? 'flex-col space-y-4' : 'items-center justify-between'}`}>
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isUpcoming = index > currentStep;
        
        return (
          <div key={index} className={`flex items-center ${orientation === 'vertical' ? 'w-full' : ''}`}>
            {/* Step Circle */}
            <div className="relative flex items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isCompleted ? 'hsl(142, 76%, 36%)' : 
                                 isActive ? 'hsl(142, 76%, 36%)' : 
                                 'hsl(240, 5%, 11%)'
                }}
                className={`
                  flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                  ${isCompleted || isActive ? 'border-primary text-white' : 'border-border text-text-muted'}
                  ${isActive ? 'shadow-glow' : ''}
                `}
              >
                <Icon className="h-6 w-6" />
              </motion.div>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -inset-2 rounded-full border-2 border-primary/30"
                />
              )}
            </div>
            
            {/* Step Content */}
            {showLabels && (
              <div className={`ml-4 ${orientation === 'vertical' ? 'flex-1' : ''}`}>
                <h3 className={`font-semibold ${isActive ? 'text-primary' : isCompleted ? 'text-text' : 'text-text-muted'}`}>
                  {step.title}
                </h3>
                {step.description && (
                  <p className="text-sm text-text-muted mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            )}
            
            {/* Connector Line */}
            {index < steps.length - 1 && orientation === 'horizontal' && (
              <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? 'bg-primary' : 'bg-border'}`} />
            )}
            
            {index < steps.length - 1 && orientation === 'vertical' && (
              <div className={`w-0.5 h-8 ml-6 ${isCompleted ? 'bg-primary' : 'bg-border'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  success,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  className = '',
  ...props
}, ref) => {
  const hasError = !!error;
  const hasSuccess = !!success;

  const baseClasses = 'w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
  
  const variantClasses = {
    default: 'bg-surface border-border focus:border-primary focus:ring-primary/20',
    filled: 'bg-surface-hover border-transparent focus:bg-surface focus:border-primary focus:ring-primary/20'
  };

  const stateClasses = hasError 
    ? 'border-danger focus:border-danger focus:ring-danger/20' 
    : hasSuccess 
    ? 'border-success focus:border-success focus:ring-success/20'
    : '';

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-text">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={`
            ${baseClasses}
            ${variantClasses[variant]}
            ${stateClasses}
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon || hasError || hasSuccess ? 'pr-10' : ''}
            ${className}
          `}
          {...props}
        />
        
        {(rightIcon || hasError || hasSuccess) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {hasError && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-danger"
              >
                <AlertCircle className="h-5 w-5" />
              </motion.div>
            )}
            {hasSuccess && !hasError && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-success"
              >
                <CheckCircle2 className="h-5 w-5" />
              </motion.div>
            )}
            {!hasError && !hasSuccess && rightIcon && rightIcon}
          </div>
        )}
      </div>
      
      {(error || success || helperText) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm"
        >
          {error && (
            <p className="text-danger flex items-center space-x-1">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </p>
          )}
          {success && !error && (
            <p className="text-success flex items-center space-x-1">
              <CheckCircle2 className="h-4 w-4" />
              <span>{success}</span>
            </p>
          )}
          {helperText && !error && !success && (
            <p className="text-text-muted">{helperText}</p>
          )}
        </motion.div>
      )}
    </div>
  );
});
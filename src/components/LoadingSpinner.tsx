import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
}

export function LoadingSpinner({ size = 'md', color = 'text-primary', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-primary ${sizeClasses[size]} ${color}`}></div>
      {text && (
        <p className="text-sm text-text-muted animate-pulse">{text}</p>
      )}
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="bg-surface/80 backdrop-blur-sm rounded-xl border border-border p-6 animate-pulse">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-surface-hover rounded-xl"></div>
        <div className="flex-1">
          <div className="h-4 bg-surface-hover rounded mb-2"></div>
          <div className="h-3 bg-surface-hover rounded w-2/3"></div>
        </div>
        <div className="w-16 h-8 bg-surface-hover rounded"></div>
      </div>
      <div className="space-y-3">
        <div className="h-8 bg-surface-hover rounded"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-12 bg-surface-hover rounded"></div>
          <div className="h-12 bg-surface-hover rounded"></div>
          <div className="h-12 bg-surface-hover rounded"></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="h-10 bg-surface-hover rounded"></div>
          <div className="h-10 bg-surface-hover rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" text="Loading OkieLaunch..." />
      </div>
    </div>
  );
}
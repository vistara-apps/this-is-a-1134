import React from 'react';
import { Toaster } from 'react-hot-toast';
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'hsl(240, 5%, 11%)',
          color: 'hsl(0, 0%, 98%)',
          border: '1px solid hsl(240, 4%, 20%)',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          maxWidth: '400px',
        },
        success: {
          iconTheme: {
            primary: 'hsl(142, 76%, 36%)',
            secondary: 'hsl(0, 0%, 98%)',
          },
          style: {
            border: '1px solid hsl(142, 76%, 36%)',
            background: 'hsl(240, 5%, 11%)',
          },
        },
        error: {
          iconTheme: {
            primary: 'hsl(0, 84%, 60%)',
            secondary: 'hsl(0, 0%, 98%)',
          },
          style: {
            border: '1px solid hsl(0, 84%, 60%)',
            background: 'hsl(240, 5%, 11%)',
          },
        },
        loading: {
          iconTheme: {
            primary: 'hsl(48, 96%, 53%)',
            secondary: 'hsl(0, 0%, 98%)',
          },
          style: {
            border: '1px solid hsl(48, 96%, 53%)',
            background: 'hsl(240, 5%, 11%)',
          },
        },
      }}
    />
  );
}

// Enhanced toast functions with better UX
export const toast = {
  success: (message: string, options?: any) => {
    return (window as any).toast.success(
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
        <span>{message}</span>
      </div>,
      options
    );
  },
  
  error: (message: string, options?: any) => {
    return (window as any).toast.error(
      <div className="flex items-center space-x-2">
        <AlertCircle className="h-5 w-5 text-danger flex-shrink-0" />
        <span>{message}</span>
      </div>,
      options
    );
  },
  
  warning: (message: string, options?: any) => {
    return (window as any).toast(
      <div className="flex items-center space-x-2">
        <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0" />
        <span>{message}</span>
      </div>,
      {
        style: {
          border: '1px solid hsl(48, 96%, 53%)',
          background: 'hsl(240, 5%, 11%)',
        },
        ...options
      }
    );
  },
  
  info: (message: string, options?: any) => {
    return (window as any).toast(
      <div className="flex items-center space-x-2">
        <Info className="h-5 w-5 text-chart4 flex-shrink-0" />
        <span>{message}</span>
      </div>,
      {
        style: {
          border: '1px solid hsl(200, 80%, 50%)',
          background: 'hsl(240, 5%, 11%)',
        },
        ...options
      }
    );
  },
  
  loading: (message: string, options?: any) => {
    return (window as any).toast.loading(
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-accent border-t-transparent"></div>
        <span>{message}</span>
      </div>,
      options
    );
  },
};
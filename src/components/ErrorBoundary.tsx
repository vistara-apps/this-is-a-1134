import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-surface/80 backdrop-blur-sm rounded-xl border border-border p-8 text-center">
            <div className="w-16 h-16 bg-danger/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-8 w-8 text-danger" />
            </div>
            
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-text-muted mb-6">
              We encountered an unexpected error. This has been logged and we'll look into it.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-surface-hover rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-danger mb-2">Error Details:</h3>
                <pre className="text-xs text-text-muted overflow-auto">
                  {this.state.error.message}
                </pre>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reload Page
              </button>
              
              <Link
                to="/"
                className="flex items-center justify-center px-4 py-2 bg-surface hover:bg-surface-hover text-text border border-border rounded-lg transition-colors"
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
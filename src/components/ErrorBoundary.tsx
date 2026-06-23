/**
 * @copyright 2026 Romasha Guin
 */

import { Component } from 'react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className='flex flex-col items-center justify-center min-h-[400px] gap-4 text-center p-8'>
            <div className='text-4xl'>⚠️</div>
            <h2 className='text-xl font-semibold'>Something went wrong</h2>
            <p className='text-muted-foreground text-sm max-w-sm'>
              {this.state.error?.message ?? 'An unexpected error occurred.'}
            </p>
            <Button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
            >
              Reload page
            </Button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
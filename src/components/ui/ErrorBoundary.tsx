import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in QueryPath component tree:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F6F8F6] text-[#25332D] p-8 flex items-center justify-center font-sans">
          <div className="max-w-lg w-full bg-white border border-[#DCE5DE] rounded-xl p-6 shadow-md space-y-4">
            <div className="flex items-center gap-3 text-[#A64B4B]">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h1 className="text-lg font-bold">Something went wrong</h1>
            </div>
            <p className="text-sm text-[#637168] leading-relaxed">
              An unexpected error occurred while rendering the page.
            </p>
            {this.state.error && (
              <pre className="p-3 bg-[#F0F4F1] border border-[#DCE5DE] rounded font-mono text-xs text-[#A64B4B] overflow-x-auto whitespace-pre-wrap">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#356859] text-white rounded-md text-sm font-medium hover:bg-[#295447] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

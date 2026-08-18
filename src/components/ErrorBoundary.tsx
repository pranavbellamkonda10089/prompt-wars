import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in ReelMind AI component tree:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          role="alert" 
          aria-live="assertive"
          className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="p-4 rounded-2xl bg-rose-500/20 text-rose-400 mb-4 border border-rose-500/30 animate-bounce">
            <AlertTriangle className="w-12 h-12" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white mb-2">
            Something went wrong
          </h1>
          <p className="text-sm text-slate-400 max-w-md mb-6">
            The application encountered an unexpected runtime error. Your session data is safely stored in local memory.
          </p>
          {this.state.error && (
            <pre className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-rose-300 max-w-lg overflow-auto mb-6 text-left">
              {this.state.error.message}
            </pre>
          )}
          <button
            onClick={this.handleReload}
            aria-label="Reload Application"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span>Reload Application</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

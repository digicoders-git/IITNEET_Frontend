import React from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-slate-100 p-10 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <AlertCircle size={40} />
            </div>
            
            <h1 className="text-2xl font-black text-slate-900 mb-3">Something went wrong</h1>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              We've encountered a runtime error. This has been logged and we're looking into it.
            </p>

            <div className="space-y-3">
              <button 
                onClick={() => window.location.reload()}
                className="w-full bg-blue-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
              >
                <RotateCcw size={18} /> Refresh Page
              </button>
              
              <button 
                onClick={this.handleReset}
                className="w-full bg-white text-slate-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 border-2 border-slate-100 hover:border-blue-900 hover:text-blue-900 transition-all"
              >
                <Home size={18} /> Go to Homepage
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 pt-8 border-t border-slate-50 text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Error Details</p>
                <pre className="text-[10px] text-red-400 bg-red-50 p-4 rounded-xl overflow-auto max-h-32">
                  {this.state.error?.toString()}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

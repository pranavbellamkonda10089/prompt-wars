import React from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  RotateCcw, 
  ShieldCheck, 
  Smartphone, 
  Columns, 
  Cpu
} from 'lucide-react';

export type PageView = 'reels' | 'split' | 'agent';

interface NavbarProps {
  activePage: PageView;
  onSelectPage: (page: PageView) => void;
  onOpenTrapModal: () => void;
  onResetSession: () => void;
  isTrapActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = React.memo(({
  activePage,
  onSelectPage,
  onOpenTrapModal,
  onResetSession,
  isTrapActive
}) => {
  return (
    <header 
      role="banner" 
      className="sticky top-0 z-40 w-full border-b border-indigo-500/20 bg-slate-950/90 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Tagline */}
        <div className="flex items-center space-x-3" tabIndex={0} aria-label="ReelMind AI Version 2.0">
          <div className="relative">
            <div 
              aria-hidden="true" 
              className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30"
            >
              <BrainCircuit className="w-6 h-6 text-white animate-pulse" />
            </div>
            <span 
              aria-hidden="true" 
              className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-950 rounded-full" 
            />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-black text-white tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                ReelMind AI
              </h1>
              <span 
                aria-label="Version 2.0"
                className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hidden sm:inline-block"
              >
                v2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Cognitive Reel Recommendation Engine
            </p>
          </div>
        </div>

        {/* Center: Page View Switcher Tabs */}
        <nav 
          aria-label="Application View Selection" 
          role="tablist"
          className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800 shadow-inner"
        >
          <button
            role="tab"
            aria-selected={activePage === 'reels'}
            aria-label="Reels Feed View"
            onClick={() => onSelectPage('reels')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none ${
              activePage === 'reels'
                ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-md shadow-rose-600/30 scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reels Feed</span>
          </button>

          <button
            role="tab"
            aria-selected={activePage === 'split'}
            aria-label="Split Co-Pilot View"
            onClick={() => onSelectPage('split')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none ${
              activePage === 'split'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Columns className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Split Co-Pilot</span>
            <span className="sm:hidden">Split</span>
          </button>

          <button
            role="tab"
            aria-selected={activePage === 'agent'}
            aria-label="AI Intelligence Reasoning Dashboard"
            onClick={() => onSelectPage('agent')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none ${
              activePage === 'agent'
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-cyan-600/30 scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">AI Dashboard</span>
            <span className="sm:hidden">AI Hub</span>
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-2">
          {/* Active Trap Badge */}
          {isTrapActive ? (
            <div 
              role="status" 
              aria-live="polite"
              aria-label="Trap avoidance active: Superficial keyword traps detected and avoided"
              className="hidden lg:flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold animate-pulse"
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Trap Active</span>
            </div>
          ) : (
            <div 
              role="status" 
              aria-label="Anti-Hype Filter active"
              className="hidden lg:flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span>Anti-Hype</span>
            </div>
          )}

          {/* Trap Matrix Comparison Button */}
          <button
            aria-label="Open Built-in Trap Benchmark Matrix Comparison"
            onClick={onOpenTrapModal}
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold transition shadow-md shadow-indigo-600/30 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
          >
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden md:inline">Trap Benchmark</span>
            <span className="md:hidden">Matrix</span>
          </button>

          {/* Reset Session */}
          <button
            aria-label="Reset watch history and restart simulation"
            onClick={onResetSession}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
            title="Reset watch history & restart simulation"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

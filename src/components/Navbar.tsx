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

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onSelectPage,
  onOpenTrapModal,
  onResetSession,
  isTrapActive
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-indigo-500/20 bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <BrainCircuit className="w-6 h-6 text-white animate-pulse" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-950 rounded-full" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-black text-white tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                ReelMind AI
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hidden sm:inline-block">
                v2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Cognitive Reel Recommendation Engine
            </p>
          </div>
        </div>

        {/* Center: Page View Switcher Tabs */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800 shadow-inner">
          <button
            onClick={() => onSelectPage('reels')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activePage === 'reels'
                ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-md shadow-rose-600/30 scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Reels Feed</span>
          </button>

          <button
            onClick={() => onSelectPage('split')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activePage === 'split'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Split Co-Pilot</span>
            <span className="sm:hidden">Split</span>
          </button>

          <button
            onClick={() => onSelectPage('agent')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activePage === 'agent'
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-cyan-600/30 scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Dashboard</span>
            <span className="sm:hidden">AI Hub</span>
          </button>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-2">
          {/* Active Trap Badge */}
          {isTrapActive ? (
            <div className="hidden lg:flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trap Active</span>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Anti-Hype</span>
            </div>
          )}

          {/* Trap Matrix Comparison Button */}
          <button
            onClick={onOpenTrapModal}
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold transition shadow-md shadow-indigo-600/30 hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Trap Benchmark</span>
            <span className="md:hidden">Matrix</span>
          </button>

          {/* Reset Session */}
          <button
            onClick={onResetSession}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
            title="Reset watch history & restart simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

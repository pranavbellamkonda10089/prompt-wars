import React, { useEffect } from 'react';
import { 
  X, 
  AlertOctagon, 
  CheckCircle, 
  XCircle, 
  Layers,
  Award
} from 'lucide-react';

interface TrapComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrapComparisonModal: React.FC<TrapComparisonModalProps> = React.memo(({
  isOpen,
  onClose
}) => {
  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="trap-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div 
        role="document"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel bg-slate-950/95 border border-indigo-500/40 rounded-3xl p-6 shadow-2xl space-y-6"
      >
        {/* Close Button */}
        <button
          aria-label="Close Benchmark Modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold">
            <AlertOctagon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>The "Built-in Trap" Benchmark Matrix</span>
          </div>
          <h2 
            id="trap-modal-title"
            className="text-xl sm:text-2xl font-black text-white tracking-tight"
          >
            Naive Keyword Matcher vs. ReelMind Cognitive Agent
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Why shallow token matching fails modern students and how deep latent inference unlocks productive scrolling.
          </p>
        </div>

        {/* Scenario Context Box */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
            Student Watch Stream (The Trap Inputs)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-orange-950/30 border border-orange-500/30 text-orange-200">
              <span className="font-bold block">1. Java Meme</span>
              <span className="text-[11px] text-slate-400">500 lines boilerplate joke</span>
            </div>
            <div className="p-2 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-indigo-200">
              <span className="font-bold block">2. SWE Lifestyle</span>
              <span className="text-[11px] text-slate-400">FAANG day in life & sushi</span>
            </div>
            <div className="p-2 rounded-lg bg-rose-950/30 border border-rose-500/30 text-rose-200">
              <span className="font-bold block">3. Coding Interview Joke</span>
              <span className="text-[11px] text-slate-400">Binary tree whiteboard horror</span>
            </div>
            <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-cyan-200">
              <span className="font-bold block">4. Laptop Comparison</span>
              <span className="text-[11px] text-slate-400">Kernel compile & thermals</span>
            </div>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Naive Recommender Column (Fails) */}
          <div className="rounded-2xl p-4 sm:p-5 bg-rose-950/20 border border-rose-500/40 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-rose-500/30">
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-rose-400" aria-hidden="true" />
                <h3 className="font-bold text-rose-200 text-sm sm:text-base">Naive Keyword Matcher</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-rose-500/30 text-rose-200 text-[10px] font-mono font-bold">
                FAILS TRAP
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950/80 p-3 rounded-xl border border-rose-900/40">
                <span className="font-mono text-[10px] text-slate-400 block font-bold">INFERRED INTENT:</span>
                <p className="text-rose-300 font-semibold mt-0.5">"Likes Java syntax jokes & wants cheap laptops"</p>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-rose-900/40 space-y-1">
                <span className="font-mono text-[10px] text-slate-400 block font-bold">TYPICAL RECOMMENDATION:</span>
                <p className="text-rose-200 font-bold">"Java For-Loops 101 for Absolute Beginners"</p>
                <p className="text-[11px] text-slate-400 italic">or "10 AI tools to get a $200k job in 30 days (No coding)"</p>
              </div>

              <div className="space-y-1.5 pt-1 text-slate-300 text-[11px]">
                <div className="flex items-start space-x-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span><strong>Shallow Isolation:</strong> Matches single token "Java" without context.</span>
                </div>
                <div className="flex items-start space-x-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span><strong>Hype Vulnerability:</strong> Boosts viral clickbait fluff with 0 educational value.</span>
                </div>
                <div className="flex items-start space-x-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span><strong>User Churn:</strong> Treats user like a total novice; causes frustration and feed abandonment.</span>
                </div>
              </div>
            </div>
          </div>

          {/* ReelMind Cognitive Agent Column (Succeeds) */}
          <div className="rounded-2xl p-4 sm:p-5 bg-emerald-950/20 border border-emerald-500/40 space-y-4 relative overflow-hidden shadow-lg shadow-emerald-500/10">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                <h3 className="font-bold text-emerald-200 text-sm sm:text-base">ReelMind Cognitive Agent</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 text-[10px] font-mono font-bold">
                TRAP OVERCOME
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950/80 p-3 rounded-xl border border-emerald-900/40">
                <span className="font-mono text-[10px] text-slate-400 block font-bold">INFERRED INTENT:</span>
                <p className="text-emerald-300 font-semibold mt-0.5">
                  "Software Engineering Career, JVM Memory Internals & Systems Performance"
                </p>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-emerald-900/40 space-y-1">
                <span className="font-mono text-[10px] text-slate-400 block font-bold">HIGH-SIGNAL RECOMMENDATION:</span>
                <p className="text-emerald-200 font-bold">
                  "JVM Memory Architecture & High-Performance Garbage Collection Internals"
                </p>
                <p className="text-[11px] text-slate-400">Category: Java | Difficulty: Intermediate | Confidence: High</p>
              </div>

              <div className="space-y-1.5 pt-1 text-slate-300 text-[11px]">
                <div className="flex items-start space-x-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span><strong>Holistic Intent Synthesis:</strong> Recognizes aspiring engineer seeking production depth.</span>
                </div>
                <div className="flex items-start space-x-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span><strong>Strict Anti-Hype Filter:</strong> Actively filters out clickbait affiliate fluff.</span>
                </div>
                <div className="flex items-start space-x-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span><strong>Pedagogical Bridging:</strong> Converts meme humor into enterprise runtime mastery.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Award className="w-4 h-4 text-amber-400" aria-hidden="true" />
            <span>Transforms passive scrolling into measurable career skill progression.</span>
          </div>

          <button
            aria-label="Dismiss & Return to Interactive Demo"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition shadow-md focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
          >
            Dismiss & Return
          </button>
        </div>
      </div>
    </div>
  );
});

TrapComparisonModal.displayName = 'TrapComparisonModal';

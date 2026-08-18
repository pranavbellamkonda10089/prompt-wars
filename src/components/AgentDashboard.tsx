import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Layers, 
  ChevronRight, 
  ChevronDown, 
  Flame, 
  Compass, 
  CheckCircle2, 
  Activity,
  BarChart3,
  FileCode2
} from 'lucide-react';
import { RecommendationResult, AgentChainStep } from '../types/reel';

interface AgentDashboardProps {
  recommendation: RecommendationResult;
  onOpenTrapModal: () => void;
}

export const AgentDashboard: React.FC<AgentDashboardProps> = ({
  recommendation,
  onOpenTrapModal
}) => {
  const [expandedStepId, setExpandedStepId] = useState<string | null>('step-3'); // Default expand trap detection step

  const toggleStep = (stepId: string) => {
    setExpandedStepId(prev => (prev === stepId ? null : stepId));
  };

  const getPhaseIcon = (phase: AgentChainStep['phase'], status: AgentChainStep['status']) => {
    if (status === 'warning') return <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />;
    
    switch (phase) {
      case 'INGESTION':
        return <Layers className="w-4 h-4 text-cyan-400" />;
      case 'LATENT_INFERENCE':
        return <BrainCircuit className="w-4 h-4 text-purple-400" />;
      case 'TRAP_DETECTION':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'ANTI_HYPE_FILTER':
        return <Flame className="w-4 h-4 text-rose-400" />;
      case 'CURRICULUM_MATCH':
        return <Compass className="w-4 h-4 text-blue-400" />;
      case 'SYNTHESIS':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default:
        return <Activity className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-indigo-500/20 shadow-xl flex flex-col space-y-4">
      {/* Header with Live Status Indicator */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300">
            <BrainCircuit className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white tracking-tight">AI Agent Reasoning Core</h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1" />
                Live CoT Trace
              </span>
            </div>
            <p className="text-xs text-slate-400">Continuous multimodal intent synthesis & anti-trap pipeline</p>
          </div>
        </div>

        {/* Trap Comparison Trigger */}
        <button
          onClick={onOpenTrapModal}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition shadow-sm hover:shadow-amber-500/20 hover:scale-[1.02]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Trap Matrix Demo</span>
        </button>
      </div>

      {/* Latent Inferred Interests Radar / Distribution */}
      <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
            Inferred Latent Affinity Vectors (0-100%)
          </span>
          <span className="text-[10px] font-mono text-slate-400">Multi-reel Synthesis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {recommendation.interestVector.map((interest, idx) => (
            <div key={idx} className="space-y-1 bg-slate-950/60 p-2 rounded-lg border border-white/5">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300 font-medium truncate">{interest.name}</span>
                <span className="font-mono font-bold text-indigo-300">{interest.score}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    interest.score > 80 
                      ? 'bg-gradient-to-r from-indigo-500 to-cyan-400' 
                      : 'bg-slate-600'
                  }`}
                  style={{ width: `${interest.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chain of Thought Step Timeline */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-semibold">
          <span>Agent Chain of Thought (6 Phases)</span>
          <span className="font-mono text-[10px] text-indigo-300">Deterministic + Cognitive Filter</span>
        </div>

        <div className="space-y-2">
          {recommendation.chainOfThought.map((step) => {
            const isExpanded = expandedStepId === step.id;
            const isWarning = step.status === 'warning';

            return (
              <div 
                key={step.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isWarning 
                    ? 'bg-amber-950/20 border-amber-500/40 shadow-sm shadow-amber-500/10' 
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-indigo-500/30'
                }`}
              >
                <div 
                  onClick={() => toggleStep(step.id)}
                  className="flex items-center justify-between p-2.5 cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`p-1.5 rounded-lg ${
                      isWarning ? 'bg-amber-500/20' : 'bg-slate-800'
                    }`}>
                      {getPhaseIcon(step.phase, step.status)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-semibold ${
                          isWarning ? 'text-amber-300' : 'text-slate-200'
                        }`}>
                          {step.title}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-mono bg-slate-800 text-slate-400">
                          {step.phase}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-slate-400">
                    <span className="text-[10px] font-mono">{step.timestamp}</span>
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-3.5 pb-3 pt-1 border-t border-slate-800/80 text-xs space-y-2">
                    <p className="text-slate-300 leading-relaxed">
                      {step.description}
                    </p>

                    {step.detailJson && (
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 font-mono text-[11px] text-indigo-200 overflow-x-auto">
                        <div className="text-[10px] text-slate-500 mb-1 font-sans font-semibold flex items-center gap-1">
                          <FileCode2 className="w-3 h-3 text-indigo-400" />
                          <span>Internal Inspection Payload</span>
                        </div>
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(step.detailJson, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Anti-Hype & Pedagogical Integrity Banner */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-950 border border-indigo-500/30 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded bg-indigo-500/20 text-indigo-300">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-indigo-200">Anti-Hype Filter Rating: </span>
            <span className="font-mono text-emerald-400 font-bold">
              {recommendation.antiHypeVerification.educationalDepthScore}/100 High Educational Signal
            </span>
            <p className="text-[11px] text-slate-400">Bypasses low-effort AI listicles & entry-level loops</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono">
          0% Fluff Verified
        </span>
      </div>
    </div>
  );
};

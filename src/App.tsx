import { useState, useEffect, useCallback, useMemo } from 'react';
import { Navbar, PageView } from './components/Navbar';
import { ReelPlayer } from './components/ReelPlayer';
import { AgentDashboard } from './components/AgentDashboard';
import { OutputInspector } from './components/OutputInspector';
import { TrapComparisonModal } from './components/TrapComparisonModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SAMPLE_REELS, SCENARIO_PRESETS } from './data/sampleReels';
import { WatchInteraction, RecommendationResult, Reel } from './types/reel';
import { analyzeWatchHistoryAndRecommend } from './services/recommendationAgent';
import { Sparkles, BrainCircuit, ArrowRight, X } from 'lucide-react';

export function App() {
  // ── Core application state ──
  const [activePage, setActivePage] = useState<PageView>('reels');
  const [currentReelIndex, setCurrentReelIndex] = useState<number>(0);
  const [watchHistory, setWatchHistory] = useState<WatchInteraction[]>([]);
  const [isTrapModalOpen, setIsTrapModalOpen] = useState<boolean>(false);
  const [isReelsAiPillOpen, setIsReelsAiPillOpen] = useState<boolean>(false);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [generatedReels, setGeneratedReels] = useState<Reel[]>([]);

  // ── Current focused reel ID ──
  const currentReelId = useMemo(() => {
    return (SAMPLE_REELS[currentReelIndex] || SAMPLE_REELS[0]).id;
  }, [currentReelIndex]);

  // ── Derived recommendation (synchronous & memoized) ──
  const recommendation: RecommendationResult = useMemo(() => {
    return analyzeWatchHistoryAndRecommend(watchHistory, currentReelId);
  }, [watchHistory, currentReelId]);

  // ── When recommendation changes, generate a new reel if one doesn't exist yet ──
  useEffect(() => {
    if (!recommendation || !recommendation.output) return;
    const title = recommendation.output['RECOMMENDED TECH REEL'];
    if (!title) return;
    // Avoid duplicates
    const exists = [...SAMPLE_REELS, ...generatedReels].some(r => r.title === title);
    if (exists) return;
    const newReel: Reel = {
      id: `generated-${Date.now()}`,
      title,
      creator: 'AI Generated',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      caption: `Auto‑generated reel based on AI recommendation: ${title}`,
      tags: ['#AI', '#LatentBridge', '#TechPath'],
      themeColor: '#4b6cb7',
      durationSeconds: 15,
      format: 'Tutorial',
      surfaceKeywords: ['Architecture', 'Engineering'],
      latentSignals: ['Deep Technical Learning'],
      videoType: 'code',
      videoUrl: 'https://cdn.jsdelivr.net/gh/nicedoc/reelvid/placeholder.mp4',
      posterUrl: undefined,
      audioTrack: { title: 'Generated Track', artist: 'AI', isOriginal: true },
      comments: [],
      stats: { likes: 0, commentsCount: 0, saves: 0, shares: 0 },
    };
    setGeneratedReels(prev => [...prev, newReel]);
  }, [recommendation.output?.['RECOMMENDED TECH REEL'], generatedReels]);

  // ── Combine static + generated reels (memoized) ──
  const allReels = useMemo(() => {
    return [...SAMPLE_REELS, ...generatedReels];
  }, [generatedReels]);

  // ── Preset helper (memoized callback) ──
  const applyPreset = useCallback((presetId: string) => {
    const preset = SCENARIO_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setActivePresetId(presetId);
      // Build watch history from the preset's reel IDs
      const syntheticHistory: WatchInteraction[] = preset.reelIds.map(reelId => ({
        reelId,
        watchTimeSeconds: 15,
        completedPercent: 100,
        liked: false,
        saved: false,
        timestamp: Date.now(),
      }));
      setWatchHistory(syntheticHistory);
      // Jump to the first reel in the preset
      const firstReelIdx = SAMPLE_REELS.findIndex(r => r.id === preset.reelIds[0]);
      setCurrentReelIndex(firstReelIdx >= 0 ? firstReelIdx : 0);
    }
  }, []);

  // ── Reset everything (memoized callback) ──
  const handleResetSession = useCallback(() => {
    setActivePage('reels');
    setCurrentReelIndex(0);
    setWatchHistory([]);
    setGeneratedReels([]);
    setIsTrapModalOpen(false);
    setIsReelsAiPillOpen(false);
    setActivePresetId(null);
  }, []);

  const handleOpenTrapModal = useCallback(() => setIsTrapModalOpen(true), []);
  const handleCloseTrapModal = useCallback(() => setIsTrapModalOpen(false), []);
  const handleOpenReelsAiPill = useCallback(() => setIsReelsAiPillOpen(true), []);
  const handleCloseReelsAiPill = useCallback(() => setIsReelsAiPillOpen(false), []);

  return (
    <ErrorBoundary>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-xl focus:shadow-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-xs font-bold"
      >
        Skip to main content
      </a>
      <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
        {/* Top Navigation Bar with View Switcher */}
        <Navbar 
          activePage={activePage}
          onSelectPage={setActivePage}
          onOpenTrapModal={handleOpenTrapModal}
          onResetSession={handleResetSession}
          isTrapActive={recommendation.trapDetected}
        />

        {/* Main Content Body */}
        <main 
          id="main-content"
          role="main"
          className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8"
        >
          {/* VIEW 1: DEDICATED INSTAGRAM REELS PAGE */}
          {activePage === 'reels' && (
            <div className="relative flex flex-col items-center justify-center py-2 animate-in fade-in duration-300">
              {/* Top Floating AI Co-Pilot Status Pill */}
              <div 
                role="status"
                aria-live="polite"
                className="w-full max-w-lg mb-4 flex items-center justify-between p-2.5 px-4 rounded-2xl glass-panel bg-slate-900/90 border border-indigo-500/30 shadow-lg"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400" aria-hidden="true">
                    <BrainCircuit className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <span>AI Latent Detection</span>
                      {recommendation.trapDetected && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                          Trap Avoided
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-indigo-200 truncate max-w-[240px] sm:max-w-xs">
                      {recommendation.output['INTEREST DETECTED']}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    aria-label="Inspect AI recommendation and reasoning details"
                    onClick={handleOpenReelsAiPill}
                    className="px-2.5 py-1 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
                  >
                    Inspect AI
                  </button>
                </div>
              </div>

              {/* Centered Instagram Reel Player */}
              <ReelPlayer
                currentReelIndex={currentReelIndex}
                onSelectReelIndex={setCurrentReelIndex}
                watchHistory={watchHistory}
                onUpdateWatchHistory={setWatchHistory}
                onApplyPreset={applyPreset}
                activePresetId={activePresetId}
                allReels={allReels}
              />

              {/* Quick Slide-Up AI Recommendation Drawer for the Reels Page */}
              {isReelsAiPillOpen && (
                <div 
                  role="dialog"
                  aria-modal="true"
                  aria-label="Live AI Recommendation"
                  className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                  onClick={handleCloseReelsAiPill}
                >
                  <div 
                    className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel bg-slate-950/95 border border-indigo-500/40 rounded-3xl p-5 space-y-4 shadow-2xl"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-indigo-400" aria-hidden="true" />
                        <h3 className="font-bold text-base text-white">Live AI Recommendation</h3>
                      </div>
                      <button 
                        aria-label="Close recommendation modal"
                        onClick={handleCloseReelsAiPill}
                        className="p-1 rounded-full text-slate-400 hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
                      >
                        <X className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Standard 8-Key Output in modal */}
                    <OutputInspector recommendation={recommendation} />

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => {
                          handleCloseReelsAiPill();
                          setActivePage('agent');
                        }}
                        className="flex items-center space-x-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
                      >
                        <span>Open Full AI Reasoning Dashboard</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <button
                        onClick={handleCloseReelsAiPill}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW 2: SPLIT SCREEN (SIDE-BY-SIDE CO-PILOT) */}
          {activePage === 'split' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
              {/* Left Column: ReelPlayer */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center sticky top-20">
                <div className="w-full">
                  <ReelPlayer
                    currentReelIndex={currentReelIndex}
                    onSelectReelIndex={setCurrentReelIndex}
                    watchHistory={watchHistory}
                    onUpdateWatchHistory={setWatchHistory}
                    onApplyPreset={applyPreset}
                    activePresetId={activePresetId}
                    allReels={allReels}
                  />
                </div>
              </div>

              {/* Right Column: AgentDashboard & OutputInspector stacked */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                <AgentDashboard
                  recommendation={recommendation}
                  onOpenTrapModal={handleOpenTrapModal}
                />

                <OutputInspector
                  recommendation={recommendation}
                />
              </div>
            </div>
          )}

          {/* VIEW 3: DEDICATED FULL AI INTELLIGENCE DASHBOARD PAGE */}
          {activePage === 'agent' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl glass-panel bg-slate-900/80 border border-indigo-500/30">
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight">
                    AI Intelligence & Cognitive Reasoning Center
                  </h2>
                  <p className="text-xs text-slate-400">
                    Full-spectrum multi-reel intent synthesis, trap avoidance, and 8-key standardized contract verification.
                  </p>
                </div>

                <button
                  aria-label="Return to Reels Feed"
                  onClick={() => setActivePage('reels')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white text-xs font-bold transition shadow-md shadow-rose-600/30 focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:outline-none"
                >
                  <span>Back to Reels Feed</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <AgentDashboard
                  recommendation={recommendation}
                  onOpenTrapModal={handleOpenTrapModal}
                />

                <OutputInspector
                  recommendation={recommendation}
                />
              </div>
            </div>
          )}
        </main>

        {/* Trap Benchmark Comparison Modal */}
        <TrapComparisonModal
          isOpen={isTrapModalOpen}
          onClose={handleCloseTrapModal}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;

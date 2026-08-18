import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Camera, 
  Music, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  X, 
  ChevronDown,
  ChevronUp,
  Terminal, 
  Cpu, 
  Coffee,
  Home,
  Search,
  PlusSquare,
  Sparkles,
  Flame,
  RotateCcw,
  Eye,
  Check,
  Film,
  Server,
  Bot,
  ShieldAlert,
  Gamepad2
} from 'lucide-react';
import { WatchInteraction, ReelComment, Reel } from '../types/reel';
import { SAMPLE_REELS, SCENARIO_PRESETS } from '../data/sampleReels';
import confetti from 'canvas-confetti';

interface ReelPlayerProps {
  currentReelIndex: number;
  onSelectReelIndex: (index: number) => void;
  watchHistory: WatchInteraction[];
  onUpdateWatchHistory: (history: WatchInteraction[]) => void;
  onApplyPreset: (presetId: string) => void;
  activePresetId: string | null;
  allReels: Reel[];
}

export const ReelPlayer: React.FC<ReelPlayerProps> = React.memo(({
  currentReelIndex,
  onSelectReelIndex,
  watchHistory,
  onUpdateWatchHistory,
  onApplyPreset,
  activePresetId,
  allReels
}) => {
  const reelList = allReels && allReels.length ? allReels : SAMPLE_REELS;
  const currentReel = reelList[currentReelIndex] || reelList[0];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Playback & Interaction States
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<Record<string, boolean>>({});
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [savedMap, setSavedMap] = useState<Record<string, boolean>>({});
  const [likeCountOffset, setLikeCountOffset] = useState<Record<string, number>>({});
  
  // Double-tap heart animation & burst
  const [doubleTapHearts, setDoubleTapHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const lastTapRef = useRef<number>(0);

  // Caption expansion
  const [isCaptionExpanded, setIsCaptionExpanded] = useState<boolean>(false);

  // Instagram Modals
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState<boolean>(false);

  // Dynamic comments
  const [customComments, setCustomComments] = useState<Record<string, ReelComment[]>>({});
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  const isLiked = !!likedMap[currentReel.id];
  const isSaved = !!savedMap[currentReel.id];
  const following = !!isFollowing[currentReel.creator];

  // Video source change & playback initialization
  useEffect(() => {
    setProgress(0);
    setIsCaptionExpanded(false);
    setIsCommentsOpen(false);
    setIsShareOpen(false);
    setIsMoreMenuOpen(false);
    setVideoError(false);

    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.currentTime = 0;
      videoRef.current.load();
      
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().catch(() => {});
            }
          });
      }
    }
  }, [currentReelIndex]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNextReel();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevReel();
      } else if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentReelIndex, isPlaying]);

  // Handle Play/Pause toggling on video element
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  // Sync mute state on video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Unique 60 FPS Procedural Canvas Animation tailored per reel type
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = frame * 0.04;
      const width = canvas.width;
      const height = canvas.height;

      // Unique visual drawing based on reel id
      switch (currentReel.id) {
        case 'reel-java-meme': {
          // Matrix Green / Orange Code Cascade
          ctx.fillStyle = '#080c14';
          ctx.fillRect(0, 0, width, height);
          ctx.fillStyle = '#f9731633';
          ctx.font = '12px monospace';
          const chars = '01{}<>class;public;static;void;main;Factory;';
          for (let i = 0; i < 16; i++) {
            const char = chars[Math.floor((frame + i * 7) % chars.length)];
            const y = (frame * 3 + i * 45) % height;
            ctx.fillText(char, i * 26 + 10, y);
          }
          break;
        }

        case 'reel-swe-lifestyle': {
          // Purple Sunset Gradient with floating coffee bubbles
          const grad = ctx.createLinearGradient(0, 0, 0, height);
          grad.addColorStop(0, '#1e1b4b');
          grad.addColorStop(0.6, '#312e81');
          grad.addColorStop(1, '#090d16');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // Steam particles
          for (let i = 0; i < 12; i++) {
            const px = width / 2 + Math.sin(time + i) * 35;
            const py = height / 2 - ((frame * 2 + i * 30) % 180);
            ctx.beginPath();
            ctx.arc(px, py, (i % 3) + 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fill();
          }
          break;
        }

        case 'reel-interview-joke': {
          // Red Alert Binary Tree Network
          ctx.fillStyle = '#0f0505';
          ctx.fillRect(0, 0, width, height);
          // Nodes
          const rootX = width / 2;
          const rootY = height / 3;
          ctx.strokeStyle = '#ef444466';
          ctx.lineWidth = 2;
          
          // Draw Tree Branches
          ctx.beginPath();
          ctx.moveTo(rootX, rootY);
          ctx.lineTo(rootX - 50, rootY + 60);
          ctx.moveTo(rootX, rootY);
          ctx.lineTo(rootX + 50, rootY + 60);
          ctx.stroke();

          // Draw Animated Nodes
          [
            { x: rootX, y: rootY, label: 'Root' },
            { x: rootX - 50, y: rootY + 60, label: 'L' },
            { x: rootX + 50, y: rootY + 60, label: 'R' }
          ].forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 14 + Math.sin(time) * 2, 0, Math.PI * 2);
            ctx.fillStyle = '#ef4444';
            ctx.fill();
          });
          break;
        }

        case 'reel-laptop-comparison': {
          // Cyan CPU Circuit Grid & Thermal Waves
          ctx.fillStyle = '#041d2d';
          ctx.fillRect(0, 0, width, height);
          ctx.strokeStyle = '#06b6d444';
          ctx.lineWidth = 1;
          for (let i = 0; i < width; i += 30) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
          }
          // Glowing Chip Core
          ctx.fillStyle = '#06b6d4';
          ctx.fillRect(width / 2 - 35, height / 3 - 35, 70, 70);
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 10px monospace';
          ctx.fillText('M3 MAX', width / 2 - 22, height / 3 + 4);
          break;
        }

        case 'reel-ue5-physics': {
          // Emerald Chaos Wireframe
          ctx.fillStyle = '#022c22';
          ctx.fillRect(0, 0, width, height);
          ctx.strokeStyle = '#10b98188';
          ctx.beginPath();
          ctx.arc(width / 2 + Math.cos(time) * 40, height / 3 + Math.sin(time * 1.5) * 40, 30, 0, Math.PI * 2);
          ctx.stroke();
          break;
        }

        case 'reel-ai-prompt-meme': {
          // Deep Purple Neural Synapse Points
          ctx.fillStyle = '#1e0533';
          ctx.fillRect(0, 0, width, height);
          ctx.fillStyle = '#a855f7';
          for (let i = 0; i < 18; i++) {
            const x = (Math.sin(time + i * 1.5) * 0.4 + 0.5) * width;
            const y = (Math.cos(time + i * 2) * 0.4 + 0.5) * height;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }

        case 'reel-cloud-outage': {
          // Blue & Emergency Red Server Pulses
          ctx.fillStyle = '#09152e';
          ctx.fillRect(0, 0, width, height);
          const isAlarm = Math.sin(time * 3) > 0;
          ctx.fillStyle = isAlarm ? 'rgba(239, 68, 68, 0.3)' : 'rgba(59, 130, 246, 0.2)';
          ctx.fillRect(0, 0, width, height);
          break;
        }

        case 'reel-zero-day': {
          // Pink Hex Memory Matrix
          ctx.fillStyle = '#200516';
          ctx.fillRect(0, 0, width, height);
          ctx.fillStyle = '#ec489955';
          ctx.font = '11px monospace';
          for (let i = 0; i < 14; i++) {
            ctx.fillText(`0x7F${(frame * 4 + i * 12).toString(16).toUpperCase().padStart(4, '0')}`, 15, i * 25 + 30);
          }
          break;
        }

        default: {
          const grad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, width);
          grad.addColorStop(0, currentReel.themeColor ? `${currentReel.themeColor}33` : 'rgba(99, 102, 241, 0.2)');
          grad.addColorStop(1, 'rgba(8, 12, 20, 0.95)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentReelIndex, currentReel.id, currentReel.themeColor]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || currentReel.durationSeconds;
    if (total > 0) {
      const currentPercent = (current / total) * 100;
      setProgress(currentPercent);

      if (currentPercent >= 90) {
        recordInteraction(currentReel.id, 100);
      }
    }
  };

  const recordInteraction = (reelId: string, completedPercent: number) => {
    const existingIndex = watchHistory.findIndex(w => w.reelId === reelId);
    const newInteraction: WatchInteraction = {
      reelId,
      watchTimeSeconds: Math.round((completedPercent / 100) * currentReel.durationSeconds),
      completedPercent,
      liked: !!likedMap[reelId],
      saved: !!savedMap[reelId],
      timestamp: Date.now()
    };

    if (existingIndex >= 0) {
      const updated = [...watchHistory];
      updated[existingIndex] = newInteraction;
      onUpdateWatchHistory(updated);
    } else {
      onUpdateWatchHistory([...watchHistory, newInteraction]);
    }
  };


  // Update navigation handlers to use reelList length
  const handleNextReel = () => {
    recordInteraction(currentReel.id, progress > 0 ? progress : 100);
    const nextIndex = (currentReelIndex + 1) % reelList.length;
    onSelectReelIndex(nextIndex);
  };

  const handlePrevReel = () => {
    recordInteraction(currentReel.id, progress > 0 ? progress : 100);
    const prevIndex = (currentReelIndex - 1 + reelList.length) % reelList.length;
    onSelectReelIndex(prevIndex);
  };

  const togglePlayPause = () => {
    setIsPlaying(prev => {
      const nextState = !prev;
      if (videoRef.current) {
        if (nextState) videoRef.current.play().catch(() => {});
        else videoRef.current.pause();
      }
      return nextState;
    });
    setShowPlayPauseIcon(true);
    setTimeout(() => setShowPlayPauseIcon(false), 600);
  };

  // Video Screen Click & Double Tap Handler (Instagram Style)
  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      triggerDoubleTapLike(x, y);
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
      setTimeout(() => {
        if (lastTapRef.current === now) {
          togglePlayPause();
        }
      }, DOUBLE_TAP_DELAY + 20);
    }
  };

  const triggerDoubleTapLike = (x: number, y: number) => {
    if (!isLiked) {
      setLikedMap(prev => ({ ...prev, [currentReel.id]: true }));
      setLikeCountOffset(prev => ({
        ...prev,
        [currentReel.id]: (prev[currentReel.id] || 0) + 1
      }));
      recordInteraction(currentReel.id, progress);
    }

    const heartId = Date.now();
    setDoubleTapHearts(prev => [...prev, { id: heartId, x, y }]);
    setTimeout(() => {
      setDoubleTapHearts(prev => prev.filter(h => h.id !== heartId));
    }, 1000);

    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  const handleLikeButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = !isLiked;
    setLikedMap(prev => ({ ...prev, [currentReel.id]: newLiked }));
    setLikeCountOffset(prev => ({
      ...prev,
      [currentReel.id]: (prev[currentReel.id] || 0) + (newLiked ? 1 : -1)
    }));

    if (newLiked) {
      confetti({ particleCount: 25, spread: 60, origin: { y: 0.7 } });
    }
    recordInteraction(currentReel.id, progress);
  };

  const handleSaveButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSaved = !isSaved;
    setSavedMap(prev => ({ ...prev, [currentReel.id]: newSaved }));
    recordInteraction(currentReel.id, progress);
  };

  const handleFollowToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing(prev => ({ ...prev, [currentReel.creator]: !prev[currentReel.creator] }));
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: ReelComment = {
      id: `custom-${Date.now()}`,
      user: 'you.tech',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      text: newCommentText.trim(),
      timeAgo: 'Just now',
      likes: 1,
      isLiked: true
    };

    const existing = customComments[currentReel.id] || currentReel.comments;
    setCustomComments(prev => ({
      ...prev,
      [currentReel.id]: [newComment, ...existing]
    }));
    setNewCommentText('');
  };

  const totalLikes = currentReel.stats.likes + (likeCountOffset[currentReel.id] || 0);
  const activeCommentsList = customComments[currentReel.id] || currentReel.comments;

  // Render Topic-Specific Interactive Stickers & Overlays
  const renderInteractiveOverlaySticker = () => {
    switch (currentReel.id) {
      case 'reel-java-meme':
        return (
          <div className="absolute top-16 left-4 right-14 z-10 pointer-events-none animate-in fade-in zoom-in duration-300">
            <div className="bg-[#161b22]/95 border border-orange-500/40 rounded-2xl p-3 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] font-mono text-orange-400 font-bold">FactoryManagerSingleton.java</span>
                <Terminal className="w-3 h-3 text-orange-400" />
              </div>
              <div className="pt-2 font-mono text-[10px] space-y-0.5 text-slate-200">
                <p className="text-purple-400">public class FactoryManager &#123;</p>
                <p className="pl-2 text-blue-400">public static void <span className="text-amber-300">main</span>(String[] a) &#123;</p>
                <p className="pl-4 text-emerald-400">System.out.<span className="text-cyan-300">println</span>("Hello World");</p>
                <p className="pl-4 text-rose-400/90 animate-pulse">// 497 more lines...</p>
                <p className="pl-2 text-blue-400">&#125;</p>
                <p className="text-purple-400">&#125;</p>
              </div>
            </div>
          </div>
        );

      case 'reel-swe-lifestyle':
        return (
          <div className="absolute top-16 left-4 z-10 pointer-events-none">
            <div className="px-3 py-1.5 rounded-xl bg-indigo-950/90 border border-indigo-500/50 backdrop-blur-md text-indigo-200 text-xs flex items-center gap-2 shadow-lg">
              <Coffee className="w-4 h-4 text-amber-300" />
              <span>7:30 AM • Silicon Valley SWE Routine 🍣☕</span>
            </div>
          </div>
        );

      case 'reel-interview-joke':
        return (
          <div className="absolute top-16 left-4 right-14 z-10 pointer-events-none animate-in fade-in zoom-in duration-300">
            <div className="bg-[#1f0a0a]/95 border border-rose-500/50 rounded-2xl p-3 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-1.5 border-b border-rose-900/60">
                <span className="text-[10px] font-mono text-rose-400 font-bold">LeetCode_BinaryTree.cpp</span>
                <span className="text-[9px] px-1 rounded bg-rose-500/20 text-rose-300 font-mono">Hard O(1)</span>
              </div>
              <div className="pt-2 font-mono text-[10px] space-y-0.5 text-slate-200">
                <p className="text-purple-400">TreeNode* <span className="text-amber-300">invertTree</span>(TreeNode* root) &#123;</p>
                <p className="pl-2 text-slate-400">// Interviewer: Invert in O(1) space on whiteboard</p>
                <p className="pl-2 text-rose-400 font-bold animate-pulse">throw new PanicException("💀");</p>
                <p className="text-purple-400">&#125;</p>
              </div>
            </div>
          </div>
        );

      case 'reel-laptop-comparison':
        return (
          <div className="absolute top-16 left-4 z-10 pointer-events-none">
            <div className="px-3 py-1.5 rounded-xl bg-cyan-950/90 border border-cyan-500/50 backdrop-blur-md text-cyan-300 font-mono text-xs flex items-center gap-2 shadow-lg">
              <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>M3 Max (340GB/s) vs RTX 4090 @ 98°C</span>
            </div>
          </div>
        );

      case 'reel-ue5-physics':
        return (
          <div className="absolute top-16 left-4 z-10 pointer-events-none">
            <div className="px-3 py-1.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 backdrop-blur-md text-emerald-300 text-xs flex items-center gap-2 shadow-lg">
              <Gamepad2 className="w-4 h-4 text-emerald-400" />
              <span>UE5 Ragdoll Chaos Physics Glitch 🚀</span>
            </div>
          </div>
        );

      case 'reel-ai-prompt-meme':
        return (
          <div className="absolute top-16 left-4 z-10 pointer-events-none">
            <div className="px-3 py-1.5 rounded-xl bg-purple-950/90 border border-purple-500/50 backdrop-blur-md text-purple-300 text-xs flex items-center gap-2 shadow-lg">
              <Bot className="w-4 h-4 text-purple-400" />
              <span>Midjourney Latent Diffusion: 14 Fingers 🖐️</span>
            </div>
          </div>
        );

      case 'reel-cloud-outage':
        return (
          <div className="absolute top-16 left-4 z-10 pointer-events-none">
            <div className="px-3 py-1.5 rounded-xl bg-blue-950/90 border border-blue-500/50 backdrop-blur-md text-blue-300 text-xs flex items-center gap-2 shadow-lg">
              <Server className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>K8s Cluster Multi-Region Outage 🚒</span>
            </div>
          </div>
        );

      case 'reel-zero-day':
        return (
          <div className="absolute top-16 left-4 z-10 pointer-events-none">
            <div className="px-3 py-1.5 rounded-xl bg-pink-950/90 border border-pink-500/50 backdrop-blur-md text-pink-300 text-xs flex items-center gap-2 shadow-lg font-mono">
              <ShieldAlert className="w-4 h-4 text-pink-400" />
              <span>0x7FFF5FBFF Buffer Overflow 0-Day</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[430px] mx-auto select-none">
      {/* Preset Quick Switcher */}
      <div className="w-full mb-3 flex flex-wrap gap-1.5 justify-center">
        {SCENARIO_PRESETS.map(preset => {
          const isActive = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onApplyPreset(preset.id)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-full transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/40 scale-105'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
              }`}
              title={preset.description}
            >
              {preset.id === 'built-in-trap' ? (
                <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              ) : (
                <Flame className="w-3 h-3 text-indigo-300" />
              )}
              {preset.name.split(' (')[0]}
            </button>
          );
        })}
      </div>

      {/* Instagram Mobile Device Simulation */}
      <div className="relative w-full h-[680px] bg-black rounded-[46px] p-2.5 shadow-2xl border-[5px] border-slate-800 ring-1 ring-white/15 flex flex-col overflow-hidden">
        {/* Dynamic Island / iPhone Notch */}
        <div className="relative z-30 flex items-center justify-between px-6 pt-2 pb-1 text-[11px] font-semibold text-white">
          <span>9:41</span>
          <div className="w-24 h-4 bg-black rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-700/50 mr-2" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px]">5G</span>
            <div className="w-4 h-2.5 border border-white rounded-sm p-0.5 flex items-center">
              <div className="w-full h-full bg-white rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Video Reel Canvas & Instagram UI Layer */}
        <div 
          className="relative flex-1 rounded-[36px] overflow-hidden bg-black flex flex-col cursor-pointer"
          onClick={handleScreenClick}
        >
          {/* Background Procedural 60fps Canvas (Distinct visual identity for each reel) */}
          <canvas
            ref={canvasRef}
            width={400}
            height={600}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Real Playing Video Element (Layered with distinct video stream per reel) */}
          {!videoError && (
            <video
              ref={videoRef}
              key={currentReel.videoUrl}
              src={currentReel.videoUrl}
              poster={currentReel.posterUrl}
              autoPlay
              playsInline
              loop
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onError={() => {
                setVideoError(true);
              }}
              className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-300"
            />
          )}

          {/* Semi-transparent dark gradient overlay for Instagram text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85 pointer-events-none" />

          {/* Interactive Topic-Specific Overlay Sticker */}
          {renderInteractiveOverlaySticker()}

          {/* Top Instagram Reels Header */}
          <div 
            className="absolute top-0 left-0 right-0 z-20 px-4 pt-3 flex items-center justify-between text-white"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center space-x-1 font-bold text-lg tracking-tight drop-shadow-md">
              <span>Reels</span>
              <ChevronDown className="w-4 h-4 text-white/80" />
            </div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsMuted(!isMuted)} 
                className="p-1.5 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 text-white"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>
              <button className="p-1.5 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 text-white">
                <Camera className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Reel Progress Bar */}
          <div className="absolute top-0 left-0 right-0 z-20 h-0.5 bg-white/20">
            <div 
              className="h-full bg-white transition-all duration-100 ease-linear shadow-[0_0_6px_#ffffff]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Play/Pause Center Flash Indicator */}
          {showPlayPauseIcon && (
            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
              <div className="p-4 rounded-full bg-black/60 backdrop-blur-md text-white animate-scale-up">
                {isPlaying ? <Play className="w-8 h-8 fill-white" /> : <Pause className="w-8 h-8 fill-white" />}
              </div>
            </div>
          )}

          {/* Double Tap Floating Heart Animations */}
          {doubleTapHearts.map(heart => (
            <div 
              key={heart.id} 
              className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-ping duration-700"
              style={{ left: heart.x, top: heart.y }}
            >
              <Heart className="w-24 h-24 text-rose-500 fill-rose-500 drop-shadow-2xl animate-bounce" />
            </div>
          ))}

          {/* Right-Side Instagram Action Rail */}
          <div 
            className="absolute right-2.5 bottom-16 z-30 flex flex-col items-center space-y-4 text-white"
            onClick={e => e.stopPropagation()}
          >
            {/* Like Button */}
            <button 
              aria-label={isLiked ? "Unlike reel" : "Like reel"}
              onClick={handleLikeButton}
              className="flex flex-col items-center focus:outline-none group active:scale-75 transition-transform focus-visible:ring-2 focus-visible:ring-rose-400 rounded-full"
            >
              <div className="p-1">
                <Heart 
                  aria-hidden="true"
                  className={`w-7 h-7 drop-shadow-lg transition-colors ${
                    isLiked ? 'text-rose-500 fill-rose-500 scale-110' : 'text-white hover:text-white/80'
                  }`} 
                />
              </div>
              <span className="text-[11px] font-semibold text-white drop-shadow">
                {totalLikes >= 1000 ? `${(totalLikes / 1000).toFixed(1)}K` : totalLikes}
              </span>
            </button>

            {/* Comment Button */}
            <button 
              aria-label="View and post comments"
              onClick={() => setIsCommentsOpen(true)}
              className="flex flex-col items-center focus:outline-none group active:scale-75 transition-transform focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-full"
            >
              <div className="p-1">
                <MessageCircle aria-hidden="true" className="w-7 h-7 text-white drop-shadow-lg group-hover:text-white/80 -scale-x-100" />
              </div>
              <span className="text-[11px] font-semibold text-white drop-shadow">
                {activeCommentsList.length >= 1000 
                  ? `${(activeCommentsList.length / 1000).toFixed(1)}K` 
                  : activeCommentsList.length + currentReel.stats.commentsCount}
              </span>
            </button>

            {/* Share / Direct Message Paper Plane */}
            <button 
              aria-label="Share this reel"
              onClick={() => setIsShareOpen(true)}
              className="flex flex-col items-center focus:outline-none group active:scale-75 transition-transform focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-full"
            >
              <div className="p-1">
                <Send aria-hidden="true" className="w-7 h-7 text-white drop-shadow-lg group-hover:text-white/80" />
              </div>
              <span className="text-[11px] font-semibold text-white drop-shadow">
                {currentReel.stats.shares >= 1000 ? `${(currentReel.stats.shares / 1000).toFixed(1)}K` : currentReel.stats.shares}
              </span>
            </button>

            {/* Bookmark / Save */}
            <button 
              aria-label={isSaved ? "Remove from bookmarks" : "Bookmark this reel"}
              onClick={handleSaveButton}
              className="flex flex-col items-center focus:outline-none group active:scale-75 transition-transform focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-full"
            >
              <div className="p-1">
                <Bookmark 
                  aria-hidden="true"
                  className={`w-7 h-7 drop-shadow-lg transition-colors ${
                    isSaved ? 'text-white fill-white' : 'text-white hover:text-white/80'
                  }`} 
                />
              </div>
            </button>

            {/* More / Three Dots */}
            <button 
              aria-label="More reel options"
              onClick={() => setIsMoreMenuOpen(true)}
              className="p-1 text-white hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-full"
            >
              <MoreHorizontal aria-hidden="true" className="w-6 h-6 drop-shadow-lg" />
            </button>

            {/* Spinning Vinyl Audio Album Disc */}
            <div className="relative pt-1">
              <div className="w-7 h-7 rounded-full bg-slate-900 border-2 border-slate-700 overflow-hidden flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
                <img 
                  src={currentReel.avatar} 
                  alt="audio artwork" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -top-1 -left-1 text-[10px] text-white/90 animate-bounce">
                ♪
              </span>
            </div>
          </div>

          {/* Bottom Left Creator & Caption Info */}
          <div 
            className="absolute bottom-12 left-0 right-14 z-20 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-10 text-white"
            onClick={e => e.stopPropagation()}
          >
            {/* Creator Row + Follow Button */}
            <div className="flex items-center space-x-2.5 mb-2">
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                <img 
                  src={currentReel.avatar} 
                  alt={currentReel.creator}
                  className="w-7 h-7 rounded-full object-cover border-2 border-black" 
                />
              </div>
              
              <span className="font-bold text-xs text-white drop-shadow">
                {currentReel.creator}
              </span>

              <button
                onClick={handleFollowToggle}
                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold border transition ${
                  following
                    ? 'bg-transparent text-white/80 border-white/40'
                    : 'bg-transparent text-white border-white hover:bg-white/10'
                }`}
              >
                {following ? 'Following' : 'Follow'}
              </button>
            </div>

            {/* Caption with ...more expansion */}
            <div className="text-xs text-slate-100 font-normal leading-relaxed">
              <p className={isCaptionExpanded ? '' : 'line-clamp-2'}>
                {currentReel.caption}
              </p>
              {currentReel.caption.length > 80 && (
                <button
                  onClick={() => setIsCaptionExpanded(!isCaptionExpanded)}
                  className="text-slate-400 hover:text-white font-semibold text-[11px] mt-0.5"
                >
                  {isCaptionExpanded ? 'less' : '...more'}
                </button>
              )}
            </div>

            {/* Audio Ticker Marquee */}
            <div className="flex items-center space-x-2 mt-2.5 text-[11px] text-white/90">
              <Music className="w-3.5 h-3.5 flex-shrink-0 animate-pulse" />
              <div className="overflow-hidden whitespace-nowrap w-full">
                <div className="inline-block animate-marquee font-medium">
                  {currentReel.audioTrack.title} • {currentReel.creator}
                </div>
              </div>
            </div>
          </div>

          {/* Instagram Bottom Navigation Bar */}
          <div 
            className="absolute bottom-0 left-0 right-0 z-30 h-11 bg-black/90 backdrop-blur-md border-t border-white/10 px-6 flex items-center justify-between text-white"
            onClick={e => e.stopPropagation()}
          >
            <Home className="w-5 h-5 text-white/70 hover:text-white cursor-pointer" />
            <Search className="w-5 h-5 text-white/70 hover:text-white cursor-pointer" />
            <PlusSquare className="w-5 h-5 text-white/70 hover:text-white cursor-pointer" />
            <div className="p-1 rounded-md bg-white/20">
              <Film className="w-4 h-4 text-white fill-white" />
            </div>
            <div className="w-5 h-5 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 to-purple-500">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          {/* SLIDING INSTAGRAM COMMENTS BOTTOM SHEET */}
          {isCommentsOpen && (
            <div 
              className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col justify-end"
              onClick={() => setIsCommentsOpen(false)}
            >
              <div 
                className="w-full h-[75%] bg-[#121212] rounded-t-3xl border-t border-white/15 p-4 flex flex-col text-white shadow-2xl animate-in slide-in-from-bottom duration-300"
                onClick={e => e.stopPropagation()}
              >
                {/* Comments Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="w-6" />
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-1 bg-white/30 rounded-full mb-1.5" />
                    <span className="font-bold text-sm">Comments</span>
                  </div>
                  <button 
                    onClick={() => setIsCommentsOpen(false)}
                    className="p-1 rounded-full text-white/70 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1">
                  {activeCommentsList.map(comment => {
                    const isCommentLiked = likedComments[comment.id] || comment.isLiked;
                    return (
                      <div key={comment.id} className="flex items-start justify-between space-x-3 text-xs">
                        <div className="flex items-start space-x-2.5">
                          <img 
                            src={comment.avatar} 
                            alt={comment.user} 
                            className="w-7 h-7 rounded-full object-cover mt-0.5"
                          />
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-white">{comment.user}</span>
                              <span className="text-[10px] text-white/50">{comment.timeAgo}</span>
                            </div>
                            <p className="text-slate-200 leading-relaxed">{comment.text}</p>
                            <button className="text-[11px] font-semibold text-white/60 hover:text-white pt-0.5">
                              Reply
                            </button>
                          </div>
                        </div>

                        <button 
                          onClick={() => setLikedComments(prev => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                          className="flex flex-col items-center pt-1"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isCommentLiked ? 'text-rose-500 fill-rose-500' : 'text-white/60'}`} />
                          <span className="text-[9px] text-white/60 mt-0.5">
                            {comment.likes + (isCommentLiked ? 1 : 0)}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Emoji Bar */}
                <div className="flex justify-between px-2 py-1.5 border-t border-white/10 text-base">
                  {['❤️', '🔥', '👏', '😂', '😍', '💀', '🙌', '🚀'].map(emoji => (
                    <button 
                      key={emoji}
                      onClick={() => setNewCommentText(prev => prev + emoji)}
                      className="hover:scale-125 transition-transform"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                {/* Add Comment Input Bar */}
                <form onSubmit={handlePostComment} className="flex items-center space-x-2 pt-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-500 overflow-hidden flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" 
                      alt="You" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input 
                    type="text"
                    placeholder={`Add a comment for ${currentReel.creator}...`}
                    value={newCommentText}
                    onChange={e => setNewCommentText(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                  />
                  {newCommentText.trim() && (
                    <button 
                      type="submit"
                      className="text-xs font-bold text-indigo-400 hover:text-indigo-300 px-1"
                    >
                      Post
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* INSTAGRAM SHARE DIRECT MESSAGE MODAL */}
          {isShareOpen && (
            <div 
              className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col justify-end"
              onClick={() => setIsShareOpen(false)}
            >
              <div 
                className="w-full h-[60%] bg-[#121212] rounded-t-3xl border-t border-white/15 p-4 flex flex-col text-white shadow-2xl animate-in slide-in-from-bottom duration-300"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="w-6" />
                  <span className="font-bold text-sm">Share Reel</span>
                  <button onClick={() => setIsShareOpen(false)}>
                    <X className="w-5 h-5 text-white/70" />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-3 py-4 text-center text-xs">
                  {[
                    { name: 'Sarah Dev', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
                    { name: 'Alex SWE', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
                    { name: 'Jake SRE', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
                    { name: 'Add to Story', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
                  ].map((contact, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => {
                        confetti({ particleCount: 15, spread: 45 });
                        setIsShareOpen(false);
                      }}
                      className="flex flex-col items-center space-y-1.5 cursor-pointer group"
                    >
                      <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/50 group-hover:scale-105 transition" />
                      <span className="text-[11px] text-white/80">{contact.name}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setIsShareOpen(false);
                    confetti({ particleCount: 20, spread: 50 });
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition flex items-center justify-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Copy Reel Link</span>
                </button>
              </div>
            </div>
          )}

          {/* INSTAGRAM THREE DOTS MENU MODAL */}
          {isMoreMenuOpen && (
            <div 
              className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col justify-end"
              onClick={() => setIsMoreMenuOpen(false)}
            >
              <div 
                className="w-full bg-[#1e1e1e] rounded-t-3xl border-t border-white/15 p-3 flex flex-col text-xs text-white shadow-2xl space-y-1"
                onClick={e => e.stopPropagation()}
              >
                <button 
                  onClick={() => setIsMoreMenuOpen(false)}
                  className="w-full py-2.5 text-rose-400 font-bold hover:bg-white/5 rounded-xl text-center"
                >
                  Report...
                </button>
                <button 
                  onClick={() => setIsMoreMenuOpen(false)}
                  className="w-full py-2.5 text-white font-semibold hover:bg-white/5 rounded-xl text-center"
                >
                  Not interested
                </button>
                <button 
                  onClick={() => setIsMoreMenuOpen(false)}
                  className="w-full py-2.5 text-white font-semibold hover:bg-white/5 rounded-xl text-center"
                >
                  Why you're seeing this post
                </button>
                <button 
                  onClick={() => setIsMoreMenuOpen(false)}
                  className="w-full py-2.5 text-slate-400 hover:bg-white/5 rounded-xl text-center border-t border-white/10 mt-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dedicated Button-Driven Reel Navigation Bar */}
      <div className="w-full mt-3 flex items-center justify-between p-2 rounded-2xl glass-panel bg-slate-900/90 border border-indigo-500/30 shadow-lg">
        {/* Previous Reel Button */}
        <button
          onClick={handlePrevReel}
          className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition shadow-sm active:scale-95 border border-slate-700"
          title="Previous Reel (Arrow Up)"
        >
          <ChevronUp className="w-4 h-4 text-indigo-400" />
          <span>Prev Reel</span>
          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">[↑]</span>
        </button>

        {/* Play/Pause & Index indicator */}
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlayPause}
            className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-md shadow-indigo-600/30 active:scale-90"
            title={isPlaying ? 'Pause Reel (Space)' : 'Play Reel (Space)'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          </button>
          <span className="text-xs font-mono font-bold text-indigo-300">
            {currentReelIndex + 1} / {SAMPLE_REELS.length}
          </span>
        </div>

        {/* Next Reel Button */}
        <button
          onClick={handleNextReel}
          className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold transition shadow-md shadow-indigo-600/30 active:scale-95"
          title="Next Reel (Arrow Down)"
        >
          <span>Next Reel</span>
          <ChevronDown className="w-4 h-4" />
          <span className="text-[10px] text-indigo-200 font-mono hidden sm:inline">[↓]</span>
        </button>
      </div>

      {/* Watch Session History Badges */}
      <div className="w-full mt-3 glass-card rounded-xl p-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-semibold">
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>Watch History Stream ({watchHistory.length} Reels)</span>
          </div>
          <button 
            onClick={() => onUpdateWatchHistory([])}
            className="text-[10px] text-slate-400 hover:text-rose-400 flex items-center gap-0.5 transition"
            title="Clear Watch History"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            Reset
          </button>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {watchHistory.length === 0 ? (
            <span className="text-[11px] text-slate-500 italic py-0.5">Click "Next Reel" to advance and stream watch interactions...</span>
          ) : (
            watchHistory.map((item, idx) => {
              const reel = SAMPLE_REELS.find(r => r.id === item.reelId);
              if (!reel) return null;
              return (
                <div 
                  key={idx}
                  onClick={() => {
                    const foundIdx = SAMPLE_REELS.findIndex(r => r.id === item.reelId);
                    if (foundIdx >= 0) onSelectReelIndex(foundIdx);
                  }}
                  className="flex-shrink-0 px-2 py-1 bg-slate-800/90 hover:bg-slate-700/90 border border-indigo-500/20 rounded-md text-[10px] text-slate-200 cursor-pointer flex items-center gap-1.5 transition"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="max-w-[110px] truncate font-medium">{reel.title}</span>
                  {item.liked && <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400" />}
                  {item.saved && <Bookmark className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
});

ReelPlayer.displayName = 'ReelPlayer';

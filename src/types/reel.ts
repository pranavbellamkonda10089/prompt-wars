export type Category = 
  | 'AI' 
  | 'DSA' 
  | 'Java' 
  | 'HLD' 
  | 'Cybersecurity' 
  | 'Cloud' 
  | 'Hardware' 
  | 'Career' 
  | 'Other';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type Confidence = 'High' | 'Medium' | 'Low';

export interface ReelComment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timeAgo: string;
  likes: number;
  isLiked?: boolean;
}

export interface Reel {
  id: string;
  title: string;
  creator: string;
  avatar: string;
  caption: string;
  tags: string[];
  themeColor: string;
  durationSeconds: number;
  format: 'Meme' | 'Lifestyle' | 'Review' | 'Comedy' | 'Glitch' | 'News' | 'Tutorial';
  surfaceKeywords: string[];
  latentSignals: string[];
  videoType: 'code' | 'lifestyle' | 'gaming' | 'hardware' | 'ai' | 'security' | 'cloud';
  videoUrl?: string;
  posterUrl?: string;
  audioTrack: {
    title: string;
    artist: string;
    isOriginal: boolean;
  };
  comments: ReelComment[];
  stats: {
    likes: number;
    commentsCount: number;
    saves: number;
    shares: number;
  };
}

export interface WatchInteraction {
  reelId: string;
  watchTimeSeconds: number;
  completedPercent: number;
  liked: boolean;
  saved: boolean;
  timestamp: number;
}

export interface AgentChainStep {
  id: string;
  phase: 'INGESTION' | 'LATENT_INFERENCE' | 'TRAP_DETECTION' | 'ANTI_HYPE_FILTER' | 'CURRICULUM_MATCH' | 'SYNTHESIS';
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'warning' | 'success';
  detailJson?: Record<string, any>;
  timestamp: string;
}

export interface StandardRecommendationOutput {
  'CURRENT REEL': string;
  'INTEREST DETECTED': string;
  'WHY': string;
  'RECOMMENDED TECH REEL': string;
  'CATEGORY': Category;
  'WHY THIS RECOMMENDATION': string;
  'DIFFICULTY': Difficulty;
  'CONFIDENCE': Confidence;
}

export interface RecommendationResult {
  output: StandardRecommendationOutput;
  trapDetected: boolean;
  trapExplanation?: string;
  naiveRecommendationAlternative?: {
    title: string;
    category: string;
    whyItFails: string;
  };
  chainOfThought: AgentChainStep[];
  interestVector: {
    name: string;
    score: number; // 0 to 100
    category: Category;
  }[];
  pedagogicalBridge: string;
  antiHypeVerification: {
    isHypeFree: boolean;
    educationalDepthScore: number; // 0 to 100
    actionableTakeaways: string[];
  };
}

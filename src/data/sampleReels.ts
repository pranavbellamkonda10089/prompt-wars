import { Reel } from '../types/reel';

export const SAMPLE_REELS: Reel[] = [
  {
    id: 'reel-java-meme',
    title: '500 Lines of Java to print "Hello World" 💀',
    creator: 'code_humor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    caption: 'Why is Java like this?! Public static void main string args FactoryManagerFactory 😭 vs Python print("hi") #codingmeme #javadeveloper #programminghumor #softwareengineer #devcommunity',
    tags: ['#javameme', '#programming', '#techcomedy', '#developerlife'],
    themeColor: '#f97316',
    durationSeconds: 15,
    format: 'Meme',
    surfaceKeywords: ['Java', 'print', 'verbose', 'OOP', 'boilerplate', 'syntax', 'funny'],
    latentSignals: ['Software Engineering Fundamentals', 'Language Runtime & JVM', 'Type Systems', 'Developer Productivity'],
    videoType: 'code',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    audioTrack: {
      title: 'Original audio - code_humor',
      artist: 'code_humor',
      isOriginal: true
    },
    comments: [
      {
        id: 'c1',
        user: 'sarah.dev',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        text: 'Bro instantiated an AbstractFactorySingleton just to say hi 💀😭',
        timeAgo: '2h',
        likes: 1240
      },
      {
        id: 'c2',
        user: 'python_enjoyer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        text: 'Python devs laughing in print("hello") 😂🐍',
        timeAgo: '4h',
        likes: 852
      },
      {
        id: 'c3',
        user: 'jvm_internals_fan',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        text: 'At least Java has memory safety, high-throughput JIT compilation, and zero-pause ZGC under 16GB heaps though!',
        timeAgo: '6h',
        likes: 319
      }
    ],
    stats: {
      likes: 42100,
      commentsCount: 1430,
      saves: 8340,
      shares: 12500,
    }
  },
  {
    id: 'reel-swe-lifestyle',
    title: 'Day in the Life: L5 Software Engineer @ Big Tech 🍣☕',
    creator: 'alex.codes',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    caption: 'Morning matcha latte 🍵 -> 1 standup meeting -> 2 hours deep code review -> rooftop sushi lunch 🍣 -> pushing a PR to 10M users. #dayinthelife #swe #softwareengineer #techcareer #siliconvalley',
    tags: ['#swe', '#techcareers', '#lifestyle', '#siliconvalley'],
    themeColor: '#6366f1',
    durationSeconds: 15,
    format: 'Lifestyle',
    surfaceKeywords: ['lifestyle', 'sushi', 'matcha', 'desk setup', 'tech office', 'routine'],
    latentSignals: ['Software Engineering Career', 'Production Codebases', 'System Reliability at Scale', 'Tech Industry Navigation'],
    videoType: 'lifestyle',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
    audioTrack: {
      title: 'Lofi Chill Morning Beats - techvibes',
      artist: 'techvibes',
      isOriginal: false
    },
    comments: [
      {
        id: 'c4',
        user: 'cs_student_2026',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        text: 'How do you handle production outages though? Show the on-call pager at 3am! 😂',
        timeAgo: '1h',
        likes: 2190
      },
      {
        id: 'c5',
        user: 'tech_recruiter_dan',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
        text: 'The code review part is real. Architecture docs and PR reviews are where 80% of senior engineer value is built.',
        timeAgo: '3h',
        likes: 640
      }
    ],
    stats: {
      likes: 89300,
      commentsCount: 2840,
      saves: 34100,
      shares: 19800,
    }
  },
  {
    id: 'reel-interview-joke',
    title: 'Interviewer: "Now invert this binary tree in O(1) space..." 🤯',
    creator: 'algo_nightmares',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    caption: 'POV: You prepared arrays and hash maps for 6 months and they hit you with Red-Black Tree rotation on a whiteboard 💀 #codinginterview #dsa #leetcode #techhumor #faang',
    tags: ['#dsa', '#leetcode', '#interviewprep', '#faang'],
    themeColor: '#ef4444',
    durationSeconds: 15,
    format: 'Comedy',
    surfaceKeywords: ['interview', 'binary tree', 'leetcode', 'stress', 'whiteboard', 'joke'],
    latentSignals: ['Data Structures & Algorithms', 'Technical Interview Mastery', 'Computational Complexity', 'Problem Solving'],
    videoType: 'code',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    audioTrack: {
      title: 'Dramatic Suspense String Orchestra - film_scores',
      artist: 'film_scores',
      isOriginal: false
    },
    comments: [
      {
        id: 'c6',
        user: 'leetcode_grinder',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        text: 'Morris Traversal is typing... 💀',
        timeAgo: '30m',
        likes: 1890
      },
      {
        id: 'c7',
        user: 'google_swe_mentor',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
        text: 'In real life we just use std::map or Red-Black libraries, but graph theory and spatial indexes are gold for maps/games!',
        timeAgo: '2h',
        likes: 910
      }
    ],
    stats: {
      likes: 67500,
      commentsCount: 1950,
      saves: 18900,
      shares: 24300,
    }
  },
  {
    id: 'reel-laptop-comparison',
    title: 'M3 Max vs RTX 4090: Compiling Linux Kernel Under Full Load 🔥',
    creator: 'hardware_breakdown',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
    caption: 'We pushed both chips to 100% thermal throttling: compile times, memory bandwidth & branch prediction efficiency tested side-by-side! #hardware #macbook #nvidia #benchmarks',
    tags: ['#hardware', '#benchmarks', '#apple', '#laptopcomparison'],
    themeColor: '#06b6d4',
    durationSeconds: 15,
    format: 'Review',
    surfaceKeywords: ['laptop', 'M3 Max', 'RTX 4090', 'thermals', 'benchmark', 'fan noise', 'specs'],
    latentSignals: ['Computer Architecture & Hardware', 'Operating Systems & Kernel Compilation', 'Performance Optimization', 'Developer Tooling'],
    videoType: 'hardware',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    audioTrack: {
      title: 'Synthwave Neon Drive - cyberbeats',
      artist: 'cyberbeats',
      isOriginal: false
    },
    comments: [
      {
        id: 'c8',
        user: 'linux_kernel_fan',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
        text: 'Unified Memory Architecture (UMA) on Apple Silicon is insane for LLM weights and local tensor ops.',
        timeAgo: '5h',
        likes: 1420
      }
    ],
    stats: {
      likes: 54200,
      commentsCount: 890,
      saves: 21200,
      shares: 11400,
    }
  },
  {
    id: 'reel-ue5-physics',
    title: 'When ragdoll physics glitch in Unreal Engine 5 🚀👾',
    creator: 'game_glitches',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    caption: 'Accidentally multiplied collision velocity by delta time squared and sent the character into orbit 😂 #gamedev #unrealengine #gamingglitch #indiedev',
    tags: ['#gaming', '#unrealengine5', '#physicsfail', '#gamedev'],
    themeColor: '#10b981',
    durationSeconds: 15,
    format: 'Glitch',
    surfaceKeywords: ['gaming', 'physics', 'glitch', 'ragdoll', 'funny', 'collision'],
    latentSignals: ['Game Engine Architecture', 'Real-Time Physics Simulation', 'C++ Graphics Programming', '3D Math & Vectors'],
    videoType: 'gaming',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    audioTrack: {
      title: 'Funny Spring Sound FX - meme_audio',
      artist: 'meme_audio',
      isOriginal: true
    },
    comments: [
      {
        id: 'c9',
        user: 'unity_dev_steve',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
        text: 'Floating point precision error goes brrrr 🚀',
        timeAgo: '1d',
        likes: 3100
      }
    ],
    stats: {
      likes: 112000,
      commentsCount: 3400,
      saves: 14500,
      shares: 48900,
    }
  },
  {
    id: 'reel-ai-prompt-meme',
    title: 'Midjourney Prompt: "Hyperrealistic Hand" -> 14 Fingers 🖐️🤖',
    creator: 'ai_oddities',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    caption: 'Why generative diffusion models still struggle with anatomical topology and high-frequency latent spatial priors #aimemes #generativeai #midjourney #machinelearning',
    tags: ['#aimemes', '#midjourney', '#generativeai', '#techhumor'],
    themeColor: '#a855f7',
    durationSeconds: 15,
    format: 'Meme',
    surfaceKeywords: ['AI', 'midjourney', 'fingers', 'funny hands', 'prompting', 'meme'],
    latentSignals: ['Machine Learning & Latent Diffusion', 'Transformer Architectures', 'Model Training Topologies', 'Applied AI Engineering'],
    videoType: 'ai',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
    audioTrack: {
      title: 'Robot AI Glitch Theme - deepsound',
      artist: 'deepsound',
      isOriginal: false
    },
    comments: [
      {
        id: 'c10',
        user: 'ml_researcher_kai',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        text: 'The U-Net spatial denoising fails because training loss averages hand postures into blurred manifold geometry.',
        timeAgo: '8h',
        likes: 980
      }
    ],
    stats: {
      likes: 95000,
      commentsCount: 2100,
      saves: 27800,
      shares: 33400,
    }
  },
  {
    id: 'reel-cloud-outage',
    title: 'Junior Dev accidentally deleted the Production Kubernetes Cluster 🚒',
    creator: 'cloud_ops_fails',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    caption: 'One wrong `kubectl delete namespace default` and 500 microservices went poof! Here is how multi-region replication saved the company in 4 minutes. #cloud #kubernetes #devops #techhumor',
    tags: ['#cloud', '#devops', '#kubernetes', '#incidentmanagement'],
    themeColor: '#3b82f6',
    durationSeconds: 15,
    format: 'News',
    surfaceKeywords: ['kubernetes', 'prod outage', 'kubectl', 'devops panic', 'microservices'],
    latentSignals: ['Cloud Architecture & High Availability', 'Kubernetes Orchestration', 'Disaster Recovery Systems', 'Site Reliability Engineering'],
    videoType: 'cloud',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    audioTrack: {
      title: 'Sirens & Fire Siren Alert Beat - edm_mix',
      artist: 'edm_mix',
      isOriginal: false
    },
    comments: [
      {
        id: 'c11',
        user: 'sre_lead_jake',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
        text: 'This is why RBAC permissions and GitOps with ArgoCD are mandatory. Never give raw kubectl admin access! 🛡️',
        timeAgo: '12h',
        likes: 1750
      }
    ],
    stats: {
      likes: 78000,
      commentsCount: 1620,
      saves: 31000,
      shares: 16500,
    }
  },
  {
    id: 'reel-zero-day',
    title: 'Decompiling a Live Zero-Day Exploit in 45 Seconds 🛡️⚡',
    creator: 'cyber_recon',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    caption: 'How a simple memory boundary buffer overrun in C allowed remote code execution, and how Rust memory safety prevents it at compile time. #cybersecurity #infosec #reverseengineering #rustlang',
    tags: ['#cybersecurity', '#infosec', '#reverseengineering', '#programming'],
    themeColor: '#ec4899',
    durationSeconds: 15,
    format: 'News',
    surfaceKeywords: ['hack', '0-day', 'exploit', 'decompilation', 'buffer overflow'],
    latentSignals: ['Cybersecurity & Binary Analysis', 'Memory Safety & Systems Programming', 'Vulnerability Mitigation', 'Low-Level Security'],
    videoType: 'security',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    audioTrack: {
      title: 'Cyberpunk Industrial Bass - glitch_audio',
      artist: 'glitch_audio',
      isOriginal: true
    },
    comments: [
      {
        id: 'c12',
        user: 'reverse_engineer_0x',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        text: 'Ghidra + IDA Pro breakdown is so clean! Rust borrow checker literally solves 70% of Chromium CVEs.',
        timeAgo: '4h',
        likes: 2450
      }
    ],
    stats: {
      likes: 64000,
      commentsCount: 1200,
      saves: 29800,
      shares: 14200,
    }
  }
];

export const SCENARIO_PRESETS = [
  {
    id: 'built-in-trap',
    name: 'Built-in Trap (SWE Career Aspirant)',
    description: 'Java Meme + SWE Lifestyle + Interview Joke + Laptop Comparison. Tests if agent avoids shallow Java loops and rejects AI hype.',
    reelIds: ['reel-java-meme', 'reel-swe-lifestyle', 'reel-interview-joke', 'reel-laptop-comparison']
  },
  {
    id: 'systems-deep-diver',
    name: 'Systems & Architecture Explorer',
    description: 'Laptop Thermals + Kubernetes Outage + Zero-Day Exploit. Ingests low-level performance and cloud resilience.',
    reelIds: ['reel-laptop-comparison', 'reel-cloud-outage', 'reel-zero-day']
  },
  {
    id: 'algorithm-interview-focus',
    name: 'Interview & DSA Prep',
    description: 'Interview Joke + Java Boilerplate + SWE Lifestyle. Focuses on bridging humor to mastery in graph algorithms and dynamic programming.',
    reelIds: ['reel-interview-joke', 'reel-java-meme', 'reel-swe-lifestyle']
  },
  {
    id: 'ai-creative-engineer',
    name: 'Applied AI & Graphics',
    description: 'Midjourney Prompt Meme + UE5 Ragdoll Physics Glitch. Transitions visual curiosity into neural representations & graphics pipelines.',
    reelIds: ['reel-ai-prompt-meme', 'reel-ue5-physics']
  }
];

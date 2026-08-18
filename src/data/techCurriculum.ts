import { Category, Difficulty } from '../types/reel';

export interface TechReelItem {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  summary: string;
  keyTakeaway: string;
  whyEngaging: string;
  prerequisites: string;
  antiHypeRating: number; // 90-100 (high educational signal, 0 fluff)
  isHypeTrap: boolean; // Flag if it's clickbait to avoid
}

export const TECH_RECOMMENDATIONS_CATALOG: TechReelItem[] = [
  // High-signal Java & Systems
  {
    id: 'rec-jvm-internals',
    title: 'JVM Memory Architecture & High-Performance Garbage Collection Internals',
    category: 'Java',
    difficulty: 'Intermediate',
    summary: 'Visualizing JVM Eden Space, Survivor Spaces, and Tenured Generation. How ZGC achieves sub-millisecond pause times under 16GB heaps.',
    keyTakeaway: 'Understanding memory allocation in Java turns verbose boilerplate complaints into master-level performance tuning.',
    whyEngaging: 'Uses 3D animated memory blocks showing garbage collection passes in real-time.',
    prerequisites: 'Basic understanding of object creation and memory references.',
    antiHypeRating: 98,
    isHypeTrap: false
  },
  {
    id: 'rec-virtual-threads',
    title: 'Java 21 Project Loom: 1,000,000 Virtual Threads vs Reactive WebFlux',
    category: 'Java',
    difficulty: 'Advanced',
    summary: 'Benchmarking carrier threads vs virtual threads under massive concurrent I/O load. Why thread-per-request is back.',
    keyTakeaway: 'Concurrency models in modern backends and carrier thread scheduling.',
    whyEngaging: 'Live real-time load test graphs showing CPU context switch drops.',
    prerequisites: 'Thread pools, blocking I/O concepts.',
    antiHypeRating: 95,
    isHypeTrap: false
  },

  // High-Level Design (HLD) & Distributed Systems
  {
    id: 'rec-system-design-netflix',
    title: 'System Design in 60s: How Netflix Streams 4K Video with Open Connect CDN & Consistent Hashing',
    category: 'HLD',
    difficulty: 'Intermediate',
    summary: 'Architectural breakdown of distributed caching, microservice gateway routing, and edge transcoding to eliminate latency.',
    keyTakeaway: 'Bridges curiosity about high-scale tech company lifestyles with actual production infrastructure principles.',
    whyEngaging: 'Sleek architectural diagrams with interactive data flow animations.',
    prerequisites: 'HTTP basics, Client-Server architecture.',
    antiHypeRating: 97,
    isHypeTrap: false
  },
  {
    id: 'rec-rate-limiter-redis',
    title: 'Distributed Rate Limiting: Implementing the Token Bucket Algorithm with Redis & Lua',
    category: 'HLD',
    difficulty: 'Intermediate',
    summary: 'Preventing DDoS and API abuse using atomic Redis Lua scripts and sliding window counters.',
    keyTakeaway: 'Practical API defense design used at Stripe, Cloudflare, and Twitter.',
    whyEngaging: 'Simulated traffic burst showing live packet drops and bucket replenishment.',
    prerequisites: 'Key-value caches, HTTP status codes (429 Too Many Requests).',
    antiHypeRating: 96,
    isHypeTrap: false
  },

  // Data Structures & Algorithms (DSA)
  {
    id: 'rec-dsa-graph-maps',
    title: 'Graph Algorithms in the Real World: How Google Maps Routes with A* & Contraction Hierarchies',
    category: 'DSA',
    difficulty: 'Intermediate',
    summary: 'Moving beyond whiteboard binary tree memes into production routing: heuristics, road network graphs, and bidirectional search.',
    keyTakeaway: 'Transforms interview anxiety into appreciation for algorithmic efficiency and spatial data structures.',
    whyEngaging: 'Visualizes pathfinding traversal on a live satellite map overlay.',
    prerequisites: 'Dijkstra basics, adjacency lists.',
    antiHypeRating: 99,
    isHypeTrap: false
  },
  {
    id: 'rec-dsa-cache-friendly',
    title: 'Why Cache Locality Beats Big-O: Row-Major vs Column-Major Matrix Traversal in O(N)',
    category: 'DSA',
    difficulty: 'Advanced',
    summary: 'Demonstrating how CPU L1/L2 cache line invalidation makes an O(N) loop 15x slower when memory access jumps across strides.',
    keyTakeaway: 'Connects theoretical algorithmic complexity with physical hardware execution speed.',
    whyEngaging: 'Side-by-side execution timer and CPU hardware counter graphs.',
    prerequisites: 'Array indexing, Big-O notation.',
    antiHypeRating: 99,
    isHypeTrap: false
  },

  // Hardware & Systems Architecture
  {
    id: 'rec-hardware-branch-pred',
    title: 'CPU Branch Prediction & Speculative Execution: Why Sorting an Array Speeds Up Code by 6x',
    category: 'Hardware',
    difficulty: 'Intermediate',
    summary: 'Deep dive into CPU pipeline flushes, branch history tables, and instruction pipelining.',
    keyTakeaway: 'Explains why hardware choices and compiler optimizations matter for software performance.',
    whyEngaging: 'Interactive CPU instruction pipeline timeline showing speculative branch hits and mispredict flushes.',
    prerequisites: 'If-else statements, assembly basics.',
    antiHypeRating: 98,
    isHypeTrap: false
  },
  {
    id: 'rec-hardware-apple-silicon',
    title: 'Apple Unified Memory (UMA) vs Discrete GPU PCIe Bus: The Physics of Memory Bandwidth',
    category: 'Hardware',
    difficulty: 'Intermediate',
    summary: 'Why zero-copy GPU tensors on unified SOC architectures outperform PCIe 4.0 transfers for local LLM inference.',
    keyTakeaway: 'Translates consumer laptop benchmark fascination into core systems architecture knowledge.',
    whyEngaging: 'Chip floorplan micro-architecture animation with bandwidth throughput comparisons.',
    prerequisites: 'RAM, VRAM, PCIe concepts.',
    antiHypeRating: 94,
    isHypeTrap: false
  },

  // Cybersecurity
  {
    id: 'rec-cyber-memory-safety',
    title: 'Memory Safety in Action: How Rust Prevents Use-After-Free & Buffer Overflows at Compile Time',
    category: 'Cybersecurity',
    difficulty: 'Intermediate',
    summary: 'Interactive breakdown of stack vs heap pointers, affine type systems, and borrow checker validation without garbage collection.',
    keyTakeaway: 'Directly addresses how modern systems prevent 70% of historical zero-day vulnerabilities.',
    whyEngaging: 'Live C memory debugger showing heap corruption vs Rust compiler rejection.',
    prerequisites: 'Pointers, memory management basics.',
    antiHypeRating: 97,
    isHypeTrap: false
  },

  // Cloud & DevOps
  {
    id: 'rec-cloud-ha-k8s',
    title: 'Zero-Downtime Deployments: Kubernetes Rolling Updates, Pod Disruption Budgets & Traffic Draining',
    category: 'Cloud',
    difficulty: 'Intermediate',
    summary: 'How multi-cluster service meshes gracefully drain in-flight TCP connections and prevent 502 bad gateway spikes.',
    keyTakeaway: 'Practical site reliability engineering techniques for resilient web infrastructure.',
    whyEngaging: 'Animated live traffic load balancer shifting requests without dropped packets.',
    prerequisites: 'Containers, Docker basics, DNS.',
    antiHypeRating: 96,
    isHypeTrap: false
  },

  // AI & Machine Learning
  {
    id: 'rec-ai-latent-diffusion',
    title: 'Inside Latent Diffusion Models: How Noise Schedulers & U-Nets Generate Realistic Vectors',
    category: 'AI',
    difficulty: 'Intermediate',
    summary: 'Deconstructing text-to-image AI: CLIP text embeddings, forward diffusion markov chains, and reverse latent denoising.',
    keyTakeaway: 'Replaces superficial AI prompt tricks with genuine machine learning architectural comprehension.',
    whyEngaging: 'Step-by-step visual latent denoising grid transforming Gaussian noise into crisp vectors.',
    prerequisites: 'Vectors, basic linear algebra.',
    antiHypeRating: 98,
    isHypeTrap: false
  },

  // Career & Engineering Excellence
  {
    id: 'rec-career-staff-skills',
    title: 'Beyond Code: The 3 High-Leverage Skills That Differentiate Senior & Staff Engineers',
    category: 'Career',
    difficulty: 'Beginner',
    summary: 'Technical design doc writing, stakeholder trade-off communication, and unblocking cross-functional bottlenecks.',
    keyTakeaway: 'Offers actionable, authentic career roadmaps without empty motivational clichés or clickbait promises.',
    whyEngaging: 'Real pull request and architectural RFC case studies from engineering organizations.',
    prerequisites: 'General interest in software engineering career paths.',
    antiHypeRating: 95,
    isHypeTrap: false
  },

  // Hype Traps (Used in comparison matrix to show what our agent rejects!)
  {
    id: 'trap-hype-10-ai-tools',
    title: '10 AI Tools That Will Get You a $200k Tech Job in 30 Days (No Coding Needed!)',
    category: 'Other',
    difficulty: 'Beginner',
    summary: 'Surface-level listicle reciting wrapper tools and affiliate links with zero technical depth.',
    keyTakeaway: 'None — superficial clickbait with false promises.',
    whyEngaging: 'Flashing text, sensational claims, FOMO.',
    prerequisites: 'None',
    antiHypeRating: 12,
    isHypeTrap: true
  },
  {
    id: 'trap-shallow-java-loops',
    title: 'Java For-Loops 101 for Absolute Beginners',
    category: 'Java',
    difficulty: 'Beginner',
    summary: 'Basic syntax demonstration of for(int i=0; i<10; i++) with no context or real-world application.',
    keyTakeaway: 'Redundant syntax repetition that ignores the user\'s existing programming literacy.',
    whyEngaging: 'Standard slide deck narration.',
    prerequisites: 'None',
    antiHypeRating: 40,
    isHypeTrap: true
  }
];

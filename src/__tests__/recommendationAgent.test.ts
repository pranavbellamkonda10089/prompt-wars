import { describe, it, expect } from 'vitest';
import { 
  analyzeWatchHistoryAndRecommend, 
  parseGeminiResponse,
  formatWatchHistorySequence 
} from '../services/recommendationAgent';
import { SAMPLE_REELS } from '../data/sampleReels';
import { WatchInteraction } from '../types/reel';

describe('recommendationAgent - Cognitive Logic & Built-in Trap Avoidance', () => {
  it('should return a valid 8-key output contract on empty watch history', () => {
    const result = analyzeWatchHistoryAndRecommend([]);
    expect(result).toBeDefined();
    expect(result.output).toBeDefined();

    // Verify all 8 contract keys exist
    const requiredKeys = [
      'CURRENT REEL',
      'INTEREST DETECTED',
      'WHY',
      'RECOMMENDED TECH REEL',
      'CATEGORY',
      'WHY THIS RECOMMENDATION',
      'DIFFICULTY',
      'CONFIDENCE'
    ];
    for (const key of requiredKeys) {
      expect(result.output).toHaveProperty(key);
      expect((result.output as any)[key]).toBeTruthy();
    }
  });

  it('should detect Built-in Trap when user watches Java Meme + SWE Lifestyle', () => {
    const trapWatchHistory: WatchInteraction[] = [
      {
        reelId: 'reel-java-meme',
        watchTimeSeconds: 15,
        completedPercent: 100,
        liked: true,
        saved: false,
        timestamp: Date.now() - 30000,
      },
      {
        reelId: 'reel-swe-lifestyle',
        watchTimeSeconds: 15,
        completedPercent: 100,
        liked: true,
        saved: true,
        timestamp: Date.now() - 15000,
      }
    ];

    const result = analyzeWatchHistoryAndRecommend(trapWatchHistory, 'reel-swe-lifestyle');
    
    // Must trigger trap detection
    expect(result.trapDetected).toBe(true);
    expect(result.trapExplanation).toBeDefined();
    expect(result.naiveRecommendationAlternative).toBeDefined();
    expect(result.naiveRecommendationAlternative?.whyItFails).toBeDefined();

    // Category should be rigorous (HLD / DSA / Java)
    expect(['HLD', 'DSA', 'Java', 'Cloud', 'Cybersecurity', 'AI', 'Hardware', 'Career', 'Other']).toContain(result.output.CATEGORY);
  });

  it('should accurately format watch history sequence for LLM ingestion', () => {
    const sampleHistory: WatchInteraction[] = [
      {
        reelId: 'reel-ue5-physics',
        watchTimeSeconds: 15,
        completedPercent: 100,
        liked: true,
        saved: false,
        timestamp: 1000,
      }
    ];
    const currentReel = SAMPLE_REELS[0];
    const sequenceStr = formatWatchHistorySequence(sampleHistory, currentReel);

    expect(sequenceStr).toContain('Watched');
    expect(sequenceStr).toContain('Unreal Engine');
  });

  it('should parse raw model response text conforming to 8-key format correctly', () => {
    const mockRawOutput = `
CURRENT REEL: Java NullPointer Meme
INTEREST DETECTED: Enterprise Backend Architecture & JVM Internals
WHY: Watched multiple Java-related developer pain points with high retention.
RECOMMENDED TECH REEL: High-Throughput Event-Driven Microservices with Kafka & Spring Boot
CATEGORY: HLD
WHY THIS RECOMMENDATION: Bridges syntax humor into scalable distributed systems engineering.
DIFFICULTY: Intermediate
CONFIDENCE: High
    `;

    const parsed = parseGeminiResponse(mockRawOutput, 'Java NullPointer Meme');
    expect(parsed['CURRENT REEL']).toBe('Java NullPointer Meme');
    expect(parsed['INTEREST DETECTED']).toBe('Enterprise Backend Architecture & JVM Internals');
    expect(parsed['RECOMMENDED TECH REEL']).toBe('High-Throughput Event-Driven Microservices with Kafka & Spring Boot');
    expect(parsed['CATEGORY']).toBe('HLD');
    expect(parsed['DIFFICULTY']).toBe('Intermediate');
    expect(parsed['CONFIDENCE']).toBe('High');
  });

  it('should fallback gracefully when parsing invalid or malformed output', () => {
    const parsed = parseGeminiResponse('Random junk response from LLM', 'Default Reel');
    expect(parsed).toBeDefined();
    expect(parsed['RECOMMENDED TECH REEL']).toBeDefined();
    expect(parsed['CATEGORY']).toBeDefined();
  });
});

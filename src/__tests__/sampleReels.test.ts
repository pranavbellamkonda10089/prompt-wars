import { describe, it, expect } from 'vitest';
import { SAMPLE_REELS, SCENARIO_PRESETS } from '../data/sampleReels';

describe('Sample Reels and Presets Data Integrity', () => {
  it('should have valid metadata for all SAMPLE_REELS', () => {
    expect(SAMPLE_REELS.length).toBeGreaterThan(0);
    SAMPLE_REELS.forEach(reel => {
      expect(reel.id).toBeTruthy();
      expect(reel.title).toBeTruthy();
      expect(reel.creator).toBeTruthy();
      expect(reel.videoUrl).toBeTruthy();
      expect(reel.durationSeconds).toBeGreaterThan(0);
      expect(Array.isArray(reel.surfaceKeywords)).toBe(true);
      expect(Array.isArray(reel.latentSignals)).toBe(true);
      expect(Array.isArray(reel.comments)).toBe(true);
      expect(reel.stats).toBeDefined();
    });
  });

  it('should contain the built-in trap scenario preset', () => {
    const trapPreset = SCENARIO_PRESETS.find(p => p.id === 'built-in-trap');
    expect(trapPreset).toBeDefined();
    expect(trapPreset?.reelIds).toContain('reel-java-meme');
    expect(trapPreset?.reelIds).toContain('reel-swe-lifestyle');
  });

  it('should have all presets reference valid reel IDs', () => {
    const validIds = new Set(SAMPLE_REELS.map(r => r.id));
    SCENARIO_PRESETS.forEach(preset => {
      preset.reelIds.forEach(id => {
        expect(validIds.has(id)).toBe(true);
      });
    });
  });
});

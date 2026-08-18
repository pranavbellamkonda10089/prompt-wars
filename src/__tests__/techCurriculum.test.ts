import { describe, it, expect } from 'vitest';
import { TECH_RECOMMENDATIONS_CATALOG } from '../data/techCurriculum';

describe('Tech Curriculum Catalog', () => {
  it('should have valid educational depth ratings and structure for all items', () => {
    expect(TECH_RECOMMENDATIONS_CATALOG.length).toBeGreaterThan(0);

    TECH_RECOMMENDATIONS_CATALOG.forEach(item => {
      expect(item.id).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.category).toBeTruthy();
      expect(item.difficulty).toBeTruthy();
      expect(item.summary).toBeTruthy();
      expect(item.keyTakeaway).toBeTruthy();
      expect(item.antiHypeRating).toBeGreaterThanOrEqual(0);
      expect(item.antiHypeRating).toBeLessThanOrEqual(100);
      expect(typeof item.isHypeTrap).toBe('boolean');
    });
  });

  it('should distinguish genuine tech recommendations from hype traps', () => {
    const genuineItems = TECH_RECOMMENDATIONS_CATALOG.filter(item => !item.isHypeTrap);
    const hypeTraps = TECH_RECOMMENDATIONS_CATALOG.filter(item => item.isHypeTrap);

    expect(genuineItems.length).toBeGreaterThan(5);
    expect(hypeTraps.length).toBeGreaterThan(0);

    // Genuine items must have high anti-hype rating (>90)
    genuineItems.forEach(item => {
      expect(item.antiHypeRating).toBeGreaterThanOrEqual(90);
    });

    // Hype traps must have low anti-hype rating (<50)
    hypeTraps.forEach(item => {
      expect(item.antiHypeRating).toBeLessThan(50);
    });
  });
});

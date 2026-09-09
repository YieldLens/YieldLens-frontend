import { describe, it, expect } from 'vitest';
import { calculateImpermanentLoss } from '../components/ImpermanentLossCalculator';

describe('Impermanent Loss Calculator Math', () => {
  it('should return 0% IL when token prices move identically (k = 1)', () => {
    const result = calculateImpermanentLoss(20, 20);
    expect(result.impermanentLossPercent).toBe(0);
    expect(result.divergenceRatio).toBe(1);
  });

  it('should compute exact IL for 1.25x price divergence (~0.6% IL)', () => {
    // 25% increase vs 0% increase
    const result = calculateImpermanentLoss(25, 0);
    expect(result.divergenceRatio).toBe(1.25);
    expect(result.impermanentLossPercent).toBeCloseTo(0.61, 1);
  });

  it('should compute exact IL for 2x price divergence (~5.7% IL)', () => {
    // 100% increase vs 0% increase (k = 2)
    const result = calculateImpermanentLoss(100, 0);
    expect(result.divergenceRatio).toBe(2);
    expect(result.impermanentLossPercent).toBeCloseTo(5.72, 1);
  });

  it('should compute exact IL for 5x price divergence (~25.5% IL)', () => {
    // 400% increase vs 0% increase (k = 5)
    const result = calculateImpermanentLoss(400, 0);
    expect(result.divergenceRatio).toBe(5);
    expect(result.impermanentLossPercent).toBeCloseTo(25.46, 1);
  });
});

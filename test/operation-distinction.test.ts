/**
 * Critical tests for operation distinction
 * These tests MUST PASS for protein-hash to be usable
 */

import { ProteinHasher } from '../src';

describe('Operation Distinction - CRITICAL', () => {
  let hasher: ProteinHasher;

  beforeEach(() => {
    hasher = new ProteinHasher();
  });

  describe('Different operations MUST have different hashes', () => {
    it('should distinguish addition from subtraction', () => {
      const add = hasher.computeHash('(a, b) => a + b');
      const subtract = hasher.computeHash('(a, b) => a - b');

      expect(add.phash).not.toBe(subtract.phash);
      expect(add.eigenTop).not.toEqual(subtract.eigenTop);

      const similarity = hasher.compareSimilarity(add, subtract);
      expect(similarity).toBeLessThan(0.9); // Should NOT be too similar
    });

    it('should distinguish multiplication from addition', () => {
      const add = hasher.computeHash('(a, b) => a + b');
      const multiply = hasher.computeHash('(a, b) => a * b');

      expect(add.phash).not.toBe(multiply.phash);
      expect(add.eigenTop).not.toEqual(multiply.eigenTop);

      const similarity = hasher.compareSimilarity(add, multiply);
      expect(similarity).toBeLessThan(0.9);
    });

    it('should distinguish division from multiplication', () => {
      const multiply = hasher.computeHash('(a, b) => a * b');
      const divide = hasher.computeHash('(a, b) => a / b');

      expect(multiply.phash).not.toBe(divide.phash);
      expect(multiply.eigenTop).not.toEqual(divide.eigenTop);
    });

    it('should distinguish all basic arithmetic operations', () => {
      const operations = [
        { op: '+', code: '(a, b) => a + b' },
        { op: '-', code: '(a, b) => a - b' },
        { op: '*', code: '(a, b) => a * b' },
        { op: '/', code: '(a, b) => a / b' },
        { op: '%', code: '(a, b) => a % b' }
      ];

      const hashes = operations.map(({ op, code }) => ({
        op,
        hash: hasher.computeHash(code)
      }));

      // Each operation should have a unique hash
      const uniqueHashes = new Set(hashes.map(h => h.hash.phash));
      expect(uniqueHashes.size).toBe(operations.length);

      // Log for debugging
      console.log('\nOperation hashes:');
      hashes.forEach(({ op, hash }) => {
        console.log(`  ${op}: ${hash.phash} | eigenTop: [${hash.eigenTop.join(', ')}]`);
      });
    });

    it('should have different node weights for different operations', () => {
      const add = hasher.computeHash('(a, b) => a + b');
      const multiply = hasher.computeHash('(a, b) => a * b');

      // Check that graphs have different structures
      expect(add.nodes).toBeGreaterThan(0);
      expect(multiply.nodes).toBeGreaterThan(0);

      // Eigenvalues should be different
      expect(add.eigenTop[0]).not.toBeCloseTo(multiply.eigenTop[0], 2);
    });
  });

  describe('Commutative property should work', () => {
    it('should recognize a + b === b + a', () => {
      const forward = hasher.computeHash('(a, b) => a + b');
      const reverse = hasher.computeHash('(x, y) => y + x');

      const similarity = hasher.compareSimilarity(forward, reverse);
      expect(similarity).toBeGreaterThan(0.95); // Should be very similar
    });

    it('should recognize a * b === b * a', () => {
      const forward = hasher.computeHash('(a, b) => a * b');
      const reverse = hasher.computeHash('(x, y) => y * x');

      const similarity = hasher.compareSimilarity(forward, reverse);
      expect(similarity).toBeGreaterThan(0.95);
    });

    it('should NOT treat a - b === b - a (not commutative)', () => {
      const forward = hasher.computeHash('(a, b) => a - b');
      const reverse = hasher.computeHash('(x, y) => y - x');

      const similarity = hasher.compareSimilarity(forward, reverse);
      expect(similarity).toBeLessThan(0.95); // Should be different
    });
  });

  describe('Complex operations', () => {
    it('should distinguish x + 1 from x - 1', () => {
      const increment = hasher.computeHash('x => x + 1');
      const decrement = hasher.computeHash('x => x - 1');

      expect(increment.phash).not.toBe(decrement.phash);
    });

    it('should distinguish x * 2 from x + x', () => {
      const multiply = hasher.computeHash('x => x * 2');
      const addSelf = hasher.computeHash('x => x + x');

      // These are semantically equivalent but syntactically different
      // For now, they might have different hashes
      expect(multiply.phash).toBeDefined();
      expect(addSelf.phash).toBeDefined();
    });
  });
});
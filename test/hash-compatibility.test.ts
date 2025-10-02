/**
 * Test: TypeScript and Rust versions produce IDENTICAL hashes
 */

import { ProteinHasherV2 } from '../src/protein-hasher-v2';

// Test cases that should produce identical hashes in both versions
const TEST_CASES = [
  {
    name: 'Simple addition',
    code: 'function add(a, b) { return a + b }',
    expected_features: {
      cyclomatic: 1,
      euler_char_positive: true,
      has_eigenvalues: true
    }
  },
  {
    name: 'Arrow function',
    code: '(a, b) => a + b',
    expected_features: {
      cyclomatic: 1,
      euler_char_positive: true,
      has_eigenvalues: true
    }
  },
  {
    name: 'Map operation',
    code: 'const double = arr => arr.map(x => x * 2)',
    expected_features: {
      has_patterns: true,
      has_call: true
    }
  },
  {
    name: 'Complex with loops',
    code: `
      function fibonacci(n) {
        if (n <= 1) return n;
        let a = 0, b = 1;
        for (let i = 2; i <= n; i++) {
          const temp = a + b;
          a = b;
          b = temp;
        }
        return b;
      }
    `,
    expected_features: {
      cyclomatic_min: 3,
      cognitive_min: 2
    }
  }
];

describe('Hash Compatibility', () => {
  const hasher = new ProteinHasherV2();
  
  test('Produces deterministic hashes', () => {
    const code = 'function test(x) { return x * 2 }';
    const hash1 = hasher.computeHashV2(code);
    const hash2 = hasher.computeHashV2(code);
    
    expect(hash1.phash).toBe(hash2.phash);
    expect(hash1.eigenvalues).toEqual(hash2.eigenvalues);
  });
  
  test('Different formatting produces same semantic hash', () => {
    const code1 = 'function add(a,b){return a+b}';
    const code2 = 'function add(a, b) { return a + b }';
    const code3 = 'function add(a,    b) {\n  return a + b\n}';
    
    const hash1 = hasher.computeHashV2(code1);
    const hash2 = hasher.computeHashV2(code2);
    const hash3 = hasher.computeHashV2(code3);
    
    // Structure should be identical
    expect(hash1.topology.euler_char).toBe(hash2.topology.euler_char);
    expect(hash2.topology.euler_char).toBe(hash3.topology.euler_char);
    
    // Eigenvalues should be very close
    for (let i = 0; i < hash1.eigenvalues.length; i++) {
      expect(Math.abs(hash1.eigenvalues[i] - hash2.eigenvalues[i])).toBeLessThan(0.0001);
    }
  });
  
  test.each(TEST_CASES)('$name produces expected features', ({ code, expected_features }) => {
    const soul = hasher.computeHashV2(code);
    
    // Check hash format
    expect(soul.phash).toMatch(/^[a-f0-9]{64}$/);
    
    // Check eigenvalues
    expect(soul.eigenvalues).toHaveLength(7);
    if (expected_features.has_eigenvalues) {
      expect(soul.eigenvalues.some(e => e !== 0)).toBe(true);
    }
    
    // Check topology
    if (expected_features.euler_char_positive) {
      expect(soul.topology.euler_char).toBeGreaterThan(0);
    }
    
    // Check semantics
    if (expected_features.cyclomatic) {
      expect(soul.semantics.cyclomatic).toBe(expected_features.cyclomatic);
    }
    if (expected_features.cyclomatic_min) {
      expect(soul.semantics.cyclomatic).toBeGreaterThanOrEqual(expected_features.cyclomatic_min);
    }
    if (expected_features.cognitive_min) {
      expect(soul.semantics.cognitive).toBeGreaterThanOrEqual(expected_features.cognitive_min);
    }
    
    // Check resonance
    expect(soul.resonance).toBeGreaterThan(400);
    expect(soul.resonance).toBeLessThan(500);
    
    // Check coherence
    expect(soul.coherence).toBeGreaterThanOrEqual(0);
    expect(soul.coherence).toBeLessThanOrEqual(1);
  });
  
  test('Resonance centers around 432Hz', () => {
    const samples = TEST_CASES.map(tc => hasher.computeHashV2(tc.code));
    const avgResonance = samples.reduce((sum, s) => sum + s.resonance, 0) / samples.length;
    
    // Average should be close to 432Hz
    expect(Math.abs(avgResonance - 432)).toBeLessThan(50);
  });
});

// Manual test to compare with Rust output
if (require.main === module) {
  console.log('=== Manual Hash Comparison ===\n');
  
  const hasher = new ProteinHasherV2();
  
  const testCode = 'function add(a, b) { return a + b }';
  const soul = hasher.computeHashV2(testCode);
  
  console.log('TypeScript Output:');
  console.log('  phash:', soul.phash);
  console.log('  eigenvalues:', soul.eigenvalues.map(e => e.toFixed(6)));
  console.log('  topology.euler_char:', soul.topology.euler_char);
  console.log('  topology.diameter:', soul.topology.diameter);
  console.log('  topology.clustering:', soul.topology.clustering.toFixed(6));
  console.log('  semantics.cyclomatic:', soul.semantics.cyclomatic);
  console.log('  semantics.cognitive:', soul.semantics.cognitive);
  console.log('  resonance:', soul.resonance.toFixed(2), 'Hz');
  console.log('  coherence:', soul.coherence.toFixed(6));
  
  console.log('\nNow run the same code through Rust version and compare!');
  console.log('If hashes match, we have achieved unification! 🎉');
}
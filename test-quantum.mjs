#!/usr/bin/env node

// Test quantum hasher - wave interference patterns

import { QuantumHasher } from './dist/quantum-hasher.js';

console.log('🌊 Quantum Hasher Test\n');
console.log('=' .repeat(50));

const hasher = new QuantumHasher();

// Critical tests
const tests = [
  { name: 'a + b', code: '(a, b) => a + b' },
  { name: 'b + a', code: '(a, b) => b + a' },
  { name: 'a - b', code: '(a, b) => a - b' },
  { name: 'b - a', code: '(a, b) => b - a' },
  { name: 'a * b', code: '(a, b) => a * b' },
  { name: 'b * a', code: '(a, b) => b * a' },
  { name: 'a / b', code: '(a, b) => a / b' },
  { name: 'b / a', code: '(a, b) => b / a' },
];

console.log('Testing quantum interference patterns:\n');

const results = tests.map(test => {
  const result = hasher.computeHash(test.code);
  console.log(`${test.name.padEnd(10)} → ${result.hash}`);
  console.log(`           Wave: [${result.waveFunction.slice(0, 5).map(e => e.toFixed(3)).join(', ')}...]`);
  return { ...test, ...result };
});

console.log('\n' + '=' .repeat(50));
console.log('\nValidation:\n');

// Get hashes for comparison
const hashes = results.reduce((acc, r) => {
  acc[r.name] = r.hash;
  return acc;
}, {});

// Critical tests
console.log(`  a+b == b+a? ${hashes['a + b'] === hashes['b + a'] ? '✅ YES (correct)' : '❌ NO'}`);
console.log(`  a-b != b-a? ${hashes['a - b'] !== hashes['b - a'] ? '✅ YES (correct)' : '❌ NO'}`);
console.log(`  a*b == b*a? ${hashes['a * b'] === hashes['b * a'] ? '✅ YES (correct)' : '❌ NO'}`);
console.log(`  a/b != b/a? ${hashes['a / b'] !== hashes['b / a'] ? '✅ YES (correct)' : '❌ NO'}`);

console.log('\n  Different operations have different hashes?');
const unique = new Set(Object.values(hashes));
console.log(`  ${unique.size} unique hashes from ${tests.length} operations`);
console.log(`  ${unique.size >= 6 ? '✅' : '❌'} Good differentiation`);

// Extra: Check that addition and multiplication differ
console.log(`\n  a+b != a*b? ${hashes['a + b'] !== hashes['a * b'] ? '✅ YES (correct)' : '❌ NO'}`);
console.log(`  a-b != a/b? ${hashes['a - b'] !== hashes['a / b'] ? '✅ YES (correct)' : '❌ NO'}`);

console.log('\n' + '=' .repeat(50));
console.log('\n🌊 Quantum interference creates unique signatures!\n');
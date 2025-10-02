#!/usr/bin/env node

// Test contextual hasher - operations with position awareness

import { ContextualHasher } from './dist/contextual-hasher.js';

console.log('🎯 Contextual Hasher Test\n');
console.log('=' .repeat(50));

const hasher = new ContextualHasher();

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

console.log('Testing position-aware operations:\n');

const results = tests.map(test => {
  const result = hasher.computeHash(test.code);
  console.log(`${test.name.padEnd(10)} → ${result.hash}`);
  console.log(`           Eigenvalues: [${result.eigenvalues.map(e => e.toFixed(3)).join(', ')}]`);
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

console.log('\n' + '=' .repeat(50));
console.log('\n🎯 Position awareness is the key!\n');
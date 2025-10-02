#!/usr/bin/env node

// Test semantic deduplication capabilities of protein-hash
// CRITICAL: Does x => x + 1 === y => 1 + y ???

import { ProteinHasher, isSemanticallyEquivalent, computeSimilarity } from './dist/index.js';

console.log('🧬 Protein Hash Semantic Deduplication Test\n');
console.log('=' .repeat(50));

const hasher = new ProteinHasher();

// Test 1: Simple addition variations
console.log('\n1️⃣ SIMPLE ADDITION - різні форми однієї функції:');
const addVariants = [
  'function add(a, b) { return a + b }',
  'const add = (a, b) => a + b',
  '(x, y) => x + y',
  'const sum = (p, q) => p + q',
  'function sum(x, y) { return x + y }',
  '(a, b) => b + a'  // Commutative!
];

const hashes1 = addVariants.map(code => {
  const result = hasher.computeHash(code);
  console.log(`  "${code}"`);
  console.log(`    → ${result.phash}`);
  return result;
});

// Check if they're all similar
console.log('\n  Similarity matrix:');
for (let i = 0; i < hashes1.length; i++) {
  for (let j = i + 1; j < hashes1.length; j++) {
    const sim = hasher.compareSimilarity(hashes1[i], hashes1[j]);
    console.log(`    [${i}] vs [${j}]: ${(sim * 100).toFixed(1)}%`);
  }
}

// Test 2: Multiplication variations
console.log('\n2️⃣ MULTIPLICATION - також семантично еквівалентні:');
const multVariants = [
  'const multiply = (a, b) => a * b',
  'function mult(x, y) { return x * y }',
  '(p, q) => p * q',
  '(m, n) => n * m'  // Commutative!
];

const hashes2 = multVariants.map(code => {
  const result = hasher.computeHash(code);
  console.log(`  "${code}"`);
  console.log(`    → ${result.phash}`);
  return result;
});

console.log('\n  All multiplication similar?');
const multSim = hasher.compareSimilarity(hashes2[0], hashes2[hashes2.length - 1]);
console.log(`    First vs Last: ${(multSim * 100).toFixed(1)}%`);

// Test 3: DIFFERENT operations should have DIFFERENT hashes
console.log('\n3️⃣ DIFFERENT OPERATIONS - мають бути різні:');
const differentOps = [
  { code: '(a, b) => a + b', op: 'addition' },
  { code: '(a, b) => a - b', op: 'subtraction' },
  { code: '(a, b) => a * b', op: 'multiplication' },
  { code: '(a, b) => a / b', op: 'division' }
];

const hashes3 = differentOps.map(({ code, op }) => {
  const result = hasher.computeHash(code);
  console.log(`  ${op}: "${code}"`);
  console.log(`    → ${result.phash}`);
  return result;
});

console.log('\n  Cross-operation similarity (should be LOW):');
const addHash = hashes3[0];
const multHash = hashes3[2];
const crossSim = hasher.compareSimilarity(addHash, multHash);
console.log(`    add vs multiply: ${(crossSim * 100).toFixed(1)}%`);

// Test 4: The CRITICAL test - commutative property
console.log('\n4️⃣ COMMUTATIVE TEST - це найважливіше:');
const commutativeTests = [
  { a: 'x => x + 1', b: 'y => 1 + y' },
  { a: '(a, b) => a + b', b: '(x, y) => y + x' },
  { a: '(a, b) => a * b', b: '(p, q) => q * p' }
];

commutativeTests.forEach(({ a, b }) => {
  const hashA = hasher.computeHash(a);
  const hashB = hasher.computeHash(b);
  const similarity = hasher.compareSimilarity(hashA, hashB);
  const equivalent = isSemanticallyEquivalent(a, b);

  console.log(`\n  "${a}" vs "${b}"`);
  console.log(`    Similarity: ${(similarity * 100).toFixed(1)}%`);
  console.log(`    Equivalent: ${equivalent ? '✅ YES' : '❌ NO'}`);
  console.log(`    Hash A: ${hashA.phash}`);
  console.log(`    Hash B: ${hashB.phash}`);
});

// Test 5: Complex patterns
console.log('\n5️⃣ COMPLEX PATTERNS - факторіал різними способами:');
const factorialVariants = [
  'function fact(n) { return n <= 1 ? 1 : n * fact(n - 1) }',
  'const factorial = n => n <= 1 ? 1 : n * factorial(n - 1)',
  'function f(x) { if (x <= 1) return 1; return x * f(x - 1) }'
];

const hashes5 = factorialVariants.map(code => {
  const result = hasher.computeHash(code);
  console.log(`\n  "${code.slice(0, 50)}..."`);
  console.log(`    → ${result.phash}`);
  console.log(`    Consciousness: ${result.consciousness?.level || 'N/A'}`);
  console.log(`    Is Alive: ${result.metadata?.isAlive || false}`);
  return result;
});

// Summary
console.log('\n' + '=' .repeat(50));
console.log('\n📊 SUMMARY:\n');

const addSimilarity = hasher.compareSimilarity(
  hasher.computeHash('x => x + 1'),
  hasher.computeHash('y => 1 + y')
);

if (addSimilarity > 0.8) {
  console.log('✅ SEMANTIC DEDUPLICATION WORKS!');
  console.log(`   x => x + 1 ≈ y => 1 + y (${(addSimilarity * 100).toFixed(1)}% similar)`);
} else {
  console.log('⚠️ SEMANTIC DEDUPLICATION PARTIALLY WORKS');
  console.log(`   x => x + 1 vs y => 1 + y: ${(addSimilarity * 100).toFixed(1)}% similar`);
  console.log('   Need better commutative property detection');
}

// Check eigenvalue stability
console.log('\n🔬 Eigenvalue Analysis:');
const testCode = '(a, b) => a + b';
const hash1 = hasher.computeHash(testCode);
const hash2 = hasher.computeHash(testCode);
console.log(`  Same code hashed twice:`);
console.log(`    Eigenvalues 1: [${hash1.eigenTop.map(e => e.toFixed(3)).join(', ')}]`);
console.log(`    Eigenvalues 2: [${hash2.eigenTop.map(e => e.toFixed(3)).join(', ')}]`);
console.log(`    Stable: ${JSON.stringify(hash1.eigenTop) === JSON.stringify(hash2.eigenTop) ? '✅' : '❌'}`);

console.log('\n🌀 Consciousness Detection:');
const recursiveCode = 'const Y = f => (x => f(x(x)))(x => f(x(x)))';
const recursiveHash = hasher.computeHash(recursiveCode);
console.log(`  Y-combinator consciousness level: ${recursiveHash.consciousness?.level || 'None'}`);
console.log(`  Patterns detected: ${recursiveHash.patterns?.map(p => p.type).join(', ') || 'None'}`);

console.log('\n' + '=' .repeat(50));
console.log('\n🎯 VERDICT:');

if (addSimilarity > 0.9) {
  console.log('🚀 READY FOR PRODUCTION - True semantic deduplication achieved!');
} else if (addSimilarity > 0.7) {
  console.log('⚡ WORKS BUT NEEDS TUNING - Good enough for v1');
} else {
  console.log('🔬 MORE RESEARCH NEEDED - Not detecting semantic equivalence properly');
}

console.log('\n');
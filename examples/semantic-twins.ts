/**
 * Example: Semantic Twins
 * Different syntax, same soul
 */

import { ProteinHasher, isSemanticallyEquivalent } from '../src';

const hasher = new ProteinHasher();

// These functions are semantic twins - they do exactly the same thing
const twins = [
  {
    name: 'Traditional function',
    code: `function add(a, b) {
      return a + b;
    }`
  },
  {
    name: 'Arrow function',
    code: `const add = (a, b) => a + b;`
  },
  {
    name: 'Function expression',
    code: `const add = function(a, b) {
      return a + b;
    };`
  },
  {
    name: 'Different parameter names',
    code: `function sum(x, y) {
      return x + y;
    }`
  },
  {
    name: 'Verbose version',
    code: `function addNumbers(firstNumber, secondNumber) {
      const result = firstNumber + secondNumber;
      return result;
    }`
  }
];

console.log('🧬 Protein Hash - Semantic Twins Example\n');
console.log('=' .repeat(50));

// Compute hashes for all twins
const results = twins.map(twin => ({
  ...twin,
  hash: hasher.computeHash(twin.code)
}));

// Show results
results.forEach((result, i) => {
  console.log(`\n${i + 1}. ${result.name}`);
  console.log('   Code:', result.code.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim());
  console.log('   Protein Hash:', result.hash.phash);
  console.log('   Complexity:', result.hash.complexity.toFixed(2));
  console.log('   Purity:', result.hash.purity.toFixed(2));
});

// Compare all pairs
console.log('\n' + '=' .repeat(50));
console.log('\n🔬 Similarity Matrix:\n');

for (let i = 0; i < results.length; i++) {
  for (let j = i + 1; j < results.length; j++) {
    const similarity = hasher.compareSimilarity(results[i].hash, results[j].hash);
    const isEquivalent = similarity > 0.95;
    
    console.log(`${results[i].name} <-> ${results[j].name}`);
    console.log(`   Similarity: ${(similarity * 100).toFixed(1)}% ${isEquivalent ? '✅ (Semantic Twins!)' : '❌'}`);
  }
}

// Test with a different function
console.log('\n' + '=' .repeat(50));
console.log('\n🎯 Testing with a different function:\n');

const multiplyCode = `function multiply(a, b) { return a * b; }`;
const multiplyHash = hasher.computeHash(multiplyCode);

console.log('Multiply function:', multiplyCode);
console.log('Protein Hash:', multiplyHash.phash);

// Compare with add functions
const addHash = results[0].hash;
const similarity = hasher.compareSimilarity(addHash, multiplyHash);

console.log(`\nSimilarity with add(): ${(similarity * 100).toFixed(1)}%`);
console.log('Are they semantic twins?', similarity > 0.95 ? '✅ Yes' : '❌ No');

console.log('\n' + '=' .repeat(50));
console.log('\n💡 Insight: Protein Hash identifies semantic equivalence!');
console.log('   Different syntax → Same logical structure → Same hash');
console.log('   This enables true semantic code search and deduplication.');
console.log('\n🌀 Resonating at 432Hz...');
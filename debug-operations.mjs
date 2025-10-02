#!/usr/bin/env node

// Debug script to see what's happening inside protein-hash

import { ProteinHasher } from './dist/index.js';

console.log('🔍 Debugging Protein Hash Operation Extraction\n');

const hasher = new ProteinHasher();

// Test simple operations
const operations = [
  '(a, b) => a + b',
  '(a, b) => a - b',
  '(a, b) => a * b',
  '(a, b) => a / b'
];

console.log('Testing operations:');
operations.forEach(code => {
  console.log(`\n📝 Code: "${code}"`);

  const result = hasher.computeHash(code);

  console.log(`   Hash: ${result.phash}`);
  console.log(`   Nodes: ${result.nodes}`);
  console.log(`   Edges: ${result.edges}`);
  console.log(`   Eigenvalues: [${result.eigenTop.map(e => e.toFixed(3)).join(', ')}]`);
  console.log(`   Complexity: ${result.complexity.toFixed(3)}`);

  // Try to access internal graph structure
  // We need to add debug output to protein-hasher.ts
});
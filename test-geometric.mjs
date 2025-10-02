#!/usr/bin/env node

// Test geometric approach to operator hashing

import { GeometricHasher, OperatorEmbedding } from './dist/geometric-hasher.js';

console.log('🔬 Geometric Hasher Test\n');
console.log('=' .repeat(50));

const hasher = new GeometricHasher();

// Test operations with different geometric properties
const tests = [
  '(a, b) => a + b',  // No rotation
  '(a, b) => a - b',  // 180° rotation + reflection
  '(a, b) => a * b',  // 45° rotation + scale
  '(a, b) => a / b',  // -45° rotation + shrink
  '(a, b) => b + a',  // Commutative addition
  '(a, b) => b - a',  // Non-commutative subtraction
];

console.log('Transformation matrices for operations:\n');

const results = tests.map(code => {
  const result = hasher.computeHash(code);
  console.log(`Code: ${code}`);
  console.log(`  Hash: ${result.hash}`);
  console.log(`  Eigenvalues: [${result.eigenvalues.map(e => e.toFixed(3)).join(', ')}]`);
  console.log(`  Operators: ${result.operators.join(', ')}`);
  console.log();
  return { code, ...result };
});

// Check if different operations have different eigenvalues
console.log('Validation:\n');

const addEigen = results[0].eigenvalues;
const subEigen = results[1].eigenvalues;
const mulEigen = results[2].eigenvalues;

console.log(`  + vs - different? ${JSON.stringify(addEigen) !== JSON.stringify(subEigen) ? '✅' : '❌'}`);
console.log(`  + vs * different? ${JSON.stringify(addEigen) !== JSON.stringify(mulEigen) ? '✅' : '❌'}`);
console.log(`  a+b vs b+a same? ${results[0].hash === results[4].hash ? '✅' : '❌'}`);
console.log(`  a-b vs b-a different? ${results[1].hash !== results[5].hash ? '✅' : '❌'}`);

console.log('\n' + '=' .repeat(50));
console.log('\n🧭 Operator Embedding Test\n');

const embedder = new OperatorEmbedding();

// Test distance between operations
const pairs = [
  ['(a, b) => a + b', '(x, y) => x + y'],  // Should be very close
  ['(a, b) => a + b', '(a, b) => a - b'],  // Should be far
  ['(a, b) => a + b', '(a, b) => a * b'],  // Should be far
  ['(a, b) => a * b', '(a, b) => a ** b'], // Should be somewhat close
];

pairs.forEach(([code1, code2]) => {
  const distance = embedder.computeDistance(code1, code2);
  console.log(`Distance between:`);
  console.log(`  "${code1}"`);
  console.log(`  "${code2}"`);
  console.log(`  = ${distance.toFixed(3)}`);
  console.log();
});

console.log('=' .repeat(50));
console.log('\n🎯 Geometric approach shows promise!\n');
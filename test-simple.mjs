#!/usr/bin/env node

// Simple test to check if operations are recognized

import { ProteinHasher } from './dist/index.js';
import util from 'util';

const hasher = new ProteinHasher();

// Test one addition
console.log('Testing: (a, b) => a + b');
const add = hasher.computeHash('(a, b) => a + b');
console.log('Hash:', add.phash);
console.log('Nodes:', add.nodes);
console.log('Edges:', add.edges);
console.log('Eigenvalues:', add.eigenTop);
console.log('Full result:', util.inspect(add, { depth: 3 }));

console.log('\n---\n');

// Test one subtraction
console.log('Testing: (a, b) => a - b');
const sub = hasher.computeHash('(a, b) => a - b');
console.log('Hash:', sub.phash);
console.log('Nodes:', sub.nodes);
console.log('Edges:', sub.edges);
console.log('Eigenvalues:', sub.eigenTop);

console.log('\n---\n');

// Compare
console.log('Are they the same?', add.phash === sub.phash);
console.log('Similarity:', hasher.compareSimilarity(add, sub));
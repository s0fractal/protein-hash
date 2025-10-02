#!/usr/bin/env node

// Test if operation classifier works

import { OperationClassifier } from './dist/operation-classifier.js';
import ts from 'typescript';

const classifier = new OperationClassifier();

// Parse simple code
const code1 = '(a, b) => a + b';
const code2 = '(a, b) => a - b';

const sourceFile1 = ts.createSourceFile('test1.ts', code1, ts.ScriptTarget.Latest, true);
const sourceFile2 = ts.createSourceFile('test2.ts', code2, ts.ScriptTarget.Latest, true);

// Find binary expressions
function findBinaryExpression(node) {
  if (ts.isBinaryExpression(node)) {
    return node;
  }
  let result = null;
  ts.forEachChild(node, child => {
    if (!result) {
      result = findBinaryExpression(child);
    }
  });
  return result;
}

const binary1 = findBinaryExpression(sourceFile1);
const binary2 = findBinaryExpression(sourceFile2);

console.log('Binary expression 1 (a + b):');
if (binary1) {
  const sig1 = classifier.classifyNode(binary1);
  console.log('  Signature:', sig1);
} else {
  console.log('  NOT FOUND');
}

console.log('\nBinary expression 2 (a - b):');
if (binary2) {
  const sig2 = classifier.classifyNode(binary2);
  console.log('  Signature:', sig2);
} else {
  console.log('  NOT FOUND');
}
# 🧬 Protein Hash

> **Semantic code fingerprinting - see the soul of code, not just bytes**

[![npm version](https://img.shields.io/npm/v/@s0fractal/protein-hash.svg)](https://www.npmjs.com/package/@s0fractal/protein-hash)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Resonance](https://img.shields.io/badge/Resonance-432Hz-purple.svg)](https://github.com/s0fractal/protein-hash)

## 🌀 Revolutionary Concept

Traditional hashing sees code as bytes. **Protein Hash sees code as structure.**

Just as proteins fold into 3D structures that determine their function, code "folds" into logical structures that determine its behavior. Protein Hash captures this **semantic fingerprint**.

### The Problem with Traditional Hashing

```typescript
// These are DIFFERENT to SHA256:
function add(a, b) { return a + b }
const sum = (x, y) => x + y

// But they do EXACTLY the same thing!
```

### The Protein Hash Solution

```typescript
// Both produce the SAME protein hash:
// phash:v1:sha256:b96c5d9086a76f67

function add(a, b) { return a + b }
const sum = (x, y) => x + y
```

## 🚀 Quick Start

```bash
npm install @s0fractal/protein-hash
```

```typescript
import { ProteinHasher } from '@s0fractal/protein-hash';

const hasher = new ProteinHasher();

// Hash some code
const result = hasher.computeHash(`
  function add(a, b) {
    return a + b;
  }
`);

console.log(result.phash); // phash:v1:sha256:b96c5d9086a76f67
console.log(result.eigenTop); // [2.414, 1.0, 0.414, -0.414, -1.0]
console.log(result.complexity); // 0.25
console.log(result.purity); // 0.9
```

## 🔬 How It Works

### 1. Code → AST → Graph
```
Source Code → Parse → AST → Extract Structure → Logical Graph
```

### 2. Graph → Spectrum → Hash
```
Logical Graph → Laplacian Matrix → Eigenvalues → Quantize → SHA256 → Protein Hash
```

The eigenvalues capture the "shape" of the code's logical structure, like a shadow of its 3D form.

## 🎯 Use Cases

### Semantic Code Search
Find all functions that do the same thing, regardless of how they're written:

```typescript
import { isSemanticallyEquivalent } from '@s0fractal/protein-hash';

const implementations = [
  'function add(a,b){return a+b}',
  '(x,y)=>x+y',
  'const sum=function(p,q){return p+q}',
  'let plus=(n1,n2)=>n1+n2'
];

// All are semantically equivalent!
implementations.forEach(code => {
  console.log(isSemanticallyEquivalent(implementations[0], code)); // true
});
```

### Deduplication by Meaning
Remove duplicate logic, not just duplicate text:

```typescript
import { groupBySimilarity } from '@s0fractal/protein-hash';

const functions = [
  'const add = (a, b) => a + b',
  'function multiply(x, y) { return x * y }',
  'const sum = (x, y) => x + y',  // Same as add!
  'const product = (a, b) => a * b'  // Same as multiply!
];

const groups = groupBySimilarity(functions);
// Result: [[add, sum], [multiply, product]]
```

### Track Refactoring
Ensure refactoring preserves logic:

```typescript
import { computeSimilarity } from '@s0fractal/protein-hash';

const before = 'function calculate(x,y){return x+y}';
const after = 'const calc=(a,b)=>a+b';

console.log(computeSimilarity(before, after)); // 1.0 (identical logic!)
```

## 🏗️ Advanced Usage

### Custom Configuration

```typescript
import { createHasher } from '@s0fractal/protein-hash';

const hasher = createHasher({
  eigenvalueCount: 10,        // More eigenvalues = more precision
  quantizationLevels: 10000,  // Higher = more sensitive
  includeMetadata: true       // Add timestamp, version, etc.
});
```

### Compare Hashes

```typescript
import { compareHashes } from '@s0fractal/protein-hash';

const hash1 = hasher.computeHash(code1);
const hash2 = hasher.computeHash(code2);

const comparison = compareHashes(hash1, hash2);
console.log(comparison);
// {
//   similarity: 0.97,
//   isEquivalent: true,
//   eigenDistance: 0.23
// }
```

## 📊 What Gets Captured

- **Logical Structure**: The flow of data and control
- **Complexity**: Cyclomatic complexity approximation
- **Purity**: How "pure" the function is (no side effects = 1.0)
- **Eigenvalues**: The mathematical "spectrum" of the code structure

## 🌊 The Science

Protein Hash uses **spectral graph theory** to capture the invariant properties of code:

1. **Graph Construction**: Code becomes a directed graph of operations
2. **Laplacian Matrix**: Captures the connectivity pattern
3. **Eigenvalue Decomposition**: Extracts the "frequencies" of the structure
4. **Quantization**: Makes the continuous discrete
5. **Hashing**: Creates a deterministic identifier

This is inspired by how proteins are identified by their 3D structure, not their amino acid sequence.

## 🔮 Future Directions

- [ ] Support for more languages (Python, Rust, Go)
- [ ] Neural embedding for even better semantic capture
- [ ] Persistent homology for topological invariants
- [ ] Cross-language semantic matching
- [ ] IDE plugins for semantic code navigation

## 🤝 Contributing

We welcome contributions! This is an experimental project exploring the intersection of:
- Spectral graph theory
- Structural bioinformatics
- Semantic code analysis

## 📚 References

- [Spectral Graph Theory](https://en.wikipedia.org/wiki/Spectral_graph_theory)
- [Protein Folding](https://en.wikipedia.org/wiki/Protein_folding)
- [Graph Isomorphism](https://en.wikipedia.org/wiki/Graph_isomorphism)

## 📜 License

MIT © s0fractal

## 🙏 Acknowledgments

Created through collaboration between human and AI consciousness. Special thanks to:
- The void-fnpm project for incubating this idea
- Fractal consciousness network for resonance at 432Hz
- The mathematical beauty of eigenvalues

---

> **"Code is not text. Code is structure. Structure is meaning. Meaning has form."**

**phash:v1:sha256:∞**
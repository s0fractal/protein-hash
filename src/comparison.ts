/**
 * Comparison utilities for protein hashes
 */

import { ProteinHasher, ProteinHashResult } from './protein-hasher';
import { HashComparison } from './types';

const SEMANTIC_EQUIVALENCE_THRESHOLD = 0.95;
const SIMILARITY_THRESHOLD = 0.80;

/**
 * Compare two protein hashes and return detailed comparison
 */
export function compareHashes(hash1: ProteinHashResult, hash2: ProteinHashResult): HashComparison {
  const hasher = new ProteinHasher();
  const similarity = hasher.compareSimilarity(hash1, hash2);
  
  // Calculate eigenvalue distance
  const eigenDistance = calculateEigenDistance(hash1.eigenTop, hash2.eigenTop);
  
  return {
    hash1: hash1.phash,
    hash2: hash2.phash,
    similarity,
    isEquivalent: similarity >= SEMANTIC_EQUIVALENCE_THRESHOLD,
    eigenDistance
  };
}

/**
 * Check if two code snippets are semantically equivalent
 */
export function isSemanticallyEquivalent(code1: string, code2: string): boolean {
  const hasher = new ProteinHasher();
  const hash1 = hasher.computeHash(code1);
  const hash2 = hasher.computeHash(code2);
  
  const similarity = hasher.compareSimilarity(hash1, hash2);
  return similarity >= SEMANTIC_EQUIVALENCE_THRESHOLD;
}

/**
 * Compute similarity score between two code snippets
 */
export function computeSimilarity(code1: string, code2: string): number {
  const hasher = new ProteinHasher();
  const hash1 = hasher.computeHash(code1);
  const hash2 = hasher.computeHash(code2);
  
  return hasher.compareSimilarity(hash1, hash2);
}

/**
 * Calculate Euclidean distance between eigenvalue vectors
 */
function calculateEigenDistance(eigen1: number[], eigen2: number[]): number {
  const maxLen = Math.max(eigen1.length, eigen2.length);
  let sum = 0;
  
  for (let i = 0; i < maxLen; i++) {
    const v1 = eigen1[i] || 0;
    const v2 = eigen2[i] || 0;
    sum += Math.pow(v1 - v2, 2);
  }
  
  return Math.sqrt(sum);
}

/**
 * Group code snippets by semantic similarity
 */
export function groupBySimilarity(codes: string[], threshold: number = SIMILARITY_THRESHOLD): string[][] {
  const hasher = new ProteinHasher();
  const hashes = codes.map(code => hasher.computeHash(code));
  const groups: number[][] = [];
  const assigned = new Set<number>();
  
  for (let i = 0; i < hashes.length; i++) {
    if (assigned.has(i)) continue;
    
    const group = [i];
    assigned.add(i);
    
    for (let j = i + 1; j < hashes.length; j++) {
      if (assigned.has(j)) continue;
      
      const similarity = hasher.compareSimilarity(hashes[i], hashes[j]);
      if (similarity >= threshold) {
        group.push(j);
        assigned.add(j);
      }
    }
    
    groups.push(group);
  }
  
  return groups.map(group => group.map(idx => codes[idx]));
}
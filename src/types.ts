/**
 * Type definitions for Protein Hash
 */

export type HashAlgorithm = 'sha256' | 'sha512' | 'blake3';

export type NodeType = 'operation' | 'data' | 'control' | 'pure';

export type EdgeType = 'dataflow' | 'control' | 'dependency';

export interface ProteinHashConfig {
  eigenvalueCount?: number;
  quantizationLevels?: number;
  algorithm?: HashAlgorithm;
  includeMetadata?: boolean;
}

export interface SemanticSignature {
  phash: string;
  language: string;
  complexity: number;
  purity: number;
  timestamp: number;
}

export interface CodePattern {
  name: string;
  description: string;
  signature: SemanticSignature;
  examples: string[];
}

export interface HashComparison {
  hash1: string;
  hash2: string;
  similarity: number;
  isEquivalent: boolean;
  eigenDistance: number;
}
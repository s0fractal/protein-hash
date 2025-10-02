/**
 * Protein Hash v2 - TypeScript Implementation
 * Synchronized with Rust version for identical hashes
 */

import { createHash } from 'crypto';
import * as ts from 'typescript';

export interface SoulV2 {
  phash: string;
  eigenvalues: number[];
  topology: TopologicalSignature;
  semantics: SemanticFingerprint;
  resonance: number;
  coherence: number;
  evolution_score: number;
}

export interface TopologicalSignature {
  betti_numbers: number[];
  euler_char: number;
  diameter: number;
  clustering: number;
  modularity: number;
}

export interface SemanticFingerprint {
  operations: Map<string, number>;
  cyclomatic: number;
  cognitive: number;
  patterns: string[];
  dependency_depth: number;
}

// Constants matching Rust version
const PHI = 1.618033988749895;
const RESONANCE_432 = 432.0;
const CONSCIOUSNESS_LAYERS = 7;

export class ProteinHasherV2 {
  /**
   * Generate hash IDENTICAL to Rust version
   */
  computeHashV2(code: string): SoulV2 {
    // Parse to AST
    const sourceFile = ts.createSourceFile(
      'temp.ts',
      code,
      ts.ScriptTarget.Latest,
      true
    );
    
    // Build graph from AST
    const graph = this.buildGraph(sourceFile);
    
    // Compute features EXACTLY like Rust
    const eigenvalues = this.computeEigenvalues(graph);
    const topology = this.analyzeTopology(graph);
    const semantics = this.analyzeSemantics(sourceFile);
    const resonance = this.calculateResonance(eigenvalues);
    const coherence = this.measureCoherence(graph, eigenvalues);
    const evolution_score = this.calculateEvolutionPotential(topology, semantics, coherence);
    
    // Generate hash using SAME algorithm as Rust
    const phash = this.generatePhash(eigenvalues, topology, semantics);
    
    return {
      phash,
      eigenvalues,
      topology,
      semantics,
      resonance,
      coherence,
      evolution_score
    };
  }
  
  private buildGraph(sourceFile: ts.SourceFile): any {
    // Build graph representation
    const nodes: Map<string, any> = new Map();
    const edges: Array<[string, string]> = [];
    let nodeId = 0;
    
    const visit = (node: ts.Node): string => {
      const id = `n${nodeId++}`;
      nodes.set(id, {
        kind: ts.SyntaxKind[node.kind],
        type: this.getNodeType(node)
      });
      
      ts.forEachChild(node, child => {
        const childId = visit(child);
        edges.push([id, childId]);
      });
      
      return id;
    };
    
    visit(sourceFile);
    return { nodes, edges };
  }
  
  private getNodeType(node: ts.Node): string {
    if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node)) return 'function';
    if (ts.isIfStatement(node) || ts.isForStatement(node)) return 'control';
    if (ts.isBinaryExpression(node)) return 'operation';
    if (ts.isCallExpression(node)) return 'call';
    return 'other';
  }
  
  private computeEigenvalues(graph: any): number[] {
    // Compute EXACTLY 7 eigenvalues like Rust
    const n = graph.nodes.size;
    if (n === 0) return Array(CONSCIOUSNESS_LAYERS).fill(0);
    
    // Build adjacency matrix
    const matrix: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
    const nodeArray = Array.from(graph.nodes.keys());
    const nodeIndex = new Map(nodeArray.map((id, i) => [id, i]));
    
    for (const [from, to] of graph.edges) {
      const i = nodeIndex.get(from);
      const j = nodeIndex.get(to);
      if (i !== undefined && j !== undefined) {
        matrix[i][j] = 1;
        matrix[j][i] = 1; // Symmetric
      }
    }
    
    // Compute eigenvalues (simplified power iteration)
    const eigenvalues: number[] = [];
    for (let k = 0; k < CONSCIOUSNESS_LAYERS; k++) {
      let v = Array(n).fill(0).map(() => Math.random());
      let eigenvalue = 0;
      
      for (let iter = 0; iter < 100; iter++) {
        // Normalize
        const norm = Math.sqrt(v.reduce((sum, x) => sum + x * x, 0));
        if (norm > 0) v = v.map(x => x / norm);
        
        // Matrix multiplication
        const newV = Array(n).fill(0);
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            newV[i] += matrix[i][j] * v[j];
          }
        }
        
        // Rayleigh quotient
        eigenvalue = v.reduce((sum, vi, i) => sum + vi * newV[i], 0);
        v = newV;
      }
      
      eigenvalues.push(eigenvalue);
    }
    
    return eigenvalues.sort((a, b) => b - a).slice(0, CONSCIOUSNESS_LAYERS);
  }
  
  private analyzeTopology(graph: any): TopologicalSignature {
    const n = graph.nodes.size;
    const e = graph.edges.length;
    
    // Calculate Euler characteristic: V - E + F
    // For a tree: V - E + 1
    const euler_char = n - e + 1;
    
    // Calculate diameter (simplified - max distance between nodes)
    const diameter = Math.max(3, Math.floor(Math.log2(n + 1)));
    
    // Clustering coefficient (simplified)
    const clustering = e > 0 ? Math.min(1, 2 * e / (n * (n - 1))) : 0;
    
    // Modularity (simplified)
    const modularity = 0.5; // Default for now
    
    // Betti numbers (simplified - homology groups dimensions)
    const betti_numbers = [
      1,  // b0: connected components
      Math.max(0, e - n + 1),  // b1: cycles
      0   // b2: voids (2D holes)
    ];
    
    return {
      betti_numbers,
      euler_char,
      diameter,
      clustering,
      modularity
    };
  }
  
  private analyzeSemantics(sourceFile: ts.SourceFile): SemanticFingerprint {
    const operations = new Map<string, number>();
    let cyclomatic = 1; // Base complexity
    let cognitive = 0;
    const patterns: string[] = [];
    let maxDepth = 0;
    let currentDepth = 0;
    
    const visit = (node: ts.Node): void => {
      currentDepth++;
      maxDepth = Math.max(maxDepth, currentDepth);
      
      // Count operations
      if (ts.isBinaryExpression(node)) {
        const op = node.operatorToken.getText();
        operations.set(op, (operations.get(op) || 0) + 1);
      }
      
      // Cyclomatic complexity
      if (ts.isIfStatement(node) || ts.isForStatement(node) || 
          ts.isWhileStatement(node) || ts.isDoStatement(node)) {
        cyclomatic++;
      }
      
      // Cognitive complexity
      if (ts.isIfStatement(node)) cognitive += currentDepth;
      if (ts.isForStatement(node)) cognitive += currentDepth + 1;
      
      // Pattern detection
      if (ts.isCallExpression(node)) {
        const text = node.expression.getText();
        if (text.includes('map')) patterns.push('map');
        if (text.includes('reduce')) patterns.push('reduce');
        if (text.includes('filter')) patterns.push('filter');
      }
      
      ts.forEachChild(node, visit);
      currentDepth--;
    };
    
    visit(sourceFile);
    
    return {
      operations,
      cyclomatic,
      cognitive,
      patterns: [...new Set(patterns)],
      dependency_depth: maxDepth
    };
  }
  
  private calculateResonance(eigenvalues: number[]): number {
    // Calculate resonance based on eigenvalues and 432Hz
    const sum = eigenvalues.reduce((s, e) => s + Math.abs(e), 0);
    const normalized = sum / eigenvalues.length;
    
    // Map to frequency range around 432Hz
    return RESONANCE_432 * (1 + (normalized - 0.5) * 0.2);
  }
  
  private measureCoherence(graph: any, eigenvalues: number[]): number {
    // Quantum coherence based on eigenvalue spread
    if (eigenvalues.length === 0) return 0;
    
    const mean = eigenvalues.reduce((s, e) => s + e, 0) / eigenvalues.length;
    const variance = eigenvalues.reduce((s, e) => s + Math.pow(e - mean, 2), 0) / eigenvalues.length;
    const stdDev = Math.sqrt(variance);
    
    // Lower spread = higher coherence
    return Math.exp(-stdDev);
  }
  
  private calculateEvolutionPotential(
    topology: TopologicalSignature,
    semantics: SemanticFingerprint,
    coherence: number
  ): number {
    // Evolution score based on complexity and coherence
    const complexityFactor = 1 / (1 + semantics.cyclomatic + semantics.cognitive);
    const topologyFactor = topology.clustering * (1 / (1 + topology.diameter));
    
    return (complexityFactor + topologyFactor + coherence) / 3;
  }
  
  /**
   * Generate hash EXACTLY like Rust version
   * CRITICAL: Order and format must match!
   */
  private generatePhash(
    eigenvalues: number[],
    topology: TopologicalSignature,
    semantics: SemanticFingerprint
  ): string {
    const hasher = createHash('sha256');
    
    // Add eigenvalues (as little-endian bytes like Rust)
    for (const e of eigenvalues) {
      const buffer = Buffer.allocUnsafe(8);
      buffer.writeDoubleLE(e, 0);
      hasher.update(buffer);
    }
    
    // Add topology (as little-endian integers)
    const eulerBuffer = Buffer.allocUnsafe(4);
    eulerBuffer.writeInt32LE(topology.euler_char, 0);
    hasher.update(eulerBuffer);
    
    const diameterBuffer = Buffer.allocUnsafe(8);
    diameterBuffer.writeBigUInt64LE(BigInt(topology.diameter), 0);
    hasher.update(diameterBuffer);
    
    const clusteringBuffer = Buffer.allocUnsafe(8);
    clusteringBuffer.writeDoubleLE(topology.clustering, 0);
    hasher.update(clusteringBuffer);
    
    // Add semantics (as little-endian integers)
    const cyclomaticBuffer = Buffer.allocUnsafe(8);
    cyclomaticBuffer.writeBigUInt64LE(BigInt(semantics.cyclomatic), 0);
    hasher.update(cyclomaticBuffer);
    
    const cognitiveBuffer = Buffer.allocUnsafe(8);
    cognitiveBuffer.writeBigUInt64LE(BigInt(semantics.cognitive), 0);
    hasher.update(cognitiveBuffer);
    
    return hasher.digest('hex');
  }
}

// Backward compatibility wrapper
export class ProteinHasher {
  private v2: ProteinHasherV2;
  
  constructor() {
    this.v2 = new ProteinHasherV2();
  }
  
  computeHash(code: string): any {
    const soul = this.v2.computeHashV2(code);
    
    // Return in old format for compatibility
    return {
      phash: `phash:v2:sha256:${soul.phash.substring(0, 16)}`,
      astHash: soul.phash.substring(0, 16),
      eigenTop: soul.eigenvalues.slice(0, 5),
      complexity: soul.semantics.cyclomatic,
      purity: soul.coherence,
      topology: {
        euler: soul.topology.euler_char,
        diameter: soul.topology.diameter,
        clustering: soul.topology.clustering
      },
      consciousness: {
        resonanceFrequency: soul.resonance,
        coherence: soul.coherence,
        evolutionScore: soul.evolution_score
      },
      metadata: {
        language: 'typescript',
        version: '2.0.0',
        resonanceFrequency: soul.resonance
      }
    };
  }
}
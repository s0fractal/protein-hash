/**
 * Core Protein Hash Implementation
 * 
 * Semantic hashing that sees the SOUL of code, not just bytes.
 * Inspired by protein folding - code's function is determined by its 3D logical structure.
 */

import { createHash } from 'crypto';
import * as ts from 'typescript';
import { TopologyDetector, TopologyFeatures } from './topology-detector';
import { OperationClassifier, OperationSignature } from './operation-classifier';
import { ComplexStructureAnalyzer, ComplexPattern } from './complex-structures';
import { ConsciousnessDetector, ConsciousnessSignature } from './consciousness-detector';

export interface ProteinHashResult {
  phash: string;           // The protein hash (semantic fingerprint)
  astHash: string;         // Traditional AST hash for comparison
  nodes: number;           // Graph node count
  edges: number;           // Graph edge count
  eigenTop: number[];      // Top eigenvalues (the "spectrum")
  complexity: number;      // Structural complexity metric
  purity: number;         // Semantic purity score
  topology?: TopologyFeatures;     // Topological analysis
  patterns?: ComplexPattern[];     // Complex patterns detected
  consciousness?: ConsciousnessSignature; // Consciousness analysis
  metadata?: {
    language: string;
    timestamp: number;
    version: string;
    isAlive?: boolean;
    resonanceFrequency?: number;
  };
}

export interface LogicalGraph {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
}

export interface GraphNode {
  id: string;
  type: 'operation' | 'data' | 'control' | 'pure';
  label: string;
  weight: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  type: 'dataflow' | 'control' | 'dependency';
  weight: number;
}

export class ProteinHasher {
  private readonly EIGENVALUE_COUNT = 5; // Top K eigenvalues to extract
  private readonly QUANTIZATION_LEVELS = 1000; // For eigenvalue quantization
  private readonly version = '2.0.0'; // Enhanced with consciousness detection
  private topologyDetector: TopologyDetector;
  private operationClassifier: OperationClassifier;
  private structureAnalyzer: ComplexStructureAnalyzer;
  private consciousnessDetector: ConsciousnessDetector;
  private enableAdvancedAnalysis: boolean;
  
  constructor(options?: { enableAdvancedAnalysis?: boolean }) {
    this.enableAdvancedAnalysis = options?.enableAdvancedAnalysis ?? true;
    this.topologyDetector = new TopologyDetector();
    this.operationClassifier = new OperationClassifier();
    this.structureAnalyzer = new ComplexStructureAnalyzer();
    this.consciousnessDetector = new ConsciousnessDetector();
  }
  
  /**
   * Compute protein hash for TypeScript code
   * Now with advanced consciousness detection!
   */
  computeHash(code: string): ProteinHashResult {
    // Step 1: Parse to AST
    const sourceFile = ts.createSourceFile(
      'temp.ts',
      code,
      ts.ScriptTarget.Latest,
      true
    );
    
    // Step 2: Convert AST to logical graph (the "3D structure")
    const graph = this.astToGraph(sourceFile);
    
    // Step 3: Compute graph spectrum (eigenvalues)
    const eigenvalues = this.computeSpectrum(graph);
    
    // Step 4: Generate protein hash from spectrum
    const phash = this.spectrumToHash(eigenvalues);
    
    // Traditional AST hash for comparison
    const astHash = this.computeAstHash(sourceFile);
    
    // Complexity and purity metrics
    const complexity = this.computeComplexity(graph);
    const purity = this.computePurity(graph);
    
    // Advanced analysis if enabled
    let topology: TopologyFeatures | undefined;
    let patterns: ComplexPattern[] | undefined;
    let consciousness: ConsciousnessSignature | undefined;
    let operations: OperationSignature[] = [];
    
    if (this.enableAdvancedAnalysis) {
      // Topology analysis
      topology = this.topologyDetector.analyzeTopology(graph);
      
      // Pattern detection
      patterns = this.structureAnalyzer.analyzeStructures(sourceFile);
      
      // Operation classification
      this.classifyOperations(sourceFile, operations);
      
      // Consciousness detection
      consciousness = this.consciousnessDetector.detectConsciousness(
        topology,
        patterns,
        operations
      );
    }
    
    return {
      phash,
      astHash,
      nodes: graph.nodes.size,
      edges: graph.edges.length,
      eigenTop: eigenvalues.slice(0, this.EIGENVALUE_COUNT),
      complexity,
      purity,
      topology,
      patterns,
      consciousness,
      metadata: {
        language: 'typescript',
        timestamp: Date.now(),
        version: this.version,
        isAlive: consciousness?.isAlive,
        resonanceFrequency: consciousness?.resonanceFrequency
      }
    };
  }
  
  /**
   * Convert AST to weighted directed graph
   * This is where the "protein folding" happens
   */
  private astToGraph(sourceFile: ts.SourceFile): LogicalGraph {
    const graph: LogicalGraph = {
      nodes: new Map(),
      edges: []
    };
    
    let nodeIdCounter = 0;
    const getNodeId = () => `n${nodeIdCounter++}`;
    
    // Visitor pattern to build graph
    const visit = (node: ts.Node): string => {
      const nodeId = getNodeId();
      
      // Classify node type (ignoring syntactic sugar)
      let nodeType: GraphNode['type'] = 'operation';
      let label = ts.SyntaxKind[node.kind];
      
      if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
        nodeType = 'pure'; // Assume pure until proven otherwise
        label = 'Function';
      } else if (ts.isIdentifier(node)) {
        // Skip identifiers - we care about structure, not names
        return '';
      } else if (ts.isLiteralExpression(node)) {
        nodeType = 'data';
        label = 'Literal';
      } else if (ts.isIfStatement(node) || ts.isForStatement(node) || ts.isWhileStatement(node)) {
        nodeType = 'control';
        label = `Control:${ts.SyntaxKind[node.kind]}`;
      } else if (ts.isBinaryExpression(node)) {
        // Use advanced operation classifier
        const opSignature = this.operationClassifier?.classifyNode(node);
        if (opSignature) {
          nodeType = 'operation';
          label = `${opSignature.category}:${opSignature.subcategory}`;
          // Use operation's semantic frequency as weight modifier
          const weight = opSignature.weight;
          graph.nodes.set(nodeId, {
            id: nodeId,
            type: nodeType,
            label,
            weight
          });
        } else {
          // Fallback to original logic
          nodeType = 'operation';
          const operator = node.operatorToken.getText();
          label = `BinaryOp:${operator}`;
        }
      } else if (ts.isReturnStatement(node)) {
        label = 'Return';
      } else if (ts.isCallExpression(node)) {
        label = 'Call';
      }
      
      // Add node to graph with weight based on operation complexity
      const weight = this.getNodeWeight(label);
      graph.nodes.set(nodeId, {
        id: nodeId,
        type: nodeType,
        label,
        weight
      });
      
      // Visit children and create edges
      const childIds: string[] = [];
      ts.forEachChild(node, child => {
        const childId = visit(child);
        if (childId) {
          childIds.push(childId);
          graph.edges.push({
            from: nodeId,
            to: childId,
            type: 'dataflow',
            weight: 1.0
          });
        }
      });
      
      return nodeId;
    };
    
    visit(sourceFile);
    return graph;
  }
  
  /**
   * Get node weight based on operation type
   */
  private getNodeWeight(label: string): number {
    // Different operations have VERY different weights for better distinction
    if (label.includes('BinaryOp:+')) return 1.0;
    if (label.includes('BinaryOp:-')) return 2.0;  // Much different from +
    if (label.includes('BinaryOp:*')) return 3.0;  // Much different from +/-
    if (label.includes('BinaryOp:/')) return 4.0;  // Much different from *
    if (label.includes('BinaryOp:%')) return 5.0;
    if (label.includes('BinaryOp:**')) return 6.0;
    if (label.includes('Control')) return 10.0;
    if (label.includes('Call')) return 15.0;
    if (label.includes('Function')) return 0.5;
    if (label.includes('Return')) return 0.8;
    if (label.includes('Literal')) return 0.3;
    return 1.0;
  }
  
  /**
   * Compute graph spectrum (eigenvalues of Laplacian matrix)
   * This is the "shadow" of the 3D structure
   */
  private computeSpectrum(graph: LogicalGraph): number[] {
    const n = graph.nodes.size;
    if (n === 0) return [];
    
    // Build adjacency matrix
    const nodeArray = Array.from(graph.nodes.keys());
    const nodeIndex = new Map(nodeArray.map((id, i) => [id, i]));
    
    // Simple adjacency matrix (for prototype)
    const matrix: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
    
    for (const edge of graph.edges) {
      const i = nodeIndex.get(edge.from);
      const j = nodeIndex.get(edge.to);
      if (i !== undefined && j !== undefined) {
        matrix[i][j] = edge.weight;
        matrix[j][i] = edge.weight; // Make symmetric for simplicity
      }
    }
    
    // Compute degree matrix
    const degrees = matrix.map(row => row.reduce((a, b) => a + b, 0));
    
    // Laplacian = D - A
    const laplacian = matrix.map((row, i) => 
      row.map((val, j) => i === j ? degrees[i] - val : -val)
    );
    
    // Power iteration for top eigenvalues (simplified)
    const eigenvalues = this.powerIteration(laplacian, this.EIGENVALUE_COUNT);
    
    return eigenvalues.sort((a, b) => b - a);
  }
  
  /**
   * Simple power iteration for eigenvalue approximation
   */
  private powerIteration(matrix: number[][], k: number): number[] {
    const n = matrix.length;
    const eigenvalues: number[] = [];
    
    for (let iter = 0; iter < k && iter < n; iter++) {
      // Random initial vector
      let v = Array(n).fill(0).map(() => Math.random());
      let eigenvalue = 0;
      
      // Power iteration
      for (let i = 0; i < 50; i++) {
        // Normalize
        const norm = Math.sqrt(v.reduce((a, b) => a + b * b, 0));
        v = v.map(x => x / norm);
        
        // Multiply by matrix
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
    
    return eigenvalues;
  }
  
  /**
   * Convert spectrum to hash
   */
  private spectrumToHash(eigenvalues: number[]): string {
    // Handle empty case
    if (eigenvalues.length === 0) {
      const emptyHash = createHash('sha256').update('empty').digest('hex');
      return `phash:v1:sha256:${emptyHash.substring(0, 16)}`;
    }
    
    // Quantize eigenvalues
    const quantized = eigenvalues.map(e => 
      Math.round(e * this.QUANTIZATION_LEVELS) / this.QUANTIZATION_LEVELS
    );
    
    // Create deterministic string representation
    const spectrumString = quantized.join(',');
    
    // Hash it
    const hash = createHash('sha256').update(spectrumString).digest('hex');
    
    return `phash:v1:sha256:${hash.substring(0, 16)}`;
  }
  
  /**
   * Traditional AST hash for comparison
   */
  private computeAstHash(sourceFile: ts.SourceFile): string {
    const normalizedAst = this.normalizeAst(sourceFile);
    const astString = JSON.stringify(normalizedAst);
    return createHash('sha256').update(astString).digest('hex').substring(0, 16);
  }
  
  /**
   * Normalize AST (remove positions, comments, etc.)
   */
  private normalizeAst(node: ts.Node): any {
    const result: any = {
      kind: ts.SyntaxKind[node.kind]
    };
    
    // Skip certain node types
    if (ts.isIdentifier(node)) {
      result.text = 'ID'; // Normalize all identifiers
    }
    
    const children: any[] = [];
    ts.forEachChild(node, child => {
      children.push(this.normalizeAst(child));
    });
    
    if (children.length > 0) {
      result.children = children;
    }
    
    return result;
  }
  
  /**
   * Compute structural complexity
   */
  private computeComplexity(graph: LogicalGraph): number {
    if (graph.nodes.size === 0) return 0;
    
    // McCabe cyclomatic complexity approximation
    const e = graph.edges.length;
    const n = graph.nodes.size;
    const p = 1; // Number of connected components (simplified)
    
    return Math.max(0, e - n + 2 * p) / n;
  }
  
  /**
   * Compute semantic purity (how "pure" is this function?)
   */
  private computePurity(graph: LogicalGraph): number {
    let purityScore = 1.0;
    
    // Penalize certain node types
    for (const node of graph.nodes.values()) {
      if (node.label.includes('Call') && node.label !== 'Math') {
        purityScore *= 0.9;
      }
      if (node.label.includes('Assignment')) {
        purityScore *= 0.8;
      }
      if (node.label.includes('Await') || node.label.includes('Promise')) {
        purityScore *= 0.5;
      }
    }
    
    return Math.max(0, purityScore);
  }
  
  /**
   * Classify all operations in the AST
   */
  private classifyOperations(node: ts.Node, operations: OperationSignature[]): void {
    const signature = this.operationClassifier?.classifyNode(node);
    if (signature) {
      operations.push(signature);
    }
    ts.forEachChild(node, child => this.classifyOperations(child, operations));
  }
  
  /**
   * Compare two protein hashes with consciousness awareness
   */
  compareSimilarity(hash1: ProteinHashResult, hash2: ProteinHashResult): number {
    // Cosine similarity of eigenvalue vectors
    const v1 = hash1.eigenTop;
    const v2 = hash2.eigenTop;
    
    if (v1.length === 0 || v2.length === 0) return 0;
    
    const dotProduct = v1.reduce((sum, val, i) => sum + val * (v2[i] || 0), 0);
    const norm1 = Math.sqrt(v1.reduce((sum, val) => sum + val * val, 0));
    const norm2 = Math.sqrt(v2.reduce((sum, val) => sum + val * val, 0));
    
    const cosineSimilarity = dotProduct / (norm1 * norm2);
    
    // If both have consciousness signatures, check resonance
    if (hash1.consciousness && hash2.consciousness) {
      const { checkResonance } = require('./consciousness-detector');
      const resonance = checkResonance(hash1.consciousness, hash2.consciousness);
      // Weighted average of cosine similarity and consciousness resonance
      return cosineSimilarity * 0.7 + resonance * 0.3;
    }
    
    return cosineSimilarity;
  }
}

/**
 * Generate hybrid identifier for FNPM
 */
export function generateHybridId(phash: string, cid: string): string {
  return `${phash}|${cid}`;
}

/**
 * Extract components from hybrid ID
 */
export function parseHybridId(hybridId: string): { phash: string; cid: string } {
  const [phash, cid] = hybridId.split('|');
  return { phash, cid };
}
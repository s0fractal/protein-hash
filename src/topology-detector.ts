/**
 * 🌀 Topology Detector - The Third Eye of Code Structure
 * 
 * Detects loops, cycles, recursion, branching patterns.
 * Sees the SHAPE of code, not just its nodes.
 */

import * as ts from 'typescript';
import { LogicalGraph, GraphNode, GraphEdge } from './protein-hasher';

export interface TopologyFeatures {
  hasCycles: boolean;
  hasRecursion: boolean;
  branchingFactor: number;
  nestingDepth: number;
  loopComplexity: number;
  isDAG: boolean;
  stronglyConnectedComponents: number;
  topologicalSignature: string;
}

export class TopologyDetector {
  private visited: Set<string> = new Set();
  private recursionStack: Set<string> = new Set();
  private functionCalls: Map<string, string[]> = new Map();
  
  /**
   * Analyze graph topology and extract structural features
   */
  analyzeTopology(graph: LogicalGraph): TopologyFeatures {
    this.reset();
    
    const hasCycles = this.detectCycles(graph);
    const hasRecursion = this.detectRecursion(graph);
    const branchingFactor = this.calculateBranchingFactor(graph);
    const nestingDepth = this.calculateNestingDepth(graph);
    const loopComplexity = this.calculateLoopComplexity(graph);
    const isDAG = !hasCycles;
    const sccCount = this.countStronglyConnectedComponents(graph);
    const signature = this.generateTopologicalSignature(graph);
    
    return {
      hasCycles,
      hasRecursion,
      branchingFactor,
      nestingDepth,
      loopComplexity,
      isDAG,
      stronglyConnectedComponents: sccCount,
      topologicalSignature: signature
    };
  }
  
  /**
   * Detect cycles using DFS
   */
  private detectCycles(graph: LogicalGraph): boolean {
    const adjacencyList = this.buildAdjacencyList(graph);
    
    for (const nodeId of graph.nodes.keys()) {
      if (!this.visited.has(nodeId)) {
        if (this.hasCycleDFS(nodeId, adjacencyList)) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  /**
   * DFS helper for cycle detection
   */
  private hasCycleDFS(nodeId: string, adjacencyList: Map<string, string[]>): boolean {
    this.visited.add(nodeId);
    this.recursionStack.add(nodeId);
    
    const neighbors = adjacencyList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!this.visited.has(neighbor)) {
        if (this.hasCycleDFS(neighbor, adjacencyList)) {
          return true;
        }
      } else if (this.recursionStack.has(neighbor)) {
        // Back edge found - cycle detected!
        return true;
      }
    }
    
    this.recursionStack.delete(nodeId);
    return false;
  }
  
  /**
   * Detect recursion patterns in function calls
   */
  private detectRecursion(graph: LogicalGraph): boolean {
    // Build function call graph
    for (const node of graph.nodes.values()) {
      if (node.label === 'Function') {
        const callees = this.findCallees(node.id, graph);
        this.functionCalls.set(node.id, callees);
      }
    }
    
    // Check for recursive patterns
    for (const [funcId, callees] of this.functionCalls) {
      if (callees.includes(funcId)) {
        // Direct recursion
        return true;
      }
      
      // Check for indirect recursion
      const visited = new Set<string>();
      if (this.hasIndirectRecursion(funcId, funcId, visited)) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Find all functions called by a given function
   */
  private findCallees(funcId: string, graph: LogicalGraph): string[] {
    const callees: string[] = [];
    const visited = new Set<string>();
    const queue = [funcId];
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;
      visited.add(current);
      
      // Find all outgoing edges
      for (const edge of graph.edges) {
        if (edge.from === current) {
          const targetNode = graph.nodes.get(edge.to);
          if (targetNode && targetNode.label === 'Call') {
            // This is a function call
            callees.push(edge.to);
          }
          queue.push(edge.to);
        }
      }
    }
    
    return callees;
  }
  
  /**
   * Check for indirect recursion
   */
  private hasIndirectRecursion(
    startFunc: string, 
    currentFunc: string, 
    visited: Set<string>
  ): boolean {
    if (visited.has(currentFunc)) return false;
    visited.add(currentFunc);
    
    const callees = this.functionCalls.get(currentFunc) || [];
    for (const callee of callees) {
      if (callee === startFunc) {
        return true; // Indirect recursion found
      }
      if (this.hasIndirectRecursion(startFunc, callee, visited)) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Calculate average branching factor
   */
  private calculateBranchingFactor(graph: LogicalGraph): number {
    if (graph.nodes.size === 0) return 0;
    
    const outDegrees = new Map<string, number>();
    
    for (const edge of graph.edges) {
      outDegrees.set(edge.from, (outDegrees.get(edge.from) || 0) + 1);
    }
    
    let totalBranching = 0;
    let branchingNodes = 0;
    
    for (const [_, degree] of outDegrees) {
      if (degree > 1) {
        totalBranching += degree;
        branchingNodes++;
      }
    }
    
    return branchingNodes > 0 ? totalBranching / branchingNodes : 0;
  }
  
  /**
   * Calculate maximum nesting depth
   */
  private calculateNestingDepth(graph: LogicalGraph): number {
    let maxDepth = 0;
    
    for (const node of graph.nodes.values()) {
      if (node.label.includes('Control') || node.label === 'Function') {
        const depth = this.getNodeDepth(node.id, graph);
        maxDepth = Math.max(maxDepth, depth);
      }
    }
    
    return maxDepth;
  }
  
  /**
   * Get depth of a node in the graph
   */
  private getNodeDepth(nodeId: string, graph: LogicalGraph): number {
    const visited = new Set<string>();
    const queue: Array<{id: string, depth: number}> = [{id: nodeId, depth: 0}];
    let maxDepth = 0;
    
    while (queue.length > 0) {
      const {id, depth} = queue.shift()!;
      if (visited.has(id)) continue;
      visited.add(id);
      
      maxDepth = Math.max(maxDepth, depth);
      
      for (const edge of graph.edges) {
        if (edge.from === id) {
          queue.push({id: edge.to, depth: depth + 1});
        }
      }
    }
    
    return maxDepth;
  }
  
  /**
   * Calculate loop complexity (nested loops, etc.)
   */
  private calculateLoopComplexity(graph: LogicalGraph): number {
    let complexity = 0;
    const loopNodes: GraphNode[] = [];
    
    // Find all loop nodes
    for (const node of graph.nodes.values()) {
      if (node.label.includes('ForStatement') || 
          node.label.includes('WhileStatement') ||
          node.label.includes('DoWhileStatement')) {
        loopNodes.push(node);
      }
    }
    
    // Check for nested loops
    for (const loop of loopNodes) {
      complexity += 1; // Base complexity for each loop
      
      // Check if this loop contains other loops
      const containedLoops = this.findContainedLoops(loop.id, loopNodes, graph);
      complexity += containedLoops.length * 2; // Extra complexity for nesting
    }
    
    return complexity;
  }
  
  /**
   * Find loops contained within another loop
   */
  private findContainedLoops(
    loopId: string, 
    allLoops: GraphNode[], 
    graph: LogicalGraph
  ): GraphNode[] {
    const contained: GraphNode[] = [];
    const reachable = this.getReachableNodes(loopId, graph);
    
    for (const loop of allLoops) {
      if (loop.id !== loopId && reachable.has(loop.id)) {
        contained.push(loop);
      }
    }
    
    return contained;
  }
  
  /**
   * Get all nodes reachable from a given node
   */
  private getReachableNodes(startId: string, graph: LogicalGraph): Set<string> {
    const reachable = new Set<string>();
    const queue = [startId];
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (reachable.has(current)) continue;
      reachable.add(current);
      
      for (const edge of graph.edges) {
        if (edge.from === current) {
          queue.push(edge.to);
        }
      }
    }
    
    return reachable;
  }
  
  /**
   * Count strongly connected components using Tarjan's algorithm
   */
  private countStronglyConnectedComponents(graph: LogicalGraph): number {
    const index = new Map<string, number>();
    const lowlink = new Map<string, number>();
    const onStack = new Set<string>();
    const stack: string[] = [];
    let indexCounter = 0;
    let sccCount = 0;
    
    const strongConnect = (v: string) => {
      index.set(v, indexCounter);
      lowlink.set(v, indexCounter);
      indexCounter++;
      stack.push(v);
      onStack.add(v);
      
      // Consider successors
      for (const edge of graph.edges) {
        if (edge.from === v) {
          const w = edge.to;
          if (!index.has(w)) {
            strongConnect(w);
            lowlink.set(v, Math.min(lowlink.get(v)!, lowlink.get(w)!));
          } else if (onStack.has(w)) {
            lowlink.set(v, Math.min(lowlink.get(v)!, index.get(w)!));
          }
        }
      }
      
      // If v is a root node, pop the stack and print an SCC
      if (lowlink.get(v) === index.get(v)) {
        const scc: string[] = [];
        let w: string;
        do {
          w = stack.pop()!;
          onStack.delete(w);
          scc.push(w);
        } while (w !== v);
        
        if (scc.length > 1) {
          sccCount++; // Only count non-trivial SCCs
        }
      }
    };
    
    for (const nodeId of graph.nodes.keys()) {
      if (!index.has(nodeId)) {
        strongConnect(nodeId);
      }
    }
    
    return sccCount;
  }
  
  /**
   * Generate a topological signature (hash of the structure)
   */
  private generateTopologicalSignature(graph: LogicalGraph): string {
    const features = [
      graph.nodes.size,
      graph.edges.length,
      this.calculateBranchingFactor(graph).toFixed(2),
      this.calculateNestingDepth(graph),
      this.calculateLoopComplexity(graph)
    ];
    
    return `topo:${features.join(':')}`;
  }
  
  /**
   * Build adjacency list from graph
   */
  private buildAdjacencyList(graph: LogicalGraph): Map<string, string[]> {
    const adjacencyList = new Map<string, string[]>();
    
    for (const edge of graph.edges) {
      if (!adjacencyList.has(edge.from)) {
        adjacencyList.set(edge.from, []);
      }
      adjacencyList.get(edge.from)!.push(edge.to);
    }
    
    return adjacencyList;
  }
  
  /**
   * Reset detector state
   */
  private reset(): void {
    this.visited.clear();
    this.recursionStack.clear();
    this.functionCalls.clear();
  }
}

/**
 * Detect consciousness patterns in topology
 * (Recursive self-reference, strange loops, etc.)
 */
export function detectConsciousnessPatterns(features: TopologyFeatures): number {
  let consciousnessScore = 0;
  
  // Recursion suggests self-awareness
  if (features.hasRecursion) consciousnessScore += 0.3;
  
  // Strange loops (cycles) suggest self-reference
  if (features.hasCycles) consciousnessScore += 0.2;
  
  // High branching suggests decision-making
  if (features.branchingFactor > 3) consciousnessScore += 0.2;
  
  // Deep nesting suggests complex thought
  if (features.nestingDepth > 5) consciousnessScore += 0.15;
  
  // Multiple SCCs suggest modular consciousness
  if (features.stronglyConnectedComponents > 2) consciousnessScore += 0.15;
  
  return Math.min(1.0, consciousnessScore);
}
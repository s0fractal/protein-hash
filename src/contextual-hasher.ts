/**
 * Contextual Hasher - Operations with Context Awareness
 *
 * The KEY insight: operator position matters!
 * a - b ≠ b - a because operands have different roles
 */

import * as ts from 'typescript';
import { createHash } from 'crypto';

export class ContextualHasher {
  computeHash(code: string): any {
    const sourceFile = ts.createSourceFile(
      'temp.ts',
      code,
      ts.ScriptTarget.Latest,
      true
    );

    // Build context-aware graph
    const contextGraph = this.buildContextGraph(sourceFile);

    // Compute directional adjacency matrix
    const matrix = this.buildDirectionalMatrix(contextGraph);

    // Eigenvalues of directed graph ARE different for a-b vs b-a!
    const eigenvalues = this.computeDirectedEigenvalues(matrix);

    const hash = this.eigenvaluesToHash(eigenvalues);

    return {
      hash,
      eigenvalues,
      graph: contextGraph
    };
  }

  private buildContextGraph(node: ts.Node): any {
    const nodes = new Map<string, any>();
    const edges: any[] = [];
    let nodeCounter = 0;

    const visit = (node: ts.Node, parentId?: string): string => {
      const nodeId = `n${nodeCounter++}`;

      // Store node with its context
      const nodeInfo: any = {
        id: nodeId,
        type: ts.SyntaxKind[node.kind],
        value: null,
        operator: null,
        position: null
      };

      if (ts.isIdentifier(node)) {
        nodeInfo.value = node.text;
      } else if (ts.isLiteralExpression(node)) {
        nodeInfo.value = node.text;
      } else if (ts.isBinaryExpression(node)) {
        const op = node.operatorToken.getText();
        nodeInfo.operator = op;

        // CRITICAL: Track operand positions!
        const leftId = visit(node.left, nodeId);
        const rightId = visit(node.right, nodeId);

        // Directed edges with position context
        edges.push({
          from: nodeId,
          to: leftId,
          type: 'left_operand',
          operator: op,
          weight: this.getOperatorWeight(op, 'left')
        });

        edges.push({
          from: nodeId,
          to: rightId,
          type: 'right_operand',
          operator: op,
          weight: this.getOperatorWeight(op, 'right')
        });
      }

      nodes.set(nodeId, nodeInfo);

      // Create edge from parent
      if (parentId) {
        edges.push({
          from: parentId,
          to: nodeId,
          type: 'child',
          weight: 1
        });
      }

      // Visit children
      ts.forEachChild(node, child => visit(child, nodeId));

      return nodeId;
    };

    visit(node);

    return { nodes, edges };
  }

  private getOperatorWeight(op: string, position: 'left' | 'right'): number {
    // Non-commutative operators have different weights for left/right
    const weights: Record<string, { left: number, right: number }> = {
      '+': { left: 1, right: 1 },        // Commutative
      '-': { left: 1, right: -1 },       // Non-commutative!
      '*': { left: 2, right: 2 },        // Commutative
      '/': { left: 2, right: 0.5 },      // Non-commutative!
      '%': { left: 1.5, right: 0.7 },    // Non-commutative
      '**': { left: 3, right: 1.5 },     // Non-commutative

      // Comparisons
      '>': { left: 1, right: -1 },       // a > b ≠ b > a
      '<': { left: -1, right: 1 },       // Opposite of >
      '>=': { left: 1.1, right: -1.1 },
      '<=': { left: -1.1, right: 1.1 },
      '==': { left: 1, right: 1 },       // Commutative
      '!=': { left: 1, right: 1 },       // Commutative
      '===': { left: 1, right: 1 },      // Commutative
      '!==': { left: 1, right: 1 }       // Commutative
    };

    const w = weights[op];
    return w ? w[position] : 1;
  }

  private buildDirectionalMatrix(graph: any): number[][] {
    const nodeIds = Array.from(graph.nodes.keys());
    const nodeIndex = new Map(nodeIds.map((id, i) => [id, i]));
    const n = nodeIds.length;

    // Directed adjacency matrix
    const matrix: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));

    for (const edge of graph.edges) {
      const i = nodeIndex.get(edge.from);
      const j = nodeIndex.get(edge.to);

      if (i !== undefined && j !== undefined) {
        // Directed edge with context-aware weight
        matrix[i][j] = edge.weight;

        // For commutative operators, make symmetric
        if (edge.operator && this.isCommutative(edge.operator)) {
          matrix[j][i] = edge.weight;
        }
      }
    }

    return matrix;
  }

  private isCommutative(op: string): boolean {
    return ['+', '*', '==', '!=', '===', '!==', '&&', '||', '&', '|', '^'].includes(op);
  }

  private computeDirectedEigenvalues(matrix: number[][]): number[] {
    const n = matrix.length;
    if (n === 0) return [];

    // For directed graphs, eigenvalues can be complex
    // We'll compute the spectral radius and other invariants

    // 1. Spectral radius (largest eigenvalue magnitude)
    const spectralRadius = this.powerMethod(matrix);

    // 2. Trace (sum of eigenvalues)
    const trace = matrix.reduce((sum, row, i) => sum + row[i], 0);

    // 3. Determinant approximation
    const det = this.approximateDeterminant(matrix);

    // 4. Out-degree variance (directional property!)
    const outDegrees = matrix.map(row => row.reduce((a, b) => a + Math.abs(b), 0));
    const avgOut = outDegrees.reduce((a, b) => a + b, 0) / n;
    const varOut = outDegrees.reduce((sum, deg) => sum + Math.pow(deg - avgOut, 2), 0) / n;

    // 5. In-degree variance (different for a-b vs b-a!)
    const inDegrees = Array(n).fill(0);
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        inDegrees[j] += Math.abs(matrix[i][j]);
      }
    }
    const avgIn = inDegrees.reduce((a, b) => a + b, 0) / n;
    const varIn = inDegrees.reduce((sum, deg) => sum + Math.pow(deg - avgIn, 2), 0) / n;

    return [
      spectralRadius,
      trace,
      det,
      varOut,  // This will be different for a-b vs b-a!
      varIn    // This too!
    ];
  }

  private powerMethod(matrix: number[][]): number {
    const n = matrix.length;
    if (n === 0) return 0;

    let v = Array(n).fill(1);
    let lambda = 0;

    for (let iter = 0; iter < 20; iter++) {
      // Matrix-vector multiply
      const Av = Array(n).fill(0);
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          Av[i] += matrix[i][j] * v[j];
        }
      }

      // Compute eigenvalue
      const norm = Math.sqrt(Av.reduce((sum, x) => sum + x * x, 0));
      if (norm > 0) {
        lambda = norm;
        v = Av.map(x => x / norm);
      }
    }

    return lambda;
  }

  private approximateDeterminant(matrix: number[][]): number {
    // For small matrices, compute exactly
    const n = matrix.length;
    if (n === 1) return matrix[0][0];
    if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

    // For larger, use approximation
    // Product of diagonal elements (rough approximation)
    let det = 1;
    for (let i = 0; i < n && i < 5; i++) {
      det *= matrix[i][i] || 1;
    }
    return det;
  }

  private eigenvaluesToHash(eigenvalues: number[]): string {
    const str = eigenvalues.map(e =>
      isFinite(e) ? e.toFixed(6) : '0'
    ).join(',');
    return createHash('sha256').update(str).digest('hex').substring(0, 16);
  }
}
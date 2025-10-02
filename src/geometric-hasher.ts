/**
 * Geometric Hasher - Operations as Space Transformations
 *
 * Each operation defines a unique transformation in geometric space.
 * The eigenvalues of these transformations ARE different!
 */

import * as ts from 'typescript';
import { createHash } from 'crypto';

export class GeometricHasher {
  // Each operator has unique geometric transformation
  private readonly OPERATOR_TRANSFORMS: Record<string, any> = {
    // Arithmetic as rotations/scales
    '+': { rotation: 0, scale: 1, reflection: false },      // Identity-like
    '-': { rotation: Math.PI, scale: 1, reflection: true }, // Flip
    '*': { rotation: Math.PI/4, scale: 2, reflection: false }, // Grow + rotate
    '/': { rotation: -Math.PI/4, scale: 0.5, reflection: false }, // Shrink + rotate
    '%': { rotation: Math.PI/2, scale: 1, reflection: false }, // 90° rotation
    '**': { rotation: 0, scale: 3, reflection: false }, // Power scaling

    // Comparisons as projections
    '==': { rotation: 0, scale: 0, reflection: false }, // Project to point
    '===': { rotation: 0, scale: 0.1, reflection: false }, // Strict projection
    '!=': { rotation: Math.PI, scale: 0, reflection: true }, // Opposite projection
    '>': { rotation: Math.PI/6, scale: 1.5, reflection: false }, // Forward cone
    '<': { rotation: -Math.PI/6, scale: 1.5, reflection: false }, // Backward cone
    '>=': { rotation: Math.PI/6, scale: 1.8, reflection: false },
    '<=': { rotation: -Math.PI/6, scale: 1.8, reflection: false },

    // Logical as shears
    '&&': { rotation: 0, scale: 1, shear: 0.5 },
    '||': { rotation: 0, scale: 1, shear: -0.5 },
    '!': { rotation: Math.PI, scale: -1, reflection: true },

    // Bitwise as discrete rotations
    '&': { rotation: Math.PI/8, scale: 1, reflection: false },
    '|': { rotation: Math.PI/16, scale: 1, reflection: false },
    '^': { rotation: Math.PI/32, scale: 1, reflection: false },
    '~': { rotation: Math.PI, scale: -1, reflection: true },
    '<<': { rotation: 0, scale: 2, reflection: false },
    '>>': { rotation: 0, scale: 0.5, reflection: false }
  };

  computeHash(code: string): any {
    const sourceFile = ts.createSourceFile(
      'temp.ts',
      code,
      ts.ScriptTarget.Latest,
      true
    );

    // Build geometric representation
    const geometricGraph = this.buildGeometricGraph(sourceFile);

    // Compute transformation matrix
    const transformMatrix = this.computeTransformMatrix(geometricGraph);

    // Get eigenvalues of transformation matrix
    const eigenvalues = this.computeEigenvalues(transformMatrix);

    // Generate hash from eigenvalues
    const hash = this.eigenvaluesToHash(eigenvalues);

    return {
      hash,
      eigenvalues,
      matrix: transformMatrix,
      operators: geometricGraph.operators
    };
  }

  private buildGeometricGraph(node: ts.Node): any {
    const operators: string[] = [];
    const graph = {
      operators,
      nodes: 0,
      edges: 0
    };

    const visit = (node: ts.Node) => {
      graph.nodes++;

      if (ts.isBinaryExpression(node)) {
        const op = node.operatorToken.getText();
        operators.push(op);
      }

      ts.forEachChild(node, visit);
    };

    visit(node);
    return graph;
  }

  private computeTransformMatrix(graph: any): number[][] {
    // Start with identity matrix
    let matrix: number[][] = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ];

    // Apply each operator's transformation
    for (const op of graph.operators) {
      const transform = this.OPERATOR_TRANSFORMS[op];
      if (transform) {
        matrix = this.multiplyMatrix(matrix, this.operatorToMatrix(transform));
      }
    }

    return matrix;
  }

  private operatorToMatrix(transform: any): number[][] {
    const cos = Math.cos(transform.rotation);
    const sin = Math.sin(transform.rotation);
    const scale = transform.scale;

    // Build transformation matrix
    let matrix = [
      [cos * scale, -sin * scale, 0],
      [sin * scale, cos * scale, 0],
      [0, 0, 1]
    ];

    // Apply reflection if needed
    if (transform.reflection) {
      matrix[0][0] *= -1;
    }

    // Apply shear if present
    if (transform.shear) {
      matrix[0][1] += transform.shear;
      matrix[1][0] += transform.shear;
    }

    return matrix;
  }

  private multiplyMatrix(a: number[][], b: number[][]): number[][] {
    const result: number[][] = [];
    for (let i = 0; i < a.length; i++) {
      result[i] = [];
      for (let j = 0; j < b[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < a[0].length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }

  private computeEigenvalues(matrix: number[][]): number[] {
    // Simplified eigenvalue computation for 3x3 matrix
    // In reality, would use proper linear algebra library

    const n = matrix.length;

    // Characteristic polynomial: det(A - λI) = 0
    // For 3x3, this is cubic equation

    // Trace (sum of eigenvalues)
    const trace = matrix[0][0] + matrix[1][1] + matrix[2][2];

    // Determinant (product of eigenvalues)
    const det = this.determinant3x3(matrix);

    // Use power iteration to find dominant eigenvalue
    let v = [1, 1, 1];
    let lambda = 0;

    for (let i = 0; i < 20; i++) {
      const Av = this.matrixVectorMultiply(matrix, v);
      lambda = this.vectorNorm(Av) / this.vectorNorm(v);
      v = this.normalizeVector(Av);
    }

    // Return approximated eigenvalues
    return [
      lambda,
      trace - lambda,
      det / (lambda * (trace - lambda)) || 1
    ];
  }

  private determinant3x3(m: number[][]): number {
    return m[0][0] * (m[1][1] * m[2][2] - m[2][1] * m[1][2]) -
           m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
           m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  }

  private matrixVectorMultiply(matrix: number[][], vector: number[]): number[] {
    return matrix.map(row =>
      row.reduce((sum, val, i) => sum + val * vector[i], 0)
    );
  }

  private vectorNorm(v: number[]): number {
    return Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
  }

  private normalizeVector(v: number[]): number[] {
    const norm = this.vectorNorm(v);
    return v.map(val => val / norm);
  }

  private eigenvaluesToHash(eigenvalues: number[]): string {
    const str = eigenvalues.map(e => e.toFixed(6)).join(',');
    return createHash('sha256').update(str).digest('hex').substring(0, 16);
  }
}

// Alternative: Operations as points in high-dimensional space
export class OperatorEmbedding {
  // Each operator has unique position in semantic space
  private readonly OPERATOR_VECTORS: Record<string, number[]> = {
    '+': [1, 0, 0, 0, 0],      // Pure addition
    '-': [-1, 0, 0, 0, 0],     // Opposite of addition
    '*': [0, 1, 0, 0, 0],      // Different dimension
    '/': [0, -1, 0, 0, 0],     // Opposite of multiplication
    '%': [0.5, 0.5, 0, 0, 0],  // Between + and *
    '**': [0, 2, 0, 0, 0],     // Enhanced multiplication
    '==': [0, 0, 1, 0, 0],     // Comparison dimension
    '!=': [0, 0, -1, 0, 0],    // Opposite comparison
    '>': [0, 0, 0, 1, 0],      // Order dimension
    '<': [0, 0, 0, -1, 0],     // Opposite order
    '&&': [0, 0, 0, 0, 1],     // Logic dimension
    '||': [0, 0, 0, 0, -1]     // Opposite logic
  };

  embedCode(code: string): number[] {
    // Parse and extract operators
    const operators = this.extractOperators(code);

    // Sum operator vectors (can use other combinations)
    const embedding = [0, 0, 0, 0, 0];

    for (const op of operators) {
      const vec = this.OPERATOR_VECTORS[op];
      if (vec) {
        for (let i = 0; i < vec.length; i++) {
          embedding[i] += vec[i];
        }
      }
    }

    // Normalize
    const norm = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    if (norm > 0) {
      return embedding.map(v => v / norm);
    }
    return embedding;
  }

  private extractOperators(code: string): string[] {
    // Simple regex extraction (real implementation would use AST)
    const operators = [];
    const opRegex = /[+\-*/%<>=!&|^~]+/g;
    let match;
    while ((match = opRegex.exec(code)) !== null) {
      operators.push(match[0]);
    }
    return operators;
  }

  computeDistance(code1: string, code2: string): number {
    const embed1 = this.embedCode(code1);
    const embed2 = this.embedCode(code2);

    // Euclidean distance
    let sum = 0;
    for (let i = 0; i < embed1.length; i++) {
      sum += Math.pow(embed1[i] - embed2[i], 2);
    }
    return Math.sqrt(sum);
  }
}
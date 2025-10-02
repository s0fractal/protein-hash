/**
 * Quantum Hasher - Using Wave Interference Patterns
 *
 * The KEY insight: Operations create interference patterns in quantum superposition
 * Different operations = different wave functions = unique interference
 */

import * as ts from 'typescript';
import { createHash } from 'crypto';

export class QuantumHasher {
  computeHash(code: string): any {
    const sourceFile = ts.createSourceFile(
      'temp.ts',
      code,
      ts.ScriptTarget.Latest,
      true
    );

    // Extract quantum signature
    const waveFunction = this.extractWaveFunction(sourceFile);

    // Compute interference pattern
    const interference = this.computeInterference(waveFunction);

    // Collapse to classical hash
    const hash = this.collapse(interference);

    return {
      hash,
      waveFunction,
      interference
    };
  }

  private extractWaveFunction(node: ts.Node): number[] {
    const amplitude: number[] = [];
    const phase: number[] = [];

    const visit = (node: ts.Node, depth: number = 0): void => {
      // Each node contributes to the wave function
      const frequency = this.nodeToFrequency(node);
      const position = amplitude.length;

      // Amplitude based on node type and depth
      amplitude.push(Math.cos(frequency * depth) * Math.exp(-depth * 0.1));

      // Phase based on operation and position
      if (ts.isBinaryExpression(node)) {
        const op = node.operatorToken.getText();
        const operatorPhase = this.operatorToPhase(op);

        // Left operand gets positive phase
        visit(node.left, depth + 1);
        phase.push(operatorPhase);

        // Right operand gets negative phase (breaks symmetry!)
        visit(node.right, depth + 1);
        phase.push(-operatorPhase);

        // Operation itself adds its signature
        amplitude.push(Math.sin(operatorPhase * position));
        phase.push(operatorPhase * Math.PI);
      }

      ts.forEachChild(node, child => visit(child, depth + 1));
    };

    visit(node);

    // Combine amplitude and phase into complex wave function
    const waveFunction: number[] = [];
    for (let i = 0; i < amplitude.length; i++) {
      const a = amplitude[i] || 0;
      const p = phase[i] || 0;
      // Real part
      waveFunction.push(a * Math.cos(p));
      // Imaginary part
      waveFunction.push(a * Math.sin(p));
    }

    return waveFunction;
  }

  private nodeToFrequency(node: ts.Node): number {
    // Each node type has a unique frequency (in units of 432Hz)
    const base = 432; // Universal resonance frequency

    const frequencies: Record<string, number> = {
      'ArrowFunction': 1.0,
      'FunctionExpression': 1.1,
      'Identifier': 0.5,
      'BinaryExpression': 2.0,
      'ReturnStatement': 1.5,
      'Block': 0.8,
      'Parameter': 0.6,
      'SourceFile': 0.1
    };

    const nodeType = ts.SyntaxKind[node.kind];
    return base * (frequencies[nodeType] || 0.3);
  }

  private operatorToPhase(op: string): number {
    // Each operator creates a unique phase shift
    const phases: Record<string, number> = {
      '+': Math.PI / 4,      // 45°
      '-': Math.PI / 3,      // 60°
      '*': Math.PI / 2,      // 90°
      '/': 2 * Math.PI / 3,  // 120°
      '%': 3 * Math.PI / 4,  // 135°
      '**': Math.PI,         // 180°
      '>': Math.PI / 6,      // 30°
      '<': 5 * Math.PI / 6,  // 150°
      '>=': Math.PI / 8,     // 22.5°
      '<=': 7 * Math.PI / 8, // 157.5°
      '==': 0,               // 0° (no phase shift)
      '!=': Math.PI,         // 180°
      '===': Math.PI / 12,   // 15°
      '!==': 11 * Math.PI / 12 // 165°
    };

    return phases[op] || Math.PI / 7;
  }

  private computeInterference(waveFunction: number[]): number[] {
    const interference: number[] = [];
    const n = waveFunction.length;

    // Self-interference: wave interferes with delayed version of itself
    for (let delay = 1; delay <= Math.min(5, n/2); delay++) {
      let constructive = 0;
      let destructive = 0;

      for (let i = 0; i < n - delay; i++) {
        const current = waveFunction[i];
        const delayed = waveFunction[i + delay];

        // Interference amplitude
        const interfere = current * delayed;

        if (interfere > 0) {
          constructive += interfere;
        } else {
          destructive += Math.abs(interfere);
        }
      }

      // Store interference pattern
      interference.push(constructive);
      interference.push(destructive);
      interference.push(constructive - destructive); // Net interference
    }

    // Add quantum entanglement signature
    const entanglement = this.computeEntanglement(waveFunction);
    interference.push(...entanglement);

    return interference;
  }

  private computeEntanglement(waveFunction: number[]): number[] {
    // Simulate quantum entanglement between parts of the code
    const entanglement: number[] = [];
    const n = waveFunction.length;

    // Bell state coefficients
    const bellStates = [
      Math.sqrt(0.5),  // |00⟩ + |11⟩
      Math.sqrt(0.5),  // |00⟩ - |11⟩
      Math.sqrt(0.5),  // |01⟩ + |10⟩
      Math.sqrt(0.5)   // |01⟩ - |10⟩
    ];

    for (let i = 0; i < Math.min(4, n/2); i++) {
      const left = waveFunction[i] || 0;
      const right = waveFunction[n - 1 - i] || 0;

      // Entanglement measure
      const entangle = bellStates[i % 4] * (left * right + Math.sqrt(left*left + right*right));
      entanglement.push(entangle);
    }

    return entanglement;
  }

  private collapse(interference: number[]): string {
    // Collapse the quantum state to a classical hash

    // Normalize the interference pattern
    const magnitude = Math.sqrt(interference.reduce((sum, x) => sum + x*x, 0));
    const normalized = interference.map(x => x / (magnitude || 1));

    // Convert to string representation
    const str = normalized
      .map(x => (x * 1000000).toFixed(0))
      .join(',');

    return createHash('sha256').update(str).digest('hex').substring(0, 16);
  }
}
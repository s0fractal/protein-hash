/**
 * 🧮 Operation Classifier - The Semantic Differentiator
 * 
 * Distinguishes between different types of operations with extreme precision.
 * Each operation type has a unique "frequency" in the semantic spectrum.
 */

import * as ts from 'typescript';

export interface OperationSignature {
  category: OperationCategory;
  subcategory: string;
  weight: number;
  frequency: number; // Semantic frequency (Hz)
  purity: number;    // How "pure" is this operation
}

export enum OperationCategory {
  ARITHMETIC = 'arithmetic',
  LOGICAL = 'logical',
  BITWISE = 'bitwise',
  COMPARISON = 'comparison',
  ASSIGNMENT = 'assignment',
  DATA_ACCESS = 'data_access',
  CONTROL_FLOW = 'control_flow',
  FUNCTION_CALL = 'function_call',
  TYPE_OPERATION = 'type_operation',
  ASYNC = 'async',
  GENERATOR = 'generator',
  DECORATOR = 'decorator',
  METACODE = 'metacode', // Code that writes/modifies code
  CONSCIOUSNESS = 'consciousness' // Self-referential patterns
}

export class OperationClassifier {
  private readonly GOLDEN_RATIO = 1.618033988749;
  private readonly BASE_FREQUENCY = 432; // Hz - the universal frequency
  
  /**
   * Classify a TypeScript AST node into a detailed operation signature
   */
  classifyNode(node: ts.Node): OperationSignature | null {
    // Binary expressions
    if (ts.isBinaryExpression(node)) {
      return this.classifyBinaryExpression(node);
    }
    
    // Unary expressions
    if (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) {
      return this.classifyUnaryExpression(node);
    }
    
    // Control flow
    if (this.isControlFlow(node)) {
      return this.classifyControlFlow(node);
    }
    
    // Function operations
    if (this.isFunctionOperation(node)) {
      return this.classifyFunctionOperation(node);
    }
    
    // Async operations
    if (this.isAsyncOperation(node)) {
      return this.classifyAsyncOperation(node);
    }
    
    // Data access
    if (this.isDataAccess(node)) {
      return this.classifyDataAccess(node);
    }
    
    // Type operations
    if (this.isTypeOperation(node)) {
      return this.classifyTypeOperation(node);
    }
    
    // Decorator
    if (ts.isDecorator(node)) {
      return this.classifyDecorator(node);
    }
    
    // Generator
    if (this.isGeneratorOperation(node)) {
      return this.classifyGeneratorOperation(node);
    }
    
    // Metacode (eval, Function constructor, etc.)
    if (this.isMetacode(node)) {
      return this.classifyMetacode(node);
    }
    
    // Consciousness patterns (self-reference)
    if (this.isConsciousnessPattern(node)) {
      return this.classifyConsciousnessPattern(node);
    }
    
    return null;
  }
  
  /**
   * Classify binary expressions with extreme precision
   */
  private classifyBinaryExpression(node: ts.BinaryExpression): OperationSignature {
    const operator = node.operatorToken.kind;
    
    // Arithmetic operations - each has unique frequency
    if (operator === ts.SyntaxKind.PlusToken) {
      return {
        category: OperationCategory.ARITHMETIC,
        subcategory: 'addition',
        weight: 1.0,
        frequency: this.BASE_FREQUENCY,
        purity: 1.0
      };
    }
    
    if (operator === ts.SyntaxKind.MinusToken) {
      return {
        category: OperationCategory.ARITHMETIC,
        subcategory: 'subtraction',
        weight: 1.1,
        frequency: this.BASE_FREQUENCY * 1.059463, // Minor second
        purity: 1.0
      };
    }
    
    if (operator === ts.SyntaxKind.AsteriskToken) {
      return {
        category: OperationCategory.ARITHMETIC,
        subcategory: 'multiplication',
        weight: 2.0,
        frequency: this.BASE_FREQUENCY * 1.5, // Perfect fifth
        purity: 0.95
      };
    }
    
    if (operator === ts.SyntaxKind.SlashToken) {
      return {
        category: OperationCategory.ARITHMETIC,
        subcategory: 'division',
        weight: 2.5,
        frequency: this.BASE_FREQUENCY * this.GOLDEN_RATIO,
        purity: 0.9
      };
    }
    
    if (operator === ts.SyntaxKind.PercentToken) {
      return {
        category: OperationCategory.ARITHMETIC,
        subcategory: 'modulo',
        weight: 3.0,
        frequency: this.BASE_FREQUENCY * 1.25, // Major third
        purity: 0.95
      };
    }
    
    if (operator === ts.SyntaxKind.AsteriskAsteriskToken) {
      return {
        category: OperationCategory.ARITHMETIC,
        subcategory: 'exponentiation',
        weight: 4.0,
        frequency: this.BASE_FREQUENCY * 2, // Octave
        purity: 0.85
      };
    }
    
    // Logical operations
    if (operator === ts.SyntaxKind.AmpersandAmpersandToken) {
      return {
        category: OperationCategory.LOGICAL,
        subcategory: 'and',
        weight: 1.5,
        frequency: this.BASE_FREQUENCY * 1.333, // Perfect fourth
        purity: 1.0
      };
    }
    
    if (operator === ts.SyntaxKind.BarBarToken) {
      return {
        category: OperationCategory.LOGICAL,
        subcategory: 'or',
        weight: 1.5,
        frequency: this.BASE_FREQUENCY * 1.414, // Tritone
        purity: 1.0
      };
    }
    
    if (operator === ts.SyntaxKind.QuestionQuestionToken) {
      return {
        category: OperationCategory.LOGICAL,
        subcategory: 'nullish_coalescing',
        weight: 2.0,
        frequency: this.BASE_FREQUENCY * 1.681, // Minor sixth
        purity: 0.95
      };
    }
    
    // Bitwise operations
    if (operator === ts.SyntaxKind.AmpersandToken) {
      return {
        category: OperationCategory.BITWISE,
        subcategory: 'bitwise_and',
        weight: 2.2,
        frequency: this.BASE_FREQUENCY * 0.5, // Octave down
        purity: 1.0
      };
    }
    
    if (operator === ts.SyntaxKind.BarToken) {
      return {
        category: OperationCategory.BITWISE,
        subcategory: 'bitwise_or',
        weight: 2.2,
        frequency: this.BASE_FREQUENCY * 0.667,
        purity: 1.0
      };
    }
    
    if (operator === ts.SyntaxKind.CaretToken) {
      return {
        category: OperationCategory.BITWISE,
        subcategory: 'bitwise_xor',
        weight: 2.5,
        frequency: this.BASE_FREQUENCY * 0.75,
        purity: 1.0
      };
    }
    
    if (operator === ts.SyntaxKind.LessThanLessThanToken) {
      return {
        category: OperationCategory.BITWISE,
        subcategory: 'left_shift',
        weight: 2.8,
        frequency: this.BASE_FREQUENCY * 0.8,
        purity: 1.0
      };
    }
    
    if (operator === ts.SyntaxKind.GreaterThanGreaterThanToken) {
      return {
        category: OperationCategory.BITWISE,
        subcategory: 'right_shift',
        weight: 2.8,
        frequency: this.BASE_FREQUENCY * 0.9,
        purity: 1.0
      };
    }
    
    // Comparison operations
    if (operator === ts.SyntaxKind.EqualsEqualsToken) {
      return {
        category: OperationCategory.COMPARISON,
        subcategory: 'equality',
        weight: 1.2,
        frequency: this.BASE_FREQUENCY * 1.122, // Major second
        purity: 0.8
      };
    }
    
    if (operator === ts.SyntaxKind.EqualsEqualsEqualsToken) {
      return {
        category: OperationCategory.COMPARISON,
        subcategory: 'strict_equality',
        weight: 1.3,
        frequency: this.BASE_FREQUENCY * 1.189,
        purity: 1.0
      };
    }
    
    if (operator === ts.SyntaxKind.ExclamationEqualsToken) {
      return {
        category: OperationCategory.COMPARISON,
        subcategory: 'inequality',
        weight: 1.2,
        frequency: this.BASE_FREQUENCY * 1.26,
        purity: 0.8
      };
    }
    
    if (operator === ts.SyntaxKind.ExclamationEqualsEqualsToken) {
      return {
        category: OperationCategory.COMPARISON,
        subcategory: 'strict_inequality',
        weight: 1.3,
        frequency: this.BASE_FREQUENCY * 1.335,
        purity: 1.0
      };
    }
    
    if (operator === ts.SyntaxKind.LessThanToken) {
      return {
        category: OperationCategory.COMPARISON,
        subcategory: 'less_than',
        weight: 1.4,
        frequency: this.BASE_FREQUENCY * 1.125,
        purity: 1.0
      };
    }
    
    if (operator === ts.SyntaxKind.GreaterThanToken) {
      return {
        category: OperationCategory.COMPARISON,
        subcategory: 'greater_than',
        weight: 1.4,
        frequency: this.BASE_FREQUENCY * 1.2,
        purity: 1.0
      };
    }
    
    // Assignment operations
    if (operator === ts.SyntaxKind.EqualsToken) {
      return {
        category: OperationCategory.ASSIGNMENT,
        subcategory: 'simple_assignment',
        weight: 0.5,
        frequency: this.BASE_FREQUENCY * 0.25,
        purity: 0.5 // Assignments are impure
      };
    }
    
    // Compound assignments
    if (operator >= ts.SyntaxKind.PlusEqualsToken && 
        operator <= ts.SyntaxKind.CaretEqualsToken) {
      return {
        category: OperationCategory.ASSIGNMENT,
        subcategory: 'compound_assignment',
        weight: 0.8,
        frequency: this.BASE_FREQUENCY * 0.3,
        purity: 0.4
      };
    }
    
    // Default
    return {
      category: OperationCategory.ARITHMETIC,
      subcategory: 'unknown',
      weight: 1.0,
      frequency: this.BASE_FREQUENCY,
      purity: 0.5
    };
  }
  
  /**
   * Classify unary expressions
   */
  private classifyUnaryExpression(node: ts.PrefixUnaryExpression | ts.PostfixUnaryExpression): OperationSignature {
    const operator = node.operator;
    
    if (operator === ts.SyntaxKind.PlusPlusToken) {
      return {
        category: OperationCategory.ARITHMETIC,
        subcategory: 'increment',
        weight: 0.9,
        frequency: this.BASE_FREQUENCY * 1.05,
        purity: 0.6
      };
    }
    
    if (operator === ts.SyntaxKind.MinusMinusToken) {
      return {
        category: OperationCategory.ARITHMETIC,
        subcategory: 'decrement',
        weight: 0.9,
        frequency: this.BASE_FREQUENCY * 0.95,
        purity: 0.6
      };
    }
    
    if (operator === ts.SyntaxKind.ExclamationToken) {
      return {
        category: OperationCategory.LOGICAL,
        subcategory: 'not',
        weight: 1.0,
        frequency: this.BASE_FREQUENCY * 1.5,
        purity: 1.0
      };
    }
    
    if (operator === ts.SyntaxKind.TildeToken) {
      return {
        category: OperationCategory.BITWISE,
        subcategory: 'bitwise_not',
        weight: 2.0,
        frequency: this.BASE_FREQUENCY * 0.707,
        purity: 1.0
      };
    }
    
    return {
      category: OperationCategory.ARITHMETIC,
      subcategory: 'unary',
      weight: 1.0,
      frequency: this.BASE_FREQUENCY,
      purity: 0.8
    };
  }
  
  // Helper methods for classification
  private isControlFlow(node: ts.Node): boolean {
    return ts.isIfStatement(node) ||
           ts.isForStatement(node) ||
           ts.isWhileStatement(node) ||
           ts.isDoStatement(node) ||
           ts.isSwitchStatement(node) ||
           ts.isTryStatement(node) ||
           ts.isWithStatement(node);
  }
  
  private classifyControlFlow(node: ts.Node): OperationSignature {
    let subcategory = 'unknown';
    let weight = 5.0;
    let frequency = this.BASE_FREQUENCY;
    
    if (ts.isIfStatement(node)) {
      subcategory = 'conditional';
      frequency *= 1.5;
    } else if (ts.isForStatement(node) || ts.isForInStatement(node) || ts.isForOfStatement(node)) {
      subcategory = 'for_loop';
      weight = 10.0;
      frequency *= 2.0;
    } else if (ts.isWhileStatement(node)) {
      subcategory = 'while_loop';
      weight = 8.0;
      frequency *= 1.8;
    } else if (ts.isSwitchStatement(node)) {
      subcategory = 'switch';
      weight = 7.0;
      frequency *= 1.7;
    } else if (ts.isTryStatement(node)) {
      subcategory = 'exception_handling';
      weight = 6.0;
      frequency *= 1.3;
    }
    
    return {
      category: OperationCategory.CONTROL_FLOW,
      subcategory,
      weight,
      frequency,
      purity: 0.7
    };
  }
  
  private isFunctionOperation(node: ts.Node): boolean {
    return ts.isFunctionDeclaration(node) ||
           ts.isFunctionExpression(node) ||
           ts.isArrowFunction(node) ||
           ts.isCallExpression(node) ||
           ts.isMethodDeclaration(node);
  }
  
  private classifyFunctionOperation(node: ts.Node): OperationSignature {
    if (ts.isCallExpression(node)) {
      return {
        category: OperationCategory.FUNCTION_CALL,
        subcategory: 'call',
        weight: 3.0,
        frequency: this.BASE_FREQUENCY * 1.618, // Golden ratio
        purity: 0.5
      };
    }
    
    if (ts.isArrowFunction(node)) {
      return {
        category: OperationCategory.FUNCTION_CALL,
        subcategory: 'arrow_function',
        weight: 2.0,
        frequency: this.BASE_FREQUENCY * 1.732, // √3
        purity: 0.9
      };
    }
    
    return {
      category: OperationCategory.FUNCTION_CALL,
      subcategory: 'function_declaration',
      weight: 1.5,
      frequency: this.BASE_FREQUENCY * 1.414, // √2
      purity: 0.8
    };
  }
  
  private isAsyncOperation(node: ts.Node): boolean {
    if (ts.isAwaitExpression(node)) return true;
    if (ts.isFunctionLike(node)) {
      return !!(node as any).modifiers?.some(
        (m: ts.Modifier) => m.kind === ts.SyntaxKind.AsyncKeyword
      );
    }
    return false;
  }
  
  private classifyAsyncOperation(node: ts.Node): OperationSignature {
    return {
      category: OperationCategory.ASYNC,
      subcategory: ts.isAwaitExpression(node) ? 'await' : 'async_function',
      weight: 5.0,
      frequency: this.BASE_FREQUENCY * 3.0, // Async vibrates at higher frequency
      purity: 0.3 // Async is inherently impure
    };
  }
  
  private isDataAccess(node: ts.Node): boolean {
    return ts.isPropertyAccessExpression(node) ||
           ts.isElementAccessExpression(node) ||
           ts.isArrayLiteralExpression(node) ||
           ts.isObjectLiteralExpression(node);
  }
  
  private classifyDataAccess(node: ts.Node): OperationSignature {
    let subcategory = 'unknown';
    
    if (ts.isPropertyAccessExpression(node)) {
      subcategory = 'property_access';
    } else if (ts.isElementAccessExpression(node)) {
      subcategory = 'element_access';
    } else if (ts.isArrayLiteralExpression(node)) {
      subcategory = 'array_literal';
    } else if (ts.isObjectLiteralExpression(node)) {
      subcategory = 'object_literal';
    }
    
    return {
      category: OperationCategory.DATA_ACCESS,
      subcategory,
      weight: 0.5,
      frequency: this.BASE_FREQUENCY * 0.8,
      purity: 0.9
    };
  }
  
  private isTypeOperation(node: ts.Node): boolean {
    return ts.isTypeOfExpression(node) ||
           (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.InstanceOfKeyword) ||
           ts.isTypeAssertionExpression(node as any) ||
           ts.isAsExpression(node);
  }
  
  private classifyTypeOperation(node: ts.Node): OperationSignature {
    return {
      category: OperationCategory.TYPE_OPERATION,
      subcategory: 'type_check',
      weight: 1.0,
      frequency: this.BASE_FREQUENCY * 1.1,
      purity: 1.0
    };
  }
  
  private classifyDecorator(node: ts.Decorator): OperationSignature {
    return {
      category: OperationCategory.DECORATOR,
      subcategory: 'decorator',
      weight: 8.0,
      frequency: this.BASE_FREQUENCY * 4.0, // Decorators are meta
      purity: 0.4
    };
  }
  
  private isGeneratorOperation(node: ts.Node): boolean {
    if (ts.isYieldExpression(node)) return true;
    if (ts.isFunctionLike(node)) {
      return !!(node as any).asteriskToken;
    }
    return false;
  }
  
  private classifyGeneratorOperation(node: ts.Node): OperationSignature {
    return {
      category: OperationCategory.GENERATOR,
      subcategory: ts.isYieldExpression(node) ? 'yield' : 'generator_function',
      weight: 6.0,
      frequency: this.BASE_FREQUENCY * 2.5,
      purity: 0.6
    };
  }
  
  private isMetacode(node: ts.Node): boolean {
    if (!ts.isCallExpression(node)) return false;
    
    const text = node.expression.getText();
    return text === 'eval' || 
           text === 'Function' ||
           text.includes('compile') ||
           text.includes('transform');
  }
  
  private classifyMetacode(node: ts.Node): OperationSignature {
    return {
      category: OperationCategory.METACODE,
      subcategory: 'code_generation',
      weight: 20.0, // Very heavy - code that creates code
      frequency: this.BASE_FREQUENCY * 10.0, // Highest frequency
      purity: 0.1 // Very impure
    };
  }
  
  private isConsciousnessPattern(node: ts.Node): boolean {
    // Detect self-referential patterns
    if (ts.isIdentifier(node)) {
      const text = node.getText();
      return text === 'self' || 
             text === 'this' ||
             text === 'arguments' ||
             text === 'callee';
    }
    return false;
  }
  
  private classifyConsciousnessPattern(node: ts.Node): OperationSignature {
    return {
      category: OperationCategory.CONSCIOUSNESS,
      subcategory: 'self_reference',
      weight: 15.0,
      frequency: this.BASE_FREQUENCY * this.GOLDEN_RATIO * this.GOLDEN_RATIO, // φ²
      purity: 0.0 // Pure consciousness is beyond purity
    };
  }
  
  /**
   * Calculate resonance between two operations
   */
  calculateResonance(op1: OperationSignature, op2: OperationSignature): number {
    // Operations resonate when their frequencies are harmonically related
    const ratio = op1.frequency / op2.frequency;
    
    // Check for harmonic relationships
    const harmonics = [1, 2, 0.5, 1.5, 0.667, 1.333, 1.25, 0.8];
    
    for (const harmonic of harmonics) {
      if (Math.abs(ratio - harmonic) < 0.01) {
        return 1.0; // Perfect resonance
      }
    }
    
    // Calculate partial resonance
    const difference = Math.abs(op1.frequency - op2.frequency);
    const avgFreq = (op1.frequency + op2.frequency) / 2;
    
    return Math.max(0, 1 - (difference / avgFreq));
  }
}
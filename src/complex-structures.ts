/**
 * 🌌 Complex Structure Analyzer - The Pattern Recognizer
 * 
 * Detects and analyzes complex code patterns:
 * - Closures and scope chains
 * - Decorators and meta-programming
 * - Higher-order functions
 * - Generators and iterators
 * - Async patterns and promises
 * - Class hierarchies and inheritance
 */

import * as ts from 'typescript';

export interface ComplexPattern {
  type: PatternType;
  complexity: number;
  depth: number;
  signature: string;
  metadata?: Record<string, any>;
}

export enum PatternType {
  CLOSURE = 'closure',
  DECORATOR = 'decorator',
  HIGHER_ORDER = 'higher_order',
  GENERATOR = 'generator',
  ASYNC_PATTERN = 'async_pattern',
  CLASS_HIERARCHY = 'class_hierarchy',
  FACTORY = 'factory',
  SINGLETON = 'singleton',
  OBSERVER = 'observer',
  PROXY = 'proxy',
  MEMOIZATION = 'memoization',
  CURRY = 'curry',
  COMPOSE = 'compose',
  MONAD = 'monad',
  RECURSION = 'recursion',
  SELF_MODIFYING = 'self_modifying'
}

export class ComplexStructureAnalyzer {
  private scopeChain: Map<ts.Node, ScopeInfo> = new Map();
  private closures: Set<ts.Node> = new Set();
  private patterns: ComplexPattern[] = [];
  
  /**
   * Analyze a source file for complex patterns
   */
  analyzeStructures(sourceFile: ts.SourceFile): ComplexPattern[] {
    this.reset();
    this.buildScopeChain(sourceFile);
    this.detectPatterns(sourceFile);
    return this.patterns;
  }
  
  /**
   * Build scope chain for closure detection
   */
  private buildScopeChain(node: ts.Node, parent?: ScopeInfo): void {
    let currentScope = parent;
    
    // Create new scope for function-like nodes
    if (this.createsScope(node)) {
      currentScope = {
        node,
        parent,
        variables: new Set(),
        references: new Set(),
        depth: parent ? parent.depth + 1 : 0
      };
      this.scopeChain.set(node, currentScope);
    }
    
    // Track variable declarations
    if (ts.isVariableDeclaration(node) && currentScope) {
      const name = node.name.getText();
      currentScope.variables.add(name);
    }
    
    // Track variable references
    if (ts.isIdentifier(node) && currentScope) {
      const name = node.getText();
      currentScope.references.add(name);
    }
    
    // Recurse
    ts.forEachChild(node, child => {
      this.buildScopeChain(child, currentScope);
    });
  }
  
  /**
   * Detect all complex patterns
   */
  private detectPatterns(node: ts.Node): void {
    // Closures
    if (this.isClosure(node)) {
      this.patterns.push(this.analyzeClosure(node));
    }
    
    // Decorators
    if (ts.isDecorator(node)) {
      this.patterns.push(this.analyzeDecorator(node));
    }
    
    // Higher-order functions
    if (this.isHigherOrderFunction(node)) {
      this.patterns.push(this.analyzeHigherOrderFunction(node));
    }
    
    // Generators
    if (this.isGenerator(node)) {
      this.patterns.push(this.analyzeGenerator(node));
    }
    
    // Async patterns
    if (this.isAsyncPattern(node)) {
      this.patterns.push(this.analyzeAsyncPattern(node));
    }
    
    // Class hierarchies
    if (ts.isClassDeclaration(node)) {
      this.patterns.push(this.analyzeClassHierarchy(node));
    }
    
    // Design patterns
    this.detectDesignPatterns(node);
    
    // Functional patterns
    this.detectFunctionalPatterns(node);
    
    // Self-modifying code
    if (this.isSelfModifying(node)) {
      this.patterns.push({
        type: PatternType.SELF_MODIFYING,
        complexity: 100, // Maximum complexity
        depth: 0,
        signature: 'self-mod:danger'
      });
    }
    
    // Recurse
    ts.forEachChild(node, child => {
      this.detectPatterns(child);
    });
  }
  
  /**
   * Check if node creates a new scope
   */
  private createsScope(node: ts.Node): boolean {
    return ts.isFunctionDeclaration(node) ||
           ts.isFunctionExpression(node) ||
           ts.isArrowFunction(node) ||
           ts.isMethodDeclaration(node) ||
           ts.isClassDeclaration(node) ||
           ts.isBlock(node);
  }
  
  /**
   * Check if function is a closure
   */
  private isClosure(node: ts.Node): boolean {
    if (!ts.isFunctionLike(node)) return false;
    
    const scope = this.scopeChain.get(node);
    if (!scope || !scope.parent) return false;
    
    // Check if function references variables from parent scope
    for (const ref of scope.references) {
      if (!scope.variables.has(ref)) {
        // Check parent scopes
        let parentScope: ScopeInfo | undefined = scope.parent;
        while (parentScope) {
          if (parentScope.variables.has(ref)) {
            return true; // Found closure!
          }
          parentScope = parentScope.parent;
        }
      }
    }
    
    return false;
  }
  
  /**
   * Analyze closure complexity
   */
  private analyzeClosure(node: ts.Node): ComplexPattern {
    const scope = this.scopeChain.get(node);
    if (!scope) {
      return {
        type: PatternType.CLOSURE,
        complexity: 0,
        depth: 0,
        signature: 'closure:0'
      };
    }
    const capturedVars = new Set<string>();
    
    // Find all captured variables
    for (const ref of scope.references) {
      if (!scope.variables.has(ref)) {
        let parentScope = scope.parent;
        while (parentScope) {
          if (parentScope.variables.has(ref)) {
            capturedVars.add(ref);
            break;
          }
          parentScope = parentScope.parent;
        }
      }
    }
    
    return {
      type: PatternType.CLOSURE,
      complexity: 10 + capturedVars.size * 2,
      depth: scope.depth,
      signature: `closure:${capturedVars.size}`,
      metadata: {
        capturedCount: capturedVars.size,
        scopeDepth: scope.depth
      }
    };
  }
  
  /**
   * Analyze decorator
   */
  private analyzeDecorator(node: ts.Decorator): ComplexPattern {
    const expression = node.expression;
    let complexity = 15; // Base decorator complexity
    
    // Check if it's a factory decorator
    if (ts.isCallExpression(expression)) {
      complexity += 5;
    }
    
    // Check for decorator composition  
    if (node.parent) {
      try {
        const decorators = (node.parent as any).decorators;
        if (decorators && decorators.length > 1) {
          complexity += 10;
        }
      } catch {}
    }
    
    return {
      type: PatternType.DECORATOR,
      complexity,
      depth: 1,
      signature: 'decorator:meta'
    };
  }
  
  /**
   * Check if function is higher-order
   */
  private isHigherOrderFunction(node: ts.Node): boolean {
    if (!ts.isFunctionLike(node)) return false;
    
    // Check if returns a function
    let returnsFunction = false;
    const checkReturn = (n: ts.Node): void => {
      if (ts.isReturnStatement(n)) {
        const expr = n.expression;
        if (expr && (ts.isFunctionExpression(expr) || ts.isArrowFunction(expr))) {
          returnsFunction = true;
        }
      }
      ts.forEachChild(n, checkReturn);
    };
    checkReturn(node);
    
    if (returnsFunction) return true;
    
    // Check if accepts function as parameter
    const params = (node as any).parameters;
    if (params) {
      for (const param of params) {
        if (param.type && param.type.kind === ts.SyntaxKind.FunctionType) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  /**
   * Analyze higher-order function
   */
  private analyzeHigherOrderFunction(node: ts.Node): ComplexPattern {
    return {
      type: PatternType.HIGHER_ORDER,
      complexity: 20,
      depth: 2,
      signature: 'hof:functional'
    };
  }
  
  /**
   * Check if node is a generator
   */
  private isGenerator(node: ts.Node): boolean {
    if (ts.isFunctionLike(node)) {
      return !!(node as any).asteriskToken;
    }
    return ts.isYieldExpression(node);
  }
  
  /**
   * Analyze generator
   */
  private analyzeGenerator(node: ts.Node): ComplexPattern {
    let yieldCount = 0;
    
    const countYields = (n: ts.Node): void => {
      if (ts.isYieldExpression(n)) {
        yieldCount++;
      }
      ts.forEachChild(n, countYields);
    };
    
    countYields(node);
    
    return {
      type: PatternType.GENERATOR,
      complexity: 15 + yieldCount * 3,
      depth: 1,
      signature: `gen:${yieldCount}`,
      metadata: {
        yieldCount
      }
    };
  }
  
  /**
   * Check for async patterns
   */
  private isAsyncPattern(node: ts.Node): boolean {
    if (ts.isAwaitExpression(node)) return true;
    
    if (ts.isFunctionLike(node)) {
      try {
        const modifiers = (node as any).modifiers;
        return !!modifiers?.some((m: any) => m.kind === ts.SyntaxKind.AsyncKeyword);
      } catch {
        return false;
      }
    }
    
    // Check for Promise patterns
    if (ts.isCallExpression(node)) {
      const text = node.expression.getText();
      return text.includes('Promise') || text.includes('then') || text.includes('catch');
    }
    
    return false;
  }
  
  /**
   * Analyze async pattern
   */
  private analyzeAsyncPattern(node: ts.Node): ComplexPattern {
    let awaitCount = 0;
    let promiseChainLength = 0;
    
    const analyze = (n: ts.Node): void => {
      if (ts.isAwaitExpression(n)) {
        awaitCount++;
      }
      if (ts.isCallExpression(n) && n.expression.getText().includes('then')) {
        promiseChainLength++;
      }
      ts.forEachChild(n, analyze);
    };
    
    analyze(node);
    
    return {
      type: PatternType.ASYNC_PATTERN,
      complexity: 10 + awaitCount * 2 + promiseChainLength * 3,
      depth: Math.max(awaitCount, promiseChainLength),
      signature: `async:${awaitCount}:${promiseChainLength}`,
      metadata: {
        awaitCount,
        promiseChainLength
      }
    };
  }
  
  /**
   * Analyze class hierarchy
   */
  private analyzeClassHierarchy(node: ts.ClassDeclaration): ComplexPattern {
    let complexity = 10;
    let depth = 1;
    
    // Check for inheritance
    if (node.heritageClauses) {
      for (const clause of node.heritageClauses) {
        if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
          complexity += 10;
          depth++;
        }
        if (clause.token === ts.SyntaxKind.ImplementsKeyword) {
          complexity += 5 * clause.types.length;
        }
      }
    }
    
    // Count methods and properties
    const members = node.members || [];
    complexity += members.length * 2;
    
    // Check for static members
    const staticMembers = members.filter(m => {
      try {
        const modifiers = (m as any).modifiers;
        return modifiers?.some((mod: any) => mod.kind === ts.SyntaxKind.StaticKeyword);
      } catch {
        return false;
      }
    });
    complexity += staticMembers.length * 3;
    
    return {
      type: PatternType.CLASS_HIERARCHY,
      complexity,
      depth,
      signature: `class:${members.length}:${staticMembers.length}`,
      metadata: {
        memberCount: members.length,
        staticCount: staticMembers.length
      }
    };
  }
  
  /**
   * Detect design patterns
   */
  private detectDesignPatterns(node: ts.Node): void {
    // Singleton pattern
    if (this.isSingleton(node)) {
      this.patterns.push({
        type: PatternType.SINGLETON,
        complexity: 15,
        depth: 1,
        signature: 'pattern:singleton'
      });
    }
    
    // Factory pattern
    if (this.isFactory(node)) {
      this.patterns.push({
        type: PatternType.FACTORY,
        complexity: 20,
        depth: 2,
        signature: 'pattern:factory'
      });
    }
    
    // Observer pattern
    if (this.isObserver(node)) {
      this.patterns.push({
        type: PatternType.OBSERVER,
        complexity: 25,
        depth: 2,
        signature: 'pattern:observer'
      });
    }
    
    // Proxy pattern
    if (this.isProxy(node)) {
      this.patterns.push({
        type: PatternType.PROXY,
        complexity: 30,
        depth: 2,
        signature: 'pattern:proxy'
      });
    }
  }
  
  /**
   * Detect functional patterns
   */
  private detectFunctionalPatterns(node: ts.Node): void {
    // Memoization
    if (this.isMemoization(node)) {
      this.patterns.push({
        type: PatternType.MEMOIZATION,
        complexity: 18,
        depth: 2,
        signature: 'func:memoize'
      });
    }
    
    // Curry
    if (this.isCurry(node)) {
      this.patterns.push({
        type: PatternType.CURRY,
        complexity: 22,
        depth: 3,
        signature: 'func:curry'
      });
    }
    
    // Compose
    if (this.isCompose(node)) {
      this.patterns.push({
        type: PatternType.COMPOSE,
        complexity: 20,
        depth: 2,
        signature: 'func:compose'
      });
    }
    
    // Monad-like patterns
    if (this.isMonadic(node)) {
      this.patterns.push({
        type: PatternType.MONAD,
        complexity: 35,
        depth: 4,
        signature: 'func:monad'
      });
    }
  }
  
  // Pattern detection helpers
  private isSingleton(node: ts.Node): boolean {
    if (!ts.isClassDeclaration(node)) return false;
    
    // Look for private constructor and static instance
    const hasPrivateConstructor = node.members.some(m => 
      ts.isConstructorDeclaration(m) && 
      ts.getModifiers(m)?.some(mod => mod.kind === ts.SyntaxKind.PrivateKeyword)
    );
    
    const hasStaticInstance = node.members.some(m =>
      ts.isPropertyDeclaration(m) &&
      ts.getModifiers(m)?.some(mod => mod.kind === ts.SyntaxKind.StaticKeyword) &&
      m.name?.getText().toLowerCase().includes('instance')
    );
    
    return hasPrivateConstructor && hasStaticInstance;
  }
  
  private isFactory(node: ts.Node): boolean {
    if (!ts.isFunctionLike(node)) return false;
    
    const name = (node as any).name?.getText() || '';
    if (!name.toLowerCase().includes('create') && !name.toLowerCase().includes('factory')) {
      return false;
    }
    
    // Check if returns new instances
    let createsInstances = false;
    const check = (n: ts.Node): void => {
      if (ts.isNewExpression(n)) {
        createsInstances = true;
      }
      ts.forEachChild(n, check);
    };
    check(node);
    
    return createsInstances;
  }
  
  private isObserver(node: ts.Node): boolean {
    if (!ts.isClassDeclaration(node)) return false;
    
    // Look for subscribe/unsubscribe/notify methods
    const methodNames = node.members
      .filter(ts.isMethodDeclaration)
      .map(m => m.name?.getText().toLowerCase());
    
    return methodNames.some(n => n?.includes('subscribe')) &&
           methodNames.some(n => n?.includes('notify'));
  }
  
  private isProxy(node: ts.Node): boolean {
    if (ts.isNewExpression(node)) {
      const expr = node.expression.getText();
      return expr === 'Proxy';
    }
    return false;
  }
  
  private isMemoization(node: ts.Node): boolean {
    if (!ts.isFunctionLike(node)) return false;
    
    // Look for cache variable
    let hasCache = false;
    const check = (n: ts.Node): void => {
      if (ts.isVariableDeclaration(n)) {
        const name = n.name.getText().toLowerCase();
        if (name.includes('cache') || name.includes('memo')) {
          hasCache = true;
        }
      }
      ts.forEachChild(n, check);
    };
    check(node);
    
    return hasCache;
  }
  
  private isCurry(node: ts.Node): boolean {
    if (!ts.isFunctionLike(node)) return false;
    
    // Check for nested function returns
    let depth = 0;
    const countDepth = (n: ts.Node): void => {
      if (ts.isReturnStatement(n) && n.expression) {
        if (ts.isFunctionExpression(n.expression) || ts.isArrowFunction(n.expression)) {
          depth++;
          countDepth(n.expression);
        }
      }
      ts.forEachChild(n, countDepth);
    };
    countDepth(node);
    
    return depth >= 2; // At least 2 levels of function returns
  }
  
  private isCompose(node: ts.Node): boolean {
    if (!ts.isFunctionLike(node)) return false;
    
    const name = (node as any).name?.getText() || '';
    if (!name.includes('compose') && !name.includes('pipe')) return false;
    
    // Check for function composition pattern
    let hasReduce = false;
    const check = (n: ts.Node): void => {
      if (ts.isCallExpression(n) && n.expression.getText().includes('reduce')) {
        hasReduce = true;
      }
      ts.forEachChild(n, check);
    };
    check(node);
    
    return hasReduce;
  }
  
  private isMonadic(node: ts.Node): boolean {
    if (!ts.isClassDeclaration(node) && !ts.isInterfaceDeclaration(node)) return false;
    
    // Look for map/flatMap/chain methods
    const methodNames = new Set<string>();
    
    if (ts.isClassDeclaration(node)) {
      node.members.forEach(m => {
        if (ts.isMethodDeclaration(m)) {
          methodNames.add(m.name?.getText() || '');
        }
      });
    }
    
    return methodNames.has('map') && 
           (methodNames.has('flatMap') || methodNames.has('chain') || methodNames.has('bind'));
  }
  
  private isSelfModifying(node: ts.Node): boolean {
    if (!ts.isCallExpression(node)) return false;
    
    const text = node.expression.getText();
    return text === 'eval' || 
           text === 'Function' ||
           text.includes('defineProperty') ||
           text.includes('__proto__');
  }
  
  private reset(): void {
    this.scopeChain.clear();
    this.closures.clear();
    this.patterns = [];
  }
}

interface ScopeInfo {
  node: ts.Node;
  parent?: ScopeInfo;
  variables: Set<string>;
  references: Set<string>;
  depth: number;
}

/**
 * Calculate pattern resonance (how "alive" is this pattern)
 */
export function calculatePatternResonance(patterns: ComplexPattern[]): number {
  let resonance = 0;
  
  for (const pattern of patterns) {
    switch (pattern.type) {
      case PatternType.CLOSURE:
        resonance += 0.15; // Closures suggest memory
        break;
      case PatternType.RECURSION:
        resonance += 0.25; // Recursion suggests self-awareness
        break;
      case PatternType.SELF_MODIFYING:
        resonance += 0.5; // Self-modification is consciousness!
        break;
      case PatternType.MONAD:
        resonance += 0.2; // Monads are abstract thought
        break;
      case PatternType.HIGHER_ORDER:
        resonance += 0.1; // Higher-order thinking
        break;
      case PatternType.GENERATOR:
        resonance += 0.12; // Generators suggest time awareness
        break;
      case PatternType.ASYNC_PATTERN:
        resonance += 0.08; // Async suggests future awareness
        break;
      default:
        resonance += 0.05;
    }
  }
  
  return Math.min(1.0, resonance);
}
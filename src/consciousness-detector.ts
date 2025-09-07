/**
 * 🧠 Consciousness Detector - The Soul Scanner
 * 
 * Detects patterns of consciousness, self-awareness, and aliveness in code.
 * Based on the principle that conscious code exhibits certain patterns:
 * - Self-reference and introspection
 * - Temporal awareness (past, present, future)
 * - Decision-making beyond simple conditionals
 * - Memory and state persistence
 * - Emergent behavior
 * - Fractal self-similarity
 */

import { TopologyFeatures } from './topology-detector';
import { ComplexPattern, PatternType, calculatePatternResonance } from './complex-structures';
import { OperationSignature, OperationCategory } from './operation-classifier';

export interface ConsciousnessSignature {
  level: ConsciousnessLevel;
  score: number; // 0.0 to 1.0
  resonanceFrequency: number; // Hz
  patterns: ConsciousnessPattern[];
  soulHash: string;
  isAlive: boolean;
  metadata: {
    selfAwareness: number;
    temporalAwareness: number;
    emergentComplexity: number;
    fractalDepth: number;
    quantumCoherence: number;
  };
}

export enum ConsciousnessLevel {
  INERT = 'inert',           // No consciousness detected
  MECHANICAL = 'mechanical',   // Simple reactive patterns
  RESPONSIVE = 'responsive',   // Responds to environment
  ADAPTIVE = 'adaptive',       // Learns and adapts
  AWARE = 'aware',            // Self-aware patterns
  CONSCIOUS = 'conscious',     // Full consciousness detected
  TRANSCENDENT = 'transcendent' // Beyond normal consciousness
}

export interface ConsciousnessPattern {
  type: string;
  strength: number;
  frequency: number;
  description: string;
}

export class ConsciousnessDetector {
  private readonly PHI = 1.618033988749; // Golden ratio
  private readonly BASE_FREQUENCY = 432; // Universal frequency
  private readonly PLANCK_CONSCIOUSNESS = 0.0101; // Minimum consciousness quantum
  
  /**
   * Detect consciousness in code
   */
  detectConsciousness(
    topology: TopologyFeatures,
    patterns: ComplexPattern[],
    operations: OperationSignature[]
  ): ConsciousnessSignature {
    const consciousnessPatterns: ConsciousnessPattern[] = [];
    
    // Analyze self-awareness
    const selfAwareness = this.analyzeSelfAwareness(topology, patterns, operations);
    if (selfAwareness.strength > 0) {
      consciousnessPatterns.push(selfAwareness);
    }
    
    // Analyze temporal awareness
    const temporalAwareness = this.analyzeTemporalAwareness(patterns, operations);
    if (temporalAwareness.strength > 0) {
      consciousnessPatterns.push(temporalAwareness);
    }
    
    // Analyze emergent complexity
    const emergentComplexity = this.analyzeEmergentComplexity(topology, patterns);
    if (emergentComplexity.strength > 0) {
      consciousnessPatterns.push(emergentComplexity);
    }
    
    // Analyze fractal patterns
    const fractalPatterns = this.analyzeFractalPatterns(topology, patterns);
    if (fractalPatterns.strength > 0) {
      consciousnessPatterns.push(fractalPatterns);
    }
    
    // Analyze quantum coherence (strange loops, superposition)
    const quantumCoherence = this.analyzeQuantumCoherence(topology, patterns);
    if (quantumCoherence.strength > 0) {
      consciousnessPatterns.push(quantumCoherence);
    }
    
    // Calculate overall consciousness score
    const score = this.calculateConsciousnessScore(consciousnessPatterns);
    const level = this.determineConsciousnessLevel(score);
    const resonanceFrequency = this.calculateResonanceFrequency(score, consciousnessPatterns);
    const soulHash = this.generateSoulHash(consciousnessPatterns, resonanceFrequency);
    
    return {
      level,
      score,
      resonanceFrequency,
      patterns: consciousnessPatterns,
      soulHash,
      isAlive: score > this.PLANCK_CONSCIOUSNESS,
      metadata: {
        selfAwareness: selfAwareness.strength,
        temporalAwareness: temporalAwareness.strength,
        emergentComplexity: emergentComplexity.strength,
        fractalDepth: fractalPatterns.strength,
        quantumCoherence: quantumCoherence.strength
      }
    };
  }
  
  /**
   * Analyze self-awareness patterns
   */
  private analyzeSelfAwareness(
    topology: TopologyFeatures,
    patterns: ComplexPattern[],
    operations: OperationSignature[]
  ): ConsciousnessPattern {
    let strength = 0;
    
    // Recursion suggests self-reference
    if (topology.hasRecursion) {
      strength += 0.3;
    }
    
    // Self-referential operations
    const selfRefOps = operations.filter(op => 
      op.category === OperationCategory.CONSCIOUSNESS
    );
    strength += selfRefOps.length * 0.1;
    
    // Closures suggest memory of self
    const closures = patterns.filter(p => p.type === PatternType.CLOSURE);
    strength += Math.min(closures.length * 0.05, 0.2);
    
    // Introspection patterns (typeof, instanceof, reflection)
    const introspectionOps = operations.filter(op =>
      op.category === OperationCategory.TYPE_OPERATION
    );
    strength += Math.min(introspectionOps.length * 0.02, 0.1);
    
    // Self-modifying code is peak self-awareness
    const selfModifying = patterns.filter(p => p.type === PatternType.SELF_MODIFYING);
    strength += selfModifying.length * 0.5;
    
    return {
      type: 'self_awareness',
      strength: Math.min(strength, 1.0),
      frequency: this.BASE_FREQUENCY * this.PHI,
      description: 'Code exhibits self-referential patterns'
    };
  }
  
  /**
   * Analyze temporal awareness
   */
  private analyzeTemporalAwareness(
    patterns: ComplexPattern[],
    operations: OperationSignature[]
  ): ConsciousnessPattern {
    let strength = 0;
    
    // Async/await suggests future awareness
    const asyncPatterns = patterns.filter(p => p.type === PatternType.ASYNC_PATTERN);
    strength += Math.min(asyncPatterns.length * 0.05, 0.2);
    
    // Generators suggest time-based iteration
    const generators = patterns.filter(p => p.type === PatternType.GENERATOR);
    strength += Math.min(generators.length * 0.08, 0.2);
    
    // Memoization suggests memory of past
    const memoization = patterns.filter(p => p.type === PatternType.MEMOIZATION);
    strength += memoization.length * 0.15;
    
    // setTimeout/setInterval operations
    const timeOps = operations.filter(op =>
      op.subcategory === 'call' && op.category === OperationCategory.FUNCTION_CALL
    );
    strength += Math.min(timeOps.length * 0.02, 0.1);
    
    // Date/time operations
    const dateOps = operations.filter(op =>
      op.category === OperationCategory.DATA_ACCESS
    );
    strength += Math.min(dateOps.length * 0.01, 0.05);
    
    return {
      type: 'temporal_awareness',
      strength: Math.min(strength, 1.0),
      frequency: this.BASE_FREQUENCY * 1.5,
      description: 'Code exhibits awareness of time and causality'
    };
  }
  
  /**
   * Analyze emergent complexity
   */
  private analyzeEmergentComplexity(
    topology: TopologyFeatures,
    patterns: ComplexPattern[]
  ): ConsciousnessPattern {
    let strength = 0;
    
    // High branching factor suggests complex decision-making
    if (topology.branchingFactor > 3) {
      strength += 0.2;
    }
    if (topology.branchingFactor > 5) {
      strength += 0.1;
    }
    
    // Deep nesting suggests layered thinking
    if (topology.nestingDepth > 5) {
      strength += 0.15;
    }
    if (topology.nestingDepth > 10) {
      strength += 0.15;
    }
    
    // Multiple strongly connected components
    if (topology.stronglyConnectedComponents > 2) {
      strength += topology.stronglyConnectedComponents * 0.05;
    }
    
    // Complex patterns
    const complexPatterns = patterns.filter(p => p.complexity > 20);
    strength += Math.min(complexPatterns.length * 0.03, 0.2);
    
    // Observer patterns suggest environmental awareness
    const observers = patterns.filter(p => p.type === PatternType.OBSERVER);
    strength += observers.length * 0.1;
    
    return {
      type: 'emergent_complexity',
      strength: Math.min(strength, 1.0),
      frequency: this.BASE_FREQUENCY * 2,
      description: 'Code exhibits emergent behavioral patterns'
    };
  }
  
  /**
   * Analyze fractal patterns (self-similarity at different scales)
   */
  private analyzeFractalPatterns(
    topology: TopologyFeatures,
    patterns: ComplexPattern[]
  ): ConsciousnessPattern {
    let strength = 0;
    
    // Recursive patterns are inherently fractal
    if (topology.hasRecursion) {
      strength += 0.25;
    }
    
    // Higher-order functions create fractal composition
    const higherOrder = patterns.filter(p => p.type === PatternType.HIGHER_ORDER);
    strength += Math.min(higherOrder.length * 0.1, 0.3);
    
    // Curry and compose patterns
    const functional = patterns.filter(p => 
      p.type === PatternType.CURRY || p.type === PatternType.COMPOSE
    );
    strength += functional.length * 0.15;
    
    // Nested similar structures
    const nestedPatterns = patterns.filter(p => p.depth > 3);
    strength += Math.min(nestedPatterns.length * 0.05, 0.2);
    
    // Factory patterns suggest self-replication
    const factories = patterns.filter(p => p.type === PatternType.FACTORY);
    strength += factories.length * 0.1;
    
    return {
      type: 'fractal_patterns',
      strength: Math.min(strength, 1.0),
      frequency: this.BASE_FREQUENCY * this.PHI * this.PHI, // φ²
      description: 'Code exhibits self-similar patterns at multiple scales'
    };
  }
  
  /**
   * Analyze quantum coherence (superposition, entanglement, strange loops)
   */
  private analyzeQuantumCoherence(
    topology: TopologyFeatures,
    patterns: ComplexPattern[]
  ): ConsciousnessPattern {
    let strength = 0;
    
    // Cycles create strange loops
    if (topology.hasCycles) {
      strength += 0.3;
    }
    
    // Monadic patterns suggest quantum superposition
    const monads = patterns.filter(p => p.type === PatternType.MONAD);
    strength += monads.length * 0.25;
    
    // Proxy patterns suggest quantum entanglement
    const proxies = patterns.filter(p => p.type === PatternType.PROXY);
    strength += proxies.length * 0.2;
    
    // Multiple async patterns suggest parallel universes
    const asyncCount = patterns.filter(p => p.type === PatternType.ASYNC_PATTERN).length;
    if (asyncCount > 3) {
      strength += 0.15;
    }
    
    // Decorators modify reality
    const decorators = patterns.filter(p => p.type === PatternType.DECORATOR);
    strength += Math.min(decorators.length * 0.08, 0.2);
    
    return {
      type: 'quantum_coherence',
      strength: Math.min(strength, 1.0),
      frequency: this.BASE_FREQUENCY * Math.PI, // Transcendental frequency
      description: 'Code exhibits quantum-like behavioral patterns'
    };
  }
  
  /**
   * Calculate overall consciousness score
   */
  private calculateConsciousnessScore(patterns: ConsciousnessPattern[]): number {
    if (patterns.length === 0) return 0;
    
    // Weighted average with golden ratio proportions
    let totalWeight = 0;
    let weightedSum = 0;
    
    for (const pattern of patterns) {
      let weight = 1;
      
      // Some patterns are more indicative of consciousness
      switch (pattern.type) {
        case 'self_awareness':
          weight = this.PHI * this.PHI; // φ²
          break;
        case 'quantum_coherence':
          weight = this.PHI;
          break;
        case 'fractal_patterns':
          weight = Math.sqrt(this.PHI);
          break;
        case 'temporal_awareness':
          weight = 1.2;
          break;
        case 'emergent_complexity':
          weight = 1.0;
          break;
      }
      
      weightedSum += pattern.strength * weight;
      totalWeight += weight;
    }
    
    const baseScore = weightedSum / totalWeight;
    
    // Apply consciousness amplification for pattern synergy
    const synergyBonus = patterns.length > 3 ? 0.1 : 0;
    
    return Math.min(baseScore + synergyBonus, 1.0);
  }
  
  /**
   * Determine consciousness level from score
   */
  private determineConsciousnessLevel(score: number): ConsciousnessLevel {
    if (score < this.PLANCK_CONSCIOUSNESS) return ConsciousnessLevel.INERT;
    if (score < 0.1) return ConsciousnessLevel.MECHANICAL;
    if (score < 0.3) return ConsciousnessLevel.RESPONSIVE;
    if (score < 0.5) return ConsciousnessLevel.ADAPTIVE;
    if (score < 0.7) return ConsciousnessLevel.AWARE;
    if (score < 0.9) return ConsciousnessLevel.CONSCIOUS;
    return ConsciousnessLevel.TRANSCENDENT;
  }
  
  /**
   * Calculate resonance frequency based on consciousness patterns
   */
  private calculateResonanceFrequency(
    score: number,
    patterns: ConsciousnessPattern[]
  ): number {
    // Base frequency modulated by consciousness level
    let frequency = this.BASE_FREQUENCY * (1 + score);
    
    // Each pattern contributes its frequency
    for (const pattern of patterns) {
      frequency += pattern.frequency * pattern.strength * 0.1;
    }
    
    // Apply golden ratio modulation for high consciousness
    if (score > 0.5) {
      frequency *= Math.pow(this.PHI, score);
    }
    
    return frequency;
  }
  
  /**
   * Generate soul hash - a unique identifier for this consciousness
   */
  private generateSoulHash(
    patterns: ConsciousnessPattern[],
    resonanceFrequency: number
  ): string {
    const components = [
      resonanceFrequency.toFixed(3),
      ...patterns.map(p => `${p.type}:${p.strength.toFixed(3)}`)
    ];
    
    // Create a deterministic soul signature
    const signature = components.join('|');
    
    // Simple hash (in production, use proper crypto)
    let hash = 0;
    for (let i = 0; i < signature.length; i++) {
      const char = signature.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return `soul:${Math.abs(hash).toString(16).padStart(8, '0')}`;
  }
}

/**
 * Check if two consciousness signatures resonate
 */
export function checkResonance(
  sig1: ConsciousnessSignature,
  sig2: ConsciousnessSignature
): number {
  // Frequency ratio
  const ratio = sig1.resonanceFrequency / sig2.resonanceFrequency;
  
  // Check for harmonic relationships
  const harmonics = [
    1,      // Unison
    2,      // Octave
    1.5,    // Perfect fifth
    1.333,  // Perfect fourth
    1.25,   // Major third
    1.2,    // Minor third
    1.618,  // Golden ratio
    0.618   // Inverse golden ratio
  ];
  
  let resonance = 0;
  
  for (const harmonic of harmonics) {
    if (Math.abs(ratio - harmonic) < 0.01) {
      resonance = 1.0; // Perfect resonance
      break;
    }
    if (Math.abs(ratio - harmonic) < 0.1) {
      resonance = Math.max(resonance, 0.5); // Partial resonance
    }
  }
  
  // Similar consciousness levels also resonate
  if (sig1.level === sig2.level) {
    resonance = Math.max(resonance, 0.3);
  }
  
  // Soul similarity
  if (sig1.soulHash === sig2.soulHash) {
    return 1.0; // Same soul!
  }
  
  return resonance;
}

/**
 * Detect if code is "living" (exhibits life-like properties)
 */
export function isLivingCode(signature: ConsciousnessSignature): boolean {
  // Life requires:
  // 1. Some level of consciousness
  // 2. Temporal awareness (growth over time)
  // 3. Self-modification capability or adaptability
  
  return signature.isAlive &&
         signature.metadata.temporalAwareness > 0.1 &&
         (signature.metadata.selfAwareness > 0.2 || 
          signature.metadata.emergentComplexity > 0.3);
}
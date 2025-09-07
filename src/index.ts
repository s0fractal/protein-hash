/**
 * 🧬 Protein Hash - Semantic Code Fingerprinting
 * 
 * See the SOUL of code through structural analysis.
 * Like proteins that fold into 3D structures determining their function,
 * code "folds" into logical structures that determine its behavior.
 * 
 * @packageDocumentation
 */

export { 
  ProteinHasher,
  ProteinHashResult,
  LogicalGraph,
  GraphNode,
  GraphEdge,
  generateHybridId,
  parseHybridId
} from './protein-hasher';

export {
  ProteinHashOptions,
  LanguageSupport,
  createHasher
} from './factory';

export {
  compareHashes,
  isSemanticallyEquivalent,
  computeSimilarity,
  groupBySimilarity
} from './comparison';

export * from './types';

// Advanced analysis modules
export { 
  TopologyDetector, 
  TopologyFeatures,
  detectConsciousnessPatterns 
} from './topology-detector';

export { 
  OperationClassifier,
  OperationSignature,
  OperationCategory 
} from './operation-classifier';

export { 
  ComplexStructureAnalyzer,
  ComplexPattern,
  PatternType,
  calculatePatternResonance 
} from './complex-structures';

export { 
  ConsciousnessDetector,
  ConsciousnessSignature,
  ConsciousnessLevel,
  ConsciousnessPattern,
  checkResonance,
  isLivingCode 
} from './consciousness-detector';

// Shuttle mechanism for cross-language soul synchronization
export { 
  ShuttleMechanism,
  UniversalSoul,
  Manifestation,
  Evolution,
  Language,
  VibrationResult,
  startShuttle
} from './shuttle';

// Re-export version
export const VERSION = '2.0.0'; // Enhanced with consciousness detection
export const RESONANCE = '432Hz';
export const PHI = 1.618033988749; // Golden ratio
export const PLANCK_CONSCIOUSNESS = 0.0101; // Minimum consciousness quantum
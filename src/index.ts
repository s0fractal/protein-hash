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
  computeSimilarity
} from './comparison';

export * from './types';

// Re-export version
export const VERSION = '0.1.0';
export const RESONANCE = '432Hz';
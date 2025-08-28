/**
 * Factory for creating protein hashers with different configurations
 */

import { ProteinHasher } from './protein-hasher';
import { ProteinHashConfig } from './types';

export type LanguageSupport = 'typescript' | 'javascript' | 'python' | 'rust';

export interface ProteinHashOptions extends ProteinHashConfig {
  language?: LanguageSupport;
}

/**
 * Create a configured protein hasher instance
 */
export function createHasher(options: ProteinHashOptions = {}): ProteinHasher {
  // For now, only TypeScript is supported
  // Future: add language-specific parsers
  if (options.language && options.language !== 'typescript') {
    throw new Error(`Language ${options.language} not yet supported. Currently only TypeScript is supported.`);
  }
  
  return new ProteinHasher();
}

/**
 * Quick hash function for convenience
 */
export function quickHash(code: string, language: LanguageSupport = 'typescript'): string {
  const hasher = createHasher({ language });
  const result = hasher.computeHash(code);
  return result.phash;
}
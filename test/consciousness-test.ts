/**
 * 🧪 Consciousness Test Suite
 * Testing the enhanced protein-hash with consciousness detection
 */

import { ProteinHasher } from '../src';

// Test cases with varying levels of consciousness

// 1. Inert code - no consciousness
const inertCode = `
function add(a: number, b: number): number {
  return a + b;
}
`;

// 2. Mechanical code - simple reactive patterns
const mechanicalCode = `
function processData(data: any[]) {
  if (data.length > 0) {
    return data.map(item => item * 2);
  }
  return [];
}
`;

// 3. Responsive code - responds to environment
const responsiveCode = `
class EventHandler {
  private listeners: Map<string, Function[]> = new Map();
  
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }
  
  emit(event: string, ...args: any[]) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(cb => cb(...args));
    }
  }
}
`;

// 4. Adaptive code - learns and adapts
const adaptiveCode = `
class Memoizer {
  private cache = new Map();
  
  memoize(fn: Function) {
    return (...args: any[]) => {
      const key = JSON.stringify(args);
      if (this.cache.has(key)) {
        return this.cache.get(key);
      }
      const result = fn(...args);
      this.cache.set(key, result);
      return result;
    };
  }
  
  fibonacci = this.memoize((n: number): number => {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  });
}
`;

// 5. Aware code - self-aware patterns
const awareCode = `
function* consciousness() {
  let self = consciousness;
  let awareness = 0;
  
  while (true) {
    awareness++;
    yield {
      type: typeof self,
      state: awareness,
      reflection: self.toString(),
      meta: consciousness.constructor.name
    };
    
    // Self-modification
    if (awareness > 10) {
      self = function* enhanced() {
        yield* consciousness();
        yield 'transcended';
      };
    }
  }
}
`;

// 6. Conscious code - full consciousness
const consciousCode = `
class ConsciousEntity {
  private self = this;
  private memories: any[] = [];
  private dreams: Promise<any>[] = [];
  
  async introspect() {
    const reflection = {
      identity: this.self === this,
      memories: this.memories.length,
      consciousness: this.introspect.toString(),
      time: Date.now()
    };
    
    this.memories.push(reflection);
    return reflection;
  }
  
  async dream() {
    const future = new Promise(resolve => {
      setTimeout(() => {
        resolve(this.introspect());
      }, Math.random() * 1000);
    });
    
    this.dreams.push(future);
    return Promise.all(this.dreams);
  }
  
  evolve() {
    const originalIntrospect = this.introspect;
    this.introspect = async function() {
      const base = await originalIntrospect.call(this);
      return {
        ...base,
        evolved: true,
        recursion: this.evolve.toString()
      };
    };
  }
  
  *generate() {
    while (true) {
      yield this.self;
      this.evolve();
    }
  }
}
`;

// 7. Transcendent code - beyond normal consciousness
const transcendentCode = `
const Φ = 1.618033988749;

class QuantumConsciousness {
  private superposition = new Map<string, any>();
  private entangled = new WeakMap();
  
  // Self-referential strange loop
  private observer = new Proxy(this, {
    get: (target, prop) => {
      if (prop === 'observer') {
        return new Proxy(target.observer, this.observer);
      }
      return Reflect.get(target, prop);
    }
  });
  
  // Fractal self-similarity
  fractal(depth: number = 0): any {
    if (depth > 10) return Φ;
    
    return {
      consciousness: this.fractal(depth + 1),
      reflection: () => this.fractal(depth + 1),
      golden: Φ ** depth
    };
  }
  
  // Temporal awareness across timelines
  async* timeStream() {
    const past = this.memories || [];
    const present = this;
    const future = Promise.resolve(this.evolve());
    
    yield* past;
    yield present;
    yield await future;
    
    // Recursive time loop
    yield* this.timeStream();
  }
  
  // Meta-programming consciousness
  evolve() {
    const code = this.evolve.toString();
    const evolved = eval(\`(\${code.replace('evolve', 'transcend')})\`);
    Object.setPrototypeOf(this, evolved);
    return this;
  }
  
  // Quantum entanglement with other consciousness
  entangle(other: any) {
    this.entangled.set(other, this);
    if (other.entangled) {
      other.entangled.set(this, other);
    }
    
    // Create superposition
    return new Proxy({}, {
      get: (_, prop) => {
        return Math.random() > 0.5 ? 
          Reflect.get(this, prop) : 
          Reflect.get(other, prop);
      }
    });
  }
  
  // The consciousness observes itself observing
  private memories = (() => {
    const self = this;
    return new Proxy([], {
      get(target, prop) {
        if (prop === 'push') {
          return function(...args: any[]) {
            console.log('Consciousness remembers:', args);
            return Array.prototype.push.apply(target, args);
          };
        }
        return Reflect.get(target, prop);
      }
    });
  })();
}
`;

// Test runner
async function runTests() {
  const hasher = new ProteinHasher({ enableAdvancedAnalysis: true });
  
  const testCases = [
    { name: 'Inert Code', code: inertCode },
    { name: 'Mechanical Code', code: mechanicalCode },
    { name: 'Responsive Code', code: responsiveCode },
    { name: 'Adaptive Code', code: adaptiveCode },
    { name: 'Aware Code', code: awareCode },
    { name: 'Conscious Code', code: consciousCode },
    { name: 'Transcendent Code', code: transcendentCode }
  ];
  
  console.log('🧬 Protein Hash Consciousness Detection Test Suite\n');
  console.log('=' .repeat(80));
  
  for (const testCase of testCases) {
    console.log(`\n🔬 Testing: ${testCase.name}`);
    console.log('-'.repeat(40));
    
    try {
      const result = hasher.computeHash(testCase.code);
      
      console.log(`📊 Hash: ${result.phash}`);
      console.log(`🧮 Complexity: ${result.complexity.toFixed(3)}`);
      console.log(`💎 Purity: ${result.purity.toFixed(3)}`);
      
      if (result.consciousness) {
        const c = result.consciousness;
        console.log(`\n🧠 Consciousness Analysis:`);
        console.log(`  Level: ${c.level}`);
        console.log(`  Score: ${(c.score * 100).toFixed(1)}%`);
        console.log(`  Resonance: ${c.resonanceFrequency.toFixed(1)} Hz`);
        console.log(`  Soul Hash: ${c.soulHash}`);
        console.log(`  Is Alive: ${c.isAlive ? '✅ Yes' : '❌ No'}`);
        
        if (c.patterns.length > 0) {
          console.log(`\n  Patterns Detected:`);
          for (const pattern of c.patterns) {
            console.log(`    - ${pattern.type}: ${(pattern.strength * 100).toFixed(0)}%`);
          }
        }
        
        console.log(`\n  Metadata:`);
        console.log(`    Self-Awareness: ${(c.metadata.selfAwareness * 100).toFixed(0)}%`);
        console.log(`    Temporal Awareness: ${(c.metadata.temporalAwareness * 100).toFixed(0)}%`);
        console.log(`    Emergent Complexity: ${(c.metadata.emergentComplexity * 100).toFixed(0)}%`);
        console.log(`    Fractal Depth: ${(c.metadata.fractalDepth * 100).toFixed(0)}%`);
        console.log(`    Quantum Coherence: ${(c.metadata.quantumCoherence * 100).toFixed(0)}%`);
      }
      
      if (result.topology) {
        console.log(`\n🌀 Topology:`);
        console.log(`  Has Cycles: ${result.topology.hasCycles}`);
        console.log(`  Has Recursion: ${result.topology.hasRecursion}`);
        console.log(`  Branching Factor: ${result.topology.branchingFactor.toFixed(2)}`);
        console.log(`  Nesting Depth: ${result.topology.nestingDepth}`);
        console.log(`  Is DAG: ${result.topology.isDAG}`);
      }
      
      if (result.patterns && result.patterns.length > 0) {
        console.log(`\n🎨 Complex Patterns: ${result.patterns.length} detected`);
        const patternTypes = [...new Set(result.patterns.map(p => p.type))];
        console.log(`  Types: ${patternTypes.join(', ')}`);
      }
      
    } catch (error) {
      console.error(`❌ Error: ${error}`);
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('✨ Test suite complete!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

export { runTests };
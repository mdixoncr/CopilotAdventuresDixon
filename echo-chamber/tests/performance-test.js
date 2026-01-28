#!/usr/bin/env node

/**
 * Performance Test Suite for Echo Chamber
 * Benchmarks and stress tests
 */

const { SequenceAnalyzer, LargeSequenceProcessor } = require('../lib/sequence-analyzer');
const { BenchmarkRunner } = require('../lib/performance-optimizer');

console.log(`
╔════════════════════════════════════════════════════════════════╗
║  ⏱️ PERFORMANCE TEST SUITE v3.0                              ║
╚════════════════════════════════════════════════════════════════╝
`);

const benchmarker = new BenchmarkRunner();

// ═══════════════════════════════════════════════════════════════════════════
// SEQUENCE DETECTION BENCHMARKS
// ═══════════════════════════════════════════════════════════════════════════

console.log('\n📊 Sequence Detection Benchmarks\n');

const arithmeticSeq = [1, 2, 3, 4, 5];
const geometricSeq = [2, 4, 8, 16, 32];
const polynomialSeq = [1, 4, 9, 16, 25];

benchmarker.run('Arithmetic Detection', () => {
  const analyzer = new SequenceAnalyzer();
  analyzer.detect(arithmeticSeq);
}, 1000);

benchmarker.run('Geometric Detection', () => {
  const analyzer = new SequenceAnalyzer();
  analyzer.detect(geometricSeq);
}, 1000);

benchmarker.run('Polynomial Detection', () => {
  const analyzer = new SequenceAnalyzer();
  analyzer.detect(polynomialSeq);
}, 1000);

// ═══════════════════════════════════════════════════════════════════════════
// PREDICTION BENCHMARKS
// ═══════════════════════════════════════════════════════════════════════════

console.log('\n🎯 Prediction Benchmarks\n');

const analyzer = new SequenceAnalyzer();

benchmarker.run('5-Step Prediction', () => {
  analyzer.predict(arithmeticSeq, 5);
}, 1000);

benchmarker.run('20-Step Prediction', () => {
  analyzer.predict(arithmeticSeq, 20);
}, 1000);

// ═══════════════════════════════════════════════════════════════════════════
// LARGE SEQUENCE BENCHMARKS
// ═══════════════════════════════════════════════════════════════════════════

console.log('\n📦 Large Sequence Benchmarks\n');

const largeSeq = Array.from({ length: 10000 }, (_, i) => i + 1);

benchmarker.run('Large Sequence Detection (10K)', () => {
  const analyzer = new SequenceAnalyzer();
  analyzer.detect(largeSeq);
}, 10);

benchmarker.run('Downsampling (10K -> 1K)', () => {
  LargeSequenceProcessor.downsample(largeSeq, 10);
}, 100);

benchmarker.run('Validation', () => {
  LargeSequenceProcessor.validate(largeSeq);
}, 100);

// ═══════════════════════════════════════════════════════════════════════════
// COMPARISON BENCHMARKS
// ═══════════════════════════════════════════════════════════════════════════

console.log('\n⚔️ Comparison Benchmarks\n');

const directAnalysis = () => {
  const analyzer = new SequenceAnalyzer();
  analyzer.detect([1, 2, 3, 4, 5]);
};

const cachedAnalysis = () => {
  const analyzer = new SequenceAnalyzer();
  analyzer.detect([1, 2, 3, 4, 5]);
};

const comparison = benchmarker.compare(
  'Direct Analysis',
  directAnalysis,
  'Repeated Analysis',
  cachedAnalysis,
  1000
);

console.log(`\n  🏆 Winner: ${comparison.winner}`);
console.log(`  📈 Improvement: ${comparison.improvement}\n`);

// ═══════════════════════════════════════════════════════════════════════════
// RESULTS
// ═══════════════════════════════════════════════════════════════════════════

console.log(`
╔════════════════════════════════════════════════════════════════╗
║  📋 FINAL RESULTS                                              ║
╚════════════════════════════════════════════════════════════════╝
`);

benchmarker.getResults().forEach((result, index) => {
  console.log(`\n${index + 1}. ${result.name}`);
  console.log(`   Iterations: ${result.iterations}`);
  console.log(`   Average:    ${result.average}`);
  console.log(`   Min:        ${result.min}`);
  console.log(`   Max:        ${result.max}`);
  console.log(`   P95:        ${result.p95}`);
  console.log(`   P99:        ${result.p99}`);
});

console.log(`
╔════════════════════════════════════════════════════════════════╗
║  ✓ Performance testing completed                              ║
╚════════════════════════════════════════════════════════════════╝
`);

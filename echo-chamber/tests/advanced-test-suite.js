/**
 * Advanced Test Suite for Echo Chamber
 * Comprehensive testing with edge cases and advanced patterns
 * 
 * @author Echo Chamber Team
 * @version 3.0.0
 */

const {
  SequenceAnalyzer,
  ArithmeticPattern,
  GeometricPattern,
  PolynomialPattern
} = require('../lib/sequence-analyzer');

const HistoricalAnalyzer = require('../lib/historical-analyzer');
const {
  CacheManager,
  PerformanceAnalyzer,
  LargeSequenceProcessor,
  BenchmarkRunner
} = require('../lib/performance-optimizer');

// Color codes for output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

let testsPassed = 0;
let testsFailed = 0;

/**
 * Test result printer
 */
function assert(condition, message) {
  if (condition) {
    testsPassed++;
    console.log(`${colors.green}✓${colors.reset} ${message}`);
  } else {
    testsFailed++;
    console.log(`${colors.red}✗${colors.reset} ${message}`);
  }
}

function testSection(title) {
  console.log(`\n${colors.cyan}${colors.bright}═══════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}${title}${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════${colors.reset}\n`);
}

// ═══════════════════════════════════════════════════════════════════════════
// ARITHMETIC PATTERN TESTS
// ═══════════════════════════════════════════════════════════════════════════

testSection('📊 ARITHMETIC PATTERN TESTS');

const arithmeticTests = [
  { name: 'Simple AP: 2,5,8,11', sequence: [2, 5, 8, 11], expected: 14 },
  { name: 'Negative AP: 10,5,0,-5', sequence: [10, 5, 0, -5], expected: -10 },
  { name: 'Decimal AP: 0.5,1.0,1.5,2.0', sequence: [0.5, 1.0, 1.5, 2.0], expected: 2.5 },
  { name: 'Large AP: 100,200,300,400', sequence: [100, 200, 300, 400], expected: 500 },
  { name: 'Single difference: 1,2', sequence: [1, 2], expected: 3 }
];

arithmeticTests.forEach(test => {
  const pattern = new ArithmeticPattern(test.sequence);
  const next = pattern.getNextValue();
  assert(
    Math.abs(next - test.expected) < 1e-10,
    `${test.name}: got ${next}, expected ${test.expected}`
  );
});

// ═══════════════════════════════════════════════════════════════════════════
// GEOMETRIC PATTERN TESTS
// ═══════════════════════════════════════════════════════════════════════════

testSection('📈 GEOMETRIC PATTERN TESTS');

const geometricTests = [
  { name: 'Simple GP: 2,6,18,54', sequence: [2, 6, 18, 54], expected: 162 },
  { name: 'Decimal GP: 1,0.5,0.25,0.125', sequence: [1, 0.5, 0.25, 0.125], expected: 0.0625 },
  { name: 'Negative GP: 1,-2,4,-8', sequence: [1, -2, 4, -8], expected: 16 },
  { name: 'Powers of 10: 1,10,100,1000', sequence: [1, 10, 100, 1000], expected: 10000 }
];

geometricTests.forEach(test => {
  const pattern = new GeometricPattern(test.sequence);
  const next = pattern.getNextValue();
  assert(
    Math.abs(next - test.expected) < 1e-10,
    `${test.name}: got ${next}, expected ${test.expected}`
  );
});

// ═══════════════════════════════════════════════════════════════════════════
// POLYNOMIAL PATTERN TESTS
// ═══════════════════════════════════════════════════════════════════════════

testSection('🔢 POLYNOMIAL PATTERN TESTS');

const polynomialTests = [
  { name: 'Quadratic: 1,4,9,16', sequence: [1, 4, 9, 16], expected: 25, degree: 2 },
  { name: 'Cubic: 1,8,27,64', sequence: [1, 8, 27, 64], expected: 125, degree: 3 },
  { name: 'Simple quadratic: 0,1,4,9', sequence: [0, 1, 4, 9], expected: 16, degree: 2 }
];

polynomialTests.forEach(test => {
  const pattern = new PolynomialPattern(test.sequence, test.degree);
  const next = pattern.getNextValue();
  assert(
    Math.abs(next - test.expected) < 1e-10,
    `${test.name}: got ${next}, expected ${test.expected}`
  );
});

// ═══════════════════════════════════════════════════════════════════════════
// SEQUENCE ANALYZER TESTS
// ═══════════════════════════════════════════════════════════════════════════

testSection('🔍 SEQUENCE ANALYZER TESTS');

const analyzer = new SequenceAnalyzer();

const analyzerTests = [
  { sequence: [3, 6, 9, 12], expectedPattern: 'Arithmetic Progression' },
  { sequence: [2, 4, 8, 16], expectedPattern: 'Geometric Progression' },
  { sequence: [1, 4, 9, 16, 25], expectedPattern: 'Polynomial' }
];

analyzerTests.forEach(test => {
  const result = analyzer.detect(test.sequence);
  assert(
    result.name.includes(test.expectedPattern) || result.type.includes(test.expectedPattern.toLowerCase()),
    `Detected ${result.name} for ${test.sequence}`
  );
});

// ═══════════════════════════════════════════════════════════════════════════
// MULTI-STEP PREDICTION TESTS
// ═══════════════════════════════════════════════════════════════════════════

testSection('🎯 MULTI-STEP PREDICTION TESTS');

const apPattern = new ArithmeticPattern([2, 5, 8, 11]);
const predictions = apPattern.predict(3);
assert(predictions.length === 3, 'AP: 3-step prediction returns 3 values');
assert(Math.abs(predictions[0] - 14) < 1e-10, 'AP: First prediction is 14');
assert(Math.abs(predictions[2] - 20) < 1e-10, 'AP: Third prediction is 20');

// ═══════════════════════════════════════════════════════════════════════════
// CACHE MANAGER TESTS
// ═══════════════════════════════════════════════════════════════════════════

testSection('⚡ CACHE MANAGER TESTS');

const cache = new CacheManager(5);
const sequence1 = [1, 2, 3, 4];
const result1 = { value: 5 };

cache.set(sequence1, result1);
const retrieved = cache.get(sequence1);

assert(retrieved === result1, 'Cache: Successfully stores and retrieves data');
assert(cache.hits === 1, 'Cache: Hit counter incremented');

const notCached = cache.get([9, 9, 9]);
assert(notCached === null, 'Cache: Returns null for missing items');
assert(cache.misses === 1, 'Cache: Miss counter incremented');

// ═══════════════════════════════════════════════════════════════════════════
// PERFORMANCE ANALYZER TESTS
// ═══════════════════════════════════════════════════════════════════════════

testSection('⏱️ PERFORMANCE ANALYZER TESTS');

const perfAnalyzer = new PerformanceAnalyzer();

const testFunction = () => {
  let sum = 0;
  for (let i = 0; i < 1000; i++) {
    sum += i;
  }
  return sum;
};

const { duration } = perfAnalyzer.measureExecution(testFunction);
assert(duration > 0, `Performance: Execution time measured: ${duration.toFixed(3)}ms`);

const stats = perfAnalyzer.getStatistics();
assert(stats.totalMeasurements === 1, 'Performance: Metrics recorded correctly');

// ═══════════════════════════════════════════════════════════════════════════
// LARGE SEQUENCE PROCESSOR TESTS
// ═══════════════════════════════════════════════════════════════════════════

testSection('📦 LARGE SEQUENCE PROCESSOR TESTS');

const largeSeq = Array.from({ length: 20000 }, (_, i) => i + 1);
assert(
  LargeSequenceProcessor.isLarge(largeSeq, 10000),
  'LSP: Correctly identifies large sequence'
);

const downsampled = LargeSequenceProcessor.downsample([1, 2, 3, 4, 5, 6], 2);
assert(downsampled.length === 3, 'LSP: Downsampling reduces size correctly');
assert(downsampled[0] === 1 && downsampled[2] === 5, 'LSP: Downsampling preserves values');

const validation = LargeSequenceProcessor.validate([1, 2, 3, 4, 5]);
assert(validation.valid === true, 'LSP: Valid sequence passes validation');

// ═══════════════════════════════════════════════════════════════════════════
// HISTORICAL ANALYZER TESTS
// ═══════════════════════════════════════════════════════════════════════════

testSection('📚 HISTORICAL ANALYZER TESTS');

const historyPath = './data/test-history.json';
const history = new HistoricalAnalyzer(historyPath);

const record1 = {
  sequence: [1, 2, 3, 4],
  pattern: 'Arithmetic Progression',
  predictions: [5],
  confidence: 0.95
};

history.addRecord(record1);
assert(history.records.length === 1, 'History: Record added successfully');

const stats2 = history.getStatistics();
assert(stats2.totalSequences === 1, 'History: Statistics updated correctly');

history.addRecord({
  sequence: [2, 4, 8, 16],
  pattern: 'Geometric Progression',
  predictions: [32],
  confidence: 0.98
});

const patternStats = history.getByPattern('Arithmetic Progression');
assert(patternStats.length === 1, 'History: Can filter by pattern');

// ═══════════════════════════════════════════════════════════════════════════
// EDGE CASE TESTS
// ═══════════════════════════════════════════════════════════════════════════

testSection('⚠️ EDGE CASE TESTS');

// Negative numbers
const negativeAP = new ArithmeticPattern([-5, -3, -1, 1]);
assert(negativeAP.confidence === 1.0, 'Edge: Handles negative numbers');

// Very small decimals
const smallDecimals = new GeometricPattern([0.001, 0.0001, 0.00001]);
assert(smallDecimals.confidence === 1.0, 'Edge: Handles small decimals');

// Mixed signs
const mixedSigns = new GeometricPattern([1, -2, 4, -8]);
assert(mixedSigns.confidence === 1.0, 'Edge: Handles mixed positive/negative');

// ═══════════════════════════════════════════════════════════════════════════
// ACCURACY METRICS TESTS
// ═══════════════════════════════════════════════════════════════════════════

testSection('📊 ACCURACY METRICS TESTS');

history.clearHistory();
const testSequences = [
  { seq: [1, 2, 3, 4], pattern: 'Arithmetic Progression', conf: 1.0 },
  { seq: [2, 4, 8, 16], pattern: 'Geometric Progression', conf: 1.0 },
  { seq: [1, 4, 9, 16], pattern: 'Polynomial (Degree 2)', conf: 1.0 }
];

testSequences.forEach(({ seq, pattern, conf }) => {
  history.addRecord({ sequence: seq, pattern, predictions: [], confidence: conf });
});

const accuracy = history.getAccuracyMetrics();
assert(Object.keys(accuracy).length === 3, 'Accuracy: All patterns recorded');

const trends = history.getTrendAnalysis(10);
assert(trends.patterns, 'Trends: Successfully calculated');

// ═══════════════════════════════════════════════════════════════════════════
// ERROR HANDLING TESTS
// ═══════════════════════════════════════════════════════════════════════════

testSection('🛡️ ERROR HANDLING TESTS');

try {
  analyzer.detect([5]); // Only one element
  assert(false, 'Error: Should throw for single element');
} catch (error) {
  assert(true, 'Error: Correctly throws for insufficient data');
}

try {
  const pattern = new ArithmeticPattern();
  pattern.predict(1);
  assert(false, 'Error: Should throw for unanalyzed pattern');
} catch (error) {
  assert(true, 'Error: Correctly throws for unanalyzed pattern');
}

// ═══════════════════════════════════════════════════════════════════════════
// BENCHMARK TESTS
// ═══════════════════════════════════════════════════════════════════════════

testSection('🏃 BENCHMARK TESTS');

const benchmarker = new BenchmarkRunner();

const arithBench = benchmarker.run('Arithmetic Detection', () => {
  new ArithmeticPattern([1, 2, 3, 4, 5]);
}, 100);

assert(arithBench.average, `Benchmark: Arithmetic detection: ${arithBench.average}`);

const geomBench = benchmarker.run('Geometric Detection', () => {
  new GeometricPattern([1, 2, 4, 8, 16]);
}, 100);

assert(geomBench.average, `Benchmark: Geometric detection: ${geomBench.average}`);

// ═══════════════════════════════════════════════════════════════════════════
// FINAL REPORT
// ═══════════════════════════════════════════════════════════════════════════

console.log(`\n${colors.cyan}${colors.bright}═══════════════════════════════${colors.reset}`);
console.log(`${colors.cyan}📋 TEST SUMMARY${colors.reset}`);
console.log(`${colors.cyan}═══════════════════════════════${colors.reset}\n`);

const total = testsPassed + testsFailed;
const percentage = (testsPassed / total * 100).toFixed(1);

console.log(`${colors.bright}Total Tests: ${colors.reset}${total}`);
console.log(`${colors.green}${colors.bright}Passed: ${colors.reset}${testsPassed}`);
console.log(`${colors.red}${colors.bright}Failed: ${colors.reset}${testsFailed}`);
console.log(`${colors.yellow}${colors.bright}Success Rate: ${colors.reset}${percentage}%`);

if (testsFailed === 0) {
  console.log(`\n${colors.green}${colors.bright}✓ ALL TESTS PASSED!${colors.reset}\n`);
} else {
  console.log(`\n${colors.red}${colors.bright}✗ SOME TESTS FAILED${colors.reset}\n`);
  process.exit(1);
}

// Cleanup
try {
  require('fs').unlinkSync(historyPath);
} catch (e) {
  // File cleanup optional
}

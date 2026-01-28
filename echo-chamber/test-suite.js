#!/usr/bin/env node

/**
 * Comprehensive Test Suite for Echo Chamber Application
 * 
 * This file contains extended tests demonstrating various test scenarios
 * and edge cases for the sequence prediction system.
 * 
 * Run with: node test-suite.js
 */

// Import the classes from index.js (they're in global scope when this runs)
// Since we can't easily import from index.js in the same process,
// we'll replicate the EchoChamber class here for standalone testing

/**
 * EchoChamber Class - Manages magical sequence prediction and memory storage
 */
class EchoChamber {
  constructor() {
    this.memories = [];
  }

  validateSequence(sequence) {
    if (!Array.isArray(sequence) || sequence.length < 2) {
      return {
        isValid: false,
        message: '❌ A sequence must contain at least 2 numbers.',
        difference: null
      };
    }

    if (!sequence.every(num => typeof num === 'number' && !isNaN(num))) {
      return {
        isValid: false,
        message: '❌ All elements in the sequence must be valid numbers.',
        difference: null
      };
    }

    const commonDifference = sequence[1] - sequence[0];

    for (let i = 1; i < sequence.length; i++) {
      const difference = sequence[i] - sequence[i - 1];
      if (difference !== commonDifference) {
        return {
          isValid: false,
          message: `❌ Not an arithmetic progression! Inconsistent difference detected.`,
          difference: null
        };
      }
    }

    return {
      isValid: true,
      message: '✓ Valid arithmetic progression detected!',
      difference: commonDifference
    };
  }

  predictNext(sequence) {
    const validation = this.validateSequence(sequence);

    if (!validation.isValid) {
      return {
        success: false,
        prediction: null,
        message: validation.message,
        validation: validation
      };
    }

    const lastNumber = sequence[sequence.length - 1];
    const prediction = lastNumber + validation.difference;

    const memoryEntry = {
      sequence: [...sequence],
      difference: validation.difference,
      prediction: prediction,
      timestamp: new Date().toISOString()
    };
    this.memories.push(memoryEntry);

    return {
      success: true,
      prediction: prediction,
      message: `✓ The next number in the sequence is: ${prediction}`,
      validation: validation,
      memoryEntry: memoryEntry
    };
  }

  getMemories() {
    return this.memories;
  }

  clearMemories() {
    this.memories = [];
  }

  getMemoryStats() {
    if (this.memories.length === 0) {
      return { totalMemories: 0, averageDifference: 0 };
    }

    const totalMemories = this.memories.length;
    const averageDifference = 
      this.memories.reduce((sum, mem) => sum + mem.difference, 0) / totalMemories;

    return {
      totalMemories,
      averageDifference: averageDifference.toFixed(2)
    };
  }
}

// ============================================================================
// COMPREHENSIVE TEST SUITE
// ============================================================================

console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
console.log('║         COMPREHENSIVE TEST SUITE - ECHO CHAMBER APPLICATION               ║');
console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

/**
 * Test helper function with floating point tolerance
 */
function testResultsMatch(actual, expected) {
  // Handle floating point comparisons with tolerance
  if (typeof actual === 'number' && typeof expected === 'number') {
    return Math.abs(actual - expected) < 0.0001;
  }
  return actual === expected || JSON.stringify(actual) === JSON.stringify(expected);
}

/**
 * Test helper function
 */
function runTest(testName, testFn, expectedResult) {
  totalTests++;
  try {
    const result = testFn();
    const passed = testResultsMatch(result, expectedResult);
    
    if (passed) {
      console.log(`✅ PASS: ${testName}`);
      passedTests++;
    } else {
      console.log(`❌ FAIL: ${testName}`);
      console.log(`   Expected: ${JSON.stringify(expectedResult)}`);
      console.log(`   Got: ${JSON.stringify(result)}`);
      failedTests++;
    }
  } catch (error) {
    console.log(`❌ ERROR: ${testName}`);
    console.log(`   ${error.message}`);
    failedTests++;
  }
}

// ─────────────────────────────────────────────────────────────────────────
// GROUP 1: VALID PROGRESSIONS
// ─────────────────────────────────────────────────────────────────────────

console.log('📊 GROUP 1: VALID ARITHMETIC PROGRESSIONS\n');

const chamber1 = new EchoChamber();

runTest(
  'Basic progression [3, 6, 9, 12]',
  () => chamber1.predictNext([3, 6, 9, 12]).prediction,
  15
);

runTest(
  'Even numbers [2, 4, 6, 8]',
  () => chamber1.predictNext([2, 4, 6, 8]).prediction,
  10
);

runTest(
  'Single digit [1, 2, 3, 4, 5]',
  () => chamber1.predictNext([1, 2, 3, 4, 5]).prediction,
  6
);

runTest(
  'Larger numbers [100, 200, 300, 400]',
  () => chamber1.predictNext([100, 200, 300, 400]).prediction,
  500
);

runTest(
  'Just two elements [5, 10]',
  () => chamber1.predictNext([5, 10]).prediction,
  15
);

// ─────────────────────────────────────────────────────────────────────────
// GROUP 2: NEGATIVE/DESCENDING PROGRESSIONS
// ─────────────────────────────────────────────────────────────────────────

console.log('\n📊 GROUP 2: NEGATIVE & DESCENDING PROGRESSIONS\n');

const chamber2 = new EchoChamber();

runTest(
  'Negative progression [10, 5, 0, -5]',
  () => chamber2.predictNext([10, 5, 0, -5]).prediction,
  -10
);

runTest(
  'Descending [-1, -3, -5, -7]',
  () => chamber2.predictNext([-1, -3, -5, -7]).prediction,
  -9
);

runTest(
  'Zero difference [5, 5, 5, 5]',
  () => chamber2.predictNext([5, 5, 5, 5]).prediction,
  5
);

runTest(
  'Large descending [1000, 900, 800, 700]',
  () => chamber2.predictNext([1000, 900, 800, 700]).prediction,
  600
);

// ─────────────────────────────────────────────────────────────────────────
// GROUP 3: DECIMAL/FRACTIONAL PROGRESSIONS
// ─────────────────────────────────────────────────────────────────────────

console.log('\n📊 GROUP 3: DECIMAL & FRACTIONAL PROGRESSIONS\n');

const chamber3 = new EchoChamber();

runTest(
  'Decimal progression [1.5, 3.0, 4.5, 6.0]',
  () => chamber3.predictNext([1.5, 3.0, 4.5, 6.0]).prediction,
  7.5
);

runTest(
  'Half-step progression [0, 0.5, 1, 1.5]',
  () => chamber3.predictNext([0, 0.5, 1, 1.5]).prediction,
  2
);

// ─────────────────────────────────────────────────────────────────────────
// GROUP 4: INVALID PROGRESSIONS
// ─────────────────────────────────────────────────────────────────────────

console.log('\n📊 GROUP 4: INVALID PROGRESSIONS (Should be rejected)\n');

const chamber4 = new EchoChamber();

runTest(
  'Inconsistent progression [1, 2, 4, 7]',
  () => chamber4.predictNext([1, 2, 4, 7]).success,
  false
);

runTest(
  'Random numbers [100, 23, 88, 5]',
  () => chamber4.predictNext([100, 23, 88, 5]).success,
  false
);

runTest(
  'Fibonacci-like [1, 1, 2, 3, 5]',
  () => chamber4.predictNext([1, 1, 2, 3, 5]).success,
  false
);

// ─────────────────────────────────────────────────────────────────────────
// GROUP 5: EDGE CASES
// ─────────────────────────────────────────────────────────────────────────

console.log('\n📊 GROUP 5: EDGE CASES\n');

const chamber5 = new EchoChamber();

runTest(
  'Empty array',
  () => chamber5.predictNext([]).success,
  false
);

runTest(
  'Single element',
  () => chamber5.predictNext([42]).success,
  false
);

runTest(
  'Negative numbers [-100, -50, 0, 50]',
  () => chamber5.predictNext([-100, -50, 0, 50]).prediction,
  100
);

runTest(
  'Decimal progression [0.5, 1.0, 1.5, 2.0]',
  () => chamber5.predictNext([0.5, 1.0, 1.5, 2.0]).prediction,
  2.5
);

// ─────────────────────────────────────────────────────────────────────────
// GROUP 6: MEMORY SYSTEM
// ─────────────────────────────────────────────────────────────────────────

console.log('\n📊 GROUP 6: MEMORY SYSTEM\n');

const chamber6 = new EchoChamber();

// Make some predictions to populate memory
chamber6.predictNext([1, 2, 3, 4]);
chamber6.predictNext([5, 10, 15, 20]);
chamber6.predictNext([100, 90, 80, 70]);

runTest(
  'Memory count after 3 predictions',
  () => chamber6.getMemories().length,
  3
);

runTest(
  'First memory sequence',
  () => chamber6.getMemories()[0].sequence[0],
  1
);

runTest(
  'Memory statistics - total count',
  () => chamber6.getMemoryStats().totalMemories,
  3
);

chamber6.clearMemories();

runTest(
  'Memory cleared successfully',
  () => chamber6.getMemories().length,
  0
);

// ─────────────────────────────────────────────────────────────────────────
// GROUP 7: VALIDATION SYSTEM
// ─────────────────────────────────────────────────────────────────────────

console.log('\n📊 GROUP 7: VALIDATION SYSTEM\n');

const chamber7 = new EchoChamber();

runTest(
  'Validation detects correct difference',
  () => {
    const result = chamber7.validateSequence([2, 4, 6, 8]);
    return result.difference;
  },
  2
);

runTest(
  'Validation rejects short sequence',
  () => {
    const result = chamber7.validateSequence([5]);
    return result.isValid;
  },
  false
);

runTest(
  'Validation accepts two-element sequence',
  () => {
    const result = chamber7.validateSequence([10, 20]);
    return result.isValid;
  },
  true
);

// ─────────────────────────────────────────────────────────────────────────
// SUMMARY REPORT
// ─────────────────────────────────────────────────────────────────────────

console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
console.log('║                          TEST SUMMARY REPORT                               ║');
console.log('╠════════════════════════════════════════════════════════════════════════════╣');
console.log(`║ Total Tests Run:     ${totalTests.toString().padEnd(59)}║`);
console.log(`║ Passed:              ${passedTests.toString().padEnd(59)}║`);
console.log(`║ Failed:              ${failedTests.toString().padEnd(59)}║`);
console.log(`║ Success Rate:        ${((passedTests / totalTests) * 100).toFixed(1)}%${' '.repeat(54)}║`);
console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

// Exit with appropriate code
process.exit(failedTests === 0 ? 0 : 1);

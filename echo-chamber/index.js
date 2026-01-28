#!/usr/bin/env node

/**
 * Echo Chamber Application - Magical Number Sequence Prediction Puzzle
 * 
 * This application simulates an enchanted Echo Room where numerical sequences
 * echo and repeat in patterns. The challenge is to predict the next number in
 * an arithmetic progression sequence using the ancient art of pattern recognition.
 * 
 * The app stores "memories" of previous echoes and learns from patterns,
 * allowing users to test multiple sequences and verify their correctness.
 */

const readline = require('readline');

// ============================================================================
// CORE SEQUENCE PREDICTOR MODULE
// ============================================================================

/**
 * EchoChamber Class - Manages magical sequence prediction and memory storage
 * 
 * Responsibilities:
 * - Predict next number in arithmetic progression
 * - Validate sequences
 * - Store memories of previous predictions
 */
class EchoChamber {
  constructor() {
    /**
     * Memories: Array storing all previous echo sequences and predictions
     * Each memory entry contains:
     * - sequence: original number sequence
     * - difference: the common difference (d)
     * - prediction: predicted next number
     * - timestamp: when the echo was recorded
     */
    this.memories = [];
  }

  /**
   * Validates if a sequence forms a valid arithmetic progression
   * An arithmetic progression has a constant difference between consecutive terms
   * 
   * @param {number[]} sequence - The number sequence to validate
   * @returns {object} - { isValid: boolean, message: string, difference: number|null }
   */
  validateSequence(sequence) {
    // Edge case: sequences must have at least 2 numbers
    if (!Array.isArray(sequence) || sequence.length < 2) {
      return {
        isValid: false,
        message: '❌ A sequence must contain at least 2 numbers.',
        difference: null
      };
    }

    // Edge case: check if all elements are numbers
    if (!sequence.every(num => typeof num === 'number' && !isNaN(num))) {
      return {
        isValid: false,
        message: '❌ All elements in the sequence must be valid numbers.',
        difference: null
      };
    }

    // Calculate the common difference between first two numbers
    const commonDifference = sequence[1] - sequence[0];

    // Verify that ALL consecutive pairs have the same difference
    for (let i = 1; i < sequence.length; i++) {
      const difference = sequence[i] - sequence[i - 1];
      if (difference !== commonDifference) {
        return {
          isValid: false,
          message: `❌ Not an arithmetic progression! Inconsistent difference detected between ${sequence[i - 1]} and ${sequence[i]}.`,
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

  /**
   * Predicts the next number in an arithmetic sequence
   * Formula: next_number = last_number + common_difference
   * 
   * @param {number[]} sequence - The number sequence
   * @returns {object} - { success: boolean, prediction: number|null, message: string }
   */
  predictNext(sequence) {
    // First, validate the sequence
    const validation = this.validateSequence(sequence);

    if (!validation.isValid) {
      return {
        success: false,
        prediction: null,
        message: validation.message,
        validation: validation
      };
    }

    // Calculate prediction: last number + common difference
    const lastNumber = sequence[sequence.length - 1];
    const prediction = lastNumber + validation.difference;

    // Record this echo in our memories
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

  /**
   * Retrieves all stored memories of previous echoes
   * 
   * @returns {object[]} - Array of memory entries
   */
  getMemories() {
    return this.memories;
  }

  /**
   * Clears all stored memories
   */
  clearMemories() {
    this.memories = [];
  }

  /**
   * Gets statistics about stored memories
   * 
   * @returns {object} - Statistics including count and averages
   */
  getMemoryStats() {
    if (this.memories.length === 0) {
      return { totalMemories: 0, averageDifference: 0, message: 'No memories recorded yet.' };
    }

    const totalMemories = this.memories.length;
    const averageDifference = 
      this.memories.reduce((sum, mem) => sum + mem.difference, 0) / totalMemories;

    return {
      totalMemories,
      averageDifference: averageDifference.toFixed(2),
      message: `The Echo Room holds ${totalMemories} memories with an average difference of ${averageDifference.toFixed(2)}.`
    };
  }
}

// ============================================================================
// USER INTERFACE MODULE
// ============================================================================

/**
 * EchoChamberUI Class - Handles user interaction and console display
 * 
 * Responsibilities:
 * - Display story and instructions
 * - Handle user input
 * - Format and display results
 */
class EchoChamberUI {
  constructor() {
    this.chamber = new EchoChamber();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  /**
   * Displays the introductory story and sets the scene
   */
  displayWelcome() {
    console.clear();
    console.log('\n╔══════════════════════════════════════════════════════════════════════════╗');
    console.log('║                                                                          ║');
    console.log('║              🏰 WELCOME TO THE ECHO CHAMBER OF NUMERIA 🏰              ║');
    console.log('║                                                                          ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════╝\n');

    console.log('📖 STORY:\n');
    console.log('Deep within the ancient library of Numeria lies the mystical Echo Chamber,');
    console.log('a room where magical numbers dance in perfect patterns. Legend says that');
    console.log('within these walls, every number echoes according to an ancient law:\n');
    console.log('  "Each echo differs from the last by the same mystical amount."\n');
    console.log('As the Chamber\'s newest apprentice, you must master the art of prediction');
    console.log('and discover what the next echo will be!\n');

    console.log('─'.repeat(76) + '\n');
    console.log('🎯 YOUR QUEST:\n');
    console.log('1. Enter sequences of numbers separated by commas (e.g., "3,6,9,12")');
    console.log('2. The chamber will validate if they follow the magical pattern');
    console.log('3. If valid, predict what the next number will be');
    console.log('4. Build your library of "memories" - the Echo Room remembers all!\n');

    console.log('─'.repeat(76) + '\n');
  }

  /**
   * Parses user input string into a number array
   * 
   * @param {string} input - User input string
   * @returns {number[]} - Parsed numbers
   */
  parseSequenceInput(input) {
    return input.split(',').map(num => {
      const parsed = parseFloat(num.trim());
      return isNaN(parsed) ? null : parsed;
    }).filter(num => num !== null);
  }

  /**
   * Displays detailed results of a prediction
   * 
   * @param {object} result - Result object from predictNext()
   */
  displayPredictionResult(result) {
    console.log('\n✨ The Echo Chamber responds:\n');

    if (result.success) {
      const { sequence, difference, prediction } = result.memoryEntry;
      
      console.log(`   Original sequence:    [${sequence.join(', ')}]`);
      console.log(`   Common difference:    ${difference}`);
      console.log(`   Next echo predicted:  ${prediction}`);
      console.log(`   Formula applied:      ${sequence[sequence.length - 1]} + ${difference} = ${prediction}\n`);
      
      console.log(`   📜 ${result.message}\n`);
    } else {
      console.log(`   ${result.message}\n`);
    }
  }

  /**
   * Displays the memory archive
   */
  displayMemories() {
    const memories = this.chamber.getMemories();

    console.log('\n📚 MEMORY ARCHIVE:\n');

    if (memories.length === 0) {
      console.log('   The Echo Chamber\'s memory is empty. Make predictions to build memories!\n');
      return;
    }

    memories.forEach((memory, index) => {
      const timestamp = new Date(memory.timestamp).toLocaleTimeString();
      console.log(`   Memory #${index + 1} (${timestamp}):`);
      console.log(`     Sequence: [${memory.sequence.join(', ')}] → ${memory.prediction}`);
      console.log(`     Pattern:  +${memory.difference} each echo\n`);
    });

    const stats = this.chamber.getMemoryStats();
    console.log(`   ${stats.message}\n`);
  }

  /**
   * Displays the main menu options
   */
  displayMenu() {
    console.log('╔══════════════════════════════════════════════════════════════════════════╗');
    console.log('║                           ECHO CHAMBER MENU                              ║');
    console.log('╠══════════════════════════════════════════════════════════════════════════╣');
    console.log('║ [1] Enter a sequence to predict                                          ║');
    console.log('║ [2] View memory archive                                                  ║');
    console.log('║ [3] Clear all memories                                                   ║');
    console.log('║ [4] Run demonstration                                                    ║');
    console.log('║ [5] Exit the Echo Chamber                                                ║');
    console.log('╚══════════════════════════════════════════════════════════════════════════╝\n');
  }

  /**
   * Runs an interactive demonstration with pre-configured sequences
   */
  runDemonstration() {
    console.log('\n🎬 ECHO CHAMBER DEMONSTRATION:\n');
    console.log('Testing the chamber with magical sequences...\n');

    const testSequences = [
      { input: [3, 6, 9, 12], name: 'The Beginner\'s Echo' },
      { input: [2, 4, 6, 8, 10], name: 'The Arithmancer\'s Path' },
      { input: [5, 10, 15, 20], name: 'The Fivefold Echo' },
      { input: [10, 20, 30], name: 'The Tenfold Resonance' },
      { input: [1, 1, 1, 1], name: 'The Silent Echo' },
      { input: [100, 90, 80, 70], name: 'The Descending Spiral' }
    ];

    testSequences.forEach((test, index) => {
      console.log(`\n─ Test ${index + 1}: ${test.name}`);
      console.log(`  Input: [${test.input.join(', ')}]`);

      const result = this.chamber.predictNext(test.input);

      if (result.success) {
        console.log(`  ✓ Predicted next: ${result.prediction}`);
        console.log(`  📊 Pattern: +${result.validation.difference}`);
      } else {
        console.log(`  ⚠ ${result.message}`);
      }
    });

    console.log('\n' + '─'.repeat(76) + '\n');
    console.log('Demonstration complete! The Echo Chamber has recorded these memories.\n');
  }

  /**
   * Main interactive loop - prompts user for input and processes commands
   */
  async start() {
    this.displayWelcome();

    let running = true;

    while (running) {
      this.displayMenu();

      const choice = await this.promptUser('Enter your choice (1-5): ');

      switch (choice.trim()) {
        case '1':
          await this.handleSequenceInput();
          break;

        case '2':
          this.displayMemories();
          break;

        case '3':
          this.chamber.clearMemories();
          console.log('\n🌪️ All memories have been swept away by the winds of the chamber!\n');
          break;

        case '4':
          this.runDemonstration();
          break;

        case '5':
          running = false;
          console.log('\n👋 The Echo Chamber fades as you step into the sunlight...\n');
          break;

        default:
          console.log('\n❌ Invalid choice. Please enter 1-5.\n');
      }
    }

    this.rl.close();
  }

  /**
   * Handles user input for sequence prediction
   */
  async handleSequenceInput() {
    const input = await this.promptUser('\n📝 Enter sequence (comma-separated numbers, e.g., "3,6,9,12"): ');

    const sequence = this.parseSequenceInput(input);

    if (sequence.length === 0) {
      console.log('\n❌ No valid numbers detected. Please try again.\n');
      return;
    }

    const result = this.chamber.predictNext(sequence);
    this.displayPredictionResult(result);
  }

  /**
   * Utility function to prompt user and get input
   * 
   * @param {string} question - The prompt question
   * @returns {Promise<string>} - User input
   */
  promptUser(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }
}

// ============================================================================
// TESTING & DEMONSTRATION
// ============================================================================

/**
 * Runs automated tests on the EchoChamber
 * Used for validation and demonstration
 */
function runAutomatedTests() {
  console.log('\n🧪 RUNNING AUTOMATED TESTS:\n');

  const chamber = new EchoChamber();
  let testsPassed = 0;
  let testsFailed = 0;

  const tests = [
    {
      name: 'Test 1: Valid arithmetic progression [3, 6, 9, 12]',
      input: [3, 6, 9, 12],
      expectedPrediction: 15,
      shouldPass: true
    },
    {
      name: 'Test 2: Valid progression [2, 4, 6, 8]',
      input: [2, 4, 6, 8],
      expectedPrediction: 10,
      shouldPass: true
    },
    {
      name: 'Test 3: Valid negative progression [10, 5, 0, -5]',
      input: [10, 5, 0, -5],
      expectedPrediction: -10,
      shouldPass: true
    },
    {
      name: 'Test 4: Invalid progression [1, 2, 4, 7]',
      input: [1, 2, 4, 7],
      shouldPass: false
    },
    {
      name: 'Test 5: Single number (invalid)',
      input: [5],
      shouldPass: false
    },
    {
      name: 'Test 6: Empty array (invalid)',
      input: [],
      shouldPass: false
    }
  ];

  tests.forEach(test => {
    const result = chamber.predictNext(test.input);

    if (test.shouldPass) {
      if (result.success && result.prediction === test.expectedPrediction) {
        console.log(`✅ ${test.name} - PASSED`);
        testsPassed++;
      } else {
        console.log(`❌ ${test.name} - FAILED (expected ${test.expectedPrediction}, got ${result.prediction})`);
        testsFailed++;
      }
    } else {
      if (!result.success) {
        console.log(`✅ ${test.name} - PASSED (correctly rejected)`);
        testsPassed++;
      } else {
        console.log(`❌ ${test.name} - FAILED (should have been rejected)`);
        testsFailed++;
      }
    }
  });

  console.log(`\n${'─'.repeat(76)}`);
  console.log(`Results: ${testsPassed} passed, ${testsFailed} failed\n`);

  return testsFailed === 0;
}

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  // If --test flag is provided, run automated tests only
  if (args.includes('--test')) {
    const allTestsPassed = runAutomatedTests();
    process.exit(allTestsPassed ? 0 : 1);
  }

  // Otherwise, start the interactive UI
  const ui = new EchoChamberUI();
  await ui.start();
}

// Run the application
main();

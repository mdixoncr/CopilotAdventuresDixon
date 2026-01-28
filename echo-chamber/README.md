# 🏰 Echo Chamber - Magical Number Sequence Predictor

A Node.js application that simulates an enchanted Echo Chamber where users predict the next number in arithmetic progression sequences. This educational project demonstrates sequence validation, pattern recognition, and interactive console-based UI design.

## 📖 Story Context

Deep within the ancient library of Numeria lies the mystical **Echo Chamber**, a room where magical numbers dance in perfect patterns. Every number echoes according to an ancient law: *"Each echo differs from the last by the same mystical amount."*

As the Chamber's newest apprentice, you must master the art of prediction and discover what the next echo will be!

## ✨ Features

### Core Functionality
- **Sequence Validation**: Verifies that input sequences form valid arithmetic progressions
- **Prediction Engine**: Calculates the next number using the common difference formula
- **Memory Storage**: Records all predictions and maintains a complete memory archive
- **Error Handling**: Comprehensive edge case handling and user-friendly error messages

### User Interface
- **Interactive Menu**: Easy navigation between different operations
- **Story-Driven Experience**: Engaging narrative context for the puzzle
- **Demonstration Mode**: Pre-configured test sequences to see the system in action
- **Memory Archive**: View all previous predictions with statistics
- **Detailed Results**: Clear explanation of how predictions were calculated

### Testing & Validation
- **6 Automated Tests**: Comprehensive validation of core functionality
- **Edge Case Coverage**: Tests for invalid progressions, empty arrays, single elements
- **Negative Progressions**: Support for descending sequences
- **Test Mode**: Run all tests automatically with `--test` flag

## 🚀 Getting Started

### Prerequisites
- Node.js 12.0 or higher
- Terminal/Command line access

### Installation

1. Navigate to the echo-chamber directory:
```bash
cd echo-chamber
```

2. No additional dependencies required - uses Node.js built-in `readline` module

### Running the Application

#### Interactive Mode
```bash
node index.js
```
This launches the interactive Echo Chamber experience with menu navigation.

#### Test Mode
```bash
node index.js --test
```
Runs all 6 automated tests and displays pass/fail results.

#### With Node Shebang (on Unix-like systems)
```bash
./index.js
```

## 📚 How to Use

### Main Menu Options

**[1] Enter a sequence to predict**
- Input comma-separated numbers (e.g., `3,6,9,12`)
- The system validates the sequence
- If valid, predicts the next number
- Result is added to the memory archive

**[2] View memory archive**
- Displays all previous predictions
- Shows the original sequence, common difference, and prediction
- Includes statistics: total memories and average difference

**[3] Clear all memories**
- Resets the memory archive
- Useful for starting fresh

**[4] Run demonstration**
- Automatically tests 6 pre-configured sequences
- Shows various progression types:
  - Basic progression (3, 6, 9, 12)
  - Multi-element sequence (2, 4, 6, 8, 10)
  - Different patterns (5, 10, 15, 20)
  - Descending progression (100, 90, 80, 70)
  - Constant sequence (1, 1, 1, 1)

**[5] Exit the Echo Chamber**
- Gracefully closes the application

## 💡 Example Usage

### Sample Input/Output

```
Input: 3,6,9,12
Output:
✨ The Echo Chamber responds:

   Original sequence:    [3, 6, 9, 12]
   Common difference:    3
   Next echo predicted:  15
   Formula applied:      12 + 3 = 15

   📜 ✓ The next number in the sequence is: 15
```

### Testing Invalid Sequences

```
Input: 1,2,4,7
Output:
❌ Not an arithmetic progression! 
   Inconsistent difference detected between 2 and 4.
```

## 🔬 Implementation Details

### EchoChamber Class (Sequence Predictor)

**Core Methods:**

- `validateSequence(sequence)`: Validates arithmetic progression
  - Returns validation status, error messages, and common difference
  - Checks for at least 2 elements
  - Verifies all consecutive differences are equal

- `predictNext(sequence)`: Predicts next number
  - Validates sequence first
  - Calculates: `next = last + difference`
  - Stores result in memory
  - Returns detailed result object

- `getMemories()`: Retrieves all stored predictions
  - Returns array of memory entries with timestamps

- `getMemoryStats()`: Calculates memory statistics
  - Includes: total memories and average difference

### EchoChamberUI Class (User Interface)

**Key Methods:**

- `start()`: Main interactive loop
  - Displays menu and processes user choices
  - Keeps session running until user exits

- `handleSequenceInput()`: Processes user sequence input
  - Parses comma-separated values
  - Validates input format
  - Displays results

- `displayPredictionResult(result)`: Formats and displays predictions
  - Shows sequence, pattern, and formula
  - Color-coded with symbols (✓, ❌, 📜)

- `displayMemories()`: Shows memory archive with statistics

- `runDemonstration()`: Executes 6 pre-configured tests

### Arithmetic Progression Formula

For a sequence with common difference `d`:
```
First term:  a₁
Second term: a₁ + d
Third term:  a₁ + 2d
...
nth term:    aₙ = a₁ + (n-1)d
Next term:   aₙ₊₁ = aₙ + d
```

## ✅ Test Coverage

All 6 tests pass successfully:

| Test | Input | Expected | Result |
|------|-------|----------|--------|
| 1 | [3, 6, 9, 12] | 15 | ✅ PASS |
| 2 | [2, 4, 6, 8] | 10 | ✅ PASS |
| 3 | [10, 5, 0, -5] | -10 | ✅ PASS |
| 4 | [1, 2, 4, 7] | Rejected | ✅ PASS |
| 5 | [5] | Rejected | ✅ PASS |
| 6 | [] | Rejected | ✅ PASS |

### Running Tests

```bash
node index.js --test
```

Output shows pass/fail status for each test with details on failures.

## 🎯 Learning Objectives

This application teaches:

1. **Algorithm Design**: Implementing sequence validation and prediction logic
2. **Input Validation**: Handling edge cases and user errors gracefully
3. **Data Structures**: Using arrays and objects for data management
4. **Object-Oriented Programming**: Class-based architecture (EchoChamber, UI)
5. **Console UI Design**: Creating engaging interactive experiences in terminal
6. **Testing Methodology**: Comprehensive test coverage and automation
7. **Code Documentation**: Extensive comments and docstrings for clarity
8. **Error Handling**: User-friendly error messages and edge case management

## 🐛 Error Handling

The application handles:

- **Non-numeric input**: Filters out invalid numbers automatically
- **Sequences too short**: Requires at least 2 numbers
- **Invalid progressions**: Detects inconsistent differences
- **Empty input**: Provides guidance to user
- **Non-integer differences**: Supports decimal progressions
- **Negative progressions**: Works correctly with descending sequences

## 📝 Code Structure

```
index.js (500+ lines)
├── EchoChamber Class (Sequence Predictor)
│   ├── validateSequence()
│   ├── predictNext()
│   ├── getMemories()
│   ├── clearMemories()
│   └── getMemoryStats()
├── EchoChamberUI Class (User Interface)
│   ├── displayWelcome()
│   ├── displayMenu()
│   ├── handleSequenceInput()
│   ├── displayPredictionResult()
│   ├── displayMemories()
│   ├── runDemonstration()
│   ├── promptUser()
│   └── start()
├── Testing Module
│   └── runAutomatedTests()
└── Main Entry Point
    └── main()
```

## 🎨 Features Highlighted

### User Experience
- ✨ Story-driven narrative context
- 🏰 Visual ASCII borders and formatting
- 📊 Clear data visualization
- 📚 Comprehensive memory archive
- 🎬 Demonstration mode for learning

### Code Quality
- 📖 Extensive inline documentation
- 🔍 Input validation on all user inputs
- ⚠️ Graceful error handling
- 🧪 Comprehensive test coverage
- 🎯 Well-organized class structure

### Extensibility
- Easy to add new test sequences
- Memory system can be persisted to files
- UI can be adapted for web interface
- Algorithm can be extended for other progression types

## 🔮 Possible Enhancements

- **File Persistence**: Save/load memories to JSON files
- **Advanced Patterns**: Support geometric progressions, Fibonacci sequences
- **Web Interface**: Convert to web-based using Express.js
- **Difficulty Levels**: Progressively harder sequences
- **Leaderboard**: Track prediction accuracy scores
- **Visualization**: Plot sequences graphically using ASCII art

## 📄 License

This project is part of the CopilotAdventures educational repository.

## 🙋 Support

For issues or questions:
1. Review the inline code documentation
2. Run the demonstration mode: `node index.js` → [4]
3. Run automated tests: `node index.js --test`
4. Check error messages for specific guidance

---

**Adventure Status**: The Echo Chamber awaits your predictions! 🏰✨

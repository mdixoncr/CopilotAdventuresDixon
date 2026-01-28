# 🚀 Quick Start Guide - Echo Chamber

Get started with the Echo Chamber application in 5 minutes!

## Installation & Setup

```bash
# Navigate to the echo-chamber directory
cd echo-chamber

# No dependencies to install - uses Node.js built-in modules
```

## Running the Application

### Start Interactive Experience
```bash
node index.js
```

This launches an interactive adventure where you can:
- Enter sequences and get predictions
- View your memory archive
- Run a demonstration
- Clear memories

### Run All Tests
```bash
node index.js --test
```

Or use the dedicated test suite with detailed reporting:
```bash
node test-suite.js
```

### Using npm Scripts (if package.json is installed)
```bash
npm start           # Launch interactive mode
npm test            # Run tests
npm run demo        # Launch demo mode
```

## First-Time User Walkthrough

### 1. Launch the Application
```bash
node index.js
```

### 2. Main Menu
You'll see the Echo Chamber story and menu with 5 options.

### 3. Try the Demonstration (Recommended First Step)
Select option `[4] Run demonstration`

This will test 6 pre-configured sequences:
- `[3, 6, 9, 12]` → predicts `15` ✓
- `[2, 4, 6, 8, 10]` → predicts `12` ✓
- `[5, 10, 15, 20]` → predicts `25` ✓
- `[10, 20, 30]` → predicts `40` ✓
- `[1, 1, 1, 1]` → predicts `1` ✓
- `[100, 90, 80, 70]` → predicts `60` ✓

### 4. Try Your Own Sequence
Select option `[1] Enter a sequence to predict`

**Examples you can try:**
- `5, 10, 15, 20` (multiples of 5)
- `10, 20, 30, 40` (multiples of 10)
- `100, 200, 300, 400` (hundreds)
- `1, 2, 3, 4, 5` (simple counting)
- `-10, -5, 0, 5` (negative to positive)

**Enter the numbers separated by commas:**
```
Enter your choice (1-5): 1
Enter sequence: 5,10,15,20

✨ The Echo Chamber responds:
   Original sequence:    [5, 10, 15, 20]
   Common difference:    5
   Next echo predicted:  25
   Formula applied:      20 + 5 = 25
   📜 ✓ The next number in the sequence is: 25
```

### 5. View Your Memories
Select option `[2] View memory archive`

Shows:
- All sequences you've entered
- The predictions made
- Statistics (total memories, average difference)

### 6. Explore More
- Try invalid sequences to see error handling
- Enter sequences with different patterns
- Build up your memory archive

## Example Test Cases

### Valid Arithmetic Progressions (Will Succeed)

| Sequence | Difference | Prediction |
|----------|-----------|-----------|
| [3, 6, 9, 12] | +3 | 15 |
| [2, 4, 6, 8] | +2 | 10 |
| [10, 5, 0, -5] | -5 | -10 |
| [100, 200, 300] | +100 | 400 |
| [5, 5, 5, 5] | 0 | 5 |

### Invalid Cases (Will Be Rejected)

| Sequence | Problem |
|----------|---------|
| [1, 2, 4, 7] | Not arithmetic (differences: 1, 2, 3) |
| [1, 1, 2, 3, 5] | Fibonacci pattern, not arithmetic |
| [5] | Too short (needs at least 2 numbers) |
| [] | Empty sequence |

## Command Reference

```bash
# Interactive mode
node index.js

# Test mode
node index.js --test

# Dedicated test suite
node test-suite.js

# With npm (if package.json dependencies installed)
npm start
npm test
```

## What Each Menu Option Does

| Option | Purpose |
|--------|---------|
| [1] Enter a sequence | Input custom number sequences |
| [2] View memory archive | See all previous predictions |
| [3] Clear all memories | Reset the memory storage |
| [4] Run demonstration | See 6 pre-configured examples |
| [5] Exit | Close the application |

## Testing Output Explained

### Successful Prediction
```
✓ Valid arithmetic progression detected!
   Original sequence:    [3, 6, 9, 12]
   Common difference:    3
   Next echo predicted:  15
   📜 ✓ The next number in the sequence is: 15
```

### Invalid Sequence
```
❌ Not an arithmetic progression! 
   Inconsistent difference detected between 2 and 4.
```

## Memory System

The application remembers every prediction you make:
- **Stored Information**: Original sequence, common difference, prediction, timestamp
- **Viewing Memories**: Select option [2]
- **Statistics**: Shows total memories and average difference
- **Clearing**: Select option [3] to reset all memories

## Learning Points

The Echo Chamber teaches:
1. **Arithmetic Progressions**: Understanding sequences with constant differences
2. **Input Validation**: Checking data before processing
3. **Error Handling**: Graceful responses to invalid input
4. **Data Storage**: Recording and retrieving information
5. **Algorithm Design**: Implementing prediction logic

## Troubleshooting

### Application won't start
```bash
# Check Node.js is installed
node --version

# Ensure you're in the echo-chamber directory
cd echo-chamber

# Try running the application
node index.js
```

### Tests failing
```bash
# Run the dedicated test suite for detailed output
node test-suite.js

# Check Node.js version (needs 12.0+)
node --version
```

### Strange output with decimals
The application correctly handles floating-point precision. Some decimal sequences may be rejected if differences don't match exactly due to floating-point representation (e.g., 0.1 + 0.2 ≠ 0.3 in JavaScript).

## Next Steps

After exploring the basic functionality:
1. Try creating test sequences of your own
2. Explore the code in `index.js` to understand the implementation
3. Read the comprehensive `README.md` for technical details
4. Run `node test-suite.js` to see all 25 test cases

## Fun Challenges

1. **Find a Sequence with Difference 7**: Try `[7, 14, 21, 28]`
2. **Descending Sequence**: Try `[100, 80, 60, 40]` (difference: -20)
3. **Large Numbers**: Try `[1000, 2000, 3000, 4000]`
4. **Negative to Positive**: Try `[-10, -5, 0, 5]`
5. **Constant Sequence**: Try `[42, 42, 42, 42]` (difference: 0)

---

**Happy Exploring!** 🏰✨

For more details, see `README.md`

// 2429. Minimize XOR
// Given two positive integers num1 and num2, find the positive integer x such that:
// x has the same number of set bits as num2, and
// The value x XOR num1 is minimal.

// Note that XOR is the bitwise XOR operation.
// Return the integer x. The test cases are generated such that x is uniquely determined.
// The number of set bits of an integer is the number of 1's in its binary representation.

// Example 1:
// Input: num1 = 3, num2 = 5
// Output: 3
// Explanation:
// The binary representations of num1 and num2 are 0011 and 0101, respectively.
// The integer 3 has the same number of set bits as num2, and the value 3 XOR 3 = 0 is minimal.

// Example 2:
// Input: num1 = 1, num2 = 12
// Output: 3
// Explanation:
// The binary representations of num1 and num2 are 0001 and 1100, respectively.
// The integer 3 has the same number of set bits as num2, and the value 3 XOR 1 = 2 is minimal.

// Constraints:
// 1 <= num1, num2 <= 10^9

function minimizeXor(num1: number, num2: number): number {
  const isSet = (x: number, bit: number): boolean => (x & (1 << bit)) !== 0;
  const setBit = (x: number, bit: number): number => x | (1 << bit);
  const unsetBit = (x: number, bit: number): number => x & ~(1 << bit);
  const countSetBits = (n: number): number => n.toString(2).split('1').length - 1;

  // Initialize result to num1. We will modify result.
  let result = num1;

  let targetSetBitsCount = countSetBits(num2);
  let setBitsCount = countSetBits(result);

  // Start with the least significant bit (bit 0).
  let currentBit = 0;

  // Add bits to result if it has fewer set bits than the target.
  while ( setBitsCount < targetSetBitsCount ) {
    // If the current bit in result is not set (0), set it to 1.
    if (!isSet(result, currentBit)) {
      result = setBit(result, currentBit);
      setBitsCount++;
    }

    // Move to the next bit.
      currentBit++;
  }

  // Remove bits from result if it has more set bits than the target.
  currentBit = 0; // Reset to the least significant bit
  while (setBitsCount > targetSetBitsCount) {
    // If the current bit in result is set (1), unset it (make it 0).
    if (isSet(result, currentBit)) {
      result = unsetBit(result, currentBit);
      setBitsCount--;
    }
    // Move to the next bit.
    currentBit++;
  }

  return result;
}
// 7. Reverse Integer
// Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.
// Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

// Example 1:
// Input: x = 123
// Output: 321

// Example 2:
// Input: x = -123
// Output: -321

// Example 3:
// Input: x = 120
// Output: 21

// Constraints:
// -2^31 <= x <= 2^31 - 1

function reverse(x: number): number {
  const INT_MAX = Math.pow(2, 31) - 1;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  let rev = 0;

  while (x !== 0) {
    const digit = x % 10; // Get the last digit

    // Append the digit to rev.
    rev = rev * 10 + digit;

    if (rev > Math.floor(INT_MAX) || (rev === Math.floor(INT_MAX))) {
      return 0; // Overflow condition for positive
    }

    x = Math.floor(x / 10);        
  }

  return rev * sign;
};
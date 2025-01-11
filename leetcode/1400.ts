// 1400. Construct K Palindrome Strings
// Given a string s and an integer k, return true if you can use all the characters in s to construct k palindrome strings or false otherwise.

// Example 1:
// Input: s = "annabelle", k = 2
// Output: true
// Explanation: You can construct two palindromes using all characters in s.
// Some possible constructions "anna" + "elble", "anbna" + "elle", "anellena" + "b"

// Example 2:
// Input: s = "leetcode", k = 3
// Output: false
// Explanation: It is impossible to construct 3 palindromes using all the characters of s.

// Example 3:
// Input: s = "true", k = 4
// Output: true
// Explanation: The only possible solution is to put each character in a separate string.

// Constraints:
// 1 <= s.length <= 10^5
// s consists of lowercase English letters.
// 1 <= k <= 10^5

function canConstruct(s: string, k: number): boolean {
  if (s.length < k) return false;
  if (s.length === k) return true;

  const freq: number[] = Array(26).fill(0);
  let numberOfOddFreqChar: number = 0;

  // Increment the value of the index corresponding to the current character
  for (let i=0; i < s.length; i++) {
    freq[s.charCodeAt(i) - 'a'.charCodeAt(0)]+= 1;
  }

  // Count the number of characters that appear an odd number of times in s
  for (let charCount of freq) {
    if ((charCount % 2) == 1) numberOfOddFreqChar+= 1;
  }

  return numberOfOddFreqChar <= k;
};
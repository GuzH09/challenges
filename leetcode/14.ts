// 14. Longest Common Prefix
// Write a function to find the longest common prefix string amongst an array of strings.
// If there is no common prefix, return an empty string "".

// Example 1:
// Input: strs = ["flower","flow","flight"]
// Output: "fl"

// Example 2:
// Input: strs = ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.

// Constraints:
// 1 <= strs.length <= 200
// 0 <= strs[i].length <= 200
// strs[i] consists of only lowercase English letters.

function longestCommonPrefix(strs: string[]): string {    
  // If no strings or only one string, handle quickly
  if (strs.length === 0) return "";
  if (strs.length === 1) return strs[0];

  // Find the minimum length among the strings
  let minLength = Infinity;
  for (let str of strs) {
    if (str.length < minLength) {
      minLength = str.length;
    }
  }

  // Check characters one by one up to minLength
  for (let i = 0; i < minLength; i++) {
    const char = strs[0][i];
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== char) {
        // Mismatch found, return prefix up to i-1
        return strs[0].slice(0, i);
      }
    }
  }

  // If no mismatch found, entire substring up to minLength is common prefix
  return strs[0].slice(0, minLength);
};
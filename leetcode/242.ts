// 242. Valid Anagram
// Given two strings s and t, return true if t is an anagram of s, and false otherwise.

// Example 1:
// Input: s = "anagram", t = "nagaram"
// Output: true

// Example 2:
// Input: s = "rat", t = "car"
// Output: false

// Constraints:
// 1 <= s.length, t.length <= 5 * 10^4
// s and t consist of lowercase English letters.

function isAnagram(s: string, t: string): boolean {
  if (s.length != t.length) {
    return false
  }

  const sCollection = new Map();
  const tCollection = new Map();

  for (let char of s) {
    sCollection.set(char, (sCollection.get(char) || 0) + 1);
  }

  for (let char of t) {
    tCollection.set(char, (tCollection.get(char) || 0) + 1);
  }

  for (let [key, value] of sCollection) {
    if (tCollection.has(key)) {
      if (value != tCollection.get(key)) {
        return false
      }
    } else return false
  }

  return true;
};
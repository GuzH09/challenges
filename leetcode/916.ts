// 916. Word Subsets
// You are given two string arrays words1 and words2.

// A string b is a subset of string a if every letter in b occurs in a including multiplicity.
// For example, "wrr" is a subset of "warrior" but is not a subset of "world".
// A string a from words1 is universal if for every string b in words2, b is a subset of a.

// Return an array of all the universal strings in words1. You may return the answer in any order.

// Example 1:
// Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["e","o"]
// Output: ["facebook","google","leetcode"]

// Example 2:
// Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["l","e"]
// Output: ["apple","google","leetcode"]

// Constraints:
// 1 <= words1.length, words2.length <= 10^4
// 1 <= words1[i].length, words2[i].length <= 10
// words1[i] and words2[i] consist only of lowercase English letters.
// All the strings of words1 are unique.

function wordSubsets(words1: string[], words2: string[]): string[] {
  const maxCharFreq: number[] = Array(26).fill(0);
  const ans: string[] = [];

  for (const word of words2) {
    const auxArr: number[] = Array(26).fill(0);
    for (let i = 0; i < word.length; i++) {
      auxArr[word.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }
    for (let i = 0; i < 26; i++) {
      maxCharFreq[i] = Math.max(maxCharFreq[i], auxArr[i]);
    }
  }

  for (const word of words1) {
    if (isRightCount(word, maxCharFreq)) {
      ans.push(word);
    }
  }

  return ans;
}

function isRightCount(s: string, arr: number[]): boolean {
  const aux: number[] = Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    aux[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
  }
  for (let i = 0; i < 26; ++i) {
    if (aux[i] < arr[i]) {
      return false;
    }
  }
  return true;
};
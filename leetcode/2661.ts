// 2661. First Completely Painted Row or Column
// You are given a 0-indexed integer array arr, and an m x n integer matrix mat. arr and mat both contain all the integers in the range [1, m * n].
// Go through each index i in arr starting from index 0 and paint the cell in mat containing the integer arr[i].
// Return the smallest index i at which either a row or a column will be completely painted in mat.

// Example 1:
// image explanation for example 1
// Input: arr = [1,3,4,2], mat = [[1,4],[2,3]]
// Output: 2
// Explanation: The moves are shown in order, and both the first row and second column of the matrix become fully painted at arr[2].

// Example 2:
// image explanation for example 2
// Input: arr = [2,8,7,4,1,3,5,6,9], mat = [[3,2,5],[1,4,6],[8,7,9]]
// Output: 3
// Explanation: The second column becomes fully painted at arr[3].

// Constraints:
// m == mat.length
// n = mat[i].length
// arr.length == m * n
// 1 <= m, n <= 10^5
// 1 <= m * n <= 10^5
// 1 <= arr[i], mat[r][c] <= m * n
// All the integers of arr are unique.
// All the integers of mat are unique.

function firstCompleteIndex(arr: number[], mat: number[][]): number {
  let numCols = mat[0].length;
  let numRows = mat.length;
  const freqCols: number[] = new Array(numCols).fill(0);
  const freqRow: number[] = new Array(numRows).fill(0);
  const numToPos = new Map<number, [number, number]>();

  // Create a map to store the position of each number in the matrix
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const value = mat[row][col];
      numToPos.set(value, [row, col]);
    }
  }

  for (let i=0; i < arr.length; i++) {
    const num = arr[i];
    const pos = numToPos.get(num);
    if (!pos) {
      continue; // This shouldn't happen based on the problem description
    }
    const [row, col] = pos;

    // Increment the count for the corresponding row and column
    freqRow[row]++;
    freqCols[col]++;

    // Check if the row or column is completely painted
    if (freqRow[row] === numCols || freqCols[col] === numRows) {
      return i;
    }
  }

  return -1; // This line will never be reached as per the problem statement
};
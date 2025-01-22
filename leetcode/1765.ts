// 1765. Map of Highest Peak
// You are given an integer matrix isWater of size m x n that represents a map of land and water cells.

// If isWater[i][j] == 0, cell (i, j) is a land cell.
// If isWater[i][j] == 1, cell (i, j) is a water cell.
// You must assign each cell a height in a way that follows these rules:

// The height of each cell must be non-negative.
// If the cell is a water cell, its height must be 0.
// Any two adjacent cells must have an absolute height difference of at most 1. A cell is adjacent to another cell if the former is directly north, east, south, or west of the latter (i.e., their sides are touching).
// Find an assignment of heights such that the maximum height in the matrix is maximized.

// Return an integer matrix height of size m x n where height[i][j] is cell (i, j)'s height. If there are multiple solutions, return any of them.

// Example 1:
// Input: isWater = [[0,1],[0,0]]
// Output: [[1,0],[2,1]]
// Explanation: The image shows the assigned heights of each cell.
// The blue cell is the water cell, and the green cells are the land cells.

// Example 2:
// Input: isWater = [[0,0,1],[1,0,0],[0,0,0]]
// Output: [[1,1,0],[0,1,1],[1,2,2]]
// Explanation: A height of 2 is the maximum possible height of any assignment.
// Any height assignment that has a maximum height of 2 while still meeting the rules will also be accepted.

// Constraints:
// m == isWater.length
// n == isWater[i].length
// 1 <= m, n <= 1000
// isWater[i][j] is 0 or 1.
// There is at least one water cell.

// Note: This question is the same as 542: https://leetcode.com/problems/01-matrix/

function highestPeak(isWater: number[][]): number[][] {
  const rows = isWater.length;
  const cols = isWater[0].length;
  const cellHeights: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );

  // Initialize water cells to 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (isWater[i][j] === 1) {
        cellHeights[i][j] = 0;
      }
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (cellHeights[i][j] === 0) continue;
      let minNeighborDistance = Infinity;

      let neighborRow = i - 1;
      let neighborCol = j;
      if (neighborRow >= 0 && neighborRow < rows) {
        minNeighborDistance = Math.min(
          minNeighborDistance,
          cellHeights[neighborRow][neighborCol]
        );
      }

      neighborRow = i;
      neighborCol = j - 1;
      if (neighborCol >= 0 && neighborCol < cols) {
        minNeighborDistance = Math.min(
          minNeighborDistance,
          cellHeights[neighborRow][neighborCol]
        );
      }

      if (minNeighborDistance !== Infinity) {
        cellHeights[i][j] = Math.min(
          cellHeights[i][j],
          minNeighborDistance + 1
        );
      }
    }
  }

  for (let i = rows - 1; i > -1; i--) {
    for (let j = cols - 1; j > -1; j--) {
      let minNeighborDistance = Infinity;

      let neighborRow = i + 1;
      let neighborCol = j;
      if (neighborRow >= 0 && neighborRow < rows) {
        minNeighborDistance = Math.min(
          minNeighborDistance,
          cellHeights[neighborRow][neighborCol]
        );
      }

      neighborRow = i;
      neighborCol = j + 1;
      if (neighborCol >= 0 && neighborCol < cols) {
        minNeighborDistance = Math.min(
          minNeighborDistance,
          cellHeights[neighborRow][neighborCol]
        );
      }

      if (minNeighborDistance !== Infinity) {
        cellHeights[i][j] = Math.min(
          cellHeights[i][j],
          minNeighborDistance + 1
        );
      }
    }
  }

  return cellHeights;
}

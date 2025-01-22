// 542. 01 Matrix
// Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

// The distance between two cells sharing a common edge is 1.

// Example 1:
// Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
// Output: [[0,0,0],[0,1,0],[0,0,0]]

// Example 2:
// Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
// Output: [[0,0,0],[0,1,0],[1,2,1]]

// Constraints:
// m == mat.length
// n == mat[i].length
// 1 <= m, n <= 10^4
// 1 <= m * n <= 10^4
// mat[i][j] is either 0 or 1.
// There is at least one 0 in mat.

// Note: This question is the same as 1765: https://leetcode.com/problems/map-of-highest-peak/

function updateMatrix(mat: number[][]): number[][] {
  const rows = mat.length;
  const cols = mat[0].length;
  const cellHeights: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );

  // Initialize 0's cells to 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (mat[i][j] === 0) {
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

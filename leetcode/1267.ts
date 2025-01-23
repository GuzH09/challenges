// 1267. Count Servers that Communicate
// You are given a map of a server center, represented as a m * n integer matrix grid, where 1 means that on that cell there is a server and 0 means that it is no server. Two servers are said to communicate if they are on the same row or on the same column.

// Return the number of servers that communicate with any other server.

// Example 1:
// Input: grid = [[1,0],[0,1]]
// Output: 0
// Explanation: No servers can communicate with others.

// Example 2:
// Input: grid = [[1,0],[1,1]]
// Output: 3
// Explanation: All three servers can communicate with at least one other server.

// Example 3:
// Input: grid = [[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]
// Output: 4
// Explanation: The two servers in the first row can communicate with each other. The two servers in the third column can communicate with each other. The server at right bottom corner can't communicate with any other server.

// Constraints:
// m == grid.length
// n == grid[i].length
// 1 <= m <= 250
// 1 <= n <= 250
// grid[i][j] == 0 or 1

function countServers(grid: number[][]): number {
  if (grid.length === 0) return 0;
  const numRows = grid.length;
  const numCols = grid[0].length;

  const colCounts: number[] = new Array(numCols).fill(0);
  const rowCounts: number[] = new Array(numRows).fill(0);

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (grid[row][col] === 1) {
        colCounts[col]++;
        rowCounts[row]++;
      }
    }
  }

  let communicable = 0;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (grid[row][col] === 1 && (colCounts[col] > 1 || rowCounts[row] > 1)) {
        communicable++;
      }
    }
  }

  return communicable;
}

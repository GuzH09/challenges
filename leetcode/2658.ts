// 2658. Maximum Number of Fish in a Grid
// You are given a 0-indexed 2D matrix grid of size m x n, where (r, c) represents:

// A land cell if grid[r][c] = 0, or
// A water cell containing grid[r][c] fish, if grid[r][c] > 0.
// A fisher can start at any water cell (r, c) and can do the following operations any number of times:

// Catch all the fish at cell (r, c), or
// Move to any adjacent water cell.
// Return the maximum number of fish the fisher can catch if he chooses his starting cell optimally, or 0 if no water cell exists.

// An adjacent cell of the cell (r, c), is one of the cells (r, c + 1), (r, c - 1), (r + 1, c) or (r - 1, c) if it exists.

// Example 1:
// Input: grid = [[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,3,2,0]]
// Output: 7
// Explanation: The fisher can start at cell (1,3) and collect 3 fish, then move to cell (2,3) and collect 4 fish.

// Example 2:
// Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,1]]
// Output: 1
// Explanation: The fisher can start at cells (0,0) or (3,3) and collect a single fish.

// Constraints:
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 10
// 0 <= grid[i][j] <= 10

// DFS:
function findMaxFishDFS(grid: number[][]): number {
  const rows: number = grid.length;
  const cols: number = grid[0].length;
  let maxFishCount = 0;

  const visited: boolean[][] = Array.from(
    { length: rows },
    () => Array.from({ length: cols }),
    () => false
  );

  function calculateFishes(
    grid: number[][],
    visited: boolean[][],
    row: number,
    col: number
  ): number {
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      grid[row][col] === 0 ||
      visited[row][col]
    )
      return 0;

    visited[row][col] = true;

    return (
      grid[row][col] +
      calculateFishes(grid, visited, row, col + 1) +
      calculateFishes(grid, visited, row, col - 1) +
      calculateFishes(grid, visited, row + 1, col) +
      calculateFishes(grid, visited, row - 1, col)
    );
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] > 0 && !visited[row][col]) {
        maxFishCount = Math.max(
          maxFishCount,
          calculateFishes(grid, visited, row, col)
        );
      }
    }
  }

  return maxFishCount;
}

// BFS:
function findMaxFishBFS(grid: number[][]): number {
  const rows: number = grid.length;
  const cols: number = grid[0].length;
  let maxFishCount = 0;

  const visited: boolean[][] = Array.from(
    { length: rows },
    () => Array.from({ length: cols }),
    () => false
  );

  function calculateFishes(
    grid: number[][],
    visited: boolean[][],
    row: number,
    col: number
  ): number {
    let localFishCount = 0;
    const q: [number, number][] = [[row, col]];
    visited[row][col] = true;
    const row_directions = [0, 0, 1, -1];
    const col_directions = [1, -1, 0, 0];

    while (q.length > 0) {
      const [currentRow, currentCol] = q.shift()!;
      localFishCount += grid[currentRow][currentCol];

      for (let i = 0; i < 4; i++) {
        let newRow = currentRow + row_directions[i];
        let newCol = currentCol + col_directions[i];
        if (
          0 <= newRow &&
          newRow < rows &&
          0 <= newCol &&
          newCol < cols &&
          grid[newRow][newCol] &&
          !visited[newRow][newCol]
        ) {
          q.push([newRow, newCol]);
          visited[newRow][newCol] = true;
        }
      }
    }

    return localFishCount;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] > 0 && !visited[row][col]) {
        maxFishCount = Math.max(
          maxFishCount,
          calculateFishes(grid, visited, row, col)
        );
      }
    }
  }

  return maxFishCount;
}

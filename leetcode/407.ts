// 407. Trapping Rain Water II
// Given an m x n integer matrix heightMap representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.

// Example 1:
// Input: heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
// Output: 4
// Explanation: After the rain, water is trapped between the blocks.
// We have two small ponds 1 and 3 units trapped.
// The total volume of water trapped is 4.

// Example 2:
// Input: heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]
// Output: 10

// Constraints:
// m == heightMap.length
// n == heightMap[i].length
// 1 <= m, n <= 200
// 0 <= heightMap[i][j] <= 2 * 10^4

const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function trapRainWater(heightMap: number[][]): number {
  if (heightMap.length === 0 || heightMap[0].length === 0) return 0;

  // Priority queue (min-heap) for the boundary
  const heap = new PriorityQueue({
    compare: (left, right) => left.height - right.height,
  });

  const visited = Array(heightMap.length)
    .fill(null)
    .map(() => Array(heightMap[0].length).fill(false));

  // Add boundary cells to the heap
  for (let row = 0; row < heightMap.length; row++) {
    for (let col = 0; col < heightMap[0].length; col++) {
      if (
        row === 0 ||
        col === 0 ||
        row === heightMap.length - 1 ||
        col === heightMap[0].length - 1
      ) {
        visited[row][col] = true;
        heap.enqueue({ height: heightMap[row][col], row, col });
      }
    }
  }

  let water = 0;
  
  // Process cells in the heap
  while (heap.size() > 0) {
    const { height, row, col } = heap.dequeue();
  
    for (const [dr, dc] of DIRECTIONS) {
      const r = row + dr;
      const c = col + dc;
  
      if (
        r < 0 ||
        r >= heightMap.length ||
        c < 0 ||
        c >= heightMap[0].length ||
        visited[r][c]
      ) {
        continue;
      }
  
      // Calculate water trapped
      water += Math.max(0, height - heightMap[r][c]);
  
      // Add the neighbor to the heap with updated height
      heap.enqueue({ height: Math.max(height, heightMap[r][c]), row: r, col: c });
      visited[r][c] = true;
    }
  }

  return water;
}
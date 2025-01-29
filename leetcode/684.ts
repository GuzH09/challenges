// 684. Redundant Connection
// In this problem, a tree is an undirected graph that is connected and has no cycles.
// You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.
// Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.

// Example 1:
// Input: edges = [[1,2],[1,3],[2,3]]
// Output: [2,3]

// Example 2:
// Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
// Output: [1,4]

// Constraints:
// n == edges.length
// 3 <= n <= 1000
// edges[i].length == 2
// 1 <= ai < bi <= edges.length
// ai != bi
// There are no repeated edges.
// The given graph is connected.

type Edge = [number, number];
type AdjacencyList = number[][];

function findRedundantConnection(edges: Edge[]): Edge | [] {
  const N = edges.length;
  const visited: boolean[] = new Array(N).fill(false);
  const parent: number[] = new Array(N).fill(-1);
  const adjList: AdjacencyList = Array.from({ length: N }, () => []);
  let cycleStart = -1;

  // Build adjacency list (convert to 0-based indices)
  for (const [u, v] of edges) {
    adjList[u - 1].push(v - 1);
    adjList[v - 1].push(u - 1);
  }

  function dfs(src: number): void {
    visited[src] = true;

    for (const neighbor of adjList[src]) {
      if (!visited[neighbor]) {
        parent[neighbor] = src;
        dfs(neighbor);
      }
      // Found a back edge that forms a cycle
      else if (neighbor !== parent[src] && cycleStart === -1) {
        cycleStart = neighbor;
        parent[neighbor] = src; // Rewire parent to establish cycle path
      }
    }
  }

  // Start DFS from first node (0-based)
  dfs(0);

  // No cycle found (shouldn't happen according to problem constraints)
  if (cycleStart === -1) return [];

  // Reconstruct cycle nodes
  const cycleNodes = new Set<number>();
  let currentNode = cycleStart;
  while (true) {
    cycleNodes.add(currentNode);
    currentNode = parent[currentNode];
    if (currentNode === cycleStart) break;
  }

  // Find last edge in input that connects two cycle nodes
  for (let i = edges.length - 1; i >= 0; i--) {
    const u = edges[i][0] - 1; // Convert to 0-based
    const v = edges[i][1] - 1;
    if (cycleNodes.has(u) && cycleNodes.has(v)) {
      return edges[i];
    }
  }

  return []; // Should never reach per problem constraints
}

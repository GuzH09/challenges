// 2127. Maximum Employees to Be Invited to a Meeting
// A company is organizing a meeting and has a list of n employees, waiting to be invited. They have arranged for a large circular table, capable of seating any number of employees.

// The employees are numbered from 0 to n - 1. Each employee has a favorite person and they will attend the meeting only if they can sit next to their favorite person at the table. The favorite person of an employee is not themself.
// Given a 0-indexed integer array favorite, where favorite[i] denotes the favorite person of the ith employee, return the maximum number of employees that can be invited to the meeting.

// Example 1:
// Input: favorite = [2,2,1,2]
// Output: 3
// Explanation:
// The above figure shows how the company can invite employees 0, 1, and 2, and seat them at the round table.
// All employees cannot be invited because employee 2 cannot sit beside employees 0, 1, and 3, simultaneously.
// Note that the company can also invite employees 1, 2, and 3, and give them their desired seats.
// The maximum number of employees that can be invited to the meeting is 3.

// Example 2:
// Input: favorite = [1,2,0]
// Output: 3
// Explanation:
// Each employee is the favorite person of at least one other employee, and the only way the company can invite them is if they invite every employee.
// The seating arrangement will be the same as that in the figure given in example 1:
// - Employee 0 will sit between employees 2 and 1.
// - Employee 1 will sit between employees 0 and 2.
// - Employee 2 will sit between employees 1 and 0.
// The maximum number of employees that can be invited to the meeting is 3.

// Example 3:
// Input: favorite = [3,0,1,4,1]
// Output: 4
// Explanation:
// The above figure shows how the company will invite employees 0, 1, 3, and 4, and seat them at the round table.
// Employee 2 cannot be invited because the two spots next to their favorite employee 1 are taken.
// So the company leaves them out of the meeting.
// The maximum number of employees that can be invited to the meeting is 4.

// Constraints:

// n == favorite.length
// 2 <= n <= 10^5
// 0 <= favorite[i] <= n - 1
// favorite[i] != i

function maximumInvitations(favorite: number[]): number {
  const n = favorite.length;
  const reversedGraph: number[][] = Array.from({ length: n }, () => []);

  // Build reversed graph (admirers graph)
  for (let i = 0; i < n; i++) {
    reversedGraph[favorite[i]].push(i);
  }

  let longestCycle = 0;
  let twoCycleSum = 0;
  const visited = new Array(n).fill(false);

  // BFS helper to calculate max depth while avoiding visited nodes
  const bfs = (start: number, visitedNodes: Set<number>): number => {
    let maxDepth = 0;
    const queue: [number, number][] = [[start, 0]];
    visitedNodes.add(start);

    while (queue.length > 0) {
      const [node, depth] = queue.shift()!;
      for (const neighbor of reversedGraph[node]) {
        if (!visitedNodes.has(neighbor)) {
          visitedNodes.add(neighbor);
          maxDepth = Math.max(maxDepth, depth + 1);
          queue.push([neighbor, depth + 1]);
        }
      }
    }
    return maxDepth;
  };

  // Main cycle detection logic
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      const path = new Map<number, number>();
      let current = i;
      let dist = 0;

      while (true) {
        if (visited[current]) {
          if (path.has(current)) {
            const cycleLength = dist - path.get(current)!;
            longestCycle = Math.max(longestCycle, cycleLength);

            // Handle 2-length cycles separately
            if (cycleLength === 2) {
              const nodes = Array.from(path.keys());
              const a = current;
              const b = favorite[current];
              const visitedNodes = new Set([a, b]);
              twoCycleSum += 2 + bfs(a, visitedNodes) + bfs(b, visitedNodes);
            }
          }
          break;
        }

        visited[current] = true;
        path.set(current, dist);
        dist++;
        current = favorite[current];
      }
    }
  }

  return Math.max(longestCycle, twoCycleSum);
}

// 19. Remove Nth Node From End of List
// Given the head of a linked list, remove the nth node from the end of the list and return its head.

// Example 1:
// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]

// Example 2:
// Input: head = [1], n = 1
// Output: []

// Example 3:
// Input: head = [1,2], n = 1
// Output: [1]

// Constraints:
// The number of nodes in the list is sz.
// 1 <= sz <= 30
// 0 <= Node.val <= 100
// 1 <= n <= sz

// Definition for singly-linked list.
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
  }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // Create a dummy node that points to the head
  const dummy = new ListNode(0, head);
  let fast: ListNode | null = dummy;
  let slow: ListNode | null = dummy;

  // Move the fast pointer n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    if (fast !== null) {
      fast = fast.next;
    }
  }

  // Move both pointers until fast reaches the end
  while (fast !== null) {
    fast = fast.next;
    slow = slow!.next;
  }

  // Skip the nth node from the end
  if (slow !== null && slow.next !== null) {
    slow.next = slow.next.next;
  }

  // Return the head of the modified list
  return dummy.next;
};

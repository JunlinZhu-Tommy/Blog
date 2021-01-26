## Question
给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。

返回删除后的链表的头节点。

## Solution
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function(head, val) {
    if (!head) {
        return null;
    }

    const dummy = new ListNode(null);
    dummy.next = head;
    let current = head;
    let prev = dummy;

    while (current !== null) {
        if (current.val === val) {
            const nextNode = current.next;
            prev.next = nextNode;
            break;
        }

        prev = prev.next;
        current = current.next;
    }
    
    return dummy.next;
};
```
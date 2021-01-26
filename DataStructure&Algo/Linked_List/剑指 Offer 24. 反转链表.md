## Question
定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

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
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null;

    while (head !== null) {
        const temp = head.next;
        head.next = prev;
        prev = head;
        head = temp;
    }

    return prev;
};
```

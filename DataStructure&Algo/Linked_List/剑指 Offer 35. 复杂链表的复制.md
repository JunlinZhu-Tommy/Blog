## Question
请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## Solution
```javascript
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if (!head) {
        return null;
    }

    const nodeMap = new Map();
    const dummy = new Node(head.val);
    let prev = dummy;
    let newNode = null;

    while (head !== null) {
        if (nodeMap.has(head)) {
            newNode = nodeMap.get(head);
        } else {
            newNode = new Node(head.val);
            nodeMap.set(head, newNode);
        }

        prev.next = newNode;

        if (head.random) {
            if (nodeMap.has(head.random)) {
                newNode.random = nodeMap.get(head.random);
            } else {
                newNode.random = new Node(head.random.val);
                nodeMap.set(head.random, newNode.random);
            }
        }

        head = head.next;
        prev = prev.next;
    }

    return dummy.next;
};
```
## Question
输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)

B是A的子结构， 即 A中有出现和B相同的结构和节点值。

## Solution
```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function(A, B) {
    if (A === null && B === null) {
        return true
    }

    return (A !== null && B !== null) && (isSameTree(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B))
};

function isSameTree(A, B) {
    if (B === null) {
        return true
    }

    if (A === null || A.val !== B.val) {
        return false
    }

    return isSameTree(A.left, B.left) && isSameTree(A.right, B.right)
}
```
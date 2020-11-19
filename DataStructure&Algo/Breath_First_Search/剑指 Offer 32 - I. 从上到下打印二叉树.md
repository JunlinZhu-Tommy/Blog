## Question
从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。

例如:
给定二叉树: [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回：

[3,9,20,15,7]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

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
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function(root) {
    const results = [];
    
    if (!root) {
        return results;
    }

    const queue = [];
    queue.push(root);

    while (queue.length > 0) {
        const curNode = queue.shift();
        results.push(curNode.val);

        if (curNode.left) {
            queue.push(curNode.left);
        }

        if (curNode.right) {
            queue.push(curNode.right);
        }
    }

    return results;
};
```
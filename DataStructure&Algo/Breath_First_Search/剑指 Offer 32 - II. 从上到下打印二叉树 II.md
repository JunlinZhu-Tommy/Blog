## Question
从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

 

例如:
给定二叉树: [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回其层次遍历结果：

[
  [3],
  [9,20],
  [15,7]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof
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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    const results = [];

    if (!root) {
        return results;    
    }

    const queue = [];
    queue.push(root);

    while (queue.length > 0) {
        const curLevelSize = queue.length;
        const curLevelResults = [];
        
        for (let i = 0; i < curLevelSize; i++) {
            const curNode = queue.shift();
            curLevelResults.push(curNode.val);

            if (curNode.left) {
                queue.push(curNode.left);
            }

            if (curNode.right) {
                queue.push(curNode.right);
            }
        }

        results.push(curLevelResults);
    }

    return results;
};
```
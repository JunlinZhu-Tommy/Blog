## Question
请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。

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
    let levelIndex = 0;

    while (queue.length > 0) {
        const curLevelSize = queue.length;
        const curLevelResult = [];

        for (let i = 0; i< curLevelSize; i++) {
            const curNode = queue.shift();
            curLevelResult.push(curNode.val);

            if (curNode.left) {
                queue.push(curNode.left);
            }

            if (curNode.right) {
                queue.push(curNode.right);
            }
        }

        if (levelIndex % 2 === 0) {
            results.push(curLevelResult);
        } else {
            results.push(curLevelResult.reverse());
        }

        levelIndex++;
    }
    
    return results;
};
```
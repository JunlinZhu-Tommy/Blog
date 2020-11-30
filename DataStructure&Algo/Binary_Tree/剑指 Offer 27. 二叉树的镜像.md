## Question
请完成一个函数，输入一个二叉树，该函数输出它的镜像。

例如输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9
镜像输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1

 

示例 1：

输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof
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
 * @return {TreeNode}
 * @solution
 * 1. Same as invert binary tree. https://leetcode-cn.com/problems/invert-binary-tree/
 * 2. Divide and Conquer
 * 3. Recursion break : null pointer node
 * 4. Divide done to bottom leaf.
 * 5. Set right child of current root as left result.
 * 6. Set left child of current root as right result.
 * 7. return current root
 */
var mirrorTree = function(root) {
    if (!root) {
        return null;
    }

    const leftResult = mirrorTree(root.left);
    const rightResult = mirrorTree(root.right);

    root.left = rightResult;
    root.right = leftResult;

    return root;
};
```
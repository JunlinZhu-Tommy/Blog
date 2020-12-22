## Question
输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

例如，给出

前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
返回如下的二叉树：

    3
   / \
  9  20
    /  \
   15   7

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if (
        !preorder || 
        !inorder || 
        preorder.length !== inorder.length
    ) {
        return null;
    }

    // Build Map Between node and index of inorder.
    const inOrderTreeNodeMap = new Map();
    const treeSize = preorder.length;

    for (let i = 0; i < inorder.length; i++) {
        inOrderTreeNodeMap.set(inorder[i], i);
    }

    function buildTree(preorder, inorder, preStart, preEnd, inStart, inEnd) {
        // Break;
        if (preStart > preEnd || inStart > inEnd) {
            return null;
        }

        // Preorder: [Root, ...leftSubtree, ...rightSubtree];
        // Inorder: [...leftSubtree, Root, ...rightSubtree];
        const currentRootNode = new TreeNode(preorder[preStart]);
        const rootNodeIndexOfInOrder = inOrderTreeNodeMap.get(preorder[preStart]);
        const leftSubtreeSize = rootNodeIndexOfInOrder - inStart;

        currentRootNode.left = buildTree(
            preorder, 
            inorder, 
            preStart + 1, 
            preStart + leftSubtreeSize, 
            inStart, 
            rootNodeIndexOfInOrder - 1
        );

        currentRootNode.right = buildTree(
            preorder, 
            inorder, 
            preStart + leftSubtreeSize + 1, 
            preEnd, 
            rootNodeIndexOfInOrder + 1, 
            inEnd,
        );

        return currentRootNode;
    }

    return buildTree(preorder, inorder, 0, treeSize - 1, 0, treeSize -1);
};
```
## Question
给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

示例 1:

输入: n = 4, k = 2
输出:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
示例 2:

输入: n = 1, k = 1
输出: [[1]]

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/uUsW3B
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## Solution
```javascript
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const results = []

    if (k < 0 || n < 0) {
        return results
    }

    dfs(n, 1, k, [], results)

    return results
};

function dfs(n, index, k, currentCombo, results) {
    if (currentCombo.length === k) {
        results.push([...currentCombo])
        return
    }

    for (let i = index; i <= n; i++) {
        currentCombo.push(i)
        dfs(n, i + 1, k, currentCombo, results)
        currentCombo.pop()
    }
}
```
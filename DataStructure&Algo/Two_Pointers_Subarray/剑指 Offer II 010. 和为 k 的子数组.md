## Question
https://leetcode.cn/problems/QTMn0o/

## Solution
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    if (!nums || nums.length === 0) {
        return 0
    }

    const prefixSumMap = new Map([[0, 1]])
    let sum = 0
    let count = 0

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i]

        if (prefixSumMap.has(sum - k)) {
            count += prefixSumMap.get(sum - k)
        }

        if (prefixSumMap.has(sum)) {
            prefixSumMap.set(sum, prefixSumMap.get(sum) + 1)
        } else {
            prefixSumMap.set(sum, 1)
        }
    }

    return count
};
```
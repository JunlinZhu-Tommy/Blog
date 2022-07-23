/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

var maxSlidingWindow = function(nums, k) {
    const totalNums = nums.length
    const monotonicQueue = []
    const result = []

    for (let i = 0; i < k; i++) {
        while (
            monotonicQueue.length > 0 && 
            nums[i] >= nums[monotonicQueue[monotonicQueue.length - 1]]
        ) {
            monotonicQueue.pop()
        }

        monotonicQueue.push(i)
    }

    monotonicQueue.length > 0 && result.push(nums[monotonicQueue[0]])

    for (let i = k; i < totalNums; i++) {
        while (
            monotonicQueue.length > 0 && 
            nums[i] >= nums[monotonicQueue[monotonicQueue.length - 1]]
        ) {
            monotonicQueue.pop()
        }

        monotonicQueue.push(i)

        while (i - k >= monotonicQueue[0]) {
            monotonicQueue.shift()
        }

        result.push(nums[monotonicQueue[0]])
    }

    return result
};
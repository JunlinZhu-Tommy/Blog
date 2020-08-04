## Question

Given a sorted (in ascending order) integer array nums of n elements and a target value, write a function to search target in nums. If target exists, then return its index, otherwise return -1.


## Solution
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    if (!nums || !nums.length === 0) {
        return -1;
    }

    let start = 0, end = nums.length -1;
    while (start + 1 < end) {
        const mid = Math.floor(start + (end - start) / 2);

        if (target === nums[mid]) {
            start = mid;
        } else if (target > nums[mid]) {
            start = mid;
        } else {
            end = mid;
        }
    }

    if (nums[start] === target) {
        return start;
    } else if (nums[end] === target) {
        return end;
    }

    return -1;
}
```
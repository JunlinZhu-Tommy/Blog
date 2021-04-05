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
    if (!nums || nums.length === 0) {
        return -1;
    }

    let left = 0, right = nums.length - 1;

    while (left + 1 < right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (nums[mid] > target) {
            right = mid;
        } else if (nums[mid] < target) {
            left = mid;
        } else {
            left = mid;
        }
    }

    if (nums[left] === target) {
        return left;
    }

    if (nums[right] === target) {
        return right;
    }

    return -1;
};
```
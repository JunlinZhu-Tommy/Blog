## Question

Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

(i.e.,  [0,1,2,4,5,6,7] might become  [4,5,6,7,0,1,2]).

Find the minimum element.

You may assume no duplicate exists in the array.

## Solution
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    if (!nums || nums.length === 0) {
        return -1;
    }
    
    let start = 0, end = nums.length - 1;
    if (nums[start] < nums[end]) {
        return nums[start];
    }

    while (start + 1 < end) {
        const mid = Math.floor(start + (end - start) / 2);

        // Increasing Part, move to right.
        if (nums[mid] >= nums[0]) {
            start = mid;
        // Decreasing Part, move to left.
        } else if (nums[mid] < nums[0]) {
            end = mid;
        }
    }

    return Math.min(nums[start], nums[end]);
};
```
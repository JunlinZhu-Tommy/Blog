## Question
统计一个数字在排序数组中出现的次数。

## Solution
```javascript
// Binary Search
// Find left index by first element of target.
// Find right index by last element of target.
// Then right - left + 1
var search = function(nums, target) {
    if (!nums || nums.length === 0) {
        return 0;
    }

    let left = null, right = null;
    let start = 0;
    let end = nums.length - 1;

    while (start + 1 < end) {
        const mid = Math.floor(start + (end -start) / 2);
        
        if (nums[mid] >= target) {
            end = mid;
        } else {
            start = mid;
        }
    }

    if (nums[start] === target) {
        left = start;
    } else if (nums[end] === target) {
        left = end;
    } else {
        return 0;
    }

    start = 0;
    end = nums.length - 1;
    
    while (start + 1 < end) {
        const mid = Math.floor(start + (end - start) / 2);

        if (nums[mid] <= target) {
            start = mid;
        } else {
            end = mid;
        }
    }

    if (nums[end] === target) {
        right = end;
    } else if (nums[start] === target) {
        right = start;
    } else {
        return 0;
    }
    
    return right - left + 1;
};
```
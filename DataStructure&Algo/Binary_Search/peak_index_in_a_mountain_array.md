## Question
Let's call an array A a mountain if the following properties hold:

A.length >= 3
There exists some 0 < i < A.length - 1 such that A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... > A[A.length - 1]
Given an array that is definitely a mountain, return any i such that A[0] < A[1] < ... A[i-1] < A[i] > A[i+1] > ... > A[A.length - 1].

## Solution
```javascript
/**
 * @param {number[]} A
 * @return {number}
 */
var peakIndexInMountainArray = function(A) {
    if (!A || A.length === 0) {
        return -1;
    }

    let start = 0, end = A.length -1;
    while (start + 1 < end) {
        const mid = Math.floor(start + (end - start) / 2);
        
        // Increasing part, move to right
        if (A[mid] < A[mid + 1]) {
            start = mid;
        } else {
            end = mid;
        }
    }

    if (A[start] > A[end]) {
        return start;
    } else if (A[start] < A[end]) {
        return end;
    }

    return -1;
};
```
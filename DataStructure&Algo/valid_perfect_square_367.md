## Question

Given a positive integer num, write a function which returns True if num is a perfect square else False.

Follow up: Do not use any built-in library function such as sqrt.

## Solution
```javascript
/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function(num) {
    if (num < 0) {
        return false;
    }

    let start = 1, end = num;
    while (start + 1 < end) {
        const mid = Math.floor(start + (end - start) / 2);
        const squareMid = mid * mid;

        if (squareMid === num) {
            return true;
        } else if (squareMid < num) {
            start = mid;
        } else {
            end = mid;
        }
    }

    if (start * start === num || end * end === num) {
        return true;
    }

    return false;
};
```
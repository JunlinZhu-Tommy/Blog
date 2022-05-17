## Solution
```javascript
/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

const X_DIRECTIONS = [1, 0, 0, -1]
const Y_DIRECTIONS = [0, 1, -1, 0]

function computeDigitsSum(num) {
    let sum = 0

    while (num !== 0) {
        sum = sum + num % 10
        num = Math.floor(num / 10)
    }

    return sum
}

function isValid(rowSize, colSize, x, y, k) {
    if (x < 0 || x >= rowSize || y < 0 || y >= colSize) {
        return false
    }

    const digitsSum = computeDigitsSum(x) + computeDigitsSum(y)

    if (digitsSum > k) {
        return false
    }

    console.log(x, y)
    return true
}
var movingCount = function(m, n, k) {
    if (k === 0) {
        return 1
    }

    const queue = [{
        x: 0,
        y: 0,
    }]
    const visited = new Set([`${0}-${0}`])

    while (queue.length > 0) {
        const position = queue.shift()

        for (let i = 0; i < X_DIRECTIONS.length; i++) {
            const nextX = position.x + X_DIRECTIONS[i]
            const nextY = position.y + Y_DIRECTIONS[i]
            const key = `${nextX}-${nextY}`

            if (!visited.has(key) && isValid(m, n, nextX, nextY, k)) {
                queue.push({
                    x: nextX,
                    y: nextY,
                })
                visited.add(key)
            }
        }
    }

    return visited.size
};
```
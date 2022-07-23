## Question
https://leetcode.cn/problems/dui-lie-de-zui-da-zhi-lcof/

## Solution
```javascript
var MaxQueue = function() {
    this.queue = []
    this.maxValueQueue = []
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function() {
    if (this.queue.length === 0) {
        return -1
    }

    return this.maxValueQueue[0]
};

/** 
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function(value) {

    while (this.maxValueQueue.length !== 0 && this.maxValueQueue[this.maxValueQueue.length - 1] < value) {
        this.maxValueQueue.pop()
    }

    this.queue.push(value)
    this.maxValueQueue.push(value)
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function() {
    if (this.queue.length === 0) {
        return -1
    }

    const value = this.queue.shift()

    if (value === this.maxValueQueue[0]) {
        this.maxValueQueue.shift()
    }

    return value
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */
```
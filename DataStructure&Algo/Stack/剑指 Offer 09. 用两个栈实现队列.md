## Question
https://leetcode.cn/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/

## Solution
```javascript
var CQueue = function() {
    this.inStack = []
    this.outStack = []
};

CQueue.prototype.inToOut = function() {
    while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop())
    }
}

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.inStack.push(value)
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if (this.outStack.length === 0) {
        this.inToOut()
    }

    if (this.outStack.length > 0) {
        return this.outStack.pop()
    }
    
    return -1
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
```
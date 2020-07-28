## bind() 函数

bind() 方法创建一个新的函数，在bind函数被调用时，这个新函数的this为bind()第一个参数，其余参数将作为新函数的参数，在调用时被传入。

bind() 两个特点

- 返回一个函数，并this为第一个参数。
- 可以传入参数供返回的函数调用。

## Example


## Implementation
```javascript
Function.prototype.bind2 = function(context) {
  var bindedFn = this;

  return function() {
    return bindedFn.apply(contest);
  }
}
```
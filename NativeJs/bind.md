## bind() 函数

bind() 方法创建一个新的函数，在 bind 函数被调用时，这个新函数的 this 为 bind()第一个参数，其余参数将作为新函数的参数，在调用时被传入。

bind() 两个特点

- 返回一个函数，并 this 为第一个参数。
- 可以传入参数供返回的函数调用。

## Implementation V1

```javascript
Function.prototype.bind2 = function (context) {
  var bindedFn = this;

  return function () {
    return bindedFn.apply(context);
  };
};

var foo = {
  value: 4,
};

function bar() {
  return this.value;
}

const boundedBar = bar.bind2(foo);
boundedBar();
```

## Implementation V2

We also need to provide the functionality of passing arguments into bind function.

```javascript
Function.prototype.bind3 = function (context) {
  var bindedFn = this;
  var bindedArgs = Array.prototyps.slice.call(arguments, 1);

  return function () {
    var passedArgs = Array.prototype.call(arguments);

    return bindedFn.apply(context, bindedArgs.concat(passedArgs));
  };
};

var foo = {
  value: 1,
};

function bar(name, age) {
  console.log(this.value);
  console.log(name);
  console.log(age);
}

var bindFoo = bar.bind(foo, "daisy");
bindFoo("18");
```

## Implementation V3

function.bind(thisArg[, arg1[, arg2[, ...]]])

thisArg

调用绑定函数时作为 this 参数传递给目标函数的值。 如果使用 new 运算符构造绑定函数，则忽略该值。

```javascript
Function.prototype.bind4 = function (context) {
  var bindedFunc = this;
  var bindedArgs = Array.prototype.slice(arguments, 1);

  var retFunc = function () {
    var passedArgs = Array.prototype.slice(arguments);

    return bindedFunc.apply(
      this instanceof bindedFunc ? this : context,
      bindedArgs.concat(passedArgs)
    );
  };

  retFunc.prototype = this.prototype;

  return retFunc;
};

var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind4(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
```

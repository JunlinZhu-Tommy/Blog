## bind() 函数

bind() 方法创建一个新的函数，在 bind 函数被调用时，这个新函数的 `this` 为 `bind` ()第一个参数，其余参数将作为新函数的参数，在调用时被传入。

- 返回一个函数，并 this 为第一个参数。
- 可以传入参数供返回的函数调用。

## Implementation V1

```javascript
Function.prototype.bind2 = function (context) {
  // bindedFn.bind()
  var bindedFn = this; 

  return function () {
    //Use apply to change the context.
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

## Implementation V2 (可以传入参数供返回的函数调用)

```javascript
Function.prototype.bind3 = function (context) {
  var bindedFn = this;
  // We also need to provide the functionality of passing arguments into bind function.
  // Get passed default arguments.
  var bindedArgs = Array.prototype.slice.call(arguments, 1);

  return function () {
    // Get currently passed arguments and concatenated with default ones by
    // bindedArgs.concat(passedArgs);
    var passedArgs = Array.prototype.slice.call(arguments);

    return bindedFn.apply(context, bindedArgs.concat(passedArgs));
  };
};


// Example
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

    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return bindedFunc.apply(
      this instanceof retFunc ? this : context,
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

## Reference
- https://github.com/mqyqingfeng/Blog/issues/12

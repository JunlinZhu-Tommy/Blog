### Definition

The call() method calls a function with given this value and arguments provided individually.

### Example 
```javascript
var foo = {
  value: 1,
}

function bar() {
  console.log(this.value);
}

bar.call(foo); // Output: 1
```

### How the `call` function works and how to implement it ?

The call() allows for a function/method belonging to one object to be assigned and called for a different object and a simple pseudocode could be like this:
```javascript
fn.call(obj, args):
obj.fn = fn;
obj.fn();
delete obj.fn
```

### Implementation V1

```javascript
Function.prototype.call2 = function(obj) {
    obj.fn = this;
    obj.fn();
    delete obj.fn;
}

// Test
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call2(foo); // Output : 1.
```


// 第二版
Function.prototype.call2 = function(context) {
  var context = context || window;

  context.fn = this;
  var args = [];

  for(var i = 1, len = arguments.length; i < len; i++) {
    args.push(arguments[' + i + ']);
  }

  eval('context.fn('+ args + ')')
  delete context.fn;
}

// Apply

Function.prototype.myApply = function(context, argsArr) {
  var context = context || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];

    for (var i = 0; i < argsArr.length; i++) {
      args.push(argsArr[i]);
    }
    
    result = eval('context.fn(' + args + ')')
  }

  delete context.fn;
  return result;
}
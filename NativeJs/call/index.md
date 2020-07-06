## Definition

The call() method calls a function with given this value and arguments provided individually.

#### Example 
```javascript
var foo = {
  value: 1,
}

function bar() {
  console.log(this.value);
}

bar.call(foo); // Output: 1
```

## How the `call` function works and how to implement it ?

The call() allows for a function/method belonging to one object to be assigned and called for a different object and a simple pseudocode could be like this:
```javascript
fn.call(obj, args):
obj.fn = fn;
obj.fn();
delete obj.fn
```

#### Implementation V1

```javascript
Function.prototype.call2 = function(context) {
  context.fn = this;
  context.fn();
  delete context.fn;
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

#### Implementatio V2

Then we need to support `argument` provided individually.

```javascript
// bar.call(foo, 'kevin', 18);

Function.prototype.call2 = function(context) {
  context.fn = this;

  // Extract pre-defined arguments
  var args = [];

    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

  eval('context.fn(' + args +')');
  delete context.fn;
}

function bar(name, age) {
  console.log(this.value)
  console.log(name)
  console.log(age);
}

var foo = {
  value : 1,
}

bar.call2(foo, 'kevin', 18);
```
#### Implementation V3

Two More Specifications: 

- `If the method is a function in non-strict mode, null and undefined will be replaced with the global object, and primitive values will be converted to objects.`

- `The result of calling the function with the specified this value and arguments.`

```javascript
// bar.call(foo, 'kevin', 18);

Function.prototype.call2 = function(context) {
  var realContext = context || window;
  realContext.fn = this;

  // Extract pre-defined arguments
  var args = [];

    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

  var result = eval('realContext.fn(' + args +')');
  delete realContext.fn;

  return result;
}

function bar(name, age) {

  return {
    name,
    age,
    value: this.value
  }
}

var foo = {
  value : 1,
}

bar.call2(foo, 'kevin', 18);
```
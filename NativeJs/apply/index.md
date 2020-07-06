## Definition

apply() method calls function with a given `this` value, and arguments provided as an array. 

#### Example

```javascript
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);

console.log(max);
// expected output: 7

const min = Math.min.apply(null, numbers);

console.log(min);
// expected output: 2

```


## Implementation (Similar To call())

```javascript
Function.prototype.apply = function(context, arr) {
  var context = context || window;
  context.fn = this;
  var result;

  if (!arr) {
    result = context.fn();
  } else {
    var args = [];

    for (var i = 0; i < arr.length; i++) {
      args.push(arr[i]);
    }

    result = eval('context.fn(' + args + ')');
  }

  delete context.fn;
  return result;
}
```

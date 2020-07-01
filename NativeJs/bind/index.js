var foo = {
  value: 1,

}

function bar() {
  console.log(this.value);
}

var bindFoo = bar.bind(foo);

bindFoo() // 1;

Function.prototype.bind = function (context) {
  var fnToBind = this;
  // 参数处理

  var bindArgs = Array.prototype.slice.call(arguments, 1);
  return function () {
    var callingArgs = Array.prototype.slice.call(arguments);

    return fnToBind.apply(context, bindArgs.concat(callingArgs));
  }
}


// bindFun 被 newcall 时，之前bind的 this不起作用。

Function.prototype.newBind = function(context) {
  var functionToBind = this;
  var bindCallArgs = Array.prototype.slice.call(arguments, 1);

  var bindedFunction = function () {
    var callingArgs = Array.prototype.slice.call(arguments, 0);

    return self.apply(this instanceof bindedFunction ? this : functionToBind, bindCallArgs.concat(callingArgs));
  }

  bindedFunction.prototype = this.prototype;
  return fnToBind;
}


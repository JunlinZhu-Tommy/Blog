// 将函数设为对象的属性
// 执行该函数
// 删除该函数

// foo.fn = bar;
// foo.fn();
// delete foo.fn;

// 第一版
Function.prototype.call2 = function(context) {
    // 首先要获取调用call的函数，用this可以获取
    context.fn = this;
    context.fn();
    delete context.fn;
}

// 测试一下
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call2(foo); // 1

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
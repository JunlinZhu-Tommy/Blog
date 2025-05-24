// func.call(thisArg, ...args)

Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("myCall must be called on a function");
  }

  context = context || window;

  const fnSymbol = Symbol();

  context[fnSymbol] = this;

  const res = context[fnSymbol](...args);

  delete context[fnSymbol];

  return res;
};

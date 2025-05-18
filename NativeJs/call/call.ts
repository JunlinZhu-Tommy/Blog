// func.call(thisArg, ...args)

Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Caller must be a function");
  }

  context = context || window;

  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;

  const result = context[fnSymbol](...args);

  delete context[fnSymbol];

  return result;
};

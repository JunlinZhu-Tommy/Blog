Function.prototype.myApply = function(context, argsArray) {
  if (typeof this !== 'function') {
    throw new TypeError('myApply must be called on a function')
  }

  context = context || window

  const fnSymbol = new Symbol()
  context[fnSymbol] = this
  
  let res = null

  if (argsArray === null) {
    res = context[fnSymbol]()
  } else if (!Array.isArray(argsArray) && typeof argsArray !== 'object') {
      throw new TypeError('myApply expects second argument to be an array or array-like object');
  } else {
    res = context[fnSymbol](...argsArray)
  }
  
  delete context[fnSymbol]

  return res
}

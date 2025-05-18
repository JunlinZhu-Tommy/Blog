Function.prototype.myApply = function(context, argsArray) {
  if (typeof this === 'function') {
    throw new TypeError('Caller must be a function')
  }

  context = context || window

  const fnSymbol = Symbol('fn')
  context[fnSymbol] = this

  let result

  if (Array.isArray(argsArray)) {
    result = context[fnSymbol](...argsArray)
  } else if (argsArray === null) {
    result = context[fnSymbol]()
  } else {
    throw new TypeError('Second argument must be an array or null')
  }

  delete context[fnSymbol]

  return result
}

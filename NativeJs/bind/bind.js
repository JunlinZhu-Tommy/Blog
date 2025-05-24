 Function.prototype.myBind = function(context, ...bindArgs) {
  if (typeof this !== 'function') {
    throw new TypeError('myBind must be called on a function')
  }

  const originalFn = this

  function boundFn(...callArgs) {
    const isNew = this instanceof boundFn

    const thisArg = isNew ? this : context

    return originalFn.apply(
      thisArg,
      [...bindArgs, ...callArgs]
    )
  }

  if (originalFn.prototype) {
    boundFn.prototype = Object.create(originalFn.prototype)
  }

  return boundFn
}
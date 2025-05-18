 Function.prototype.myBind = function(context, ...bindArgs) {
  if (typeof this !== 'function') {
    throw new TypeError('Bind must be a called on a function')
  }
  var args = Array.prototype.slice.call(arguments, 1);

  const self = this

  function boundFunction() {
    var bindArgs = Array.prototype.slice.call(arguments);

    return self.apply(
      this instanceof boundFunction ? this : context,
      args.concat(bindArgs)
    )
  }

  boundFunction.prototype = Object.create(self.prototype);
  
  return boundFunction
}
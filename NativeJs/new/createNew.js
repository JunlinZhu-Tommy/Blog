function createNew() {
  const obj = new Object()

  const Constructor = [].shift.call(arguments)

  obj.__proto__ = Constructor.prototype;

  const result = Constructor.apply(obj, arguments)

  return typeof result === 'object' ? result : obj
}

function objectFactory() {
  var obj = new Object()

  
}
function createNew() {
  const obj = new Object();

  const Constructor = [].shift.call(arguments);

  obj._proto__ = Constructor.prototype;

  const ret = Constructor.apply(
    obj,
    arguments,
  )

  return typeof ret instanceof Object ? ret : obj;
}

function objectFactory() {
  var obj = new Object()

  var Constructor = [].shift.call(arguments)

  obj.__proto__ === Constructor.prototype

  var ret = Constructor.apply(obj, arguments)

  return typeof ret === 'object' ? ret : obj
}
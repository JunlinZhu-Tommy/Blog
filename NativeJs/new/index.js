// The new operator lets developers create an instance of a user-defined object type 
// or of one of the built-in object types that has a constructor function.

/*
  new Factory

  function Person() {
    ...
  }

  // USE NEW
  var person = new Person(args);

  // USE NEW FACTORY
  var person = objectFactory(Person, args)
*/

function objectFactory() {
  var obj = new Object();
  
  // get Person
  var Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;

  const ret = Constructor.apply(obj, arguments);

  return typeof ret === 'object' ? ret : obj;
}




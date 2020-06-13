// 创建对象

/*
 工厂模式
*/

function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;

  o.sayName = function () {
    alert(this.name);
  }

  return o;
}

/*
 new 语法
*/

// new Junlin()
// objectFactory(Junlin,)

function objectFactory() {
  var obj = new Object(),

  Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;

  var ret = Constructor.apply(obj, arguments);

  return typeof ret === 'object' ? ret : obj;
}

function hasPrototypeProperty(object, name) {
  return !object.hasOwnProperty(name) && (name in object);
}


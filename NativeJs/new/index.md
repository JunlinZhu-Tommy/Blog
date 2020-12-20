## 1. Defnition 

The new operator lets developers create an instance of a user-defined object type 
or of one of the built-in object types that has a constructor function.

```javascript
function Okatu(name, age) {
  this.name = name;
  this.age = age;
}

Okatu.prototype.strength = 60;
Okatu.prototype.sayYourName = function () {
  console.log('I am' + this.name);
}

var person = new Okatu('Kevin', 18);
console.log(person.name)
console.log(person.habit)
console.log(person.strength)

person.sayYourName();
```

## 2. What `new` really does ? 

After create person by new then we can access: 

- Okatu properties defined inside Okatu constructor(). 
- Okatu properties defined inside Okatu prototype.

So inside `new`
1. Create an new object.
2. Apply Okatu constructor properties into object.
3. Assign `__proto__` on constructor function prototype.
4. return object.

## 3. Implementation 

### V1

We can not override `new` directly, so, we have to create our own new-like factory which named objectFactory().

```javascript
function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}


function objectFactory() {

  // Create new empty object
  // 创建一个新的对象。
  var obj = new Object();

  // Get first arguement : var person = objectFactory(Okatu, ...);
  // 取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数
  Constructor = [].shift.call(arguments);

  // Assign constructor prototype to instance __proto__
  // 将 obj 的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性
  obj.__proto__ = Constructor.prototype;

  // Assign properties defined in constructor function to instance
  // 使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
  Constructor.apply(obj, arguments);

  // Return the instance
  // 返回obj
  return obj;
}

var person = objectFactory(Otaku, 'Kevin', '18')

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin
```

### V2 (Handle case when there is an return object in constructor function)

According to description of new syntax on MDN:

- Creates a blank, plain JavaScript object;
- Links (sets the constructor of) this object to another object;
- Passes the newly created object from Step 1 as the this context;
- Returns this if the function doesn't return an object.

#### Example:

Where there is an return object

```javascript
function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return {
        name: name,
        habit: 'Games'
    }
}

var person = new Okatu(`Kevin`, '18');


console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined (no properties in this)
console.log(person.age) // undefined (no properties in this)
```
Where there is an primitive type value returned

```javascript
function Okatu (name, age) {
  this.strength = 60;
  this.age = age;

  return `handsome boy`;
}

var person = new Okatu('Kevin', '18');
console.log(person.name)
console.log(person.habit)
console.log(person.strength)
console.log(person.age);
```

So we should test the returned type of constructor function

```javascript
function objectFactory() {
  var obj = new Object();
  
  Constructor = [].shift.call(arguments);

  obj.__proto__ = Constuctor.prototype;

  var ret = Constructor.apply(obj, arguments);

  // Check the typeof return object of constructor function.
  return typeof ret === 'object' ? ret : obj;
}
```
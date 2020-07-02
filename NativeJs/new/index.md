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

After create person by new then we can: 

- Access Okatu properties defined inside Okatu constructor(). 
- Access Okatu properties defined inside Okatu prototype.

1. Create an new object.
2. Apply Okatu constructor properties into object.
3. Assign __proto__ on constructor function prototype.
4. return object.

## 3. Implementation

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
  var obj = new Object();

  Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;

  Constructor.apply(obj, arguments);

  return obj;
}

var person = objectFactory(Otaku, 'Kevin', '18')

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin
```



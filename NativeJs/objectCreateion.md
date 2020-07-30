## Object Creation

A simple review on different ways of create object.


## Factory Mode

Using general function to create Object.

```javascript
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  
  o.sayName = function() {
    console.log(this.name);
  }

  return o;  
}

var person1 = createPerson('Tommy', 20, 'SE');
var person2 = createPerson('Junlin', 28, 'PM');
```

Drawback: Lack of ways to determine which type of Object the instance belongs to.

## Constructor Function

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;

  this.sayName = function() {
    console.log(this.name);
  }
}

var person1 = new Person('Tommy', 20, 'SE');
var person2 = new Person('Junlin', 28, 'PM');
```

Pro: `instanceof` to determine the type of object.
Con: each function defined inside constructor function will be created for each instance.

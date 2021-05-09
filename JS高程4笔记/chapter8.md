## 8.4 类

- 定义类两种方式: 类声明和类表达式.
```javascript
class Person() {} // 声明

var classExpress = class {}; // 表达式
```
- 与函数类似，类表达式在他们被求值之前不能引用, 与函数不同在于，类声明无法提升，函数则可以。
- 类受块级作用域限制，函数受函数作用域限制。
- 方法名 constructor 会告诉解释器在使用new操作符创建类实例时，应当调用这个函数。new调用构造函数时执行如下
  - 内存中创建新对象。
  - object.__proto__ = Constructor.prototype;
  - this = obj;
  - var ret = Construtor();
  - return typeof ret !== 'object' ? this : ret;

- 类构造函数与构造函数区别在于如果不使用new调用，构造函数this为window, 类构造函数则会报错。
- 确定实例是否为类的实例，p instanceof Person (类标签符).
- 使用extends关键字，继承任何拥有[[Construct]]和原型的对象。
- 派生类方法中可以使用super关键字引用他们的原型，只能在派生类中使用并且仅限于构造函数 （调用父类构造函数），实力方法，静态方法。
- 通过super调用自称的类上面的静态方法。
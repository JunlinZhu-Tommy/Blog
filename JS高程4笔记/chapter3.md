# Chapter 3

## 3.3 变量
- var
- let
- const

### 3.3.1 var 关键字
```javascript
var message; // 不初始化情况下，变量保存undefined.
```

#### var 声明作用域

使用var操作符定义的变量会成为包含它的函数的局部变量，在函数退出时会被销毁。
如果省略var操作符，可以创建一个全局变量，严格模式下则抛出ReferenceError.

```javascript
function test() {
  var message = "hi";
}

test();
console.log(message) // Error.

function test() {
  message = "hi";
}

test();
console.log(message)  //hi
```

#### var 声明提升

```javascript
function foo() {
  console.log(age);
  var age = 26;
}

foo(); //undefined;

// 等价于
function foo() {
  var age;
  console.log(age);
  age = 26;
}

foo(); // undefined;
// 这就是 hoist, 也就是所变量声明都拉到函数作用域顶部。

// 反复使用var声明同一变量也没有问题
function foo() {
  var age = 16;
  var age = 26;
  var age = 36;

  console.log(age);
}
```

### 3.3.2 let 声明

1. let声明范围是块作用域，var则是函数作用域。
2. let 不允许同一作用域重复声明, js引擎记录变量声明表示服及其所在作用域，嵌套使用相同标实符不会报错.

```javascript
if (true) {
  var name = "matt";
  console.log(name); // Matt
}

console.log(name); // Matt

if (true) {
  let age = 26;
  console.log(age);
}

console.log(age); // ReferenceError

// 同作用域不允许重复声明
let age2 = 1;
let age2 = 2; // SyntaxError

// 嵌套作用域允许
let age = 30;
console.log(age);

if (true) {
  let age = 26;
  console.log(age);
}
```
3. let 声明变量不会在作用域中被提升。

js引擎解析代码时，也会注意后面let声明，只不过在之前不能以任何方式引用未声明的变量，及在let声明执行前瞬间被称为暂时性死区。
```javascript
console.log(name); // undefined;
var name = "matt" 

console.log(age); // Reference Error
let age = 26;
```

4. 全局声明, 使用let声明的变量不会成为window对象属性，var则会。
```javascript
var name = 'Matt';
console.log(window.name); // Matt

let age = 26;
console.log(window.age); // undefined
```

5. for循环中的let声明

for循环定义中如果使用var生成迭代变量会流出到循环体外部。
let 声明迭代变量时，js引擎在后台会为每一个迭代循环声明一个新的迭代变量。
setTimeout 引用的都是不同的变量实例， console.log输出也是我们期望的值。
```javascript
for (var = i; i < 5; i++) {
  // 流出到循环体外部
  setTimeout(() => console.log(i));
}

// 5 5 5 5 5

for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i));
}
```
### 3.3.3 const 声明
行为基本与let相同, 唯一一个重要区别是用它声明变量时必须同时初始化变量, 且尝试修改const声明的变量会导致运行时出现错误。
const声明的限制只适用于它指向的变量引用, 换句话说, 如果const变量引用的时一个对象, 那么修改这个对象内部的属性并不违反const限制。

```javascript
const person = {};
person.name = 'matt';
```


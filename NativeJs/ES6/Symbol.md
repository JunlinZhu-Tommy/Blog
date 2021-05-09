## Symbol 类型
- 符号是原始值，唯一的，不可变的, 主要用途是来确保对象属性使用的唯一标识符，不会发生属性冲突的危险。
```javascript
let sym = Symbol() // new 会报错。
console.log(typeof sym) // symbol
```

- Symbol.for 方法创建全局注册表.
```javascript
let fooGlobalSymbol = Symbol.for('foo'); // 如果没有对应符号，会创建。
console.log(typeof fooGlobalSymbol) // symbol

let fooGlobalSymbol = Symbol.for('for');
let otherFooGlobalSymbol = Symbo.for('for');

console.log(fooGlobalSymbol === otherFooGlobalSymbol) //true
```

- Symbol.keyFor() 查询全局注册表。
```javascript
let s = Symbol.for('foo');
console.log(Symbol.keyFor(s)); // foo;
```

- 使用符号作为属性。
```javascript
let s1 = Symbol('foo');
let s2 = Symbol('bar');

let o = {
  [s1]: 'foo val',
}

Object.defineProperties(o, {
  [s1]: {value: 'baz, val'},
  [s2]: {value: 'quz, val'},
});

Object.getOwnPropertySymbols(o); //返回symbol属性
Object.getOwnPropertyDescriptors(); // 所有属性。
```
- 常用内置符号都是不可写，不可枚举，不可配置。
  - Symbol.iterator.
  - Symbol.asyncIterator
  - Symbol.hasInstance 对象是否会构造器实例 `Foo[Symbol.hasInstance](f)`;
  - Symbol.isConcatSpreadable.
  - 


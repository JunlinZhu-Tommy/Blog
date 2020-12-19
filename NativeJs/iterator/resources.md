## 迭代


#### 迭代器

只有实现了一个拥有以下语义（semantic）的 next() 方法，一个对象才能成为迭代器:

- done（boolean）如果迭代器可以产生序列中的下一个值，则为 false。（这等价于没有指定  done 这个属性。）如果迭代器已将序列迭代完毕，则为 true。这种情况下，value 是可选的，如果它依然存在，即为迭代结束之后的默认返回值。

- value
迭代器返回的任何 JavaScript 值。done 为 true 时可省略
#### 可迭代对象
实现了 @@iterator 方法的对象称为可迭代对象，也就是说该对象必须有一个名字是 [Symbol.iterator] 的属性，这个属性是一个函数，返回值必须是一个迭代器。

#### 生成器即是可迭代对象也是迭代器
```javascript
function * generateFunc() {
  let c = 0;
  while(true) yield ++c;
}

const generatorObject = generateFunc();

console.log(generatorObject.next()); 
console.log(generatorObject[Symbol.iterator]());
```
### Reference
- https://juejin.cn/post/6844904025167495181#heading-17

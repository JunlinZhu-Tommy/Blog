## Generator

### Overview

### return()

### throw()

```javascript
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    try {
      yield x;
    } catch (e) {
      console.log("inner error", e);
    }
  }
}

const generatorObj = generatorFn();

generatorObj.next();
console.log("Outer", generatorObj.throw("foo injected"));
generatorObj.next();
```

### References

- https://juejin.cn/post/6844903527039533064

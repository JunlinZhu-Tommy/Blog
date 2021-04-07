## Webpack Loader

- 本质是一导出为函数的Javascript模块。
- loader-runner负责调用该函数, 并将上一个loader产生的结果或者资源文件传入。
- 处理结果为String或者Buffer, sourcemap为可选。

### Usage
```javascript

// Sync
module.exports = function(content, sc, meta) {
  return someActions(content);
}

// Async
module.exports = function(content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function(err, result) {
    if (err) return callback(err);
    callback(null, result, map, meta);
  });
};
```

### 调用顺序
```javascript
use: [
  'a-loader',
  'b-loader',
  'c-loader'
]


|- a-loader `pitch`
  |- b-loader `pitch`
    |- c-loader `pitch`
      |- requested module is picked up as a dependency
    |- c-loader normal execution
  |- b-loader normal execution
|- a-loader normal execution
```


## References && Resources
- [Webpack-Loader-1](https://github.com/DDFE/DDFE-blog/issues/39)
- [Webpack-Loader-2](https://github.com/DDFE/DDFE-blog/issues/40)
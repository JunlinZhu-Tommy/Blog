## Dead Code Elimination
- 代码不会被执行，不可到达
- 代码执行的结果不会被用到
- 代码只会影响死变量（只写不读）

## Tree Shaking
- Tree-shaking的本质是消除无用的js代码

### Why ? 
- javascript绝大多数通过网络请求获得，减少代码文件打包后的提及，能显著提升性能。
  
### ES6 Module
- 只能作为顶层语句出现。
- import 模块名只能是字符串常量。
- import binding 是immutable.

依赖关系确定，和runtime状态无关，可以依靠静态分析做出消除优化。


### Usage:
```javascript
// index.js

import { post } from './utils';

let baz = () => {
  post();
  
  let x = 1; 
  console.log(x);

  function unused() {
    return 5;
  }

  return x;
}

// utils.js
export function post() {
  console.log('post');
}

export function get() {
  console.log('get');
}

// no get function in bundle.
// https://juejin.cn/post/6844903544756109319
```
### 缺陷
- javascript 动态语言特性会使treeshaking变的困难, 例子如下。
  
```javascript
function menu() {

}

Menu.prototype.show = function() {

}

Array.prototype.unique = function() {
  //
}

export default Menu
```

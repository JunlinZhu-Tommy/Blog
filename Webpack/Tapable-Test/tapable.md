## TAPABLE
- https://juejin.im/post/6844903750729990152#heading-2

### 使用
- https://juejin.im/post/6844903895584473096


webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable，
webpack中最核心的负责编译的Compiler和负责创建bundles的Compilation都是Tapable的实例.

```javascript
const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");
复制代码

class Order {
  
  constructor() {
    this.hooks = {
      startHooks: new SyncHook
    }    
  }
}

```
### 源码分析
- https://juejin.im/post/6844903898088472589
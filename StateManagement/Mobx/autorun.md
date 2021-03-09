## autorun

### 第一次运行 autorun

#### 一个新的 Reaction 诞生了

https://github.com/mobxjs/mobx/blob/v6.0.2/src/api/autorun.ts#L51

#### Reaction 执行 autorun 里面定义的任务

- Executes the provided function `f` and tracks which observables are being accessed.
  https://github.com/mobxjs/mobx/blob/v6.0.2/src/core/reaction.ts#L135
  https://github.com/mobxjs/mobx/blob/v6.0.2/src/core/derivation.ts#L178

#### 收集依赖

https://github.com/mobxjs/mobx/blob/v6.0.2/src/core/derivation.ts#L185
https://github.com/mobxjs/mobx/blob/v6.0.2/src/core/derivation.ts#L211

### 当 autorun 里面 observable 发生改变时会发生什么

#### Observable propagateChanged

https://github.com/mobxjs/mobx/blob/v6.0.2/src/core/atom.ts#L68
https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/core/observable.ts#L195\

#### 重来一遍

https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/core/reaction.ts#L74

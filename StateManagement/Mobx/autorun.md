## autorun


### 第一次运行autorun

#### 一个新的Reaction诞生了
https://github.com/mobxjs/mobx/blob/v6.0.2/src/api/autorun.ts#L51

#### Reaction执行autorun里面定义的任务
https://github.com/mobxjs/mobx/blob/v6.0.2/src/core/reaction.ts#L135
https://github.com/mobxjs/mobx/blob/v6.0.2/src/core/derivation.ts#L178

#### 收集依赖
https://github.com/mobxjs/mobx/blob/v6.0.2/src/core/derivation.ts#L185
https://github.com/mobxjs/mobx/blob/v6.0.2/src/core/derivation.ts#L211

### 当autorun里面observable发生改变时会发生什么

#### Observable propagateChanged
https://github.com/mobxjs/mobx/blob/v6.0.2/src/core/atom.ts#L68
https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/core/observable.ts#L195\

#### 重来一遍
https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/core/reaction.ts#L74

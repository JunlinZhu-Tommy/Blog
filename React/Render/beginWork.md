## beginWork

### Mount (current === null)
- HostComponent, FunctionComponent, ClassComponent
  - reconcileChildFibers
    - mountChildFiber = reconcileChildFibers
      - placeSingleChild
        - reconcileSingleElement) which create fiber child and connect with `return` fiber.

### Update

通过对比
```javascript
if (oldProps === newProps && workInProgress.type === current.type) ||
if (!includeSomeLanes(renderLanes, updateLanes))
```

即表示可复用或者优先级不够，即会被
- ```bailoutOnAlreadyFinishedWork```
  - cloneChildFibers
  - reuse dependencies. `workInProgress.dependencies = current.dependencies;`

其余Update则

- HostComponent
  - UpdateHostComponent
    - reconcileChildren
      - reconcileChildFibers
        -  placeSingleChild
          - reconcileSingleElement) which create fiber child and connect with `return` fiber.
          - add Placement Tag.
       - reconcileChildrenArray

- FunctionComponent
  - UpdateFunctionComponent
    - reconcileChildren
      - reconcileChildFibers
        - placeSingleChild
          - reconcileSingleElement) which create fiber child and connect with `return` fiber.
          - add Placement Tag.


#### Special Case (rootFiber mount)
- UpdateHostRoot
  - reconcileChildren(current, workInProgress, nextChildren, renderLanes)
    - reconcileChildFibers
      - placeSingleChild
        - reconcileSingleElement which create fiber child and connect with `return` fiber.
        - add Placement Tag.


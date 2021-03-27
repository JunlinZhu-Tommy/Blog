## Mount Phase aka ReactDom.render()

### FiberRootNode generated
- legacyCreateRootFromDomContainer()
  - createLegacyRoot()
    - new ReactDomLegacyRoot()
      - createFiberRoot() 
        - new FiberRootNode() 
        - uninitializedFiber = createHostRootFiber() 
        - root.current = uninitializedFiber
        - init updateQueue

### Init Mount Update
- updateContainer
  - requestUpdateLane
  - createUpdate
  - enqueueUpdate
  - ScheduleUpdateOnFiber
  - performSyncWorkOnRoot
  - renderRootSync
    - createWorkInProgress
  - workLoopSync
  - performUnitOfWork
  
### performUnitOfWork Recursively (DFS)
```javascript
while (workInProgress !== null) {
  performUnitOfWork(workInProgress);
}
```
  #### 1. DFS Recursion and `BeginWork`
  - DFS Fiber tree
    - Call beginWork(current, workInProgress, ) on each Fiber node.
      - case HostRoot | FunctionComponent | ClassComponent
        - workInProgress.child = reconcileChildFibers(returnFiber, currentFirstChild, newChild)
          - placeSingleChild  (newFiber.flags |= Placement)
            - reconcileSingleElement (newFiber.return = returnFiber)
      - return workInProgress.child
    - Backtrack on leaf node.
  
  #### 2. Backtrack with `completeWork` 
  - Call completeWork on backtracking.
    - if current Fiber node has sibling, back to 1 on it sibling. line 25304
    - otherwise, backtrack to current Fiber node `return` until to rootFiber. line 25309  
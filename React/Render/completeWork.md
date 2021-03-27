## completeUnitOfWork -> completeWork
```
// Attempt to complete the current unit of work, then move to the next
// sibling. If there are no more siblings, return to the parent fiber.
```

### Mount

- HostComponent
  - createInstance
    - createElement
    - updateFiberProps

  - appendAllChildren (dfs, go to sibling || parent)
  - workInProgress.stateNode = instance;
  - finalizeInitialChildren to init properties.
  
### Update
```
if (current !== null && workInProgress.stateNode != null) {
  updateHostComponent$1(current, workInProgress, type, newProps, rootContainerInstance);
}
```

- prepareUpdate() to get updatePayload
- workInProgress.updateQueue = updatePayload
  
### Build Effects Linked List after completeWork inside completeUnitOfWork
```
// Append all the effects of the subtree and this fiber onto the effect
// list of the parent. The completion order of the children affects the
// side-effect order.

// If this fiber had side-effects, we append it AFTER the children's
// side-effects. We can perform certain side-effects earlier if needed,
// by doing multiple passes over the effect list. We don't want to
// schedule our own side-effect on our own list because if end up
// reusing children we'll schedule this effect onto itself since we're
// at the end.
```

## Reference
- https://react.iamkasong.com/process/completeWork.html#effectlist
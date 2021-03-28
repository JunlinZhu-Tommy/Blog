## Commit Phase

### RECAP: After `Render` aka `renderRootSync` finished

- rootFiber.first keeps an linked list which connect fibers with side effects and fiber.updateQueue keeps updated props.

### Commit Phase starts with `commitRoot(root)`
- commit phase manipulate DOM based on the linked list of effects.
- lifecycle function and hook will trigger in-order in three sub phases (beforeMutation, mutation, layout).

### preparation

#### Clear lanes.
```javascript
  var finishedWork = root.finishedWork;
  var lanes = root.finishedLanes;

  if (finishedWork === null) {

    return null;
  }

  root.finishedWork = null;
  root.finishedLanes = NoLanes;
```
#### Clear out WIP
```javascript
  if (root === workInProgressRoot) {
    // We can reset these now that they are finished.
    workInProgressRoot = null;
    workInProgress = null;
    workInProgressRootRenderLanes = NoLanes;
  } // Get the list of effects.
```

#### Check if finishedWork has effect and connect if to end of effect lists if it has one.
```javascript
  var firstEffect;

  if (finishedWork.flags > PerformedWork) {
    // A fiber's effect list consists only of its children, not itself. So if
    // the root has an effect, we need to add it to the end of the list. The
    // resulting list is the set that would belong to the root's parent, if it
    // had one; that is, all the effects in the tree including the root.
    if (finishedWork.lastEffect !== null) {
      finishedWork.lastEffect.nextEffect = finishedWork;
      firstEffect = finishedWork.firstEffect;
    } else {
      firstEffect = finishedWork;
    }
  } else {
    // There is no effect on the root.
    firstEffect = finishedWork.firstEffect;
  }
```

### Separate pass on different sub-phases.

The commit phase is broken into several sub-phases. We do a separate pass
of the effect list for each phase: all mutation effects come before all
layout effects, and so on.

#### beforeMutation aka commitBeforeMutationEffects
- Read State of host tree right before we mutate it, that is where getSnapshotBeforeUpdate it called.

#### mutation aka commitMutationEffects
- Mutation phase where we mutate host tree.
- Switch fiberRoot current by `root.current = finishedWork`
  
#### layout aka commitLayoutEffects
- Layout phase, where we call effects that read the host tree after it's been mutated. The idiomatic use case for this is layout, but class component lifecycles als fire here.

### end
- https://react.iamkasong.com/renderer/prepare.html#layout%E4%B9%8B%E5%90%8E

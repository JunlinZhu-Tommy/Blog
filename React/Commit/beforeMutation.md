## Before Mutation
```javascript
do {
  invokeGuardedCallback(null, commitBeforeMutationEffects, null)
} while (nextEffect !== null)
```

## `commitBeforeMutationEffects`
```javascript
function commitBeforeMutationEffects() {
  while (nextEffect !== null) {
    var current = nextEffect.alternate;

    // Deal with things related with Blur & Focus
    if (!shouldFireAfterActiveInstanceBlur && focusedInstanceHandle !== null) {
      //
    }

    var flags = nextEffect.flags;

    // 调用 getSnapshotBeforeUpdate
    if ((flags & Snapshot) !== NoFlags) {
      setCurrentFiber(nextEffect);
      commitBeforeMutationLifeCycles(current, nextEffect);
      resetCurrentFiber();
    }

    // 调度 useEffect
    if ((flags & Passive) !== NoFlags) {
      // If there are passive effects, schedule a callback to flush at
      // the earliest opportunity.
      if (!rootDoesHavePassiveEffects) {
        rootDoesHavePassiveEffects = true;
        scheduleCallback(NormalPriority$1, function () {
          flushPassiveEffects();
          return null;
        });
      }
    }

    nextEffect = nextEffect.nextEffect;
  }
}
```

### commitBeforeMutationEffectOnFiber(current, nextEffect)

#### ClassComponent
- Call getSnapShotBeforeUpdate()
```javascript
        if (finishedWork.flags & Snapshot) {
          if (current !== null) {
            var prevProps = current.memoizedProps;
            var prevState = current.memoizedState;
            var instance = finishedWork.stateNode; // We could update instance props and state here,
            // but instead we rely on them being set during last render.
            // TODO: revisit this when we implement resuming.
            
            /**
            {
              if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
                if (instance.props !== finishedWork.memoizedProps) {
                  error('Expected %s props to match memoized props before ' + 'getSnapshotBeforeUpdate. ' + 'This might either be because of a bug in React, or because ' + 'a component reassigns its own `this.props`. ' + 'Please file an issue.', getComponentName(finishedWork.type) || 'instance');
                }

                if (instance.state !== finishedWork.memoizedState) {
                  error('Expected %s state to match memoized state before ' + 'getSnapshotBeforeUpdate. ' + 'This might either be because of a bug in React, or because ' + 'a component reassigns its own `this.state`. ' + 'Please file an issue.', getComponentName(finishedWork.type) || 'instance');
                }
              }
            }
            */

            var snapshot = instance.getSnapshotBeforeUpdate(finishedWork.elementType === finishedWork.type ? prevProps : 
            
            /**
            resolveDefaultProps(finishedWork.type, prevProps), prevState);

            {
              var didWarnSet = didWarnAboutUndefinedSnapshotBeforeUpdate;

              if (snapshot === undefined && !didWarnSet.has(finishedWork.type)) {
                didWarnSet.add(finishedWork.type);

                error('%s.getSnapshotBeforeUpdate(): A snapshot value (or null) ' + 'must be returned. You have returned undefined.', getComponentName(finishedWork.type));
              }
            }

            instance.__reactInternalSnapshotBeforeUpdate = snapshot;

            */
          }
        }

        return;
```
#### FunctionComponent
- Nothing

#### HostComponent
- Nothing
  
#### HostRoot
```javascript
        {
          if (finishedWork.flags & Snapshot) {
            var root = finishedWork.stateNode;
            clearContainer(root.containerInfo);
          }
        }
```

### scheduleCallBack on flushPassiveEffects

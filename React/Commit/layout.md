## Layout Sub-phase
  
### Before 
- switch FiberRootNode current pointer
```javascript
    resetAfterCommit(root.containerInfo); // The work-in-progress tree is now the current tree. This must come after
    // the mutation phase, so that the previous tree is still current during
    // componentWillUnmount, but before the layout phase, so that the finished
    // work is current during componentDidMount/Update.

    root.current = finishedWork; 
```

### Traverse Effect List again
```javascript
    do {
      {
        invokeGuardedCallback(null, commitLayoutEffects, null, root, lanes);

        if (hasCaughtError()) {
          if (!(nextEffect !== null)) {
            {
              throw Error( "Should be working on an effect." );
            }
          }

          var _error2 = clearCaughtError();

          captureCommitPhaseError(nextEffect, _error2);
          nextEffect = nextEffect.nextEffect;
        }
      }
    } while (nextEffect !== null);
```

### commitLayoutEffects
- call lifecycles.
- assign ref.
  
```javascript
function commitLayoutEffects(root, committedLanes) {


  while (nextEffect !== null) {
    setCurrentFiber(nextEffect);
    var flags = nextEffect.flags;

    // lifecycles triggered.
    if (flags & (Update | Callback)) {
      var current = nextEffect.alternate;
      commitLifeCycles(root, current, nextEffect);
    }

    // update ref.
    {
      if (flags & Ref) {
        commitAttachRef(nextEffect);
      }
    }

    resetCurrentFiber();
    nextEffect = nextEffect.nextEffect;
  }
}
```

#### function commitLifeCycles(finishedRoot, current, finishedWork, committedLanes)
```javascript
function commitLifeCycles(finishedRoot, current, finishedWork, committedLanes) {
  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
    case Block:
      {
        // At this point layout effects have already been destroyed (during mutation phase).
        // This is done to prevent sibling component effects from interfering with each other,
        // e.g. a destroy function in one component should never override a ref set
        // by a create function in another component during the same commit.
        // 执行useLayoutEffect的回调函数
        commitHookEffectListMount(HookLayout | HookHasEffect, finishedWork);
        // 调度useEffect的销毁函数与回调函数
        schedulePassiveEffects(finishedWork);
        return;
      }

    case ClassComponent:
      {
        var instance = finishedWork.stateNode;

        if (finishedWork.flags & Update) {
          if (current === null) {
            // We could update instance props and state here,
            // but instead we rely on them being set during last render.
            // TODO: revisit this when we implement resuming.
            // {
            //   if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
            //     if (instance.props !== finishedWork.memoizedProps) {
            //       error('Expected %s props to match memoized props before ' + 'componentDidMount. ' + 'This might either be because of a bug in React, or because ' + 'a component reassigns its own `this.props`. ' + 'Please file an issue.', getComponentName(finishedWork.type) || 'instance');
            //     }

            //     if (instance.state !== finishedWork.memoizedState) {
            //       error('Expected %s state to match memoized state before ' + 'componentDidMount. ' + 'This might either be because of a bug in React, or because ' + 'a component reassigns its own `this.state`. ' + 'Please file an issue.', getComponentName(finishedWork.type) || 'instance');
            //     }
            //   }
            // }

            {
              instance.componentDidMount();
            }
          } else {
            var prevProps = finishedWork.elementType === finishedWork.type ? current.memoizedProps : resolveDefaultProps(finishedWork.type, current.memoizedProps);
            var prevState = current.memoizedState; // We could update instance props and state here,
            // but instead we rely on them being set during last render.
            // TODO: revisit this when we implement resuming.

            // {
            //   if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
            //     if (instance.props !== finishedWork.memoizedProps) {
            //       error('Expected %s props to match memoized props before ' + 'componentDidUpdate. ' + 'This might either be because of a bug in React, or because ' + 'a component reassigns its own `this.props`. ' + 'Please file an issue.', getComponentName(finishedWork.type) || 'instance');
            //     }

            //     if (instance.state !== finishedWork.memoizedState) {
            //       error('Expected %s state to match memoized state before ' + 'componentDidUpdate. ' + 'This might either be because of a bug in React, or because ' + 'a component reassigns its own `this.state`. ' + 'Please file an issue.', getComponentName(finishedWork.type) || 'instance');
            //     }
            //   }
            // }

            {
              instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
            }
          }
        } // TODO: I think this is now always non-null by the time it reaches the
        // commit phase. Consider removing the type check.


        var updateQueue = finishedWork.updateQueue;

        if (updateQueue !== null) {
          // {
          //   if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
          //     if (instance.props !== finishedWork.memoizedProps) {
          //       error('Expected %s props to match memoized props before ' + 'processing the update queue. ' + 'This might either be because of a bug in React, or because ' + 'a component reassigns its own `this.props`. ' + 'Please file an issue.', getComponentName(finishedWork.type) || 'instance');
          //     }

          //     if (instance.state !== finishedWork.memoizedState) {
          //       error('Expected %s state to match memoized state before ' + 'processing the update queue. ' + 'This might either be because of a bug in React, or because ' + 'a component reassigns its own `this.state`. ' + 'Please file an issue.', getComponentName(finishedWork.type) || 'instance');
          //     }
          //   }
          // } 
          // We could update instance props and state here,
          // but instead we rely on them being set during last render.
          // TODO: revisit this when we implement resuming.


          commitUpdateQueue(finishedWork, updateQueue, instance);
        }

        return;
      }

    case HostRoot:
      {
        // TODO: I think this is now always non-null by the time it reaches the
        // commit phase. Consider removing the type check.
        var _updateQueue = finishedWork.updateQueue;

        if (_updateQueue !== null) {
          var _instance = null;

          if (finishedWork.child !== null) {
            switch (finishedWork.child.tag) {
              case HostComponent:
                _instance = getPublicInstance(finishedWork.child.stateNode);
                break;

              case ClassComponent:
                _instance = finishedWork.child.stateNode;
                break;
            }
          }

          commitUpdateQueue(finishedWork, _updateQueue, _instance);
        }

        return;
      }

    case HostComponent:
      {
        var _instance2 = finishedWork.stateNode; // Renderers may schedule work to be done after host components are mounted
        // (eg DOM renderer may schedule auto-focus for inputs and form controls).
        // These effects should only be committed when components are first mounted,
        // aka when there is no current/alternate.

        if (current === null && finishedWork.flags & Update) {
          var type = finishedWork.type;
          var props = finishedWork.memoizedProps;
          commitMount(_instance2, type, props);
        }

        return;
      }

    case HostText:
      {
        // We have no life-cycles associated with text.
        return;
      }

    case HostPortal:
      {
        // We have no life-cycles associated with portals.
        return;
      }

    case Profiler:
      {
        {
          var _finishedWork$memoize2 = finishedWork.memoizedProps,
              onCommit = _finishedWork$memoize2.onCommit,
              onRender = _finishedWork$memoize2.onRender;
          var effectDuration = finishedWork.stateNode.effectDuration;
          var commitTime = getCommitTime();

          if (typeof onRender === 'function') {
            {
              onRender(finishedWork.memoizedProps.id, current === null ? 'mount' : 'update', finishedWork.actualDuration, finishedWork.treeBaseDuration, finishedWork.actualStartTime, commitTime, finishedRoot.memoizedInteractions);
            }
          }
        }

        return;
      }

    case SuspenseComponent:
      {
        commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
        return;
      }

    case SuspenseListComponent:
    case IncompleteClassComponent:
    case FundamentalComponent:
    case ScopeComponent:
    case OffscreenComponent:
    case LegacyHiddenComponent:
      return;
  }

  {
    {
      throw Error( "This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue." );
    }
  }
}
```

- ClassComponent
  - mount -> componentDidMount
  - update -> componentDidUpdate
  
- HostComponent
  - mount -> commitMount
  - nothing
  
- Function Component
  - commitHookEffectListMount()
  - schedulePassiveEffects()

#### commitAttachRef
```javascript
function commitAttachRef(finishedWork: Fiber) {
  const ref = finishedWork.ref;
  if (ref !== null) {
    const instance = finishedWork.stateNode;

    // 获取DOM实例
    let instanceToUse;
    switch (finishedWork.tag) {
      case HostComponent:
        instanceToUse = getPublicInstance(instance);
        break;
      default:
        instanceToUse = instance;
    }

    if (typeof ref === "function") {
      // 如果ref是函数形式，调用回调函数
      ref(instanceToUse);
    } else {
      // 如果ref是ref实例形式，赋值ref.current
      ref.current = instanceToUse;
    }
  }
}
```
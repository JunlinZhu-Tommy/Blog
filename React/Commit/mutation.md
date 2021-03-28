## Mutation
- Sub-phase where we mutate the host tree.
  
```javascript
    do {
      {
        invokeGuardedCallback(null, commitMutationEffects, null, root, renderPriorityLevel);

        if (hasCaughtError()) {
          if (!(nextEffect !== null)) {
            {
              throw Error( "Should be working on an effect." );
            }
          }

          var _error = clearCaughtError();

          captureCommitPhaseError(nextEffect, _error);
          nextEffect = nextEffect.nextEffect;
        }
      }
    } while (nextEffect !== null);
```

### commitMutationEffects
- reset Text.
- reset Ref.
- switch cases for `Placement`, `updates` and `deletions`.
  
```javascript
function commitMutationEffects(root, renderPriorityLevel) {
  // TODO: Should probably move the bulk of this function to commitWork.
  while (nextEffect !== null) {
    setCurrentFiber(nextEffect);
    var flags = nextEffect.flags;

    if (flags & ContentReset) {
      commitResetTextContent(nextEffect);
    }

    if (flags & Ref) {
      var current = nextEffect.alternate;

      if (current !== null) {
        commitDetachRef(current);
      }
    } // The following switch statement is only concerned about placement,
    // updates, and deletions. To avoid needing to add a case for every possible
    // bitmap value, we remove the secondary effects from the effect tag and
    // switch on that value.


    var primaryFlags = flags & (Placement | Update | Deletion | Hydrating);

    switch (primaryFlags) {
      case Placement:
        {
          commitPlacement(nextEffect); // Clear the "placement" from effect tag so that we know that this is
          // inserted, before any life-cycles like componentDidMount gets called.
          // TODO: findDOMNode doesn't rely on this any more but isMounted does
          // and isMounted is deprecated anyway so we should be able to kill this.

          nextEffect.flags &= ~Placement;
          break;
        }

      case PlacementAndUpdate:
        {
          // Placement
          commitPlacement(nextEffect); // Clear the "placement" from effect tag so that we know that this is
          // inserted, before any life-cycles like componentDidMount gets called.

          nextEffect.flags &= ~Placement; // Update

          var _current = nextEffect.alternate;
          commitWork(_current, nextEffect);
          break;
        }

      // Ignore hydrate now.
      // case Hydrating:
      //   {
      //     nextEffect.flags &= ~Hydrating;
      //     break;
      //   }

      // case HydratingAndUpdate:
      //   {
      //     nextEffect.flags &= ~Hydrating; // Update

      //     var _current2 = nextEffect.alternate;
      //     commitWork(_current2, nextEffect);
      //     break;
      //   }

      case Update:
        {
          var _current3 = nextEffect.alternate;
          commitWork(_current3, nextEffect);
          break;
        }

      case Deletion:
        {
          commitDeletion(root, nextEffect);
          break;
        }
    }

    resetCurrentFiber();
    nextEffect = nextEffect.nextEffect;
  }
}
```

### Placement -> commitPlacement(nextEffect)
- fetch ParentNode => var parentFiber = getHostParentFiber(finishedWork);
- fetch sibling => var before = getHostSibling(finishedWork); [high complexity work](https://react.iamkasong.com/renderer/mutation.html#placement-effect)
- insertBefore / appendChild depends on if host node has sibling.
```javascript
  if (isContainer) {
    insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent);
  } else {
    insertOrAppendPlacementNode(finishedWork, before, parent);
  }

  function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
    var tag = node.tag;
    var isHost = tag === HostComponent || tag === HostText;

    if (isHost || enableFundamentalAPI ) {
      var stateNode = isHost ? node.stateNode : node.stateNode.instance;

      if (before) {
        insertInContainerBefore(parent, stateNode, before);
      } else {
        appendChildToContainer(parent, stateNode);
      }
    } else if (tag === HostPortal) ; else {
      var child = node.child;

      if (child !== null) {
        insertOrAppendPlacementNodeIntoContainer(child, before, parent);
        var sibling = child.sibling;

        while (sibling !== null) {
          insertOrAppendPlacementNodeIntoContainer(sibling, before, parent);
          sibling = sibling.sibling;
        }
      }
    }
  }
```
### Update -> commitWork()
- FunctionComponent
  - commitHookEffectListUnmount()
    - 执行useLayoutEffect摧毁函数 
    - var destroy = effect.destroy
    - effect.destroy = undefined;
    - destroy()

- HostComponent
  - get updatePayload created during completeWork step. `var updatePayload = finishedWork.updateQueue`;
  - clear out finishedWork.updateQueue = null;
  - commitUpdate

```javascript
function commitUpdate(domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
  // Update the props handle so that we know which props are the ones with
  // with current event handlers.
  updateFiberProps(domElement, newProps); // Apply the diff to the DOM node.

  updateProperties(domElement, updatePayload, type, oldProps, newProps);
}
```

### Delete -> commitDeletion()
- unmountHostComponents() - Recursively delete all host nodes from the parent. Detach refs and call componentWillUnmount() on the whole subtree.

```javascript
function unmountHostComponents(finishedRoot, current, renderPriorityLevel) {
  // We only have the top Fiber that was deleted but we need to recurse down its
  // children to find all the terminal nodes.
  var node = current; // Each iteration, currentParent is populated with node's host parent if not
  // currentParentIsValid.

  var currentParentIsValid = false; // Note: these two variables *must* always be updated together.

  var currentParent;
  var currentParentIsContainer;

  while (true) {
    if (!currentParentIsValid) {
      var parent = node.return;

      findParent: while (true) {
        if (!(parent !== null)) {
          {
            throw Error( "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue." );
          }
        }

        var parentStateNode = parent.stateNode;

        switch (parent.tag) {
          case HostComponent:
            currentParent = parentStateNode;
            currentParentIsContainer = false;
            break findParent;

          case HostRoot:
            currentParent = parentStateNode.containerInfo;
            currentParentIsContainer = true;
            break findParent;

          case HostPortal:
            currentParent = parentStateNode.containerInfo;
            currentParentIsContainer = true;
            break findParent;

        }

        parent = parent.return;
      }

      currentParentIsValid = true;
    }

    if (node.tag === HostComponent || node.tag === HostText) {
      // Will call commitUnmount inside of it.
      commitNestedUnmounts(finishedRoot, node); // After all the children have unmounted, it is now safe to remove the
      // node from the tree.

      if (currentParentIsContainer) {
        removeChildFromContainer(currentParent, node.stateNode);
      } else {
        removeChild(currentParent, node.stateNode);
      } // Don't visit children because we already visited them.

    } else if (node.tag === HostPortal) {
      if (node.child !== null) {
        // When we go into a portal, it becomes the parent to remove from.
        // We will reassign it back when we pop the portal on the way up.
        currentParent = node.stateNode.containerInfo;
        currentParentIsContainer = true; // Visit children because portals might contain host components.

        node.child.return = node;
        node = node.child;
        continue;
      }
    } else {
      // Where componentWillUnmount get called.
      commitUnmount(finishedRoot, node); // Visit children because we may find more host components below.

      if (node.child !== null) {
        node.child.return = node;
        node = node.child;
        continue;
      }
    }

    if (node === current) {
      return;
    }

    while (node.sibling === null) {
      if (node.return === null || node.return === current) {
        return;
      }

      node = node.return;

      if (node.tag === HostPortal) {
        // When we go out of the portal, we need to restore the parent.
        // Since we don't keep a stack of them, we will search for it.
        currentParentIsValid = false;
      }
    }

    node.sibling.return = node.return;
    node = node.sibling;
  }
}
```


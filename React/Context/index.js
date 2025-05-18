function createContext(defaultValue) {
  const context = {
    Provider: null,
    Consumer: null,
    _currentValue: defaultValue,
  }

  context.Provider = {
    $$typeof: Symbol.for('react.provider'),
    _context: context,
  }

  context.Consumer = {
    $$typeof: Symbol.for('react.consumer'),
    _context: context,
  }

  return context
}

function useContext(fiber, context) {
  if (!fiber.dependencies) {
    fiber.dependencies = {
      firstContext: null,
      lanes: 0,
    }
  }

  const dep = {
    context,
    observedBits: 0xffffffff,
    next: fiber.dependencies.firstContext,
  }

  fiber.dependencies.firstContext = dep

  return context._currentValue

}

function propagateContextChange_eager(
  workInProgress,
  context,
  renderLanes
) {
  let fiber = workInProgress.child

  if (fiber) fiber.return = workInProgress

  while (filter !== null) {
    let nextFiber = null

    const deps = fiber.dependencies

    if (deps !== null) {
      let dep = deps.firstContext

      while (dep !== null) {
        if (dep.context === context) {
          console.log(`[UPDATE] ${fiber.name} marked with lanes ${renderLanes}`);
          fiber.lanes = renderLanes
          deps.lanes |= renderLanes;
          break
        }

        dep = dep.next
      }

      nextFiber = fiber.child;
    } else if (fiber.tag === TAG.ContextProvider) {
      nextFiber = fiber.type === workInProgress.type ? null : fiber.child
    } else {
      nextFiber = fiber.child
    }

    if (nextFiber !== null) {
      nextFiber.return = fiber
    } else {
      while (fiber !== null) {
        if (fiber === workInProgress) {
          fiber = null;
          break;
        }
        if (fiber.sibling !== null) {
          fiber.sibling.return = fiber.return;
          fiber = fiber.sibling;
          break;
        }
        fiber = fiber.return;
      }
      continue;
    }

    fiber = nextFiber;

  }


}
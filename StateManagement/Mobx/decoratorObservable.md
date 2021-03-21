# Decorator

## Object.defineProperty(obj, prop, descriptor) 

- [defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

### Descriptor (data & access)

- Common Properties
  - configurable
  - enumerable

- [data descriptor]
  - value
  - writablle

- [access]
  - get
  - set
  
## Decorate Observable 
```javascript
@observable price = 0;

var _descriptor = _applyDecoratedDescriptor(
    _class.prototype,
    'price',
    [_mobx.observable],
    {
      enumerable: true,
      initializer: function initializer() {
        return 0;
      }
    }
  )

function _applyDecoratedDescriptor(
  target,
  property,
  decorators,
  descriptor,
  context
) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;
  if ("value" in desc || desc.initializer) {
    desc.writable = true;
  }
  desc = decorators
    .slice()
    .reverse()
    .reduce(function (desc, decorator) {
      // observable({ value: 1 })
      // decorator: observable
      // property: value
      return decorator(target, property, desc) || desc;
    }, desc);
  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }
  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }
  return desc;
}
```

## Without decorator, decorate function

```javascript
import { observable, computed, decorate, action } from "mobx";

class OrderLine {
    price = 0;
    amount = 1;

    get total() {
        return this.price * this.amount;
    }
}
decorate(OrderLine, {
    price: observable,
    amount: observable,
    total: computed,
    increment: action.bound
})

export function decorate(thing: any, decorators: any) {
    process.env.NODE_ENV !== "production" &&
        invariant(isPlainObject(decorators), "Decorators should be a key value map")
    const target = typeof thing === "function" ? thing.prototype : thing
    for (let prop in decorators) {
        const decorator = decorators[prop]
        process.env.NODE_ENV !== "production" &&
            invariant(
                typeof decorator === "function",
                `Decorate: expected a decorator function for '${prop}'`
            )
        const descriptor = Object.getOwnPropertyDescriptor(target, prop)
        // Same as _applyDecoratedDescriptor
        const newDescriptor = decorator(target, prop, descriptor)
        if (newDescriptor) Object.defineProperty(target, prop, newDescriptor)
    }
    return thing
}
```

## Enhancer

### When observable decorator called in _applyDecoratedDescriptor.

- [decorator(target, property, desc)](https://github.com/mobxjs/mobx/blob/4.1.1/src/api/observable.ts#L70)
- [deepDecorator](https://github.com/mobxjs/mobx/blob/4.1.1/src/api/observable.ts#L59)
- [createDecoratorForEnhancer (very important)](https://github.com/mobxjs/mobx/blob/5e2a24cc54775938deaf276a85a1c0ef49cca0c1/src/api/observabledecorator.ts#L11)
- [createPropDecorator](https://github.com/mobxjs/mobx/blob/5e2a24cc54775938deaf276a85a1c0ef49cca0c1/src/utils/decorators2.ts#L64)
- [defineObservableProperty(target, propertyName, initialValue, enhancer)]((https://github.com/mobxjs/mobx/blob/5e2a24cc54775938deaf276a85a1c0ef49cca0c1/src/types/observableobject.ts#L247)) which also be called in [extendObservable](https://github.com/mobxjs/mobx/blob/5e2a24cc54775938deaf276a85a1c0ef49cca0c1/src/api/extendobservable.ts#L57)
- [ObservableValue instance created with enhancer recursive called](https://github.com/mobxjs/mobx/blob/5e2a24cc54775938deaf276a85a1c0ef49cca0c1/src/types/observableobject.ts#L266)
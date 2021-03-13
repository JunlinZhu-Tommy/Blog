## computed

### Initialization

- computed
  - load computed function into ComputedValue get and will be set as derivation. https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/api/computed.ts#L56
  - create computed value instance. https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/api/computed.ts#L59

### When autorun use ComputedValue

- autorun set up Reaction and call runReaction. (https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/reaction.ts#L93)
- call this.onInvalidate() in runReaction. https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/reaction.ts#L98
- Reaction.prototype.track and trackDerivedFunction is called. (https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/reaction.ts#L137)
- Call function defined in autorun(fn); (https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/derivation.ts#L177)
- ComputedValue.prototype.get() is called to fetch value of ComputedValues instance. (https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/computedvalue.ts#L160)
- compute latest value of ComputedValue instance.
  - [computedValue\_](https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/computedvalue.ts#L205)
  - [trackDerivedFunction and compute Computed instance derivation and bind dependencies](https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/computedvalue.ts#L237)
  - [update Status of observers of ComputedValue instance and itself](https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/observable.ts#L203)

### Dependencies Changes

- [dependencies values changes and call setNewValue -> reportChanged](https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/types/observablevalue.ts#L136)
- [observableValue call propagateChanged inside reportChanged](https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/atom.ts#L68)
- [ComputedValue instance onBecomeStale and call propagateMaybeChanged]
  - (https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/observable.ts#L195)
  - https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/computedvalue.ts#L137
- [ComputedValue instance update status of itself and call onBecomeStale of it's observers, BUT NO RECOMPUTE happens here.](https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/observable.ts#L219)
  - [Reaction onBecomeStale and run Reactions, skip since inBatch > 0](https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/reaction.ts#L228)
- [obserableValue call endBatch](https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/atom.ts#L69)
  - [runReactions since inBatch === 0](https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/observable.ts#L109)
  - [shouldComputed in runReaction](https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/reaction.ts#L98)
  - [found POSSIBLY_STALE Computed value and call instance.get() to get latest value of ComputedValue instance](https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/derivation.ts#L104)
  - [run function in trackedDerivedFunction to get latest autorun result and update dependencies](https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/derivation.ts#L177)

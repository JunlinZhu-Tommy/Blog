## When Derivation really re-compute? 

## lowestObserverState & dependenciesState

### Status Enum

### Relation between L & D status

## When observable changes
- [Observable reportChanged](https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/core/atom.ts#L68).
- [Update Observable L Status to STALE and observer D Status to STALE](https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/observable.ts#L184)
- [Autorun Reaction onBecomeStale and runReaction](https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/reaction.ts#L93)
- [Update autorun reaction D status to UP_TO_DATE, and observable L status to UP_TO_DATE as well ](https://github.com/mobxjs/mobx/blob/0945c26513057457e1534a80558a3eb98487dc96/packages/mobx/src/core/derivation.ts#L311)

## When derivation which is also observable changes



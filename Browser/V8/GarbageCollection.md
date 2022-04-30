## V8 GC

### Young Space (Scavenge)

1. Mark garbage objects and clean them.
2. Copy survived Objects into free space and make them sorted.
3. Switch the role of Object Space and Free Space.
4. Big Object / Object survived two rounds will be moved into old space.

### Old Space (Mark-Sweep)

1. Mark and Sweep unreachable objects.
2. Sorted scattered parts.

## Resources
- https://cloud.tencent.com/developer/article/1710084
- https://juejin.cn/post/6844904016325902344#heading-1
- check
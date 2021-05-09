## Map
- new Map() 传入可迭代对象，需要包含键值对数组，可迭代对象每个键值对都会按照迭代顺序插入到新映射实例中。
- Object 只能用 数值，字符串，符号作为键，Map可以使用javascript数据类型。
- 给予固定大小的内存，Map大约可以比Object多存储%50键值对。
- Map插入速度更快。
- 大量查找操作时Object更好。
- Map删除操作更快。

## WeakMap
- 弱映射中的键只能时Object或者继承Object的类型，尝试使用非对象会出现TypeError。
- 键对象引用方式为弱引用，可能随时被GC清除，只要键存在，键值就会存在映射中，不会被GC。
- Weakmap不提供键/值迭代能力。
- 应用场景
  - 私有数据
  - DOM节点数据

## Set
- Set可以包含任何Javascript数据类型值并用SameValueZero操作进行对比。
- Set会维护值插入时的顺序，因此支持顺序迭代。

## WeakSet
- 因为所有元素均为弱引用，内部值只能Object或者继承自Object类型。
- 值不能被迭代。
- 应用场景
  - DOM节点。
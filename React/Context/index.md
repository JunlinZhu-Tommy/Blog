好的！以下是精简又清晰的 React Context 全链路流程解析打印版，直接用于你做笔记 👇：

⸻

📦 React Context 全链路解析

分为两条链路：

⸻

🌱 Part 1️⃣ 【订阅链路：组件订阅 Context】

✅ 目的：

组件通过 useContext 订阅指定的 Context，用于依赖跟踪。

🔄 执行流程：

1️⃣ createContext()
→ 创建 Context 对象，挂载 \_currentValue

2️⃣ beginWork(Component)
→ 执行组件函数（函数组件 or Class.render）
→ 执行 useContext(Context)
→ 调用 readContext(Context)
→ 读取 Context.\_currentValue
→ 在当前 Fiber.dependencies 链表中记录 context 订阅信息

📌 dependencies 示例结构：
fiber.dependencies = {
lanes,
firstContext: {
context,
observedBits: 0xffffffff, // 默认全量订阅
next: null
}
}

🧠 要点总结：
• 每次组件渲染（即 beginWork 阶段），都会重新挂载 dependencies 链。
• context 的订阅记录不会复用，每次 render 都会重建。

⸻

🌳 Part 2️⃣ 【广播链路：Provider 更新广播订阅者】

✅ 目的：

当 Provider.value 改变，触发 context 广播 → 重新渲染所有订阅它的子组件。

🔄 执行流程：

1️⃣ beginWork(ContextProvider)
→ 检查 context.value 是否变化（prev !== next）

2️⃣ 若变化，则调用 propagateContextChange(workInProgress, context, renderLanes)

3️⃣ propagateContextChange() 流程：
→ 从 workInProgress.child 开始
→ 深度优先遍历整棵子树（child → sibling → return）

    遇到每个 Fiber：
      - 若 fiber.dependencies 中包含该 context：
          • fiber.lanes |= renderLanes（标记本节点要更新）
          • fiber.alternate.lanes 同样标记
          • fiber.dependencies.lanes |= renderLanes
          • scheduleContextWorkOnParentPath() 向上传播更新标记

      - 若遇到相同类型的 Provider（嵌套 Provider）→ 不再往下广播
      - 若遇到 DehydratedFragment（Suspense SSR）→ 向父 Suspense 打更新标记

4️⃣ 后续阶段：
→ completeWork → 正常 bubble 返回
→ commitRoot → 执行打了更新标记（lanes）的 Fiber 节点 → 渲染订阅组件

⸻

🧠 总结记忆：

🌱 订阅链路：
useContext(context) → readContext → Fiber.dependencies 记录 context 依赖
（发生在每次组件 beginWork 阶段）

🌳 广播链路：
Provider.value 改变 → beginWork(Provider) → propagateContextChange 向下广播
→ 给订阅该 context 的 Fiber 打更新标记（lanes）
→ 最终在 commit 阶段重新渲染

⸻

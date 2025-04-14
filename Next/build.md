# 🏗️ Next.js 15 构建流程详解（Pages Router）

> 构建阶段由 `next build` 启动，完成页面分析、路由映射生成、Webpack 打包、产物输出等核心步骤。

---

## 📦 构建主流程

```txt
next build
 ├─ 1. 扫描 pages/ 目录，生成路由结构
 ├─ 2. 提取数据函数（GSP / GSSP）
 ├─ 3. 编译页面组件 (Webpack)
 ├─ 4. 输出 .next 构建产物
 └─ 5. 生成运行所需 manifest 文件



⸻

🔍 1. 页面扫描与路由映射
	•	扫描 pages/ 目录
	•	动态生成路径到文件的映射表

示例输出：.next/server/pages-manifest.json

{
  "/": "pages/index.js",
  "/about": "pages/about.js",
  "/post/[slug]": "pages/post/[slug].js"
}



⸻

⚙️ 2. 提取数据方法

Next.js 进行静态分析：
	•	getStaticProps
	•	getStaticPaths
	•	getServerSideProps

并生成相关预渲染配置文件：
	•	.next/prerender-manifest.json

⸻

🧱 3. Webpack 编译页面组件

每个 page 文件作为 entry，使用 Webpack 编译生成：
	•	SSR 入口（Node 用）
	•	.next/server/pages/*.js
	•	客户端 bundle
	•	.next/static/chunks/pages/*.js
	•	样式 chunk
	•	.next/static/css/*.css

⸻

📁 4. 构建产物输出结构

.next/
├── server/
│   └── pages/
├── static/
│   ├── chunks/
│   └── css/
├── pages-manifest.json
├── build-manifest.json
├── prerender-manifest.json
└── routes-manifest.json



⸻

🧭 5. Manifest 文件总览

文件名	描述
pages-manifest.json	URL → 页面构建路径
routes-manifest.json	rewrites/redirects/headers
prerender-manifest.json	SSG 路径和 revalidate 配置
middleware-manifest.json	middleware 匹配路径配置
build-manifest.json	页面 JS chunk 映射



⸻

🧠 补充说明

特性	构建时处理
动态路由 [param]	转为正则写入 manifest
GSSP	页面跳过 pre-render，保留 SSR 路径
GSP + GSP	静态 HTML + JSON 预渲染生成
middleware.ts	编译为中间件函数，写入 middleware-manifest.json



⸻



```

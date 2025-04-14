# 🚀 Next.js 15 运行时流程详解（Pages Router）

> 用户访问 URL 后，Next.js 如何匹配路由、加载组件、执行数据函数并输出 HTML 响应？

---

## 🌐 运行主流程概览

```txt
HTTP 请求
 └─ next-server.ts → render()
     └─ renderToResponse()
         └─ renderToHTML()
             ├─ findPageComponents()
             ├─ run GSP / GSSP
             └─ doRender() → renderToString()
         └─ sendRenderResult()
             └─ res.end(html)



⸻

🧩 1. 请求入口：next-server.ts

handleRequest(req, res, parsedUrl) {
  return this.render(req, res, pathname, query)
}

内部会调用：

async render(req, res, pathname, query) {
  const result = await this.renderToResponse(...)
  return this.sendRenderResult(req, res, result)
}



⸻

📥 2. 路由匹配：router-matcher

使用 .next/server/pages-manifest.json 将路径解析为构建产物路径：

"/post/[slug]": "pages/post/[slug].js"

匹配完毕后，调用：

await this.findPageComponents(pathname)

加载 Component、App、Document、数据方法。

⸻

🧠 3. 渲染主流程：renderToHTML

async renderToHTML(req, res, pathname, query) {
  const components = await this.findPageComponents(...)
  const props = await runGSSPOrGSP(...)
  const html = await doRender({ components, props, ... })
  return html
}

🔹 findPageComponents()
	•	加载页面模块（Node require）
	•	获取组件、App、Document、数据函数

🔹 runGSSPOrGSP()
	•	根据页面定义调用 getServerSideProps 或 getStaticProps
	•	传入 { req, res, query, params }

🔹 doRender()

ReactDOMServer.renderToString(
  <Document>
    <App>
      <Component {...props} />
    </App>
  </Document>
)

返回完整 HTML 字符串

⸻

📤 4. 输出响应：sendRenderResult()

res.setHeader('Content-Type', 'text/html; charset=utf-8')
res.statusCode = 200
res.end(html)

封装在 RenderResult 类中统一处理：

res.end(await result.toUnchunkedString())



⸻

📁 Manifest 支持

文件名	运行时作用
pages-manifest.json	匹配 URL → 构建产物路径
routes-manifest.json	处理 rewrites/redirects
middleware-manifest.json	匹配是否执行中间件
build-manifest.json	页面依赖 JS/CSS chunk
prerender-manifest.json	判断是否需要 fallback/static



⸻

🧠 补充：中间件处理逻辑

如果启用了 middleware：
	•	匹配 URL 后先走 middleware.run()
	•	修改 request.headers, request.url 等
	•	然后继续传递给 render()

⸻

✅ 最终响应链路图（简化）

URL 请求
  ↓
next-server.handleRequest()
  ↓
render()
  ↓
renderToResponse()
  ↓
renderToHTML()
  ├─ findPageComponents()
  ├─ runGSP/GSSP
  └─ renderToString()
  ↓
sendRenderResult()
  ↓
res.end(html)



⸻



```

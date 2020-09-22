# Chapter 2

## Section 2.1 "\<script>" 元素


### 八大属性
- async (optional): 表示立即下载脚本，但是不阻碍其他页面动作（下载资源或者其他脚本的加载）.
- charset (optional)
- crossorigin (optional): 配置CORS相关， crossorigin="anonymous/use-credentials".
- defer (optional): 表示在文档解析完成之后再执行脚本没问题。
- integrity (optional): 允许比对接收到的资源和指定加密签名以验证资源完整性。
- src (optional): 表示需要执行的外部文件。
- type (optional) 表示代码中脚本语言的内容类型, "text/javascript" by default. 如果是 "module" 则会被当为ES6 module.

### Example

```html
<!-- 下面两种例子都会阻塞页面, 并且使用了src属性的<script> 不能再在标签中包含其他JS代码，如果提供会被忽略 -->
<!-- 在不使用async/defer的情况下，浏览器会按照顺序加载并执行<script>引入内容-->

<script>
function sayHi() {
  console.log(
    'HI'
  );
}
</script>

<!-- src可包含来自外部域的js文件，在解析资源时会像src属性发送一个GET请求并且不受同源策略限制。-->
<script src="example.js"></script>
```

### 2.1.1 标签位置

- 为避免白屏，\<script> 标签最好放在 \<body> 之后元素后面，因为页面解析到<body>起始标签时才开始渲染, 放入 \<head>会引起阻塞.


### 2.1.2 推迟执行脚本 (defer)

- 此属性表示脚本在执行时候不会改变页面结构，因此，这个脚本立即下载但是在整个页面解析完成之后再运行。

#### Example

```html

<!--
1. 浏览器解析到结束标签 </html> 才会执行.
2. 规范要求 example1 先于 example2 执行.
3. 两者都会在DomContentLoaded 事件之前执行.

不过实际情况中 2, 3无法保证, 所以最好只有一个这样的脚本。
-->
<script defer src="example1.js"></script>
<script defer src="example2.js"></script>
```

### 2.1.3 异步执行脚本

- 与defer不同的是，标记为async不能保证他们按照出现的顺序执行（脚本间不要有依赖关系）。
- async 脚本保证会在 load 事件之前执行，但无法保证是否在DomContentLoaded之前之后。

### 2.1.4 动态加载脚本

- 使用DOM API 动态添加script到DOM即可。
  
```javascript
//添加到DOM之前不会发送请求并且默认为异步方式加载 (async)
//如果遇到浏览器不支持可改为同步
let script = document.createElement('script);
script.src = "example.js";
script.async = false; // 改为同步.
document.head.appendChild(script);
```


## 2.4 \ <noscript> 元素

- \<noscript> 可以包含任何可以出现在 \<body> 中的元素, \<script>除外, 所以通常用来验证浏览器执行脚本否.
  
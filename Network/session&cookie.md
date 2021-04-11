## HTTP 无状态

- HTTP 是不保存状态的协议，例如同一客户端给服务器连续请求两次相同资源，服务器会做两次完全相同的操作。
  

### 基于Session实现会话的保持

- 当客户端第一次向服务器发送HTTP请求后，服务器会创建一个Session对象并将客户端信息以<key, value>的形式存储下来，并返回SessionId给客户端。
- 客户端保存SessionID，并在浏览器Cookie中保存，之后每次浏览器每次发送给服务器的请求都会带上Cookie中的SessionId。
- 服务器根据之前的状态信息连接之前的会话，从而实现会话保持。

### 基于Cookie实现会话保持
- 当服务器发送响应消息时，在 HTTP 响应头中设置 Set-Cookie 字段，用来存储客户端的状态信息。
- 客户端解析出 HTTP 响应头中的字段信息，并根据其生命周期创建不同的 Cookie，这样一来每次浏览器发送 HTTP 请求的时候都会带上 Cookie 字段，从而实现状态保持。
- 基于 Cookie 的会话保持与基于 Session 实现的会话保持最主要的区别是前者完全将会话状态信息存储在浏览器 Cookie 中

## Reference
- https://leetcode-cn.com/leetbook/read/networks-interview-highlights/ezzb07/

## Babel Work Flow

Babel does very simple thing which transplies source code with format of string and return a new string and sourcemap of it.

In a word, Babel is a interpreter which convert ES6 to ES5 in three steps.

- Analysis: Converting code string into AST.
- Transform: Change AST.
- Generate: Generate code based on converted AST.

### Example

```javascript
if (1 > 0) {
  alert("hi");
}
```

```json
{
  "type": "Program", // 程序根节点
  "body": [
    // 一个数组包含所有程序的顶层语句
    {
      "type": "IfStatement", // 一个if语句节点
      "test": {
        // if语句的判断条件
        "type": "BinaryExpression", // 一个双元运算表达式节点
        "operator": ">", // 运算表达式的运算符
        "left": {
          // 运算符左侧值
          "type": "Literal", // 一个常量表达式
          "value": 1 // 常量表达式的常量值
        },
        "right": {
          // 运算符右侧值
          "type": "Literal",
          "value": 0
        }
      },
      "consequent": {
        // if语句条件满足时的执行内容
        "type": "BlockStatement", // 用{}包围的代码块
        "body": [
          // 代码块内的语句数组
          {
            "type": "ExpressionStatement", // 一个表达式语句节点
            "expression": {
              "type": "CallExpression", // 一个函数调用表达式节点
              "callee": {
                // 被调用者
                "type": "Identifier", // 一个标识符表达式节点
                "name": "alert"
              },
              "arguments": [
                // 调用参数
                {
                  "type": "Literal",
                  "value": "hi"
                }
              ]
            }
          }
        ]
      },
      "alternative": null // if语句条件未满足时的执行内容
    }
  ]
}
```

### How AST are generated ?

- Converting code string into an array of Grammar units.
- Semantic Analysis which build connections between Grammar Units.

## Reference

- https://juejin.cn/post/6844903746804137991#heading-2

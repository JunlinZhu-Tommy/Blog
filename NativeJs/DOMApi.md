## Node Structure Apis

- childNodes 实时活动对象，会反应DOM结构的变化。
- previousSibling, nextSibling, 访问同胞节点。
- firstChild, lastChild 指向第一个和最后一个子节点。
- hasChildNodes() 如果是 true, 说明节点有一个或者多个字节点。

## Node Manipulation Apis

- appendChild() 用于在childNodes列表末尾添加节点. (如果把文档中已经有的节点传给 appendChild, 此节点会从以前的位置被转移到新位置)
```javascript
let returnedNode = someNode.appendChild(soneNode.firstChild);
alert(returnedNode == someNode.firstChild) // false
alert(returnedNode == someNode.lastNode) // true
```
- insertBefore() 插入到childNodes特定位置，接受两个参数: 要插入的节点和参照节点，如果参照节点null，则与appendChild相同, 否则要插入的节点会变成参照节点的前一个同胞节点。
```javascript
const returnedNode = someNode.insertBefore(newNode, null);
alert(newNode == someNode.lastNode) // true

const returnedNode = someNode.insertBefore(newNode, someNode.firstChild);
// someNode.firstChild = newNode
```
- replaceNode(node1, node2) 插入节点和要替换的节点，被替换的节点会从文档树中完全删除。
```javascript
let returnedNode = someNode.replaceChild(newNode, someNode.firstNode); // 所有关系指针会被被替换节点复制过来。
``` 

- removeChild() 移除节点，接受一个参数即被移除的节点。
```javascript
let formerFirstChild = someNode.removeChild(someNode.firstChild);
```

- cloneNode(<boolean value>) true则表示深拷贝。
- normalize() 删除空文本节点，如果两个同胞节点相邻，合并位一个。

## Dom Node Fetch
- getElementById() 返回id位传入参数的元素，case sensitive, 如果有多个，则返回第一个。
- getElementsByTagName() 返回 NodeList.
- getElementsByName()

## Element Apis
- getAttribute('class')
- setAttribute('class', 'ft');
- removeAttribute('class')
- document.createElement() 创建元素并没有添加到文档书当中，需使用 appendChild(), insertBefore, replaceChild() 方法加入。

## Text Node
- appendData()
- deleteData(offset, count)
- insertData()
- replaceData()
- splitText()
- substringData()
  
  
  
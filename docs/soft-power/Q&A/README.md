Q: 判断一个函数是不是异步函数
A: 
```js
const asyncFn = async function() {}
asyncFn[Symbol.toStringTag] // "AsyncFunction" 
const fn = function() {}
fn[Symbol.toStringTag] // undefined
```
---

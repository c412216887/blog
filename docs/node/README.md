# node

## 用途
1. 前端构建工具
2. 后端服务

## 事件循环
node的事件循环是基于libuv库
主程序   
Promise    
setTimeout  
I/O  
setImmediate  
- setTimeout最小执行时间为1ms
## 模块标准
根据```package.json```文件中```type```属性，node有两种标准：esm，commonjs。
commonjs标准，全局注入了module、exports、require、__dirname、__filename
esm标准：
获取当前文件路径、当前文件夹路径
```js
import {fileURLToPath} from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
```

# node库
[nest](./nest/)

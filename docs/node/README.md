# node

# 框架

## [Express](./express/)

## [KOA](./koa/)

## [MongoDB](./mongodb/)

## [nest](./nest/)

## 用途

1. 前端构建工具
2. 后端服务

## 事件循环

node 的事件循环是基于 libuv 库

### 微任务

process.nextTick()
Promise

- process.nextTick()的优先级高于 Promise

### 宏任务

主程序  
setTimeout/setInterval  
I/O  
setImmediate

- setTimeout 最小执行时间为 1ms

## MVC 模型

[mvc](./mvc/)

## 数据库

[monogoDB](./mongodb/)

## node 性能影响点

### 代码逻辑

1. CPU 密集型
2. 网络 I/O
   - 同步 I/O
   - 异步 I/O
3. 磁盘 I/O

### 集群服务

1. 多进程 cluster 模式

### 其他相关

1. 内存限制
2. 句柄限制

### cpu 过载保护

- 判断过载的标准
  事先需要确定两个数据，1、cpu 单次使用率最高的参考值；2、cpu 持续超过参考值次数。  
  node 服务器每秒会查询对应的进程的 cpu 使用率，当 cpu 持续超过参考值次数过多时，才会定义为 cpu 过载，cpu 过载并不是程序不可以继续运行
- cpu 过载之后，并不是所有请求都要丢弃，这时计算出一个丢弃概率，当随机数大于丢弃概率时，进行请求丢弃
- cpu 过载，一些特殊服务还是需要继续执行，需要设置白名单

## 模块标准

根据`package.json`文件中`type`属性，node 有两种标准：esm，commonjs。
commonjs 标准，全局注入了 module、exports、require、**dirname、**filename
esm 标准：
获取当前文件路径、当前文件夹路径

```js
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

# node 库

[nest](./nest/)
[express](./express/)
[koa](./koa/)

# node 内置模块

- path: 处理系统路径
  - dirname(path): 获取路径中文件夹的路径
  - resolve(...path): 将多个路径算出一个路径，同时解决不同系统中`/`路径分隔符
  - join(...path): 将多个路径直接拼接在一起
- fs: 处理文件
  - stat(filepath): 查看文件状态，可以用来获取是否为文件，获取文件最近修改时间
  - readFile(filepath): 读取文件
  - readFileSync(filepath): 同步读取文件
  - writeFile(filepath): 写入文件
  - writeFileSync(filepath): 同步写入文件
  - open(filepath): 打开一个文件
  - close(filepath): 关闭一个文件
  - createReadStream(filepath): 创建一个读文件流
  - createWriteStream(filepath): 创建一个写文件流
- net
- http
- url
- process
- util

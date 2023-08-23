# node demo

记录使用 node 解决一些问题

## 读取文件夹路径下的所有文件

```js
const fs = require("node:fs");
/**
 * @param {string} path - 文件夹的绝对路径
 */
function readAllFileOrDir(path) {
  return fs.readdirSync(path, "utf-8");
}
```

## 判断文件是否为文件夹

```js
const fs = require("node:fs");
/**
 * 判断文件/文件夹路径是否为文件夹
 * @param {string} path - 文件/文件夹的绝对路径
 * @returns {boolean}
 */
function isDir(path) {
  return fs.statSync(path).isDirectory();
}
```

## 批量修改文件名

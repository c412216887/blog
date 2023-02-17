# PM2

## 定义

## Q&A

1. 运行`pm2.config.js` 报错`no script path`

- 检查`pm2.config.js`,导出是否为`module.exports`不可以写成`exports`
- 检查配置中`script`的对应的文件是否存在

2. `pm2`运行`.ts`文件

- 使用`pm2 install typescript`, 之后可以直接运行
- 使用`yarn` 运行`script`脚本，pm2 可能会出现找不 ts-node 依赖，这是使用 npm 或者 pnpm 来运行命令

###待解决###<font color="red">使用 PM2 运行`.ts`无法获取`pid`???</font>

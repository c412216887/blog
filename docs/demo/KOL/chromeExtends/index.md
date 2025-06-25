# 红人抓取chrome插件

开发：
● 第一次运行代码
1. 使用pnpm dev后会生成两个文件.plasmo和build/chrome-mv3-dev
1.1 build/chrome-mv3-dev先生成空白文件夹，内容需要等待2分钟左右，耐心等待
2. 打开chrome浏览器>拓展程序，打开开发者模式

3. 将build文件中打包生成的chrome-mv3-dev，拖到浏览器中。安装插件
4. 开始开发，修改代码，保存，热更新检测文件修改，自动更新插件。等待浏览器自动刷新，进行调试
● 后续开发
# npm 运行命令
> npm run dev
# pnpm 运行命令
> pnpm dev
命令执行完成后，热更新会等待中

目录
|--
  |--src
    |-- background
    |-- components
    |-- config 渠道相关配置文件
        |-- sources 渠道目录
          |-- ig.ts ig渠道
   |-- tk.ts tiktok渠道
   |--yt.ts youtube渠道
   |--index.ts 渠道的公共入口
每个渠道都有init()方法
生产：
1. 更新版本号
2. 打包
# 打包
npm run build
# 将对应build的包进行压缩，不会重新打包
npm run package

登录逻辑
1. src/components/LuteAuth.tsx
通过localstorage获取token 更改为 通过cookie获取token
如何做到同源获取cookie？
2. 通过plasmohq/storage进行存储
import { Storage } from '@plasmohq/storage'
import { useStorage } from '@plasmohq/storage/hook'
3. 会存储在拓展插件中的storage中

4. 在请求中，会通过

# vite

## 配置

resolve.alias: 配置别名，别名路径需要绝对路径，不然无法获取正确路径

## 使用 css 预处理器

`vite`只需要安装对应预处理器的依赖就行(以`less`为例)

```shell
pnpm add less -D
```

如果使用单文件, 可以通过`<style lang="less">`自动开启

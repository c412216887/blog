# vite

## 入口文件

### 默认入口文件

vite 的入口文件默认为根目录下的`index.html`文件。再`index.html`文件中，需要使用`<script>`标签引入 vue 的入口文件
-> mode: development, vue 的入口文件，根据`index.html`文件中引入的`.js`文件

```html
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
  <html></html>
</html>
```

## 修改入口文件

在`vite.config.ts`文件中，可以修改入口文件

```ts
import { defineConfig } from "vite";
export default defineConfig({
  build: {
    rollupOptions: {
      input: "XXXX",
    },
  },
});
```

## 配置

resolve.alias: 配置别名，别名路径需要绝对路径，不然无法获取正确路径

```js
// 使用key-value配置别名
import path from 'node:path'
import { defineConfig } from 'vite'
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
})
// 使用数组配置别名
import path from 'node:path'

import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, '../src')
      }
    ]
  }
})
```

## 使用 css 预处理器

`vite`只需要安装对应预处理器的依赖就行(以`less`为例)

```shell
pnpm add less -D
```

如果使用单文件, 可以通过`<style lang="less">`自动开启

## vite 插件

unplugin-vue-components: 自动引入 vue 组件, 以`ant-design-vue`为例;
运行 vite 进行打包后，会在根目录下生成`components.d.ts`文件，这是，在项目中使用组件就不会产生报错
在项目的`tsconfig.json`配置的 include 中添加`components.d.ts`

```js
import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
/**
 * commonjs引用，v0.8以上
 * const Components = require("nplugin-vue-components/vite").default
 */
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
export default defineConfig({
  plugins: [
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
});
```

unplugin-auto-import: 自动引入模板里的 API
运行 vite 后，会在项目的根目录中生成`auto-import.d.ts`文件，在项目中使用 vue 相关 API 就不会出现报错啦
在项目的`tsconfig.json`配置的 include 中添加`auto-import.d.ts`

```js
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
/**
 * commonjs引用，v0.8以上
 * const AutoImport = require("unplugin-auto-import/vite").default
 */
export default defineConfig({
  plugins: [
    AutoImport({
      // global imports to register
      imports: [
        // presets
        "vue",
        "vue-router",
      ],
    }),
  ],
});
```

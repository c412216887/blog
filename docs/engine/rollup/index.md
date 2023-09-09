# Rollup

## 参考资料

[Rollup 打包从 0 到 1](https://juejin.cn/post/7039915279656157198)

## 概述

Rollup 是一个 JavaScript 模块打包器，可以将多个小的代码片段编译为完整的**库**和**应用**

## 核心概念

1. Tree-Shaking
2. rollup 配置文件
3. bundle

### rollup 配置文件

单个 bundle 配置

```js
export defualt {
  input: "", // 必须项
  output: { // 必须项
    file: "", // 输出文件的绝对地址，包含文件名
    // 必须项, 有效值：amd\cjs\system\es\iife\umd
    format: "",
    // 推荐设置,作为umd和iife格式的全局名称
    name: ""
  },
  plugins: []
}
```

多个 bundle 配置, 是 n 个单 bundle 配置项构成的数组。

## 插件

rollup 插件拓展编译的能力

1. `@rollup/plugin-node-resolve`  
   rollup 无法识别`node_modules`的模块引入，比如`import answer from 'the-answer'`, 所以需要`resolve`插件解决
2. `@rollup/plugin-commonjs`  
   rollup 打包时，只支持 ES6 的模块导入导出方式，即`export/import`,对于`Commonjs`方式导出的包，需要使用`@rollup/plugin-commonjs`

3. `rollup-plugin-typescript2`  
   rollup 不识别`.ts`文件，需要`rollup-plugin-typescript2`，打包时能编译`.ts`文件

```js
import ts from "rollup-plugin-typescript2";
export default {
  // ...  其他rollup配置项
  plugins: [
    ts({
      tsconfig: "./tsconfig.json", // 必须项，tsconfig文件的地址
    }),
  ],
};
```

4. `@rollup/plugin-json`  
   使用`json`插件可以在代码中直接引入`json`文件

5. `rollup-plugin-terser`  
   该插件可以压缩打包文件

6. `@rollup/plugin-replace`  
   该插件用来替换变量

```js
import replace from "@rollup/plugin-replace";
export default {
  // ... 其他相关配置
  plugins: [
    replace({
      values: {
        __VERSION__: JSON.stringify(),
      },
      preventAssignment: true,
    }),
  ],
};
```

为了防止替换过程中，将`sometion = false`替换成`false = false`引发错误，需要将`preventAssignment`设置为`true`

## 打包

rollup 打包不存在 dev 和 prod,想要区分开发版和生产版本，就只能根据 config 文件来区分

```shell
rollup -c rollup.config.js
```

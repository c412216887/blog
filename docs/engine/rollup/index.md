# rollup

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
    dir: "",
    file: "",
    // 必须项, 有效值：amd\cjs\system\es\iife\umd
    format: ""
  },
  plugins: []
}
```

多个 bundle 配置, 是 n 个单 bundle 配置项构成的数组。

## 插件

rollup 插件改变编译的执行过程，且插件的执行顺序是属性`plugins`从前往后。
举例说明:当中同时存在‘编译 ts’和‘注入相关变量’的插件时，‘注入相关变量’的插件要放到‘编译 ts’的前面

## 打包 ts 工程

使用 rollup 插件`rollup-plugin-typescript2`。

```js
import ts from "rollup-plugin-typescript2";
export default {
  // ...  其他rollup配置项
  plugins: [
    ts({
      tsconfig: "", // 必须项，tsconfig文件的地址
    }),
  ],
};
```

## 环境变量注入

使用 rollup 官方插件`@rollup/plugin-replace`。

```js
import replace from "@rollup/plugin-replace";
export default {
  // ... 其他相关配置
  plugins: [
    replace({
      values: {},
      preventAssignment: true,
    }),
  ],
};
```

## 处理 commonjs 标准的依赖

需要同时使用 rollup 官方插件`@rollup/plugin-node-resolve`和`@rollup/plugin-commonjs`

```js
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
export default {
  // ...其他配置
  plugins: [
    resolve()
    commonjs()
  ]
}
```

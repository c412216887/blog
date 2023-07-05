# PNPM

## 核心概念

1. package.json
2. pnpm-workspace.yaml: 拓展名只能是`.yaml,不可以使用`.yml`
3. packages

## monorepo 项目，如何统一安装依赖？

在项目根目录中创建`pnpm-workspace.yaml`文件，在文件中增加

```yaml
packages:
  - "packages/**"
```

## 在指定子包中安装依赖

```shell
pnpm --filter <package_name> add <dependency_name>
```

## 执行指定子包的 script 脚本

```shell
pnpm --filter <package_name> <command>
```

## 执行多个子包的 script 脚本

```shell
pnpm --filter ./packages/** -r --parallel run dev
```

`-r` > --recursive  
`-F` > --filter

## nomorepo 中，如何引入子包？

1. 引入其他包中的方法
   示例: 在@demo/main 中引入@demo/utils 包中的方法

- 安装依赖包

```shell
pnpm install @demo/utils -F @demo/main
```

- 使用@demo/utils 中 get 方法, `@demo/utils`的`package.json`文件中`main`对应的文件中，要导出，或者在`package.json`文件中的`export`中导出。

```js
import { get } from "@demo/utils";
```

2. 引入其他包中的组件
   示例: 在@demo/main 中引入@demo/components 包中的组件

- 安装依赖包

```shell
pnpm install @demo/components -F @demo/main
```

- 使用@demo/components 中 App 组件， `@demo/components`的`package.json`文件中`main`对应的文件中，要导出，或者在`package.json`文件中的`export`中导出。

```js
import { App } from "@demo/components";
```

```

```

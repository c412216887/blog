# PNPM

## 核心概念

1. package.json
2. pnpm-workspace.yaml
3. packages

## monorepo 项目，如何统一安装依赖？

在项目根目录中创建`pnpm-workspace.yaml`文件，在文件中增加

```yaml
package
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

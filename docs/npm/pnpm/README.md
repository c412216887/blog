# PNPM

## 核心概念
1. package.json
2. pnpm-workspace.yaml
3. packages


## monorepo项目，如何统一安装依赖？
在项目根目录中创建```pnpm-workspace.yaml```文件，在文件中增加
```yaml
package
  - packages/**

```

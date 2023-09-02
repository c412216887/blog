# husky

## 用途

在代码提交前，自动执行`lint`校验

## 安装`husky`

```shell
# 安装husky依赖
yarn add -D husky
```

## 初始化`.husky`文件夹

```shell
# 初始.husky文件夹
npx husky install
```

## 在`package.json`中添加`script`脚本

```json
{
  "prepare": "husky install"
}
```

## 添加 `git` 钩子

```shell
npx husky add .husky/pre-commit "npm run lint"
```

- 常用 git 钩子

  - pre-commit
  - commit-msg

## commitlint

### 用途

用来约定`commit`的规范

### 安装

- `@commitlint/cli` Commitlint 命令行工具
- `@commitlint/config-conventional` 基于 Angular 的约定规范

```shell
npm i @commitlint/cli @commitlint/config-conventional -D
```

### 将 commitlint 添加到 husky 钩子中

```shell
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit \"$1\"'
```

### 创建`commitlint.config.js`, 并写入配置

`@commitlint/cli`会从`commitlint.config.js`获取配置项

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

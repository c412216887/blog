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
  "lint": "eslint --ext .ts,.js src/",
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

## 常用 type

项目工程中，存在 eslint 时，需要将`commitlint.config.js`添加进`tsconfig.json`中

| type     | 描述                                                     |
| -------- | -------------------------------------------------------- |
| feat     | 新增功能                                                 |
| fix      | bug 修复                                                 |
| style    | 不影响程序逻辑的代码修改（修改空白字符，补全缺失的分号） |
| refactor | 重构代码（既没有新增功能，也没有修复 bug）               |
| docs     | 文档更新                                                 |
| test     | 增加测试                                                 |
| chore    | 构建过程或辅助工具的变动                                 |

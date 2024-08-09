# husky

## 类似依赖

- simple-git-hooks

## 前置知识

### git hook

- 客户端 hooks
  - 提交工作流
    - pre-commit: 用于检查即将提交的快照，例如，检查是否有所遗漏，确保测试运行，以及核查代码。
    - prepare-commit-msg：对一般的提交并没有什么用；对需要自动产生默认信息的提交非常实用
    - commit-msg：用来在提交通过前验证项目状态或者提交信息
    - post-commit: 一般用于通知之类的事情

### shell

- 变量定义、赋值、调用

```shell
# 变量定义，可以字母（大小写敏感），数字，下划线
# 变量名和等号之间不能有空格
your_name="xxxx"
# 调用
$your_name
```

- 传递参数
  使用`$n`, n 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二参数  
  |参数处理|说明|
  |--------|------------|
  |$#|传递到脚本的参数个数|
  |$\*||

## 用途

在代码提交前，自动执行`lint`校验

## 安装`husky`

```shell
# 安装husky依赖
yarn add -D husky
```

> 在`package.json`中添加`script`脚本

```json
{
  "lint": "eslint --ext .ts,.js src/",
  "prepare": "husky install"
}
```

## 应用

方法一: 初始化`.husky`文件夹

```shell
# 初始.husky文件夹
npx husky install
# 添加git hook
npx husky add .husky/pre-commit "npm run lint"
```

> 常用 git 钩子

- pre-commit
- commit-msg

方法二: 在`packages.json`中配置

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "",
      "commit-msg": ""
    }
  }
}
```

## 方法二: 在`package.json`中应用 husky

```json
{}
```

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

### 常用 type

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

## 自定义`commit-msg`

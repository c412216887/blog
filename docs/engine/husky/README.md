# husky

## 用途
在代码提交前，自动执行```lint```校验

## 安装
```shell
# 安装husky依赖
yarn add -D husky
# 初始.husky文件夹 
npx husky install
```

## 添加git钩子
```shell
npx husky add .husky/pre-commit "npm run lint"
```

## git钩子
pre-commit   
commit-msg

## commitlint
### 用途
用来约定```commit```的规范
### 安装
- ```@commitlint/cli``` Commitlint命令行工具
- ```@commitlint/config-conventional``` 基于Angular的约定规范
```shell
npm i @commitlint/cli @commitlint/config-conventional -D
```
### 将commitlint添加到husky钩子中
```shell
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```
### 创建```.commitlintrc```, 并写入配置
```js
{
  extends: [
    '@commitlint/config-conventional'
  ]
}
```

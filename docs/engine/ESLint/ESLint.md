# ESLint

## eslint做什么使用
eslint主要是发现问题(find problems), 自动修复问题(fix automatically)， 可定制化(customize)

## 初始化
```
npx eslint --init
```     
## 核心概念
- env: 指定脚本的运行环境。每个环境都有一组特定的预定义的全局变量
- global: 脚本在执行期间访问的额外的全局变量
- rule: 规则
- extends: eslint配置好的rule，这些rule来源为eslint内置规则和引入plugin的相关规则. extends可能是plugin中内置的，也可能是第三方模块依赖
- plugin: 用户的自定义rule,以及对非js文件的检查
- parser: 用来解析为AST语法树

## eslint plugin的实现

## 配置typescript规则
1. 增加规则对应typescript的extends
2. 在parseOptions中，增加{ project: './tsconfig.json'}

## 解决prettier与eslint的冲突
1. 安装```eslint-config-prettier```和```eslint-plugin-prettier```
2. 增加相关extends和plugin
3. 在rules中增加{"prettier/prettier": 2}


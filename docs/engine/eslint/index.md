# ESLint

## eslint 做什么使用

eslint 主要是发现问题(find problems), 自动修复问题(fix automatically)， 可定制化(customize)

## 初始化

```
npx eslint --init
```

## 核心概念

- env: 指定脚本的运行环境。每个环境都有一组特定的预定义的全局变量
- global: 脚本在执行期间访问的额外的全局变量
- rule: 规则
- extends: eslint 配置好的 rule，这些 rule 来源为 eslint 内置规则和引入 plugin 的相关规则; extends 可能是 plugin 中内置的，也可能是第三方模块依赖
- plugin: 用户的自定义 rule,以及对非 js 文件的检查
- parser: 用来解析为 AST 语法树

## eslint plugin 的实现

## 配置 typescript 规则

1. 增加规则对应 typescript 的 extends
2. 在 parseOptions 中，增加`{ project: './tsconfig.json'}`

## 解决 prettier 与 eslint 的冲突

1. 安装`eslint-config-prettier`和`eslint-plugin-prettier`
2. 增加相关 extends 和 plugin
3. 在 rules 中增加`{"prettier/prettier": 2}`

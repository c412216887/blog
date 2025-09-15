# ESLint、Stylelint、Prettier

## eslint 做什么使用

eslint 主要是发现问题(find problems), 自动修复问题(fix automatically)， 可定制化(customize)

eslint 规则可以分为两大类

1. 代码质量问题（Code Quality）
2. 代码风格问题（Code Style）  
   所以，项目中可以只使用 eslint 做质量和风格上的管理，无需引入 prettier。但从能力上，我们应该将代码风格管理，交给 prettier，eslint 官网也是如此期望

## 初始化

```
npx eslint --init
```

## 核心概念(旧，v9.0.0 之前版本)

- env: 指定脚本的运行环境。每个环境都有一组特定的预定义的全局变量
- global: 脚本在执行期间访问的额外的全局变量
- rule: 规则
- extends: eslint 配置好的 rule，这些 rule 来源为 eslint 内置规则和引入 plugin 的相关规则; extends 可能是 plugin 中内置的，也可能是第三方模块依赖
- plugin: 用户的自定义 rule,以及对非 js 文件的检查
- parser: 用来解析为 AST 语法树

## 核心概念（新，v9.0.0 版本往后）

- 配置文件：ES 模块优先于 commonjs 模块，在工程话配置中优先配置`type: module`
  1. 优先级
  - eslint.config.js
  - eslint.config.mjs
  - eslint.config.cjs
- 配置对象
  1. name: 配置对象的名称
  2. basePath：指定配置对象应该应用到子目录路径的字符串。可以是相对路径或者绝对路径。
  3. files：指示配置对象应应用于的文件的通配符模式数组，应该总是配置上。全局文件`[**\*]`
  4. ignores: 指示配置对象不应该应用于的文件的通配符模式数组
  5. extends: 包含要应用的其他配置的字符串、配置对象或配置数组的数组
  6. languageOptions: 包含与如何为代码检查配置 JavaScript 相关的设置对象
     - ecmaVersion: 当前工程支持的 ECMAScript 版本
     - sourceType: JavaScript 源代码的类型。值：`script`传统脚本；`module`ESM 模块；`commonjs`用于.cjs 文件
     - globals: 指定代码检查期间应添加到全局作用域的其他对象。
     - parse: 包含 parse()方法或者 parseForESLint()方法的对象。（默认：espress）
     - parserOptions: 指定直接传递给解析器上 parse()或 parseForESLint()方法的其他选项的对象。可用选项取决于解析器。
  7. linterOptions: 包含于代码检查过程相关设置的对象
  8. processor
  9. plugins: 插件。指定 files 时，这些插件仅对匹配的文件可用
  10. rules: 包含配置规则的对象。指定 files 或者 ignores 时，这些规则配置仅对匹配文件可用
  11. settings

## eslint plugin 的实现

## 配置 typescript 规则

1. 增加规则对应 typescript 的 extends
2. 在 parseOptions 中，增加`{ project: './tsconfig.json'}`

## 解决 prettier 与 eslint 的冲突

解决问题的核心思想是：

1. 让 Prettier 负责所有代码的格式化工作
2. 让 ESlint 只负责

3. 安装`eslint-config-prettier`和`eslint-plugin-prettier`
4. 增加相关 extends 和 plugin
5. 在 rules 中增加`{"prettier/prettier": 2}`

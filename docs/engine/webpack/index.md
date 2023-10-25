# Webpack

## 1. Webpack 是什么？

webpack 是现代 Javascript 应用程序的静态模块打包器。当 webpack 打包程序时，会递归构建一个依赖关系图，其中包含应用程序需要的所有模块，然后将这些模块打包成一个或者多个 bundle。

## 2. Webpack 核心概念

- mode：模式：development/product
- entry： 打包的入口
- output： 打包的出口
- loader：模块转换器，用于将模板原有内容按照需求转换成新的内容
- plugins：扩展插件，在 webpack 构建的过程中的特定时机注入扩展逻辑来改变构建结果或者你想要做的事
- compiler:
- compilation

### loader 怎样工作的？

loader 是导出为一个函数的 node 模块。该函数在 loader 转换资源的时候调用。给定的函数将调用 Loader API，并通过 this 上下文访问

## 3. Webpack 工作流程

[代码](https://github.com/c412216887/dummy-webpack)

- webpack-cli 的工作流

1. 命令行执行 webpack/bin/webpack.js 文件
2. webpack/bin/webpack.js 文件中执行`runCli()`方法
3. `runCli()`方法中，使用 require('node_modules/webpack-cli/bin/cli.js')
4. webpack-cli/bin/cli.js 文件执行`runCLI()`方法, 在这个方法中,进行命令行 process.argv 参数传递。
5. `runCLI()`方法中，实例化 webpackCli 类，并执行实例化对象的 run()方法中
6. 实例`run()`方法接受运行时传入的相关参数，定义`commander`相关选项和额外事件，定义`action()`运行函数
7. `action()`运行函数中,调用`loadCommandByName()`
8. `loadCommandByName()`根据不同的命令名称运行不用的操作。build 操作执行`this.loadWebpack()`
9. `this.loadWebpack()`方法，执行`this.tryRequireThenImport()`引入 webpack 函数并且返回 webpack 函数，此时并没有执行
10. `this.loadWebpack()`方法，继续执行`this.runWebpack()`来调用 webpack 函数
11. `this.runWebpack()`方法,执行`this.createCompiler()` 获取到 webpack 函数中的 compiler
12. `this.createCompiler()`方法, 执行`this.loadConfig()`获取 webpack.config.js 文件中的配置项
13. ``this.createCompiler()`方法, 执行`this.webpack()```并且返回 compiler
14. 在执行`this.webpack()`之前，通过调用`this.loadConfig()`方法来获取到配置文件
15. `this.loadConfig()`方法，先遍历所有可能存在的配置文件，找到第一个存在的配置文件，然后调用`loadConfigByPath()`来获取具体的配置内容

- 在`this.creatComplie()`方法中，同时调用`this.buildConfig()`将命令行中的配置项替换配置文件中的配置项。同时，在 plugin 的最前面使用`unshift`插入**CLIPlugin**(dummy-webpack 代码中并未实现这步)

---

总结： webpack-cli 主要就是整合相关配置项，并且调用 webpack 函数

- Webpack 工作流程

1. webpack-cli 中`createCompile()`方法调用了 webpack 工程中 lib/webpack.js 文件
2. `webpack()`内部定义了一个`create()`函数，返回 compiler 对象
3. `create()`调用`createCompile()`函数生成 compiler 对象

- 如果配置项文件是个数组，则会调用`createMultiCompile()`函数

4. `createCompile()`函数，返回 compile 对象
   1. `config/getNormalizedWebpackOptions()`格式化相关配置, 这里可以看到 webpack 具备的全部配置项
   2. `config/applyWebpackOptionsBaseDefaults()` 设置 webpack 的 infrastructureLogging 配置选项
      1. 在配置项中增加'context'属性 = process.cwd(),
      2. 调用`applyInfrastructureLoggingDefaults()`函数
   3. 实例化 Compiler 对象
   4. 运行 NodeEnvironmentPlugin()
   5. 依次调用配置项中的 Plugins
   6. `applyWebpackOptionsDefaults()` TODO：待确定是什么作用
   7. 调用 environment、afterEnvironment 钩子
   8. 实例化`WebpackOptionsApply()`,调用`procss()`方法，在 compile 上挂载各种各样的内置插件
      1. process()方法中,挂载 JavascriptModulesPlugin, JsonModulesPlugin, AssetModulesPlugin
      2. process()方法中,挂载 EntryOptionPlugin, 调用 hooks.entryOption 钩子
      3. process()方法中,调用 hook.afterPlugins 钩子
         给 resolverFactory ????上挂载 tap 函数
      4. process()方法中,调用 hook.afterResolvers 钩子
   9. 调用 initialize 钩子
5. 在`webpack()`函数中调用`compiler.run()`, 这个时候 compiler 对象上已经挂载好了全部的 plugin
6. `compiler.run()`调用`hook.beforeRun()`、`hook.run()`,并最后执行`this.compile()`方法
7. `this.compile()`方法中，依次执行，`hook.beforeCompile()`,`hook.compile()`, `hook.mark()`,`hook.finishMark()`,`hook.afterCompile()`

---

总结：

1. 打包其实就是`compiler`对象执行了`run()`方法
2. `run()`分别依次调用了 beforeRun、run、beforeCompile、Compile、生成 compilation 对象、make、finishMake、写入、afterCompile 钩子
3. `run()`执行前，调用了 environment、afterEnvironment 钩子
4. 配置项对应生成一个`compiler`实例对象，每次执行`run()`方法就会生成一个新的`compilation`对象
5. 执行 compilation.seal()方法, 写入到 dist 目录中

---

compiler hook 本质上是使用发布订阅模式来完成相关 plugin 的功能
|hook|实现|描述|参数|
|---|---|---|---|
|beforeRun|AsyncSeriesHook|-|compiler|
|Run|AsyncSeriesHook|-|compiler|
|beforeCompile|AsyncSeriesHook|-|compilationParam|
|compile|SyncHook|-|compilationParam|
|make|AsyncParallelHook|-|compilation|
|finishMake|AsyncSeriesHook|-|compilation|
|afterCompile|AsyncSeriesHook|-|compilation|

## 4. Webpack plugin

- html-webpack-plugin
  可以在 template 中，使用 ejs 模板，同时里面可以使用`htmlWebpackPlugin`变量

```
new HtmlWebpackPlugin({
  template: "", // 编译的模板
  filename: "", // 编译后html文件名
  chunks: [], // 多入口时，需要配置页面要引入的chunk
  minify: { // html文件一些压缩
    collaspeWhitespace: boolean // 删除空格
    removeAttributeQuotes: boolean // 删除属性引号
  },
  hash: boolean // 引入js文件增加hash版本号
})
```

- clean-webpack-plugin
  自动清除 dist 目录

```
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
```

- copy-webpack-plugin
  复制已经存在的文件到指定位置

```
new CopyWebpackPlugin({
  pattern: [
    {from: "", to: ""}
  ]
})
```

- mini-css-extract-plugin
  将 css 抽离出单独文件，然后将 css 引入进 html 文件中

```
new MiniCssExtractPlugin({
  filename: css/[name].css
})
```

- optimize-css-assets-webpack-plugin
  压缩 css 文件

```
new OptimizeCssAssetsPlugin()
```

## 5. 按需加载

在需要加载相关 js 时，在加载，主要使用 import(""),webpack 会生成新的 chunk

## 6. Webpack 实战

1. devtool

- eval-\* 不会单独生成.map 文件
  - eval
  - eval-cheap-source-map
  - eval-cheap-module-source-map
  - eval-source-map
- cheap-source-map 单独生成.map 文件
- cheap-module-source-map 单独生成.map 文件
- source-map 单独生成.map 文件

优化总结：

1. 单独生成 css 文件
2. 将大 js 文件拆解为多个 js，按需加载 js
3. 第三方包不打包，进行 CDN 加速

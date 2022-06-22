# Webpack

## 1. Webpack是什么？
webpack是现代Javascript应用程序的静态模块打包器。当webpack打包程序时，会递归构建一个依赖关系图，其中包含应用程序需要的所有模块，然后将这些模块打包成一个或者多个bundle。  

## 2. Webpack核心概念
- mode：模式：development/product
- entry： 打包的入口
- output： 打包的出口
- loader：模块转换器，用于将模板原有内容按照需求转换成新的内容
- plugins：扩展插件，在webpack构建的过程中的特定时机注入扩展逻辑来改变构建结果或者你想要做的事
- compiler:
- compilation

## 3. Webpack工作流程
[代码](https://github.com/c412216887/dummy-webpack)
- webpack-cli的工作流
1. 命令行执行webpack/bin/webpack.js文件
2. webpack/bin/webpack.js文件中执行```runCli()```方法
3. ```runCli()```方法中，使用require('node_modules/webpack-cli/bin/cli.js')
4. webpack-cli/bin/cli.js文件执行```runCLI()```方法, 在这个方法中,进行命令行process.argv参数传递。
5. ```runCLI()```方法中，实例化webpackCli类，并执行实例化对象的run()方法中
6. 实例```run()```方法接受运行时传入的相关参数，定义```commander```相关选项和额外事件，定义```action()```运行函数
7. ```action()```运行函数中,调用```loadCommandByName()```
8. ```loadCommandByName()```根据不同的命令名称运行不用的操作。build操作执行```this.loadWebpack()```
9. ```this.loadWebpack()```方法，执行```this.tryRequireThenImport()```引入webpack函数并且返回webpack函数，此时并没有执行
10. ```this.loadWebpack()```方法，继续执行```this.runWebpack()```来调用webpack函数
11. ```this.runWebpack()```方法,执行```this.createCompiler()``` 获取到webpack函数中的compiler
12. ```this.createCompiler()```方法, 执行```this.loadConfig()```获取webpack.config.js文件中的配置项
13. ``this.createCompiler()```方法, 执行```this.webpack()```并且返回compiler

## 4. Webpack实战

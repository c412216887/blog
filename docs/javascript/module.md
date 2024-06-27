# JavaScript

## 模块标准

### esModule & commonjs

- **esModule**:

1. ES2015 引入的模块，
2. import 命令会被 JavaScript 引擎静态分析，在编译时就引入模块代码,而不是在代码运行时加载，所以无法实现条件加载。可以使用 babel 进行识别
3. 模块使用定时器，修改暴露的值时，引入的地方再次使用，会获取到新的数据

- **commonjs**:

1. 社区定义的模块标准
2. 在全局定义`require`函数，在全局定义`module`、`module.exports`、`exports`变量。
3. 属于动态模块， babel 只能识别为正常的表达式
4. 同步方式加载模块
5. 模块使用定时器，修改导出的值时，引入的地方再次使用，还是会获取到之前的数据

### 模块之间互相使用
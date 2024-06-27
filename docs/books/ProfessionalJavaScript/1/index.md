# [JavaScript 高级程序设计](../index.md)

## 第一章 什么是 JavaScript

### JavaScript 历史回顾

- 1995 年，网景和 sun 公司共同发布 JavaScript 1.0，主要用于处理页面上表单字段的验证
- 1996 年，微软发布 JScript 版本，意味着 JavaScript 出现了两个版本
- 1997 年，JavaScript 1.1 作为提案被提交给欧洲计算机制造协会（Ecma）。由其中第 39 技术委员会（TC39）承担标准化工作。同年 ECMA-262，即 ECMAScript，这个新的脚本语言标准诞生
- 1998 年，各家浏览器均以 ECMAScipt 作为自己的 JavaScipt 实现的依据，但是具体的实现各有不同。从而浏览器兼容也由此产生
- <span id="JavaScript">JavaScript</span> 是什么？  
  完整的 JavaScript 包含以下部分

  - [核心](#ECMAScript)（ECMAScript）
  - [文档对象模型](#DOM)（DOM）
  - [浏览器对象模型](#BOM)（BOM）

### JavaScript 与 ECMAScript 的关系

ECMAScipt 作为自己的 JavaScipt 实现的依据，但是具体的实现各有不同

### JavaScript 的不同版本

---

<span id="ECMAScript"></span>

### ECMAScript

主要定义了语言的如下部份

- 语法
- 类型
- 语句
- 关键字
- 保留字
- 操作符
- 全局对象

_监听事件是否属于 ECMAScript 部分？_  
[Back](#JavaScript)

<span id="DOM"></span>

### DOM

- 用来对文档树（HTML 或 XML）li 进行增删改查。
- 由万维网（W3C）制定 DOM 标准
- DOM 的级别，以前 DOM 发布了 DOM Level 1 、DOM Level 2、DOM Level 3。目前， W3C 不在按照 Level 来维护 DOM 了，而是作为 DOM Living Standard 来维护，其快照称为 DOM4
- 其他 DOM，常见的由可伸缩矢量图（SVG）  
   [Back](#JavaScript)  
  <span id="BOM"></span>

### BOM

- 用于支持访问和操作浏览器的窗口
- HTML5 才开始以正式规范的形式涵盖了尽可能多的 BOM 特性
- BOM 包含：

  - 弹出浏览器新窗口
  - 移动、缩放浏览器

  ```js
  // 移动窗口
  window.moveTo(x: number, y: number)
  window.moveBy(x: number, y: number)
  // 缩放
  window.resize(width: number, height: number)
  window.resize(width: number, height: number)
  ```

  - 从 Firefox 7 开始，不能改变浏览器窗口的大小了，要依据下面的规则才能改变

  1. 只有通过 window.open 创建的窗口或 Tab 才能设置窗口大小和移动窗口。(准确描述是，window.open()必须要有第三个参数)
  2. 当一个窗口里面含有一个以上的 Tab 时，无法设置窗口的大小和移动窗口。
  3. 当窗口最大化时，也无法改变或者移动浏览器窗口

  - 关闭浏览器
    1. 只有通过 window.open 创建的窗口或者 tab 才能关闭浏览器。(window.open()不必要有第三个参数)
  - navigator 对象，提供关于浏览器的详尽信息
  - location 对象，提供浏览器加载页面的详尽信息
  - screen 对象，提供关于用户屏幕分辨率的详尽信息
  - performance 对象，提供浏览器内存占用，导航行为和时间统计的详尽信息
  - 对 cookie 的支持
  - 其他自定义对象，如 XMLHttpRequest
    [Back](#JavaScript)

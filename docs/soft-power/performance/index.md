# 性能

## API

- performance
- PerformanceObserve

## 前端性能量化标准

- FP 和 FCP
  FP(First Paint): 首次绘制时间，可以理解开始绘制 head 标签的时间  
  FCP(First Content Paint): 首次内容绘制时间，即第一个 DOM 绘制时间，可以理解为开始绘制(是绘制并不是解析)body 标签的时间

- FMP
  FMP(Fist Meaningful paint): 首次绘制关键内容的时间，关键内容由开发者自己定义

- TTI
  TTI(Time to interactive): 应用程序在视觉上已经完全渲染出来，同时又可以响应用户的输入

- long task
  一般超过 50ms 的 js，成为 long task

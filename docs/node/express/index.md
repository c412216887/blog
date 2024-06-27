# Express 框架

## 概念

APP: express()返回一个 App 对象
Router:

- 一个 APP 对象只包含一个 Router 对象
- Router 对象中一个 stack 数据里面存放 APP 对象中存放所有的 Layer 对象
  Route:
  Layer: 一个 use(中间键)、"method"(请求方式)会创建一个 Layer 对象

## Q & A

Q: 最简主流程?

- 中间键和 api 请求，都会创建 Lay 对象存放在 Router 对象中，然后执行 Router 对象中 handle 方法依次**同步**执行 Layer
  Q: 中间键和 api 请求的区别？
- 中间键的 Layer 中 route 属性为 undefined,
- api 请求方式的 Layer 中 route 属性为 Route 对象
